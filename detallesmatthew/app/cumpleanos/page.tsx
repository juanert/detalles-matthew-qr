import type { Metadata } from "next";
import CumpleanosContent from "./CumpleanosContent";

export const metadata: Metadata = {
  title: "¡Feliz cumpleaños, Daniel! · Detalles Matthew",
  description:
    "Una felicitación para Daniel. Brindemos por un año más de vida y por esos mil sueños nuevos que están por cumplirse.",
};

export default function CumpleanosPage() {
  return <CumpleanosContent />;
}
