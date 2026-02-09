import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { 
  FaShieldAlt, FaTools, FaLightbulb, FaUsers, FaBaby, FaTint, 
  FaRoad, FaHandshake, FaQuoteLeft, FaChevronDown, FaFistRaised,
  FaGraduationCap, FaBalanceScale, FaHeart, FaArrowRight
} from 'react-icons/fa';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import './Tarek.css';

const promises = [
  {
    id: 1,
    icon: FaShieldAlt,
    title: 'নিরাপদ ঢাকা ১২',
    subtitle: 'Safe Dhaka 12',
    color: '#3b82f6',
    description: 'ঢাকা ১২ অঞ্চলটি শিল্প এলাকা হওয়ায় এখানে বহু নাগরিকের কর্মসংস্থান হয়েছে। এই অঞ্চলে রাজনৈতিক অস্থিরতা ও পেশিশক্তির দাপটে এক প্রকার উত্তেজনা বিরাজ করে। আমি ঢাকা ১২ অঞ্চলে এই অস্থিরতা ও প্রতিহিংসা কমিয়ে একটি নিরাপদ কর্মক্ষেত্র তৈরি করতে চাই।',
    points: ['রাজনৈতিক স্থিতিশীলতা', 'নিরাপদ কর্মপরিবেশ', 'নারী ও শিশুদের নিরাপত্তা']
  },
  {
    id: 2,
    icon: FaTools,
    title: 'কারিগরি দক্ষতা উন্নয়ন',
    subtitle: 'Technical Skill Development',
    color: '#10b981',
    description: 'কারিগরি দক্ষতার উন্নয়ন মানেই সহজ উৎপাদন ও অধিক আয়। দক্ষতা থাকলে কেউ অসহায় থাকে না। আমি এই অঞ্চলের নাগরিকদের যথাযথ কর্মমুখী প্রশিক্ষণ ও স্কিল ডেভেলপমেন্টে সর্বোচ্চ গুরুত্ব দেব।',
    points: ['স্কিল ডেভেলপমেন্ট প্রোগ্রাম', 'শিল্পকারখানার সাথে সমন্বয়', 'কর্মসংস্থান সৃষ্টি']
  },
  {
    id: 3,
    icon: FaLightbulb,
    title: 'স্থানীয় উদ্যোগ শক্তিশালীকরণ',
    subtitle: 'Empowering Local Initiatives',
    color: '#f59e0b',
    description: 'ঢাকা ১২ অঞ্চলে শিল্পকারখানার আধিক্য রয়েছে। এই শিল্পকে যথাযথভাবে কাজে লাগাতে পারলে নাগরিকদের অভাব দূর হবে। আমি স্থানীয় উদ্ভাবনকে শক্তিশালী করে তথ্যপ্রযুক্তি ও সেবা খাতে ব্যাপক পরিবর্তন সাধন করব।',
    points: ['ক্ষুদ্র ও মাঝারি শিল্প উন্নয়ন', 'তথ্যপ্রযুক্তি সম্প্রসারণ', 'তরুণ উদ্যোক্তা তৈরি']
  },
  {
    id: 4,
    icon: FaUsers,
    title: 'জনমতভিত্তিক গণতন্ত্র',
    subtitle: 'Democratic Governance',
    color: '#8b5cf6',
    description: 'অঞ্চলে স্থিতিশীলতা ও শান্তি প্রতিষ্ঠায় আপনাদের মতামতকে গুরুত্ব দেব। জবাবদিহিতা নিশ্চিত করে সুশাসন ও মানবাধিকার রক্ষায় নিবিড়ভাবে কাজ করব। রাজনৈতিক পরিচয়ের ঊর্ধ্বে উঠে একটি প্রতিহিংসামুক্ত মানবিক অঞ্চল গড়ে তুলব।',
    points: ['জবাবদিহিতামূলক শাসন', 'মানবাধিকার সুরক্ষা', 'প্রতিহিংসামুক্ত সমাজ']
  },
  {
    id: 5,
    icon: FaBaby,
    title: 'ডে-কেয়ার ও খেলার মাঠ',
    subtitle: 'Day Care & Playgrounds',
    color: '#ec4899',
    description: 'কর্মজীবী মায়েদের সন্তানদের নিরাপত্তা নিশ্চিতে আমি আধুনিক ডে-কেয়ার সেন্টার গড়ে তুলব। পাশাপাশি শিল্পকারখানাগুলোতে যেন ছোট পরিসরে শিশু যত্ন কেন্দ্র থাকে তার উদ্যোগ নেব। শিশুদের জন্য পর্যাপ্ত খেলার মাঠও নিশ্চিত করা হবে।',
    points: ['ডে-কেয়ার সেন্টার স্থাপন', 'খেলার মাঠ সংস্কার ও উদ্ধার', 'পাবলিক টয়লেট নিশ্চিতকরণ']
  },
  {
    id: 6,
    icon: FaTint,
    title: 'পানি, বিদ্যুৎ ও গ্যাস',
    subtitle: 'Utilities Solution',
    color: '#06b6d4',
    description: 'শিল্পকারখানায় গ্যাস সরবরাহ নিরবচ্ছিন্ন রাখতে উচ্চ সক্ষমতার অল্টারনেটিভ ফুয়েল সেন্টার বা বাল্ক গ্যাস সরবরাহের ব্যবস্থা নিয়ে কাজ করব, যেন লাইনের গ্যাসের সংকটে উৎপাদন ব্যাহত না হয়।',
    points: ['নিরবচ্ছিন্ন গ্যাস ও বিদ্যুৎ', 'বিশুদ্ধ পানি সরবরাহ', 'বর্জ্য ব্যবস্থাপনা']
  },
  {
    id: 7,
    icon: FaRoad,
    title: 'আধুনিক যোগাযোগ ব্যবস্থা',
    subtitle: 'Modern Transportation',
    color: '#84cc16',
    description: 'অব্যবস্থাপনা ও রক্ষণাবেক্ষণের অভাবে এই আসনের রাস্তাঘাট চলাচলের অনুপযোগী হয়ে পড়েছে। আমি পানি নিষ্কাশন ব্যবস্থার আধুনিকীকরণের পাশাপাশি রাস্তাঘাট সংস্কার ও প্রশস্ত করার উদ্যোগ নেব।',
    points: ['রাস্তা সংস্কার ও প্রশস্তকরণ', 'সিসি ক্যামেরা স্থাপন', 'আধুনিক স্ট্রিট লাইট']
  },
  {
    id: 8,
    icon: FaHandshake,
    title: 'নাগরিক অধিকার',
    subtitle: "Citizens' Rights",
    color: '#f43f5e',
    description: 'দেশের অর্থনীতিকে গতিশীল রাখতে ঢাকা ১২ এর নাগরিকদের ভূমিকা অপরিসীম। আমরা এক সাথে সকল অনিয়ম ও অপশাসনের বিরুদ্ধে রুখে দাঁড়াতে চাই। আপনাদের মৌলিক অধিকার নিশ্চিতে আমি সর্বদা পাশে থাকব।',
    points: ['নাগরিক সেবা উন্নয়ন', 'আইনি সহায়তা সেল', 'সামাজিক নিরাপত্তা']
  }
];

