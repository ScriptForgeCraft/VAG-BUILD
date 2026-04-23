import { createProjectPlaceholderImage } from "../../../shared/lib/placeholder-media.js";

export const projects = [
  {
    image: createProjectPlaceholderImage({
      accent: "#f27d26",
      primary: "#1f2933",
      secondary: "#eef3f8",
      label: "CITY",
    }),
    type: {
      am: "Բնակարան",
      ru: "Квартира",
      en: "Apartment",
    },
    title: {
      am: "Ժամանակակից բնակարան Երևանում",
      ru: "Современная квартира в Ереване",
      en: "Modern Apartment in Yerevan",
    },
    duration: {
      am: "3 ամիս",
      ru: "3 месяца",
      en: "3 months",
    },
    description: {
      am: "Մինիմալիստական ինտերիերի ամբողջական վերանորոգում բնակարանային նախագծի համար։",
      ru: "Полный ремонт квартиры в современном минималистичном стиле.",
      en: "Full apartment renovation with a modern minimalist interior direction.",
    },
  },
  {
    image: createProjectPlaceholderImage({
      accent: "#6c8a5f",
      primary: "#243127",
      secondary: "#edf4ef",
      label: "HOME",
    }),
    type: {
      am: "Տուն",
      ru: "Дом",
      en: "House",
    },
    title: {
      am: "Առանձնատուն Դիլիջանում",
      ru: "Дом в Дилижане",
      en: "House in Dilijan",
    },
    duration: {
      am: "5 ամիս",
      ru: "5 месяцев",
      en: "5 months",
    },
    description: {
      am: "Բնական նյութերով և ջերմ մթնոլորտով առանձնատան վերանորոգում։",
      ru: "Ремонт частного дома с теплой атмосферой и натуральными материалами.",
      en: "Private house renovation built around natural materials and a warm atmosphere.",
    },
  },
  {
    image: createProjectPlaceholderImage({
      accent: "#d6a328",
      primary: "#24333c",
      secondary: "#f7f4e8",
      label: "OFFICE",
    }),
    type: {
      am: "Կոմերցիոն",
      ru: "Коммерция",
      en: "Commercial",
    },
    title: {
      am: "Գրասենյակային վերանորոգում",
      ru: "Ремонт офисного пространства",
      en: "Office Renovation",
    },
    duration: {
      am: "2 ամիս",
      ru: "2 месяца",
      en: "2 months",
    },
    description: {
      am: "Կոմերցիոն ինտերիերի ֆունկցիոնալ և ներկայացուցչական արդիականացում։",
      ru: "Функциональное и презентабельное обновление коммерческого интерьера.",
      en: "Functional and presentation-focused upgrade of a commercial interior.",
    },
  },
];
