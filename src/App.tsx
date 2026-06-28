import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  EXPERT_INFO, 
  BEFORE_AFTER_IMAGES, 
  HARMONIZATION_LOVE_IMAGES, 
  PATIENT_COMMENTS, 
  BENEFIT_CARDS, 
  STEP_CARDS 
} from "./types";
import Quiz from "./components/Quiz";
import Lightbox from "./components/Lightbox";
import { 
  Sparkles, 
  MapPin, 
  MessageCircle, 
  UserCheck, 
  ShieldCheck, 
  Award, 
  Heart, 
  Calendar, 
  ChevronRight, 
  Star, 
  Volume2, 
  VolumeX,
  Play, 
  ExternalLink, 
  Clock, 
  ArrowRight, 
  Lock,
  ArrowUpRight,
  Menu,
  CheckCircle2,
  Bookmark
} from "lucide-react";

export default function App() {
  const [showQuiz, setShowQuiz] = useState(true);
  const [lightboxImages, setLightboxImages] = useState<{ imageUrl: string; title?: string; description?: string }[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play video on quiz close to ensure autoplay starts
  useEffect(() => {
    if (!showQuiz && videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log("Autoplay was prevented, starting muted");
      });
    }
  }, [showQuiz]);

  const toggleMute = () => {
    if (videoRef.current) {
      const currentMuted = videoRef.current.muted;
      videoRef.current.muted = !currentMuted;
      setIsMuted(!currentMuted);
    }
  };

  // Helper to scroll to section smoothly
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Open lightbox for a specific category of images
  const openLightbox = (imagesList: { imageUrl: string; title?: string; description?: string }[], index: number) => {
    setLightboxImages(imagesList);
    setLightboxIndex(index % imagesList.length);
  };

  // Handle direct WhatsApp redirects
  const handleWhatsAppClick = (contextText?: string) => {
    const defaultText = "Olá Dra. Jeniffer Layter, gostaria de marcar uma avaliação e agendar um horário!";
    const text = contextText ? `${defaultText} (Origem: ${contextText})` : defaultText;
    const encodedText = encodeURIComponent(text);
    window.open(`${EXPERT_INFO.whatsappBaseUrl}&text=${encodedText}`, "_blank");
  };

  // Logradouro (Marquee Nav) Items
  const navItems = [
    { label: "Sobre Mim", id: "sobre-mim" },
    { label: "Prova Visual", id: "resultados" },
    { label: "Harmonização de ❤️", id: "harmonizacao-coracao" },
    { label: "Onde Nos Encontrar", id: "endereco" },
    { label: "Contato", id: "contato" }
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-dark-100 font-sans selection:bg-gold-500 selection:text-white relative overflow-x-hidden">
      
      {/* 1. INTERACTIVE QUIZ OVERLAY */}
      <AnimatePresence>
        {showQuiz && (
          <Quiz onCloseQuiz={() => setShowQuiz(false)} />
        )}
      </AnimatePresence>

      {/* FLOATING WHATSAPP BUTTON (Highly visible, pulsed CTA) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 max-w-[280px]">
        {/* Elegant notification pill */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 }}
          className="bg-emerald-600 text-white text-[11px] font-medium px-3 py-1.5 rounded-full shadow-lg shadow-emerald-950/50 flex items-center gap-1.5 border border-emerald-400/20"
        >
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
          <span>Fale direto com a Dra. Jeniffer</span>
        </motion.div>
        
        <motion.button
          onClick={() => handleWhatsAppClick("Botão flutuante")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full shadow-xl shadow-emerald-950/80 cursor-pointer flex items-center justify-center border-2 border-white/10 relative group"
          aria-label="Chamar no WhatsApp"
          id="btn-floating-whatsapp"
        >
          <MessageCircle className="w-7 h-7 fill-current" />
          <span className="absolute inset-0 rounded-full bg-emerald-500/30 -z-10 animate-ping group-hover:hidden"></span>
        </motion.button>
      </div>

      {/* MAIN CONTAINER */}
      <div className={`transition-all duration-700 ${showQuiz ? "blur-md scale-95 pointer-events-none" : "blur-0 scale-100"}`}>
        
        {/* LUXURY SLOW-MOVING NAVIGATION BAR (LOGRADOURO) */}
        <div className="sticky top-0 z-30 bg-dark-950/90 backdrop-blur-md border-b border-gold-500/10 py-3 shadow-lg shadow-black/30 overflow-hidden">
          <div className="relative flex items-center justify-center">
            
            {/* The infinite marquee ribbon */}
            <div className="flex whitespace-nowrap overflow-x-auto hide-scrollbar scroll-smooth w-full select-none">
              <div className="animate-marquee flex gap-12 items-center">
                {/* Repetindo 3 vezes para garantir fluxo infinito suave */}
                {[1, 2, 3].map((loopIdx) => (
                  <React.Fragment key={loopIdx}>
                    {navItems.map((item, idx) => (
                      <button
                        key={`${loopIdx}-${idx}`}
                        onClick={() => scrollToSection(item.id)}
                        className="text-xs uppercase tracking-widest text-dark-300 hover:text-gold-400 transition-colors font-medium cursor-pointer inline-flex items-center gap-2 flex-shrink-0"
                      >
                        <span className="text-gold-500/60">•</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
            
            {/* Subtle light guides on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-dark-950 to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-dark-950 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* 2. HERO / FIRST FOLD SECTION */}
        <header id="hero" className="relative pt-8 pb-16 md:py-24 bg-dark-950">
          {/* Subtle light background elements */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">
            
            {/* Elegant upper subtitle */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full text-gold-400 text-xs font-medium tracking-widest uppercase mb-6 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Estética Facial de Alta Performance</span>
            </div>

            {/* Profile Avatar Frame */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full p-1.5 bg-gradient-to-b from-gold-400 to-dark-800 shadow-2xl mb-8 group overflow-hidden">
              <div className="w-full h-full rounded-full overflow-hidden bg-dark-900 border border-gold-500/20">
                <img 
                  src={EXPERT_INFO.photos.primary} 
                  alt={EXPERT_INFO.name} 
                  className="w-full h-full object-cover object-top scale-110 group-hover:scale-115 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-dark-900 border border-gold-500/30 px-3 py-1 rounded-full text-[10px] text-gold-300 font-mono tracking-widest uppercase whitespace-nowrap">
                Jeniffer Layter
              </div>
            </div>

            {/* Premium Headline */}
            <div className="text-center space-y-4 max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-white tracking-tight leading-tight">
                Eu sou a <span className="text-gold-400 italic">Dra. Jeniffer Layter</span>, e revelo sua versão mais sofisticada e natural.
              </h1>
              <p className="text-base text-dark-300 font-light leading-relaxed max-w-xl mx-auto">
                Especialista em Harmonização Facial em Aripuanã, MT. Meu propósito é entregar rejuvenescimento e realce de traços com naturalidade, segurança e máxima elegância.
              </p>
            </div>

            {/* CTA Action Block */}
            <div className="mt-8 text-center space-y-3 w-full max-w-sm">
              <button
                onClick={() => handleWhatsAppClick("Hero Principal")}
                className="w-full py-4 px-6 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white rounded-2xl font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-xl shadow-gold-950/30 flex items-center justify-center gap-2.5 active:scale-[0.98] cursor-pointer"
                id="btn-hero-whatsapp"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Agendar Consulta no WhatsApp</span>
              </button>
              <div className="flex items-center justify-center gap-1.5 text-xs text-dark-400">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>Mapeamento inicial personalizado e sem compromisso</span>
              </div>
            </div>

            {/* VIDEO & INTRO PROCEDURE SECTION (Highlighted) */}
            <div className="w-full max-w-3xl mt-16 p-4 sm:p-6 bg-dark-900 border border-gold-500/15 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Video column */}
                <div className="md:col-span-5 relative group rounded-2xl overflow-hidden border border-gold-400/20 aspect-video md:aspect-[3/4] bg-dark-950 flex items-center justify-center min-h-[180px] shadow-inner">
                  
                  {/* HTML5 Video element configured safely to autoplay */}
                  <video
                    ref={videoRef}
                    id="procedure-preview-video"
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-80 transition-opacity duration-300"
                    playsInline
                    muted={isMuted}
                    loop
                    autoPlay
                    src={EXPERT_INFO.procedureVideoUrl}
                    onError={(e) => {
                      const videoEl = e.currentTarget;
                      videoEl.style.display = 'none';
                    }}
                  />

                  {/* Fallback overlay styled beautifully */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/40 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Floating Sound Control Only - Positioned in the corner to avoid obstructing the video */}
                  <button 
                    onClick={toggleMute}
                    className="absolute top-3 right-3 py-2 px-3 bg-dark-950/90 hover:bg-gold-400 hover:text-dark-950 text-gold-400 rounded-full transition-all duration-300 shadow-lg shadow-black/80 z-10 hover:scale-105 flex items-center justify-center cursor-pointer border border-gold-500/30 active:scale-95"
                    title={isMuted ? "Ativar som do procedimento" : "Mutar áudio"}
                    id="btn-toggle-video-mute"
                  >
                    {isMuted ? (
                      <div className="flex items-center gap-1.5 px-0.5 font-mono text-[9px] uppercase font-bold tracking-wider">
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>Sem Som</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-0.5 font-mono text-[9px] uppercase font-bold tracking-wider">
                        <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                        <span>Com Som</span>
                      </div>
                    )}
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center z-10 pointer-events-none">
                    <span className="text-[9px] font-mono text-gold-300 bg-dark-950/80 px-2 py-0.5 rounded-full border border-gold-500/20 backdrop-blur-sm">
                      ● Método Layter
                    </span>
                    {!isMuted && (
                      <span className="text-[9px] font-mono text-emerald-400 bg-dark-950/80 px-2 py-0.5 rounded-full border border-emerald-500/20 backdrop-blur-sm animate-pulse">
                        Áudio Ativo
                      </span>
                    )}
                  </div>
                </div>

                {/* Text column */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 text-gold-400">
                    <Heart className="w-5 h-5 fill-gold-500/10" />
                    <span className="text-xs font-mono tracking-widest uppercase font-semibold">Transformação com Arte</span>
                  </div>
                  
                  <h3 className="text-xl font-serif text-white leading-snug font-semibold">
                    Procedimentos Exclusivos com Propósito
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-dark-300 leading-relaxed font-light">
                    Descubra como a beleza pode ser realçada com técnica, sensibilidade e propósito. Resultados naturais e transformadores. Aperte o play e sinta a diferença de ser cuidada por quem entende que sua beleza é única, e merece atenção especial.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => handleWhatsAppClick("Quero saber mais sobre os procedimentos")}
                      className="text-xs text-gold-400 hover:text-gold-300 font-semibold uppercase tracking-widest inline-flex items-center gap-1.5 cursor-pointer group"
                    >
                      <span>CLIQUE AQUI PARA SABER MAIS</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </header>

        {/* 3. BLOCO "QUEM SOU EU" (Autoridade Humana) */}
        <section id="sobre-mim" className="py-20 border-t border-gold-500/10 bg-dark-900/40 relative">
          <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-gold-500/5 blur-3xl pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              
              {/* Photo column */}
              <div className="md:col-span-5 relative">
                <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-gold-600 to-gold-400 opacity-20 blur-md"></div>
                <div className="relative rounded-2xl overflow-hidden border border-gold-500/20 shadow-xl aspect-square md:aspect-[4/5] bg-dark-900">
                  <img 
                    src={EXPERT_INFO.photos.secondary} 
                    alt="Atendimento Dra. Jeniffer Layter" 
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 bg-dark-950/80 backdrop-blur-sm border border-gold-500/20 px-3 py-1.5 rounded-lg">
                    <p className="text-[10px] text-dark-400 leading-none">Localização</p>
                    <p className="text-xs text-white font-medium">Aripuanã, MT</p>
                  </div>
                </div>
              </div>

              {/* Story column */}
              <div className="md:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-gold-400 tracking-widest uppercase font-semibold">Minha Filosofia</span>
                  <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold leading-tight">
                    Quem está por trás do seu rejuvenescimento
                  </h2>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-dark-300 leading-relaxed font-light">
                  <p>
                    Eu acredito que a harmonização facial de verdade não transforma você em outra pessoa, mas sim traz de volta o frescor, a firmeza e a elegância que o tempo suavizou. Cada traço do seu rosto conta uma história única, e minha arte é poli-lo com absoluto respeito, técnica científica e sensibilidade apurada.
                  </p>
                  <p>
                    Não trabalho com rostos padronizados ou procedimentos exagerados. No meu espaço, cada paciente recebe uma avaliação honesta e detalhada, identificando exatamente os pontos que necessitam de sustentação, volume ou suavização, garantindo que você se sinta confiante e segura do início ao fim.
                  </p>
                </div>

                {/* Bullet Points with unique personal touches */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
                  {[
                    "Diagnóstico facial individualizado",
                    "Apenas marcas premium de injetáveis",
                    "Procedimentos baseados em ciência e arte",
                    "Ambiente seguro e acolhedor",
                    "Foco absoluto na naturalidade",
                    "Suporte pós-procedimento atencioso"
                  ].map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-dark-200">
                      <div className="w-4 h-4 rounded-full bg-gold-500/10 border border-gold-400/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-gold-400" />
                      </div>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Sub-CTA signature block */}
                <div className="pt-4 flex items-center gap-4 border-t border-gold-500/10">
                  <button
                    onClick={() => handleWhatsAppClick("Quero falar diretamente com a Dra")}
                    className="py-2.5 px-5 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 active:scale-95 cursor-pointer"
                    id="btn-about-whatsapp"
                  >
                    Falar com a Dra. Jeniffer
                  </button>
                  <div>
                    <p className="text-[10px] text-dark-400 uppercase tracking-widest font-mono">Dra. Jeniffer Layter</p>
                    <p className="text-xs text-gold-400 italic">Harmonização Facial • Aripuanã</p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 4. BLOCO "RESULTADOS REAIS" (Antes e Depois com Lightbox) */}
        <section id="resultados" className="py-20 border-t border-gold-500/10 bg-dark-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            <div className="text-center space-y-3 mb-12">
              <span className="text-[11px] font-mono text-gold-400 tracking-widest uppercase font-semibold">Resultados Clinicamente Autorizados</span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold tracking-tight">
                Galeria de Resultados Reais
              </h2>
              <p className="text-xs sm:text-sm text-dark-300 max-w-lg mx-auto font-light leading-relaxed">
                Clique nas fotos abaixo para ampliar em tela cheia e analisar a precisão, harmonia e naturalidade dos resultados alcançados pelo Método Dra. Jeniffer Layter.
              </p>
            </div>

            {/* Results Carousel - Smooth Auto-Sliding Marquee */}
            <div className="relative w-full overflow-hidden py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
              {/* Subtle edge fade overlays for luxury feeling */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-dark-950 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-dark-950 to-transparent z-10 pointer-events-none"></div>

              <div 
                className="animate-marquee flex gap-4"
                style={{ animationDuration: "28s" }}
              >
                {/* Render duplicated list to achieve seamless infinite loop */}
                {[...BEFORE_AFTER_IMAGES, ...BEFORE_AFTER_IMAGES].map((img, idx) => (
                  <div 
                    key={`${img.id}-${idx}`}
                    onClick={() => openLightbox(BEFORE_AFTER_IMAGES, idx)}
                    className="w-48 sm:w-60 aspect-square flex-shrink-0 rounded-2xl overflow-hidden border border-gold-500/15 bg-dark-900 cursor-pointer shadow-lg hover:border-gold-400/55 hover:scale-[1.03] transition-all duration-300 relative group"
                  >
                    <img 
                      src={img.imageUrl} 
                      alt={img.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Hover indicator overlay */}
                    <div className="absolute inset-0 bg-dark-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <p className="text-[9px] text-gold-400 uppercase tracking-widest font-mono font-bold">Ver Ampliado</p>
                      <p className="text-xs sm:text-sm text-white font-serif font-medium truncate">{img.title}</p>
                      <p className="text-[9px] text-dark-300 truncate">{img.description}</p>
                    </div>
                    
                    {/* Subtle Badge */}
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-dark-950/80 backdrop-blur-sm border border-gold-500/20 rounded-md text-[8px] text-gold-300 tracking-wider uppercase">
                      Antes & Depois
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning text requested */}
            <div className="mt-8 text-center">
              <p className="text-[10px] text-dark-500 italic max-w-md mx-auto leading-relaxed">
                *Atenção: Os resultados expostos acima são individuais e podem variar de pessoa para pessoa de acordo com a resposta fisiológica de cada organismo. Todas as imagens foram divulgadas com consentimento prévio e expresso das pacientes.
              </p>
            </div>

          </div>
        </section>

        {/* 5. BLOCO "POR QUE CONFIAR EM MIM" (Pillars) */}
        <section className="py-20 border-t border-gold-500/10 bg-dark-900/20 relative">
          <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-gold-500/5 blur-[120px] pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            <div className="text-center space-y-3 mb-12">
              <span className="text-[11px] font-mono text-gold-400 tracking-widest uppercase font-semibold">Exclusividade e Critério</span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
                Os 5 Pilares de Confiança do Meu Atendimento
              </h2>
              <p className="text-xs sm:text-sm text-dark-300 max-w-md mx-auto font-light">
                Por que as mulheres de Aripuanã escolhem a Dra. Jeniffer Layter quando procuram por procedimentos estéticos seguros.
              </p>
            </div>

            {/* Columns of benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BENEFIT_CARDS.map((card, idx) => (
                <div 
                  key={card.id}
                  className="p-5 bg-dark-900 border border-gold-500/10 rounded-2xl hover:border-gold-500/30 transition-colors shadow-sm space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-400/20 flex items-center justify-center text-gold-400 text-xs font-mono font-bold">
                      0{idx + 1}
                    </div>
                    <h3 className="text-sm font-semibold text-white tracking-wide">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-xs text-dark-300 leading-relaxed font-light">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 6. CTA INTERMEDIÁRIO */}
        <section className="py-16 bg-gradient-to-b from-dark-900 to-dark-950 border-t border-b border-gold-500/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gold-radial opacity-30 pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
            <div className="inline-flex p-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full animate-pulse">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div className="space-y-3 max-w-xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-serif text-white font-semibold">
                Receio de ficar artificial ou dúvidas sobre o procedimento?
              </h3>
              <p className="text-xs sm:text-sm text-dark-300 font-light leading-relaxed">
                Eu entendo o seu receio. Por isso, a nossa primeira conversa serve justamente para planejar, alinhar expectativas e analisar seu rosto com clareza científica. Sem pressa e sem obrigações.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleWhatsAppClick("CTA Intermediário - Superar Receio")}
                className="py-3.5 px-8 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-bold text-xs sm:text-sm tracking-widest uppercase transition-all shadow-lg shadow-emerald-950/40 inline-flex items-center gap-2.5 cursor-pointer"
                id="btn-mid-cta-whatsapp"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Conversar pelo WhatsApp sem Compromisso</span>
              </button>
              <p className="text-[10px] text-dark-500 mt-2 font-mono">
                Atendimento discreto, atencioso e individualizado.
              </p>
            </div>
          </div>
        </section>

        {/* 7. BLOCO "COMO FUNCIONA A PRIMEIRA CONSULTA" */}
        <section className="py-20 bg-dark-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            <div className="text-center space-y-3 mb-12">
              <span className="text-[11px] font-mono text-gold-400 tracking-widest uppercase font-semibold">Clareza e Transparência</span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
                Sua jornada de cuidado em 3 passos simples
              </h2>
              <p className="text-xs sm:text-sm text-dark-300 max-w-md mx-auto font-light">
                Veja como funciona o processo desde o seu clique até a realização da sua avaliação facial estética.
              </p>
            </div>

            {/* The 3 Steps Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Invisible connection lines on desktop */}
              <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-[1px] bg-gold-500/10 -z-10"></div>

              {STEP_CARDS.map((step) => (
                <div 
                  key={step.id}
                  className="p-5 bg-dark-900 border border-gold-500/10 rounded-2xl relative space-y-4 shadow-sm group hover:border-gold-500/25 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-gold-500 bg-gold-500/5 border border-gold-500/15 px-2.5 py-1 rounded-md">
                      Passo {step.stepNumber}
                    </span>
                    <Calendar className="w-5 h-5 text-dark-500 group-hover:text-gold-400 transition-colors" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-white tracking-wide">
                      {step.title}
                    </h3>
                    <p className="text-xs text-dark-300 leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 8. BLOCO "MAIS PROVAS" - HARMONIZAÇÃO DE ❤️ (de 💚) */}
        <section id="harmonizacao-coracao" className="py-20 border-t border-gold-500/10 bg-dark-900/20 relative">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-gold-500/5 blur-[120px] pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            <div className="text-center space-y-3 mb-10">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 mb-2">
                <Heart className="w-5 h-5 fill-rose-500/15" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
                Harmonização Feita de Coração 💚
              </h2>
              <p className="text-xs sm:text-sm text-dark-300 max-w-md mx-auto font-light leading-relaxed">
                Mais do que apenas agulhas e marcas, nossa atuação se dá com paixão, dedicação estética e carinho sincero para transformar vidas.
              </p>
            </div>

            {/* Love Gallery Carousel - Smooth Auto-Sliding Marquee */}
            <div className="relative w-full overflow-hidden py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
              {/* Subtle edge fade overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-dark-950 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-dark-950 to-transparent z-10 pointer-events-none"></div>

              <div 
                className="animate-marquee flex gap-4"
                style={{ animationDuration: "35s" }}
              >
                {[...HARMONIZATION_LOVE_IMAGES, ...HARMONIZATION_LOVE_IMAGES].map((item, idx) => (
                  <div 
                    key={`${item.id}-${idx}`}
                    onClick={() => openLightbox(HARMONIZATION_LOVE_IMAGES, idx)}
                    className="w-40 sm:w-48 flex-shrink-0 rounded-2xl overflow-hidden border border-gold-500/15 bg-dark-900 shadow-lg cursor-pointer hover:border-gold-400/55 hover:scale-[1.03] transition-all duration-300 relative group"
                  >
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt={item.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-transparent to-transparent flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-[9px] sm:text-[10px] text-white leading-tight font-light">{item.alt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PATIENT REVIEWS (WhatsApp comments screenshots) */}
            <div className="mt-20 pt-16 border-t border-gold-500/10">
              <div className="text-center space-y-3 mb-10">
                <div className="flex justify-center gap-1 text-gold-400 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4.5 h-4.5 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <h3 className="text-xl font-serif text-white font-semibold">
                  O que as Pacientes dizem no Instagram
                </h3>
                <p className="text-xs text-dark-300 max-w-sm mx-auto font-light">
                  Capturas de tela espontâneas de carinho e profunda satisfação após os procedimentos realizados.
                </p>
              </div>

              {/* Review Screenshots Carousel - Smooth Auto-Sliding Marquee */}
              <div className="relative w-full overflow-hidden py-6 -mx-4 px-4 sm:mx-0 sm:px-0">
                {/* Subtle edge fade overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-dark-950 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-dark-950 to-transparent z-10 pointer-events-none"></div>

                <div 
                  className="animate-marquee flex gap-6"
                  style={{ animationDuration: "42s" }}
                >
                  {[...PATIENT_COMMENTS, ...PATIENT_COMMENTS].map((review, idx) => (
                    <div 
                      key={`${review.id}-${idx}`}
                      onClick={() => openLightbox(PATIENT_COMMENTS, idx)}
                      className="w-[220px] sm:w-[280px] aspect-[9/16] flex-shrink-0 rounded-2xl overflow-hidden border border-gold-500/25 bg-dark-900 shadow-2xl cursor-pointer hover:border-gold-400/60 hover:shadow-gold-950/20 hover:scale-[1.02] transition-all duration-300 relative group flex items-center justify-center p-2.5"
                    >
                      <img 
                        src={review.imageUrl} 
                        alt={review.alt}
                        className="w-full h-full object-contain rounded-xl"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-6">
                        <span className="px-4 py-2.5 bg-gold-400 text-dark-950 font-bold text-[11px] sm:text-xs uppercase tracking-wider rounded-xl shadow-lg transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                          Ampliar Depoimento 🔍
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 9. ONDE NOS ENCONTRAR (Clinic Map & Address Block) */}
        <section id="endereco" className="py-20 border-t border-gold-500/10 bg-dark-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              
              {/* Info Column */}
              <div className="md:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-gold-400 tracking-widest uppercase font-semibold">Local de Atendimento</span>
                  <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold leading-tight">
                    Onde nos encontrar em Aripuanã
                  </h2>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-dark-300 font-light leading-relaxed">
                  <p>
                    Para proporcionar total comodidade, privacidade e conforto, os atendimentos da <strong className="text-gold-300 font-medium">{EXPERT_INFO.fullName}</strong> são realizados em espaço reservado de excelência:
                  </p>
                  
                  <div className="p-4 bg-dark-900 border border-gold-500/10 rounded-2xl flex gap-3">
                    <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Endereço Exclusivo</h4>
                      <p className="text-xs text-dark-200 mt-1">
                        {EXPERT_INFO.location}
                      </p>
                    </div>
                  </div>

                  <p className="text-[11px] text-dark-400 italic">
                    * Atendimento exclusivamente sob agendamento prévio. Estacionamento fácil e ambiente climatizado de alto padrão.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleWhatsAppClick("Como chegar no salão")}
                    className="py-3 px-6 bg-transparent hover:bg-white/5 text-gold-400 hover:text-gold-300 rounded-xl border border-gold-500/25 transition-all text-xs uppercase tracking-widest font-bold flex items-center gap-2 cursor-pointer"
                    id="btn-direction-whatsapp"
                  >
                    <span>COMO CHEGAR VIA WHATSAPP</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Map IFrame Column */}
              <div className="md:col-span-7">
                <div className="relative rounded-2xl overflow-hidden border border-gold-500/20 shadow-2xl aspect-video md:aspect-square bg-dark-900 max-h-[380px]">
                  {/* Google Maps Embed pointing directly to Salão Art Beleza Aripuanã MT safely without keys */}
                  <iframe
                    title="Endereço da Dra. Jeniffer Layter em Aripuanã, MT"
                    src="https://maps.google.com/maps?q=Sal%C3%A3o%20Art%20Beleza%2C%20Cidade%20Alta%2C%20Aripuan%C3%A3%20MT&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 10. CTA FINAL (Decisão) */}
        <section id="contato" className="py-24 border-t border-gold-500/10 bg-dark-900/40 relative overflow-hidden">
          {/* Concentric gold rings behind */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-xl mx-auto px-4 sm:px-6 text-center space-y-8 relative z-10">
            
            <div className="space-y-4">
              <span className="inline-block px-3.5 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full text-gold-400 text-xs font-mono tracking-widest uppercase">
                Agendamentos Abertos
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-white tracking-tight leading-tight">
                Dê o primeiro passo para resgatar sua <span className="text-gold-400 italic">firmeza e brilho natural</span>
              </h2>
              
              <p className="text-xs sm:text-sm text-dark-300 font-light leading-relaxed max-w-md mx-auto">
                Não adie o seu cuidado pessoal. Agende hoje mesmo sua avaliação facial individualizada com a Dra. Jeniffer Layter e descubra como as técnicas corretas e produtos de alto padrão podem transformar a sua autoestima.
              </p>
            </div>

            <div className="space-y-4 w-full max-w-sm mx-auto">
              <button
                onClick={() => handleWhatsAppClick("CTA Final")}
                className="w-full py-4 px-6 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white rounded-2xl font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-xl shadow-gold-950/40 flex items-center justify-center gap-2.5 active:scale-[0.98] cursor-pointer"
                id="btn-final-whatsapp"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>AGENDAR A MINHA CONSULTA AGORA</span>
              </button>
              
              <div className="flex items-center justify-center gap-3 text-xs text-dark-400 font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gold-400" /> Vagas limitadas
                </span>
                <span className="text-dark-700">|</span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-gold-400" /> Total Discrição
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* 11. RODAPÉ SIMPLES */}
        <footer className="py-12 border-t border-gold-500/10 bg-dark-950 text-xs text-dark-400">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            
            {/* Branding and location info */}
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-white font-serif font-bold text-sm tracking-wide">
                {EXPERT_INFO.fullName}
              </h4>
              <p className="text-dark-500 text-[11px] leading-tight font-mono">
                {EXPERT_INFO.profession} • Aripuanã MT
              </p>
              <p className="text-[11px] text-dark-500 font-light">
                {EXPERT_INFO.location}
              </p>
            </div>

            {/* Signature Area (Elegant handwritten manual signature style) */}
            <div className="text-center py-2">
              <span className="font-signature text-gold-400 text-4xl sm:text-5xl leading-none select-none">
                Jeniffer Layter
              </span>
              <p className="text-[10px] text-dark-500 tracking-widest uppercase font-mono mt-1">Assinatura de Autenticidade</p>
            </div>

            {/* Links and copyrights */}
            <div className="space-y-3 text-center md:text-right">
              <div className="flex justify-center md:justify-end gap-4">
                <a 
                  href={EXPERT_INFO.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-dark-400 hover:text-gold-400 transition-colors uppercase tracking-widest text-[11px] font-semibold flex items-center gap-1"
                  id="link-footer-instagram"
                >
                  <span>Acompanhar Instagram</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
              <p className="text-[10px] text-dark-600 font-mono">
                © {new Date().getFullYear()} {EXPERT_INFO.fullName}. Todos os direitos reservados.
              </p>
            </div>

          </div>
        </footer>

      </div>

      {/* LIGHTBOX PORTAL */}
      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : lightboxImages.length - 1))}
          onNext={() => setLightboxIndex((prev) => (prev !== null && prev < lightboxImages.length - 1 ? prev + 1 : 0))}
        />
      )}

    </div>
  );
}
