import { useEffect, useRef } from "react";
import profileImg from "/profile.webp";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import Heading from "../ui/Heading";

export default function About() {
  const profile = useRef(null);
  const aboutSection = useRef(null);
  const heading = useRef(null);
  const body = useRef(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: aboutSection.current,
      start: "top 400px",
      animation: gsap
        .timeline()
        .to(
          heading.current,
          { opacity: 1, y: 0, ease: "power4.out", duration: 1.25 },
          0
        )
        .to(
          body.current,
          { opacity: 1, y: 0, ease: "power4.out", duration: 1.25 },
          0.2
        ),

      toggleActions: "play none none none",
    });
    ScrollTrigger.refresh();
  }, [aboutSection]);

  return (
    <section ref={aboutSection} aria-label="about me" className="py-10">
      <Heading title="about me" />
      <div className="mt-10 flex flex-col items-start gap-8 md:flex-row lg:gap-10 ">
        <div className="top-28 overflow-hidden rounded-md md:sticky md:w-1/2">
          <img
            ref={profile}
            loading="lazy"
            className="aspect-square h-auto w-full rounded-md object-cover object-center md:aspect-auto"
            src={profileImg}
            width="600"
            height="800"
            alt="portrait image of zeeshan standing"
          />
        </div>
        <div className="top-20 sm:sticky md:top-28 md:w-1/2 lg:top-32">
          <div className="w-full space-y-4 2xl:space-y-10">
            <h3
              ref={heading}
              className="translate-y-10 text-heading-3 font-semibold leading-tight opacity-0 2xl:text-7xl"
            >
              Who am I?
            </h3>
            <p
              ref={body}
              className=" translate-y-10 text-body-1 opacity-0 2xl:text-4xl"
            >
              Hi, I&apos;m Zeeshan 👋🏼 — a Software Engineering student at NUST
              and aspiring AI Engineer. My main focus is on Large Language
              Models (LLMs), particularly Retrieval-Augmented Generation (RAG)
              and multimodal RAG systems, exploring how AI can combine reasoning
              with external knowledge to solve real-world problems.
              <br />
              <br />
              I build production-ready AI applications, emphasizing scalability,
              reliability, and smooth deployment. While I&apos;m comfortable across
              the stack, I also enjoy frontend and UI/UX development,
              where design meets functionality.
              <br />
              <br />
              Beyond coding, I&apos;m part of AIESEC, honing teamwork,
              communication, and leadership skills. When not working,
              you&apos;ll find me (struggling) at the gym, exploring music, or enjoying
              different forms of art :)
              <br />
              <br />
              You can also check out my{" "}
              <a
                className="underline duration-300 ease-in-out hover:text-secondary-600"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                resume
              </a>{" "}
              in detail.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
