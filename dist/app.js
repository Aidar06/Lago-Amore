document.documentElement.classList.add('js');

const API_BASE = 'https://x8ki-letl-twmt.n7.xano.io/api:X8-e2j1w/priglosi';
const $ = (selector) => document.querySelector(selector);
const previewMode = location.pathname.split('/').filter(Boolean).includes('preview');

const UI = {
  ru: {
    venue: 'Место проведения', programMain: 'Тайминг', programRest: 'свадебного дня', timelineSignature: 'До встречи на нашей свадьбе',
    saveDate: 'Сохраните эту дату', wishesKicker: 'От всего сердца', countdownMain: 'Увидимся', countdownRest: 'через...', countdownFooter: 'до нашего счастливого дня',
    days: 'дней', hours: 'часов', minutes: 'минут', seconds: 'секунд', rsvpTitle: 'Анкета', rsvpKicker: 'Подтверждение присутствия',
    rsvpLead: 'Пожалуйста, заполните анкету, чтобы мы могли всё подготовить к нашему празднику.', name: 'Ваше имя', namePlaceholder: 'Как к вам обращаться?',
    attendance: 'Вы сможете прийти?', yes: 'С радостью приду', no: 'К сожалению, не смогу', count: 'Количество гостей', wish: 'Ваши пожелания',
    wishPlaceholder: 'Несколько тёплых слов для молодожёнов', submit: 'Отправить ответ', sending: 'Отправляем ваш ответ…', success: 'Спасибо! Ваш ответ успешно отправлен.',
    error: 'Не удалось отправить ответ. Попробуйте ещё раз.', previewSubmit: 'Это демонстрационный просмотр — ответ не отправлен.', footer: 'Спасибо, что вы с нами!',
    loading: 'Загружаем приглашение…', loadError: 'Не удалось загрузить приглашение.', retry: 'Попробовать снова',
    months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    monthsGenitive: ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
    week: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']
  },
  ky: {
    venue: 'Той өтүүчү жер', programMain: 'Күндүн', programRest: 'программасы', timelineSignature: 'Тойдо жолугушканча',
    saveDate: 'Бул күндү белгилеп коюңуз', wishesKicker: 'Чын жүрөктөн', countdownMain: 'Көрүшөбүз', countdownRest: 'дагы...', countdownFooter: 'биздин бактылуу күнүбүзгө чейин',
    days: 'күн', hours: 'саат', minutes: 'мүнөт', seconds: 'секунд', rsvpTitle: 'Анкета', rsvpKicker: 'Катышууну ырастоо',
    rsvpLead: 'Майрамыбызды мыкты даярдоо үчүн, сураныч, анкетаны толтуруңуз.', name: 'Сиздин атыңыз', namePlaceholder: 'Сизге кантип кайрылалы?',
    attendance: 'Тойго келе аласызбы?', yes: 'Ооба, кубануу менен', no: 'Тилекке каршы, келе албайм', count: 'Коноктордун саны', wish: 'Сиздин каалооңуз',
    wishPlaceholder: 'Жаштарга бир нече жылуу сөз', submit: 'Жоопту жөнөтүү', sending: 'Жооп жөнөтүлүүдө…', success: 'Рахмат! Жообуңуз ийгиликтүү жөнөтүлдү.',
    error: 'Жооп жөнөтүлгөн жок. Кайра аракет кылыңыз.', previewSubmit: 'Бул демо-көрүү — жооп жөнөтүлгөн жок.', footer: 'Биз менен болгонуңуз үчүн рахмат!',
    loading: 'Чакыруу жүктөлүүдө…', loadError: 'Чакыруу жүктөлгөн жок.', retry: 'Кайра аракет кылуу',
    months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    monthsGenitive: ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'],
    week: ['Дш','Шш','Шр','Бш','Жм','Иш','Жк']
  },
  kk: {
    venue: 'Той өтетін орын', programMain: 'Күн', programRest: 'бағдарламасы', timelineSignature: 'Тойымызда кездескенше',
    saveDate: 'Осы күнді сақтаңыз', wishesKicker: 'Шын жүректен', countdownMain: 'Кездесеміз', countdownRest: 'тағы...', countdownFooter: 'бақытты күнімізге дейін',
    days: 'күн', hours: 'сағат', minutes: 'минут', seconds: 'секунд', rsvpTitle: 'Сауалнама', rsvpKicker: 'Қатысуды растау',
    rsvpLead: 'Мерекемізді жақсы дайындауымыз үшін сауалнаманы толтырыңыз.', name: 'Сіздің атыңыз', namePlaceholder: 'Сізге қалай жүгінеміз?',
    attendance: 'Тойға келе аласыз ба?', yes: 'Иә, қуана келемін', no: 'Өкінішке қарай, келе алмаймын', count: 'Қонақтар саны', wish: 'Сіздің тілегіңіз',
    wishPlaceholder: 'Жас жұбайларға бірнеше жылы сөз', submit: 'Жауапты жіберу', sending: 'Жауап жіберілуде…', success: 'Рақмет! Жауабыңыз сәтті жіберілді.',
    error: 'Жауап жіберілмеді. Қайталап көріңіз.', previewSubmit: 'Бұл демо-көрініс — жауап жіберілген жоқ.', footer: 'Бізбен бірге болғаныңызға рақмет!',
    loading: 'Шақыру жүктелуде…', loadError: 'Шақыру жүктелмеді.', retry: 'Қайталап көру',
    months: ['Қаңтар','Ақпан','Наурыз','Сәуір','Мамыр','Маусым','Шілде','Тамыз','Қыркүйек','Қазан','Қараша','Желтоқсан'],
    monthsGenitive: ['қаңтар','ақпан','наурыз','сәуір','мамыр','маусым','шілде','тамыз','қыркүйек','қазан','қараша','желтоқсан'],
    week: ['Дс','Сс','Ср','Бс','Жм','Сб','Жс']
  }
};

