/**
 * Famous political figures with their approximate compass positions
 * X: Economic (-10 left to +10 right)
 * Y: Social (-10 libertarian to +10 authoritarian)
 * 
 * Includes: G20 leaders, G7 leaders, BRICS leaders, Bangladeshi politicians, and notable historical figures
 */
export const FAMOUS_POLITICIANS = [
  // ============ G7 LEADERS ============
  { 
    name: 'Trump', 
    nameBn: 'ট্রাম্প', 
    x: 6, 
    y: 4, 
    country: '🇺🇸',
    countryName: 'USA',
    countryNameBn: 'যুক্তরাষ্ট্র'
  },
  { 
    name: 'Macron', 
    nameBn: 'ম্যাক্রোঁ', 
    x: 3, 
    y: 1, 
    country: '🇫🇷',
    countryName: 'France',
    countryNameBn: 'ফ্রান্স'
  },
  { 
    name: 'Keir Starmer', 
    nameBn: 'কিয়ার স্টারমার', 
    x: -2, 
    y: 1, 
    country: '🇬🇧',
    countryName: 'UK',
    countryNameBn: 'যুক্তরাজ্য'
  },
  { 
    name: 'Olaf Scholz', 
    nameBn: 'ওলাফ শোলৎস', 
    x: -1, 
    y: 1, 
    country: '🇩🇪',
    countryName: 'Germany',
    countryNameBn: 'জার্মানি'
  },
  { 
    name: 'Giorgia Meloni', 
    nameBn: 'জর্জিয়া মেলোনি', 
    x: 5, 
    y: 5, 
    country: '🇮🇹',
    countryName: 'Italy',
    countryNameBn: 'ইতালি'
  },
  { 
    name: 'Trudeau', 
    nameBn: 'ট্রুডো', 
    x: -1, 
    y: 1, 
    country: '🇨🇦',
    countryName: 'Canada',
    countryNameBn: 'কানাডা'
  },
  { 
    name: 'Shigeru Ishiba', 
    nameBn: 'শিগেরু ইশিবা', 
    x: 2, 
    y: 2, 
    country: '🇯🇵',
    countryName: 'Japan',
    countryNameBn: 'জাপান'
  },

  // ============ BRICS LEADERS ============
  { 
    name: 'Putin', 
    nameBn: 'পুতিন', 
    x: 4, 
    y: 8, 
    country: '🇷🇺',
    countryName: 'Russia',
    countryNameBn: 'রাশিয়া'
  },
  { 
    name: 'Xi Jinping', 
    nameBn: 'শি জিনপিং', 
    x: -2, 
    y: 9, 
    country: '🇨🇳',
    countryName: 'China',
    countryNameBn: 'চীন'
  },
  { 
    name: 'Modi', 
    nameBn: 'মোদি', 
    x: 5, 
    y: 6, 
    country: '🇮🇳',
    countryName: 'India',
    countryNameBn: 'ভারত'
  },
  { 
    name: 'Lula', 
    nameBn: 'লুলা', 
    x: -4, 
    y: 0, 
    country: '🇧🇷',
    countryName: 'Brazil',
    countryNameBn: 'ব্রাজিল'
  },
  { 
    name: 'Ramaphosa', 
    nameBn: 'রামাফোসা', 
    x: -2, 
    y: 2, 
    country: '🇿🇦',
    countryName: 'South Africa',
    countryNameBn: 'দক্ষিণ আফ্রিকা'
  },
  { 
    name: 'El-Sisi', 
    nameBn: 'আল-সিসি', 
    x: 3, 
    y: 8, 
    country: '🇪🇬',
    countryName: 'Egypt',
    countryNameBn: 'মিশর'
  },
  { 
    name: 'Abiy Ahmed', 
    nameBn: 'আবি আহমেদ', 
    x: 1, 
    y: 5, 
    country: '🇪🇹',
    countryName: 'Ethiopia',
    countryNameBn: 'ইথিওপিয়া'
  },
  { 
    name: 'Khamenei', 
    nameBn: 'খামেনি', 
    x: -3, 
    y: 10, 
    country: '🇮🇷',
    countryName: 'Iran',
    countryNameBn: 'ইরান'
  },
  { 
    name: 'MBZ', 
    nameBn: 'এমবিজেড', 
    x: 5, 
    y: 7, 
    country: '🇦🇪',
    countryName: 'UAE',
    countryNameBn: 'সংযুক্ত আরব আমিরাত'
  },

  // ============ OTHER G20 LEADERS ============
  { 
    name: 'MBS', 
    nameBn: 'এমবিএস', 
    x: 4, 
    y: 8, 
    country: '🇸🇦',
    countryName: 'Saudi Arabia',
    countryNameBn: 'সৌদি আরব'
  },
  { 
    name: 'Milei', 
    nameBn: 'মিলেই', 
    x: 8, 
    y: -4, 
    country: '🇦🇷',
    countryName: 'Argentina',
    countryNameBn: 'আর্জেন্টিনা'
  },
  { 
    name: 'Albanese', 
    nameBn: 'অ্যালবানিজ', 
    x: -1, 
    y: 0, 
    country: '🇦🇺',
    countryName: 'Australia',
    countryNameBn: 'অস্ট্রেলিয়া'
  },
  { 
    name: 'Prabowo', 
    nameBn: 'প্রাবোও', 
    x: 3, 
    y: 5, 
    country: '🇮🇩',
    countryName: 'Indonesia',
    countryNameBn: 'ইন্দোনেশিয়া'
  },
  { 
    name: 'Sheinbaum', 
    nameBn: 'শেইনবাম', 
    x: -3, 
    y: 2, 
    country: '🇲🇽',
    countryName: 'Mexico',
    countryNameBn: 'মেক্সিকো'
  },
  { 
    name: 'Yoon Suk Yeol', 
    nameBn: 'ইউন সুক ইওল', 
    x: 4, 
    y: 3, 
    country: '🇰🇷',
    countryName: 'South Korea',
    countryNameBn: 'দক্ষিণ কোরিয়া'
  },
  { 
    name: 'Erdogan', 
    nameBn: 'এরদোয়ান', 
    x: 3, 
    y: 7, 
    country: '🇹🇷',
    countryName: 'Turkey',
    countryNameBn: 'তুরস্ক'
  },
  { 
    name: 'von der Leyen', 
    nameBn: 'ফন ডার লায়েন', 
    x: 2, 
    y: 2, 
    country: '🇪🇺',
    countryName: 'EU',
    countryNameBn: 'ইউরোপীয় ইউনিয়ন'
  },

  // ============ BANGLADESH ============
  { 
    name: 'Sheikh Mujibur Rahman', 
    nameBn: 'শেখ মুজিবুর রহমান', 
    x: -5, 
    y: 6, 
    country: '🇧🇩',
    countryName: 'Bangladesh',
    countryNameBn: 'বাংলাদেশ',
    reason: 'Introduced BAKSAL (one-party socialist state), nationalized banks & industries. Strong left economics with authoritarian one-party rule.',
    reasonBn: 'বাকশাল (একদলীয় সমাজতান্ত্রিক রাষ্ট্র) প্রবর্তন করেন, ব্যাংক ও শিল্প জাতীয়করণ করেন। শক্তিশালী বামপন্থী অর্থনীতি ও কর্তৃত্ববাদী একদলীয় শাসন।'
  },
  { 
    name: 'Ziaur Rahman', 
    nameBn: 'জিয়াউর রহমান', 
    x: 3, 
    y: 6, 
    country: '🇧🇩',
    countryName: 'Bangladesh',
    countryNameBn: 'বাংলাদেশ',
    reason: 'BNP founder, denationalized industries, encouraged private sector. Ruled under martial law initially, center-right economics.',
    reasonBn: 'বিএনপি প্রতিষ্ঠাতা, শিল্প বেসরকারিকরণ করেন, বেসরকারি খাতকে উৎসাহিত করেন। প্রাথমিকভাবে সামরিক আইনে শাসন, মধ্য-ডানপন্থী অর্থনীতি।'
  },
  { 
    name: 'Maulana Bhashani', 
    nameBn: 'মওলানা ভাসানী', 
    x: -7, 
    y: -2, 
    country: '🇧🇩',
    countryName: 'Bangladesh',
    countryNameBn: 'বাংলাদেশ',
    reason: '"Red Maulana" - strong leftist, anti-imperialist, pro-peasant. Led mass movements (Farakka march), sided with socialist causes. People-powered, not top-down.',
    reasonBn: '"লাল মওলানা" - দৃঢ় বামপন্থী, সাম্রাজ্যবাদ-বিরোধী, কৃষক-পন্থী। গণআন্দোলন (ফারাক্কা মার্চ) পরিচালনা করেন, সমাজতান্ত্রিক আদর্শের পক্ষে। জনগণের ক্ষমতায়ন, উপর থেকে চাপানো নয়।'
  },
  { 
    name: 'A.K. Fazlul Huq', 
    nameBn: 'এ.কে. ফজলুল হক', 
    x: -3, 
    y: 1, 
    country: '🇧🇩',
    countryName: 'Bangladesh',
    countryNameBn: 'বাংলাদেশ',
    reason: '"Sher-e-Bangla" - championed peasant rights, moderate left. Passed Lahore Resolution. Democratic centrist with pro-poor policies.',
    reasonBn: '"শের-এ-বাংলা" - কৃষক অধিকারের চ্যাম্পিয়ন, মধ্যপন্থী বাম। লাহোর প্রস্তাব পাস করেন। গণতান্ত্রিক মধ্যপন্থী, দরিদ্র-বান্ধব নীতি।'
  },
  { 
    name: 'Huseyn Shaheed Suhrawardy', 
    nameBn: 'হোসেন শহীদ সোহরাওয়ার্দী', 
    x: -2, 
    y: 0, 
    country: '🇧🇩',
    countryName: 'Bangladesh',
    countryNameBn: 'বাংলাদেশ',
    reason: 'Democratic socialist, centrist. Founded Awami League. Supported parliamentary democracy and moderate economic reforms.',
    reasonBn: 'গণতান্ত্রিক সমাজতন্ত্রী, মধ্যপন্থী। আওয়ামী লীগ প্রতিষ্ঠা করেন। সংসদীয় গণতন্ত্র ও মধ্যপন্থী অর্থনৈতিক সংস্কার সমর্থন করতেন।'
  },
  { 
    name: 'Sheikh Hasina', 
    nameBn: 'শেখ হাসিনা', 
    x: -1, 
    y: 9, 
    country: '🇧🇩',
    countryName: 'Bangladesh',
    countryNameBn: 'বাংলাদেশ',
    reason: 'Despite AL socialist roots, quite business-friendly (garment industry, infrastructure). Highly authoritarian: media control, opposition crackdown, 2024 events.',
    reasonBn: 'আওয়ামী লীগের সমাজতান্ত্রিক শিকড় থাকলেও বেশ ব্যবসা-বান্ধব (গার্মেন্টস শিল্প, অবকাঠামো)। অত্যন্ত কর্তৃত্ববাদী: মিডিয়া নিয়ন্ত্রণ, বিরোধী দলের উপর দমন, ২০২৪ সালের ঘটনাবলী।'
  },
  { 
    name: 'Khaleda Zia', 
    nameBn: 'খালেদা জিয়া', 
    x: 3, 
    y: 5, 
    country: '🇧🇩',
    countryName: 'Bangladesh',
    countryNameBn: 'বাংলাদেশ',
    reason: 'BNP leader, center-right, pro-business policies. Moderately authoritarian governance style during her terms.',
    reasonBn: 'বিএনপি নেত্রী, মধ্য-ডানপন্থী, ব্যবসা-বান্ধব নীতি। তার শাসনামলে মধ্যম মাত্রার কর্তৃত্ববাদী শাসন পদ্ধতি।'
  },
  { 
    name: 'H.M. Ershad', 
    nameBn: 'হুসেইন মুহম্মদ এরশাদ', 
    x: 0, 
    y: 7, 
    country: '🇧🇩',
    countryName: 'Bangladesh',
    countryNameBn: 'বাংলাদেশ',
    reason: 'Military dictator, centrist economics balancing left-right. Eventually allowed democratic transition, hence slightly lower auth than Hasina.',
    reasonBn: 'সামরিক স্বৈরশাসক, বাম-ডান ভারসাম্যপূর্ণ মধ্যপন্থী অর্থনীতি। শেষ পর্যন্ত গণতান্ত্রিক রূপান্তরের অনুমতি দেন, তাই হাসিনার চেয়ে কিছুটা কম কর্তৃত্ববাদী।'
  },
  { 
    name: 'Z.M. Kader', 
    nameBn: 'জেড এম কাদের', 
    x: -3, 
    y: -4, 
    country: '🇧🇩',
    countryName: 'Bangladesh',
    countryNameBn: 'বাংলাদেশ',
    reason: 'AJD founder - grassroots democracy, anti-corruption, people empowerment. Pro-worker, anti-monopoly. Strongly libertarian and participatory.',
    reasonBn: 'এজেডি প্রতিষ্ঠাতা - তৃণমূল গণতন্ত্র, দুর্নীতি-বিরোধী, জনগণের ক্ষমতায়ন। শ্রমিক-পন্থী, একচেটিয়া-বিরোধী। দৃঢ় উদারপন্থী ও অংশগ্রহণমূলক।'
  },
  { 
    name: 'Nahid Islam', 
    nameBn: 'নাহিদ ইসলাম', 
    x: 2, 
    y: -5, 
    country: '🇧🇩',
    countryName: 'Bangladesh',
    countryNameBn: 'বাংলাদেশ',
    reason: '2024 quota reform student movement leader. Anti-establishment, pro-democracy youth voice. Strongly libertarian, slightly right on equality issues.',
    reasonBn: '২০২৪ কোটা সংস্কার ছাত্র আন্দোলনের নেতা। প্রতিষ্ঠান-বিরোধী, গণতন্ত্র-পন্থী তরুণ কণ্ঠস্বর। দৃঢ় উদারপন্থী।'
  },
  { 
    name: 'Dr. Shafiqur Rahman', 
    nameBn: 'ড. শফিকুর রহমান', 
    x: 4, 
    y: 6, 
    country: '🇧🇩',
    countryName: 'Bangladesh',
    countryNameBn: 'বাংলাদেশ',
    reason: 'Jamaat-e-Islami leader. Islamic economics (supports private property but also zakat redistribution). Socially conservative, supports Islamic governance.',
    reasonBn: 'জামায়াতে ইসলামী নেতা। ইসলামি অর্থনীতি (ব্যক্তিগত সম্পত্তি সমর্থন করে তবে যাকাত পুনর্বণ্টনও)। সামাজিকভাবে রক্ষণশীল, ইসলামি শাসন সমর্থন করেন।'
  },
  { 
    name: 'Tareq Rahman', 
    nameBn: 'তারেক রহমান', 
    x: 4, 
    y: 5, 
    country: '🇧🇩',
    countryName: 'Bangladesh',
    countryNameBn: 'বাংলাদেশ',
    reason: 'BNP acting chairman, center-right like party. Slightly authoritarian leadership style, exile politics.',
    reasonBn: 'বিএনপির ভারপ্রাপ্ত চেয়ারম্যান, দলের মতোই মধ্য-ডানপন্থী। সামান্য কর্তৃত্ববাদী নেতৃত্ব শৈলী, নির্বাসিত রাজনীতি।'
  },
  { 
    name: 'Syed Rezaul Karim', 
    nameBn: 'সৈয়দ রেজাউল করিম', 
    x: 2, 
    y: 5, 
    country: '🇧🇩',
    countryName: 'Bangladesh',
    countryNameBn: 'বাংলাদেশ',
    reason: 'Islami Andolan Bangladesh leader. Moderate Islamist, less extreme than Jamaat. Center-right economics with religious social conservatism.',
    reasonBn: 'ইসলামী আন্দোলন বাংলাদেশ নেতা। মধ্যপন্থী ইসলামপন্থী, জামায়াতের চেয়ে কম চরমপন্থী। মধ্য-ডানপন্থী অর্থনীতি ও ধর্মীয় সামাজিক রক্ষণশীলতা।'
  },

  // ============ OTHER NOTABLE LEADERS ============
  { 
    name: 'Netanyahu', 
    nameBn: 'নেতানিয়াহু', 
    x: 5, 
    y: 5, 
    country: '🇮🇱',
    countryName: 'Israel',
    countryNameBn: 'ইসরায়েল'
  },
  { 
    name: 'Kim Jong Un', 
    nameBn: 'কিম জং উন', 
    x: -5, 
    y: 10, 
    country: '🇰🇵',
    countryName: 'North Korea',
    countryNameBn: 'উত্তর কোরিয়া'
  },
  { 
    name: 'Maduro', 
    nameBn: 'মাদুরো', 
    x: -6, 
    y: 5, 
    country: '🇻🇪',
    countryName: 'Venezuela',
    countryNameBn: 'ভেনেজুয়েলা'
  },
  { 
    name: 'Zelensky', 
    nameBn: 'জেলেনস্কি', 
    x: 1, 
    y: 2, 
    country: '🇺🇦',
    countryName: 'Ukraine',
    countryNameBn: 'ইউক্রেন'
  },

  // ============ HISTORICAL FIGURES ============
  { 
    name: 'Stalin', 
    nameBn: 'স্তালিন', 
    x: -8, 
    y: 9, 
    country: '☭',
    countryName: 'Soviet Union',
    countryNameBn: 'সোভিয়েত ইউনিয়ন'
  },
  { 
    name: 'Mao', 
    nameBn: 'মাও', 
    x: -9, 
    y: 9, 
    country: '🇨🇳',
    countryName: 'China',
    countryNameBn: 'চীন'
  },
  { 
    name: 'Lenin', 
    nameBn: 'লেনিন', 
    x: -8, 
    y: 7, 
    country: '☭',
    countryName: 'Soviet Union',
    countryNameBn: 'সোভিয়েত ইউনিয়ন'
  },
  { 
    name: 'Castro', 
    nameBn: 'কাস্ত্রো', 
    x: -7, 
    y: 6, 
    country: '🇨🇺',
    countryName: 'Cuba',
    countryNameBn: 'কিউবা'
  },
  { 
    name: 'Che Guevara', 
    nameBn: 'চে গুয়েভারা', 
    x: -8, 
    y: 4, 
    country: '🇨🇺',
    countryName: 'Cuba',
    countryNameBn: 'কিউবা'
  },
  { 
    name: 'Gandhi', 
    nameBn: 'গান্ধী', 
    x: -3, 
    y: -5, 
    country: '🇮🇳',
    countryName: 'India',
    countryNameBn: 'ভারত'
  },
  { 
    name: 'Mandela', 
    nameBn: 'ম্যান্ডেলা', 
    x: -4, 
    y: -2, 
    country: '🇿🇦',
    countryName: 'South Africa',
    countryNameBn: 'দক্ষিণ আফ্রিকা'
  },
  { 
    name: 'Thatcher', 
    nameBn: 'থ্যাচার', 
    x: 7, 
    y: 4, 
    country: '🇬🇧',
    countryName: 'UK',
    countryNameBn: 'যুক্তরাজ্য'
  },
  { 
    name: 'Reagan', 
    nameBn: 'রেগান', 
    x: 7, 
    y: 3, 
    country: '🇺🇸',
    countryName: 'USA',
    countryNameBn: 'যুক্তরাষ্ট্র'
  },
  { 
    name: 'Obama', 
    nameBn: 'ওবামা', 
    x: 0, 
    y: 1, 
    country: '🇺🇸',
    countryName: 'USA',
    countryNameBn: 'যুক্তরাষ্ট্র'
  },
  { 
    name: 'Merkel', 
    nameBn: 'মের্কেল', 
    x: 2, 
    y: 1, 
    country: '🇩🇪',
    countryName: 'Germany',
    countryNameBn: 'জার্মানি'
  },
  { 
    name: 'Bernie Sanders', 
    nameBn: 'বার্নি স্যান্ডার্স', 
    x: -5, 
    y: -2, 
    country: '🇺🇸',
    countryName: 'USA',
    countryNameBn: 'যুক্তরাষ্ট্র'
  },
  { 
    name: 'Ron Paul', 
    nameBn: 'রন পল', 
    x: 7, 
    y: -6, 
    country: '🇺🇸',
    countryName: 'USA',
    countryNameBn: 'যুক্তরাষ্ট্র'
  },
  { 
    name: 'Corbyn', 
    nameBn: 'করবিন', 
    x: -6, 
    y: -1, 
    country: '🇬🇧',
    countryName: 'UK',
    countryNameBn: 'যুক্তরাজ্য'
  },

  // ============ RIGHT LIBERTARIAN ============
  { 
    name: 'Rand Paul', 
    nameBn: 'র‍্যান্ড পল', 
    x: 6, 
    y: -5, 
    country: '🇺🇸',
    countryName: 'USA',
    countryNameBn: 'যুক্তরাষ্ট্র'
  },
  { 
    name: 'Gary Johnson', 
    nameBn: 'গ্যারি জনসন', 
    x: 6, 
    y: -7, 
    country: '🇺🇸',
    countryName: 'USA',
    countryNameBn: 'যুক্তরাষ্ট্র'
  },
  { 
    name: 'Milton Friedman', 
    nameBn: 'মিল্টন ফ্রিডম্যান', 
    x: 8, 
    y: -4, 
    country: '🇺🇸',
    countryName: 'USA',
    countryNameBn: 'যুক্তরাষ্ট্র'
  },
  { 
    name: 'Friedrich Hayek', 
    nameBn: 'ফ্রিডরিখ হায়েক', 
    x: 7, 
    y: -5, 
    country: '🇦🇹',
    countryName: 'Austria',
    countryNameBn: 'অস্ট্রিয়া'
  },
  { 
    name: 'Ayn Rand', 
    nameBn: 'আইন র‍্যান্ড', 
    x: 9, 
    y: -3, 
    country: '🇺🇸',
    countryName: 'USA',
    countryNameBn: 'যুক্তরাষ্ট্র'
  },
  { 
    name: 'Murray Rothbard', 
    nameBn: 'মারে রথবার্ড', 
    x: 10, 
    y: -8, 
    country: '🇺🇸',
    countryName: 'USA',
    countryNameBn: 'যুক্তরাষ্ট্র'
  },
  { 
    name: 'Thomas Sowell', 
    nameBn: 'থমাস সোয়েল', 
    x: 6, 
    y: -2, 
    country: '🇺🇸',
    countryName: 'USA',
    countryNameBn: 'যুক্তরাষ্ট্র'
  },
  { 
    name: 'Peter Thiel', 
    nameBn: 'পিটার থিয়েল', 
    x: 7, 
    y: -4, 
    country: '🇺🇸',
    countryName: 'USA',
    countryNameBn: 'যুক্তরাষ্ট্র'
  },
  { 
    name: 'Elon Musk', 
    nameBn: 'ইলন মাস্ক', 
    x: 5, 
    y: -3, 
    country: '🇺🇸',
    countryName: 'USA',
    countryNameBn: 'যুক্তরাষ্ট্র'
  },
  { 
    name: 'Vivek Ramaswamy', 
    nameBn: 'বিবেক রামস্বামী', 
    x: 6, 
    y: -2, 
    country: '🇺🇸',
    countryName: 'USA',
    countryNameBn: 'যুক্তরাষ্ট্র'
  },

  // ============ CENTRIST & LIBERAL (NON-USA) ============
  { 
    name: 'Jacinda Ardern', 
    nameBn: 'জেসিন্ডা আর্ডার্ন', 
    x: -2, 
    y: -1, 
    country: '🇳🇿',
    countryName: 'New Zealand',
    countryNameBn: 'নিউজিল্যান্ড'
  },
  { 
    name: 'Mark Rutte', 
    nameBn: 'মার্ক রুট', 
    x: 2, 
    y: 0, 
    country: '🇳🇱',
    countryName: 'Netherlands',
    countryNameBn: 'নেদারল্যান্ডস'
  },
  { 
    name: 'Leo Varadkar', 
    nameBn: 'লিও ভারাদকার', 
    x: 1, 
    y: -1, 
    country: '🇮🇪',
    countryName: 'Ireland',
    countryNameBn: 'আয়ারল্যান্ড'
  },
  { 
    name: 'Pedro Sánchez', 
    nameBn: 'পেদ্রো সানচেজ', 
    x: -2, 
    y: 0, 
    country: '🇪🇸',
    countryName: 'Spain',
    countryNameBn: 'স্পেন'
  },
  { 
    name: 'António Costa', 
    nameBn: 'আন্তোনিও কোস্তা', 
    x: -2, 
    y: 0, 
    country: '🇵🇹',
    countryName: 'Portugal',
    countryNameBn: 'পর্তুগাল'
  },
  { 
    name: 'Alexander De Croo', 
    nameBn: 'আলেকজান্ডার ডি ক্রু', 
    x: 1, 
    y: -1, 
    country: '🇧🇪',
    countryName: 'Belgium',
    countryNameBn: 'বেলজিয়াম'
  },
  { 
    name: 'Jonas Gahr Støre', 
    nameBn: 'ইউনাস গার স্ট্যরে', 
    x: -2, 
    y: -1, 
    country: '🇳🇴',
    countryName: 'Norway',
    countryNameBn: 'নরওয়ে'
  },
  { 
    name: 'Ulf Kristersson', 
    nameBn: 'উলফ ক্রিস্টারসন', 
    x: 2, 
    y: 0, 
    country: '🇸🇪',
    countryName: 'Sweden',
    countryNameBn: 'সুইডেন'
  },
  { 
    name: 'Mette Frederiksen', 
    nameBn: 'মেটে ফ্রেডেরিকসেন', 
    x: -1, 
    y: 1, 
    country: '🇩🇰',
    countryName: 'Denmark',
    countryNameBn: 'ডেনমার্ক'
  },
  { 
    name: 'Sanna Marin', 
    nameBn: 'সান্না মারিন', 
    x: -3, 
    y: -2, 
    country: '🇫🇮',
    countryName: 'Finland',
    countryNameBn: 'ফিনল্যান্ড'
  }
];
