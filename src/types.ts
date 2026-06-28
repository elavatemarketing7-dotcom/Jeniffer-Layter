/**
 * Types and static assets for Dra. Jeniffer Layter's Landing Page
 */

export interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    value: string;
  }[];
}

export interface Testimony {
  id: number;
  imageUrl: string;
  alt: string;
}

export interface BeforeAfterImage {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
}

export interface BenefitCard {
  id: number;
  title: string;
  description: string;
}

export interface Step {
  id: number;
  stepNumber: string;
  title: string;
  description: string;
}

// Global data config
export const EXPERT_INFO = {
  name: "Jeniffer Layter",
  fullName: "Dra. Jeniffer Layter",
  profession: "Harmonização Facial",
  location: "Salão Art Beleza, Bairro Cidade Alta, Aripuanã MT",
  whatsappBaseUrl: "https://api.whatsapp.com/send/?phone=5566981061938",
  instagramUrl: "https://www.instagram.com/dra.jenifferlayter/reels/",
  photos: {
    primary: "https://i.imgur.com/bktPSdh.png", // Main beautiful chest-up expert photo
    secondary: "https://i.imgur.com/Rkvdxyd.png", // Backstage / alternate professional photo
  },
  // Imgur procedural presentation video
  procedureVideoUrl: "https://i.imgur.com/o6ADReS.mp4", // Direct MP4 video fallback
  procedurePageUrl: "https://imgur.com/o6ADReS"
};

// Quiz questions designed to raise desire, touch emotional triggers and filter high-intent leads
export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Qual é o seu principal objetivo ao buscar a Harmonização Facial?",
    options: [
      { label: "Recuperar a firmeza da pele e rejuvenescimento natural", value: "Rejuvenescimento natural" },
      { label: "Corrigir assimetrias e destacar meus traços marcantes", value: "Corrigir assimetrias" },
      { label: "Aumentar a autoestima mantendo minha essência original", value: "Autoestima e essência" },
      { label: "Suavizar linhas de expressão e rugas de cansaço", value: "Suavizar linhas de cansaço" }
    ]
  },
  {
    id: 2,
    text: "O que você considera mais importante em um procedimento estético?",
    options: [
      { label: "Naturalidade absoluta (onde ninguém percebe que fiz algo)", value: "Naturalidade absoluta" },
      { label: "Segurança e ser cuidada por uma especialista de confiança", value: "Segurança e confiança" },
      { label: "Uma avaliação ultra personalizada antes de qualquer agulha", value: "Avaliação personalizada" },
      { label: "Resultados duradouros com técnicas modernas e refinadas", value: "Resultados duradouros" }
    ]
  },
  {
    id: 3,
    text: "Você já realizou algum procedimento de harmonização facial anteriormente?",
    options: [
      { label: "Não, será a minha primeira vez e busco total segurança", value: "Primeira vez" },
      { label: "Sim, e quero continuar cuidando da minha beleza com critério", value: "Já realizou anteriormente" },
      { label: "Fiz apenas procedimentos mais simples como Botox", value: "Apenas Botox" }
    ]
  },
  {
    id: 4,
    text: "Como você se sentiria ao se olhar no espelho e ver sua beleza realçada de forma sutil e sofisticada?",
    options: [
      { label: "Extremamente confiante e com a autoestima renovada", value: "Extremamente confiante" },
      { label: "Mais jovem, descansada e pronta para o meu dia a dia", value: "Jovem e descansada" },
      { label: "Segura de que fiz a melhor escolha para mim", value: "Segura e feliz" }
    ]
  }
];

// Before and After Portfolio Images
export const BEFORE_AFTER_IMAGES: BeforeAfterImage[] = [
  {
    id: 1,
    imageUrl: "https://i.imgur.com/bYsn6wU.png",
    title: "Harmonização de Alta Performance",
    description: "Sutileza e realce de contornos"
  },
  {
    id: 2,
    imageUrl: "https://i.imgur.com/QUvJsTZ.png",
    title: "Rejuvenescimento e Suavização",
    description: "Recuperação do volume facial com naturalidade"
  },
  {
    id: 3,
    imageUrl: "https://i.imgur.com/JsWhOXf.png",
    title: "Proporção Áurea",
    description: "Refinamento das linhas mandibulares e mento"
  },
  {
    id: 4,
    imageUrl: "https://i.imgur.com/Ie64H3l.png",
    title: "Projeção Tridimensional",
    description: "Lifting líquido sem cortes cirúrgicos"
  },
  {
    id: 5,
    imageUrl: "https://i.imgur.com/Nfwn17N.png",
    title: "Preenchimento Labial & Contorno",
    description: "Lábios hidratados e perfeitamente desenhados"
  },
  {
    id: 6,
    imageUrl: "https://i.imgur.com/oI9jCzY.png",
    title: "Foco na Naturalidade",
    description: "Adequação estética sem exageros artificiais"
  }
  // ADICIONE NOVOS LINKS DE ANTES E DEPOIS ABAIXO:
  // {
  //   id: 7,
  //   imageUrl: "https://i.imgur.com/...",
  //   title: "Título",
  //   description: "Descrição"
  // }
];

