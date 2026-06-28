import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EXPERT_INFO, QUIZ_QUESTIONS } from "../types";
import { ClipboardList, Send, MessageCircle, ArrowRight, Sparkles, RefreshCw } from "lucide-react";

interface QuizProps {
  onCloseQuiz: () => void;
}

type QuizState = "welcome" | "questions" | "analyzing" | "result";

export default function Quiz({ onCloseQuiz }: QuizProps) {
  const [quizState, setQuizState] = useState<QuizState>("welcome");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisText, setAnalysisText] = useState("Analisando seus objetivos...");

  // Rotate analysis texts for high-end feel
  useEffect(() => {
    if (quizState !== "analyzing") return;

    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setQuizState("result");
          }, 600);
          return 100;
        }
        
        // Update helper messages based on progress
        if (prev < 30) {
          setAnalysisText("Mapeando necessidades estéticas...");
        } else if (prev < 65) {
          setAnalysisText("Avaliando grau de naturalidade...");
        } else if (prev < 90) {
          setAnalysisText("Validando compatibilidade...");
        } else {
          setAnalysisText("Sincronizando diagnóstico...");
        }
        
        return prev + 1;
      });
    }, 35); // Takes about 3.5 seconds

    return () => clearInterval(interval);
  }, [quizState]);

  const handleSelectOption = (questionId: number, optionValue: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionValue }));
    
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 200);
    } else {
      setTimeout(() => {
        setQuizState("analyzing");
      }, 200);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Construct custom WhatsApp message containing answers
  const handleSendAnswersToWhatsApp = () => {
    let messageText = `Olá Dra. Jeniffer Layter! Realizei a minha avaliação exclusiva no seu site e fui aprovada como Paciente Ideal. Aqui estão as minhas respostas:\n\n`;
    
    QUIZ_QUESTIONS.forEach((q) => {
      const answer = answers[q.id] || "Não respondido";
      messageText += `*${q.id}. ${q.text}*\n👉 _${answer}_\n\n`;
    });
    
    messageText += `Gostaria de agendar meu mapeamento facial personalizado e garantir minha vaga no Salão Art Beleza!`;
    
    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `${EXPERT_INFO.whatsappBaseUrl}&text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  // Call WhatsApp directly without answers
  const handleDirectWhatsApp = () => {
    const text = "Olá Dra. Jeniffer Layter, gostaria de marcar um horário de Harmonização Facial sem compromisso!";
    const encodedText = encodeURIComponent(text);
    window.open(`${EXPERT_INFO.whatsappBaseUrl}&text=${encodedText}`, "_blank");
  };

  // Percentage of progress
  const progressPercent = Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-dark-950 flex items-center justify-center p-3 md:p-6 select-none font-sans">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gold-radial pointer-events-none opacity-40"></div>
      <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-gold-500/10 blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-gold-600/10 blur-[100px] pointer-events-none"></div>

      {/* Main Container - Framed nicely but compact for mobile */}
      <div className="relative w-full max-w-md bg-dark-900 border border-gold-500/20 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col my-auto">
        
        {/* TOP STATUS / HERO HEADER */}
        <div className="relative border-b border-gold-500/10 bg-dark-950/80 px-3 py-2.5 sm:px-4 sm:py-3 flex items-center gap-2.5 sm:gap-3">
          {/* Floating Expert Avatar in a golden luxurious frame */}
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gold-400 p-[2px] bg-dark-900 flex-shrink-0 overflow-hidden shadow-md">
            <img 
              src={EXPERT_INFO.photos.primary} 
              alt={EXPERT_INFO.name} 
              className="w-full h-full object-cover rounded-full object-top scale-110"
              referrerPolicy="no-referrer"
            />
            {/* Online Green Indicator Dot */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-dark-950 rounded-full"></span>
          </div>

          <div>
            <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-gold-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-gold-400 fill-gold-400/20" /> Avaliação Especializada
            </div>
            <h1 className="text-xs sm:text-sm font-serif font-bold text-white tracking-wide leading-tight">
              {EXPERT_INFO.fullName}
            </h1>
            <p className="text-[10px] sm:text-[11px] text-dark-400 leading-none mt-0.5">
              {EXPERT_INFO.profession}
            </p>
          </div>
        </div>

        {/* CONTENT SWITCHER */}
        <div className="p-4 sm:p-5 flex-grow flex flex-col justify-center min-h-[280px] sm:min-h-[340px]">
          <AnimatePresence mode="wait">
            
            {/* 1. WELCOME SCREEN */}
            {quizState === "welcome" && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-3 sm:space-y-4 text-center flex flex-col h-full justify-between"
                id="quiz-welcome-screen"
              >
                <div className="space-y-2 py-1 sm:py-2">
                  <div className="inline-flex p-2 rounded-full bg-gold-500/10 border border-gold-400/20 text-gold-400 mx-auto">
                    <ClipboardList className="w-5 h-5" />
                  </div>
                  <h2 className="text-sm sm:text-xl font-serif text-white leading-snug font-semibold">
                    Descubra se o Método de Harmonização <span className="text-gold-400">Dra. Jeniffer Layter</span> é o Ideal Para Você
                  </h2>
                  <p className="text-[11px] sm:text-xs text-dark-300 leading-relaxed max-w-xs sm:max-w-sm mx-auto">
                    Preparamos um diagnóstico rápido de 4 perguntas para entender seus traços, objetivos e expectativas estéticas.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  {/* Action 1: Start Quiz */}
                  <button
                    onClick={() => setQuizState("questions")}
                    className="w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white rounded-xl font-medium text-xs sm:text-sm transition-all shadow-lg shadow-gold-900/30 flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                    id="btn-start-quiz"
                  >
                    <span>Iniciar Avaliação Rápida</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Action 2: Go directly to Site */}
                  <button
                    onClick={onCloseQuiz}
                    className="w-full py-1.5 px-4 bg-transparent hover:bg-white/5 text-dark-400 hover:text-white rounded-xl font-normal text-[10px] sm:text-xs transition-all border border-dark-800 flex items-center justify-center gap-2 cursor-pointer"
                    id="btn-skip-to-site"
                  >
                    Ir direto para o site principal
                  </button>
                </div>
              </motion.div>
            )}

            {/* 2. ACTIVE QUESTIONS SCREEN */}
            {quizState === "questions" && (
              <motion.div
                key="questions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-3 sm:space-y-4"
              >
                {/* Progress Bar Header */}
                <div className="space-y-1 sm:space-y-1.5">
                  <div className="flex justify-between text-[10px] sm:text-[11px] text-dark-400">
                    <span className="font-mono text-gold-400">Pergunta {currentQuestionIndex + 1} de {QUIZ_QUESTIONS.length}</span>
                    <span className="font-semibold text-white">{progressPercent}% Concluído</span>
                  </div>
                  {/* Elegant Golden Progress Track */}
                  <div className="w-full h-1 sm:h-1.5 bg-dark-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-300 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Question Text */}
                <div className="py-1 sm:py-2">
                  <h3 className="text-sm sm:text-base font-medium text-white leading-relaxed">
                    {QUIZ_QUESTIONS[currentQuestionIndex].text}
                  </h3>
                </div>

                {/* Vertical Touchable Option Cards */}
                <div className="space-y-2">
                  {QUIZ_QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(QUIZ_QUESTIONS[currentQuestionIndex].id, option.label)}
                      className="w-full text-left py-2 px-3.5 rounded-xl bg-dark-800/60 hover:bg-dark-800 border border-dark-700/60 hover:border-gold-500/40 text-dark-100 hover:text-white text-[11px] sm:text-xs transition-all duration-200 active:scale-[0.99] cursor-pointer flex justify-between items-center gap-2 shadow-sm hover:shadow-gold-950/20 group"
                    >
                      <span className="leading-relaxed group-hover:translate-x-0.5 transition-transform duration-200">
                        {option.label}
                      </span>
                      <div className="w-4 h-4 rounded-full border border-dark-600 group-hover:border-gold-500 flex items-center justify-center flex-shrink-0 transition-all bg-dark-900">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-400 scale-0 group-hover:scale-100 transition-transform"></div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Navigation Back Button */}
                {currentQuestionIndex > 0 && (
                  <button
                    onClick={handlePreviousQuestion}
                    className="text-[10px] sm:text-xs text-dark-400 hover:text-white flex items-center gap-1 pt-0.5 transition-colors cursor-pointer"
                  >
                    Voltar para pergunta anterior
                  </button>
                )}
              </motion.div>
            )}

            {/* 3. ANALYZING / LOADING SCREEN */}
            {quizState === "analyzing" && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-4 sm:py-6 space-y-4"
                id="quiz-analyzing-screen"
              >
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 sm:w-8 sm:h-8 text-gold-400 animate-spin opacity-80" />
                  <div className="absolute inset-0 rounded-full border border-gold-500/20 border-t-gold-400 animate-pulse"></div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm sm:text-base font-serif text-white font-semibold tracking-wide">
                    {analysisText}
                  </h3>
                  <div className="w-32 sm:w-40 h-1 bg-dark-800 rounded-full mx-auto overflow-hidden">
                    <div 
                      className="h-full bg-gold-400 transition-all duration-100"
                      style={{ width: `${analysisProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-dark-400 font-mono">
                    Analisando {analysisProgress}%
                  </p>
                </div>
              </motion.div>
            )}

            {/* 4. COMPACT HERO RESULTS SCREEN */}
            {quizState === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-2.5 sm:space-y-4 text-center flex flex-col h-full justify-between"
                id="quiz-result-screen"
              >
                {/* Result Title Badge */}
                <div className="space-y-1 py-0.5">
                  <span className="inline-block px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider animate-pulse">
                    Perfil Compatível • Paciente Ideal
                  </span>
                  
                  <h3 className="text-sm sm:text-base font-serif font-semibold text-white leading-tight">
                    Mapeamento Aprovado!
                  </h3>

                  <p className="text-[10px] sm:text-xs text-dark-200 leading-relaxed max-w-xs mx-auto">
                    O Método da <strong className="text-gold-300 font-medium">{EXPERT_INFO.fullName}</strong> entrega exatamente a naturalidade e segurança que você procura.
                  </p>
                </div>

                {/* Sophisticated Result Hero Frame */}
                <div className="relative w-full max-w-[160px] sm:max-w-[220px] h-[75px] sm:h-[100px] mx-auto rounded-xl overflow-hidden border border-gold-500/30 shadow-lg group">
                  <img 
                    src={EXPERT_INFO.photos.primary} 
                    alt="Dra. Jeniffer Layter" 
                    className="w-full h-full object-cover object-top scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900/20 to-transparent flex items-end justify-center p-1">
                    <p className="text-[8px] sm:text-[9px] text-gold-300 tracking-wide uppercase font-medium">
                      Método Exclusivo Jeniffer Layter
                    </p>
                  </div>
                </div>

                {/* 3 High Conversion Action Buttons */}
                <div className="space-y-1.5 pt-1">
                  
                  {/* Button 1: Enviar minha avaliação a DRA */}
                  <button
                    onClick={handleSendAnswersToWhatsApp}
                    className="w-full py-2 px-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-bold text-[10px] sm:text-xs tracking-wide transition-all shadow-md shadow-emerald-950/40 flex items-center justify-center gap-1 active:scale-[0.98] cursor-pointer"
                    id="btn-send-evaluation"
                  >
                    <Send className="w-3 h-3 fill-current" />
                    <span>1 • ENVIAR AVALIAÇÃO À DRA</span>
                  </button>

                  {/* Button 2: CHAMAR NO WHATSAPP SEM COMPROMISSO */}
                  <button
                    onClick={handleDirectWhatsApp}
                    className="w-full py-2 px-3 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white rounded-xl font-medium text-[9px] sm:text-[10px] tracking-wide transition-all flex items-center justify-center gap-1 active:scale-[0.98] cursor-pointer"
                    id="btn-whatsapp-no-commitment"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>2 • CHAMAR SEM COMPROMISSO</span>
                  </button>

                  {/* Button 3: NÃO ENVIAR E CONTINUAR NO SITE */}
                  <button
                    onClick={onCloseQuiz}
                    className="w-full py-1.5 px-3 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-xl font-normal text-[8px] sm:text-[9px] transition-all border border-dark-700/50 flex items-center justify-center gap-1 cursor-pointer"
                    id="btn-skip-to-main-site"
                  >
                    <span>3 • CONTINUAR NO SITE</span>
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer info showing security */}
        <div className="border-t border-gold-500/10 bg-dark-950/60 px-3 py-2 flex items-center justify-between text-[8px] sm:text-[9px] text-dark-500">
          <span className="font-mono">Aripuanã, MT</span>
          <span>🔒 Avaliação segura e confidencial</span>
        </div>

      </div>
    </div>
  );
}
