import { Service, Client, Course, AcademyOffer, CompanyValue, TeamMember, GalleryItem } from "./types";

export const COMPANY_INFO = {
  name: "IS KENDA",
  fullName: "IS KENDA CONSULTORIA & ACADEMIA",
  slogan: "Transformando Conhecimento em Competência e Competência em Resultados",
  foundedYear: 2022,
  yearsExperience: 4,
  activeClientsCount: 20,
  phone: "+244 938 198 551",
  email: "geral@iskenda.com",
  workingHours: "Segunda a Sexta-feira, 08h00 às 17h00",
  address: "Luanda, Angola",
  copyright: "© 2026 IS KENDA CONSULTORIA & ACADEMIA. Todos os Direitos Reservados."
};

export const SERVICES: Service[] = [
  {
    id: "contabilidade",
    title: "Contabilidade",
    description: "Organização e controle financeiro de excelência para guiar a sua empresa na tomada de decisões estratégicas fundamentadas.",
    icon: "Calculator",
    features: [
      "Organização contabilística completa",
      "Processamento contabilístico periódico",
      "Elaboração de demonstrações financeiras detalhadas",
      "Emissão de balancetes e relatórios financeiros",
      "Encerramento de contas no fim do exercício"
    ]
  },
  {
    id: "fiscalidade",
    title: "Fiscalidade Tributária",
    description: "Conformidade integral com toda a legislação tributária angolana, mitigando riscos fiscais e otimizando a carga de impostos legalmente.",
    icon: "FileText",
    features: [
      "Gestão e submissão eletrônica de impostos",
      "Apuração e submissão de IVA e IRT",
      "Cálculo de Imposto Industrial e Imposto Predial",
      "Tratamento de Imposto de Selo",
      "Consultoria tributária preventiva permanente"
    ]
  },
  {
    id: "grh",
    title: "Gestão de Recursos Humanos",
    description: "Gestão completa do seu capital humano, assegurando processos legais, operacionais e motivacionais alinhados à Lei Geral do Trabalho.",
    icon: "Users",
    features: [
      "Processamento de salários de toda a equipa",
      "Gestão da Segurança Social (INSS)",
      "Elaboração e manutenção de contratos de trabalho",
      "Planeamento e controlo de férias presenciais",
      "Recrutamento e seleção de quadros qualificados",
      "Sistemas de avaliação de desempenho"
    ]
  },
  {
    id: "organizacao-adm",
    title: "Organização Administrativa",
    description: "Padronização e otimização dos fluxos operacionais internos, eliminando desperdícios de tempo e burocracia desordenada.",
    icon: "Layers",
    features: [
      "Estruturação administrativa de escritórios",
      "Gestão documental e catalogação analítica",
      "Organização física e digital de arquivo empresarial",
      "Modelagem de processos e fluxogramas internos",
      "Elaboração de manuais administrativos de conduta"
    ]
  }
];

export const VALUES: CompanyValue[] = [
  {
    title: "Ética",
    description: "Conduzir todas as ações com ética absoluta, retidão profissional e respeito estrito aos regulamentos do mercado de Angola.",
    icon: "ShieldAlert"
  },
  {
    title: "Integridade",
    description: "Construir relações de extrema confiança assentes na honestidade e transparência mútua, sem margem para dúvidas.",
    icon: "CheckCircle2"
  },
  {
    title: "Excelência",
    description: "Prestar serviços de nível internacional com precisão rigorosa e atenção total a cada detalhe das contas da sua empresa.",
    icon: "Award"
  },
  {
    title: "Responsabilidade",
    description: "Comprometer-se integralmente com o cumprimento dos prazos fiscais e legais, assumindo uma postura ativa e de vanguarda.",
    icon: "UserCheck"
  },
  {
    title: "Transparência",
    description: "Comunicação claríssima em torno de honorários, termos contratuais e resultados financeiros obtidos para a corporação.",
    icon: "Eye"
  },
  {
    title: "Inovação",
    description: "Adotar processos modernos inteligentes, automações digitais e ferramentas computacionais inovadoras no tratamento contabilístico.",
    icon: "Lightbulb"
  },
  {
    title: "Compromisso",
    description: "Foco integral no crescimento e sustentabilidade das empresas parceiras, alinhando objetivos no curto, médio e longo prazo.",
    icon: "Handshake"
  }
];