const FALLBACK = {
  public_id: '12',
  languages: { enabled: ['ru', 'ky', 'kk'], default: 'ru' },
  names: { groom: 'Бекзат', bride: 'Алина' },
  date: '2027-06-12T16:30:00',
  invitation: {
    ru: { title: 'Дорогие родные и друзья!', text: 'Мы будем счастливы разделить с вами этот особенный день. Приглашаем вас стать частью нашего свадебного торжества!' },
    ky: { title: 'Урматтуу туугандар жана достор!', text: 'Бул өзгөчө күндү сиздер менен бирге өткөрүүгө кубанычтабыз. Сиздерди үйлөнүү тоюбузга чакырабыз!' },
    kk: { title: 'Құрметті туыстар мен достар!', text: 'Осы ерекше күнді сіздермен бірге өткізуге қуаныштымыз. Сіздерді үйлену тойымызға шақырамыз!' }
  },
  wish_block: {
    enabled: true,
    content: {
      ru: { title: 'Наши пожелания', text: 'Самый ценный подарок для нас — ваше присутствие, улыбки и хорошее настроение!' },
      ky: { title: 'Биздин каалообуз', text: 'Биз үчүн эң баалуу белек — сиздердин катышууңуздар, жылмаюуңуздар жана жакшы маанайыңыздар!' },
      kk: { title: 'Біздің тілегіміз', text: 'Біз үшін ең қымбат сыйлық — сіздердің қатысуларыңыз, күлкілеріңіз және жақсы көңіл күйлеріңіз!' }
    }
  },
  ceremonies: [
    { time: '16:30', sort_order: 1, content: { ru: { title: 'Встреча гостей', text: 'Приветственные напитки, тёплые объятия и памятные фотографии.' }, ky: { title: 'Конокторду тосуп алуу', text: 'Суусундуктар, жылуу кучакташуулар жана эстелик сүрөттөр.' }, kk: { title: 'Қонақтарды қарсы алу', text: 'Қош келдіңіздер сусыны, жылы құшақтасу және естелік суреттер.' } } },
    { time: '17:00', sort_order: 2, content: { ru: { title: 'Свадебная церемония', text: 'Разделите с нами трогательный момент рождения нашей семьи.' }, ky: { title: 'Үйлөнүү үлпөтү', text: 'Үй-бүлөбүздүн түптөлүшүндөгү толкунданткан көз ирмемге күбө болуңуздар.' }, kk: { title: 'Неке қию рәсімі', text: 'Отбасымыздың құрылуындағы әсерлі сәтке бірге куә болыңыздар.' } } },
    { time: '18:00', sort_order: 3, content: { ru: { title: 'Праздничный ужин', text: 'Вкусные блюда, искренние поздравления и уютная атмосфера.' }, ky: { title: 'Майрамдык кечки тамак', text: 'Даамдуу тамактар, чын жүрөктөн айтылган куттуктоолор жана жылуу маанай.' }, kk: { title: 'Мерекелік кешкі ас', text: 'Дәмді тағамдар, шынайы құттықтаулар және жайлы атмосфера.' } } },
    { time: '20:00', sort_order: 4, content: { ru: { title: 'Танцы и веселье', text: 'Зажигательные танцы, улыбки и незабываемые моменты.' }, ky: { title: 'Бий жана көңүл ачуу', text: 'Шаңдуу бийлер, жылмаюулар жана унутулгус көз ирмемдер.' }, kk: { title: 'Би және көңіл көтеру', text: 'Көңілді билер, күлкі мен ұмытылмас сәттер.' } } },
    { time: '23:00', sort_order: 5, content: { ru: { title: 'Завершение вечера', text: 'Спасибо, что разделили с нами этот счастливый день!' }, ky: { title: 'Кеченин аякташы', text: 'Бул бактылуу күндү биз менен бөлүшкөнүңүздөр үчүн рахмат!' }, kk: { title: 'Кештің аяқталуы', text: 'Осы бақытты күнді бізбен бірге өткізгендеріңіз үшін рақмет!' } } }
  ],
  venue: {
    content: {
      ru: { type: 'Банкетный зал', name: 'Изумруд', address: 'г. Бишкек, ул. Чуй, 123' },
      ky: { type: 'Банкеттик зал', name: 'Изумруд', address: 'Бишкек ш., Чүй көч., 123' },
      kk: { type: 'Банкет залы', name: 'Изумруд', address: 'Бішкек қ., Чүй көш., 123' }
    },
    map: { enabled: true, google_url: '', two_gis_url: '' }
  },
  rsvp: { enabled: true, allow_guest_wish: true, max_guests: 10 }
};

