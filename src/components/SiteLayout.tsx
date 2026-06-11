import { Header } from "./Header";
import { Footer } from "./Footer";
import { useEffect, type ReactNode } from "react";
import { useMode } from "@/context/ModeContext";
import { ModeSelectionScreen } from "./ModeSelectionScreen";
import { startPreloading } from "@/lib/productService";

export function SiteLayout({ children }: { children: ReactNode }) {
  const { mode } = useMode();

  useEffect(() => {
    startPreloading();
  }, []);

  if (!mode) {
    return <ModeSelectionScreen />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