export const CLIENTS: Client[] = [
  { name: "MPC", logoLetter: "M", colorClass: "bg-blue-600 text-white" },
  { name: "FMR", logoLetter: "F", colorClass: "bg-amber-600 text-white" },
  { name: "Rebentos", logoLetter: "R", colorClass: "bg-emerald-600 text-white" },
  { name: "Naynat", logoLetter: "N", colorClass: "bg-indigo-600 text-white" },
  { name: "Ghebrezghi Haila", logoLetter: "G", colorClass: "bg-rose-600 text-white" },
  { name: "Hedanto", logoLetter: "H", colorClass: "bg-sky-600 text-white" },
  { name: "Barba", logoLetter: "B", colorClass: "bg-violet-600 text-white" },
  { name: "Ambrocent", logoLetter: "A", colorClass: "bg-teal-600 text-white" },
  { name: "Svete", logoLetter: "S", colorClass: "bg-cyan-600 text-white" },
  { name: "Cambuzina", logoLetter: "C", colorClass: "bg-orange-600 text-white" },
  { name: "AT Gebremuse", logoLetter: "A", colorClass: "bg-fuchsia-600 text-white" },
  { name: "Asmeron", logoLetter: "A", colorClass: "bg-purple-600 text-white" },
  { name: "Hagos", logoLetter: "H", colorClass: "bg-lime-600 text-white" },
  { name: "Kizz", logoLetter: "K", colorClass: "bg-pink-600 text-white" },
  { name: "Anicab", logoLetter: "A", colorClass: "bg-red-600 text-white" },
  { name: "Afri Hind", logoLetter: "A", colorClass: "bg-emerald-700 text-white" }
];

export const ACADEMIA_COURSES: Course[] = [
  {
    id: "acc-pratico",
    title: "Contabilidade Prática",
    duration: "40 Horas (Teórico-Prático)",
    description: "Formação intensa focada no quotidiano real de uma contabilidade empresarial, desde a inserção de documentos até à elaboração de relatórios.",
    icon: "Calculator",
    modules: [
      "Introdução ao Sistema Contabilístico Angolano (PGC)",
      "Lançamentos Contabilísticos e Classificação Documental",
      "Processamento de Faturas e Reconciliação Bancária",
      "Balanço de Encerramento e Demonstração de Resultados"
    ]
  },
  {
    id: "fisc-angolana",
    title: "Fiscalidade Aplicada (Legislação Angolana)",
    duration: "32 Horas",
    description: "Domine todos os impostos vitais exigidos pela AGT. Submeta declarações de impostos sem margem de erro legal e aprenda a otimização fiscal preventiva.",
    icon: "FileSpreadsheet",
    modules: [
      "Procedimentos Práticos do IVA Angolano",
      "IRT - Imposto sobre o Rendimento do Trabalho",
      "Imposto Industrial e Liquidação Provisória",
      "Imposto Predial e Tratamento do Imposto de Selo"
    ]
  },
  {
    id: "grh-legislacao",
    title: "Gestão Prática de Recursos Humanos",
    duration: "30 Horas",
    description: "Aprenda a processar salários e a gerir as obrigações com a Segurança Social angolana, além de elaborar contratos alinhados com a LGT.",
    icon: "Users",
    modules: [
      "Admissão de Colaboradores e Lei Geral do Trabalho",
      "Folha de Salários e Cálculo de Descontos (IRT, INSS)",
      "Processos de Inspeção e Auditoria Governamental",
      "Avaliação de Competências e Organização de Pastas de Pessoal"
    ]
  },
  {
    id: "atendimento-excelencia",
    title: "Atendimento ao Cliente e Vendas",
    duration: "20 Horas",
    description: "Estratégias de fidelização e técnicas modernas de comunicação interpessoal essenciais para conquistar e reter clientes corporativos e individuais.",
    icon: "MessageSquare",
    modules: [
      "Psicologia de Atendimento de Alta Performance",
      "Tratamento de Reclamações e Gestão de Conflitos",
      "Técnicas Ativas de Negociação e Fecho de Clientes",
      "Ética e Comunicação Corporativa Angolana"
    ]
  }
];