const elements = {
  loader: $('#siteLoader'), loaderText: $('#loaderText'), retry: $('#retryButton'),
  groom: $('#groomName'), bride: $('#brideName'), invitationTitleMain: $('#invitationTitleMain'), invitationTitleRest: $('#invitationTitleRest'), invitationText: $('#invitationText'), weddingDate: $('#weddingDate'),
  venueSection: $('#venueSection'), venueKicker: $('#venueKicker'), venueTitle: $('#venueTitle'), venueType: $('#venueType'), venueAddress: $('#venueAddress'), venueActions: $('#venueActions'), googleMap: $('#googleMapLink'), twoGisMap: $('#twoGisMapLink'),
  timelineSection: $('#timelineSection'), timelineKicker: $('#timelineKicker'), timelineTitleMain: $('#timelineTitleMain'), timelineTitleRest: $('#timelineTitleRest'), timelineList: $('#timelineList'), timelineSignature: $('#timelineSignature'),
  calendarKicker: $('#calendarKicker'), calendarDay: $('#calendarDay'), calendarMonth: $('#calendarTitle'), calendarYear: $('#calendarYear'), calendarTable: $('#calendarTable'), calendarWeekdays: $('#calendarWeekdays'), calendarDays: $('#calendarDays'),
  wishesSection: $('#wishesSection'), wishesKicker: $('#wishesKicker'), wishesTitle: $('#wishesTitle'), wishesText: $('#wishesText'), wishesNames: $('#wishesNames'),
  countdownTitleMain: $('#countdownTitleMain'), countdownTitleRest: $('#countdownTitleRest'), countdownFooter: $('#countdownFooter'), daysLabel: $('#daysLabel'), hoursLabel: $('#hoursLabel'), minutesLabel: $('#minutesLabel'), secondsLabel: $('#secondsLabel'),
  countdownDays: $('[data-countdown-days]'), countdownHours: $('[data-countdown-hours]'), countdownMinutes: $('[data-countdown-minutes]'), countdownSeconds: $('[data-countdown-seconds]'),
  rsvpSection: $('#rsvpSection'), rsvpForm: $('#rsvpForm'), rsvpTitle: $('#rsvpTitle'), rsvpKicker: $('#rsvpKicker'), rsvpLead: $('#rsvpLead'), nameLabel: $('#nameLabel'), guestName: $('#guestName'), attendanceLabel: $('#attendanceLabel'), attendanceYes: $('#attendanceYes'), attendanceNo: $('#attendanceNo'), guestCountLabel: $('#guestCountLabel'), guestCountField: $('[data-guest-count]'), guestSelect: $('[data-guest-select]'), guestSelectTrigger: $('.guest-select-trigger'), guestInput: $('[data-guest-input]'), guestLabel: $('[data-guest-label]'), guestOptions: $('#guestOptions'), guestWishField: $('#guestWishField'), guestWishLabel: $('#guestWishLabel'), guestWish: $('#guestWish'), submit: $('.rsvp-submit'), submitLabel: $('#submitLabel'), rsvpStatus: $('[data-rsvp-status]'), rsvpFooter: $('#rsvpFooter'),
  languageMenu: $('#languageMenu'), languageOptions: $('#languageOptions'), languageToggle: $('#languageToggle')
};

