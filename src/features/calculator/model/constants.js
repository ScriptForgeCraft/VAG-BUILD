export const calculatorText = {
  title: {
    am: "Հաշվիչ",
    ru: "Калькулятор ремонта",
    en: "Renovation Calculator",
  },
  description: {
    am: "Ստացեք վերանորոգման նախնական արժեքը ընդամենը 1 րոպեում",
    ru: "Узнайте предварительную стоимость ремонта всего за 1 минуту",
    en: "Get a preliminary estimate in just 1 minute",
  },
  estimateLabel: {
    am: "Նախնական արժեքը",
    ru: "Предварительная стоимость",
    en: "Preliminary Estimate",
  },
  estimateNote: {
    am: "Վերջնական արժեքը կհստակեցվի տեղում զննումից հետո",
    ru: "Точная стоимость будет определена после осмотра объекта",
    en: "Final price will be determined after site inspection",
  },
  backButton: {
    am: "Հետ",
    ru: "Назад",
    en: "Back",
  },
  nextButton: {
    am: "Հաջորդ քայլը",
    ru: "Следующий шаг",
    en: "Next Step",
  },
  sendButton: {
    am: "Ուղարկել հայտը ճշգրիտ հաշվարկի համար",
    ru: "Отправить заявку на точный расчет",
    en: "Send Request for Exact Quote",
  },
};

export const calculatorProgressSteps = [
  {
    step: 1,
    label: {
      am: "Տիպ և մակերես",
      ru: "Тип и площадь",
      en: "Type & Area",
    },
  },
  {
    step: 2,
    label: {
      am: "Վերանորոգման տեսակ",
      ru: "Тип ремонта",
      en: "Renovation Type",
    },
  },
  {
    step: 3,
    label: {
      am: "Մանրամասներ",
      ru: "Детали",
      en: "Details",
    },
  },
  {
    step: 4,
    label: {
      am: "Կոնտակտներ",
      ru: "Контакты",
      en: "Contacts",
    },
  },
];

export const calculatorFields = {
  objectType: {
    label: {
      am: "Ի՞նչ ենք վերանորոգում",
      ru: "Что ремонтируем?",
      en: "What are we renovating?",
    },
    options: [
      {
        value: "apartment",
        label: {
          am: "Բնակարան",
          ru: "Квартира",
          en: "Apartment",
        },
      },
      {
        value: "house",
        label: {
          am: "Առանձնատուն",
          ru: "Дом",
          en: "House",
        },
      },
      {
        value: "office",
        label: {
          am: "Գրասենյակ",
          ru: "Офис",
          en: "Office",
        },
      },
      {
        value: "shop",
        label: {
          am: "Խանութ",
          ru: "Магазин",
          en: "Shop",
        },
      },
      {
        value: "other",
        label: {
          am: "Այլ",
          ru: "Другое",
          en: "Other",
        },
      },
    ],
  },
  area: {
    label: {
      am: "Մակերեսը (քմ)",
      ru: "Площадь (м²)",
      en: "Area (sqm)",
    },
  },
  workType: {
    label: {
      am: "Վերանորոգման տեսակը",
      ru: "Тип ремонта",
      en: "Renovation Type",
    },
    options: [
      {
        value: "cosmetic",
        label: {
          am: "Կոսմետիկ",
          ru: "Косметический",
          en: "Cosmetic",
        },
      },
      {
        value: "capital",
        label: {
          am: "Կապիտալ",
          ru: "Капитальный",
          en: "Capital",
        },
      },
      {
        value: "turnkey",
        label: {
          am: "Բանալի հանձնումով",
          ru: "Под ключ",
          en: "Turnkey",
        },
      },
      {
        value: "systems",
        label: {
          am: "Էլեկտրիկա/Սանտեխնիկա",
          ru: "Электрика/Сантехника",
          en: "Electrical/Plumbing",
        },
      },
      {
        value: "minor",
        label: {
          am: "Մանր վերանորոգում",
          ru: "Мелкий ремонт",
          en: "Minor Repair",
        },
      },
    ],
  },
  condition: {
    label: {
      am: "Օբյեկտի ներկա վիճակը",
      ru: "Текущее состояние",
      en: "Current condition",
    },
    options: [
      {
        value: "",
        label: {
          am: "Ընտրեք...",
          ru: "Выберите...",
          en: "Select...",
        },
      },
      {
        value: "new",
        label: {
          am: "Նորակառույց",
          ru: "Новостройка",
          en: "New Building",
        },
      },
      {
        value: "secondary",
        label: {
          am: "Հին շինություն",
          ru: "Вторичка",
          en: "Secondary Market",
        },
      },
      {
        value: "partial",
        label: {
          am: "Մասնակի պատրաստ",
          ru: "Частично готово",
          en: "Partially Ready",
        },
      },
      {
        value: "after-demo",
        label: {
          am: "Ապամոնտաժված",
          ru: "После демонтажа",
          en: "After Demolition",
        },
      },
    ],
  },
  urgency: {
    label: {
      am: "Որքա՞ն շտապ է",
      ru: "Насколько срочно?",
      en: "How urgent?",
    },
    options: [
      {
        value: "standard",
        label: {
          am: "Ստանդարտ",
          ru: "Стандарт",
          en: "Standard",
        },
      },
      {
        value: "urgent",
        label: {
          am: "Շտապ",
          ru: "Срочно",
          en: "Urgent",
        },
      },
      {
        value: "very-urgent",
        label: {
          am: "Շատ շտապ",
          ru: "Очень срочно",
          en: "Very Urgent",
        },
      },
    ],
  },
  demolition: {
    label: {
      am: "Ապամոնտաժման կարիք կա՞",
      ru: "Нужен демонтаж?",
      en: "Is demolition needed?",
    },
    options: [
      {
        value: "yes",
        label: {
          am: "Այո",
          ru: "Да",
          en: "Yes",
        },
      },
      {
        value: "no",
        label: {
          am: "Ոչ",
          ru: "Нет",
          en: "No",
        },
      },
    ],
  },
  materials: {
    label: {
      am: "Նյութերի հարցում օգնության կարիք կա՞",
      ru: "Нужна помощь с материалами?",
      en: "Need help with materials?",
    },
    options: [
      {
        value: "yes",
        label: {
          am: "Այո",
          ru: "Да",
          en: "Yes",
        },
      },
      {
        value: "no",
        label: {
          am: "Ոչ",
          ru: "Нет",
          en: "No",
        },
      },
    ],
  },
  name: {
    label: {
      am: "Ձեր անունը",
      ru: "Ваше имя",
      en: "Your Name",
    },
    placeholder: {
      am: "Անուն",
      ru: "Имя",
      en: "Name",
    },
  },
  phone: {
    label: {
      am: "Հեռախոսահամար",
      ru: "Номер телефона",
      en: "Phone Number",
    },
    placeholder: {
      am: "+374 ...",
      ru: "+374 ...",
      en: "+374 ...",
    },
  },
  comment: {
    label: {
      am: "Մեկնաբանություն",
      ru: "Комментарий",
      en: "Comment",
    },
    placeholder: {
      am: "Նկարագրեք խնդիրը կամ ցանկությունները",
      ru: "Опишите задачу или пожелания",
      en: "Describe your request or preferences",
    },
  },
};

export const calculatorPriceFactors = {
  baseRate: 5000,
  objectType: {
    apartment: 1,
    house: 1.18,
    office: 1.12,
    shop: 1.2,
    other: 1.08,
  },
  workType: {
    cosmetic: 1.5,
    capital: 2.5,
    turnkey: 3.5,
    systems: 2.2,
    minor: 1.25,
  },
  condition: {
    "": 1,
    new: 1,
    secondary: 1.12,
    partial: 1.06,
    "after-demo": 1.18,
  },
  urgency: {
    standard: 1,
    urgent: 1.12,
    "very-urgent": 1.24,
  },
  demolition: {
    yes: 1.1,
    no: 1,
  },
  materials: {
    yes: 1.05,
    no: 1,
  },
};

export const initialCalculatorForm = {
  objectType: "",
  area: 50,
  workType: "",
  condition: "",
  urgency: "standard",
  demolition: "no",
  materials: "yes",
  name: "",
  phone: "",
  comment: "",
};

export const initialCalculatorState = {
  step: 1,
  form: initialCalculatorForm,
};
