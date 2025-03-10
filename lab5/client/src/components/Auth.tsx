import { useState, useEffect } from "react";
import { auth } from "../firebase/firebase.ts";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setShowModal(currentUser === null);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User registered:", userCredential.user);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
      }
      setShowModal(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Auth error:", error.message);
        alert(error.message);
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setShowModal(true);
      alert("Logged out successfully!");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Logout error:", error.message);
      }
    }
  };

  return (
    <div className="p-4">
      {user ? (
        <div>
          <p>Logged in as: {user.email}</p>
          <button onClick={logout} className="bg-red-500 text-white p-2 m-2 cursor-pointer">
            Logout
          </button>
        </div>
      ) : (
        showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">
                {isRegistering ? "Register" : "Login"}
              </h2>
              <input
                type="email"
                placeholder="Email"
                className="border p-2 w-full mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="border p-2 w-full mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white p-2 mb-2"
              >
                {isRegistering ? "Register" : "Login"}
              </button>
              <button
                onClick={() => setIsRegistering(!isRegistering)}
                className="w-full text-blue-600 underline"
              >
                {isRegistering ? "Already have an account?" : "Create an account"}
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Auth;
