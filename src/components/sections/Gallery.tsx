import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

// ------------------------------------------------------------------
// Posisi tiap gambar dalam grid, index 0-5 (posisi dalam 1 slide).
// Mobile (default, grid-cols-2): total 8 sel (2 kolom x 4 baris) → pas, tanpa lubang.
// Desktop (sm:, grid-cols-4): total 12 sel (4 kolom x 3 baris) → pas, tanpa lubang.
// ------------------------------------------------------------------
const GRID_ITEM_CLASSES = [
  // 0: hero besar (kiri atas)
  "col-span-2 row-span-1 sm:col-start-1 sm:row-start-1 sm:col-span-2 sm:row-span-2",
  // 1: kecil (tengah atas)
  "col-span-1 row-span-1 sm:col-start-3 sm:row-start-1 sm:col-span-1 sm:row-span-1",
  // 2: tinggi penuh (kanan, membentang 3 baris)
  "col-span-1 row-span-1 sm:col-start-4 sm:row-start-1 sm:col-span-1 sm:row-span-3",
  // 3: kecil (tengah, di bawah item 1)
  "col-span-1 row-span-1 sm:col-start-3 sm:row-start-2 sm:col-span-1 sm:row-span-1",
  // 4: lebar (kiri bawah)
  "col-span-1 row-span-1 sm:col-start-1 sm:row-start-3 sm:col-span-2 sm:row-span-1",
  // 5: normal (tengah bawah)
  "col-span-2 row-span-1 sm:col-start-3 sm:row-start-3 sm:col-span-1 sm:row-span-1",
];

// ------------------------------------------------------------------
// Ganti path di bawah ini dengan gambar kamu sendiri.
// Taruh file-nya di /public/img/ (sama seperti work-lpk.jpeg, dsb).
// 12 gambar = 2 slide x 6 gambar.
// ------------------------------------------------------------------
const GALLERY_IMAGES = [
  { id: 0, src: "/img/gallery/1.png", alt: "Galeri foto 1" },
  { id: 1, src: "/img/gallery/2.jpg", alt: "Galeri foto 2" },
  { id: 2, src: "/img/gallery/3.jpeg", alt: "Galeri foto 3" },
  { id: 3, src: "/img/gallery/4.png", alt: "Galeri foto 4" },
  { id: 4, src: "/img/gallery/5.png", alt: "Galeri foto 5" },
  { id: 5, src: "/img/gallery/6.jpg", alt: "Galeri foto 6" },
  { id: 6, src: "/img/gallery/7.png", alt: "Galeri foto 7" },
  { id: 7, src: "/img/gallery/8.jpeg", alt: "Galeri foto 8" },
  { id: 8, src: "/img/gallery/9.jpeg", alt: "Galeri foto 9" },
  { id: 9, src: "/img/gallery/10.jpg", alt: "Galeri foto 10" },
  { id: 10, src: "/img/gallery/11.png", alt: "Galeri foto 11" },
  { id: 11, src: "/img/gallery/12.jpg", alt: "Galeri foto 12" },
];

const SLIDES = [GALLERY_IMAGES.slice(0, 6), GALLERY_IMAGES.slice(6, 12)];

export default function Gallery() {
  // ---------------- SLIDER (keen-slider) ----------------
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    slides: { perView: 1 },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  const prev = () => instanceRef.current?.prev();
  const next = () => instanceRef.current?.next();
  const goTo = (i: number) => instanceRef.current?.moveToIdx(i);
  // ---------------- END SLIDER ----------------

  // ---------------- LIGHTBOX ----------------
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isOpen = lightboxIndex !== null;

  const openLightbox = (id: number) => setLightboxIndex(id);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = useCallback(
    () =>
      setLightboxIndex((i: number | null) =>
        i === null ? null : (i + 1) % GALLERY_IMAGES.length
      ),
    []
  );
  const prevImage = useCallback(
    () =>
      setLightboxIndex((i: number | null) =>
        i === null
          ? null
          : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
      ),
    []
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, nextImage, prevImage]);
  // ---------------- END LIGHTBOX ----------------

  return (
    <section id="gallery" className="pt-32 pb-32 px-16">
      <div className="container mx-auto">
        <h1 className="p-2 mb-8 font-semibold border-b-2 border-primary text-dark text-2xl lg:text-3xl dark:text-white">
          My Gallery
        </h1>
        {/* Arrow controls */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={prev}
            disabled={currentSlide === 0}
            aria-label="Slide sebelumnya"
            className="rounded-full border border-primary/40 p-2 text-primary transition hover:bg-primary hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-primary"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            disabled={currentSlide === SLIDES.length - 1}
            aria-label="Slide berikutnya"
            className="rounded-full border border-primary/40 p-2 text-primary transition hover:bg-primary hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-primary"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div
          className="flex items-end justify-between mb-12"
          data-aos="fade-down"
          data-aos-duration="1100"
        ></div>

        {/* Slider viewport — keen-slider mengelola drag & transform sendiri */}
        <div ref={sliderRef} className="keen-slider">
          {SLIDES.map((slide, slideIdx) => (
            <div key={slideIdx} className="keen-slider__slide">
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-4
                           auto-rows-[130px] sm:auto-rows-[140px] md:auto-rows-[160px] py-4 "
              >
                {slide.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => openLightbox(img.id)}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay={idx * 100}
                    className={`group relative overflow-hidden rounded-lg shadow-md transition hover:shadow-lg hover:shadow-primary/30 ${GRID_ITEM_CLASSES[idx]}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-dark/0 opacity-0 transition duration-300 group-hover:bg-dark/40 group-hover:opacity-100">
                      <Expand className="text-white" size={22} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ke slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === currentSlide ? "w-6 bg-primary" : "w-1.5 bg-primary/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark/90 backdrop-blur-sm px-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            aria-label="Tutup"
            className="absolute top-5 right-5 z-10 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
          >
            <X size={26} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            aria-label="Gambar sebelumnya"
            className="absolute left-3 sm:left-6 z-10 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
          >
            <ChevronLeft size={30} />
          </button>

          <img
            src={GALLERY_IMAGES[lightboxIndex].src}
            alt={GALLERY_IMAGES[lightboxIndex].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl shadow-primary/20"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            aria-label="Gambar berikutnya"
            className="absolute right-3 sm:right-6 z-10 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
          >
            <ChevronRight size={30} />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 rounded-full bg-black/50 px-3 py-1 text-sm text-white/90">
            {lightboxIndex + 1} / {GALLERY_IMAGES.length}
          </div>
        </div>
      )}
    </section>
  );
}
