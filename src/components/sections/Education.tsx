export default function Education() {
  return (
    <section id="education" className="pt-32 pb-32 px-2 lg:px-16">
      <div className="container mx-auto">
        <h1 className=" p-2 font-semibold border-b-2 border-primary text-dark text-2xl mb-24 lg:text-3xl dark:text-white">
          My Education
        </h1>
        <div className="flex flex-wrap">
          {/* LEFT */}
          <div
            className="w-full px-4 mb-24 lg:w-1/2"
            data-aos="fade-down"
            data-aos-duration="1100"
          >
            <h4 className="font-bold uppercase text-primary text-lg mb-3">
              Vocational High School
            </h4>

            <h2 className="font-bold text-dark text-3xl mb-5 max-w-md lg:text-4xl dark:text-white">
              SMKN 1 Kedungwuni Pekalongan
            </h2>

            <p className="text-base font-medium max-w-xl lg:text-lg">
              My educational journey at SMKN 1 Kedungwuni, I achieved various
              milestones that reflect my dedication and proficiency in the field
              of information technology. One notable achievement is obtaining
              the Junior Network Administrator certification from the
              Professional Certification Institute.
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
                  href="/img/boys-kotak.jpg"
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
            <div className="w-full max-w-[580px]">
              <svg
                viewBox="0 0 580 390"
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                <image
                  href="/img/its-jas.JPG"
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
              College
            </h4>

            <h2 className="font-bold text-dark text-3xl mb-5 max-w-md lg:text-4xl dark:text-white">
              Institut teknologi dan Sains Nahdlatul Ulama Pekalongan
            </h2>

            <p className="text-base font-medium max-w-xl lg:text-lg">
              During my studies at Institut Teknologi dan Sains Nahdlatul Ulama
              Pekalongan, I was actively involved in various extracurricular
              activities. Serving on organizing committees for numerous campus
              events provided me with valuable experience, enhancing my skills
              in event management and working under time constraints.
            </p>
          </div>

          <div
            className="w-full px-4 lg:hidden lg:w-1/2"
            data-aos="fade-right"
            data-aos-duration="1100"
          >
            <div className="w-full max-w-[580px]">
              <svg
                viewBox="0 0 580 390"
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                <image
                  href="/img/its-jas.JPG"
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
