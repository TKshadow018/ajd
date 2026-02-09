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


