export default function Role({ forwardedRef }) {
  return (
    <section
      ref={forwardedRef}
      id="about"
      className="nav-change my-[20%] flex select-none flex-col items-center justify-center overflow-hidden py-10 md:my-[12%]"
      aria-label=""
    >
      <div className="flex w-full items-center space-x-20">
        <h1 className="text-heading-1 font-medium leading-[1.25em] text-primary-200 md:leading-[1.08em]">
          I am a Software Engineering major at{" "}
          <span className="text-secondary-600">NUST</span> & I have a passion for
          solving real world problems using{" "}
          <span className="text-secondary-600">Artificial Intelligence</span>.
        </h1>
      </div>
    </section>
  );
}
