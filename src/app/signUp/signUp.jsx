'use client';
import './signUp.scss';
import Modal from '../components/modal/page';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function SignUp(){


    const router = useRouter();
    const [modalSuccess, setModalSuccess] = useState(null);
    const containerRef = useRef();
    const childContainerRef = useRef();
    const childContainerRef2 = useRef();
    const miniText = useRef();

    useEffect(()=>{
        let tl = gsap.timeline();
        tl.fromTo(containerRef.current, {opacity: .4}, { opacity: 1, ease: "power2.out", duration: .7})
        .fromTo(childContainerRef.current, {opacity: 0}, {opacity: 1, duration: .7, ease: "power2.out"})
        .fromTo(childContainerRef2.current, {opacity: 0}, {opacity: 1, duration: .7,ease: "power2.out"}, '<+=.3')
        .fromTo(miniText.current, {opacity: 0, x: -150}, {opacity: 1, x:0, duration: .7,ease: "power2.out"})
    }, [])


    /* sending info to back-end */
    const mutation = useMutation({
        mutationFn: async(newUser)=>{
            const res = await fetch('/api/userSignUp', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newUser)
            });

            if (!res.ok) throw new Error('Error creando al usuario');
            return res.json();
        },

        onSuccess: ()=> {
            setModalSuccess(
                {title: 'Usuario creado correctamente'}
            );
        },
        onError: (error)=>{
            alert(error.message);
        }
    });


    /* function to generate data on onSubmit */
    const handleSubmit = (e) =>{
        e.preventDefault();

        const formData = new FormData(e.target);

        const newUser = {
            username: formData.get('name'),
            password: formData.get('password'),
            name: formData.get('username'),
            email: formData.get('email'),
            phone: formData.get('phone'),
        };
        mutation.mutate(newUser);
    }


    return (

    <>
        
        {modalSuccess && <Modal title={modalSuccess.title} redirectTo="/homePage"/>}

        <section className='signUp' ref={containerRef}>
            <div className='signUp-img' ref={childContainerRef}>
                <img src='/images/mainBackground.jpg'/>
            </div>

            <div className='signUp-account' ref={childContainerRef2}>
                <div className='signUp-account-title'>
                    <h1>Registro de Usuario</h1>
                </div>

                <div className='signUp-account-input'>
                    <form onSubmit={handleSubmit}>
                        <div className='user-info'>
                            <label htmlFor="name">Nombres y apellidos</label>
                            <input id='name' name='name' type='text'></input>
                        </div>

                        <div className='user-info'>
                            <label htmlFor="password">Contraseña</label>
                            <input id="password" name='password' type='password'></input>
                        </div>

                        <div className='user-info'>
                            <label htmlFor="username">Nombre de Usuario</label>
                            <input id="username" name='username' type='text'></input>
                        </div>

                        <div className='user-info'>
                            <label htmlFor="email">Correo electrónico</label>
                            <input id="email" name='email' type='email'></input>
                        </div>

                        <div className='user-info'>
                            <label htmlFor="phone">Teléfono</label>
                            <input id="phone" name='phone' type='text'></input>
                        </div>       

                        <div className='signUp-btn'>
                            <a onClick={()=> router.push('/homePage')}>Regresar</a>
                            <button type='submit'>Registrar</button>
                        </div> 

                    </form>                                                    
                </div>
 


                <p ref={miniText}>Ya tienes una cuenta? <a onClick={()=> router.push('/homePage')}>Inicia sesión</a></p>  
            </div>
        </section>
    </>
    )

}