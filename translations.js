// Loaded AFTER site-config.js and menu-data.js
// DO NOT call applyLang() from this file — pages own their own init() order.
const LANG_KEY = 'tavernaki-lang';

function getLang() {
  try { return localStorage.getItem(LANG_KEY) || 'bg'; }
  catch { return 'bg'; }
}
function setLang(lang) {
  try { localStorage.setItem(LANG_KEY, lang); }
  catch { /* silent fail in private/strict browsers */ }
}

const t = {
  bg: {
    // Page titles
    page_title_home: 'Тавернаки — Автентична гръцка кухня',
    page_title_menu: 'Меню | Тавернаки',
    // Meta descriptions
    meta_desc_home: 'Тавернаки — автентична гръцка кухня в Пловдив. Свежа риба, морски дарове, скара, паста. Резервирайте маса: 0877 64 62 06.',
    meta_desc_menu: 'Пълното меню на Тавернаки — Пловдив. Салати, предястия, скара, риба, морски дарове, паста и ризото.',
    // Navbar
    nav_home:    'Начало',
    nav_menu:    'Меню',
    nav_about:   'За нас',
    nav_parties: 'Тържества',
    nav_gallery: 'Галерия',
    nav_contact: 'Контакти',
    nav_reserve: 'Резервирай маса',
    toggle_label: 'EN',
    sticky_reserve: 'РЕЗЕРВИРАЙ МАСА',
    // Hero
    hero_tagline:     'Автентичната гръцка кухня,',
    hero_sub:         'традиционно поднесена с любов',
    hero_cta_reserve: 'Резервирай маса',
    hero_cta_menu:    'Виж менюто',
    // Trust bar
    trust_music:          'Жива гръцка музика',
    trust_music_sub:      'Всеки петък',
    trust_quality:        'Домашно приготвено',
    trust_quality_sub:    'Пресни сезонни продукти',
    trust_appetizers:     'Безплатни предястия',
    trust_appetizers_sub: 'За всяка маса',
    // Dishes section
    dishes_label: 'Нашите специалитети',
    dishes_title: 'Вкусът на Гърция',
    dishes_sub:   'Пресни морски дарове, автентични рецепти и щедри порции — подготвени с внимание и любов',
    // About page
    about_hero_sub:      'Разкрийте историята зад автентичната гръцка кухня, която обичаме',
    about_badge_label:   'Нашата мисия',
    about_badge_quote:   'Всяко ястие е приготвено с душа и уважение към традицията',
    about_badge_author:  '— Шеф Димитри',
    value1_title:        'Автентични рецепти',
    value1_sub:          'Традиционни гръцки рецепти, предавани от поколение на поколение',
    value2_title:        'Домашна атмосфера',
    value2_sub:          'Топло и уютно място, което ви кара да се чувствате като у дома',
    value3_title:        'Любов към детайла',
    value3_sub:          'Внимание към всяка чиния, всяка маса, всеки гост',
    // About — 5 blocks (client copy)
    about_welcome_h: 'Добре дошли в Тавернаки',
    about_welcome_p: 'Вече повече от пет години посрещаме своите гости с внимание към всеки детайл. Тавернаки е уютно място с топла вътрешна зала и красива лятна градина, където истинската гръцка кухня се среща с домашния уют. Приготвяме всичко от пресни и сезонни продукти с грижа за всяка чиния.',
    about_story_h:   'Нашата история',
    about_story_p:   'Създадохме Тавернаки с идеята да предложим не просто ресторант, а място с характер и душа. Вдъхновени от природата, гръцката трапеза и радостта от споделено ястие, изградихме пространство, в което семейства и приятели се завръщат отново и отново.',
    about_chef_h:    'Кухня с душа',
    about_chef_p:    'Рецептите са специално селектирани от шеф Димитри и гръцки готвачи с дълбоко уважение към традициите. Всяко ястие носи автентичния дух на гръцката кухня — приготвено с разбиране, опит и любов към занаята.',
    about_music_h:   'Храна и музика',
    about_music_p:   'При специални поводи организираме тематични вечери с гостуващи оркестри от Гърция. Жива музика, гръцки ритми и незабравима атмосфера — вечери, след които се мисли дълго.',
    // Parties page
    parties_hero_title:      'Специални моменти,\nнезабравими спомени',
    parties_hero_sub:        'Отпразнувайте важните моменти в топлата атмосфера на Тавернаки',
    parties_intro_title:     'Вашият специален повод заслужава перфектното място',
    parties_intro_sub:       'В Тавернаки вярваме, че всеки специален момент трябва да бъде отбелязан с автентична храна, топло обслужване и незабравима атмосфера.',
    parties_features_label:  'Нашите предимства',
    parties_features_title:  'Всичко, от което се нуждаете',
    parties_cta_title:       'Планирайте вашето тържество',
    parties_cta_sub:         'Обадете ни се и ще планираме заедно всеки детайл на вашия специален повод.',
    event1_title:  'Рождени дни',
    event1_desc:   'Изненадайте любим човек с незабравима вечеря в автентична гръцка атмосфера. Специално меню, декорация и внимание към всеки детайл.',
    event2_title:  'Годишнини',
    event2_desc:   'Отпразнувайте годишнина в романтична среда с избрано меню от нашите гръцки специалитети и персонализирано обслужване.',
    event3_title:  'Групови резервации',
    event3_desc:   'Семейна среща, събиране на приятели или групово посещение — разполагаме с необходимото пространство и гъвкавост.',
    event4_title:  'Фирмени вечери',
    event4_desc:   'Корпоративни събирания в приятна и релаксираща среда. Персонализирано меню и дискретно обслужване за вашия екип.',
    feature1_title: 'Лятна градина',
    feature1_desc:  'Просторна тераса и зелена градина — идеална за летни тържества на открито.',
    feature2_title: 'Персонализирано меню',
    feature2_desc:  'Избираме заедно с вас менюто от нашите автентични гръцки специалитети.',
    feature3_title: 'Посветен персонал',
    feature3_desc:  'Нашият екип се грижи за всеки детайл, за да се насладите на вечерта.',
    feature4_title: 'Безплатен паркинг',
    feature4_desc:  'Просторен паркинг за вас и вашите гости — без допълнително притеснение.',
    // Contact page
    contact_hero_title:    'Работно Време & Адрес',
    contact_hero_sub:      'Заповядайте при нас — в уютна среда и с открито сърце',
    contact_address_label: 'Адрес',
    contact_parking_label: 'Паркинг',
    contact_parking_desc:  'Безплатен паркинг за гости на ресторанта',
    contact_map_link:      'Отвори в Google Maps',
    // Lunch note — used in About section and menu.html
    lunch_note: 'Всеки делничен ден ви очакваме с разнообразно обедно меню от прясно приготвени ястия. Бърза, вкусна и домашна храна — идеална за обедна пауза.',
    // Gallery
    gallery_label: 'Атмосфера',
    gallery_title: 'Средиземноморски дух',
    // Reviews
    reviews_label:  'Казват за нас',
    reviews_title:  'Гласът на нашите гости',
    reviews_count1: '637+ оценки',
    reviews_count2: '629 отзива · RestaurantGuru',
    // Location & hours
    location_label:  'Намерете ни',
    location_title:  'Работно Време & Адрес',
    hours_title:     'Работно Време',
    contacts_title:  'Контакти',
    day_mon: 'Понеделник',
    day_tue: 'Вторник',
    day_wed: 'Сряда',
    day_thu: 'Четвъртък',
    day_fri: 'Петък',
    day_sat: 'Събота',
    day_sun: 'Неделя',
    delivery_label: 'Поръчайте онлайн чрез',
    // Reserve CTA
    cta_label:    'Резервации',
    cta_title:    'Заповядайте в Тавернаки',
    cta_sub:      'Резервирайте маса или се обадете директно — ние ще се погрижим за всичко останало. Всяка вечер е специална при нас.',
    cta_btn_call: 'Обадете се: 0877 64 62 06',
    cta_btn_wa:   'WhatsApp резервация',
    cta_info:     'Открито всеки ден 10:00 — 00:00 · Безплатен паркинг · Достъпен за хора с увреждания',
    // Footer
    footer_slogan:       'Автентичната гръцка кухня, традиционно поднесена с любов',
    footer_social:       'Социални Медии',
    footer_nav_head:     'Навигация',
    footer_contact_head: 'Контакти',
    footer_nav_menu:     'Меню',
    footer_nav_about:    'История',
    footer_nav_gallery:  'Галерия',
    footer_nav_contact:  'Контакти',
    footer_nav_reserve:  'Резервации',
    footer_copyright:    '© 2025 Tavernaki · Всички права запазени',
    footer_delivery:     'Доставка чрез Glovo · Wolt · Takeaway.com',
    // Menu hero
    menu_hero_title: 'Нашето меню',
    // Reviews
    review_1_quote: 'Калмарите бяха едни от най-вкусните, които съм опитвала. Изключителна гръцка атмосфера, бързо и качествено обслужване, щедри порции.',
    review_2_quote: 'Невероятно вкусно! Жива гръцка музика в петък. Истинска гръцка атмосфера, точно като у дома.',
    review_3_quote: 'Комплиментарна вода и десерт, пресни морски дарове. Страхотно преживяване. Има меню на английски.',
    review_4_author: 'Георги Иванов',
    review_4_quote: 'Рибата на скара е невероятна — свежа, перфектно приготвена. Лятната градина е уютна и приятна. Определено ще се върнем.',
    review_5_author: 'Sophie Laurent',
    review_5_quote: 'Безплатните предястия бяха прекрасна изненада. Атмосферата е топла и средиземноморска. Персоналът — изключително любезен.',
    review_6_author: 'Alexandros Papadopoulos',
    review_6_quote: 'Истински гръцки дух — точно такъв, какъвто го познавам от Атина. Отлично съотношение качество-цена и автентични рецепти.',
    // Category tabs
    cat_all:         'Всички',
    cat_salads:      'Салати',
    cat_starters:    'Стартери',
    cat_appetizers:  'Предястия',
    cat_mezethes:    'Мезета',
    cat_potatoes:    'Пържени Картофи',
    cat_pasta:       'Паста и Ризото',
    cat_bbq_meat:    'Месни Ястия на Скара',
    cat_pan_meat:    'Месни Ястия на Тиган',
    cat_specialties: 'Специалитети',
    cat_fish:        'Риба и Морски Дарове',
    cat_lunch:       'Обедно Меню (Пон–Пет)',
    // Menu page UI
    allergens_label:      'Алергени:',
    allergens_on_request: 'Информация за алергени при поискване',
    price_per_unit:       '/ 100г',
    menu_empty:           'Няма налични ястия.',
  },
  en: {
    // Page titles
    page_title_home: 'Tavernaki — Authentic Greek Cuisine',
    page_title_menu: 'Menu | Tavernaki',
    // Meta descriptions
    meta_desc_home: 'Tavernaki — authentic Greek cuisine in Plovdiv. Fresh fish, seafood, grilled meats, pasta. Reserve a table: 0877 64 62 06.',
    meta_desc_menu: 'Full menu of Tavernaki — Plovdiv. Salads, appetizers, BBQ, fish, seafood, pasta and risotto.',
    // Navbar
    nav_home:    'Home',
    nav_menu:    'Menu',
    nav_about:   'About Us',
    nav_parties: 'Parties & Celebrations',
    nav_gallery: 'Gallery',
    nav_contact: 'Contact',
    nav_reserve: 'Reserve a Table',
    toggle_label: 'BG',
    sticky_reserve: 'RESERVE A TABLE',
    // Hero
    hero_tagline:     'Authentic Greek cuisine,',
    hero_sub:         'traditionally served with love',
    hero_cta_reserve: 'Reserve a table',
    hero_cta_menu:    'View the menu',
    // Trust bar
    trust_music:          'Live Greek Music',
    trust_music_sub:      'Every Friday',
    trust_quality:        'Homemade food',
    trust_quality_sub:    'Fresh seasonal ingredients',
    trust_appetizers:     'Complimentary appetizer',
    trust_appetizers_sub: 'For every table',
    // Dishes section
    dishes_label: 'Our Specialties',
    dishes_title: 'The Taste of Greece',
    dishes_sub:   'Fresh seafood, authentic recipes and generous portions — prepared with care and love',
    // About page
    about_hero_sub:      'Discover the story behind the authentic Greek cuisine we love',
    about_badge_label:   'Our mission',
    about_badge_quote:   'Every dish is made with soul and respect for tradition',
    about_badge_author:  '— Chef Dimitri',
    value1_title:        'Authentic recipes',
    value1_sub:          'Traditional Greek recipes passed down through generations',
    value2_title:        'Home atmosphere',
    value2_sub:          'A warm and cosy place that makes you feel right at home',
    value3_title:        'Attention to detail',
    value3_sub:          'Care for every plate, every table, every guest',
    // About — 5 blocks
    about_welcome_h: 'Welcome to Tavernaki',
    about_welcome_p: 'For over five years we have welcomed our guests with attention to every detail. Tavernaki is a cosy place with a warm indoor hall and a beautiful summer garden, where authentic Greek cuisine meets the comfort of home. We prepare everything from fresh, seasonal ingredients with care for every plate.',
    about_story_h:   'Our Story',
    about_story_p:   'We created Tavernaki with the idea of offering not just a restaurant, but a place with character and soul. Inspired by nature, the Greek table and the joy of shared meals, we built a space where families and friends return again and again.',
    about_chef_h:    'A Kitchen with Soul',
    about_chef_p:    'Our recipes were carefully selected by Chef Dimitri and Greek chefs with deep respect for tradition. Every dish carries the authentic spirit of Greek cuisine — prepared with understanding, experience and love for the craft.',
    about_music_h:   'Food & Music',
    about_music_p:   'On special occasions we host themed evenings with visiting orchestras from Greece. Live music, Greek rhythms and an unforgettable atmosphere — evenings that stay with you long after.',
    // Parties page
    parties_hero_title:      'Special moments,\nunforgettable memories',
    parties_hero_sub:        'Celebrate your most important moments in the warm atmosphere of Tavernaki',
    parties_intro_title:     'Your special occasion deserves the perfect setting',
    parties_intro_sub:       'At Tavernaki we believe every special moment should be marked with authentic food, warm service and an unforgettable atmosphere.',
    parties_features_label:  'Our advantages',
    parties_features_title:  'Everything you need',
    parties_cta_title:       'Plan your celebration',
    parties_cta_sub:         'Call us and we will plan every detail of your special occasion together.',
    event1_title:  'Birthdays',
    event1_desc:   'Surprise a loved one with an unforgettable dinner in an authentic Greek atmosphere. Special menu, decoration and attention to every detail.',
    event2_title:  'Anniversaries',
    event2_desc:   'Celebrate your anniversary in a romantic setting with a curated menu of our Greek specialties and personalised service.',
    event3_title:  'Group bookings',
    event3_desc:   'Family gathering, friends meetup or group visit — we have the space and flexibility to accommodate you.',
    event4_title:  'Corporate dinners',
    event4_desc:   'Corporate gatherings in a pleasant and relaxing environment. Customised menu and discreet service for your team.',
    feature1_title: 'Summer garden',
    feature1_desc:  'A spacious terrace and green garden — ideal for summer outdoor celebrations.',
    feature2_title: 'Personalised menu',
    feature2_desc:  'We work with you to select from our authentic Greek specialties.',
    feature3_title: 'Dedicated staff',
    feature3_desc:  'Our team takes care of every detail so you can enjoy your evening.',
    feature4_title: 'Free parking',
    feature4_desc:  'Spacious parking for you and your guests — no extra hassle.',
    // Contact page
    contact_hero_title:    'Opening Hours & Address',
    contact_hero_sub:      'Come visit us — in a cosy setting with an open heart',
    contact_address_label: 'Address',
    contact_parking_label: 'Parking',
    contact_parking_desc:  'Free parking for restaurant guests',
    contact_map_link:      'Open in Google Maps',
    // Lunch note
    lunch_note: 'Every weekday we welcome you with a varied lunch menu of freshly prepared dishes. Fast, tasty and home-style food — perfect for a lunch break.',
    // Gallery
    gallery_label: 'Atmosphere',
    gallery_title: 'Mediterranean Spirit',
    // Reviews
    reviews_label:  'What They Say',
    reviews_title:  'The Voice of Our Guests',
    reviews_count1: '637+ ratings',
    reviews_count2: '629 reviews · RestaurantGuru',
    // Location & hours
    location_label:  'Find Us',
    location_title:  'Opening Hours & Address',
    hours_title:     'Opening Hours',
    contacts_title:  'Contact',
    day_mon: 'Monday',
    day_tue: 'Tuesday',
    day_wed: 'Wednesday',
    day_thu: 'Thursday',
    day_fri: 'Friday',
    day_sat: 'Saturday',
    day_sun: 'Sunday',
    delivery_label: 'Order online via',
    // Reserve CTA
    cta_label:    'Reservations',
    cta_title:    'Welcome to Tavernaki',
    cta_sub:      'Book a table or call us directly — we\'ll take care of everything else. Every evening is special with us.',
    cta_btn_call: 'Call: 0877 64 62 06',
    cta_btn_wa:   'WhatsApp reservation',
    cta_info:     'Open every day 10:00 — 00:00 · Free parking · Accessible for people with disabilities',
    // Footer
    footer_slogan:       'Authentic Greek cuisine, traditionally served with love',
    footer_social:       'Social Media',
    footer_nav_head:     'Navigation',
    footer_contact_head: 'Contact',
    footer_nav_menu:     'Menu',
    footer_nav_about:    'Our Story',
    footer_nav_gallery:  'Gallery',
    footer_nav_contact:  'Contact',
    footer_nav_reserve:  'Reservations',
    footer_copyright:    '© 2025 Tavernaki · All rights reserved',
    footer_delivery:     'Delivery via Glovo · Wolt · Takeaway.com',
    // Menu hero
    menu_hero_title: 'Our Menu',
    // Reviews
    review_1_quote: 'The calamari were among the best I\'ve ever had. Exceptional Greek atmosphere, fast and quality service, generous portions.',
    review_2_quote: 'Incredibly delicious! Live Greek music on Fridays. Authentic Greek atmosphere — just like home.',
    review_3_quote: 'Complimentary water and dessert, fresh seafood. A wonderful experience. They also have an English menu.',
    review_4_author: 'Georgi Ivanov',
    review_4_quote: 'The grilled fish is incredible — fresh and perfectly cooked. The summer garden is cosy and lovely. We will definitely be back.',
    review_5_author: 'Sophie Laurent',
    review_5_quote: 'The complimentary appetizers were a wonderful surprise. The atmosphere is warm and Mediterranean. Staff absolutely lovely.',
    review_6_author: 'Alexandros Papadopoulos',
    review_6_quote: 'Authentic Greek spirit — exactly as I know it from Athens. Excellent value for money and genuine recipes.',
    // Category tabs
    cat_all:         'All',
    cat_salads:      'Salads',
    cat_starters:    'Starters',
    cat_appetizers:  'Appetizers',
    cat_mezethes:    'Starters Plate / Dips',
    cat_potatoes:    'Fried Potatoes',
    cat_pasta:       'Pasta & Risotto',
    cat_bbq_meat:    'BBQ Meat Dishes',
    cat_pan_meat:    'Pan Fried Meat Dishes',
    cat_specialties: 'Specialties',
    cat_fish:        'Fish & Seafood',
    cat_lunch:       'Lunch Menu (Mon–Fri)',
    // Menu page UI
    allergens_label:      'Allergens:',
    allergens_on_request: 'Allergen info on request',
    price_per_unit:       '/ 100g',
    menu_empty:           'No dishes available.',
  },
};

