"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Link } from "lucide-react";
import React from "react";

const Signup = () => {
   return (
      <section
         className={cn(" w-full  flex items-center justify-center flex-col")}
      >
         <div>
            <h1 className={cn("text-3xl mt-2")}>Signup to your account</h1>
         </div>
         <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
            <Label htmlFor="email-2">Full Name</Label>
            <Input type="text" id="email-2" placeholder="Full name" />
            <p className="text-sm text-muted-foreground">Enter your name.</p>
         </div>

         <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
            <Label htmlFor="email-2">Username</Label>
            <Input type="text" id="email-2" placeholder="Username" />
            <p className="text-sm text-muted-foreground">
               Enter your username.
            </p>
         </div>
         <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
            <Label htmlFor="email-2">Email</Label>
            <Input type="email" id="email-2" placeholder="Username" />
            <p className="text-sm text-muted-foreground">Enter your email.</p>
         </div>

         <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
            <Label htmlFor="password-2">Password</Label>
            <Input type="password" id="password-2" placeholder="Password" />
            <p className="text-sm text-muted-foreground">
               Enter your password.
            </p>
         </div>
         <div className={cn("flex items-center justify-center w-1/3")}>
            <Button className="w-11/12">Signup </Button>
         </div>
      </section>
   );
};

export default Signup;
