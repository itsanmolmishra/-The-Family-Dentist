import { Phone, MessageCircle } from "lucide-react";
import { useState } from "react";
import { clinic } from "../data/clinicConfig";

export function FloatingButtons() {
  const [showCallTooltip, setShowCallTooltip] = useState(false);
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false);

  return (
    <>
      {/* Floating Call Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
        {/* Call Button */}
        <div className="relative">
          {showCallTooltip && (
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
              Call us now!
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-6 border-transparent border-l-gray-900"></div>
            </div>
          )}
          <a
            href={clinic.phone1Tel}
            className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
            onMouseEnter={() => setShowCallTooltip(true)}
            onMouseLeave={() => setShowCallTooltip(false)}
            aria-label="Call Now"
          >
            <Phone className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
          </a>
        </div>

        {/* WhatsApp Button */}
        <div className="relative">
          {showWhatsAppTooltip && (
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
              Chat on WhatsApp
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-6 border-transparent border-l-gray-900"></div>
            </div>
          )}
          <a
            href="https://wa.me/917683054281"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
            onMouseEnter={() => setShowWhatsAppTooltip(true)}
            onMouseLeave={() => setShowWhatsAppTooltip(false)}
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>
    </>
  );
}