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
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("No se pudo obtener el Token de Acceso desde Google Authentication.");
    }

    cachedAccessToken = credential.accessToken;
    
    // Notify any active listeners
    successListeners.forEach(l => l(result.user, cachedAccessToken!));

    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error("Error durante Google Sign-In:", error);
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
