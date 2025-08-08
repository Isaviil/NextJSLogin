'use client';
import { useEffect, useRef } from 'react';
import './redirectPage.scss';
import gsap from 'gsap';
import { signOut } from 'next-auth/react';

export default function RedirectPage(){

    const page = useRef();
    useEffect(()=>{
        gsap.fromTo(page.current, {opacity:.4}, {opacity: 1, duration: .7, ease: "power2.out"})
    })

    const handleLogOut = ()=>{
        signOut({callbackUrl: "/homePage"});
    }

    return(
        <div className='redirectPage' ref={page}>
            <h1>Log in y redireccion exitosa.</h1>
            <button onClick={handleLogOut}>Cerrar sesión</button>
        </div>
    )

}