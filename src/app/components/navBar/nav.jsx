"use client";
import { useEffect, useRef, useState } from 'react';
import './nav.scss';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/app/context/theme/themeContext';

import gsap from 'gsap';
import { useSession } from 'next-auth/react'; 

export default function Navbar(){
    
    const {data: session} = useSession();
    
    const router = useRouter();
    const {theme, toggle} = useTheme();
    

    /*Toggling night/lightmode*/
    const toggleTheme = () => {
        toggle();
    }

    useEffect(()=>{
        document.body.setAttribute("data-theme", theme);

        gsap.to(document.body, {
            duration: .7, ease: "power2.out",
            css: {
            "--color-bg-01": theme === "dark" ? "rgba(17, 24, 33, 0.507)" : "rgba(177, 177, 177, 0.404)",
            "--color-bg-02": theme === "dark" ? "rgba(17, 24, 33, 0.644)" : "rgba(204, 204, 204, 0.65)" ,
            "--color-bg-03": theme === "dark" ? "rgba(17, 24, 33, 0.973)" : "rgba(249, 249, 249, 0.66)" ,
            "--color-bg-04": theme === "dark" ? "#111821" : "#c7c7c7e0" ,
            "--color-01": theme === "dark" ? "#0a1a24dc" : "#ffffff98" ,
    }
        })

    }, [theme]);


    return(

        <nav className='navbar'>

            <div className='navbar-left'>
                <h1 onClick={()=> router.push('/homePage')}>Shop</h1>
            </div>

            <div className='navbar-right'>
                <ul>
                    <li>                    
                        {session? <p>{session.user.nombre.split(" ")[0]}</p>: <a onClick={()=> router.push('/homePage')}>Ingresar</a>}                       
                    </li>

                    <li>
                        <div className='toggle' >
                            {theme === "dark" ? 
                            <i className="bi bi-sun-fill" onClick={toggleTheme}/> 
                            : 
                            <i className="bi bi-moon-fill" onClick={toggleTheme}/>}                
                        </div>
                    </li>
                </ul>
            </div>

        </nav>

    )

}