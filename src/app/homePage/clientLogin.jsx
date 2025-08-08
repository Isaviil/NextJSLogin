'use client';
import { useRouter } from 'next/navigation';
import Modal from '../components/modal/page';
import './homePage.scss';
import { useEffect, useState, useRef } from 'react';
import { signIn } from "next-auth/react"; 
import gsap from 'gsap';

export default function HomePage(){
    const router = useRouter();
    const containerRef = useRef();
    const childContainerRef = useRef();
    const childContainerRef2 = useRef();
    const miniText = useRef();

    useEffect(()=>{

        let tl = gsap.timeline();
        tl.fromTo(containerRef.current, {opacity: .4}, { opacity: 1, ease: "power2.out", duration: .7})
        .fromTo(childContainerRef.current, {opacity: 0}, {opacity: 1, duration: .7, ease: "power2.out"})
        .fromTo(childContainerRef2.current, {opacity: 0}, {opacity: 1, duration: .7,ease: "power2.out"}, '<+=.3')
        .fromTo(miniText.current, {opacity: 0, x: -150}, {opacity: 1, x:0, duration: .5,ease: "power2.out"})

    }, [])



    const [modalSuccess, setModalSuccess] = useState(null);
    /* function to retrieve the data on onSubmit */

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const username = formData.get("username");
        const password = formData.get("password");

        const result = await signIn("credentials", {
            redirect: false, //prevent automatic redirect
            username,
            password
        });
       
        if (result.error){
            alert(result.error);
        } else {
            setModalSuccess({ title: "Login exitóso", redirectTo: "/redirectPage" });
        }

    }



    return(
        <>

        {modalSuccess && <Modal title={modalSuccess.title} redirectTo={modalSuccess.redirectTo} />}

        <section className='home' ref={containerRef}>
            <div className='home-img' ref={childContainerRef}>
                <img src='./images/mainBackground.jpg'/>
            </div>

            <div className='home-logIn' ref={childContainerRef2}>

                <form onSubmit={handleSubmit}>
                    <div className='home-logIn-title'>
                        <h1>Inicio de sesión</h1>
                    </div>

                    <div className='home-logIn-input'>
                        <div className='user'>
                            <label htmlFor="username">Usuario</label>
                            <input id='username' name='username' type='text'></input>
                        </div>

                        <div className='password'>
                            <label htmlFor="password">Contraseña</label>
                            <input id="password" name='password' type='password'></input>
                        </div>
                    </div>

                    <div className='home-logIn-btn'>
                        <a>Regresar</a>
                        <button type='submit'>Ingresar</button>
                    </div>   

                    <p ref={miniText}>No tienes una cuenta? <a onClick={()=> router.push('/signUp')}>Regístrate</a></p>        
                </form>

                     
            </div>
        </section>
        </>
    );

}