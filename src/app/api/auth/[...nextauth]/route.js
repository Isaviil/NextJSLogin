import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
//import { verifyPassword } from "@/utils/auth"; 

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 1. Look up user by username
        const user = await prisma.user.findUnique({
          where: { usuario: credentials.username }
        });

        if (!user) {
          throw new Error("User not found");
        }

        // 2. Verify password (make sure you hash + verify)
       /*  const isValid = await verifyPassword(credentials.password, user.contrasenia); */
        const isValid = credentials.password === user.contrasenia;
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // 3. Return user object (will be saved in the session)
        return {
          id: user.cod_usu,
          nombre: user.nombre,
          usuario: user.usuario
        };
      }
    })
  ],
  callbacks: { 
    async session({ session, token }) { /* then this */ 
      //TODO Write down: the names come from #3. firstParameter.tableName.objectsFrom#3
      session.user.id = token.sub;
      session.user.nombre = token.nombre;
      console.log(session);
      return session;
    },

    //TODO Write down: The more values you want to pass, the more parameters you write here.
    async jwt({ token, user }) { /**This runs first */ 
      if (user) {
        token.nombre = user.nombre;
      }
      return token;
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };