"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { QRCodeCanvas } from "qrcode.react";

const imagenes = [
  { src: "/images/madre/1.png", alt: "Recuerdo 1", hero: true },
  { src: "/images/madre/2.png", alt: "Recuerdo 2" },
  { src: "/images/madre/3.png", alt: "Recuerdo 3" },
  { src: "/images/madre/4.png", alt: "Recuerdo 4" },
  { src: "/images/madre/5.png", alt: "Recuerdo 5" },
];

const floralEmojis = ["🌷", "🌸", "🌹", "💐", "🌼", "❤️", "💕"];

export default function MadreContent() {
  const bgRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const signatureRef = useRef<HTMLParagraphElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const qrSectionRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(`${window.location.origin}/madre`);
  }, []);

  useEffect(() => {
    if (!petalsRef.current) return;
    const total = 32;
    for (let i = 0; i < total; i++) {
      const s = document.createElement("span");
      s.className = "madre-petal pointer-events-none absolute select-none will-change-transform";
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
      // Fondo: cambio sutil de gradiente
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { backgroundPosition: "0% 50%" },
          {
            backgroundPosition: "100% 50%",
            duration: 14,
            yoyo: true,
            ease: "sine.inOut",
            repeat: -1,
          }
        );
      }

      // Blobs flotando
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

      // Pétalos cayendo
      const petals = gsap.utils.toArray<HTMLElement>(".madre-petal");
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

      // Shimmer del título
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          backgroundPosition: "200% 50%",
          duration: 6,
          ease: "linear",
          repeat: -1,
        });
      }

      // Entrada en cascada
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
      if (qrSectionRef.current) {
        tl.fromTo(
          qrSectionRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.4"
        );
      }
      if (galleryRef.current) {
        const items = galleryRef.current.querySelectorAll(".gallery-item");
        tl.fromTo(
          items,
          { y: 40, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12 },
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

      // Respiración suave del logo
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
      {/* Fondo con gradiente animado */}
      <div
        ref={bgRef}
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(135deg, #fef3c7 0%, #fce7f3 35%, #ffe4e6 65%, #fef9c3 100%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Blobs */}
      <div ref={blobsRef} className="absolute inset-0 -z-10">
        <div
          className="blob absolute -top-32 -left-20 w-[44rem] h-[44rem] rounded-full blur-3xl opacity-60"
          style={{
            background: "radial-gradient(closest-side, #fbcfe8, transparent 70%)",
          }}
        />
        <div
          className="blob absolute -bottom-32 -right-24 w-[42rem] h-[42rem] rounded-full blur-3xl opacity-55"
          style={{
            background: "radial-gradient(closest-side, #fde68a, transparent 70%)",
          }}
        />
        <div
          className="blob absolute top-1/3 left-1/3 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-50"
          style={{
            background: "radial-gradient(closest-side, #fecdd3, transparent 70%)",
          }}
        />
      </div>

      {/* Pétalos cayendo */}
      <div ref={petalsRef} className="absolute inset-0 pointer-events-none" />

      {/* Contenido */}
      <main className="relative z-10 mx-auto max-w-5xl px-6 py-16 md:py-20">
        <header className="text-center mb-12">
          <p
            ref={eyebrowRef}
            className="text-xs sm:text-sm uppercase tracking-[0.3em] text-rose-700 mb-4 inline-flex items-center gap-3"
          >
            <span className="inline-block w-8 h-px bg-gradient-to-r from-transparent to-rose-400" />
            Día de la Madre
            <span className="inline-block w-8 h-px bg-gradient-to-l from-transparent to-rose-400" />
          </p>
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text drop-shadow-[0_4px_22px_rgba(244,114,182,0.35)]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #b45309 0%, #f43f5e 25%, #ec4899 50%, #f43f5e 75%, #b45309 100%)",
              backgroundSize: "200% 100%",
              backgroundPosition: "0% 50%",
            }}
          >
            Feliz Día de la Madre
          </h1>
        </header>

        <section
          ref={cardRef}
          className="bg-white/70 backdrop-blur rounded-3xl shadow-xl border border-rose-100 p-8 md:p-12 mb-12"
        >
          <p className="text-lg md:text-xl leading-relaxed text-amber-900 text-center">
            En el jardín de la vida, tú eres la flor más hermosa. Gracias por
            cada palabra de aliento, cada caricia silenciosa y cada sacrificio
            anónimo. Hoy y siempre, te celebramos por ser nuestro refugio,
            nuestra guía y nuestro amor más grande.
          </p>
          <p
            ref={signatureRef}
            className="text-base md:text-lg text-rose-600 text-center mt-6 font-semibold italic"
          >
            Con todo nuestro cariño, mamá.
          </p>
        </section>

        <section
          ref={qrSectionRef}
          className="mb-12 flex flex-col items-center text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-amber-800 mb-2">
            Compártelo con quien amas
          </h2>
          <p className="text-sm md:text-base text-rose-600 mb-6">
            Escanea el código para revivir este detalle
          </p>
          <div className="p-1.5 rounded-3xl bg-gradient-to-br from-amber-300 via-rose-300 to-pink-300 shadow-2xl">
            <div className="bg-white rounded-[1.35rem] p-5 md:p-6">
              {pageUrl ? (
                <QRCodeCanvas
                  value={pageUrl}
                  size={220}
                  level="H"
                  marginSize={2}
                  imageSettings={{
                    src: "/images/logo.png",
                    height: 56,
                    width: 56,
                    excavate: true,
                  }}
                />
              ) : (
                <div className="w-[220px] h-[220px] bg-rose-50 rounded-xl animate-pulse" />
              )}
            </div>
          </div>
          {pageUrl && (
            <p className="mt-4 text-xs text-amber-700/80 font-mono break-all max-w-md">
              {pageUrl}
            </p>
          )}
        </section>

        <section
          ref={galleryRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
        >
          {imagenes.map((img, i) => {
            const tilt = img.hero ? "" : i % 2 === 1 ? "-rotate-1" : "rotate-1";
            return (
              <div
                key={img.src}
                className={`gallery-item group relative overflow-hidden rounded-2xl border-4 border-white shadow-lg transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2 hover:rotate-0 ${tilt} ${
                  img.hero ? "sm:col-span-2 aspect-[2/1]" : "aspect-square"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={
                    img.hero
                      ? "(max-width: 640px) 100vw, 1024px"
                      : "(max-width: 640px) 100vw, 512px"
                  }
                  priority={img.hero}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
            );
          })}
        </section>

        <footer ref={footerRef} className="text-center mt-16">
          <a
            href="https://www.instagram.com/detallesmatthew_/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              ref={logoRef}
              src="/images/favicon.ico"
              alt="Detalles Matthew"
              width={64}
              className="drop-shadow-md"
            />
            <span className="text-sm font-semibold text-amber-700">
              Detalles Matthew
            </span>
          </a>
        </footer>
      </main>
    </div>
  );
}
