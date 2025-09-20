import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

/* export async function GET() {
    const usuarios = await prisma.usuario.findMany();
    return NextResponse.json(usuarios);
}
 */

export async function POST(request) {
    const body = await request.json();

    const existingUser = await prisma.user.findUnique({
        where: {usuario: body.name}
    });

    if (existingUser){
        return NextResponse.json(
            {error: "Username already exists"},
            {status: 400 }
        )
    }

    try{
        const newUser = await prisma.user.create({
            data: {
                usuario: body.name,
                contrasenia: body.password,
                nombre: body.username,
                correo: body.email,
                telefono: body.phone
            }
        });
        return NextResponse.json({message: "Usuario creado con éxito", user: newUser});
    } catch(error){
        console.error("Error saving user: ", error);
        return NextResponse.json({error: "Hubo un error al registrar el usuario"}, {status: 500})
    }
}
