import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <div className="flex flex-col">
    Home Page
    <Link href={'/register'}>Register</Link>
    <Link href={'/login'}>Login</Link>
   </div>
  );
}
