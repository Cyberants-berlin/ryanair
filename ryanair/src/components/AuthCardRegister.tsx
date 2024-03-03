/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Icons } from "./ui/icons";
import { Input } from "./ui/input";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";

export default function AuthCardRegister() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //Funktion die aufger. wird wenn sich der Wert im E-Mail-Eingabefeld ändert
  const handleEmailChange = (event: { target: { value: any } }) => {
    setEmail(event.target.value);
  };
  //aktualisiert diese Funktion den password-Zustandwenn sich der Wert im Passwort-Eingabefeld änder
  const handlePasswordChange = (event: { target: { value: any } }) => {
    setPassword(event.target.value);
  };

  //Funktion die die Registrierung eines neuen Benutzers mit E-Mail und Passwort über Firebase Authentication handhab
  const signUpWithEmail = async () => {
    //wird überprüft, ob sowohl E-Mail- als auch Passwortfelder ausgefüllt sind
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    //Versucht Benutzer mit der bereitgestellten E-Mail und Passwort zu erstellen
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already in use.");
      } else if (error.code === "auth/weak-password") {
        setError("The password is too weak.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };
  //registr mit google
  const signUpWithGoogle = async () => {
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
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
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
          <Button variant="outline" onClick={signUpWithGoogle}>
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
        {error && <div className="text-red-500">{error}</div>}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={signUpWithEmail}>
          Create account
        </Button>
      </CardFooter>
    </Card>
  );
}
