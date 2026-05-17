import type { Metadata } from "next";
import PromoContent from "./PromoContent";

export const metadata: Metadata = {
  title: "10% de descuento - Detalles Matthew",
  description:
    "Síguenos en Instagram @detallesmatthew_ y reclama un 10% de descuento en tu próximo regalo.",
};

export default function PromoPage() {
  return <PromoContent />;
}
