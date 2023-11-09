"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";


export default function UserInfo()
{
   const {data:session} = useSession();

  return (
    <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-8 rounded-lg bg-zinc-300/40 flex flex-col gap-2 my-6">
           <div>
              Name: <span className="font-bold">{session?.user?.name}</span>
           </div>
           <div>
              Email: <span className="font-bold">{session?.user?.email}</span>
           </div>
           <button onClick={() => signOut()} className="shadow-lg bg-blue-300 font-bold text-white rounded-md px-6 py-2 mt-2">
              Logout
           </button>
        </div>
    </div>
  );
}