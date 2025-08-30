import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavBarSVG from "./NavbarSVG";
import { Squash as Hamburger } from "hamburger-react";

export default function NavBar({ sectionRefs = [] }) {
  const navBar = useRef(null);
  const cta = useRef(null);
  const overlayRef = useRef(null);
  const hamburgerRef = useRef(null);
  const lenisRef = useRef(null); // Store Lenis instance
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tl = gsap.timeline();
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
    });
    
    lenisRef.current = lenis; 
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    tl.to(navBar.current, {
      y: 0,
      duration: 3,
      delay: 0.5,
      ease: "power4.inOut",
    });
  }, []);

  useEffect(() => {
    sectionRefs.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 375px",
        end: "bottom 300px",
        animation: gsap
          .timeline()
          .to(navBar.current, { color: "#DDDDD5" }, 0)
          .to(hamburgerRef.current, { color: "#DDDDD5" }, 0)
          .to(".hb-text", { color: "#DDDDD5" }, 0)
          .to(".bg-secondary-100", { backgroundColor: "#0E0E0C" }, 0),
        toggleActions: "restart reverse restart reverse",
      });
    });
  }, [sectionRefs]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }

    const targetElement = document.querySelector(targetId);
    if (targetElement && lenisRef.current) {
      const navbarHeight = navBar.current?.offsetHeight || 60;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      lenisRef.current.scrollTo(offsetPosition, {
        duration: 1.5, 
        easing: (t) => 1 - Math.pow(1 - t, 3), 
      });
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      gsap.set(overlayRef.current, { display: "flex" });
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        overlayRef.current.querySelectorAll("a"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
          delay: 0.1,
          ease: "power2.out",
        }
      );
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(overlayRef.current, { display: "none" });
        },
      });
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        ref={navBar}
        className="fixed top-0 z-50 flex w-full -translate-y-full items-center justify-between bg-secondary-100 px-4 py-1 md:py-3"
      >
        {/* Mobile Layout */}
        <div className="flex w-full items-center justify-between md:hidden">
          <a 
            href="#hero" 
            aria-label="Logo" 
            className="z-50"
            onClick={(e) => handleSmoothScroll(e, "#hero")}
          >
            <h1 className="font flex items-center text-lg font-semibold">
              zeeshans resume{" "}
              <span className="ml-1.5">
                <NavBarSVG />
              </span>
            </h1>
          </a>

          {/* Hamburger Menu Icon */}
          <button
            aria-label="Toggle menu"
            className="hamburger-sync relative z-50 translate-x-1 focus:outline-none"
            onClick={toggleMenu}
            ref={hamburgerRef}
          >
            <Hamburger
              toggled={isMenuOpen}
              toggle={setIsMenuOpen}
              size={24}
              duration={0.4}
              color="currentColor"
            />
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden w-full items-center justify-between md:flex">
          <a 
            href="#hero" 
            aria-label="Logo" 
            className="z-50"
            onClick={(e) => handleSmoothScroll(e, "#hero")}
          >
            <h1 className="font flex items-center text-lg font-semibold">
              zeeshans resume{" "}
              <span className="ml-1.5">
                <NavBarSVG />
              </span>
            </h1>
          </a>
          <nav className=" space-x-7 font-grotesk text-body-3 sm:block">
            <a 
              href="#about" 
              className="group relative hidden md:inline-block"
              onClick={(e) => handleSmoothScroll(e, "#about")}
            >
              <span>about</span>
              <span className="absolute bottom-0 left-0 h-[0.125em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
            </a>
            <a
              href="#services"
              className="group relative hidden md:inline-block"
              onClick={(e) => handleSmoothScroll(e, "#services")}
            >
              <span>services</span>
              <span className="absolute bottom-0 left-0 h-[0.125em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
            </a>
            <a 
              href="#works" 
              className="group relative hidden md:inline-block"
              onClick={(e) => handleSmoothScroll(e, "#works")}
            >
              <span>projects</span>
              <span className="absolute bottom-0 left-0 h-[0.125em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
            </a>
            <a
              href="./resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative hidden md:inline-block"
            >
              <span>resume</span>
              <span className="absolute bottom-0 left-0 h-[0.125em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
            </a>
            <a
              ref={cta}
              className="button group relative mt-10 min-w-0 border border-transparent px-4 py-1.5 duration-200 hover:border-accent-400 hover:bg-transparent"
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "#contact")}
              style={{ backgroundColor: "#7cfc00", color: "#0e0e0c" }}
            >
              <span className="relative w-fit">
                <span>Let&apos;s Talk.</span>
              </span>
            </a>
          </nav>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 hidden flex-col items-center justify-center bg-secondary-100 md:hidden"
        style={{ display: "none" }}
      >
        <nav className="flex flex-col items-center space-y-8 font-grotesk text-2xl">
          <a 
            href="#about" 
            onClick={(e) => handleSmoothScroll(e, "#about")} 
            className="hb-text"
          >
            <span>about</span>
          </a>
          <a 
            href="#services" 
            onClick={(e) => handleSmoothScroll(e, "#services")} 
            className="hb-text"
          >
            <span>services</span>
          </a>
          <a 
            href="#works" 
            onClick={(e) => handleSmoothScroll(e, "#works")} 
            className="hb-text"
          >
            <span>projects</span>
          </a>
          <a
            href="./resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="hb-text"
          >
            <span>resume</span>
          </a>
          <a
            className="button group relative mt-4 min-w-0 border border-transparent px-5 py-1.5 text-black duration-200 hover:border-accent-400 hover:bg-transparent"
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            ref={cta}
            style={{ backgroundColor: "#7cfc00", color: "#0e0e0c" }}
          >
            <span className="relative w-fit">
              <span>Let&apos;s Talk.</span>
            </span>
          </a>
        </nav>
      </div>
    </>
  );
}