const timelineEvents = [
  {
    year: '২০১৮',
    title: 'কোটা সংস্কার আন্দোলনের সূচনা',
    description: 'সাধারণ শিক্ষার্থীদের অধিকার আদায়ে ২১ জানুয়ারি ২০১৮ সালে বৈষম্যমূলক কোটা সংস্কার আন্দোলনের ডাক দেই এবং বাংলাদেশ সাধারণ ছাত্র অধিকার সংরক্ষণ পরিষদ গঠন করি।'
  },
  {
    year: '২০১৮',
    title: 'গণঅভ্যুত্থান ও গ্রেপ্তার',
    description: '৮ এপ্রিল আন্দোলনের তীব্রতায় তৎকালীন প্রধানমন্ত্রী দাবি মেনে নেওয়ার ঘোষণা দেন। পরবর্তীতে আন্দোলন দমনে ১২ জুলাই গুলশান থেকে আমাকে গ্রেপ্তার করা হয়।'
  },
  {
    year: '২০২০',
    title: 'মেজর সিনহা হত্যা ও মোদি বিরোধী আন্দোলন',
    description: 'মেজর সিনহা হত্যার বিচার দাবিতে প্রথম আন্দোলন গড়ে তুলি। পরবর্তীতে মোদি বিরোধী আন্দোলনে নেতৃত্ব দিতে গিয়ে ব্যাপক দমন-পীড়ন ও হামলার শিকার হই।'
  },
  {
    year: '২০২১',
    title: 'হাইকোর্টে রিট পিটিশন',
    description: 'শিক্ষক নিয়োগ ও সরকারি চাকরিতে বৈষম্যমূলক কোটা বাতিলের দাবিতে ১১ জানুয়ারি বিজ্ঞ আইনজীবীর মাধ্যমে উচ্চ আদালতে রিট পিটিশন দায়ের করি।'
  },
  {
    year: '২০২৪',
    title: 'জুলাই গণঅভ্যুত্থান',
    description: '১৮ জুলাই আমার নেতৃত্বে বিক্ষোভ চলাকালে পুলিশ ও বিজিবি হামলা চালায়। আন্দোলনের ছবি ও ভিডিও সামাজিক যোগাযোগ মাধ্যমে ছড়িয়ে পড়লে সারাদেশে বিক্ষোভ দাবানলের মতো ছড়িয়ে পড়ে।'
  },
  {
    year: '২০২৪',
    title: 'কারাগার থেকে মুক্তি ও নতুন পথচলা',
    description: '২০ জুলাই আমাকে পুনরায় গ্রেপ্তার করে অমানুষিক নির্যাতন চালানো হয়। ৪ আগস্ট প্রথম কারামুক্ত হলেও আমার নামে রিমান্ড মঞ্জুর হয়। চূড়ান্ত বিজয়ের পর আমি কারামুক্ত হয়ে নতুন রাষ্ট্র গঠনে কাজ করছি।'
  }
];

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Promise Card Component
const PromiseCard = ({ promise, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="promise-card-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card 
        className="promise-card"
        style={{ '--accent-color': promise.color }}
      >
        <div className="promise-card-glow" style={{ background: `radial-gradient(circle at 50% 0%, ${promise.color}30, transparent 70%)` }} />
        
        <div className="promise-icon-wrapper">
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.6 }}
            className="promise-icon"
            style={{ background: `linear-gradient(135deg, ${promise.color}, ${promise.color}aa)` }}
          >
            <promise.icon />
          </motion.div>
          <div className="promise-number">{String(promise.id).padStart(2, '0')}</div>
        </div>

        <h3 className="promise-title">{promise.title}</h3>
        <p className="promise-subtitle">{promise.subtitle}</p>
        
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="promise-content"
        >
          <p className="promise-description">{promise.description}</p>
          <ul className="promise-points">
            {promise.points.map((point, idx) => (
              <li key={idx}>
                <FaArrowRight className="point-icon" style={{ color: promise.color }} />
                {point}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="promise-hover-hint">
          <span>বিস্তারিত দেখুন</span>
          <FaChevronDown className={`hint-icon ${isHovered ? 'rotated' : ''}`} />
        </div>
      </Card>
    </motion.div>
  );
};

// Timeline Item Component
const TimelineItem = ({ event, index, isLeft }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`timeline-item ${isLeft ? 'left' : 'right'}`}
    >
      <div className="timeline-content">
        <div className="timeline-year">{event.year}</div>
        <h4 className="timeline-title">{event.title}</h4>
        <p className="timeline-description">{event.description}</p>
      </div>
      <div className="timeline-dot">
        <div className="dot-inner" />
      </div>
    </motion.div>
  );
};

