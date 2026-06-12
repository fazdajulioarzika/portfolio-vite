import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "keen-slider/keen-slider.min.css";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Article() {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: "free-snap", // ← ganti dari "free" ke "free-snap"
    slides: { perView: 4, spacing: 16 },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 2, spacing: 12 },
      },
      "(max-width: 640px)": {
        slides: { perView: 1, spacing: 12 },
      },
    },
  });

  const blogs = [
    {
      title: "Belajar React",
      desc: "Mulai dari dasar hingga mahir.",
      img: "https://picsum.photos/400/250?1",
    },
    {
      title: "TypeScript Modern",
      desc: "Cara menulis kode lebih aman & rapi.",
      img: "https://picsum.photos/400/250?2",
    },
    {
      title: "Tailwind Advanced",
      desc: "Optimasi utility-first.",
      img: "https://picsum.photos/400/250?3",
    },
    {
      title: "Tips GitHub",
      desc: "Boost produktivitas harian kamu.",
      img: "https://picsum.photos/400/250?4",
    },
    {
      title: "Belajar React",
      desc: "Mulai dari dasar hingga mahir.",
      img: "https://picsum.photos/400/250?1",
    },
    {
      title: "TypeScript Modern",
      desc: "Cara menulis kode lebih aman & rapi.",
      img: "https://picsum.photos/400/250?2",
    },
    {
      title: "Tailwind Advanced",
      desc: "Optimasi utility-first.",
      img: "https://picsum.photos/400/250?3",
    },
    {
      title: "Tips GitHub",
      desc: "Boost produktivitas harian kamu.",
      img: "https://picsum.photos/400/250?4",
    },
  ];

  return (
    <div className="pt-32 pb-32 px-16" id="blog">
      <h2
        className="text-3xl text-center font-semibold mb-12"
        data-aos="fade-down"
        data-aos-duration="1100"
      >
        Latest Blog
      </h2>

      {/* Wrapper relative untuk tombol navigasi */}
      <div className="relative">
        <div ref={sliderRef} className="keen-slider">
          {blogs.map((blog, i) => (
            <Card
              key={i}
              className="keen-slider__slide bg-white dark:bg-gray-900 rounded-xl shadow"
              data-aos="flip-right"
              data-aos-duration="1100"
            >
              <CardHeader>
                <img
                  src={blog.img}
                  className="rounded-lg w-full h-40 object-cover"
                />
                <CardTitle className="mt-2">{blog.title}</CardTitle>
                <CardDescription>{blog.desc}</CardDescription>
              </CardHeader>

              {/* ✅ CardFooter di luar CardHeader */}
              <CardFooter>
                <Button asChild className="w-full">
                  <a href="#" target="_blank">
                    Read Blog
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Tombol navigasi */}
        <button
          onClick={() => instanceRef.current?.prev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 
             bg-white dark:bg-gray-800 
             border border-gray-200 dark:border-gray-700
             shadow-md hover:shadow-lg
             text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white
             rounded-full p-2.5 z-10 
             transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Tombol Next */}
        <button
          onClick={() => instanceRef.current?.next()}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 
             bg-white dark:bg-gray-800 
             border border-gray-200 dark:border-gray-700
             shadow-md hover:shadow-lg
             text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white
             rounded-full p-2.5 z-10 
             transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
