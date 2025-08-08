import HomePage from './clientLogin';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";
import { getServerSession } from 'next-auth';

export default async function Page() {
  
  const session = await getServerSession(authOptions);

  if (session){
    redirect("/redirectPage");
  }

  return <HomePage />;
}