"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { QRCodeCanvas } from "qrcode.react";

const imagenes: { src: string; alt: string; hero?: boolean }[] = [];

const floralEmojis = ["🍎", "📚", "✏️", "💚", "🌟", "🎓", "💐", "✨"];

const YOUTUBE_ID = "OnR1r6JsF8I";

// URL de producción: el QR y el enlace siempre apuntan al sitio publicado,
// aunque la página se abra desde localhost o desde un preview de Vercel.
const PAGE_URL = "https://detallesmatthew.vercel.app/profesora";

export default function ProfesoraContent() {
  const bgRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const heartRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const signatureRef = useRef<HTMLParagraphElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const musicSectionRef = useRef<HTMLElement>(null);
  const qrSectionRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  const [musicaActiva, setMusicaActiva] = useState(false);
  const [musicaIniciada, setMusicaIniciada] = useState(false);
  const [expandida, setExpandida] = useState<number | null>(null);

  // Bloquea el scroll y permite cerrar el lightbox con Escape
  useEffect(() => {
    if (expandida === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandida(null);
      if (e.key === "ArrowRight")
        setExpandida((i) => (i === null ? i : (i + 1) % imagenes.length));
      if (e.key === "ArrowLeft")
        setExpandida((i) =>
          i === null ? i : (i - 1 + imagenes.length) % imagenes.length
        );
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [expandida]);

  useEffect(() => {
    if (!petalsRef.current) return;
    const total = 36;
    for (let i = 0; i < total; i++) {
      const s = document.createElement("span");
      s.className =
        "dedi-petal pointer-events-none absolute select-none will-change-transform";
      s.textContent =
        floralEmojis[Math.floor(Math.random() * floralEmojis.length)];
      s.style.left = `${Math.random() * 100}%`;
      s.style.top = `${-10 - Math.random() * 30}%`;
      s.style.fontSize = `${Math.random() * 18 + 16}px`;
      s.style.opacity = `${0.55 + Math.random() * 0.4}`;
      petalsRef.current.appendChild(s);
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { backgroundPosition: "0% 50%" },
          {
            backgroundPosition: "100% 50%",
            duration: 16,
            yoyo: true,
            ease: "sine.inOut",
            repeat: -1,
          }
        );
      }

      if (blobsRef.current) {
        const blobs = blobsRef.current.querySelectorAll(".blob");
        blobs.forEach((el, i) => {
          gsap.timeline({ repeat: -1, yoyo: true }).to(el, {
            duration: 14 + i * 3,
            x: gsap.utils.random(-150, 150),
            y: gsap.utils.random(-100, 100),
            scale: gsap.utils.random(0.85, 1.3),
            rotate: gsap.utils.random(-15, 15),
            ease: "sine.inOut",
          });
        });
      }

      const petals = gsap.utils.toArray<HTMLElement>(".dedi-petal");
      petals.forEach((p) => {
        const startX = parseFloat(p.style.left);
        const drift = gsap.utils.random(-20, 20);
        gsap.to(p, {
          y: "115vh",
          x: `${startX + drift}vw`,
          rotate: gsap.utils.random(-45, 45),
          duration: gsap.utils.random(10, 18),
          ease: "none",
          repeat: -1,
          delay: gsap.utils.random(0, 8),
        });
        gsap.to(p, {
          xPercent: gsap.utils.random(-50, 50),
          duration: gsap.utils.random(3, 6),
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });

      if (titleRef.current) {
        gsap.to(titleRef.current, {
          backgroundPosition: "200% 50%",
          duration: 6,
          ease: "linear",
          repeat: -1,
        });
      }

      if (heartRef.current) {
        gsap.to(heartRef.current, {
          scale: 1.2,
          duration: 0.7,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 }
        );
      }
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { y: 30, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 },
          "-=0.3"
        );
      }
      if (musicSectionRef.current) {
        tl.fromTo(
          musicSectionRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.3"
        );
      }
      if (cardRef.current) {
        tl.fromTo(
          cardRef.current,
          { y: 40, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9 },
          "-=0.4"
        );
      }
      if (signatureRef.current) {
        tl.fromTo(
          signatureRef.current,
          { y: 8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.5"
        );
      }
      if (galleryRef.current) {
        const items = galleryRef.current.querySelectorAll(".gallery-item");
        tl.fromTo(
          items,
          { y: 40, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1 },
          "-=0.3"
        );
      }
      if (qrSectionRef.current) {
        tl.fromTo(
          qrSectionRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.3"
        );
      }
      if (footerRef.current) {
        tl.fromTo(
          footerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2"
        );
      }

      if (logoRef.current) {
        gsap.to(logoRef.current, {
          scale: 1.06,
          duration: 2.2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(135deg, #ecfeff 0%, #d1fae5 30%, #fef9c3 60%, #e0f2fe 100%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div ref={blobsRef} className="absolute inset-0 -z-10">
        <div
          className="blob absolute -top-32 -left-20 w-[44rem] h-[44rem] rounded-full blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(closest-side, #a7f3d0, transparent 70%)",
          }}
        />
        <div
          className="blob absolute -bottom-32 -right-24 w-[42rem] h-[42rem] rounded-full blur-3xl opacity-55"
          style={{
            background:
              "radial-gradient(closest-side, #fde68a, transparent 70%)",
          }}
        />
        <div
          className="blob absolute top-1/3 left-1/3 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-50"
          style={{
            background:
              "radial-gradient(closest-side, #a5f3fc, transparent 70%)",
          }}
        />
      </div>

      <div ref={petalsRef} className="absolute inset-0 pointer-events-none" />

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-16 md:py-20">
        <header className="text-center mb-10 md:mb-14">
          <p
            ref={eyebrowRef}
            className="text-xs sm:text-sm uppercase tracking-[0.3em] text-emerald-700 mb-4 inline-flex items-center gap-3"
          >
            <span className="inline-block w-8 h-px bg-gradient-to-r from-transparent to-emerald-400" />
            Para Usted, Maestra
            <span className="inline-block w-8 h-px bg-gradient-to-l from-transparent to-emerald-400" />
          </p>
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text drop-shadow-[0_4px_22px_rgba(16,185,129,0.35)]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #0f766e 0%, #10b981 25%, #f59e0b 50%, #10b981 75%, #0f766e 100%)",
              backgroundSize: "200% 100%",
              backgroundPosition: "0% 50%",
            }}
          >
            Gracias, Maestra Laurita
            <span ref={heartRef} className="inline-block ml-2 align-middle">
              💚
            </span>
          </h1>
          <p className="mt-4 text-sm md:text-base text-teal-800/80 italic">
            Tres años maravillosos que llevaremos siempre en el corazón
          </p>
        </header>

        {/* Reproductor de música */}
        <section
          ref={musicSectionRef}
          className="mb-10 md:mb-14 flex flex-col items-center"
        >
          <div className="w-full max-w-sm">
            <div className="p-1.5 rounded-3xl bg-gradient-to-br from-teal-300 via-emerald-300 to-amber-300 shadow-2xl">
              <div className="bg-white/85 backdrop-blur rounded-[1.35rem] overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-emerald-100">
                  <span className="relative flex h-3 w-3">
                    <span
                      className={`absolute inline-flex h-full w-full rounded-full bg-emerald-400 ${
                        musicaActiva ? "animate-ping opacity-75" : "opacity-0"
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-3 w-3 ${
                        musicaActiva ? "bg-emerald-500" : "bg-emerald-300"
                      }`}
                    />
                  </span>
                  <p className="text-sm font-semibold text-emerald-700">
                    🎵 Una canción para usted
                  </p>
                </div>
                <div className="relative aspect-[9/16] w-full bg-gradient-to-br from-emerald-200 via-teal-200 to-amber-200 overflow-hidden">
                  {musicaIniciada ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&loop=1&playlist=${YOUTUBE_ID}&controls=1&rel=0&modestbranding=1&playsinline=1`}
                      title="Canción dedicada a la Maestra Laurita"
                      className="absolute inset-0 w-full h-full"
                      allow="autoplay; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                      onLoad={() => setMusicaActiva(true)}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setMusicaIniciada(true)}
                      aria-label="Reproducir canción"
                      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-5 group cursor-pointer"
                    >
                      <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.6)_0%,_transparent_70%)]" />
                      <span className="relative text-6xl drop-shadow-lg select-none">
                        🍎
                      </span>
                      <span className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/95 shadow-2xl ring-4 ring-emerald-200 transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-10 h-10 text-emerald-500 ml-1"
                        >
                          <path d="M8 5.14v13.72c0 .79.87 1.27 1.54.84l10.79-6.86c.62-.39.62-1.29 0-1.68L9.54 4.3C8.87 3.87 8 4.35 8 5.14z" />
                        </svg>
                      </span>
                      <span className="relative text-emerald-700 font-semibold text-base">
                        Toca para reproducir
                      </span>
                      <span className="relative text-emerald-600/80 text-xs italic">
                        💚 Con cariño, de Deinell y su mamá 💚
                      </span>
                    </button>
                  )}
                </div>
                <div className="px-4 py-3 text-center">
                  <p className="text-xs text-teal-700/80">
                    {musicaIniciada
                      ? "Disfrute el momento ✨"
                      : "Pulsa el botón para escucharla"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mensaje principal */}
        <section
          ref={cardRef}
          className="bg-white/75 backdrop-blur rounded-3xl shadow-xl border border-emerald-100 p-7 md:p-12 mb-12"
        >
          <div className="text-center mb-7 pb-6 border-b border-emerald-100">
            <p className="text-sm md:text-base text-teal-700">
              <span className="uppercase tracking-[0.2em] text-xs text-emerald-600">
                Para
              </span>
              <br />
              <span className="text-xl md:text-2xl font-bold text-emerald-700">
                Maestra Laurita
              </span>
            </p>
            <p className="mt-4 text-sm md:text-base text-teal-700">
              <span className="uppercase tracking-[0.2em] text-xs text-emerald-600">
                De
              </span>
              <br />
              <span className="font-semibold text-emerald-700">
                su pequeño Deinell y su mamá
              </span>
            </p>
          </div>

          <p className="text-base md:text-lg leading-relaxed text-teal-900 text-center">
            No encuentro las palabras suficientes para expresarle mi más profundo
            agradecimiento por estos{" "}
            <span className="font-bold text-emerald-600">
              tres años maravillosos
            </span>
            . Su paciencia infinita, su dedicación inalcanzable y su amor
            incondicional por Deinell han sido un regalo para nuestra familia.
          </p>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-teal-900 text-center">
            Usted ha sabido ver más allá de las barreras y ha descubierto el{" "}
            <span className="font-semibold text-emerald-600">
              potencial brillante
            </span>{" "}
            que hay dentro de él. Gracias por creer en él, por celebrar sus
            logros, por pequeños que parecieran, y por enseñarnos que con amor y
            paciencia todo es posible.
          </p>
          <p
            ref={signatureRef}
            className="text-lg md:text-xl text-emerald-600 text-center mt-7 font-bold italic"
          >
            ¡La extrañaremos mucho! 💚
          </p>
        </section>

        {/* Galería */}
        {imagenes.length > 0 && (
          <section
            ref={galleryRef}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 mb-12"
          >
            {imagenes.map((img, i) => {
              const tilt = img.hero ? "" : i % 2 === 1 ? "-rotate-1" : "rotate-1";
              return (
                <button
                  type="button"
                  key={img.src}
                  onClick={() => setExpandida(i)}
                  aria-label={`Ampliar ${img.alt}`}
                  className={`gallery-item group relative overflow-hidden rounded-2xl border-4 border-white shadow-lg cursor-zoom-in transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2 hover:rotate-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 ${tilt} ${
                    img.hero
                      ? "col-span-2 md:col-span-3 aspect-[4/3] md:aspect-[16/9]"
                      : "aspect-[3/4]"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={
                      img.hero
                        ? "(max-width: 768px) 100vw, 1024px"
                        : "(max-width: 768px) 50vw, 340px"
                    }
                    priority={img.hero}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute bottom-2 right-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/85 text-emerald-600 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="m21 21-4.3-4.3M11 8v6M8 11h6" />
                    </svg>
                  </span>
                </button>
              );
            })}
          </section>
        )}

        {/* QR */}
        <section
          ref={qrSectionRef}
          className="mb-14 flex flex-col items-center text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-teal-800 mb-2">
            Comparte este agradecimiento
          </h2>
          <p className="text-sm md:text-base text-emerald-600 mb-6">
            Escanea el código para revivir esta dedicatoria
          </p>
          <div className="p-1.5 rounded-3xl bg-gradient-to-br from-teal-300 via-emerald-300 to-amber-300 shadow-2xl">
            <div className="bg-white rounded-[1.35rem] p-5 md:p-6">
              <QRCodeCanvas
                value={PAGE_URL}
                size={220}
                level="H"
                marginSize={2}
                imageSettings={{
                  src: "/images/logo-detalles.png",
                  height: 36,
                  width: 62,
                  excavate: true,
                }}
              />
            </div>
          </div>
          <a
            href={PAGE_URL}
            className="mt-4 text-xs text-teal-700/80 font-mono break-all max-w-md hover:text-emerald-600 hover:underline transition-colors"
          >
            {PAGE_URL}
          </a>
        </section>

        {/* Branding Detalles Matthew */}
        <footer ref={footerRef} className="text-center mt-10">
          <a
            href="https://www.instagram.com/detallesmatthew_/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              ref={logoRef}
              src="/images/logo-detalles.png"
              alt="Detalles Matthew"
              width={180}
              className="drop-shadow-md"
            />
            <span className="text-[11px] uppercase tracking-[0.25em] text-emerald-500">
              @detallesmatthew_
            </span>
            <span className="text-[11px] text-teal-700/70 italic">
              Hecho con amor para celebrar lo importante
            </span>
          </a>
        </footer>
      </main>

      {/* Lightbox: imagen ampliada */}
      {expandida !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Imagen ampliada"
          onClick={() => setExpandida(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          {/* Cerrar */}
          <button
            type="button"
            onClick={() => setExpandida(null)}
            aria-label="Cerrar"
            className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/90 text-emerald-700 shadow-lg hover:bg-white hover:scale-105 active:scale-95 transition"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              className="w-6 h-6"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Anterior */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setExpandida((i) =>
                i === null ? i : (i - 1 + imagenes.length) % imagenes.length
              );
            }}
            aria-label="Imagen anterior"
            className="absolute left-3 md:left-6 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/85 text-emerald-700 shadow-lg hover:bg-white hover:scale-105 active:scale-95 transition"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Siguiente */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setExpandida((i) => (i === null ? i : (i + 1) % imagenes.length));
            }}
            aria-label="Imagen siguiente"
            className="absolute right-3 md:right-6 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/85 text-emerald-700 shadow-lg hover:bg-white hover:scale-105 active:scale-95 transition"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[88vh] flex flex-col items-center"
          >
            <img
              src={imagenes[expandida].src}
              alt={imagenes[expandida].alt}
              className="max-h-[82vh] w-auto max-w-full rounded-2xl border-4 border-white shadow-2xl object-contain"
            />
            <p className="mt-3 text-xs text-white/70">
              {expandida + 1} / {imagenes.length} · toca fuera o pulsa Esc para
              cerrar
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
