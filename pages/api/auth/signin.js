import auth from "../../../firebase/firebase";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const theAuth = getAuth(auth);

export default async function signIn(email, password) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(theAuth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}