const state = {
  record: FALLBACK, publicId: '12', lang: 'ru',
  weddingDate: new Date('2027-06-12T16:30:00+06:00'),
  dateParts: { year: 2027, month: 5, day: 12, hour: 16, minute: 30 },
  maxGuests: 10, submitting: false
};

function normalizeLang(code) {
  if (code === 'kg') return 'ky';
  return ['ru', 'ky', 'kk'].includes(code) ? code : 'ru';
}

function invitationId() {
  const queryId = new URLSearchParams(location.search).get('id');
  if (queryId) return queryId;
  const parts = location.pathname.split('/').filter(Boolean).filter((part) => part !== 'preview' && part !== 'index.html');
  return parts.at(-1) || '12';
}

function asArray(value) {
  return Array.isArray(value) ? value : (value && typeof value === 'object' ? Object.values(value) : []);
}

function enabledLanguages() {
  const raw = state.record?.languages?.enabled;
  const languages = Array.isArray(raw) ? raw.map(normalizeLang) : ['ru'];
  return [...new Set(languages.filter((language) => UI[language]))];
}

function localized(source) {
  if (!source || typeof source !== 'object') return {};
  const defaultLanguage = normalizeLang(state.record?.languages?.default);
  return source[state.lang] || source[state.lang === 'ky' ? 'kg' : state.lang] || source[defaultLanguage] || source.ru || Object.values(source)[0] || {};
}

function mergeRecord(record) {
  return {
    ...FALLBACK, ...record,
    languages: { ...FALLBACK.languages, ...(record.languages || {}) },
    names: { ...FALLBACK.names, ...(record.names || {}) },
    invitation: record.invitation || FALLBACK.invitation,
    wish_block: { ...FALLBACK.wish_block, ...(record.wish_block || {}), content: record.wish_block?.content || FALLBACK.wish_block.content },
    ceremonies: record.ceremonies ?? FALLBACK.ceremonies,
    venue: { ...FALLBACK.venue, ...(record.venue || {}), content: record.venue?.content || FALLBACK.venue.content, map: { ...FALLBACK.venue.map, ...(record.venue?.map || {}) } },
    rsvp: { ...FALLBACK.rsvp, ...(record.rsvp || {}) }
  };
}

