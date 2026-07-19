import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User,
  browserLocalPersistence,
  setPersistence
} from "firebase/auth";
import firebaseConfig from "../firebase-applet-config.json";

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Enable persistence so the session is kept across refreshes
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.error("Error setting persistence:", err);
});

// Configure Google Provider with Calendar and Profile scopes
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/calendar");
provider.addScope("https://www.googleapis.com/auth/calendar.events");
provider.addScope("https://www.googleapis.com/auth/userinfo.email");
provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
provider.addScope("https://www.googleapis.com/auth/gmail.send");

// Force prompt so that user can choose account and consent is explicit
provider.setCustomParameters({
  prompt: "consent",
  access_type: "offline"
});

// Flag to indicate if we are in the middle of a sign-in flow.
let isSigningIn = false;
// Cache the access token in memory.
let cachedAccessToken: string | null = null;

// Track the last opened window reference to instantly detect closed popups
let lastOpenedWindow: Window | null = null;
try {
  const originalWindowOpen = window.open;
  window.open = function (url?: string | URL, target?: string, features?: string): Window | null {
    const win = originalWindowOpen.call(window, url, target, features);
    if (win) {
      lastOpenedWindow = win;
    }
    return win;
  };
} catch (e) {
  console.warn("Could not intercept window.open:", e);
}

// Listeners for auth state changes
type AuthCallback = (user: User, token: string) => void;
type FailureCallback = () => void;

let successListeners: AuthCallback[] = [];
let failureListeners: FailureCallback[] = [];

// Initialize auth state listener. Call this on app load.
export const initAuth = (
  onAuthSuccess?: AuthCallback,
  onAuthFailure?: FailureCallback
) => {
  if (onAuthSuccess) successListeners.push(onAuthSuccess);
  if (onAuthFailure) failureListeners.push(onAuthFailure);

  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        successListeners.forEach(l => l(user, cachedAccessToken!));
      } else {
        // Since onAuthStateChanged triggers on load, but doesn't contain the oauth token,
        // we might need to re-trigger login if we don't have the cached token.
        // However, we shouldn't force login automatically on load to avoid bad UX.
        // We will signal that we need credentials if the token is not cached.
        failureListeners.forEach(l => l());
      }
    } else {
      cachedAccessToken = null;
      failureListeners.forEach(l => l());
    }
  });
};

// Must be called from a button click or user interaction
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  let pollInterval: any;
  try {
    isSigningIn = true;
    lastOpenedWindow = null; // Reset track reference

    const signInPromise = signInWithPopup(auth, provider);

    const detectClosedPromise = new Promise<never>((_, reject) => {
      pollInterval = setInterval(() => {
        if (lastOpenedWindow && lastOpenedWindow.closed) {
          clearInterval(pollInterval);
          const error = new Error("La ventana se cerró por el usuario.");
          (error as any).code = "auth/popup-closed-by-user";
          reject(error);
        }
      }, 200);
    });

    const result = await Promise.race([signInPromise, detectClosedPromise]);
    if (!result) {
      throw new Error("No se pudo iniciar sesión.");
    }

    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("No se pudo obtener el Token de Acceso desde Google Authentication.");
    }

    cachedAccessToken = credential.accessToken;
    
    // Notify any active listeners
    successListeners.forEach(l => l(result.user, cachedAccessToken!));

    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    const errCode = error?.code || "";
    if (errCode === "auth/popup-closed-by-user" || error?.message?.includes("popup-closed-by-user") || error?.message?.includes("cerró")) {
      console.warn("Google Sign-In popup closed or blocked:", error.message);
    } else {
      console.error("Error durante Google Sign-In:", error);
    }
    throw error;
  } finally {
    if (pollInterval) {
      clearInterval(pollInterval);
    }
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
  failureListeners.forEach(l => l());
};