function applyLang(lang) {
  var curr = t[lang];

  // UI strings via data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.dataset.i18n;
    if (curr[key] !== undefined) el.textContent = curr[key];
  });

  // Toggle button label
  document.querySelectorAll('.lang-toggle').forEach(function(btn) {
    btn.textContent = curr.toggle_label;
  });

  // Dish card names + allergen text (menu.html only — skipped on index.html)
  if (window.menuData && document.getElementById('dish-grid')) {
    document.querySelectorAll('[data-dish-id]').forEach(function(card) {
      var id = card.dataset.dishId;
      var dish = window.menuData.find(function(d) { return d.id === id; });
      if (!dish) return;
      var nameEl = card.querySelector('.dish-name');
      var allergenLabelEl = card.querySelector('.allergen-label');
      var allergenValEl = card.querySelector('.allergen-val');
      var placeholder = card.querySelector('.dish-placeholder');
      if (nameEl) nameEl.textContent = lang === 'en' ? dish.name_en : dish.name_bg;
      if (placeholder) placeholder.setAttribute('aria-label', lang === 'en' ? dish.name_en : dish.name_bg);
      if (allergenLabelEl) allergenLabelEl.textContent = curr.allergens_label;
      if (allergenValEl) {
        allergenValEl.textContent = dish.allergens === 'Requires Restaurant Verification'
          ? curr.allergens_on_request
          : dish.allergens;
      }
      var priceEl = card.querySelector('.dish-price');
      if (priceEl && dish.price_unit) {
        priceEl.textContent = '€' + dish.price.toFixed(2) + ' ' + curr.price_per_unit;
      }
    });
  }

  // Page title + meta description
  var isMenuPage = !!document.querySelector('[data-page="menu"]');
  document.title = isMenuPage ? curr.page_title_menu : curr.page_title_home;
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = isMenuPage ? curr.meta_desc_menu : curr.meta_desc_home;

  setLang(lang);
  document.documentElement.dataset.lang = lang;
}

function toggleLang() {
  applyLang(getLang() === 'bg' ? 'en' : 'bg');
}
