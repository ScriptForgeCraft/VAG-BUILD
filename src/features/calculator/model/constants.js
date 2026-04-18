export const calculatorText = {
  title: {
    am: "Հաշվիչ",
    ru: "Калькулятор ремонта",
    en: "Renovation Calculator",
  },
  description: {
    am: "Ստացեք 3 սցենարով նախնական արժեքը` հիմնված Երևանի և Հայաստանի շուկայի վրա",
    ru: "Получите предварительную смету в 3 сценариях на базе ориентиров по Еревану и Армении",
    en: "Get a three-scenario estimate based on Yerevan and Armenia pricing benchmarks",
  },
  estimateLabel: {
    am: "Նախնական արժեքային միջակայք",
    ru: "Предварительный диапазон стоимости",
    en: "Preliminary Budget Range",
  },
  estimateNote: {
    am: "Արժեքը ներառում է 10–20% պահուստ անկանխատեսելի ծախսերի համար։ Վերջնական գինը կհստակեցվի չափագրումից հետո։",
    ru: "В оценку уже включен резерв 10–20% на непредвиденные расходы. Точная сумма уточняется после осмотра и замера.",
    en: "The estimate already includes a 10–20% contingency reserve. The final amount is confirmed after a site visit.",
  },
  estimateSummary: {
    am: "Երեք սցենարները օգնում են տեսնել նվազագույն, իրատեսական և ավելի բարդ տարբերակը",
    ru: "Три сценария помогают увидеть минимальный, реалистичный и более сложный бюджет",
    en: "Three scenarios show the minimum, realistic, and high-complexity budget",
  },
  selectedWorksHint: {
    am: "Ընտրեք միայն այն աշխատանքները, որոնք պետք է հաշվել։ Մնացած դաշտերը կբացվեն ըստ ընտրության։",
    ru: "Отметьте только те работы, которые нужно посчитать. Остальные поля откроются по логике выбора.",
    en: "Select only the works you want to estimate. The remaining fields will open based on your selection.",
  },
  contactHint: {
    am: "Թողեք հեռախոսահամարը, և կուղարկենք ավելի ճշգրիտ հաշվարկ ու աշխատանքների կազմը։",
    ru: "Оставьте номер телефона, и мы подготовим более точный расчет и состав работ.",
    en: "Leave your phone number and we will prepare a more accurate quote and scope.",
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

export const calculatorScenarioMeta = [
  {
    id: "minimal",
    reserve: 0.1,
    label: {
      am: "Նվազագույն",
      ru: "Минимальный",
      en: "Minimal",
    },
    note: {
      am: "Սեղմ բյուջե և պարզ սցենար",
      ru: "Сдержанный бюджет и простой сценарий",
      en: "Lean budget and simpler scope",
    },
  },
  {
    id: "realistic",
    reserve: 0.15,
    label: {
      am: "Իրատեսական",
      ru: "Реалистичный",
      en: "Realistic",
    },
    note: {
      am: "Ամենահավանական միջին սցենար",
      ru: "Наиболее вероятный средний сценарий",
      en: "Most likely mid-range scenario",
    },
  },
  {
    id: "high",
    reserve: 0.2,
    label: {
      am: "Բարձր",
      ru: "Высокий",
      en: "High",
    },
    note: {
      am: "Բարդություն, ավելի բարձր ծախսեր կամ բարձրակարգ նյութեր",
      ru: "Более сложный объект, повышенные риски или дорогие материалы",
      en: "Higher complexity, risk, or material grade",
    },
  },
];

export const calculatorProgressSteps = [
  {
    step: 1,
    label: {
      am: "Օբյեկտ",
      ru: "Объект",
      en: "Property",
    },
  },
  {
    step: 2,
    label: {
      am: "Ծավալ և փաթեթ",
      ru: "Объем и пакет",
      en: "Scope & Package",
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
      am: "Արժեք և կապ",
      ru: "Смета и связь",
      en: "Estimate & Contact",
    },
  },
];

export const calculatorFields = {
  locationCity: {
    type: "select",
    impact: 5,
    dependency: "always",
    label: {
      am: "Քաղաք / մարզ",
      ru: "Город / регион",
      en: "City / Region",
    },
    options: [
      {
        value: "yerevan",
        label: {
          am: "Երևան",
          ru: "Ереван",
          en: "Yerevan",
        },
      },
      {
        value: "abovyan",
        label: {
          am: "Աբովյան",
          ru: "Абовян",
          en: "Abovyan",
        },
      },
      {
        value: "ejmiatsin",
        label: {
          am: "Էջմիածին",
          ru: "Эчмиадзин",
          en: "Ejmiatsin",
        },
      },
      {
        value: "gyumri",
        label: {
          am: "Գյումրի",
          ru: "Гюмри",
          en: "Gyumri",
        },
      },
      {
        value: "vanadzor",
        label: {
          am: "Վանաձոր",
          ru: "Ванадзор",
          en: "Vanadzor",
        },
      },
      {
        value: "other",
        label: {
          am: "Այլ քաղաք / մարզ",
          ru: "Другой город / регион",
          en: "Other Region",
        },
      },
    ],
  },
  locationDistrict: {
    type: "select",
    impact: 2,
    dependency: "locationCity = yerevan",
    label: {
      am: "Երևանի վարչական շրջան",
      ru: "Район Еревана",
      en: "Yerevan District",
    },
    options: [
      {
        value: "kentron",
        label: {
          am: "Կենտրոն",
          ru: "Кентрон",
          en: "Kentron",
        },
      },
      {
        value: "arabkir",
        label: {
          am: "Արաբկիր",
          ru: "Арабкир",
          en: "Arabkir",
        },
      },
      {
        value: "davtashen",
        label: {
          am: "Դավթաշեն",
          ru: "Давташен",
          en: "Davtashen",
        },
      },
      {
        value: "ajapnyak",
        label: {
          am: "Աջափնյակ",
          ru: "Ачапняк",
          en: "Ajapnyak",
        },
      },
      {
        value: "nor-nork",
        label: {
          am: "Նոր Նորք",
          ru: "Нор Норк",
          en: "Nor Nork",
        },
      },
      {
        value: "malatia-sebastia",
        label: {
          am: "Մալաթիա-Սեբաստիա",
          ru: "Малатия-Себастия",
          en: "Malatia-Sebastia",
        },
      },
      {
        value: "shengavit",
        label: {
          am: "Շենգավիթ",
          ru: "Шенгавит",
          en: "Shengavit",
        },
      },
      {
        value: "avan",
        label: {
          am: "Ավան",
          ru: "Аван",
          en: "Avan",
        },
      },
      {
        value: "kanaker-zeitun",
        label: {
          am: "Քանաքեռ-Զեյթուն",
          ru: "Канакер-Зейтун",
          en: "Kanaker-Zeytun",
        },
      },
      {
        value: "erebuni",
        label: {
          am: "Էրեբունի",
          ru: "Эребуни",
          en: "Erebuni",
        },
      },
      {
        value: "nork-marash",
        label: {
          am: "Նորք-Մարաշ",
          ru: "Норк-Мараш",
          en: "Nork-Marash",
        },
      },
      {
        value: "other",
        label: {
          am: "Այլ",
          ru: "Другой",
          en: "Other",
        },
      },
    ],
  },
  propertyType: {
    type: "choice",
    impact: 4,
    dependency: "always",
    label: {
      am: "Օբյեկտի տեսակը",
      ru: "Тип объекта",
      en: "Property Type",
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
        value: "commercial",
        label: {
          am: "Կոմերցիոն",
          ru: "Коммерческий",
          en: "Commercial",
        },
      },
    ],
  },
  area: {
    type: "range",
    impact: 5,
    dependency: "always",
    label: {
      am: "Ընդհանուր մակերեսը (քմ)",
      ru: "Общая площадь (м²)",
      en: "Total Area (sqm)",
    },
  },
  conditionStage: {
    type: "select",
    impact: 5,
    dependency: "always",
    label: {
      am: "Օբյեկտի վիճակը",
      ru: "Состояние объекта",
      en: "Current Condition",
    },
    options: [
      {
        value: "new-shell",
        label: {
          am: "Նորակառույց, սևագիր",
          ru: "Новостройка, черновая",
          en: "New Building, Shell",
        },
      },
      {
        value: "new-white-box",
        label: {
          am: "Նորակառույց, նախապատրաստված",
          ru: "Новостройка, white box",
          en: "New Building, White Box",
        },
      },
      {
        value: "secondary-empty",
        label: {
          am: "Երկրորդային, դատարկ",
          ru: "Вторичка, пустая",
          en: "Secondary, Empty",
        },
      },
      {
        value: "secondary-lived-in",
        label: {
          am: "Երկրորդային, բնակեցված",
          ru: "Вторичка, с проживанием",
          en: "Secondary, Occupied",
        },
      },
      {
        value: "after-demolition",
        label: {
          am: "Դեմոնտաժից հետո",
          ru: "После демонтажа",
          en: "After Demolition",
        },
      },
    ],
  },
  estimateMode: {
    type: "choice",
    impact: 5,
    dependency: "always",
    label: {
      am: "Ինչպե՞ս հաշվենք",
      ru: "Что считаем",
      en: "What Should We Estimate",
    },
    options: [
      {
        value: "full-renovation",
        label: {
          am: "Ամբողջական վերանորոգում",
          ru: "Полный ремонт",
          en: "Full Renovation",
        },
      },
      {
        value: "selected-works",
        label: {
          am: "Միայն ընտրված աշխատանքներ",
          ru: "Только выбранные работы",
          en: "Selected Works Only",
        },
      },
    ],
  },
  pricingPackage: {
    type: "choice",
    impact: 5,
    dependency: "always",
    label: {
      am: "Ի՞նչ ներառել արժեքի մեջ",
      ru: "Что включить в стоимость",
      en: "What Should Be Included",
    },
    options: [
      {
        value: "labor-only",
        label: {
          am: "Միայն աշխատանք",
          ru: "Только работы",
          en: "Labor Only",
        },
      },
      {
        value: "labor-plus-rough",
        label: {
          am: "Աշխատանք + սև նյութեր",
          ru: "Работы + черновые материалы",
          en: "Labor + Rough Materials",
        },
      },
      {
        value: "labor-plus-all",
        label: {
          am: "Աշխատանք + բոլոր նյութերը",
          ru: "Работы + все материалы",
          en: "Labor + All Materials",
        },
      },
    ],
  },
  renovationLevel: {
    type: "choice",
    impact: 5,
    dependency: "estimateMode = full-renovation",
    label: {
      am: "Վերանորոգման մակարդակը",
      ru: "Уровень ремонта",
      en: "Renovation Level",
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
        value: "premium-turnkey",
        label: {
          am: "Պրեմիում / բանալիով",
          ru: "Премиум / под ключ",
          en: "Premium / Turnkey",
        },
      },
    ],
  },
  wetZonesCount: {
    type: "segment",
    impact: 4,
    dependency: "full-renovation + residential",
    label: {
      am: "Սանհանգույց / խոնավ գոտիներ",
      ru: "Санузлы / мокрые зоны",
      en: "Wet Zones",
    },
    options: [
      {
        value: "1",
        label: {
          am: "1",
          ru: "1",
          en: "1",
        },
      },
      {
        value: "2",
        label: {
          am: "2",
          ru: "2",
          en: "2",
        },
      },
      {
        value: "3plus",
        label: {
          am: "3+",
          ru: "3+",
          en: "3+",
        },
      },
    ],
  },
  engineeringScope: {
    type: "segment",
    impact: 5,
    dependency: "estimateMode = full-renovation",
    label: {
      am: "Ինժեներական համակարգեր",
      ru: "Инженерные системы",
      en: "Engineering Scope",
    },
    options: [
      {
        value: "keep-existing",
        label: {
          am: "Պահպանել գործողը",
          ru: "Оставить текущее",
          en: "Keep Existing",
        },
      },
      {
        value: "partial-replace",
        label: {
          am: "Մասնակի փոխարինում",
          ru: "Частичная замена",
          en: "Partial Replace",
        },
      },
      {
        value: "full-replace",
        label: {
          am: "Լիարժեք փոխարինում",
          ru: "Полная замена",
          en: "Full Replace",
        },
      },
    ],
  },
  replanningNeeded: {
    type: "segment",
    impact: 4,
    dependency: "full-renovation and non-cosmetic",
    label: {
      am: "Պե՞տք է վերապլանավորում",
      ru: "Нужна перепланировка",
      en: "Replanning Needed",
    },
    options: [
      {
        value: "no",
        label: {
          am: "Ոչ",
          ru: "Нет",
          en: "No",
        },
      },
      {
        value: "yes",
        label: {
          am: "Այո",
          ru: "Да",
          en: "Yes",
        },
      },
    ],
  },
  demolitionScope: {
    type: "choice",
    impact: 4,
    dependency: "secondary object or replanning",
    label: {
      am: "Դեմոնտաժի ծավալը",
      ru: "Объем демонтажа",
      en: "Demolition Scope",
    },
    options: [
      {
        value: "none",
        label: {
          am: "Չկա",
          ru: "Нет",
          en: "None",
        },
      },
      {
        value: "light-finish",
        label: {
          am: "Թեթև հարդարանք",
          ru: "Легкий",
          en: "Light Finish",
        },
      },
      {
        value: "medium",
        label: {
          am: "Միջին",
          ru: "Средний",
          en: "Medium",
        },
      },
      {
        value: "heavy-with-walls",
        label: {
          am: "Ծանր, նաև պատեր",
          ru: "Тяжелый, со стенами",
          en: "Heavy With Walls",
        },
      },
    ],
  },
  workModules: {
    type: "multi-select",
    impact: 5,
    dependency: "estimateMode = selected-works",
    label: {
      am: "Ընտրեք աշխատանքները",
      ru: "Выберите работы",
      en: "Choose the Works",
    },
    options: [
      {
        value: "demolition",
        label: {
          am: "Դեմոնտաժ",
          ru: "Демонтаж",
          en: "Demolition",
        },
      },
      {
        value: "electrical",
        label: {
          am: "Էլեկտրամոնտաժ",
          ru: "Электрика",
          en: "Electrical",
        },
      },
      {
        value: "plumbing",
        label: {
          am: "Սանտեխնիկա",
          ru: "Сантехника",
          en: "Plumbing",
        },
      },
      {
        value: "screed",
        label: {
          am: "Ստյաժկա",
          ru: "Стяжка пола",
          en: "Floor Screed",
        },
      },
      {
        value: "tile",
        label: {
          am: "Սալիկապատում",
          ru: "Плитка",
          en: "Tile",
        },
      },
      {
        value: "wall-paint",
        label: {
          am: "Պատերի ներկում",
          ru: "Подготовка и покраска",
          en: "Wall Paint",
        },
      },
      {
        value: "laminate-floor",
        label: {
          am: "Լամինատ",
          ru: "Ламинат",
          en: "Laminate Floor",
        },
      },
    ],
  },
  demolitionArea: {
    type: "number",
    impact: 4,
    dependency: "workModules includes demolition",
    label: {
      am: "Դեմոնտաժի մակերեսը (քմ)",
      ru: "Площадь демонтажа (м²)",
      en: "Demolition Area (sqm)",
    },
    placeholder: {
      am: "Օր.` 25",
      ru: "Напр. 25",
      en: "e.g. 25",
    },
  },
  electricalPoints: {
    type: "number",
    impact: 5,
    dependency: "workModules includes electrical",
    label: {
      am: "Էլեկտրական կետեր (հատ)",
      ru: "Электроточки (шт.)",
      en: "Electrical Points",
    },
    placeholder: {
      am: "Օր.` 25",
      ru: "Напр. 25",
      en: "e.g. 25",
    },
  },
  plumbingPoints: {
    type: "number",
    impact: 4,
    dependency: "workModules includes plumbing",
    label: {
      am: "Սանտեխնիկական կետեր (հատ)",
      ru: "Сантехточки (шт.)",
      en: "Plumbing Points",
    },
    placeholder: {
      am: "Օր.` 4",
      ru: "Напр. 4",
      en: "e.g. 4",
    },
  },
  screedArea: {
    type: "number",
    impact: 4,
    dependency: "workModules includes screed",
    label: {
      am: "Ստյաժկայի մակերեսը (քմ)",
      ru: "Площадь стяжки (м²)",
      en: "Screed Area (sqm)",
    },
    placeholder: {
      am: "Օր.` 60",
      ru: "Напр. 60",
      en: "e.g. 60",
    },
  },
  tileArea: {
    type: "number",
    impact: 4,
    dependency: "workModules includes tile",
    label: {
      am: "Սալիկի մակերեսը (քմ)",
      ru: "Площадь плитки (м²)",
      en: "Tile Area (sqm)",
    },
    placeholder: {
      am: "Օր.` 18",
      ru: "Напр. 18",
      en: "e.g. 18",
    },
  },
  paintArea: {
    type: "number",
    impact: 3,
    dependency: "workModules includes wall-paint",
    label: {
      am: "Ներկման մակերեսը (քմ)",
      ru: "Площадь покраски (м²)",
      en: "Paint Area (sqm)",
    },
    placeholder: {
      am: "Օր.` 140",
      ru: "Напр. 140",
      en: "e.g. 140",
    },
  },
  laminateArea: {
    type: "number",
    impact: 4,
    dependency: "workModules includes laminate-floor",
    label: {
      am: "Լամինատի մակերեսը (քմ)",
      ru: "Площадь ламината (м²)",
      en: "Laminate Area (sqm)",
    },
    placeholder: {
      am: "Օր.` 45",
      ru: "Напр. 45",
      en: "e.g. 45",
    },
  },
  plinthLength: {
    type: "number",
    impact: 2,
    dependency: "workModules includes laminate-floor",
    label: {
      am: "Պլինտուսի երկարությունը (գծ.մ.)",
      ru: "Длина плинтуса (п.м.)",
      en: "Plinth Length (lm)",
    },
    placeholder: {
      am: "Օր.` 32",
      ru: "Напр. 32",
      en: "e.g. 32",
    },
  },
  floorNumber: {
    type: "number",
    impact: 2,
    dependency: "propertyType = apartment",
    label: {
      am: "Հարկ",
      ru: "Этаж",
      en: "Floor",
    },
    placeholder: {
      am: "Օր.` 7",
      ru: "Напр. 7",
      en: "e.g. 7",
    },
  },
  elevator: {
    type: "segment",
    impact: 3,
    dependency: "apartment and floor > 1",
    label: {
      am: "Կա՞ վերելակ",
      ru: "Есть ли лифт",
      en: "Elevator Available",
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
  accessLevel: {
    type: "segment",
    impact: 3,
    dependency: "always",
    label: {
      am: "Մուտք և լոգիստիկա",
      ru: "Доступ и логистика",
      en: "Access & Logistics",
    },
    options: [
      {
        value: "easy",
        label: {
          am: "Հեշտ",
          ru: "Легко",
          en: "Easy",
        },
      },
      {
        value: "standard",
        label: {
          am: "Ստանդարտ",
          ru: "Стандарт",
          en: "Standard",
        },
      },
      {
        value: "difficult",
        label: {
          am: "Դժվար",
          ru: "Сложно",
          en: "Difficult",
        },
      },
    ],
  },
  urgency: {
    type: "segment",
    impact: 2,
    dependency: "advanced",
    label: {
      am: "Ժամկետի շտապություն",
      ru: "Срочность",
      en: "Urgency",
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
      am: "Օր.` ուզվող ժամկետ, դիզայն, լուսանկարների հղում կամ հատուկ պայմաններ",
      ru: "Напр.: желаемый срок, пожелания по дизайну, ссылка на фото или особенности объекта",
      en: "e.g. desired timing, design notes, links to photos, or special site conditions",
    },
  },
};

export const calculatorWorkModuleFieldMap = {
  demolition: ["demolitionArea"],
  electrical: ["electricalPoints"],
  plumbing: ["plumbingPoints"],
  screed: ["screedArea"],
  tile: ["tileArea"],
  "wall-paint": ["paintArea"],
  "laminate-floor": ["laminateArea", "plinthLength"],
};

export const calculatorPricingConfig = {
  roundingStep: 5000,
  fullRenovationRates: {
    cosmetic: {
      minimal: 45000,
      realistic: 57000,
      high: 70000,
    },
    capital: {
      minimal: 90000,
      realistic: 120000,
      high: 160000,
    },
    "premium-turnkey": {
      minimal: 110000,
      realistic: 145000,
      high: 190000,
    },
  },
  packageCoefficients: {
    "labor-only": {
      minimal: 0.72,
      realistic: 0.78,
      high: 0.84,
    },
    "labor-plus-rough": {
      minimal: 1,
      realistic: 1,
      high: 1,
    },
    "labor-plus-all": {
      minimal: 1.38,
      realistic: 1.52,
      high: 1.72,
    },
  },
  cityCoefficients: {
    yerevan: 1,
    abovyan: 0.98,
    ejmiatsin: 0.97,
    gyumri: 0.92,
    vanadzor: 0.94,
    other: 0.96,
  },
  districtCoefficients: {
    kentron: 1.04,
    arabkir: 1.03,
    davtashen: 1,
    ajapnyak: 0.99,
    "nor-nork": 1,
    "malatia-sebastia": 0.98,
    shengavit: 0.99,
    avan: 1,
    "kanaker-zeitun": 1.01,
    erebuni: 0.99,
    "nork-marash": 1.02,
    other: 1,
  },
  propertyCoefficients: {
    apartment: {
      minimal: 1,
      realistic: 1,
      high: 1,
    },
    house: {
      minimal: 1.1,
      realistic: 1.12,
      high: 1.16,
    },
    commercial: {
      minimal: 1.08,
      realistic: 1.12,
      high: 1.18,
    },
  },
  conditionCoefficients: {
    "new-shell": {
      minimal: 1,
      realistic: 1,
      high: 1,
    },
    "new-white-box": {
      minimal: 0.93,
      realistic: 0.95,
      high: 0.97,
    },
    "secondary-empty": {
      minimal: 1.08,
      realistic: 1.12,
      high: 1.15,
    },
    "secondary-lived-in": {
      minimal: 1.12,
      realistic: 1.18,
      high: 1.22,
    },
    "after-demolition": {
      minimal: 0.98,
      realistic: 1,
      high: 1.03,
    },
  },
  wetZoneCoefficients: {
    "1": {
      minimal: 1,
      realistic: 1,
      high: 1,
    },
    "2": {
      minimal: 1.06,
      realistic: 1.08,
      high: 1.1,
    },
    "3plus": {
      minimal: 1.12,
      realistic: 1.15,
      high: 1.18,
    },
  },
  engineeringCoefficients: {
    "keep-existing": {
      minimal: 1,
      realistic: 1,
      high: 1,
    },
    "partial-replace": {
      minimal: 1.06,
      realistic: 1.09,
      high: 1.12,
    },
    "full-replace": {
      minimal: 1.12,
      realistic: 1.16,
      high: 1.22,
    },
  },
  accessCoefficients: {
    easy: {
      minimal: 1,
      realistic: 1,
      high: 1,
    },
    standard: {
      minimal: 1.01,
      realistic: 1.02,
      high: 1.03,
    },
    difficult: {
      minimal: 1.05,
      realistic: 1.07,
      high: 1.1,
    },
  },
  urgencyCoefficients: {
    standard: {
      minimal: 1,
      realistic: 1,
      high: 1,
    },
    urgent: {
      minimal: 1.05,
      realistic: 1.08,
      high: 1.1,
    },
    "very-urgent": {
      minimal: 1.12,
      realistic: 1.15,
      high: 1.18,
    },
  },
  replanningCosts: {
    apartment: {
      minimal: 120000,
      realistic: 200000,
      high: 320000,
    },
    house: {
      minimal: 180000,
      realistic: 280000,
      high: 420000,
    },
    commercial: {
      minimal: 200000,
      realistic: 320000,
      high: 480000,
    },
  },
  demolitionScopeRates: {
    none: {
      minimal: 0,
      realistic: 0,
      high: 0,
    },
    "light-finish": {
      minimal: 1200,
      realistic: 1800,
      high: 2500,
    },
    medium: {
      minimal: 2200,
      realistic: 3000,
      high: 4000,
    },
    "heavy-with-walls": {
      minimal: 3500,
      realistic: 5000,
      high: 6500,
    },
  },
  selectedWorkRates: {
    demolitionArea: {
      minimal: 2000,
      realistic: 3000,
      high: 4000,
    },
    electricalPoints: {
      minimal: 2500,
      realistic: 3750,
      high: 5000,
    },
    plumbingPoints: {
      minimal: 8000,
      realistic: 10000,
      high: 13000,
    },
    screedArea: {
      minimal: 3000,
      realistic: 4000,
      high: 5000,
    },
    tileArea: {
      minimal: 8000,
      realistic: 11000,
      high: 15000,
    },
    paintArea: {
      minimal: 2500,
      realistic: 3500,
      high: 4500,
    },
    laminateArea: {
      minimal: 2000,
      realistic: 2750,
      high: 3500,
    },
    plinthLength: {
      minimal: 700,
      realistic: 1000,
      high: 1200,
    },
  },
  selectedWorkPackageCoefficients: {
    demolitionArea: {
      "labor-only": {
        minimal: 1,
        realistic: 1,
        high: 1,
      },
      "labor-plus-rough": {
        minimal: 1,
        realistic: 1,
        high: 1,
      },
      "labor-plus-all": {
        minimal: 1,
        realistic: 1,
        high: 1,
      },
    },
    electricalPoints: {
      "labor-only": {
        minimal: 1,
        realistic: 1,
        high: 1,
      },
      "labor-plus-rough": {
        minimal: 1.35,
        realistic: 1.45,
        high: 1.55,
      },
      "labor-plus-all": {
        minimal: 1.6,
        realistic: 1.8,
        high: 2.1,
      },
    },
    plumbingPoints: {
      "labor-only": {
        minimal: 1,
        realistic: 1,
        high: 1,
      },
      "labor-plus-rough": {
        minimal: 1.35,
        realistic: 1.45,
        high: 1.55,
      },
      "labor-plus-all": {
        minimal: 1.7,
        realistic: 1.9,
        high: 2.2,
      },
    },
    screedArea: {
      "labor-only": {
        minimal: 1,
        realistic: 1,
        high: 1,
      },
      "labor-plus-rough": {
        minimal: 1.35,
        realistic: 1.45,
        high: 1.55,
      },
      "labor-plus-all": {
        minimal: 1.35,
        realistic: 1.45,
        high: 1.55,
      },
    },
    tileArea: {
      "labor-only": {
        minimal: 1,
        realistic: 1,
        high: 1,
      },
      "labor-plus-rough": {
        minimal: 1.25,
        realistic: 1.35,
        high: 1.45,
      },
      "labor-plus-all": {
        minimal: 1.6,
        realistic: 1.85,
        high: 2.2,
      },
    },
    paintArea: {
      "labor-only": {
        minimal: 1,
        realistic: 1,
        high: 1,
      },
      "labor-plus-rough": {
        minimal: 1.2,
        realistic: 1.3,
        high: 1.4,
      },
      "labor-plus-all": {
        minimal: 1.45,
        realistic: 1.65,
        high: 1.9,
      },
    },
    laminateArea: {
      "labor-only": {
        minimal: 1,
        realistic: 1,
        high: 1,
      },
      "labor-plus-rough": {
        minimal: 1.05,
        realistic: 1.08,
        high: 1.12,
      },
      "labor-plus-all": {
        minimal: 2,
        realistic: 2.3,
        high: 2.7,
      },
    },
    plinthLength: {
      "labor-only": {
        minimal: 1,
        realistic: 1,
        high: 1,
      },
      "labor-plus-rough": {
        minimal: 1.02,
        realistic: 1.05,
        high: 1.08,
      },
      "labor-plus-all": {
        minimal: 1.6,
        realistic: 1.8,
        high: 2.1,
      },
    },
  },
  cityLogistics: {
    yerevan: {
      minimal: 0,
      realistic: 0,
      high: 0,
    },
    abovyan: {
      minimal: 15000,
      realistic: 30000,
      high: 50000,
    },
    ejmiatsin: {
      minimal: 20000,
      realistic: 35000,
      high: 60000,
    },
    gyumri: {
      minimal: 70000,
      realistic: 120000,
      high: 180000,
    },
    vanadzor: {
      minimal: 60000,
      realistic: 100000,
      high: 150000,
    },
    other: {
      minimal: 50000,
      realistic: 90000,
      high: 140000,
    },
  },
  floorSurcharge: {
    withElevator: {
      minimal: 3000,
      realistic: 5000,
      high: 7000,
    },
    noElevator: {
      minimal: 8000,
      realistic: 12000,
      high: 18000,
    },
  },
};

export const initialCalculatorForm = {
  locationCity: "yerevan",
  locationDistrict: "kentron",
  propertyType: "apartment",
  area: 60,
  conditionStage: "new-shell",
  estimateMode: "full-renovation",
  pricingPackage: "labor-plus-rough",
  renovationLevel: "capital",
  wetZonesCount: "1",
  engineeringScope: "partial-replace",
  replanningNeeded: "no",
  demolitionScope: "none",
  workModules: [],
  demolitionArea: 25,
  electricalPoints: 25,
  plumbingPoints: 4,
  screedArea: 60,
  tileArea: 18,
  paintArea: 140,
  laminateArea: 45,
  plinthLength: 32,
  floorNumber: 4,
  elevator: "yes",
  accessLevel: "standard",
  urgency: "standard",
  name: "",
  phone: "",
  comment: "",
};

export const initialCalculatorState = {
  step: 1,
  form: initialCalculatorForm,
};
