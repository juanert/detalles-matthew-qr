"use client";

import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";

export default function CreacionPage() {
  const [mensaje, setMensaje] = useState("");
  const [nombre, setNombre] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  const generateUrl = () => {
    if (!mensaje.trim()) return "";
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const encodedMensaje = encodeURIComponent(mensaje);
    const encodedNombre = nombre.trim() ? encodeURIComponent(nombre) : "";
    return `${baseUrl}/m/${encodedMensaje}${encodedNombre ? `/${encodedNombre}` : ""}`;
  };

  const handleMensajeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMensaje(e.target.value);
    setQrUrl(generateUrl());
  };

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value);
    setQrUrl(generateUrl());
  };

  const downloadQR = async () => {
    if (qrRef.current === null) return;
    
    try {
      const dataUrl = await toPng(qrRef.current, { quality: 0.95 });
      const link = document.createElement("a");
      link.download = `qr-${mensaje.slice(0, 20).replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error al descargar el QR:", err);
    }
  };

  const copyLink = () => {
    const url = generateUrl();
    navigator.clipboard.writeText(url);
    alert("¡Enlace copiado al portapapeles!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-amber-800">
          Creador de Mensajes
        </h1>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            {/* Campo de mensaje */}
            <div>
              <label className="block text-sm font-medium text-amber-700 mb-2">
                Mensaje *
              </label>
              <input
                type="text"
                value={mensaje}
                onChange={handleMensajeChange}
                placeholder="Escribe tu mensaje especial..."
                className="w-full px-4 py-3 bg-white text-gray-900 placeholder:text-amber-400 border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
              />
            </div>

            {/* Campo de nombre */}
            <div>
              <label className="block text-sm font-medium text-amber-700 mb-2">
                Nombre (opcional)
              </label>
              <input
                type="text"
                value={nombre}
                onChange={handleNombreChange}
                placeholder="¿Para quién es este mensaje?"
                className="w-full px-4 py-3 bg-white text-gray-900 placeholder:text-amber-400 border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
              />
            </div>

            {/* Preview del enlace */}
            {mensaje && (
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                <p className="text-sm text-amber-700 mb-2">Enlace generado:</p>
                <p className="text-xs text-amber-600 break-all font-mono">
                  {generateUrl()}
                </p>
                <button
                  onClick={copyLink}
                  className="mt-2 text-sm text-amber-600 hover:text-amber-800 font-medium underline"
                >
                  Copiar enlace
                </button>
              </div>
            )}

            {/* QR Code */}
            {mensaje && (
              <div className="flex flex-col items-center space-y-4">
                <div
                  ref={qrRef}
                  className="bg-white p-6 rounded-xl shadow-lg border-4 border-amber-200"
                >
                  <QRCodeSVG
                    value={generateUrl()}
                    size={200}
                    level="H"
                    includeMargin={false}
                    imageSettings={{
                      src: "/images/logo.png",
                      height: 40,
                      width: 40,
                      excavate: true,
                    }}
                  />
                </div>
                
                <button
                  onClick={downloadQR}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-lg flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Descargar QR
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Instrucciones */}
        <div className="mt-8 text-center text-amber-600 text-sm">
          <p className="mb-2">Escribe un mensaje para generar tu código QR</p>
          <p className="text-amber-500">Comparte el QR para que otros vean tu mensaje con flores amarillas cayendo</p>
        </div>
      </div>
    </div>
  );
}