export const ACADEMIA_OFFERS: AcademyOffer[] = [
  {
    title: "Formação Presencial",
    description: "Salas de aula climatizadas com postos de computador dedicados para exercícios práticos em softwares reais.",
    icon: "School"
  },
  {
    title: "Formação Online",
    description: "Aulas dinâmicas ao vivo integrando suporte remoto interativo, permitindo-lhe estudar a partir de qualquer província de Angola.",
    icon: "Laptop"
  },
  {
    title: "Estágio Profissional",
    description: "Oportunidade estrita dos alunos de destaque ingressarem no departamento de consultoria empresarial da IS KENDA para uma imersão prática.",
    icon: "Briefcase"
  },
  {
    title: "Acompanhamento Prático",
    description: "Mentoria personalizada com consultores seniores em atividade continuada no mercado de negócios angolano.",
    icon: "TrendingUp"
  },
  {
    title: "Certificado Homologado",
    description: "Certificado formal de participação profissional, impulsionando decisivamente o seu currículo nas plataformas e processos de seleção.",
    icon: "Award"
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "João Pedro Miguel",
    role: "Director Executivo",
    description: "Lidera a estratégia corporativa da IS KENDA com mais de 10 anos de experiência em consultoria empresarial e gestão financeira em Angola.",
    initials: "JM",
    colorClass: "bg-brand-navy text-white",
    gradient: "from-brand-navy to-blue-900",
    icon: "UserCircle"
  },
  {
    name: "Maria Luísa dos Santos",
    role: "Contabilista Sénior",
    description: "Especialista em PGC angolano e encerramento de contas, garante a conformidade contabilística de todas as empresas parceiras.",
    initials: "MS",
    colorClass: "bg-brand-blue text-white",
    gradient: "from-brand-blue to-cyan-700",
    icon: "Calculator"
  },
  {
    name: "Carlos Alberto Fernandes",
    role: "Fiscalista Sénior",
    description: "Perito em regime tributário angolano, assegura a submissão correta de IVA, IRT e Imposto Industrial junto à AGT.",
    initials: "CF",
    colorClass: "bg-brand-orange text-brand-dark",
    gradient: "from-amber-500 to-yellow-700",
    icon: "FileText"
  },
  {
    name: "Ana Paula Correia",
    role: "Gestora de Recursos Humanos",
    description: "Responsável pelo processamento salarial, gestão de contratos e conformidade com a Lei Geral do Trabalho de Angola.",
    initials: "AC",
    colorClass: "bg-emerald-600 text-white",
    gradient: "from-emerald-500 to-teal-800",
    icon: "Users"
  },
  {
    name: "Miguel Sebastião Domingos",
    role: "Administrativo Sénior",
    description: "Estrutura e otimiza os fluxos documentais e processos administrativos internos das empresas parceiras.",
    initials: "MD",
    colorClass: "bg-violet-600 text-white",
    gradient: "from-violet-500 to-purple-900",
    icon: "Building2"
  },
  {
    name: "Helena Henda Quissanga",
    role: "Coordenadora Académica",
    description: "Lidera a IS KENDA Academia, desenhando currículos e coordenando formações profissionais alinhadas ao mercado angolano.",
    initials: "HQ",
    colorClass: "bg-rose-600 text-white",
    gradient: "from-rose-500 to-pink-800",
    icon: "GraduationCap"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "escritorio",
    title: "Nosso Escritório",
    category: "Instalações",
    gradient: "from-slate-800 to-brand-navy",
    icon: "Building2",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
  },
  {
    id: "formacao-academia",
    title: "Sessão de Formação",
    category: "Academia",
    gradient: "from-brand-navy to-brand-blue",
    icon: "GraduationCap",
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop"
  },
  {
    id: "workshop",
    title: "Workshop de Fiscalidade",
    category: "Eventos",
    gradient: "from-brand-blue to-emerald-500",
    icon: "Presentation",
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop"
  },
  {
    id: "atelier",
    title: "Atendimento Personalizado",
    category: "Serviços",
    gradient: "from-amber-500 to-orange-600",
    icon: "Headphones",
    src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop"
  },
  {
    id: "equipa",
    title: "Equipa IS KENDA",
    category: "Equipa",
    gradient: "from-violet-600 to-purple-800",
    icon: "Users",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
  },
  {
    id: "conferencia",
    title: "Conferência Anual",
    category: "Eventos",
    gradient: "from-rose-600 to-red-800",
    icon: "Megaphone",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"
  },
  {
    id: "digital",
    title: "Transformação Digital",
    category: "Inovação",
    gradient: "from-sky-500 to-cyan-600",
    icon: "Monitor",
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop"
  },
  {
    id: "parceria",
    title: "Parcerias Estratégicas",
    category: "Rede",
    gradient: "from-emerald-600 to-teal-700",
    icon: "Handshake",
    src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop"
  }
];
