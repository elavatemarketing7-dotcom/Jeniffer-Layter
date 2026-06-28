import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { EXPERT_INFO } from "../types";

interface LightboxProps {
  images: { imageUrl: string; title?: string; description?: string }[];
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  if (currentIndex === null) return null;

  const currentImage = images[currentIndex];

  const handleConsultationClick = () => {
    const text = `Olá Dra. Jeniffer Layter, vi o antes e depois da foto "${currentImage.title || "Resultado"}" no seu site e gostaria de saber qual procedimento foi realizado!`;
    const encodedText = encodeURIComponent(text);
    window.open(`${EXPERT_INFO.whatsappBaseUrl}&text=${encodedText}`, "_blank");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/95 backdrop-blur-md flex flex-col justify-between font-sans select-none">
        
        {/* Top bar */}
        <div className="p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-10">
          <div>
            {currentImage.title && (
              <h4 className="text-white font-serif font-medium text-sm md:text-base">
                {currentImage.title}
              </h4>
            )}
            {currentImage.description && (
              <p className="text-dark-400 text-[11px] md:text-xs">
                {currentImage.description}
              </p>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-white bg-dark-900/80 hover:bg-dark-800 rounded-full border border-white/10 transition-colors cursor-pointer"
            id="close-lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Content area with nav buttons */}
        <div className="flex-grow flex items-center justify-between px-2 md:px-6 relative">
          
          {/* Prev Button */}
          <button
            onClick={onPrev}
            className="p-3 text-white bg-dark-900/60 hover:bg-gold-500/80 rounded-full border border-white/5 transition-all cursor-pointer active:scale-90 flex-shrink-0 z-10"
            id="prev-lightbox"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image Wrapper */}
          <div className="max-w-4xl max-h-[70vh] flex items-center justify-center relative mx-4">
            <motion.img
              key={currentImage.imageUrl}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              src={currentImage.imageUrl}
              alt={currentImage.title || "Resultado"}
              className="max-w-full max-h-[65vh] object-contain rounded-lg border border-gold-400/20 shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Next Button */}
          <button
            onClick={onNext}
            className="p-3 text-white bg-dark-900/60 hover:bg-gold-500/80 rounded-full border border-white/5 transition-all cursor-pointer active:scale-90 flex-shrink-0 z-10"
            id="next-lightbox"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Footer actions */}
        <div className="p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center gap-3 z-10">
          <button
            onClick={handleConsultationClick}
            className="py-3 px-6 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full font-bold text-xs md:text-sm tracking-wider shadow-lg shadow-emerald-950/30 flex items-center justify-center gap-2 active:scale-95 cursor-pointer transition-all"
            id="btn-lightbox-whatsapp"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>QUERO UM RESULTADO COMO ESTE</span>
          </button>
          
          <p className="text-[10px] text-dark-500 italic">
            *Resultados podem variar de pessoa para pessoa. Fotos autorizadas por pacientes.
          </p>
        </div>

      </div>
    </AnimatePresence>
  );
}
