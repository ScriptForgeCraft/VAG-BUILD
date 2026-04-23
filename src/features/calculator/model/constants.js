export const calculatorText = {
  title: {
    am: "Վերանորոգման հաշվիչ",
    ru: "Калькулятор ремонта",
    en: "Renovation Calculator",
  },
  description: {
    am: "Ստացեք նախնական հաշվարկ 3 սցենարով՝ հիմնված Երևանի և Հայաստանի շուկայական գների վրա։",
    ru: "Получите предварительную смету в 3 сценариях на основе рыночных цен Еревана и Армении.",
    en: "Get a three-scenario estimate based on Yerevan and Armenia pricing benchmarks.",
  },
  estimateLabel: {
    am: "Նախնական գնային միջակայք",
    ru: "Предварительный диапазон стоимости",
    en: "Preliminary Budget Range",
  },
  estimateNote: {
    am: "Միջակայքը հիմնված է շուկայական նվազագույն, միջին և մաքսիմալ սցենարների վրա։ Վերջնական արժեքը կհստակեցվի չափագրումից և աշխատանքների ծավալի հաստատումից հետո։",
    ru: "Диапазон построен на рыночных сценариях (минимум, стандарт, максимум). Финальная сумма утверждается после замера и фиксации объема работ.",
    en: "The range is based on market min, typical, and max scenarios. The final amount is confirmed after measurement and scope review.",
  },
  estimateSummary: {
    am: "Երեք սցենարները ցույց են տալիս նվազագույն, իրատեսական և ավելի բարդ/պրեմիում տարբերակների բյուջեն։",
    ru: "Три сценария показывают минимальный, реалистичный и более сложный/премиальный бюджет.",
    en: "Three scenarios show the minimum, realistic, and high-complexity budget.",
  },
  selectedWorksHint: {
    am: "Նշեք միայն այն աշխատանքները, որոնք անհրաժեշտ է հաշվարկել։ Նախահաշիվը ներառում է միայն ընտրված դիրքերը՝ առանց լոգիստիկայի, հարկերի և ընդհանուր նախագծային հավելավճարների։",
    ru: "Отметьте только те работы, которые нужно посчитать. Смета формируется только по выбранным позициям, без учета этажности и других общепроектных расходов.",
    en: "Select only the works you want to estimate. The estimate is based strictly on the chosen items, without floor surcharges or other project-level overhead.",
  },
  selectedWorksCoverageHint: {
    am: "Եթե դիրքի համար առանձին դաշտ նախատեսված չէ, այն ավտոմատ չի ներառվում հաշվարկի մեջ։ Օրինակ՝ կահույք, տեխնիկա, հեռուստացույց, դեկոր և առանձին համաձայնեցվող այլ իրեր։",
    ru: "Если для позиции нет отдельного поля, она не входит в автоматический расчет. Например: мебель, бытовая техника, телевизоры, декор и прочие элементы, приобретаемые отдельно.",
    en: "If an item has no dedicated field, it is not included in the automatic estimate. Examples: furniture, appliances, TVs, decor, and other items purchased separately.",
  },
  pricingPackageHint: {
    am: "«Բոլոր նյութերը» ներառում է շինարարական (սև) և հարդարման նյութերը վերանորոգման նախահաշվի շրջանակներում։ Կահույքը, կենցաղային տեխնիկան և դեկորն այստեղ չեն մտնում։",
    ru: "Пакет «все материалы» включает черновые и чистовые строительные материалы в рамках сметы. Мебель, техника, текстиль и декор в этот пакет не входят.",
    en: "The “all materials” package includes rough and finish construction materials within the budget. Furniture, appliances, textiles, and decor are not included.",
  },
  turnkeyHint: {
    am: "Այս հաշվիչում «բանալիով» (turnkey) տարբերակը նշանակում է վերանորոգման ամբողջական ցիկլ՝ մինչև բնակվելու պատրաստ վիճակ, բայց առանց կահույքի և տեխնիկայի։",
    ru: "В данном калькуляторе ремонт «под ключ» означает полный цикл отделки до состояния готовности к проживанию, но без мебели и бытовой техники.",
    en: "In this calculator, “turnkey” implies a complete renovation cycle up to move-in readiness, but excludes furniture and appliances.",
  },
  contactHint: {
    am: "Թողեք Ձեր հեռախոսահամարը, և մենք կուղարկենք ավելի ճշգրիտ հաշվարկ և աշխատանքների մանրամասն ցանկ։",
    ru: "Оставьте ваш номер телефона, и мы подготовим более точный расчет и подробный перечень работ.",
    en: "Leave your phone number, and we will prepare a more accurate estimate and detailed scope of work.",
  },
  backButton: {
    am: "Հետ",
    ru: "Назад",
    en: "Back",
  },
  nextButton: {
    am: "Հաջորդ քայլ",
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
    reserve: 0,
    label: {
      am: "Նվազագույն",
      ru: "Минимальный",
      en: "Minimal",
    },
    note: {
      am: "Խնայողական բյուջե և պարզ լուծումներ",
      ru: "Экономный бюджет и простые решения",
      en: "Lean budget and simpler scope",
    },
  },
  {
    id: "realistic",
    reserve: 0,
    label: {
      am: "Իրատեսական",
      ru: "Реалистичный",
      en: "Realistic",
    },
    note: {
      am: "Ամենահավանական միջին վիճակագրական տարբերակը",
      ru: "Наиболее вероятный среднестатистический вариант",
      en: "Most likely mid-range scenario",
    },
  },
  {
    id: "high",
    reserve: 0,
    label: {
      am: "Բարձր",
      ru: "Высокий",
      en: "High",
    },
    note: {
      am: "Բարդ դիզայն, բարձրակարգ նյութեր կամ հավելյալ ռիսկեր",
      ru: "Сложный дизайн, премиальные материалы или скрытые риски",
      en: "Higher complexity, risks, or premium materials",
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
      ru: "Смета и контакты",
      en: "Estimate & Contact",
    },
  },
];

