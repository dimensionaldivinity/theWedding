// @ts-nocheck
'use client'
import { signIn } from "next-auth/react";
import React from "react";
import { useState } from "react";

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    return(
        <div className="project-card">
             <div className="group">
    <input 
    
    onChange={(e) => setEmail(e.target.value)}
    type="email" className="name_hid" name="name" placeholder="" required></input>
    <span class="bar"></span>
    <label>email</label>
  </div>

  <div className="group">
    <input 
    
    onChange={(e) => setPassword(e.target.value)}
    type="password" className="name_hid" name="name" placeholder="" required></input>
    <span class="bar"></span>
    <label>email</label>
  </div>

 


        <div>
            <button 
            onClick={() => signIn('credentials', {email, password, redirect: true, callbackUrl:'/people'})}
            >
                sign in

            </button>
        </div>
        </div>
    )
}