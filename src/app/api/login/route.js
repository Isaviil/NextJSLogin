import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

const prisma = new PrismaClient()
const JWT_Secret = process.env.JWT_Secret;

export async function POST (request){

    const body = await request.json();
    

    try{
        
        const user = await prisma.user.findFirstOrThrow({
            where: {
                usuario: body.username,
                contrasenia: body.password
            }
        });


        const token = jwt.sign(
            {
                usuario: user.usuario,
                nombre: user.nombre,
            },
            JWT_Secret,
            {
                expiresIn: "1h",
            }
        );

        
        cookies().set('token', token, {
        httpOnly: true,      
        secure: true,        // 🔒 Use HTTPS in production
        sameSite: 'strict',  // 🛡️ Prevent CSRF
        path: '/',           // 📍 Available to all routes
        maxAge: 3600,        // ⏰ 1 hour
        });

       
        return new NextResponse(JSON.stringify({ message: "Login successful" }), { status: 200 });

    }catch(error){
        
        return new NextResponse(JSON.stringify({message: "Error al ingresar"}), {status:500})
    }

}