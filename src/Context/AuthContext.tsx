import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { User } from "../types/users";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, 
signOut,  onAuthStateChanged,  User as FirebaseUser,} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const db = getFirestore();

type AuthContextProps = {
  createAccount: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  user?: User;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>();

  const createAccount = async (email: string, password: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const uid = result.user.uid;

    await setDoc(doc(db, "users", uid), {
      uid,
      email,
      firstName: "",
      lastName: "",
      username: "",
      address: "",
    });
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(undefined);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user?.uid) return;
    const ref = doc(db, "users", user.uid);
    await setDoc(ref, { ...user, ...data }, { merge: true });
    setUser((prev) => ({ ...prev!, ...data }));
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setUser({ uid: firebaseUser.uid, ...snap.data() } as User);
        } else {
          const newUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            firstName: "",
            lastName: "",
            username: "",
            address: "",
          };
          await setDoc(ref, newUser);
          setUser(newUser);
        }
      } else {
        setUser(undefined);
      }
    });

    return subscriber;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        createAccount,
        login,
        logout,
        updateProfile,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
