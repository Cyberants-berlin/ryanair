import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Icons } from "./ui/icons";
import { Input } from "./ui/input";
import { getAuth,signInWithEmailAndPassword,GithubAuthProvider,GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {Auth} from "./firebaseConfig";


export default function AuthCardLogin(){
  const auth = getAuth();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
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
        <Button variant="outline" >
          <Icons.gitHub  />
          Github
        </Button>
        <Button variant="outline" onClick={signInWithGoogle}>
          <Icons.google  />
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
        <Input id="email" type="email" placeholder="m@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" />
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full">Login to your Account</Button>
    </CardFooter>
  </Card>
  )
}