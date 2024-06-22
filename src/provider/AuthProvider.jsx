import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    // code taken
    const [token, setToken] = useState(null)
    const [justLoggedIn, setJustLoggedIn] = useState(false)

    const axiosPublic = useAxiosPublic();

    // codes collected
    const handleAuthResult = (result) => {
        setJustLoggedIn(true);
        setLoader(false);
        return result;
    };

    const handleAuthError = (error) => {
        console.error(error);
        setLoader(false);
        throw error;
    };

    const createUser = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password)

            // code taken 
            .then(handleAuthResult)
            .catch(handleAuthError);
    }

    const signInUser = (email, password) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password)

            // code taken 
            .then(handleAuthResult)
            .catch(handleAuthError);
    }

    const signOutUser = () => {
        setLoader(true);
        return signOut(auth)

        // code taken
        .then(() => {
            localStorage.removeItem('access-token');
            setToken(null);
            setLoader(false);
        })
        .catch(handleAuthError);
    }

    const updateUser = (name, photoURL) => {
        setLoader(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        })

        // code taken
        .then(() => setLoader(false))
        .catch(handleAuthError);
    }

    const provider = new GoogleAuthProvider();

    const googleSignIn = () => {
        setLoader(true);
        return signInWithPopup(auth, provider)

            // code taken 
            .then(handleAuthResult)
            .catch(handleAuthError);
    }



    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                const userInfo = { email: currentUser.email }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)

                            // code taken
                            setToken(res.data.token)
                        }
                    })

                    // code taken
                    .catch(error => {
                        console.error("Faialed to fatch token: ", error);
                        localStorage.removeItem("access-token");
                        setToken(null);
                    })

                    // code taken
                    .finally(() => {
                        setLoader(false);
                    });
            }
            else {
                localStorage.removeItem('access-token');

                // code taken 
                setToken(null);
                setLoader(false);
            }
        })
        return () => {
            unSubscribe();
        }
    }, [axiosPublic])

    const authInfo = {
        user,
        loader,
        token,
        justLoggedIn,
        setJustLoggedIn,
        createUser,
        signInUser,
        signOutUser,
        updateUser,
        googleSignIn,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
}

export default AuthProvider;