function Tarek() {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="tarek-page">
      {/* Progress Bar */}
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />

      {/* Candidate Profile Section */}
      <section className="candidate-profile-section">
        <Container>
          <motion.div 
            className="profile-hero-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="profile-image-container">
              <div className="profile-image-hexagon">
                <img
                  src="/profile-butterfly.jpg"
                  alt="মোঃ তারেক রহমান - প্রজাপতি প্রতীক"
                  onError={e => { e.target.onerror = null; e.target.src = './face/tarek.png'; }}
                />
              </div>
              <div className="butterfly-badge">প্রজাপতি প্রতীক</div>
            </div>

            <div className="profile-info-section">
              <h2 className="profile-name">মোঃ তারেক রহমান</h2>
              <p className="profile-tagline">আমজনতার দল - ঢাকা-১২ আসনের প্রার্থী</p>
              
              <div className="profile-highlights">
                <div className="highlight-card">
                  <div className="highlight-label">পার্টি</div>
                  <div className="highlight-value">আমজনতার দল</div>
                </div>
                <div className="highlight-divider"></div>
                <div className="highlight-card">
                  <div className="highlight-label">আসন</div>
                  <div className="highlight-value">ঢাকা-১২</div>
                </div>
                <div className="highlight-divider"></div>
                <div className="highlight-card">
                  <div className="highlight-label">প্রতীক</div>
                  <div className="highlight-value">প্রজাপতি</div>
                </div>
              </div>

              <div className="profile-description">
                <h3>আমার যাত্রা</h3>
                <p>আমি ২০১৬ সাল পর্যন্ত একজন আইটি ব্যবসায়ী ছিলাম এবং বর্তমানে আমি আম ও মধু ব্যবসার সাথে জড়িত। আমার রাজনৈতিক যাত্রা শুরু হয় ২০১৮ সালে কোটা সংস্কার আন্দোলনের মাধ্যমে। সেই সংগ্রাম থেকে শুরু করে আজ পর্যন্ত আমি গণতান্ত্রিক মূল্যবোধ এবং জনগণের অধিকার আদায়ের জন্য নিরলসভাবে কাজ করে যাচ্ছি।</p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Hero Section */}
      <section className="tarek-hero" ref={heroRef}>
        <motion.div className="hero-background" style={{ y: backgroundY }}>
          <div className="hero-gradient" />
          <div className="hero-pattern" />
        </motion.div>

        <Container>
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="hero-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <FaFistRaised className="badge-icon" />
              <span>ঢাকা ১২ আসন</span>
            </motion.div>

            <h1 className="hero-title">
              <span className="title-line">ঢাকা ১২ কে নিয়ে</span>
              <span className="title-highlight">আমার পরিকল্পনা ও প্রতিশ্রুতি</span>
            </h1>

            <p className="hero-subtitle">
              আমি মোঃ তারেক রহমান। আসন্ন জাতীয় সংসদ নির্বাচন ২০২৬-এ ঢাকা ১২ আসনে আম জনতার দল থেকে প্রার্থী হিসাবে মনোনীত হয়েছি।"
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-value"><AnimatedCounter end={8} /></div>
                <div className="stat-label">মূল প্রতিশ্রুতি</div>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <div className="stat-value"><AnimatedCounter end={12} /></div>
                <div className="stat-label">ঢাকা আসন</div>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <div className="stat-value"><AnimatedCounter end={2026} /></div>
                <div className="stat-label">নির্বাচন</div>
              </div>
            </div>

            <motion.div 
              className="scroll-indicator"
              style={{ opacity }}
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span>স্ক্রল করুন</span>
              <FaChevronDown />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Achievements & Struggles Section */}
      <section className="achievements-struggles-section">
        <Container>
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">আন্দোলন ও সাফল্য</span>
            <h2 className="section-title">মূল আন্দোলন, সাফল্য ও সংগ্রাম</h2>
          </motion.div>
          <Row>
            <Col lg={6}>
              <h4 className="achievements-subtitle">সাফল্য এবং অবদান</h4>
              <ul className="achievements-list">
              <li>২০১৮ সালে কোটা আন্দোলনের নেতৃত্ব দিয়ে আমি ১ম ও ২য় শ্রেণির চাকরিতে কোটা বাতিল করেছি। "ছাত্র অধিকার পরিষদ" প্রতিষ্ঠা (১৪ ফেব্রুয়ারি ২০১৮)।</li>
              <li>বাংলাদেশ ব্যাংকের অধীনে ৮টি ব্যাংকের নিয়োগ পরীক্ষায় জালিয়াতির বিরুদ্ধে আন্দোলন করে আমি পরীক্ষা বাতিল ও পুনরায় পরীক্ষা নিতে বাধ্য করেছি।</li>
              <li>বন্ধ হওয়া পাটকল ও চিনি কল পুনরায় চালু করতে আমি ভূমিকা রেখেছি।</li>
              <li>৩৮৩ জন প্রবাসীর মুক্তি এবং ভিয়েতনামে অপহৃত ৫৬ প্রবাসীকে দেশে ফিরিয়ে আনতে আমি উদ্যোগ নিয়েছি।</li>
              <li>২০২২ ও ২০২৪ সালের বন্যায় প্রায় ১.৫ লাখ মানুষের জন্য খাবারের আয়োজন করেছি।</li>
            </ul>
            </Col>
            <Col lg={6}>
              <h4 className="struggles-subtitle">চ্যালেঞ্জ এবং সংগ্রাম</h4>
              <ul className="struggles-list">
                <li>২০১৮ সালে আমি কোটা আন্দোলনের সময় প্রথম গ্রেপ্তার হই এবং তিন দিনের জন্য গুমের শিকার হই।</li>
                <li>২০২০-২০২১ সালে আমি মোদি বিরোধী আন্দোলনে নেতৃত্ব দিতে গিয়ে ব্যাপক দমন-পীড়ন এবং হামলার সম্মুখীন হই।</li>
                <li>২০২৪ সালের গণ অভ্যুত্থানে আমি রামপুরা এলাকায় গুলিবিদ্ধ হই এবং গ্রেপ্তার হই।</li>
                <li>রাজনৈতিক নির্যাতন সত্ত্বেও আমি গণতান্ত্রিক মূল্যবোধ রক্ষায় সংগ্রাম জারি রাখি।</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Promises Section */}
      <section className="promises-section">
        <Container>
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">আমার প্রতিশ্রুতি</span>
            <h2 className="section-title">৮টি মূল অগ্রাধিকার</h2>
            <p className="section-subtitle">ঢাকা ১২ এর নাগরিকদের জন্য আমার পরিকল্পনা</p>
            <ul className="extra-promises-list">
              <li><strong>নারী ও শিশুদের জন্য:</strong> কর্মজীবী নারীদের বাচ্চাদের জন্য ডে কেয়ার সেন্টার এবং স্কুল-কলেজগামী মেয়েদের নিরাপত্তা নিশ্চিত করা।</li>
              <li><strong>নিরাপত্তা:</strong> মাদক, ছিনতাই ও চাঁদাবাজির বিরুদ্ধে "জিরো টলারেন্স" এবং রাস্তায় সিসি ক্যামেরা ও লাইটের ব্যবস্থা।</li>
              <li><strong>উন্নয়ন:</strong> আধুনিক বর্জ্য ব্যবস্থাপনা, মশা নিধন, সুপেয় পানি ও গ্যাস সমস্যার সমাধান।</li>
              <li><strong>শিক্ষা ও অবকাঠামো:</strong> শিক্ষার মানোন্নয়ন, লাইব্রেরি ও খেলার মাঠ তৈরি এবং স্মার্ট ট্রাফিক সিস্টেম চালু।</li>
              <li><strong>ধর্মীয় ও নৈতিকতা:</strong> মসজিদ, মন্দির, গীর্জা ও এতিমখানার উন্নয়ন এবং নৈতিক সমাজ বিনির্মাণে ধর্মীয় শিক্ষায় বিশেষ বরাদ্দ।</li>
            </ul>
          </motion.div>

          <Row className="promises-grid">
            {promises.map((promise, index) => (
              <Col lg={3} md={4} sm={6} key={promise.id}>
                <PromiseCard promise={promise} index={index} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Background/Journey Section */}
      <section className="journey-section">
        <Container>
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">আমার যাত্রা</span>
            <h2 className="section-title">সংগ্রামের ইতিহাস</h2>
            <p className="section-subtitle">কোটা সংস্কার থেকে জুলাই গণঅভ্যুত্থান</p>
          </motion.div>

          <div className="timeline">
            <div className="timeline-line" />
            {timelineEvents.map((event, index) => (
              <TimelineItem 
                key={index} 
                event={event} 
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section">
        <Container>
          <Row className="achievements-grid">
            <Col md={4}>
              <motion.div 
                className="achievement-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="achievement-icon">
                  <FaGraduationCap />
                </div>
                <h3><AnimatedCounter end={383} />+</h3>
                <p>প্রবাসী ভাইদের আইনি সহায়তা ও মুক্তি</p>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div 
                className="achievement-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="achievement-icon">
                  <FaBalanceScale />
                </div>
                <h3><AnimatedCounter end={16} /></h3>
                <p>গণবিরোধী লিফলেট ও অপপ্রচার রুখে দেওয়া</p>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div 
                className="achievement-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="achievement-icon">
                  <FaFistRaised />
                </div>
                <h3><AnimatedCounter end={56} /></h3>
                <p>অপহৃত ও বন্দীদের অধিকার আদায়ে আন্দোলন</p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container>
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>আসুন একসাথে ঢাকা ১২ কে গড়ে তুলি</h2>
            <p>নির্বাচিত হই বা না হই, ইনশাআল্লাহ আমি এই কাজগুলো বাস্তবায়নে আপনাদের পাশে থাকব!</p>
            <div className="cta-buttons">
              <a href="/vote" className="cta-btn primary">
                <FaFistRaised className="btn-icon" />
                ভোট দিন
              </a>
              <a href="/join" className="cta-btn secondary">
                <FaUsers className="btn-icon" />
                যোগ দিন
              </a>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}

export default Tarek;