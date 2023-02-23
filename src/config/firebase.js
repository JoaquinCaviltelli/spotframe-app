import {
    initializeApp
} from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from "firebase/auth";



const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const login = ({
        email,
        password
    }) =>
    signInWithEmailAndPassword(auth, email, password);

export const register = ({
        email,
        password
    }) =>
    createUserWithEmailAndPassword(auth, email, password);

export const updateName = ({
        name
    }) =>
    updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: "https://as1.ftcdn.net/v2/jpg/04/51/93/48/1000_F_451934847_V7rc18Ibs9UNU5sSihQBY0MzSDgei4Cr.jpg"
    }).then(() => {
        // Profile updated!
        // ...
        console.log(name);
    }).catch((error) => {
        // An error occurred
        // ...
        console.log(error);
    });


export const logOut = () => signOut(auth);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}