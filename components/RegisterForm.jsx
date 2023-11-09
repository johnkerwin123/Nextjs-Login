"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';


export default function RegisterForm() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!name || !email || !password) {
        setError("All fields are required!");
        return;
      }

      try {

        const resUserExists = await fetch('api/userExists', {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          }, 
          body: JSON.stringify ({ email }),
        });

        const { user } = await resUserExists .json();

        if (user) {
            setError("User already exist!");
            return;
        }

        const res = await fetch('api/register', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify ({
            name, 
            email, 
            password,
          }),
        });

        if (res.ok) {
          const form = e.target;
          form.reset();
          router.push('/');
        } else {
          console.log("User registrtion failed!")
        }
      } catch (error) {
          console.log("Error during registration: ", error);
      }

    };

  return (
  <div className="grid place-items-center h-screen">
    <div className="shadow-md p-5 rounded-lg bg-gray-500/50">
    <Image src="/images/rameses.png" alt="Logo" width={160} height={160} className="mr-2 mb-3"/>
        <div className="place-items-center mb-4">
          <h1 className="text-center text-xl font-bold">Register Form</h1>
        </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          { error && (
            <div className="bg-red-500 w-fit text-sm py-1 px-3 rounded-md mt-2">
             {error}
            </div>
          )}
          <input onChange={e => setName (e.target.value)} type="text" placeholder="Full Name" />
          <input onChange={e => setEmail (e.target.value)} type="text" placeholder="Email" />
          <input onChange={e => setPassword (e.target.value)} type="password" placeholder="Password" />
          <button className="bg-blue-500 hover:bg-blue-500/60 font-bold rounded-md cursor-pointer px-6 py-2">Register</button>

          

          <Link className="text-sm text-right" href={'/'}>Already have an account?
            <span className="underline">
                Log in
            </span> 
         </Link>
      </form>
   </div>
 </div>
);
}