export default function Skill() {
  return (
    <section id="skill" className="pt-32 pb-32 px-16">
      <div className="container mx-auto">
        <h1 className="p-2 font-semibold border-b-2 border-primary text-dark text-2xl mb-24 lg:text-3xl dark:text-white">
          My Personal Skills
        </h1>
        <div className="flex flex-wrap">
          {/* ROW 1 - LEFT : Programming */}
          <div
            className="w-full lg:w-1/2"
            data-aos="fade-down"
            data-aos-duration="1100"
          >
            <h4 className="font-bold text-center uppercase text-primary text-lg mb-3">
              Programming
            </h4>
            <img
              src="/img/skill-programming.png"
              alt="Programming"
              className="blob-img w-full max-w-md aspect-[4/3] mx-auto mb-4 object-cover shadow-lg"
            />
            <p className="text-base font-medium max-w-xl lg:text-lg text-center mx-auto">
              I have a strong foundation in programming and skilled in
              developing efficient algorithms and writing clean, maintainable
              code.
            </p>
          </div>

          {/* ROW 1 - RIGHT : Panah melengkung menuju Row 2 Kanan */}
          <div
            className="w-full lg:w-1/2 hidden lg:flex items-end justify-start order-3 lg:order-none"
            data-aos="fade-down"
            data-aos-duration="1100"
          >
            <svg
              width="300"
              height="300"
              viewBox="0 0 220 160"
              className="text-primary"
            >
              <path
                d="M 30 20 Q 200 20 200 140"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="6 6"
                markerEnd="url(#arrowhead1)"
              />
              <defs>
                <marker
                  id="arrowhead1"
                  markerWidth="10"
                  markerHeight="10"
                  refX="5"
                  refY="5"
                  orient="auto"
                >
                  <path d="M0,0 L10,5 L0,10 Z" fill="currentColor" />
                </marker>
              </defs>
            </svg>
          </div>

          {/* ROW 2 - LEFT : Panah melengkung menuju Row 3 */}
          <div
            className="w-full lg:w-1/2 hidden lg:flex items-end justify-end order-3 lg:order-none"
            data-aos="fade-down"
            data-aos-duration="1100"
          >
            <svg
              width="300"
              height="300"
              viewBox="0 0 220 160"
              className="text-primary"
            >
              <path
                d="M 190 20 Q 20 20 20 140"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="6 6"
                markerEnd="url(#arrowhead2)"
              />
              <defs>
                <marker
                  id="arrowhead2"
                  markerWidth="10"
                  markerHeight="10"
                  refX="5"
                  refY="5"
                  orient="auto"
                >
                  <path d="M0,0 L10,5 L0,10 Z" fill="currentColor" />
                </marker>
              </defs>
            </svg>
          </div>

          {/* ROW 2 - RIGHT : Web Development (gambar & teks seperti Row 1) */}
          <div
            className="w-full lg:w-1/2"
            data-aos="fade-right"
            data-aos-duration="1100"
          >
            <h4 className="font-bold text-center uppercase text-primary text-lg mb-3">
              IT technical support
            </h4>
            <img
              src="/img/skill-support.jpeg"
              alt="IT technical support"
              className="blob-img w-full max-w-md aspect-[4/3] mx-auto mb-4 object-cover shadow-lg"
            />
            <p className="text-base font-medium max-w-xl lg:text-lg text-center mx-auto">
              I have skills in providing technical support for IT systems,
              including troubleshooting hardware and software issues.
            </p>
          </div>

          {/* ROW 3 - target panah dari Row 2 Kiri, silakan isi konten skill berikutnya */}
          <div
            className="w-full lg:w-1/2"
            data-aos="fade-down"
            data-aos-duration="1100"
          >
            <h4 className="font-bold text-center uppercase text-primary text-lg mb-3">
              Graphic Design
            </h4>
            <img
              src="/img/skill-design.png"
              alt="Gra"
              className="blob-img w-full max-w-md aspect-[4/3] mx-auto mb-4 object-cover shadow-lg"
            />
            <p className="text-base font-medium max-w-xl lg:text-lg text-center mx-auto">
              I have a strong foundation in graphic design, with skills in
              creating visually appealing designs for various media, including
              digital and print.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
