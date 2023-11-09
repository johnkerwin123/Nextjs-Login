"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from 'next/image';


export default function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
         const res = await signIn('credentials',{
            email, password, redirect: false,
          });

          if (res.error)  {
            setError("Invalid Credentials");
            return;
          }

          router.replace("dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-md p-5 rounded-lg bg-gray-500/40">
          <Image src="/images/rameses.png" alt="Logo" width={160} height={160} className="mr-2 mb-3"/>
        <div className="place-items-center mb-4">
          <h1 className="text-center text-xl font-bold">Log in Form</h1>
        </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {error && (
                 <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>
              )}

              <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
              <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
              
              <button className="bg-blue-500 hover:bg-blue-500/60 font-bold rounded-md cursor-pointer px-6 py-2">Log in</button>

              <Link className="text-sm text-right" href={'/register'}>No account yet?
                <span className="underline">
                    Register
                </span> 
             </Link>
          </form>
      </div>
    </div>
    );
}