function parseWeddingDate(value) {
  const source = String(value || FALLBACK.date);
  const match = source.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/);
  state.dateParts = match
    ? { year: Number(match[1]), month: Number(match[2]) - 1, day: Number(match[3]), hour: Number(match[4] || 0), minute: Number(match[5] || 0) }
    : { year: 2027, month: 5, day: 12, hour: 16, minute: 30 };
  const zoned = /Z$|[+-]\d\d:\d\d$/.test(source) ? source : `${source}+06:00`;
  const parsed = new Date(zoned);
  state.weddingDate = Number.isNaN(parsed.getTime()) ? new Date('2027-06-12T16:30:00+06:00') : parsed;
}

function safeHttpUrl(value, fallback) {
  try {
    const url = new URL(String(value || ''));
    return /^https?:$/.test(url.protocol) ? url.href : fallback;
  } catch {
    return fallback;
  }
}

function setText(element, value) {
  if (element) element.textContent = value ?? '';
}

function splitInvitationTitle(title) {
  const words = String(title || '').trim().split(/\s+/).filter(Boolean);
  setText(elements.invitationTitleMain, words.shift() || '');
  setText(elements.invitationTitleRest, words.join(' '));
  elements.invitationTitleRest.hidden = words.length === 0;
}

function guestWord(count) {
  if (state.lang === 'ky') return 'конок';
  if (state.lang === 'kk') return 'қонақ';
  if (count === 1) return 'гость';
  if (count >= 2 && count <= 4) return 'гостя';
  return 'гостей';
}

function setGuestCount(value) {
  const count = Math.max(1, Math.min(state.maxGuests, Number(value) || 1));
  elements.guestInput.value = String(count);
  elements.guestLabel.textContent = `${count} ${guestWord(count)}`;
  elements.guestOptions.querySelectorAll('[data-guest-value]').forEach((option) => {
    option.setAttribute('aria-selected', String(Number(option.dataset.guestValue) === count));
  });
}

function closeGuestSelect() {
  elements.guestOptions.hidden = true;
  elements.guestSelectTrigger.setAttribute('aria-expanded', 'false');
}

function buildGuestOptions() {
  state.maxGuests = Math.max(1, Math.min(50, Number(state.record.rsvp?.max_guests) || 10));
  const current = Math.min(Number(elements.guestInput.value) || 1, state.maxGuests);
  const options = Array.from({ length: state.maxGuests }, (_, index) => {
    const value = index + 1;
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('role', 'option');
    button.setAttribute('aria-selected', String(value === current));
    button.dataset.guestValue = String(value);
    button.textContent = String(value);
    return button;
  });
  elements.guestOptions.replaceChildren(...options);
  setGuestCount(current);
}

function renderNames() {
  const names = state.record.names || FALLBACK.names;
  setText(elements.groom, names.groom);
  setText(elements.bride, names.bride);
  setText(elements.wishesNames, `${names.groom || ''} & ${names.bride || ''}`);
  document.title = `${names.groom || ''} & ${names.bride || ''} — свадебное приглашение`;
}

function renderInvitation() {
  const content = localized(state.record.invitation);
  splitInvitationTitle(content.title);
  setText(elements.invitationText, content.text);
  const { year, month, day } = state.dateParts;
  const shortDate = `${String(day).padStart(2, '0')}.${String(month + 1).padStart(2, '0')}.${year}`;
  setText(elements.weddingDate, shortDate);
  elements.weddingDate.dateTime = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function renderCalendar(copy) {
  const { year, month, day } = state.dateParts;
  setText(elements.calendarKicker, copy.saveDate);
  setText(elements.calendarDay, day);
  setText(elements.calendarMonth, copy.monthsGenitive[month]);
  setText(elements.calendarYear, year);
  elements.calendarTable.setAttribute('aria-label', `${copy.months[month]} ${year}`);
  elements.calendarWeekdays.replaceChildren(...copy.week.map((label) => {
    const cell = document.createElement('th');
    cell.textContent = label;
    return cell;
  }));

  const firstWeekday = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
  const totalDays = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells = [];
  for (let index = 0; index < firstWeekday; index += 1) cells.push(null);
  for (let value = 1; value <= totalDays; value += 1) cells.push(value);
  while (cells.length % 7) cells.push(null);

  const rows = [];
  for (let index = 0; index < cells.length; index += 7) {
    const row = document.createElement('tr');
    cells.slice(index, index + 7).forEach((value) => {
      const cell = document.createElement('td');
      if (value) {
        if (value === day) {
          cell.className = 'wedding-day';
          cell.setAttribute('aria-current', 'date');
          const marker = document.createElement('span');
          marker.textContent = String(value);
          cell.append(marker);
        } else {
          cell.textContent = String(value);
        }
      }
      row.append(cell);
    });
    rows.push(row);
  }
  elements.calendarDays.replaceChildren(...rows);
}

function renderVenue(copy) {
  const content = localized(state.record.venue?.content);
  const address = String(content.address || '').trim();
  const visible = Boolean(content.name || content.type || address);
  elements.venueSection.hidden = !visible;
  if (!visible) return;
  setText(elements.venueKicker, copy.venue);
  setText(elements.venueTitle, content.name);
  setText(elements.venueType, content.type);
  setText(elements.venueAddress, address);
  const map = state.record.venue?.map || {};
  const query = encodeURIComponent(address || content.name || '');
  const enabled = map.enabled !== false;
  elements.venueActions.hidden = !enabled;
  elements.googleMap.href = safeHttpUrl(map.google_url, `https://www.google.com/maps/search/?api=1&query=${query}`);
  elements.twoGisMap.href = safeHttpUrl(map.two_gis_url, `https://2gis.kg/search/${query}`);
}

function renderTimeline(copy) {
  const { year, month, day } = state.dateParts;
  setText(elements.timelineKicker, `${day} ${copy.monthsGenitive[month]} · ${year}`);
  setText(elements.timelineTitleMain, copy.programMain);
  setText(elements.timelineTitleRest, copy.programRest);
  elements.timelineSignature.replaceChildren(document.createTextNode(`${copy.timelineSignature} `), Object.assign(document.createElement('span'), { textContent: '♡' }));
  const ceremonies = asArray(state.record.ceremonies).sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0));
  elements.timelineSection.hidden = ceremonies.length === 0;
  const nodes = ceremonies.map((item) => {
    const content = localized(item.content);
    const listItem = document.createElement('li');
    listItem.className = 'scroll-reveal';
    const time = document.createElement('time');
    time.dateTime = String(item.time || '');
    time.textContent = String(item.time || '');
    const marker = document.createElement('i');
    marker.setAttribute('aria-hidden', 'true');
    const copyBlock = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = String(content.title || '');
    const description = document.createElement('p');
    description.textContent = String(content.text || '');
    copyBlock.append(title);
    if (description.textContent) copyBlock.append(description);
    listItem.append(time, marker, copyBlock);
    return listItem;
  });
  elements.timelineList.replaceChildren(...nodes);
}

function renderWishes(copy) {
  const enabled = state.record.wish_block?.enabled !== false;
  const content = localized(state.record.wish_block?.content);
  const visible = enabled && Boolean(content.title || content.text);
  elements.wishesSection.hidden = !visible;
  if (!visible) return;
  setText(elements.wishesKicker, copy.wishesKicker);
  setText(elements.wishesTitle, content.title);
  setText(elements.wishesText, content.text);
}

function renderCountdown(copy) {
  setText(elements.countdownTitleMain, copy.countdownMain);
  setText(elements.countdownTitleRest, copy.countdownRest);
  setText(elements.countdownFooter, copy.countdownFooter);
  setText(elements.daysLabel, copy.days);
  setText(elements.hoursLabel, copy.hours);
  setText(elements.minutesLabel, copy.minutes);
  setText(elements.secondsLabel, copy.seconds);
  updateCountdown();
}

function renderRsvp(copy) {
  const config = state.record.rsvp || {};
  elements.rsvpSection.hidden = config.enabled === false;
  if (elements.rsvpSection.hidden) return;
  setText(elements.rsvpTitle, copy.rsvpTitle);
  setText(elements.rsvpKicker, copy.rsvpKicker);
  setText(elements.rsvpLead, copy.rsvpLead);
  setText(elements.nameLabel, copy.name);
  elements.guestName.placeholder = copy.namePlaceholder;
  setText(elements.attendanceLabel, copy.attendance);
  setText(elements.attendanceYes, copy.yes);
  setText(elements.attendanceNo, copy.no);
  setText(elements.guestCountLabel, copy.count);
  setText(elements.guestWishLabel, copy.wish);
  elements.guestWish.placeholder = copy.wishPlaceholder;
  setText(elements.submitLabel, copy.submit);
  setText(elements.rsvpFooter, copy.footer);
  elements.guestWishField.hidden = config.allow_guest_wish === false;
  elements.guestWish.disabled = config.allow_guest_wish === false;
  buildGuestOptions();
}

function renderLanguageMenu() {
  const languages = enabledLanguages();
  const labels = { ru: 'RU', ky: 'KG', kk: 'KZ' };
  elements.languageMenu.hidden = previewMode || languages.length < 2;
  if (elements.languageMenu.hidden) return;
  setText(elements.languageToggle, labels[state.lang]);
  elements.languageOptions.replaceChildren(...languages.map((language) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.language = language;
    button.textContent = labels[language];
    button.classList.toggle('is-active', language === state.lang);
    button.setAttribute('aria-label', `Язык ${labels[language]}`);
    return button;
  }));
}

function render() {
  const copy = UI[state.lang] || UI.ru;
  document.documentElement.lang = state.lang;
  renderNames();
  renderInvitation();
  renderVenue(copy);
  renderTimeline(copy);
  renderCalendar(copy);
  renderWishes(copy);
  renderCountdown(copy);
  renderRsvp(copy);
  renderLanguageMenu();
  requestAnimationFrame(observeReveals);
}

function updateCountdown() {
  const remaining = Math.max(0, state.weddingDate.getTime() - Date.now());
  const values = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining % 86400000) / 3600000),
    minutes: Math.floor((remaining % 3600000) / 60000),
    seconds: Math.floor((remaining % 60000) / 1000)
  };
  setText(elements.countdownDays, String(values.days).padStart(3, '0'));
  setText(elements.countdownHours, String(values.hours).padStart(2, '0'));
  setText(elements.countdownMinutes, String(values.minutes).padStart(2, '0'));
  setText(elements.countdownSeconds, String(values.seconds).padStart(2, '0'));
}

function observeReveals() {
  const targets = document.querySelectorAll('.scroll-reveal:not(.is-visible), .timeline:not(.is-visible)');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    targets.forEach((target) => target.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, current) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      current.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
  targets.forEach((target) => observer.observe(target));
}

function revealSite() {
  document.body.classList.remove('is-loading');
  elements.loader.hidden = true;
}

function showLoadError() {
  const copy = UI[state.lang] || UI.ru;
  setText(elements.loaderText, copy.loadError);
  setText(elements.retry, copy.retry);
  elements.retry.hidden = false;
}

async function loadInvitation() {
  document.body.classList.add('is-loading');
  elements.loader.hidden = false;
  elements.retry.hidden = true;
  setText(elements.loaderText, UI.ru.loading);
  if (previewMode) {
    document.body.classList.add('preview-mode');
    state.record = FALLBACK;
    state.publicId = FALLBACK.public_id;
    state.lang = 'ru';
    parseWeddingDate(FALLBACK.date);
    render();
    revealSite();
    return;
  }
  try {
    const routeId = invitationId();
    const response = await fetch(`${API_BASE}/${encodeURIComponent(routeId)}`, { headers: { Accept: 'application/json' }, cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const raw = await response.json();
    const record = raw?.result || raw?.item || raw;
    if (!record || typeof record !== 'object') throw new Error('Invalid invitation');
    state.record = mergeRecord(record);
    state.publicId = String(record.public_id || routeId);
    parseWeddingDate(state.record.date);
    const languages = enabledLanguages();
    const stored = localStorage.getItem('torn-lake-language');
    const storedLanguage = stored ? normalizeLang(stored) : '';
    const preferred = normalizeLang(state.record.languages?.default);
    state.lang = storedLanguage && languages.includes(storedLanguage) ? storedLanguage : (languages.includes(preferred) ? preferred : languages[0] || 'ru');
    render();
    revealSite();
  } catch (error) {
    console.error('Invitation load failed', error);
    showLoadError();
  }
}

function setLanguage(language) {
  const normalized = normalizeLang(language);
  if (!enabledLanguages().includes(normalized)) return;
  const scrollPosition = window.scrollY;
  state.lang = normalized;
  localStorage.setItem('torn-lake-language', normalized);
  elements.languageMenu.classList.remove('is-open');
  elements.languageToggle.setAttribute('aria-expanded', 'false');
  render();
  window.scrollTo(0, scrollPosition);
}

elements.guestSelectTrigger.addEventListener('click', () => {
  const opening = elements.guestOptions.hidden;
  elements.guestOptions.hidden = !opening;
  elements.guestSelectTrigger.setAttribute('aria-expanded', String(opening));
});

elements.guestOptions.addEventListener('click', (event) => {
  const option = event.target.closest('[data-guest-value]');
  if (!option) return;
  setGuestCount(option.dataset.guestValue);
  closeGuestSelect();
  elements.guestSelectTrigger.focus();
});

elements.rsvpForm.addEventListener('change', (event) => {
  if (event.target.name !== 'attendance') return;
  elements.guestCountField.hidden = event.target.value === 'false';
  if (elements.guestCountField.hidden) closeGuestSelect();
});

elements.rsvpForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (state.submitting || !elements.rsvpForm.reportValidity()) return;
  const copy = UI[state.lang] || UI.ru;
  elements.rsvpStatus.className = 'rsvp-status';
  if (previewMode) {
    elements.rsvpStatus.textContent = copy.previewSubmit;
    return;
  }
  const formData = new FormData(elements.rsvpForm);
  const attendance = formData.get('attendance') === 'true';
  const payload = {
    name: String(formData.get('name') || '').trim(),
    attendance,
    count: attendance ? Math.max(1, Number(formData.get('count')) || 1) : 1,
    wish: state.record.rsvp?.allow_guest_wish === false ? '' : String(formData.get('wish') || '').trim()
  };
  state.submitting = true;
  elements.submit.disabled = true;
  setText(elements.submitLabel, copy.sending);
  elements.rsvpStatus.textContent = '';
  try {
    const response = await fetch(`${API_BASE}/${encodeURIComponent(state.publicId)}/rsvp`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    elements.rsvpForm.reset();
    elements.guestCountField.hidden = false;
    setGuestCount(1);
    elements.rsvpStatus.textContent = copy.success;
    elements.rsvpStatus.classList.add('is-success');
  } catch (error) {
    console.error('RSVP submit failed', error);
    elements.rsvpStatus.textContent = copy.error;
    elements.rsvpStatus.classList.add('is-error');
  } finally {
    state.submitting = false;
    elements.submit.disabled = false;
    setText(elements.submitLabel, copy.submit);
  }
});

elements.languageToggle.addEventListener('click', () => {
  const open = elements.languageMenu.classList.toggle('is-open');
  elements.languageToggle.setAttribute('aria-expanded', String(open));
});

elements.languageOptions.addEventListener('click', (event) => {
  const button = event.target.closest('[data-language]');
  if (button) setLanguage(button.dataset.language);
});

document.addEventListener('click', (event) => {
  if (!elements.guestSelect.contains(event.target)) closeGuestSelect();
  if (!elements.languageMenu.hidden && !elements.languageMenu.contains(event.target)) {
    elements.languageMenu.classList.remove('is-open');
    elements.languageToggle.setAttribute('aria-expanded', 'false');
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  closeGuestSelect();
  elements.languageMenu.classList.remove('is-open');
  elements.languageToggle.setAttribute('aria-expanded', 'false');
});

elements.retry.addEventListener('click', loadInvitation);
setInterval(updateCountdown, 1000);
loadInvitation();
