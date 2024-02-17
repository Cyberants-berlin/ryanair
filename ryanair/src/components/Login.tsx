/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { buttonVariants } from "./ui/button";
import "./login.css";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/firebaseConfig"; 
import AuthCardLogin from "./AuthCardLogin";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [error, setError] = useState("");

 const handleLogin = async (e: React.FormEvent) => {
   e.preventDefault();
   try {
     await signInWithEmailAndPassword(auth, email, password);
     navigate("/chatroom");
     setError(""); 
   } catch (error: any) {
     setError(error.message); 
   }
 };

  return (
    <div className="container relative hidden h-[700px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        to="/register"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute  right-4  top-4  md:right-8  md:top-8"
        )}
      >
        Registration
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-black lg:flex dark:border-r">
        <div
          className="absolute inset-0 bg-white bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1563580853122-1ea105e0e92a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        ></div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link to="/" className="login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0,0,256,256"
              width="50px"
              height="50px"
            >
              <g
                fill="#ffec00"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
              >
                <g transform="scale(5.12,5.12)">
                  <path d="M41.75,5.339c-0.299,-0.34  -0.793,-0.438  -1.196,-0.233c-0.039,0.019  -3.966,1.943  -10.695,2.904c-3.964,0.567  -6.979,1.442  -8.896,2.119c-0.193,-2.306  -2.109,-4.129  -4.463,-4.129c-2.481,0  -4.5,2.019  -4.5,4.5c0,1.697  0.948,3.19  2.375,3.956c-0.801,1.2  -1.824,3.272  -1.754,5.96c0.093,3.526  2.014,7.001  5.71,10.327c9.401,8.461  9.668,13.227  9.669,13.257c0,0.553  0.447,1  1,1c0.553,0  1,-0.447  1,-1c0,-3.146  -2.938,-11.018  -3.063,-11.352c-0.051,-0.133  -0.129,-0.255  -0.229,-0.355l-3.714,-3.714c-0.135,-4.289  -2.32,-6.5  -3.138,-7.181c-0.139,-0.501  -0.382,-1.739  0.171,-2.931c0.351,-0.759  0.978,-1.392  1.864,-1.895l-0.87,4.225c-0.111,0.541  0.237,1.07  0.777,1.182c0.068,0.014  0.137,0.021  0.203,0.021c0.465,0  0.881,-0.325  0.979,-0.798l0.901,-4.376c0.461,0.271  1.011,0.554  1.633,0.805l-1.602,7.113c-0.121,0.539  0.217,1.074  0.756,1.195c0.074,0.017  0.147,0.024  0.221,0.024c0.457,0  0.87,-0.315  0.975,-0.78l1.571,-6.975c0.635,0.125  1.31,0.187  2.013,0.164l-2.425,11.419c-0.114,0.54  0.23,1.071  0.771,1.187c0.068,0.015  0.139,0.022  0.207,0.022c0.462,0  0.877,-0.322  0.978,-0.792l2.586,-12.177c0.878,-0.264  1.711,-0.691  2.505,-1.248l-4.048,19.009c-0.114,0.54  0.23,1.071  0.771,1.187c0.07,0.015  0.14,0.021  0.209,0.021c0.462,0  0.877,-0.321  0.978,-0.792l4.672,-21.942c0.408,-0.527  0.806,-1.086  1.181,-1.712l4,-6c0.25,-0.376  0.217,-0.874  -0.083,-1.215zM36.143,11.485c-1.702,2.838  -3.71,4.459  -5.968,4.818c-1.105,0.177  -2.165,0.032  -3.098,-0.246c-0.056,-0.024  -0.105,-0.061  -0.167,-0.075c-0.023,-0.005  -0.044,0.002  -0.067,-0.001c-1.864,-0.613  -3.166,-1.718  -3.185,-1.735c-0.268,-0.232  -0.64,-0.31  -0.975,-0.195c-2.208,0.735  -3.713,1.938  -4.472,3.574c-1.082,2.333  -0.18,4.648  -0.141,4.745c0.073,0.183  0.205,0.345  0.367,0.456c0.106,0.073  2.563,1.82  2.563,6.174c0,0.266  0.105,0.52  0.293,0.707l3.846,3.846c0.217,0.586  0.505,1.393  0.814,2.31c-1.484,-1.901  -3.513,-4.111  -6.284,-6.605c-3.26,-2.934  -4.958,-5.915  -5.047,-8.861c-0.104,-3.422  2.066,-5.669  2.085,-5.688c0.391,-0.391  0.391,-1.023  0,-1.414c-0.117,-0.117  -0.258,-0.187  -0.405,-0.234c-0.079,-0.038  -0.156,-0.082  -0.247,-0.098c-1.191,-0.216  -2.055,-1.251  -2.055,-2.463c0,-1.379  1.121,-2.5  2.5,-2.5c1.379,0  2.5,1.121  2.5,2.5c0,0.144  -0.027,0.282  -0.051,0.421c-0.228,0.102  -0.369,0.17  -0.396,0.184c-0.493,0.247  -0.693,0.847  -0.447,1.341c0.246,0.493  0.844,0.695  1.341,0.448c0.039,-0.019  3.966,-1.943  10.695,-2.904c3.553,-0.508  6.345,-1.265  8.266,-1.902z"></path>
                </g>
              </g>
            </svg>
          </Link>
        </div>
        <div className="relative  z-20  mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Using Ryanair, travelers can explore Europe's beauty with
              unbeatable savings, making dream vacations a reality without
              breaking the bank.&rdquo;
            </p>
            <footer className="text-sm">Michael O'Leary</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto  flex  w-full  flex-col  justify-center  space-y-6  sm:w-[350px]">
          <AuthCardLogin />
          <p className="px-8  text-center  text-sm  text-muted-foreground">
            By clicking continue, you agree to our{"  "}
            <Link
              to="/terms"
              className="underline  underline-offset-4  hover:text-primary"
            >
              Terms of Service
            </Link>
            {"  "}
            and{"  "}
            <Link
              to="/privacy"
              className="underline  underline-offset-4  hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
      {error && (
        <div className="text-red-500 text-center p-4 mx-auto">{error}</div>
      )}
    </div>
  );
}
