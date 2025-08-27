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
    <section ref={aboutSection} aria-label="about me">
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
        <div className="top-20 sm:sticky md:top-28 lg:top-32 md:w-1/2">
          <div className="w-full space-y-4 2xl:space-y-10">
            <h3
              ref={heading}
              className="translate-y-10 text-heading-3 2xl:text-7xl font-semibold leading-tight opacity-0"
            >
              A brief intro, who am I?
            </h3>
            <p ref={body} className=" translate-y-10 text-body-1 2xl:text-4xl opacity-0">
              Hi, I’m zeeshan 👋 — a Software Engineering student at NUST and an aspiring AI Engineer with a passion for turning ideas into real-world solutions. Alongside my degree, I’m also part of AIESEC in Business Development, where I get to grow my teamwork, communication, and leadership skills outside of the classroom.
              <br></br>
              <br></br>
              My main focus is in the field of Large Language Models (LLMs), where I’m actively exploring Retrieval-Augmented Generation (RAG) and multimodal RAG systems. I love working on how AI can combine reasoning with external knowledge to become more reliable and useful in real-world applications. Beyond research, I focus on building production-ready, end-to-end applications that are designed with real users in mind — applying concepts from DevOps to ensure scalability, reliability, and smooth deployment.
              <br></br>
              <br></br>
              While I’m comfortable across the stack, I especially enjoy the frontend and UI/UX side of development, where design meets functionality. I see every project as a chance to push my problem-solving skills, creativity, and technical depth further.
              <br></br>
              <br></br>
              Outside of coding, you’ll usually find me (struggling) at the gym, discovering new music, appreciating different forms of art or just goofing around :)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
