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
        acesso: 'Acesso Aluno'
      }
    }
  },
  en: {
    translation: {
      navbar: {
        metodologia: 'Methodology',
        cursos: 'Courses',
        free: 'Free Area',
        seminarios: 'Seminars',
        acesso: 'Student Access'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt',
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
