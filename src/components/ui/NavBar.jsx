import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavBarSVG from "./NavbarSVG";

export default function NavBar({ sectionRefs = [] }) {
  const navBar = useRef(null);
  const cta = useRef(null);
  const overlayRef = useRef(null);
  const hamburgerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tl = gsap.timeline();
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
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
          .to(navBar.current, { color: "#DDDDD5" })
          .to(hamburgerRef.current, { color: "#DDDDD5" }, 0)
          .to(".bg-secondary-100", { backgroundColor: "#0E0E0C" }, 0)
          .to(".font-grotesk span", { color: "#DDDDD5" }, 0),
        toggleActions: "restart reverse restart reverse",
      });
    });
  }, [sectionRefs]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
        className="fixed top-0 z-50 flex w-full -translate-y-full items-center justify-between bg-secondary-100 px-5 py-3"
      >
        {/* Mobile Layout */}
        <div className="flex w-full items-center justify-between md:hidden">
          <a href="#hero" aria-label="Logo" className="z-50">
            <h1 className="font flex items-center text-lg font-semibold">
              zeeshans resume{" "}
              <span className="ml-2">
                <NavBarSVG />
              </span>
            </h1>
          </a>

          {/* Hamburger Menu Icon */}
          <button
            ref={hamburgerRef}
            onClick={toggleMenu}
            className="relative z-50 h-6 w-6 focus:outline-none mr-3"
            aria-label="Toggle menu"
          >
            <span className="sr-only">Toggle menu</span>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span
                className={`absolute block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "rotate-45" : "-translate-y-2"
                }`}
              ></span>
              <span
                className={`absolute block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`absolute block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "-rotate-45" : "translate-y-2"
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden w-full items-center justify-between md:flex">
          <a href="#hero" aria-label="Logo" className="z-50">
            <h1 className="font flex items-center text-lg font-semibold">
              zeeshans resume{" "}
              <span className="ml-2">
                <NavBarSVG />
              </span>
            </h1>
          </a>
          <nav className=" space-x-7 font-grotesk text-body-3 sm:block">
            <a href="#about" className="group relative hidden md:inline-block">
              <span>about</span>
              <span className="absolute bottom-0 left-0 h-[0.125em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
            </a>
            <a
              href="#services"
              className="group relative hidden md:inline-block"
            >
              <span>services</span>
              <span className="absolute bottom-0 left-0 h-[0.125em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
            </a>
            <a href="#works" className="group relative hidden md:inline-block">
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
            onClick={toggleMenu}
            className="group relative inline-block text-black transition-colors hover:text-gray-600"
          >
            <span>about</span>
          </a>
          <a
            href="#services"
            onClick={toggleMenu}
            className="group relative inline-block text-black transition-colors hover:text-gray-600"
          >
            <span>services</span>
          </a>
          <a
            href="#works"
            onClick={toggleMenu}
            className="group relative inline-block text-black transition-colors hover:text-gray-600"
          >
            <span>projects</span>
          </a>
          <a
            href="./resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={toggleMenu}
            className="group relative inline-block text-black transition-colors hover:text-gray-600"
          >
            <span>resume</span>
          </a>
          <a
            className="button group relative mt-4 min-w-0 border border-transparent px-5 py-1.5 text-black duration-200 hover:border-accent-400 hover:bg-transparent"
            href="#contact"
            onClick={toggleMenu}
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
