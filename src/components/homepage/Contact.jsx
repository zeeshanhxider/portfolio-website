import { Icon } from "@iconify/react";
import { useEffect, useState, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import Heading from "../ui/Heading";

export default function Contact() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const heading = useRef(null);
  const body = useRef(null);
  const contactSection = useRef(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: contactSection.current,
      start: "180px bottom",

      // markers: true,
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
  }, [contactSection]);

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!validateEmail(form.email))
      newErrors.email = "Please enter a valid email address.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => setErrors({}), 5000);
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/xovnveoy", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setSuccess(false);
      }
    } catch (err) {
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="my-[10%] overflow-hidden"
      aria-label="contact me"
    >
      <Heading title="Contact" />
      <div
        ref={contactSection}
        className="mt-10 flex flex-col gap-20 md:grid md:grid-cols-6 md:px-12"
      >
        <div className="col-span-4">
          <h3
            ref={heading}
            className="max-w-lg translate-y-10 text-heading-3 font-semibold leading-tight opacity-0 2xl:max-w-3xl 2xl:text-7xl"
          >
            Have an awesome idea? Let&apos;s bring it to life.
          </h3>
          <form
            name="contact"
            autoComplete="off"
            className="mt-10 font-grotesk"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2">
              <div className="relative z-0">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="peer block w-full appearance-none border-0 border-b border-accent-100 bg-transparent px-0 py-2.5 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-body-3 text-accent-100 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 2xl:text-body-2"
                >
                  Your name
                </label>
                {errors.name && (
                  <span className="absolute -bottom-6 left-0 text-sm text-red-500">
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="relative z-0">
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className="peer block w-full appearance-none border-0 border-b border-accent-100 bg-transparent px-0 py-2.5 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-body-3 text-accent-100 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 2xl:text-body-2"
                >
                  Your email
                </label>
                {errors.email && (
                  <span className="absolute -bottom-6 left-0 text-sm text-red-500">
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="relative z-0 sm:col-span-2">
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  className="peer block w-full appearance-none border-0 border-b border-accent-100 bg-transparent px-0 py-2.5 focus:outline-none focus:ring-0"
                  placeholder=" "
                ></textarea>
                <label
                  htmlFor="message"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-body-3 text-accent-100 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 2xl:text-body-2"
                >
                  Your message
                </label>
                {errors.message && (
                  <span className="absolute -bottom-6 left-0 text-sm text-red-500">
                    {errors.message}
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="button group mt-10 border duration-200 hover:border-accent-400 hover:bg-transparent"
              disabled={submitting}
            >
              <span className="relative">
                <span className="group-hover:text-accent-400">
                  {submitting ? "Sending..." : "Send Message"}
                </span>
              </span>
            </button>
            {success && (
              <div className="mt-4 font-semibold text-green-600">
                Thank you! Your message has been sent.
              </div>
            )}
          </form>
        </div>
        <div className="col-span-2 grid grid-cols-1 gap-x-4 gap-y-8 text-accent-300 sm:grid-cols-2 sm:gap-y-0 md:grid-cols-1">
          <div className="space-y-3 ">
            <h4 className="text-body-1 font-semibold 2xl:text-4xl">
              Contact Details
            </h4>
            <div className="flex flex-col space-y-3 text-body-2 2xl:text-3xl">
              <a
                href="mailto:zeeshanhxider@gmail.com"
                className="group relative w-fit cursor-pointer"
                target="_blank"
                rel="noreferrer"
              >
                <span>zeeshanhxider@gmail.com</span>
                <span className="absolute bottom-0 left-0 h-[0.12em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
              </a>
            </div>
          </div>
          <div className="space-y-3 ">
            <h4 className="text-body-1 font-semibold 2xl:text-4xl">Socials</h4>
            <div className="space-y-3 text-body-2 2xl:text-3xl">
              <a
                href="https://github.com/zeeshanhxider"
                className="group flex items-center space-x-2"
                target="_blank"
                rel="noreferrer"
              >
                <Icon icon="mdi:github" color="#666" />
                <div className="relative">
                  <span>Github</span>
                  <span className="absolute bottom-0 left-0 h-[0.10em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/zeeshanhxider/"
                className="group group flex w-fit items-center space-x-2"
                target="_blank"
                rel="noreferrer"
              >
                <Icon icon="mdi:linkedin" color="#666" />
                <div className="relative">
                  <span>LinkedIn</span>
                  <span className="absolute bottom-0 left-0 h-[0.12em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
                </div>
              </a>
              <a
                href="https://www.instagram.com/zeeshanhxider/"
                className="group group flex w-fit items-center space-x-2"
                target="_blank"
                rel="noreferrer"
              >
                <Icon icon="mdi:instagram" color="#666" />
                <div className="relative">
                  <span>Instagram</span>
                  <span className="absolute bottom-0 left-0 h-[0.12em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
                </div>
              </a>
            </div>
          </div>
          <div className="space-y-3 ">
            <h4 className="text-body-1 font-semibold 2xl:text-4xl">Location</h4>
            <div className="space-y-2 text-body-2 2xl:text-3xl">
              <p>
                Islamabad, Pakistan <br></br>
                {time}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
