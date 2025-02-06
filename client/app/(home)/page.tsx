import Image from "next/image";
import Link from "next/link";
import Navbar from "./_components/navbar";
import HeroSection from "./_components/hero-section";

export default function LandingPage() {
  return (
   <main className="px-7 py-4">
     <section>
      <Navbar/>
     </section>
     <section className="mt-20">
      <HeroSection/>
     </section>
   </main>
  );
}
