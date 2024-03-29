/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Icons } from "./ui/icons";
import { Input } from "./ui/input";

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthStatus() {
  //zeigt an ob der Benutzer angemeldet ist
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //zeigt an ob der Authentifizierungsstatus gerade überprüft wird
  const [checkingStatus, setCheckingStatus] = useState(true);

  //um den Authentifizierungsstatus zu überwachen
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //ändert wird isLoggedIn entsprechend aktualisiert u checkingStatus wird auf false gesetz
      setIsLoggedIn(!!user);
      setCheckingStatus(false);
    });

    return () => unsubscribe();
  }, []);

  return { isLoggedIn, checkingStatus };
}

export default function AuthCardLogin() {
  //nitialisiert Firebase Authentication und definiert Zustände für E-Mail, Passwort
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };
  //github
  const signInWithGitHub = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };
  //Aktualisiert den email-Zustand basierend auf dem Eingabefeld
  const handleEmailChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };
  //Aktualisiert den password-Zustand basierend auf dem Eingabefeld
  const handlePasswordChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };
  //ersucht den Benutzer anzumelden und behandelt verschiedene Fehlerfälle, z. B. ungültige E-Mai
  const signInWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
    } catch (error: any) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setError("Invalid email or password.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Login to your Account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline" onClick={signInWithGitHub}>
            <Icons.gitHub />
            GitHub
          </Button>
          <Button variant="outline" onClick={signInWithGoogle}>
            <Icons.google />
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            onChange={handleEmailChange}
            placeholder="m@example.com"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            onChange={handlePasswordChange}
            type="password"
          />
        </div>
      </CardContent>
      {error && (
        <div className="text-red-500 text-center p-4 mx-auto">{error}</div>
      )}
      <CardFooter>
        <Button onClick={signInWithEmail} className="w-full">
          Login to your Account
        </Button>
      </CardFooter>
    </Card>
  );
}