// "de 💚" (Harmonização com Amor) assets showing procedures, client bonding and elegant aesthetics
export const HARMONIZATION_LOVE_IMAGES: Testimony[] = [
  { id: 1, imageUrl: "https://i.imgur.com/7nA4PQq.png", alt: "Harmonização com amor e dedicação" },
  { id: 2, imageUrl: "https://i.imgur.com/NiOwMaK.png", alt: "Atendimento premium humanizado" },
  { id: 3, imageUrl: "https://i.imgur.com/JIiApev.png", alt: "Acompanhamento detalhado" },
  { id: 4, imageUrl: "https://i.imgur.com/9E3SeNP.png", alt: "Procedimentos seguros de alta gama" },
  { id: 5, imageUrl: "https://i.imgur.com/jQ1Dvdl.png", alt: "Arte e simetria para cada traço" }
  // ADICIONE NOVOS LINKS ABAIXO SE DESEJAR:
];

// Patient review screenshots
export const PATIENT_COMMENTS: Testimony[] = [
  { id: 1, imageUrl: "https://i.imgur.com/ySYFcHm.png", alt: "Depoimento WhatsApp Paciente 1" },
  { id: 2, imageUrl: "https://i.imgur.com/irULBI4.png", alt: "Depoimento WhatsApp Paciente 2" },
  { id: 3, imageUrl: "https://i.imgur.com/g0PQfuX.png", alt: "Depoimento WhatsApp Paciente 3" },
  { id: 4, imageUrl: "https://i.imgur.com/ksVgnTH.png", alt: "Depoimento WhatsApp Paciente 4" }
  // ADICIONE MAIS DEPOIMENTOS ABAIXO:
];

// 4-6 Unique differentiation value cards for "Why Trust Me"
export const BENEFIT_CARDS: BenefitCard[] = [
  {
    id: 1,
    title: "Avaliação Minuciosa & Realista",
    description: "Eu analiso sua estrutura óssea e muscular em movimento. Se você não precisa de um procedimento, eu te direi isso com total transparência."
  },
  {
    id: 2,
    title: "Foco Rigoroso na Naturalidade",
    description: "Minha filosofia é valorizar quem você já é. Rejuvenescer mantendo sua identidade intacta, fugindo de rostos padronizados e artificiais."
  },
  {
    id: 3,
    title: "Atendimento 100% Exclusivo",
    description: "Você não será atendida em uma linha de montagem. O agendamento é espaçado para que você receba minha atenção total, sem pressa."
  },
  {
    id: 4,
    title: "Procedimentos Seguros de Elite",
    description: "Utilizo apenas as marcas de preenchedores e injetáveis líderes mundiais de mercado, sob as mais rigorosas diretrizes de biossegurança."
  },
  {
    id: 5,
    title: "Suporte e Acompanhamento Pós-Procedimento",
    description: "Sua jornada não acaba após a aplicação. Faço um acompanhamento ativo de sua evolução para garantir que você se sinta segura e acolhida."
  }
];

// 3 steps for the first consultation
export const STEP_CARDS: Step[] = [
  {
    id: 1,
    stepNumber: "01",
    title: "Contato Exclusivo no WhatsApp",
    description: "Ao clicar nos botões deste site, você falará diretamente com nossa equipe para alinhar as primeiras dúvidas sobre a sua consulta."
  },
  {
    id: 2,
    stepNumber: "02",
    title: "Agendamento Personalizado",
    description: "Reservamos um horário nobre e confortável para você no Salão Art Beleza, garantindo privacidade, discrição e acolhimento."
  },
  {
    id: 3,
    stepNumber: "03",
    title: "Mapeamento e Diagnóstico",
    description: "No dia da consulta, realizamos uma análise estética detalhada das proporções do seu rosto, conversamos sobre suas expectativas e desenhamos seu plano personalizado."
  }
];
