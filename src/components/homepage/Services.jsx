import ServiceUi from "../ui/ServiceUi";
import Heading from "../ui/Heading";

export default function Services() {
  const expertiseItems = [
    "LLMs",
    "RAG/Multimodal AI",
    "Full-Stack Development",
    "MLOps",
    "UI/UX Design",
  ];

  const toolBoxItems = [
    "Python",
    "FastAPI",
    "TypeScript",
    "MERN",
    "PostgreSQL",
  ];

  return (
    <section id="services" className="my-[15%]" aria-label="services">
      <Heading title="services" />
      <div className="space-y-14">
        <ServiceUi
          title="my expertises."
          description="I specialize in building intelligent systems powered by Large Language Models, advanced RAG pipelines, and multimodal AI. Alongside AI, I develop scalable full-stack applications, design intuitive user experiences, and apply MLOps best practices to take projects from prototypes to production"
          items={expertiseItems}
        />
        <ServiceUi
          title="my digital tool box."
          description="My toolbox includes production-ready technologies like Python and FastAPI for backend AI services, TypeScript and the MERN stack for full-stack applications, and PostgreSQL for reliable data management. I continuously sharpen my skills while exploring new tools that push the boundaries of what I can build."
          items={toolBoxItems}
        />
      </div>
    </section>
  );
}
