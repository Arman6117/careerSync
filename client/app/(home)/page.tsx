import Navbar from "./_components/navbar";
import HeroSection from "./_components/hero-section";
import WhySection from "./_components/why-section";
import JobSection from "./_components/job-section";
import Footer from "./_components/footer";

export default function LandingPage() {
  return (
    <>
    
    <main className="px-7 py-4">
      <section>
        <Navbar />
      </section>
      <section className="mt-20">
        <HeroSection />
      </section>
      <section className="mt-20">
        <WhySection />
      </section>
      <section className="mt-20">
        <JobSection />
      </section>
    </main>
    <footer className="px-7 py-4 mt-20">
      <Footer/>
    </footer>
    </>
  );
}
