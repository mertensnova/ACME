import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import axios from "axios";
import React, { useState } from "react";

const Login = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const loginUser = async ({ username, password }: any) => {
      try {
         const response = await axios.post(
            `${API_URL}/login`,
            {
               username,
               password,
            },
            { withCredentials: true }
         );

         if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify(response.data));
            window.location.href = "/dashboard";
         }

         return response.data;
      } catch (error: any) {
         console.log(error);
      }
   };
   return (
      <section
         className={cn(
            " w-full h-[60vh] flex items-center justify-center flex-col"
         )}
      >
         <form>
            <div>
               <h1 className={cn(" text-3xl mt-7")}>Login to your account</h1>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
               <Label htmlFor="email-2">Username</Label>
               <Input type="text" id="email-2" placeholder="Username" />
               <p className="text-sm text-muted-foreground">
                  Enter your username.
               </p>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
               <Label htmlFor="password-2">Password</Label>
               <Input type="password" id="password-2" placeholder="Password" />
               <p className="text-sm text-muted-foreground">
                  Enter your password.
               </p>
            </div>
            <div className={cn("flex items-center justify-center w-1/3")}>
               <Button className="w-11/12">Login</Button>
            </div>
         </form>
      </section>
   );
};

export default Login;
