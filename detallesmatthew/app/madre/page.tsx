import type { Metadata } from "next";
import MadreContent from "./MadreContent";

export const metadata: Metadata = {
  title: "Feliz Día de la Madre - Detalles Matthew",
  description: "Un detalle especial para celebrar a mamá",
};

export default function MadrePage() {
  return <MadreContent />;
}
