import Heading from "../ui/Heading";

export default function Works({ forwardedRef }) {
  return (
    <section
      ref={forwardedRef}
      id="works"
      className="nav-change overflow-hidden my-[20%]"
    >
     <Heading title="Projects" />
      <div className="mt-10 grid grid-cols-1 gap-16 gap-y-10 md:grid-cols-12">
      </div>
       <div className="flex w-full items-center space-x-20 justify-center">
        <h1 className="text-heading-1 font-medium text-primary-200 leading-[1.25em] md:leading-[1.08em]">
          updating soon...
        </h1>
      </div>
    </section>
  );
}
