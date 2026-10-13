import { useEffect, useRef, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import type { KeenSliderInstance } from "keen-slider";
import "keen-slider/keen-slider.min.css";
import gsap from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* TIPE DATA                                                           */
/* ------------------------------------------------------------------ */
interface ProjectItem {
  id: string;
  title: string;
  thumbnail: string;
  summary: string;
  description: string;
  screenshots: string[];
  features: string[];
  techStack: string[];
  github?: string;
  demo?: string;
}

/* ------------------------------------------------------------------ */
/* DATA PROJECT - ganti isinya dengan project kamu                     */
/* ------------------------------------------------------------------ */
const projects: ProjectItem[] = [
  {
    id: "project-1",
    title: "Human Resource Management System",
    thumbnail: "/img/project/project-1/ss-1.png",
    summary:
      "HRIS is an end-to-end HR management system built for a growing company. It handles everything an HR team needs day to day, from recruitment and attendance to payroll and payslips.",
    description:
      "HR teams often run daily work through spreadsheets, chat messages, and manual calculations, which makes approvals slow and payroll error-prone. I built HRIS as a single platform that covers the whole employee lifecycle: recruitment, employee records, attendance, leave, overtime, and payroll. I designed and developed it end to end as a solo full-stack developer, covering database schema, access control, business logic, UI, testing, and deployment. The system supports three roles (HR, Manager, Employee), each with its own dashboard and strictly scoped data access enforced at the database level through Row Level Security. The result is a production-deployed application with automated payroll generation, two-tier approval workflows, a public careers site on its own subdomain, and a CI pipeline that type-checks, tests, and builds on every push.",
    screenshots: [
      "/img/project/project-1/ss-1.png",
      "/img/project/project-1/ss-2.png",
      "/img/project/project-1/ss-3.png",
      "/img/project/project-1/ss-4.png",
      "/img/project/project-1/ss-5.png",
      "/img/project/project-1/ss-6.png",
      "/img/project/project-1/ss-7.png",
      "/img/project/project-1/ss-8.png",
    ],
    features: [
      "Role-based access for HR, Manager, and Employee, enforced with PostgreSQL Row Level Security",
      "Attendance with geolocation check-in, automatic late detection, and correction approvals",
      "Leave and overtime requests with per-type balances and two-tier approval (Manager → HR)",
      "Automated payroll generation with HR-configurable salary components and downloadable PDF payslips",
      "Public careers site with CV upload, a candidate pipeline, and automated status emails using editable templates",
      "One-click conversion of a hired candidate into an employee account",
      "Employee records with photos, private document storage, and organization structure",
      "Unit tests (Vitest) and CI/CD (GitHub Actions) covering payroll logic, validation, and approval flows",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "shadcn/ui",
      "Zod",
      "Vitest",
      "GitHub Actions",
      "Resend",
      "Vercel",
    ],
    github: "https://github.com/fazdajulioarzika/HRIS-NextJS",
    demo: "https://hris.arzikadev.my.id",
  },
  {
    id: "project-2",
    title: "TaskFlow - Project Management App",
    thumbnail: "/img/project/project-2/ss-1.png",
    summary:
      "A full-stack project management application featuring a Kanban board, team collaboration, and activity tracking. Designed to help small teams organize tasks, manage deadlines, and monitor project progress efficiently.",
    description:
      "TaskFlow is a project management application built for small teams that need a simple and efficient way to organize their work without the complexity of tools like Jira. Users can create projects, assign tasks to team members, manage workflows through a drag-and-drop Kanban board, collaborate through comments, and track project activities. The application includes JWT authentication, role-based access control for Admins, Managers, and Members, and server-side authorization to protect project data and ensure secure access to resources. The project was developed as a full-stack portfolio project, emphasizing maintainable architecture, responsive UI, and reliable backend security.",
    screenshots: [
      "/img/project/project-2/ss-1.png",
      "/img/project/project-2/ss-2.png",
      "/img/project/project-2/ss-3.png",
      "/img/project/project-2/ss-4.png",
      "/img/project/project-2/ss-5.png",
      "/img/project/project-2/ss-6.png",
      "/img/project/project-2/ss-7.png",
    ],
    features: [
      "Drag-and-drop Kanban board with Todo, In Progress, Review, and Done statuses",
      "Complete project and task management with priorities, deadlines, and assignees",
      "Automatic project progress tracking based on completed tasks",
      "Team collaboration with project members, task comments, and activity logs",
      "Notifications for task assignments and approaching deadlines",
      "Role-based access control for Admins, Managers, and Members",
      "JWT authentication, profile management, password changes, and avatar uploads",
      "Search and filtering for projects and tasks",
      "Responsive dashboard with project statistics and recent tasks",
      "Server-side authorization and input validation for secure API access",
    ],
    techStack: [
      "Vue 3",
      "Vite",
      "Vue Router",
      "Pinia",
      "Axios",
      "Tailwind CSS v4",
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "Mongoose",
      "JWT",
      "bcrypt",
      "Vercel",
    ],
    github:
      "https://github.com/username/project-2https://github.com/fazdajulioarzika/ProjectManagementApp-VueJS",
    demo: "https://taskflow.arzikadev.my.id",
  },
  {
    id: "project-3",
    title: "Roamly - Travel Explorer & Trip Planner",
    thumbnail: "/img/project/project-3/ss-1.png",
    summary:
      "A travel discovery and trip planning application that helps users explore destinations, check live weather, save favorite places, and organize day-by-day itineraries. Built with a focus on modern UI/UX.",
    description:
      "Roamly is a frontend travel application designed to make destination discovery and trip planning simple and enjoyable. Users can search for destinations, explore curated travel recommendations, view current weather and five-day forecasts, and discover locations through an interactive map. The application also allows users to save favorite destinations and create personalized itineraries with scheduled activities, notes, and flexible day management. Built with Vue 3, TypeScript, Tailwind CSS v4, and Pinia, the project emphasizes reusable components, structured API integration, accessible interactions, and reliable error handling. Favorites, trip plans, and cached photo metadata are stored locally in the browser, allowing users to manage their travel plans without creating an account.",
    screenshots: [
      "/img/project/project-3/ss-1.png",
      "/img/project/project-3/ss-2.png",
      "/img/project/project-3/ss-3.png",
      "/img/project/project-3/ss-4.png",
    ],
    features: [
      "Destination discovery homepage with curated recommendations and category browsing",
      "Debounced destination search with keyboard navigation and autocomplete",
      "Search results with URL-based queries and category filters",
      "Destination details with coordinates, current weather, and five-day forecasts",
      "Interactive maps powered by Leaflet and OpenStreetMap",
      "Destination photos integrated with the Unsplash API",
      "Favorite destinations persisted using localStorage",
      "Trip planner with create, edit, and delete functionality",
      "Day-by-day itineraries with activities, schedules, notes, and reordering",
      "Responsive layouts optimized for mobile devices and desktop screens",
      "Accessible interactions with keyboard support and reduced-motion preferences",
      "Automated unit, component, and end-to-end testing",
    ],
    techStack: [
      "Vue 3",
      "TypeScript",
      "Vite",
      "Vue Router",
      "Pinia",
      "Tailwind CSS v4",
      "Lucide Vue Next",
      "Leaflet",
      "OpenStreetMap",
      "Open-Meteo API",
      "Unsplash API",
      "Vitest",
      "Vue Test Utils",
      "Playwright",
      "Vercel",
    ],
    github: "https://github.com/fazdajulioarzika/Roamly-TourExplorerVueJS",
    demo: "https://roamly.arzikadev.my.id",
  },
];

/* ------------------------------------------------------------------ */
/* DETAIL PROJECT (overlay layar penuh)                                */
/* ------------------------------------------------------------------ */
interface ProjectDetailProps {
  project: ProjectItem;
  onClose: () => void;
}

function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);

  const [sliderRef, sliderInstance] = useKeenSlider<HTMLDivElement>({
    loop: true,
    initial: 0,
    slideChanged(s: KeenSliderInstance) {
      setCurrent(s.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  // animasi masuk + kunci scroll body
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (!reduce && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
      );
      gsap.fromTo(
        ".detail-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.08,
          delay: 0.15,
        }
      );
    }

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // animasi keluar
  const handleClose = (): void => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce || !panelRef.current) {
      onClose();
      return;
    }
    gsap.to(panelRef.current, {
      opacity: 0,
      y: 48,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  // tutup dengan tombol Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showControls =
    loaded && !!sliderInstance.current && project.screenshots.length > 1;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Detail project ${project.title}`}
      className="fixed inset-0 z-[100] overflow-y-auto bg-white dark:bg-slate-900"
    >
      <div className="container mx-auto px-4 lg:px-56 py-10 lg:py-16">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-10 detail-item">
          <button
            onClick={handleClose}
            className="inline-flex items-center gap-2 font-semibold text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            <ArrowLeft size={20} />
            Kembali
          </button>
          <button
            onClick={handleClose}
            aria-label="Tutup detail project"
            className="p-2 rounded-full text-dark dark:text-white hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X size={22} />
          </button>
        </div>

        {/* Title */}
        <h2 className="detail-item p-2 font-semibold border-b-2 border-primary text-dark text-2xl mb-10 lg:text-3xl dark:text-white">
          {project.title}
        </h2>

        <div className="flex flex-wrap gap-y-12">
          {/* Carousel */}
          <div className="detail-item w-full">
            <div className="relative">
              <div
                ref={sliderRef}
                className="keen-slider rounded-2xl shadow-lg dark:shadow-primary/30 aspect-[16/9] bg-slate-100 dark:bg-slate-800"
              >
                {project.screenshots.map((src, i) => (
                  <div key={src} className="keen-slider__slide">
                    <img
                      src={src}
                      alt={`${project.title} - screenshot ${i + 1}`}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {showControls && (
                <>
                  <button
                    onClick={() => sliderInstance.current?.prev()}
                    aria-label="Screenshot sebelumnya"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-dark shadow bg-primary hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    onClick={() => sliderInstance.current?.next()}
                    aria-label="Screenshot berikutnya"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-dark shadow bg-primary hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>

            {/* Dots */}
            {showControls && (
              <div className="flex justify-center gap-2 mt-5">
                {project.screenshots.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => sliderInstance.current?.moveToIdx(i)}
                    aria-label={`Ke screenshot ${i + 1}`}
                    aria-current={current === i}
                    className={`h-2.5 rounded-full transition-all ${
                      current === i
                        ? "w-8 bg-primary"
                        : "w-2.5 bg-primary/30 hover:bg-primary/60"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="w-full">
            <h4 className="detail-item font-bold text-primary text-2xl mb-3">
              Description
            </h4>
            <p className="detail-item text-base lg:text-lg mb-8">
              {project.description}
            </p>

            <h4 className="detail-item font-bold text-primary text-2xl mb-3">
              Features
            </h4>
            <ul className="detail-item space-y-2 mb-8">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-base lg:text-lg"
                >
                  <Check size={20} className="text-primary mt-1 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <h4 className="detail-item font-bold uppercase text-primary text-lg mb-3">
              Tech Stack
            </h4>
            <div className="detail-item flex flex-wrap gap-2 mb-8">
              {project.techStack.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-sm font-semibold rounded-full border-2 border-primary text-primary"
                >
                  {t}
                </span>
              ))}
            </div>

            {(project.github || project.demo) && (
              <div className="detail-item flex flex-wrap gap-3">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-white bg-primary rounded-full shadow-lg hover:opacity-90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                  >
                    <Github size={18} />
                    Source Code
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SECTION PROJECT                                                     */
/* ------------------------------------------------------------------ */
export default function Project() {
  const [active, setActive] = useState<ProjectItem | null>(null);

  return (
    <section id="project" className="pt-32 pb-32 px-2 lg:px-16">
      <div className="container mx-auto">
        <h1 className="p-2 font-semibold border-b-2 border-primary text-dark text-2xl mb-24 lg:text-3xl dark:text-white">
          My Projects
        </h1>

        <div className="flex flex-wrap -mx-4 gap-y-16">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="w-full lg:w-1/3 px-4"
              data-aos="fade-down"
              data-aos-duration="1100"
              data-aos-delay={i * 150}
            >
              <button
                onClick={() => setActive(p)}
                aria-label={`Lihat detail ${p.title}`}
                className="group block w-full text-center focus:outline-none"
              >
                <h4 className="font-bold text-primary text-lg mb-3">
                  {p.title}
                </h4>
                <div className="relative w-full max-w-md mx-auto mb-4">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
                <p className="text-base font-medium max-w-xl mx-auto mb-4">
                  {p.summary}
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {p.techStack.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="px-3 py-0.5 text-xs font-semibold rounded-full border border-primary text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <span className="bg-primary text-black py-1 px-2 rounded-full inline-flex items-center gap-1 font-semibold shadow-primary dark:text-black group-hover:gap-3 dark:hover:shadow-sm transition-all">
                  View Details
                  <ArrowRight size={18} />
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {active && (
        <ProjectDetail project={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
