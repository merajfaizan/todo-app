/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../lib/firebase.config";
import { useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // loading manage
  const [loading, setLoading] = useState(true);

  // Google Login
  const googleLogin = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // Register user
  const handleCreateUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update user profile in firebase
  const updateUserProfile = (profile) => {
    setLoading(true);
    return updateProfile(auth.currentUser, profile);
  };

  // Login user
  const handleLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout user
  const handleLogout = () => {
    setLoading(true);
    setUser(null);
    return signOut(auth);
  };

  //   observer function
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (currentUser) => {
      try {
        const getUser = async () => {
          const res = await fetch(
            `https://todo-app-server-ruddy.vercel.app/users/${currentUser?.uid}`
          );
          const result = await res.json();
          setUser(result.data);
          setLoading(false);
        };
        getUser();
      } catch (error) {
        console.log(error);
      }
    });
    return () => {
      subscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    handleLogin,
    handleLogout,
    handleCreateUser,
    updateUserProfile,
    googleLogin,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
