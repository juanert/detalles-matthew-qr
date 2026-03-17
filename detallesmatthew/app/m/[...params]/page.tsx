"use client";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type CatchAllParams = { params?: string[] };
const dec = (v?: string) => {
  if (!v) return "";
  try { return decodeURIComponent(v).replace(/\+/g, " "); }
  catch { return v; }
};

export default function MensajePage() {
  const { params } = useParams() as unknown as CatchAllParams;
  const [rawMensaje, rawNombre] = params ?? [];

  const mensaje = dec(rawMensaje) || "¡Hola, este es tu detalle personalizado!";
  const nombre = dec(rawNombre);

  const bgColorRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!petalsRef.current) return;
    const total = 28;
    for (let i = 0; i < total; i++) {
      const s = document.createElement("span");
      s.className = "petal pointer-events-none absolute select-none";
      s.textContent = "🌼";
      s.style.left = `${Math.random() * 100}%`;
      s.style.top = `${-10 - Math.random() * 30}%`;
      s.style.fontSize = `${Math.random() * 18 + 18}px`;
      s.style.opacity = `${0.65 + Math.random() * 0.35}`;
      petalsRef.current.appendChild(s);
    }
  }, []);

  useEffect(() => {
    // fondo
    if (bgColorRef.current) {
      gsap.fromTo(
        bgColorRef.current,
        { backgroundSize: "200% 200%", backgroundPosition: "0% 50%" },
        { backgroundSize: "200% 200%", backgroundPosition: "100% 25%", duration: 5, yoyo: true, ease: "none", repeat: -1 }
      );
    }

    // blobs
    if (bgRef.current) {
      const blobs = bgRef.current.querySelectorAll(".blob");
      blobs.forEach((el, i) => {
        gsap.timeline({ repeat: -1, yoyo: true }).to(el, {
          duration: 12 + i * 2,
          x: gsap.utils.random(-120, 120),
          y: gsap.utils.random(-80, 80),
          scale: gsap.utils.random(0.9, 1.25),
          rotate: gsap.utils.random(-10, 10),
          ease: "sine.inOut",
        });
      });
    }

    // caída de flores
    if (petalsRef.current) {
      const petals = gsap.utils.toArray<HTMLElement>(".petal");
      petals.forEach((p) => {
        const startX = parseFloat(p.style.left);
        const drift = gsap.utils.random(-15, 15);
        gsap.to(p, {
          y: "110vh",
          x: `${startX + drift}vw`,
          rotate: gsap.utils.random(-25, 25),
          duration: gsap.utils.random(8, 14),
          ease: "none",
          repeat: -1,
          delay: gsap.utils.random(0, 6),
        });
        gsap.to(p, {
          xPercent: gsap.utils.random(-40, 40),
          duration: gsap.utils.random(3, 6),
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });
    }

    // textos
    titleRef.current &&
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" }
      );

    nameRef.current &&
      gsap.fromTo(
        nameRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.1, ease: "power3.out" }
      );
  }, []);

  return (
    <div ref={bgColorRef} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-yellow-300 via-yellow-400 to-amber-500">
      {/* Fondo animado */}
      <div ref={bgRef} className="absolute inset-0 -z-10">
        {/* Blob 1 */}
        <div
          className="blob absolute -top-24 -left-16 w-[46rem] h-[46rem] rounded-full blur-3xl opacity-60"
          style={{ background: "radial-gradient(closest-side, #fef08a, transparent 70%)" }}
        />
        {/* Blob 2 */}
        <div
          className="blob absolute -bottom-28 -right-24 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-60"
          style={{ background: "radial-gradient(closest-side, #fbbf24, transparent 70%)" }}
        />
        {/* Blob 3 */}
        <div
          className="blob absolute top-1/3 left-1/3 w-[42rem] h-[42rem] rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(closest-side, #facc15, transparent 70%)" }}
        />
        {/* velos */}
        <div className="absolute inset-0 [background:radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.20),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/50 via-amber-100/30 to-transparent mix-blend-screen" />
        <div className="absolute inset-0 opacity-[0.06] bg-black" />
      </div>

      {/* Flores */}
      <div ref={petalsRef} className="absolute inset-0 -z-0" />

      {/* Contenido */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight 
                     text-transparent bg-clip-text 
                     bg-gradient-to-br from-amber-700 via-yellow-600 to-amber-800 drop-shadow-[0_6px_24px_rgba(255,200,0,0.35)]"
        >
          {mensaje}
        </h1>

        <p
          ref={nameRef}
          className={nombre ? "mt-4 inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-yellow-50/60 px-5 py-2.5 text-amber-900 shadow-sm backdrop-blur text-base md:text-lg font-semibold" : "hidden"}
          aria-label="Nombre"
          title={nombre}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
          {nombre}
        </p>
        <a href="https://www.instagram.com/detallesmatthew_/" target="_blank" rel="noopener noreferrer">
          <img src="/images/logo.png" className="mt-6" alt="" width={120} />
        </a>
      </main>
    </div>
  );
}
