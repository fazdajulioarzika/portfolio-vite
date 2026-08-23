export default function Experience() {
  return (
    <section id="experience" className="pt-32 pb-32 px-2 lg:px-16">
      <div className="container mx-auto">
        <h1 className=" p-2 font-semibold border-b-2 border-primary text-dark text-2xl mb-24 lg:text-3xl dark:text-white">
          My Working Experience
        </h1>
        <div className="flex flex-wrap">
          {/* LEFT */}
          <div
            className="w-full px-4 mb-24 lg:w-1/2"
            data-aos="fade-down"
            data-aos-duration="1100"
          >
            <h4 className="font-bold uppercase text-primary text-lg mb-3">
              Web Developer Internship Jan 2024 - Mar 2024
            </h4>

            <h2 className="font-bold text-dark text-3xl mb-5 max-w-md lg:text-4xl dark:text-white">
              LPK-LKP Dewa Computer Pekalongan
            </h2>

            <p className="text-base font-medium max-w-xl lg:text-lg">
              During my internship at LPK-LKP Dewa Computer Pekalongan, I had
              the opportunity to work on various web development projects. I
              gained hands-on experience in front-end and back-end development,
              utilizing technologies such as HTML, CSS, JavaScript, and PHP.
              This internship allowed me to enhance my coding skills,
              collaborate with a team of developers, and contribute to the
              successful completion of projects.
            </p>
          </div>

          {/* RIGHT */}
          <div
            className="w-full px-4 lg:w-1/2 mb-24"
            data-aos="fade-right"
            data-aos-duration="1100"
          >
            <div className="w-full max-w-[580px]">
              <svg
                viewBox="0 0 580 390"
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id="verticalSlices">
                    {/* 1 */}
                    <rect x="0" y="40" width="58" height="310" rx="5" />

                    {/* 2 */}
                    <rect x="64" y="55" width="58" height="280" rx="5" />

                    {/* 3 */}
                    <rect x="128" y="5" width="58" height="350" rx="5" />

                    {/* 4 */}
                    <rect x="192" y="55" width="58" height="260" rx="5" />

                    {/* 5 */}
                    <rect x="256" y="45" width="58" height="300" rx="5" />

                    {/* 6 */}
                    <rect x="320" y="15" width="58" height="350" rx="5" />

                    {/* 7 */}
                    <rect x="384" y="50" width="58" height="270" rx="5" />

                    {/* 8 */}
                    <rect x="448" y="30" width="58" height="325" rx="5" />

                    {/* 9 */}
                    <rect x="512" y="80" width="58" height="245" rx="5" />
                  </clipPath>
                </defs>

                <image
                  href="/img/work-lpk.jpeg"
                  width="580"
                  height="390"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#verticalSlices)"
                />
              </svg>
            </div>
          </div>
          {/* LEFT */}

          <div
            className="w-full px-4 hidden lg:block lg:w-1/2"
            data-aos="fade-right"
            data-aos-duration="1100"
          >
            <img
              src="/img/maganghub.png"
              alt=""
              className="w-56 absolute z-10 top-0 right-0 rotate-20 rounded-lg shadow-lg shadow-primary/30"
            />
            <div className="w-full max-w-[580px]">
              <svg
                viewBox="0 0 580 390"
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                <image
                  href="/img/work-maganghub.jpg"
                  width="580"
                  height="390"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#verticalSlices)"
                />
              </svg>
            </div>
          </div>
          {/* RIGHT */}

          <div
            className="w-full px-4 mb-10 lg:w-1/2"
            data-aos="fade-down"
            data-aos-duration="1100"
          >
            <h4 className="font-bold uppercase text-primary text-lg mb-3">
              General Affair (Maganghub) Nov 2025 - May 2026
            </h4>

            <h2 className="font-bold text-dark text-3xl mb-5 max-w-md lg:text-4xl dark:text-white">
              Balai Pemasyarakatan Kelas II Pekalongan
            </h2>

            <p className="text-base font-medium max-w-xl lg:text-lg">
              After graduating from college, I had the opportunity to
              participate in a national internship program organized by the
              Ministry of Manpower. During my internship at the Class II
              Correctional Center in Pekalongan, I was able to handle various
              administrative and organizational tasks. I gained practical
              experience in office management, document handling, and
              communicating with different departments.
            </p>
          </div>

          <div
            className="w-full px-4 lg:hidden lg:w-1/2"
            data-aos="fade-right"
            data-aos-duration="1100"
          >
            <img
              src="/img/maganghub.png"
              alt=""
              className="w-36 md:w-42 absolute z-10 top-0 right-0 md:right-30 md:top-10 rotate-20 rounded-lg shadow-lg shadow-primary/30"
            />
            <div className="w-full max-w-[580px]">
              <svg
                viewBox="0 0 580 390"
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                <image
                  href="/img/work-maganghub.jpg"
                  width="580"
                  height="390"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#verticalSlices)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
