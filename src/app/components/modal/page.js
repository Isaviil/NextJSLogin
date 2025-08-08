'use client';
import './modal.scss';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';

const Modal = ({title, redirectTo}) =>{
    const mod = useRef();
    const router = useRouter();

    useEffect(()=>{
            gsap.to(mod.current, {opacity: 1, pointerEvents: "auto", duration: 1, ease: "power2.out",
        onComplete: ()=>{
            gsap.delayedCall(1.5, ()=> router.push(redirectTo))
        }
        })
    }, [redirectTo])

    return(
    <section className='modal' ref={mod}>
        <div className='modal-container'>

            <h1>{title}</h1>
            <p>En breve te redireccionamos</p>

        </div>
    </section>
    )
}

export default Modal;