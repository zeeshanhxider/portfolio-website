import { gsap } from "gsap";
import { useRef, useEffect } from "react";

export default function Hero() {
  const img = useRef(null);
  const imgContainer = useRef(null);
  const titles = useRef([]);
  const scrollLine = useRef(null);
  const scroll = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.from(scrollLine.current, {
      translateX: -40,
      duration: 1.5,
      ease: "power4.inOut",
    });
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(imgContainer.current, {
      scale: 1.3,
      duration: 3.25,
      ease: "power3.inOut",
    })
      .from(
        img.current,
        { scale: 2, duration: 3.2, ease: "power4.inOut" },
        "-=3.1"
      )
      .to(titles.current, { y: 0, duration: 2, ease: "power4.inOut" }, "-=2.5")
      .from(scroll.current, { opacity: 0, duration: 1, ease: "out" }, "-=2");
  }, []);

  return (
    <section
      id="hero"
      className="hero relative flex h-screen w-full select-none items-center justify-center"
      aria-label="hero"
    >
      <div className="z-10 flex w-full  flex-col items-center text-title font-bold uppercase text-accent-300  2xl:space-y-16 2xl:text-[10vw]">
        <div className="title 2xl:py-16">
          <h1
            ref={(el) => (titles.current[0] = el)}
            className="w-full translate-y-96 overflow-visible text-[11.3vw]"
          >
            Hey, I&apos;m zeeshan
          </h1>
        </div>
        <div className=" title 2xl:py-16">
          <h1
            ref={(el) => (titles.current[1] = el)}
            className="font-outline-3 md:font-outline-4 translate-y-96 overflow-visible text-transparent text-[11.3vw] w-full"
          >
            Hey, I&apos;m zeeshan
          </h1>
        </div>
        <div className=" title 2xl:py-16">
          <h1
            ref={(el) => (titles.current[2] = el)}
            className="w-full translate-y-96 overflow-visible text-[11.3vw]"
          >
            Hey, I&apos;m zeeshan
          </h1>
        </div>
      </div>
      <div
        ref={imgContainer}
        className="absolute mx-auto  w-[55%] overflow-hidden rounded-md"
      ></div>
    </section>
  );
}
