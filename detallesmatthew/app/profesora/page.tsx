import type { Metadata } from "next";
import ProfesoraContent from "./ProfesoraContent";

export const metadata: Metadata = {
  title: "Gracias, Maestra Laurita · Detalles Matthew",
  description:
    "Un agradecimiento para la Maestra Laurita, de su pequeño Deinell y su mamá.",
};

export default function ProfesoraPage() {
  return <ProfesoraContent />;
}
