import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

export default function Hero() {
  const greetRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const blobRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      greetRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    )
      .fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.3"
      )
      // Munculkan dulu roleRef (kosong), lalu ketik teksnya
      .fromTo(
        roleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.1 },
        "-=0.2"
      )
      .to(roleRef.current, {
        duration: 1,
        text: { value: "Website Developer", delimiter: "" },
        ease: "none",
      })
      // Kedipkan kursor lalu hilangkan
      .to(cursorRef.current, {
        opacity: 0,
        repeat: 3,
        yoyo: true,
        duration: 0.3,
      })
      .to(cursorRef.current, { opacity: 0, duration: 0.2 })
      .fromTo(
        descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.2"
      )
      .fromTo(
        btnRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(
        blobRef.current,
        { scale: 0, opacity: 0, transformOrigin: "center" },
        { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" },
        "-=0.8"
      )
      .fromTo(
        imgRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );
  }, []);

  return (
    <section id="home" className="pt-24 pb-28 px-2 lg:px-16">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          {/* LEFT TEXT */}
          <div className="hero w-full self-center px-4 lg:w-1/2">
            <h1
              ref={greetRef}
              className="text-base font-semibold text-primary md:text-xl"
            >
              Halo Everyone, I am
              <span
                ref={titleRef}
                className="block font-bold text-black text-4xl mt-1 dark:text-white lg:text-5xl"
              >
                Fazda Julio Arzika
              </span>
            </h1>

            {/* Role dengan efek typewriter */}
            <h2 className="flex items-center gap-1 text-3xl font-medium text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-teal-400 bg-clip-text">
              <span ref={roleRef}></span>
              {/* Kursor kedip */}
              <span
                ref={cursorRef}
                className="inline-block w-0.5 h-8 bg-purple-500 rounded-full"
              />
            </h2>

            <p ref={descRef} className="font-medium mb-10 leading-relaxed">
              a web developer who loves creating smooth, modern websites and
              applications.
            </p>

            <div ref={btnRef}>
              <Button asChild>
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full lg:w-1/2">
            <div className="mt-28 relative lg:mt-0 lg:right-0 lg:translate-x-15">
              <img
                ref={imgRef}
                src="/img/profile-hero.png"
                alt="Fazda Julio Arzika"
                width={350}
                className="max-w-full relative z-10 mx-auto"
              />
              <span
                ref={blobRef}
                className="absolute -bottom-20 left-1/2 -translate-x-1/2 md:scale-125 dark:animate-pulse"
              >
                <svg
                  width="500"
                  height="500"
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#16ff9eff"
                    d="M32,-49.2C40.8,-44.1,47,-34.2,55.1,-23.2C63.1,-12.2,72.9,-0.2,74.9,13.3C76.9,26.7,71,41.6,61.7,55C52.4,68.3,39.8,80.3,27.2,76.6C14.6,73,2.2,53.8,-14.2,48.8C-30.7,43.8,-51.2,52.9,-56.7,48.2C-62.2,43.5,-52.7,24.8,-54.7,8.1C-56.7,-8.6,-70.2,-23.4,-66.2,-29.4C-62.1,-35.4,-40.6,-32.6,-26.7,-35.4C-12.7,-38.2,-6.4,-46.8,2.6,-50.8C11.6,-54.8,23.1,-54.4,32,-49.2Z"
                    transform="translate(100 100)"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
