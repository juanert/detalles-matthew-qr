import type { Metadata } from "next";
import DedicatoriaContent from "./DedicatoriaContent";

export const metadata: Metadata = {
  title: "Para la mejor mamá del mundo · Detalles Matthew",
  description:
    "Una dedicatoria especial para la mejor mamá del mundo. Te amo, mami.",
};

export default function DedicatoriaPage() {
  return <DedicatoriaContent />;
}
