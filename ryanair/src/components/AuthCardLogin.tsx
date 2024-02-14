import { SetStateAction, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
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

export default function AuthCardLogin() {
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const signInWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(""); 
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message); 
      }
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      }
    }
  };

  const signInWithGitHub = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      }
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Login to your Account</CardTitle>
        <CardDescription>Enter your details below to continue</CardDescription>
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
            value={email}
            onChange={handleEmailChange}
            placeholder="m@example.com"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            value={password}
            onChange={handlePasswordChange}
            type="password"
          />
        </div>
        
        {error && <p className="text-red-500">{error}</p>}
      </CardContent>
      <CardFooter>
        <Button onClick={signInWithEmail} className="w-full">
          Login to your Account
        </Button>
      </CardFooter>
    </Card>
  );
}
