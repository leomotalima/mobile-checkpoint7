import { createContext, PropsWithChildren, useState } from "react";
import { User } from "../types/users";
import * as firebaseAuth from "firebase/auth";
import { getFirestore, getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth } from "../firebaseConfig";

const db = getFirestore();

type AuthContextProps = {
  createAccount: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    address: string
  ) => Promise<void>;
  editAccount: (firstName: string, lastName: string, address: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user?: User;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>();

  const createAccount = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    address: string
  ) => {
    const userCredential = await firebaseAuth.createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    await setDoc(doc(db, "users", firebaseUser.uid), {
      email: firebaseUser.email,
      firstName,
      lastName,
      address,
    });

    setUser({
      email: firebaseUser.email,
      firstName,
      lastName,
      address,
    });
  };

  const editAccount = async (firstName: string, lastName: string, address: string) => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("No authenticated user");

    await updateDoc(doc(db, "users", currentUser.uid), { firstName, lastName, address });

    setUser({
      email: currentUser.email,
      firstName,
      lastName,
      address,
    });
  };

  const login = async (email: string, password: string) => {
    const userCredential = await firebaseAuth.signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
    const userData = userDoc.data();

    setUser({
      email: firebaseUser.email,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      address: userData?.address,
    });
  };

  const logout = async () => {
    await firebaseAuth.signOut(auth);
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ createAccount, editAccount, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
