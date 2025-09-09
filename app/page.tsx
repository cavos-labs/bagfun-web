import Image from "next/image";
import WaitlistForm from "@/components/WaitlistForm";
import ScrollAnimations from "@/components/ScrollAnimations";
import SectionNavigation from "@/components/SectionNavigation";
import ScrollIndicator from "@/components/ScrollIndicator";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-dark-bg min-h-screen text-white overflow-y-scroll snap-y snap-mandatory h-screen">
      <ScrollAnimations />
      <SectionNavigation />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative snap-start snap-always">
        <div className="text-center mb-8">
          <h1 className="font-[family-name:var(--font-rama)] text-2xl sm:text-3xl md:text-5xl lg:text-7xl mb-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 fade-in-up">
            <span className="whitespace-nowrap">MEME COINS</span>
            <div className="relative scale-in">
              <Image
                src="/bag-fun.png"
                alt="bag.fun logo"
                width={522}
                height={716}
                className="w-70 h-auto sm:w-90 md:w-110 lg:w-120 xl:w-full"
                priority
              />
            </div>
            <span className="whitespace-nowrap">EVERYWHERE</span>
          </h1>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </section>

      {/* Launch Now Section */}
      <section id="launch" className="min-h-screen flex items-center justify-center px-4 py-12 sm:py-16 snap-start snap-always">
        <div className="text-center fade-in-up">
          <a
            href="https://app.bbag.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block group transition-all duration-300"
          >
            <Image
              src="/launch-now.png"
              alt="Launch Now"
              width={800}
              height={600}
              className="w-full h-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto group-hover:hidden"
            />
            <Image
              src="/launch-now-hover.png"
              alt="Launch Now"
              width={800}
              height={600}
              className="w-full h-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto hidden group-hover:block"
            />
          </a>
          <p>click on ye</p>
        </div>
      </section>

      {/* Create Coin Section */}
      <section id="create" className="min-h-screen flex items-center px-4 py-12 sm:py-16 snap-start snap-always">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="fade-in-left">
            <Image
              src="/create-coin.png"
              alt="Create Coin"
              width={400}
              height={300}
              className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md mx-auto md:mx-0"
            />
          </div>
          <div className="text-center md:text-left fade-in-right">
            <h2 className="font-[family-name:var(--font-rama)] text-3xl sm:text-4xl md:text-6xl mb-4 sm:mb-6">
              MEME COIN YOUR MOM
            </h2>
            <p className="font-inter text-gray-400 text-base sm:text-lg md:text-xl max-w-md mx-auto md:mx-0">
              create memecoins whenever you want, wherever you want for whatever you want.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section id="mobile" className="min-h-screen flex items-center px-4 py-12 sm:py-16 snap-start snap-always">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="text-center md:text-left order-2 md:order-1 fade-in-left">
            <h2 className="font-[family-name:var(--font-rama)] text-3xl sm:text-4xl md:text-6xl mb-4 sm:mb-6">
              DEGEN IN YOUR FINGERTIPS
            </h2>
            <p className="font-inter text-gray-400 text-base sm:text-lg md:text-xl max-w-md mx-auto md:mx-0">
              next level degen experience, in your pocket, 24/7, trade from your bed, wake up being rich (or broke).
            </p>
          </div>
          <div className="order-1 md:order-2 fade-in-right">
            <Image
              src="/mobile-prototype.png"
              alt="Mobile App"
              width={400}
              height={600}
              className="w-full h-auto max-w-48 sm:max-w-xs md:max-w-sm mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="min-h-screen flex flex-col justify-between px-4 py-12 sm:py-16 snap-start">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center mb-16">
          <div className="fade-in-left">
            <Image
              src="/dog-meme.png"
              alt="Under Construction"
              width={400}
              height={400}
              className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md mx-auto md:mx-0"
            />
          </div>
          <div className="text-center md:text-left fade-in-right">
            <h2 className="font-[family-name:var(--font-rama)] text-3xl sm:text-4xl md:text-6xl mb-6 sm:mb-8">
              WE ARE UNDER CONSTRUCTION
            </h2>
            <div className="max-w-md mx-auto md:mx-0 fade-in-up">
              <WaitlistForm />
            </div>
          </div>
        </div>
        
        {/* Footer inside last section */}
        <div className="fade-in-up mb-0">
          <Footer />
        </div>
      </section>
    </div>
  );
}
