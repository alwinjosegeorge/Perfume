import { Link } from "@tanstack/react-router";
import { Instagram, Phone, MessageSquare } from "lucide-react";
import { VoguishMomentsLogo } from "./Header";

export function Footer() {
  return (
    <footer className="bg-cream/70 mt-16">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 py-14">
        <div className="grid md:grid-cols-2 gap-10 pb-10 border-b border-border">
          <div>
            <div className="mb-4"><VoguishMomentsLogo /></div>
            <p className="text-muted-foreground max-w-xs">
              We Sell Emotions &amp; Moments
            </p>
          </div>
          <div className="flex flex-col md:items-end justify-center gap-3 text-sm">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Phone:</span>
              <a href="tel:9061516361" className="font-semibold hover:text-accent">9061516361</a>
            </div>
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">WhatsApp:</span>
              <a href="https://wa.me/919061516361" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-accent">9061516361</a>
            </div>
            <div className="flex items-center gap-2.5">
              <Instagram className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Instagram:</span>
              <a href="https://www.instagram.com/voguishmoments?igsh=MWJiMnUyb3UxejFobw==" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-accent">@voguishmoments</a>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <nav className="flex flex-wrap gap-7 text-sm">
            <Link to="/" className="hover:text-accent">Home</Link>
            <Link to="/about" className="hover:text-accent">About Us</Link>
            <Link to="/contact" className="hover:text-accent">Contact Us</Link>
            <Link to="/shipping-policy" className="hover:text-accent">Shipping &amp; Return</Link>
            <Link to="/refund-policy" className="hover:text-accent">Refund Policy</Link>
            <Link to="/privacy-policy" className="hover:text-accent">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-accent">Terms &amp; Conditions</Link>
          </nav>
          
          {/* Payment Badges (UPI, RuPay, MasterCard, Visa, Net Banking) */}
          <div className="flex flex-wrap items-center justify-center gap-2 select-none pointer-events-none">
            {/* UPI */}
            <div className="bg-white rounded px-2.5 py-0.5 flex items-center justify-center h-[26px] border border-gray-100 shadow-sm">
              <svg viewBox="0 0 120 40" className="h-5 w-auto">
                <text x="10" y="29" fontFamily="Arial, sans-serif" fontWeight="900" fontStyle="italic" fill="#555" fontSize="22">UPI</text>
                <path d="M72 15 l10 10 l-10 10 Z" fill="#E65A26" />
                <path d="M84 15 l10 10 l-10 10 Z" fill="#097939" />
                <path d="M96 15 l10 10 l-10 10 Z" fill="#0C83C6" />
              </svg>
            </div>
            
            {/* RuPay */}
            <div className="bg-white rounded px-2.5 py-0.5 flex items-center justify-center h-[26px] border border-gray-100 shadow-sm">
              <svg viewBox="0 0 120 40" className="h-5 w-auto">
                <text x="8" y="29" fontFamily="Arial, sans-serif" fontWeight="900" fontStyle="italic" fill="#0C529C" fontSize="22">Ru<tspan fill="#E65A26">Pay</tspan></text>
                <path d="M82 13 l10 10 l-10 10 Z" fill="#E65A26" />
                <path d="M90 13 l10 10 l-10 10 Z" fill="#097939" />
              </svg>
            </div>

            {/* MasterCard */}
            <div className="bg-white rounded px-2.5 py-0.5 flex items-center justify-center h-[26px] border border-gray-100 shadow-sm">
              <svg viewBox="0 0 120 40" className="h-5 w-auto">
                <circle cx="50" cy="20" r="14" fill="#EB001B" />
                <circle cx="70" cy="20" r="14" fill="#F79E1B" opacity="0.85" />
              </svg>
            </div>

            {/* Visa */}
            <div className="bg-white rounded px-2.5 py-0.5 flex items-center justify-center h-[26px] border border-gray-100 shadow-sm">
              <svg viewBox="0 0 120 40" className="h-5 w-auto">
                <text x="15" y="30" fontFamily="Arial, sans-serif" fontWeight="900" fontStyle="italic" fill="#0157A2" fontSize="28">VISA</text>
                <path d="M15 15 L22 15 L19 21 Z" fill="#F79E1B" />
              </svg>
            </div>

            {/* Net Banking */}
            <div className="bg-white rounded px-2.5 py-0.5 flex items-center justify-center h-[26px] border border-gray-100 shadow-sm">
              <svg viewBox="0 0 120 40" className="h-5 w-auto">
                <path d="M15 15 L35 15 L25 8 Z" fill="#222" />
                <rect x="17" y="16" width="3" height="12" fill="#222" />
                <rect x="23" y="16" width="3" height="12" fill="#222" />
                <rect x="29" y="16" width="3" height="12" fill="#222" />
                <rect x="13" y="28" width="24" height="3" fill="#222" />
                <text x="42" y="20" fontFamily="Arial, sans-serif" fontWeight="900" fill="#222" fontSize="11">Net</text>
                <text x="42" y="31" fontFamily="Arial, sans-serif" fontWeight="900" fill="#222" fontSize="11">Banking</text>
              </svg>
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-1.5 text-xs text-muted-foreground text-center md:text-right">
            <p>© 2026 — Voguish Moments. All rights reserved.</p>
            <p>
              Designed & Developed by{" "}
              <a
                href="https://codexorastudio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-foreground hover:text-accent transition-colors"
              >
                Codexora Studio
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
