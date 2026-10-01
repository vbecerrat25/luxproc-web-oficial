import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User,
  inMemoryPersistence,
  setPersistence
} from "firebase/auth";
import firebaseConfig from "../firebase-applet-config.json";

// Initialize Firebase App with custom authDomain luxproc.com
const app = initializeApp({
  ...firebaseConfig,
  authDomain: "luxproc.com"
});
const auth = getAuth(app);

// Use inMemoryPersistence so the OAuth session is strictly single-use and does not linger
setPersistence(auth, inMemoryPersistence).catch((err) => {
  console.error("Error setting persistence:", err);
});

// Configure Google Provider with scopes required for calendar event sync and email delivery
const provider = new GoogleAuthProvider();
provider.addScope("email");
provider.addScope("profile");
provider.addScope("openid");
provider.addScope("https://www.googleapis.com/auth/calendar.events");
provider.addScope("https://www.googleapis.com/auth/gmail.send");

// Use select_account to allow easy switching between accounts and ensure fresh sessions per meeting
provider.setCustomParameters({
  prompt: "select_account"
});

// Flag to indicate if we are in the middle of a sign-in flow.
let isSigningIn = false;
// Cache the access token in memory.
let cachedAccessToken: string | null = null;

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
  try {
    isSigningIn = true;

    const result = await signInWithPopup(auth, provider);
    if (!result) {
      throw new Error("No se pudo iniciar sesión con Google.");
    }

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken || await result.user.getIdToken();
    if (!token) {
      throw new Error("No se pudo obtener la credencial de autenticación desde Google.");
    }

    cachedAccessToken = token;
    
    // Notify any active listeners
    successListeners.forEach(l => l(result.user, cachedAccessToken!));

    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    const errCode = error?.code || "";
    if (errCode === "auth/popup-closed-by-user") {
      console.warn("Google Sign-In popup closed by user.");
    } else {
      console.error("Error durante Google Sign-In:", error);
    }
    throw error;
  } finally {
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
