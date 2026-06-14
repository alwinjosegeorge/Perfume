import { useState, useRef, useEffect } from "react";
import { useMode, FragranceMode } from "@/context/ModeContext";
import logoImg from "@/assets/logo.png";
import bgImage from "@/assets/divorce-hero.jpg";
import bgImageMobile from "@/assets/web-page-1.jpg";
import { ChevronDown, Check } from "lucide-react";

export function ModeSelectionScreen() {
  const { setMode } = useMode();
  const [selectedMode, setSelectedMode] = useState<FragranceMode | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEnter = () => {
    if (selectedMode) {
      setMode(selectedMode);
    }
  };

  const OPTIONS = [
    { id: "OUD_BASE", label: "Oud Base" },
    { id: "FLORAL_BASE", label: "Floral Base" },
    { id: "FRUITY_BASE", label: "Fruity Base" },
    { id: "FRESH_BASE", label: "Fresh Base" },
  ];

  const getModeLabel = (m: FragranceMode | null) => {
    switch (m) {
      case "OUD_BASE":
        return "Oud Base";
      case "FLORAL_BASE":
        return "Floral Base";
      case "FRUITY_BASE":
        return "Fruity Base";
      case "FRESH_BASE":
        return "Fresh Base";
      default:
        return "Choose your fragrance base";
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-start md:justify-center px-6 pt-[45vh] md:py-12 bg-cover bg-center select-none mode-selection-bg"
      style={{
        "--bg-desktop": `url(${bgImage})`,
        "--bg-mobile": `url(${bgImageMobile})`,
      } as React.CSSProperties}
    >
      {/* Dark overlay for vintage, low-light aesthetic - lighter on mobile to showcase bright background */}
      <div className="absolute inset-0 bg-black/20 md:bg-black/65 md:backdrop-blur-[2px]" />

      {/* Main card/form container - animate-fade-up runs here ONCE on mount */}
      <div className="relative z-10 max-w-sm w-full flex flex-col items-center animate-fade-up">
        {/* Centered Logo - Inverted to white */}
        <div className="mb-14 hidden md:block">
          <img
            src={logoImg}
            alt="Voguish Moments Logo"
            className="h-14 md:h-16 w-auto object-contain invert brightness-200 filter"
          />
        </div>

        {/* Title */}
        <h2 className="font-sans text-xs md:text-sm font-bold tracking-[0.2em] text-zinc-900 md:text-white text-center mb-4 md:mb-6 uppercase">
          SELECT YOUR SIGNATURE
        </h2>

        {/* Custom Dropdown Selection box */}
        <div ref={dropdownRef} className="w-full relative mb-3 md:mb-4">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-white flex items-center justify-between px-6 py-4 cursor-pointer outline-none border-none text-left"
          >
            <div className="flex items-center">
              <span className="text-[#888] text-xs font-sans font-bold tracking-wider mr-3 uppercase select-none">
                Mode:
              </span>
              <span
                className={`font-sans font-semibold text-xs md:text-sm ${
                  selectedMode ? "text-black" : "text-gray-400"
                }`}
              >
                {getModeLabel(selectedMode)}
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Custom Dropdown Options */}
          {isOpen && (
            <div className="absolute left-0 right-0 mt-1.5 bg-white border border-[#EAE8E2] shadow-2xl rounded-none py-1.5 z-[120] flex flex-col">
              {OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setSelectedMode(opt.id as FragranceMode);
                    setIsOpen(false);
                  }}
                  className={`w-full px-6 py-3.5 text-left text-xs md:text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    selectedMode === opt.id
                      ? "text-accent bg-[#FAF9F5]/70"
                      : "text-black hover:bg-[#FAF9F5]"
                  }`}
                >
                  <span className="font-sans font-semibold">{opt.label}</span>
                  {selectedMode === opt.id && <Check className="w-4 h-4 text-accent" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Enter Site Button */}
        <button
          type="button"
          onClick={handleEnter}
          disabled={!selectedMode}
          className={`w-full font-sans font-bold tracking-[0.2em] text-xs py-3.5 md:py-4.5 transition-all duration-300 uppercase border border-zinc-900/10 md:border-white/5 ${
            selectedMode
              ? "bg-[#333]/90 hover:bg-[#222]/90 text-white cursor-pointer hover:border-white/25 active:scale-[0.98]"
              : "bg-zinc-900/10 text-zinc-900/40 md:bg-white/10 md:text-white/30 cursor-not-allowed"
          }`}
        >
          ENTER SITE
        </button>

        {/* Small T&C link */}
        <span className="text-[10px] tracking-widest text-zinc-500 md:text-white/30 hover:text-zinc-800 md:hover:text-white/50 font-medium uppercase mt-4 md:mt-6 transition-colors cursor-pointer">
          Terms & Conditions
        </span>
      </div>
    </div>
  );
}
