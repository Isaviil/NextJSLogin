import SignUp from './signUp';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";
import { getServerSession } from 'next-auth';

export default async function SignUpSvr() {
    
    const session = await getServerSession(authOptions);

    if (session){
        redirect("/redirectPage");
    }

    return <SignUp/>;
}