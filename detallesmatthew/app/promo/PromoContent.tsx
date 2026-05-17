"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { QRCodeCanvas } from "qrcode.react";

const fotos = Array.from({ length: 23 }, (_, i) => ({
  src: `/images/promo/${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `Detalle ${i + 1}`,
}));

const sparkles = ["✨", "💖", "🌸", "💝", "🌷", "💐"];

export default function PromoContent() {
  const bgRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const messageRef = useRef<HTMLElement>(null);
  const qrSectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const [pageUrl, setPageUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPageUrl(`${window.location.origin}/promo`);
  }, []);

  useEffect(() => {
    if (!sparklesRef.current) return;
    const total = 24;
    for (let i = 0; i < total; i++) {
      const s = document.createElement("span");
      s.className =
        "promo-sparkle pointer-events-none absolute select-none will-change-transform";
      s.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      s.style.left = `${Math.random() * 100}%`;
      s.style.top = `${-10 - Math.random() * 30}%`;
      s.style.fontSize = `${Math.random() * 16 + 14}px`;
      s.style.opacity = `${0.45 + Math.random() * 0.4}`;
      sparklesRef.current.appendChild(s);
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

      const flakes = gsap.utils.toArray<HTMLElement>(".promo-sparkle");
      flakes.forEach((p) => {
        const startX = parseFloat(p.style.left);
        const drift = gsap.utils.random(-20, 20);
        gsap.to(p, {
          y: "115vh",
          x: `${startX + drift}vw`,
          rotate: gsap.utils.random(-45, 45),
          duration: gsap.utils.random(12, 20),
          ease: "none",
          repeat: -1,
          delay: gsap.utils.random(0, 10),
        });
      });

      if (titleRef.current) {
        gsap.to(titleRef.current, {
          backgroundPosition: "200% 50%",
          duration: 7,
          ease: "linear",
          repeat: -1,
        });
      }

      if (ctaRef.current) {
        gsap.to(ctaRef.current, {
          boxShadow:
            "0 22px 55px -12px rgba(236,72,153,0.65), 0 0 0 6px rgba(251,207,232,0.45)",
          duration: 1.6,
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
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { scale: 0, rotate: -30, opacity: 0 },
          {
            scale: 1,
            rotate: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(2)",
            onComplete: () => {
              if (!badgeRef.current) return;
              gsap.to(badgeRef.current, {
                rotate: 6,
                scale: 1.05,
                duration: 1.8,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
              });
            },
          },
          "-=0.6"
        );
      }
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        );
      }
      if (messageRef.current) {
        tl.fromTo(
          messageRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
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
      if (galleryRef.current) {
        const items = galleryRef.current.querySelectorAll(".gallery-item");
        tl.fromTo(
          items,
          { y: 30, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.04 },
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
    });

    return () => ctx.revert();
  }, []);

  const handleCopy = async () => {
    if (!pageUrl) return;
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(135deg, #fff1f2 0%, #fce7f3 30%, #fbcfe8 60%, #fef3c7 100%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div ref={blobsRef} className="absolute inset-0 -z-10">
        <div
          className="blob absolute -top-32 -left-20 w-[42rem] h-[42rem] rounded-full blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(closest-side, #f9a8d4, transparent 70%)",
          }}
        />
        <div
          className="blob absolute -bottom-32 -right-24 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-55"
          style={{
            background:
              "radial-gradient(closest-side, #fcd34d, transparent 70%)",
          }}
        />
        <div
          className="blob absolute top-1/3 left-1/2 w-[38rem] h-[38rem] rounded-full blur-3xl opacity-50"
          style={{
            background:
              "radial-gradient(closest-side, #fecdd3, transparent 70%)",
          }}
        />
      </div>

      <div
        ref={sparklesRef}
        className="absolute inset-0 pointer-events-none"
      />

      <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-14 md:py-20">
        <header className="text-center mb-10 md:mb-14">
          <p
            ref={eyebrowRef}
            className="text-[10px] sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] text-rose-700 mb-4 inline-flex items-center gap-2 sm:gap-3"
          >
            <span className="inline-block w-6 sm:w-8 h-px bg-gradient-to-r from-transparent to-rose-400" />
            Detalles Matthew
            <span className="inline-block w-6 sm:w-8 h-px bg-gradient-to-l from-transparent to-rose-400" />
          </p>
          <h1
            ref={titleRef}
            className="text-[28px] leading-[1.1] sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text drop-shadow-[0_4px_22px_rgba(244,114,182,0.35)] px-1"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #b45309 0%, #f43f5e 25%, #ec4899 50%, #f43f5e 75%, #b45309 100%)",
              backgroundSize: "200% 100%",
              backgroundPosition: "0% 50%",
            }}
          >
            ¡Síguenos en Instagram y llévate un 10% de descuento!
          </h1>
        </header>

        <section
          ref={messageRef}
          className="relative mx-auto max-w-3xl mb-14 px-1"
          aria-labelledby="message-title"
        >
          <div className="bg-white/75 backdrop-blur rounded-3xl shadow-xl border border-rose-100 px-5 py-9 sm:p-10 md:p-12">
            <h2
              id="message-title"
              className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-6 sm:mb-8 text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #b45309 0%, #f43f5e 25%, #ec4899 50%, #f43f5e 75%, #b45309 100%)",
              }}
            >
              Un amor que no se marchita... <span aria-hidden="true">🌹</span>
            </h2>

            <div className="grid md:grid-cols-[1fr_auto] md:gap-10 gap-8 items-center">
              <div className="space-y-4 text-amber-900 leading-relaxed text-base sm:text-lg md:text-[1.05rem] text-center md:text-left">
                <p>
                  Ser mamá es un arte que se lleva en el corazón todos los
                  días, sin pausa y con un amor infinito.
                </p>
                <p>
                  Por eso, hoy no te entregamos una flor cualquiera; te
                  obsequiamos una flor eterna, porque tu dedicación, tu
                  fuerza y tu ternura merecen un homenaje que dure para
                  siempre.
                </p>
                <p className="pt-2 font-bold text-rose-600 text-lg sm:text-xl">
                  ¡Feliz Día de las Madres!
                </p>
                <p className="text-sm sm:text-base italic text-amber-700">
                  Te desea la familia de{" "}
                  <a
                    href="https://www.instagram.com/detallesmatthew_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold not-italic bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 bg-clip-text text-transparent hover:underline"
                  >
                    @detallesmatthew_
                  </a>
                  .
                </p>
              </div>

              <div className="mx-auto md:mx-0 w-full max-w-[260px] sm:max-w-[280px] md:max-w-[260px]">
                <div className="p-1.5 rounded-3xl bg-gradient-to-br from-amber-300 via-rose-300 to-pink-300 shadow-xl">
                  <div className="relative aspect-[9/16] rounded-[1.35rem] overflow-hidden bg-black">
                    <iframe
                      src="https://www.youtube.com/embed/BdoCnV7LbAc?rel=0&modestbranding=1&playsinline=1"
                      title="Detalles Matthew – Un amor que no se marchita"
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
                <p className="text-center text-[11px] sm:text-xs text-amber-700/80 mt-3">
                  Toca para reproducir el video
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={qrSectionRef}
          className="mb-14 flex flex-col items-center text-center px-2"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-800 mb-2">
            Compártelo con quien quieras consentir
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-rose-600 mb-6">
            Escanea o copia el enlace para regalar este descuento
          </p>
          <div className="p-1.5 rounded-3xl bg-gradient-to-br from-amber-300 via-rose-300 to-pink-300 shadow-2xl">
            <div className="bg-white rounded-[1.35rem] p-4 sm:p-6">
              {pageUrl ? (
                <QRCodeCanvas
                  value={pageUrl}
                  size={240}
                  level="H"
                  marginSize={2}
                  imageSettings={{
                    src: "/images/logo-detalles.png",
                    height: 50,
                    width: 86,
                    excavate: true,
                  }}
                  style={{
                    width: "min(240px, 70vw)",
                    height: "min(240px, 70vw)",
                  }}
                />
              ) : (
                <div
                  className="bg-rose-50 rounded-xl animate-pulse"
                  style={{
                    width: "min(240px, 70vw)",
                    height: "min(240px, 70vw)",
                  }}
                />
              )}
            </div>
          </div>
          {pageUrl && (
            <button
              type="button"
              onClick={handleCopy}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/80 hover:bg-white border border-rose-200 px-4 py-2 text-xs sm:text-sm text-amber-800 font-medium shadow-sm transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              {copied ? "¡Enlace copiado!" : "Copiar enlace"}
            </button>
          )}
        </section>

        <section ref={galleryRef} className="mb-12">
          <h2 className="text-center text-lg sm:text-xl md:text-2xl font-bold text-amber-800 mb-5 sm:mb-6">
            Detalles hechos con amor
          </h2>
          <div className="columns-2 sm:columns-3 md:columns-4 gap-2 sm:gap-3 md:gap-4 [column-fill:_balance]">
            {fotos.map((img, i) => (
              <div
                key={img.src}
                className={`gallery-item mb-2 sm:mb-3 md:mb-4 break-inside-avoid overflow-hidden rounded-xl sm:rounded-2xl border-2 sm:border-4 border-white shadow-md sm:shadow-lg transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-1 hover:rotate-0 ${
                  i % 3 === 0 ? "rotate-1" : i % 3 === 1 ? "-rotate-1" : ""
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={800}
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="relative mx-auto max-w-3xl bg-white/75 backdrop-blur rounded-3xl shadow-xl border border-rose-100 px-5 pt-14 pb-8 sm:p-10 md:p-12 mb-12">
          <div
            ref={badgeRef}
            className="absolute -top-8 right-3 sm:-top-6 sm:-right-6 z-20 select-none"
          >
            <div className="relative w-16 h-16 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-rose-500 via-pink-500 to-amber-400 shadow-xl flex flex-col items-center justify-center text-white ring-4 ring-white/70">
              <span className="text-xl sm:text-4xl font-black leading-none">
                10%
              </span>
              <span className="text-[8px] sm:text-xs uppercase tracking-widest font-bold mt-0.5 sm:mt-1">
                Off
              </span>
            </div>
          </div>

          <p className="text-base sm:text-xl md:text-2xl leading-relaxed text-amber-900 text-center font-medium">
            Síguenos en Instagram{" "}
            <a
              href="https://www.instagram.com/detallesmatthew_/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 bg-clip-text text-transparent hover:underline break-all"
            >
              @detallesmatthew_
            </a>{" "}
            y reclama un{" "}
            <span className="font-bold text-rose-600">10% de descuento</span> en
            tu próximo regalo.
          </p>

          <div className="mt-7 sm:mt-8 flex flex-col items-center">
            <a
              ref={ctaRef}
              href="https://www.instagram.com/detallesmatthew_/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-white font-bold text-sm sm:text-base md:text-lg shadow-xl transition-transform hover:scale-105 max-w-full"
              style={{
                background:
                  "linear-gradient(45deg, #f59e0b 0%, #ef4444 25%, #ec4899 55%, #8b5cf6 100%)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
              >
                <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.413.56.218.96.478 1.382.9.422.422.682.823.9 1.382.164.422.36 1.057.413 2.227.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.413 2.227a3.72 3.72 0 01-.9 1.382 3.72 3.72 0 01-1.382.9c-.422.164-1.057.36-2.227.413-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.413a3.72 3.72 0 01-1.382-.9 3.72 3.72 0 01-.9-1.382c-.164-.422-.36-1.057-.413-2.227C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.054-1.17.249-1.805.413-2.227.218-.56.478-.96.9-1.382.422-.422.823-.682 1.382-.9.422-.164 1.057-.36 2.227-.413C8.416 2.212 8.8 2.2 12 2.2zm0 1.8c-3.146 0-3.5.012-4.737.068-1.087.05-1.677.231-2.07.384a3.7 3.7 0 00-1.36.884 3.7 3.7 0 00-.884 1.36c-.153.393-.334.983-.384 2.07C2.51 8.5 2.5 8.854 2.5 12s.012 3.5.068 4.737c.05 1.087.231 1.677.384 2.07.21.539.46.92.884 1.36.44.424.821.674 1.36.884.393.153.983.334 2.07.384 1.237.057 1.59.068 4.737.068s3.5-.012 4.737-.068c1.087-.05 1.677-.231 2.07-.384a3.7 3.7 0 001.36-.884c.424-.44.674-.821.884-1.36.153-.393.334-.983.384-2.07.057-1.237.068-1.59.068-4.737s-.012-3.5-.068-4.737c-.05-1.087-.231-1.677-.384-2.07a3.7 3.7 0 00-.884-1.36 3.7 3.7 0 00-1.36-.884c-.393-.153-.983-.334-2.07-.384C15.5 4.01 15.146 4 12 4zm0 3.06A4.94 4.94 0 1116.94 12 4.94 4.94 0 0112 7.06zm0 8.14A3.2 3.2 0 108.8 12a3.2 3.2 0 003.2 3.2zm5.18-8.36a1.155 1.155 0 11-1.155-1.155 1.155 1.155 0 011.155 1.155z" />
              </svg>
              <span className="truncate">Seguir @detallesmatthew_</span>
            </a>
            <p className="text-[11px] sm:text-xs text-amber-700/80 mt-3 text-center max-w-xs">
              Muestra que nos sigues al hacer tu pedido para activar tu
              descuento.
            </p>
          </div>
        </section>

        <footer ref={footerRef} className="text-center mt-10">
          <a
            href="https://www.instagram.com/detallesmatthew_/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src="/images/favicon.ico"
              alt="Detalles Matthew"
              width={56}
              className="drop-shadow-md"
            />
            <span className="text-sm font-semibold text-amber-700">
              Detalles Matthew
            </span>
            <span className="text-xs text-rose-500">@detallesmatthew_</span>
          </a>
        </footer>
      </main>
    </div>
  );
}