export const calculatorFields = {
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
          ru: "Частный дом",
          en: "House",
        },
      },
      {
        value: "commercial",
        label: {
          am: "Կոմերցիոն տարածք",
          ru: "Коммерческое помещение",
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
      am: "Ընդհանուր մակերես (քմ)",
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
          ru: "Новостройка, черновая отделка",
          en: "New Building, Shell",
        },
      },
      {
        value: "new-white-box",
        label: {
          am: "Նորակառույց, սպիտակ կմախք (white box)",
          ru: "Новостройка, предчистовая (white box)",
          en: "New Building, White Box",
        },
      },
      {
        value: "secondary-empty",
        label: {
          am: "Երկրորդային շուկա, դատարկ",
          ru: "Вторичка, пустая",
          en: "Secondary, Empty",
        },
      },
      {
        value: "secondary-lived-in",
        label: {
          am: "Երկրորդային շուկա, բնակեցված",
          ru: "Вторичка, жилая",
          en: "Secondary, Occupied",
        },
      },
      {
        value: "after-demolition",
        label: {
          am: "Ապամոնտաժումից հետո",
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
      am: "Ի՞նչ ենք հաշվարկում",
      ru: "Что рассчитываем?",
      en: "What Should We Estimate?",
    },
    options: [
      {
        value: "full-renovation",
        label: {
          am: "Ամբողջական վերանորոգում",
          ru: "Комплексный ремонт",
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
      ru: "Что включить в стоимость?",
      en: "What Should Be Included?",
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
          am: "Աշխատանք + սևագիր նյութեր",
          ru: "Работы + черновые материалы",
          en: "Labor + Rough Materials",
        },
      },
      {
        value: "labor-plus-all",
        label: {
          am: "Աշխատանք + բոլոր նյութերը",
          ru: "Работы + все стройматериалы",
          en: "Labor + Construction & Finish Materials",
        },
      },
    ],
  },
  renovationLevel: {
    type: "choice",
    impact: 5,
    dependency: "estimateMode = full-renovation",
    label: {
      am: "Վերանորոգման տեսակը",
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
          am: "Պրեմիում / Բանալիով",
          ru: "Премиум / Под ключ",
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
      am: "Սանհանգույցներ / խոնավ գոտիներ",
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
          am: "Պահպանել եղածը",
          ru: "Оставить существующие",
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
          am: "Ամբողջական փոխարինում",
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
      am: "Անհրաժե՞շտ է վերապլանավորում",
      ru: "Нужна ли перепланировка?",
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
      am: "Ապամոնտաժման (դեմոնտաժի) ծավալը",
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
          am: "Թեթև (միայն հարդարանք)",
          ru: "Легкий (только отделка)",
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
          am: "Ծանր (ներառյալ պատերը)",
          ru: "Тяжелый (включая стены)",
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
      am: "Ընտրեք անհրաժեշտ աշխատանքները",
      ru: "Выберите виды работ",
      en: "Choose the Works",
    },
    options: [
      {
        value: "demolition",
        label: {
          am: "Ապամոնտաժում (դեմոնտաժ)",
          ru: "Демонтаж",
          en: "Demolition",
        },
      },
      {
        value: "electrical",
        label: {
          am: "Էլեկտրամոնտաժ",
          ru: "Электромонтаж",
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
          am: "Հատակի հարթեցում (ստյաժկա)",
          ru: "Стяжка пола",
          en: "Floor Screed",
        },
      },
      {
        value: "tile",
        label: {
          am: "Սալիկապատում",
          ru: "Укладка плитки",
          en: "Tile",
        },
      },
      {
        value: "wall-paint",
        label: {
          am: "Պատերի նախապատրաստում և ներկում",
          ru: "Подготовка и покраска стен",
          en: "Wall Paint",
        },
      },
      {
        value: "laminate-floor",
        label: {
          am: "Լամինատի տեղադրում",
          ru: "Укладка ламината",
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
      am: "Ապամոնտաժվող մակերեսը (քմ)",
      ru: "Площадь демонтажа (м²)",
      en: "Demolition Area (sqm)",
    },
    placeholder: {
      am: "Օր.՝ 25",
      ru: "Напр.: 25",
      en: "e.g. 25",
    },
  },
  electricalPoints: {
    type: "number",
    impact: 5,
    dependency: "workModules includes electrical",
    label: {
      am: "Էլեկտրական կետերի քանակը (հատ)",
      ru: "Количество электроточек (шт.)",
      en: "Electrical Points",
    },
    placeholder: {
      am: "Օր.՝ 25",
      ru: "Напр.: 25",
      en: "e.g. 25",
    },
  },
  plumbingPoints: {
    type: "number",
    impact: 4,
    dependency: "workModules includes plumbing",
    label: {
      am: "Փոքր սանտեխնիկական կետեր / այցեր (հատ)",
      ru: "Мелкие сантехнические задачи / выезды (шт.)",
      en: "Minor Plumbing Jobs / Visits",
    },
    placeholder: {
      am: "Օր.՝ 1",
      ru: "Напр.: 1",
      en: "e.g. 1",
    },
  },
  plumberHours: {
    type: "number",
    impact: 3,
    dependency: "workModules includes plumbing",
    label: {
      am: "Սանտեխնիկի հավելյալ ժամեր",
      ru: "Дополнительные часы сантехника",
      en: "Additional Plumber Hours",
    },
    placeholder: {
      am: "Օր.՝ 2",
      ru: "Напр.: 2",
      en: "e.g. 2",
    },
  },
  screedArea: {
    type: "number",
    impact: 4,
    dependency: "workModules includes screed",
    label: {
      am: "Հարթեցվող (ստյաժկայի) մակերեսը (քմ)",
      ru: "Площадь стяжки (м²)",
      en: "Screed Area (sqm)",
    },
    placeholder: {
      am: "Օր.՝ 60",
      ru: "Напр.: 60",
      en: "e.g. 60",
    },
  },
  tileArea: {
    type: "number",
    impact: 4,
    dependency: "workModules includes tile",
    label: {
      am: "Սալիկապատվող մակերեսը (քմ)",
      ru: "Площадь плитки (м²)",
      en: "Tile Area (sqm)",
    },
    placeholder: {
      am: "Օր.՝ 18",
      ru: "Напр.: 18",
      en: "e.g. 18",
    },
  },
  paintArea: {
    type: "number",
    impact: 3,
    dependency: "workModules includes wall-paint",
    label: {
      am: "Ներկվող մակերեսը (քմ)",
      ru: "Площадь покраски (м²)",
      en: "Paint Area (sqm)",
    },
    placeholder: {
      am: "Օր.՝ 140",
      ru: "Напр.: 140",
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
      am: "Օր.՝ 45",
      ru: "Напр.: 45",
      en: "e.g. 45",
    },
  },
  plinthLength: {
    type: "number",
    impact: 2,
    dependency: "workModules includes laminate-floor",
    label: {
      am: "Շրիշակների (պլինտուսի) երկարությունը (գծ.մ.)",
      ru: "Длина плинтуса (п.м.)",
      en: "Plinth Length (lm)",
    },
    placeholder: {
      am: "Օր.՝ 32",
      ru: "Напр.: 32",
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
      am: "Օր.՝ 7",
      ru: "Напр.: 7",
      en: "e.g. 7",
    },
  },
  elevator: {
    type: "segment",
    impact: 3,
    dependency: "apartment and floor > 1",
    label: {
      am: "Կա՞ արդյոք վերելակ",
      ru: "Есть ли лифт?",
      en: "Elevator Available?",
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
  urgency: {
    type: "segment",
    impact: 2,
    dependency: "advanced",
    label: {
      am: "Հրատապություն",
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
      am: "Օր.՝ նախընտրելի ժամկետներ, դիզայնի մաղթանքներ կամ օբյեկտի առանձնահատկություններ",
      ru: "Напр.: желаемые сроки, пожелания по дизайну или особенности объекта",
      en: "e.g. desired timing, design preferences, or specific site conditions",
    },
  },
};

export const calculatorWorkModuleFieldMap = {
  demolition: ["demolitionArea"],
  electrical: ["electricalPoints"],
  plumbing: ["plumbingPoints", "plumberHours"],
  screed: ["screedArea"],
  tile: ["tileArea"],
  "wall-paint": ["paintArea"],
  "laminate-floor": ["laminateArea", "plinthLength"],
};

export const initialCalculatorForm = {
  locationCity: "yerevan",
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
  plumbingPoints: 1,
  plumberHours: 0,
  screedArea: 60,
  tileArea: 18,
  paintArea: 140,
  laminateArea: 45,
  plinthLength: 32,
  floorNumber: 4,
  elevator: "yes",
  urgency: "standard",
  name: "",
  phone: "",
  comment: "",
};

export const initialCalculatorState = {
  step: 1,
  form: initialCalculatorForm,
};
