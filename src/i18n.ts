import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pt: {
    translation: {
      navbar: {
        metodologia: 'Metodologia',
        cursos: 'Cursos',
        free: 'Free Area',
        seminarios: 'Seminários',
      },
      hero: {
        label: 'Gutemberg Pereira apresenta:',
        title1: 'PROTOCOLO DE',
        title2: 'SOBERANIA.',
        subtitle: 'A desconstrução matemática do Jiu-Jitsu.\nCiência aplicada ao peso, gravidade e domínio absoluto.',
        cta: 'Garantir Acesso',
        kinetic: 'GUTEMBERG PEREIRA // ALTA PERFORMANCE',
      },
      philosophy: {
        label: 'O Protocolo Inabalável',
        title1: 'A maioria tenta',
        title2: 'sobreviver.',
        title3: 'Nós buscamos',
        title4: 'Soberania.',
        quote: '"Não é sobre força bruta. É sobre a conexão invisível entre gravidade, alavanca e o colapso estrutural do oponente."',
      },
      protocol: {
        verified: 'Protocolo Verificado',
        steps: [
          {
            title: 'Fragmentação Estrutural',
            desc: 'Desconstruímos cada centímetro de contato. Protocolos baseados em gravidade e precisão matemática. (Single Leg X Focus)',
            mood: 'Escaneamento de Protocolo',
            cta: 'Ver Protocolo Essencial',
          },
          {
            title: 'Conexão Profunda',
            desc: 'A ciência da pressão deadweight aplicada à passagem de guarda. Onde o equilíbrio do oponente desmorona. (Foco em Pressão)',
            mood: 'Conexão Neural',
            cta: 'Dominar a Pressão',
          },
          {
            title: 'Soberania Total',
            desc: 'O ápice do protocolo. Onde a técnica absoluta se traduz em domínio inquestionável no tatame.',
            mood: 'Execução Final',
            cta: 'Acessar Soberania Total',
          },
        ],
      },
      courses: {
        badge: 'Protocolo Berg',
        title1: 'MEUS',
        title2: 'CURSOS.',
        subtitle: 'A metodologia que transformou o cenário do Jiu-Jitsu competitivo.',
        details: 'Ver Detalhes',
      },
      free: {
        badge: 'Conteúdo Gratuito',
        title1: 'Acervo',
        title2: 'Técnico',
        expand: 'Ver Todos os Vídeos',
        collapse: 'Recolher Biblioteca',
        quality: 'Qualidade 4K',
      },
      social: {
        journey: 'A Jornada',
        title: 'AUTORIDADE\nNO TATAME.',
        bio1: 'Natural de Salvador, Bahia, Gutemberg Pereira iniciou sua jornada no Jiu-Jitsu aos 15 anos. Com o sonho de ser um grande campeão, mudou-se para o Rio de Janeiro onde viveu a realidade de morar e treinar 100% focado no tatame.',
        bio2: 'Os resultados não tardaram: múltiplas coroas como Campeão Mundial, Pan-Americano e Brasileiro. Nos Estados Unidos, onde viveu por 5 anos, elevou sua compreensão sobre alta performance e o marketing necessário para atletas de elite.',
        bio3: 'Hoje, como um atleta independente patrocinado pela Adidas, Gutemberg viaja o mundo lutando e compartilhando sua metodologia através de cursos e seminários, transformando milhares de alunos em especialistas na arte suave.',
        champion: 'Atleta Campeão Mundial',
        proof: 'Prova Social',
        proofTitle: 'Voz dos Especialistas.',
        stats: {
          students: 'Alunos Ativos',
          countries: 'Países',
          method: 'Metodologia',
        },
      },
      faq: {
        badge: 'Dúvidas Frequentes',
        title: 'PROTOCOLO DE\nSEGURANÇA.',
        contact: 'Ainda tem dúvidas?',
        questions: [
          { q: 'O acesso ao conteúdo é imediato?', a: 'Sim! Após a confirmação do pagamento, você recebe imediatamente no seu e-mail os dados de acesso à nossa plataforma exclusiva.' },
          { q: 'Posso acessar de qualquer dispositivo?', a: 'Com certeza. Nossa plataforma é 100% otimizada para tablets, computadores e celulares, permitindo que você estude até mesmo dentro do tatame.' },
          { q: 'Qual o prazo de acesso ao curso?', a: 'O curso de Single Leg X oferece 5 anos de acesso. Os cursos de Pressão e 50/50 e Lapelas oferecem 12 meses de acesso completo.' },
          { q: 'Quais as formas de pagamento?', a: 'Aceitamos Cartão de Crédito (com parcelamento em até 12x), PIX à vista e boleto bancário.' },
          { q: 'Existe suporte para dúvidas?', a: 'Sim. Você terá um canal direto via e-mail para tirar todas as suas dúvidas técnicas sobre as posições ensinadas.' },
        ],
      },
      footer: {
        tagline: 'Levando o Jiu-Jitsu de Salvador para o mundo. Técnica, precisão e mentalidade campeã em cada detalhe.',
        links: 'Links Rápidos',
        support: 'Suporte',
        location: 'Mundial / Seminários',
        rights: '© 2025 Gutemberg Pereira. Todos os direitos reservados.',
        courses: 'Cursos',
        techniques: 'Técnicas Extras',
        about: 'Sobre o Berg',
      },
      seminars: {
        title: 'Seminários',
        subtitle: 'Leve o Berg para sua academia',
        form_name: 'Nome',
        form_gym: 'Nome da Academia',
        form_msg: 'Mensagem',
        form_submit: 'Solicitar Informações',
      },
    },
  },
  en: {
    translation: {
      navbar: {
        metodologia: 'Methodology',
        cursos: 'Courses',
        free: 'Free Area',
        seminarios: 'Seminars',
      },
      hero: {
        label: 'Gutemberg Pereira presents:',
        title1: 'SOVEREIGNTY',
        title2: 'PROTOCOL.',
        subtitle: 'The mathematical deconstruction of Jiu-Jitsu.\nScience applied to weight, gravity and absolute domination.',
        cta: 'Get Access',
        kinetic: 'GUTEMBERG PEREIRA // ELITE PERFORMANCE',
      },
      philosophy: {
        label: 'The Unshakeable Protocol',
        title1: 'Most try to',
        title2: 'survive.',
        title3: 'We seek',
        title4: 'Sovereignty.',
        quote: '"It\'s not about brute force. It\'s about the invisible connection between gravity, leverage and the structural collapse of the opponent."',
      },
      protocol: {
        verified: 'Verified Protocol',
        steps: [
          {
            title: 'Structural Breakdown',
            desc: 'We deconstruct every inch of contact. Protocols based on gravity and mathematical precision. (Single Leg X Focus)',
            mood: 'Protocol Scan',
            cta: 'See Core Protocol',
          },
          {
            title: 'Elite Connection',
            desc: 'The science of deadweight pressure applied to guard passing. Where the opponent\'s balance collapses. (Pressure Focus)',
            mood: 'Neural Connection',
            cta: 'Master the Pressure',
          },
          {
            title: 'Full Sovereignty',
            desc: 'The apex of the protocol. Where absolute technique translates into unquestionable dominance on the mat.',
            mood: 'Final Execution',
            cta: 'Access Full Sovereignty',
          },
        ],
      },
      courses: {
        badge: 'Berg Protocol',
        title1: 'MY',
        title2: 'COURSES.',
        subtitle: 'The methodology that transformed the competitive Jiu-Jitsu scene.',
        details: 'View Details',
      },
      free: {
        badge: 'Free Content',
        title1: 'Technical',
        title2: 'Arsenal',
        expand: 'View All Videos',
        collapse: 'Collapse Library',
        quality: '4K Quality',
      },
      social: {
        journey: 'The Journey',
        title: 'AUTHORITY\nON THE MAT.',
        bio1: 'From Salvador, Bahia, Gutemberg Pereira began his Jiu-Jitsu journey at 15. With the dream of becoming a great champion, he moved to Rio de Janeiro where he lived the reality of training 100% focused on the mat.',
        bio2: 'The results came quickly: multiple crowns as World Champion, Pan-American and Brazilian Champion. In the United States, where he lived for 5 years, he deepened his understanding of elite performance and the marketing necessary for professional athletes.',
        bio3: 'Today, as an independent athlete sponsored by Adidas, Gutemberg travels the world competing and sharing his methodology through courses and seminars, transforming thousands of students into experts in the gentle art.',
        champion: 'World Champion Athlete',
        proof: 'Social Proof',
        proofTitle: 'Voice of the Specialists.',
        stats: {
          students: 'Active Students',
          countries: 'Countries',
          method: 'Methodology',
        },
      },
      faq: {
        badge: 'FAQ',
        title: 'SECURITY\nPROTOCOL.',
        contact: 'Still have questions?',
        questions: [
          { q: 'Is access to content immediate?', a: 'Yes! After payment confirmation, you immediately receive login credentials for our exclusive platform by email.' },
          { q: 'Can I access from any device?', a: 'Absolutely. Our platform is 100% optimized for tablets, computers and phones, allowing you to study even at the gym.' },
          { q: 'What is the course access period?', a: 'The Single Leg X course offers 5 years of access. The Pressure and 50/50 & Lapels courses offer 12 months of full access.' },
          { q: 'What payment methods are accepted?', a: 'We accept Credit Card (up to 12 installments), PIX and bank slip.' },
          { q: 'Is there support for questions?', a: 'Yes. You will have a direct email channel to answer all your technical questions about the positions taught.' },
        ],
      },
      footer: {
        tagline: 'Taking Jiu-Jitsu from Salvador to the world. Technique, precision and champion mindset in every detail.',
        links: 'Quick Links',
        support: 'Support',
        location: 'Worldwide / Seminars',
        rights: '© 2025 Gutemberg Pereira. All rights reserved.',
        courses: 'Courses',
        techniques: 'Extra Techniques',
        about: 'About Berg',
      },
      seminars: {
        title: 'Seminars',
        subtitle: 'Bring Berg to your gym',
        form_name: 'Name',
        form_gym: 'Gym Name',
        form_msg: 'Message',
        form_submit: 'Request Info',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt',
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
