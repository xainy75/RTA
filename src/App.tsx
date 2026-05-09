import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './components/Logo';
import { CommunityHub } from './components/CommunityHub';
import { GoogleGenAI } from "@google/genai";
import { auth, db, signInWithGoogle, logout, toggleInteraction } from './firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, getDoc, where, limit } from 'firebase/firestore';
import { 
  Settings,
  Wrench, 
  Zap, 
  Bike, 
  Car, 
  Truck, 
  Cpu, 
  ShieldCheck,
  Activity,
  Layers, 
  BarChart3,
  Terminal,
  FileText,
  GraduationCap, 
  Users, 
  Microscope, 
  Factory,
  Trophy,
  ArrowRight,
  ArrowLeft,
  Code,
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Globe,
  Share2,
  Link,
  Filter,
  ChevronDown,
  Star,
  ExternalLink,
  Search,
  MessageSquare,
  Camera,
  Award,
  Sparkles,
  Bot,
  Send,
  User,
  CheckCircle,
  ChevronRight,
  Thermometer,
  Palette,
  PenTool,
  Ruler,
  Box,
  Layout,
  Home,
  HardHat,
  Monitor,
  Flame,
  Droplets,
  Wind,
  Sun
} from 'lucide-react';

// Common industrial styles
const sectionPadding = "py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto";
const headingLg = "text-4xl md:text-6xl font-bold tracking-tight mb-8";
const headingMd = "text-2xl md:text-3xl font-bold mb-6";
const cardBg = "bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300";

const Navbar = ({ onNavigateToCommunity, onNavigateToHome }: { onNavigateToCommunity: () => void; onNavigateToHome: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={onNavigateToHome}>
          <Logo />
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {['Courses', 'Our Portal', 'Virtual Internships', 'Research', 'Projects', 'Community'].map((item) => (
            <a 
              key={item} 
              href={item === 'Community' ? '#' : `#${item.toLowerCase().replace(' ', '-')}`} 
              onClick={(e) => {
                if (item === 'Community') {
                  e.preventDefault();
                  onNavigateToCommunity();
                } else {
                  // If on community page, navigate home first
                  onNavigateToHome();
                }
              }}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
          <a href="#courses" onClick={onNavigateToHome} className="bg-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-orange-500 transition-colors shadow-lg shadow-orange-600/20">
            Enroll Now
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-neutral-900 border-b border-white/10 p-6 absolute w-full"
        >
          <div className="flex flex-col gap-4">
            {['Courses', 'Our Portal', 'Virtual Internships', 'Research', 'Projects', 'Community'].map((item) => (
              <a 
                key={item} 
                href={item === 'Community' ? '#' : `#${item.toLowerCase().replace(' ', '-')}`} 
                onClick={(e) => {
                  setIsMenuOpen(false);
                  if (item === 'Community') {
                    e.preventDefault();
                    onNavigateToCommunity();
                  } else {
                    onNavigateToHome();
                  }
                }}
                className="text-lg font-medium text-neutral-400"
              >
                {item}
              </a>
            ))}
            <a 
              href="#courses" 
              className="bg-orange-600 text-white px-6 py-3 rounded-xl text-lg font-bold text-center"
              onClick={() => {
                setIsMenuOpen(false);
                onNavigateToHome();
              }}
            >
              Enroll Now
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => (
  <section className="relative min-h-screen pt-32 flex flex-col justify-center overflow-hidden bg-neutral-950">
    <div className="absolute inset-0 z-0 opacity-40">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay grayscale grayscale-50" />
    </div>

    <div className={`${sectionPadding} relative z-10 text-center md:text-left`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/10 border border-orange-600/20 text-orange-500 text-xs font-bold uppercase tracking-widest mb-6">
          <Factory className="w-4 h-4" />
          Technical Excellence for Industry
        </div>
        <h1 className={`${headingLg} text-white leading-[1.1]`}>
          Ramzan Technical <br /> 
          <span className="text-orange-600">Academy</span>
        </h1>
        <p className="text-xl text-neutral-400 max-w-2xl mb-10 leading-relaxed">
          Pakistan's premier engineering training hub. From advanced robotics and 
          industrial automation to civil construction and automotive mastery. We build the hands that build the nation.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a href="#courses" className="w-full sm:w-auto bg-white text-neutral-950 px-10 py-5 rounded-2xl text-lg font-bold hover:scale-105 transition-transform flex items-center justify-center gap-3">
            Explore Courses <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#research" className="w-full sm:w-auto border border-white/20 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-white/5 transition-colors text-center">
            Our Research
          </a>
        </div>
      </motion.div>
    </div>

    <div className="mt-20 border-t border-white/5 bg-neutral-950/50 backdrop-blur-sm relative z-10">
      <div className={`${sectionPadding} py-12 flex flex-wrap justify-between gap-8 opacity-60`}>
        {['50+ Specialized Courses', '1200+ Alumni', '98% Job Placement', '20+ Industry Partners'].map((stat) => (
          <span key={stat} className="text-white font-mono text-sm tracking-widest uppercase">{stat}</span>
        ))}
      </div>
    </div>
  </section>
);

const CourseCard = ({ icon: Icon, title, desc, link }: any) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={cardBg}
  >
    <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-orange-600/50 transition-colors">
      <Icon className="text-orange-600 w-8 h-8" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-neutral-400 text-sm leading-relaxed mb-6">
      {desc}
    </p>
    <a href={link} className="text-orange-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
      View Curriculum <ArrowRight className="w-4 h-4" />
    </a>
  </motion.div>
);

const CertificateModal = ({ isOpen, onClose, courseTitle, studentName }: any) => {
  if (!isOpen) return null;

  const date = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const serial = `RTA-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${new Date().getFullYear()}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-950/90 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl bg-white p-8 md:p-16 rounded-sm shadow-2xl relative overflow-hidden"
      >
        {/* Certificate Border */}
        <div className="absolute inset-4 border-2 border-neutral-900 border-double pointer-events-none" />
        <div className="absolute inset-8 border-4 border-neutral-100 pointer-events-none" />
        
        {/* Logos */}
        <div className="flex justify-between items-center mb-12 relative z-10">
          <Logo className="scale-75 origin-left" />
          <div className="text-right">
             <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center ml-auto mb-2">
                <ShieldCheck className="text-neutral-900 w-6 h-6" />
             </div>
             <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">Industrial Excellence</p>
          </div>
        </div>

        {/* Content */}
        <div className="text-center relative z-10">
          <h1 className="font-serif text-5xl text-neutral-900 mb-4 italic">Certificate of Mastery</h1>
          <p className="text-neutral-500 uppercase tracking-[0.3em] text-xs mb-12 font-bold">This is to certify that</p>
          
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-neutral-950 border-b-2 border-neutral-900 inline-block px-8 pb-2">
              {studentName}
            </h2>
          </div>

          <p className="text-neutral-600 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
            Has successfully completed the intensive technical curriculum in <br />
            <span className="font-bold text-neutral-900 underline underline-offset-4">{courseTitle}</span> <br />
            demonstrating exceptional proficiency in mechanical diagnosis, engineering standards, 
            and precision execution as prescribed by the Academy board.
          </p>

          <div className="grid grid-cols-3 gap-8 mt-16 pt-12">
            <div className="text-center">
              <p className="font-signature text-4xl text-neutral-800 mb-[-1.5rem] relative z-20">M Ramzan</p>
              <div className="h-[1px] bg-neutral-300 mb-4" />
              <p className="text-[10px] font-bold uppercase text-neutral-500">Director of Academy</p>
            </div>
            <div className="flex flex-col items-center -mt-8">
               <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center opacity-20 absolute" />
               <Settings className="text-orange-600 w-12 h-12 relative z-10 animate-spin-slow opacity-80" />
               <p className="text-[8px] font-mono mt-4 font-bold text-neutral-400">OFFICIAL SEAL</p>
            </div>
            <div className="text-center">
              <div className="h-[1px] bg-neutral-300 mb-4" />
              <p className="text-[10px] font-bold uppercase text-neutral-500">Industry Evaluator</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-between items-end relative z-10">
          <div>
            <p className="text-[9px] font-mono text-neutral-400">Verification Code: {serial}</p>
            <p className="text-[9px] font-mono text-neutral-400">Date Issued: {date}</p>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 flex gap-4 no-print pointer-events-auto z-[200]">
          <button 
            onClick={() => window.print()}
            className="bg-neutral-900 text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-neutral-700 transition"
          >
            Download PDF / Print
          </button>
          <button 
            onClick={onClose}
            className="bg-neutral-200 text-neutral-900 px-6 py-2 rounded-full text-xs font-bold hover:bg-neutral-300 transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const MyCourses = ({ enrolled, completed, coursesData, setCertCourse, complete }: any) => {
  const allCourses = Object.values(coursesData).flat() as any[];
  const myEnrolledCourses = allCourses.filter(c => enrolled && enrolled.includes(c.id));

  if (enrolled.length === 0) {
    return (
      <section id="our-portal" className="bg-neutral-900 py-24 border-b border-white/5">
        <div className={sectionPadding}>
          <div className="mb-16">
            <span className="text-orange-600 font-mono text-xs tracking-widest uppercase mb-4 block">Student Portal</span>
            <h2 className={headingLg}>My Technical <br /> <span className="text-neutral-500">Journey</span></h2>
          </div>
          <div className="bg-neutral-950/50 border border-white/5 rounded-[32px] p-12 text-center">
            <div className="w-20 h-20 bg-orange-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-orange-600/20">
              <GraduationCap className="text-orange-600 w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Your Portal is Currently Empty</h3>
            <p className="text-neutral-400 max-w-lg mx-auto mb-10 leading-relaxed">
              Start your journey today by enrolling in one of our world-class engineering courses. 
              Track your progress, earn certifications, and master new technical skills.
            </p>
            <a 
              href="#courses" 
              className="inline-flex items-center gap-3 bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-500 transition-colors shadow-lg shadow-orange-600/20"
            >
              Browse Available Courses <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="our-portal" className="bg-neutral-900 py-24 border-b border-white/5">
      <div className={sectionPadding}>
        <div className="mb-16">
          <span className="text-orange-600 font-mono text-xs tracking-widest uppercase mb-4 block">Student Portal</span>
          <h2 className={headingLg}>My Technical <br /> <span className="text-neutral-500">Journey</span></h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myEnrolledCourses.map((course, i) => {
            const isCompleted = completed.includes(course.id);
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${cardBg} bg-neutral-950 border-orange-600/20`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-orange-600/10 rounded-xl flex items-center justify-center border border-orange-600/20">
                    <course.icon className="text-orange-600 w-6 h-6" />
                  </div>
                  {isCompleted ? (
                    <span className="bg-green-600/20 text-green-500 text-[10px] font-bold px-3 py-1 rounded-full border border-green-600/30 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> COMPLETED
                    </span>
                  ) : (
                    <span className="bg-orange-600/20 text-orange-500 text-[10px] font-bold px-3 py-1 rounded-full border border-orange-600/30 flex items-center gap-1">
                      <Wrench className="w-3 h-3 animate-pulse" /> IN PROGRESS
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-4">{course.title}</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    <span>Progress</span>
                    <span>{isCompleted ? '100%' : '65%'}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: isCompleted ? '100%' : '65%' }}
                      className="h-full bg-orange-600"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {isCompleted ? (
                    <button 
                      onClick={() => setCertCourse(course.title)}
                      className="w-full bg-white text-neutral-950 py-3 rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                    >
                      <Trophy className="w-4 h-4" /> View Certificate
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => {
                          complete(course.id);
                          setCertCourse(course.title);
                        }}
                        className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-orange-500 transition-colors"
                      >
                        Complete & Get Certificate
                      </button>
                      <button 
                        className="w-full border border-white/10 text-neutral-400 py-3 rounded-xl font-bold text-sm hover:bg-white/5 transition-colors"
                        onClick={() => {
                          const el = document.getElementById('courses');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Continue Training
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CoursesGrid = ({ enrolled, completed, enroll, complete, setCertCourse, categories, certCourse }: any) => {
  const categoryKeys = Object.keys(categories);
  const [activeTab, setActiveTab] = React.useState(categoryKeys[0] || '');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredByTab = categories[activeTab as keyof typeof categories] || [];
  const filteredCourses = filteredByTab.filter((course: any) => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    course.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.curriculum.some((item: string) => item.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section id="courses" className="bg-neutral-950 text-white relative">
      <div className={sectionPadding}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="text-orange-600 font-mono text-xs tracking-widest uppercase mb-4 block">World-Class Curriculum</span>
            <h2 className={headingLg}>Specialized <br /> <span className="text-neutral-500 italic font-light">Technical Programs</span></h2>
          </div>
          <div className="flex flex-col gap-6 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search courses or modules..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-3 rounded-xl text-sm text-white focus:border-orange-600 outline-none transition-colors"
              />
            </div>
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 self-start overflow-x-auto max-w-full">
              {Object.keys(categories).map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === cat ? 'bg-orange-600 text-white' : 'text-neutral-500 hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, i) => {
            const isEnrolled = enrolled.includes(course.id);
            const isCompleted = completed.includes(course.id);

            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`${cardBg} flex flex-col`}
              >
                <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10">
                  <course.icon className="text-orange-600 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{course.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
                  {course.desc}
                </p>
                
                <div className="border-y border-white/5 py-6 my-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">Core Modules</h4>
                  <div className="space-y-2">
                    {course.curriculum.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs text-neutral-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {!isEnrolled ? (
                    <button 
                      onClick={() => enroll(course.id)}
                      className="w-full bg-white text-neutral-950 py-3 rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform"
                    >
                      Enroll Now
                    </button>
                  ) : !isCompleted ? (
                    <button 
                      onClick={() => {
                        complete(course.id);
                        setCertCourse(course.title);
                      }}
                      className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-orange-500 transition-colors"
                    >
                      Complete & Get Certificate
                    </button>
                  ) : (
                    <button 
                      onClick={() => setCertCourse(course.title)}
                      className="w-full border border-orange-600 text-orange-600 py-3 rounded-xl font-bold text-sm hover:bg-orange-600/10 transition-colors flex items-center justify-center gap-2"
                    >
                      <Trophy className="w-4 h-4" /> View Certificate
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
            <Search className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
            <p className="text-neutral-400 font-mono italic">No courses match your search in this category.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-orange-600 font-bold text-sm hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const InternshipFormModal = ({ isOpen, onClose, type = 'On-site' }: { isOpen: boolean; onClose: () => void; type?: 'Virtual' | 'On-site' }) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [selectedArea, setSelectedArea] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setSelectedArea(type === 'Virtual' ? 'Data Analytics' : 'Mechanical Engineering');
      setIsSubmitted(false);
    }
  }, [type, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-neutral-950/90 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
      >
        {!isSubmitted ? (
          <div className="p-8 md:p-12">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded text-white uppercase tracking-widest ${type === 'Virtual' ? 'bg-blue-600' : 'bg-orange-600'}`}>
                    {type}
                  </span>
                  <h2 className="text-3xl font-bold text-white">Technical Internship</h2>
                </div>
                <p className="text-neutral-500 text-sm">Join the elite ranks of our industry partners.</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-neutral-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-orange-500">Full Name</label>
                  <input required type="text" placeholder="e.g. Hammad Ramzan" className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white placeholder:text-neutral-700 focus:border-orange-600 outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-orange-500">Contact Email</label>
                  <input required type="email" placeholder="hammad@example.com" className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white placeholder:text-neutral-700 focus:border-orange-600 outline-none transition-colors" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-orange-500">Desired Area</label>
                  <select 
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white outline-none focus:border-orange-600 appearance-none"
                  >
                    {type === 'Virtual' ? (
                      <>
                        <option className="bg-neutral-900">Data Analytics</option>
                        <option className="bg-neutral-900">CAD Modeling</option>
                        <option className="bg-neutral-900">Automation Scripting</option>
                        <option className="bg-neutral-900">Technical Content Writing</option>
                      </>
                    ) : (
                      <>
                        <option className="bg-neutral-900">Mechanical Engineering</option>
                        <option className="bg-neutral-900">Electrical Engineering</option>
                        <option className="bg-neutral-900">Civil Engineering</option>
                        <option className="bg-neutral-900">CAD & Design</option>
                        <option className="bg-neutral-900">Automotive Tech</option>
                        <option className="bg-neutral-900">Safety & HSE</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-orange-500">Phone Number</label>
                  <input required type="tel" placeholder="+92 XXX XXXXXXX" className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white placeholder:text-neutral-700 focus:border-orange-600 outline-none transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-orange-500">Academic Background / Resume</label>
                <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-orange-600/50 transition-colors cursor-pointer group">
                  <Layers className="w-8 h-8 text-neutral-600 mx-auto mb-4 group-hover:text-orange-600 transition-colors" />
                  <p className="text-neutral-400 text-sm mb-1">Click to upload your technical CV</p>
                  <p className="text-[10px] text-neutral-600 uppercase">PDF or DOC (Max 5MB)</p>
                </div>
              </div>

              <button type="submit" className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-500 transition-colors flex items-center justify-center gap-3 shadow-lg shadow-orange-600/20">
                Apply for {type} Internship <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        ) : (
          <div className="p-16 text-center">
            <div className="w-20 h-20 bg-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Trophy className="text-orange-600 w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Application Received!</h2>
            <p className="text-neutral-400 mb-8 max-w-md mx-auto">
              Thank you for applying to our <span className="text-orange-500 font-bold">{selectedArea}</span> program. 
              Our industry placement team will review your technical background and contact you within <span className="text-white font-bold">2-3 business days</span> regarding your {type.toLowerCase()} internship.
            </p>
            <button onClick={onClose} className="bg-white text-neutral-950 px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
              Back to Portal
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const ResearchSection = ({ user, onOpenUpload }: { user: FirebaseUser | null; onOpenUpload: () => void }) => {
  const [initiatives, setInitiatives] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [userInteractions, setUserInteractions] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const q = query(collection(db, 'research_projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInitiatives(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    if (!user) {
      setUserInteractions({});
      return;
    }

    // This is a bit inefficient for many projects, but fine for a demo/small app
    // Ideally we'd fetch interactions per project visible
    const fetchInteractions = async () => {
      const interactions: Record<string, string> = {};
      for (const project of initiatives) {
        const interRef = doc(db, 'research_projects', project.id, 'interactions', user.uid);
        const interDoc = await getDoc(interRef);
        if (interDoc.exists()) {
          interactions[project.id] = interDoc.data().type;
        }
      }
      setUserInteractions(interactions);
    };

    if (initiatives.length > 0) fetchInteractions();
  }, [user, initiatives.length]);

  const handleInteraction = async (projectId: string, type: 'like' | 'promote') => {
    if (!user) {
      signInWithGoogle();
      return;
    }
    await toggleInteraction(projectId, user.uid, type);
  };

  return (
    <section id="research" className="bg-neutral-900 overflow-hidden relative border-y border-white/5">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-600 rounded-full blur-[150px] -mr-96 -mt-96" />
      </div>

      <div className={sectionPadding}>
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <span className="text-orange-600 font-mono text-xs tracking-widest uppercase mb-4 block">Scientific Progress</span>
            <h2 className={headingLg}>Research & <br /> <span className="text-neutral-500">Innovation</span></h2>
            <p className="text-neutral-400 text-lg mb-12">
              At RTA, we don't just teach technology—we invent it. Our labs are hubs for industrial 
              evolution, where students and professors collaborate on the future of mechanics.
            </p>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-orange-600/50 transition-all duration-300"
            >
              <Microscope className="text-orange-600 w-10 h-10 mb-6" />
              <h4 className="text-white font-bold mb-2">Publish your Research</h4>
              <p className="text-neutral-500 text-sm mb-6">Open-source your engineering breakthroughs and get peer reviews from global experts.</p>
              <button 
                onClick={onOpenUpload}
                className="w-full py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-500 transition-colors flex items-center justify-center gap-2"
              >
                Upload Publication <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6 relative z-10">
            {loading ? (
              <div className="col-span-full flex items-center justify-center py-20">
                <Settings className="w-10 h-10 text-orange-600 animate-spin" />
              </div>
            ) : initiatives.map((item, i) => (
              <motion.div 
                key={item.id || i}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`${cardBg} bg-neutral-950/50 group hover:border-orange-600/50`}
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 px-3 py-1 bg-orange-600/10 rounded-full border border-orange-600/20">
                    {item.tag || item.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleInteraction(item.id, 'like')}
                      className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${userInteractions[item.id] === 'like' ? 'text-orange-500' : 'text-neutral-500 hover:text-white'}`}
                    >
                      <Star className={`w-4 h-4 ${userInteractions[item.id] === 'like' ? 'fill-orange-500' : ''}`} />
                      {item.likesCount || 0}
                    </button>
                    <button 
                      onClick={() => handleInteraction(item.id, 'promote')}
                      className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${userInteractions[item.id] === 'promote' ? 'text-blue-500' : 'text-neutral-500 hover:text-white'}`}
                    >
                      <Sparkles className={`w-4 h-4 ${userInteractions[item.id] === 'promote' ? 'fill-blue-500' : ''}`} />
                      {item.promotesCount || 0}
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.area || item.title}</h3>
                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-4 h-4 text-neutral-500" />
                  <span className="text-xs text-neutral-400">Lead: <span className="text-white">{item.professor || item.studentName}</span></span>
                </div>
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Key Insights</h4>
                  <p className="text-neutral-400 text-sm leading-relaxed italic line-clamp-3">
                    "{item.findings || item.description}"
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-xs text-orange-500 font-bold flex items-center gap-2">
                    View Publication <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const VirtualInternshipsSection = ({ onApply }: { onApply: () => void }) => {
  const tracks = [
    {
      title: "Data Analytics",
      icon: BarChart3,
      desc: "Analyze real-world industrial datasets to optimize production workflows and predict component lifespan using Python and R.",
      skills: ["PowerBI", "SQL", "Predictive Modeling"]
    },
    {
      title: "CAD Modeling",
      icon: Layers,
      desc: "Develop advanced 3D components and assemblies for automotive prototypes. Master industry-standard software from your remote workstation.",
      skills: ["SolidWorks", "AutoCAD", "Rendering"]
    },
    {
      title: "Automation Scripting",
      icon: Terminal,
      desc: "Design and test PLC logic and Python automation scripts for virtual factory floor simulations and IoT integration.",
      skills: ["PLC Programming", "Python", "MQTT"]
    },
    {
      title: "Technical Content Writing",
      icon: FileText,
      desc: "Document complex engineering processes, research discoveries, and technical manuals for international machine standards.",
      skills: ["ISO Standards", "Whitepapers", "Documentation"]
    }
  ];

  return (
    <section id="virtual-internships" className="bg-neutral-900 py-24 border-b border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-600/5 blur-[120px] pointer-events-none" />
      
      <div className={sectionPadding}>
        <div className="max-w-3xl mb-16">
          <span className="text-orange-600 font-mono text-xs tracking-widest uppercase mb-4 block">Remote Excellence</span>
          <h2 className={headingLg}>Virtual Engineering <br /> <span className="text-neutral-500">Internship Programs</span></h2>
          <p className="text-neutral-400 mt-6 text-lg">
            Bridge the gap between theory and industry without leaving your desk. Our virtual placements offer rigorous, outcome-based project work mentored by senior RTA engineers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tracks.map((track, idx) => (
            <motion.div 
              key={track.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-neutral-950/50 border border-white/5 p-8 rounded-3xl hover:border-orange-600/30 transition-all group"
            >
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 grow group-hover:bg-orange-600 transition-colors">
                <track.icon className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{track.title}</h3>
              <p className="text-neutral-500 text-sm mb-6 leading-relaxed">
                {track.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {track.skills.map(skill => (
                  <span key={skill} className="text-[9px] font-bold uppercase tracking-widest bg-white/5 text-neutral-400 px-2.5 py-1 rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-orange-600 rounded-[40px] p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to accelerate your career?</h3>
            <p className="text-orange-100/80 max-w-lg mb-0 text-lg">
              Applications for the Summer 2024 Remote Cohort are now open. Reserve your spot in the industry-leader network.
            </p>
          </div>
          <button 
            onClick={onApply}
            className="relative z-10 bg-white text-orange-600 px-10 py-5 rounded-2xl text-lg font-bold hover:scale-105 transition-transform flex items-center gap-3 shadow-2xl shadow-black/20 shrink-0"
          >
            Apply Now <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
        </div>
      </div>
    </section>
  );
};

const CommunitySection = ({ onApply, user, onOpenUpload, onNavigateToCommunity }: { onApply: (type: 'Virtual' | 'On-site') => void; user: FirebaseUser | null; onOpenUpload: () => void; onNavigateToCommunity: () => void }) => {
  return (
    <section id="community" className="bg-neutral-950 overflow-hidden py-24">
      <div className={sectionPadding}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-orange-600/10 rounded-full blur-[100px]" />
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="space-y-4 pt-12">
                <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop" className="rounded-3xl hover:scale-105 transition-transform duration-500" alt="Student project" />
                <div className="bg-neutral-900 border border-white/10 p-6 rounded-3xl">
                  <Users className="text-orange-600 mb-4" />
                  <h4 className="text-white font-bold mb-2">Researcher Access</h4>
                  <p className="text-neutral-500 text-xs">Direct links to labs and industry journals.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-orange-600 p-8 rounded-3xl text-white">
                  <Trophy className="mb-4 w-8 h-8" />
                  <h3 className="text-2xl font-bold mb-2">98%</h3>
                  <p className="opacity-80 text-sm">Industrial Placement Rate for our grads.</p>
                </div>
                <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop" className="rounded-3xl hover:scale-105 transition-transform duration-500" alt="Workshop" />
              </div>
            </div>
          </div>

          <div>
            <span className="text-orange-600 font-mono text-xs tracking-widest uppercase mb-4 block">The Connection Hub</span>
            <h2 className={headingLg}>Bridging <br /> <span className="text-neutral-500">Talent & Industry</span></h2>
            <p className="text-neutral-400 text-lg mb-10 leading-relaxed">
              RTA is more than an academy. We are a nexus for students, professors, and industry 
              titans. Our platform facilitates deep research, internships with top automotive brands, 
              and a global network of mechanical excellence.
            </p>

            <div className="space-y-6 mb-12">
              {[
                { 
                  icon: Globe, 
                  title: "Virtual Internship Program", 
                  text: "Remote placements in data analysis, CAD design, and automation simulation.",
                  action: () => onApply('Virtual')
                },
                { 
                  icon: GraduationCap, 
                  title: "Technical Apprenticeship", 
                  text: "On-site placement with leading local manufacturers and engineering shops.",
                  action: () => onApply('On-site')
                },
                { 
                  icon: Sparkles, 
                  title: "Project Showcase Contribution", 
                  text: "Upload your latest technical breakthroughs for the world to see.",
                  action: onOpenUpload
                },
                { 
                  icon: Microscope, 
                  title: "Advanced Research Portal", 
                  text: "Access to high-end diagnostic data for professors and researchers." 
                },
                { 
                  icon: Wrench, 
                  title: "Showcase Your Excellence", 
                  text: "Upload your project and get discovered by our global network of experts.",
                  action: onOpenUpload
                },
                { 
                  icon: Factory, 
                  title: "Industry Collaboration", 
                  text: "Partnerships that drive the technical standards of tomorrow." 
                }
              ].map((item, i) => (
                <div 
                  key={i} 
                  onClick={item.action}
                  className={`flex gap-6 group ${item.action ? 'cursor-pointer' : ''}`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-orange-600 transition-colors">
                    <item.icon className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-bold mb-1 group-hover:text-orange-500 transition-colors">{item.title}</h3>
                      {item.title === "Showcase Your Excellence" && (
                        <span className="bg-blue-600 text-[8px] font-black px-1.5 py-0.5 rounded text-white uppercase tracking-widest">Student Exclusive</span>
                      )}
                    </div>
                    <p className="text-neutral-500 text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={onNavigateToCommunity}
              className="w-full bg-white text-neutral-950 px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-xl shadow-white/5"
            >
              Enter Community Discussion <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectUploadModal = ({ isOpen, onClose, onUpload, user, initialIsResearch = false }: { isOpen: boolean; onClose: () => void; onUpload: (p: any) => void; user: FirebaseUser | null; initialIsResearch?: boolean }) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [dragActive, setDragActive] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  // Form state
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('Mechanical');
  const [desc, setDesc] = React.useState('');
  const [image, setImage] = React.useState('');
  const [isResearch, setIsResearch] = React.useState(initialIsResearch);

  React.useEffect(() => {
    if (isOpen) {
      setIsResearch(initialIsResearch);
      setIsSubmitted(false);
      setError(null);
    }
  }, [isOpen, initialIsResearch]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      signInWithGoogle();
      return;
    }
    
    setIsUploading(true);
    try {
      if (isResearch) {
        // Save to Firestore research_projects
        await addDoc(collection(db, 'research_projects'), {
          title,
          description: desc,
          studentName: user.displayName || 'Anonymous Student',
          studentUid: user.uid,
          imageUrl: image || 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop',
          category,
          likesCount: 0,
          promotesCount: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      } else {
        // Mock upload for standard projects (as per original logic)
        const newProject = {
          id: Date.now(),
          title,
          category,
          desc,
          date: new Date().toISOString().split('T')[0],
          displayDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          achievement: Math.floor(Math.random() * 15) + 85,
          img: image || 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop',
          student: user.displayName || 'Student'
        };
        onUpload(newProject);
      }
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Failed to upload project. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-neutral-950/90 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
      >
        {!isSubmitted ? (
          <div className="p-8 md:p-12 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Showcase Your Project</h2>
                <p className="text-neutral-500 text-sm">Upload your technical masterpiece to the RTA excellence feed.</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-neutral-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex items-center gap-4 p-4 bg-orange-600/5 border border-orange-600/10 rounded-2xl">
                <div className="flex-1">
                  <h4 className="text-white text-sm font-bold">Research Project?</h4>
                  <p className="text-neutral-500 text-xs">Research projects appear in the Innovation section with voting enabled.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setIsResearch(!isResearch)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${isResearch ? 'bg-orange-600' : 'bg-neutral-800'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isResearch ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-orange-500">Project Title</label>
                  <input 
                    required 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Quad-Copter PID Tuning" 
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white placeholder:text-neutral-700 focus:border-orange-600 outline-none transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-orange-500">Industry Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white outline-none focus:border-orange-600 appearance-none"
                  >
                    <option value="Mechanical" className="bg-neutral-900">Mechanical</option>
                    <option value="Electrical" className="bg-neutral-900">Electrical</option>
                    <option value="Civil" className="bg-neutral-900">Civil</option>
                    <option value="Automotive" className="bg-neutral-900">Automotive</option>
                    <option value="Automation" className="bg-neutral-900">Automation</option>
                    <option value="Safety" className="bg-neutral-900">Safety</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-orange-500">Technical Description</label>
                <textarea 
                  required 
                  rows={3} 
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Explain the project scope, technologies used, and the problem it solves..." 
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white outline-none focus:border-orange-600 transition-colors resize-none" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-orange-500">Project Media (Cover Image URL)</label>
                <input 
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white outline-none focus:border-orange-600 transition-colors"
                  placeholder="Paste an Unsplash URL for best results..."
                />
              </div>

              {error && <p className="text-orange-500 text-xs font-bold">{error}</p>}

              <button 
                type="submit" 
                disabled={isUploading}
                className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-500 transition-colors flex items-center justify-center gap-3 shadow-lg shadow-orange-600/20 disabled:opacity-50"
              >
                {isUploading ? <Settings className="animate-spin w-5 h-5" /> : (
                  <>Submit Project for Review <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-16 text-center">
            <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Sparkles className="text-green-500 w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Project Submitted!</h2>
            <p className="text-neutral-400 mb-8 max-w-sm mx-auto">
              Brilliant work! Your {isResearch ? 'research' : 'project'} has been successfully uploaded.
            </p>
            <button onClick={onClose} className="bg-white text-neutral-950 px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
              Return to Community
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const GlobalPartnerships = () => (
  <section id="partnerships" className="bg-neutral-900 border-y border-white/5">
    <div className={sectionPadding}>
      <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-8 md:p-16 rounded-[40px] border border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -mr-48 -mt-48 group-hover:bg-blue-600/20 transition-colors duration-700" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3">
            <div className="p-8 bg-white rounded-3xl flex items-center justify-center">
              <PenTool className="w-full h-32 text-neutral-900" />
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <div className="inline-flex px-4 py-1 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
              Sustainable Excellence
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Aspirations rooted in <br /> <span className="text-blue-500">Global Engineering Standards</span>
            </h2>
            <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
              RTA CAD Academy mirrors the rigor and standards of international engineering practices. 
              Our graduates are prepared to meet the exact requirements of global architecture firms, 
              manufacturing plants, and infrastructure projects.
            </p>
            <button className="flex items-center gap-3 text-white font-bold border-b-2 border-orange-600 pb-2 hover:gap-5 transition-all">
              Learn about our Drawing Standards <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProjectDetailsModal = ({ isOpen, onClose, project, onViewProfile }: { isOpen: boolean; onClose: () => void; project: any; onViewProfile?: (uid: string) => void }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/95 backdrop-blur-2xl"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-6xl bg-neutral-900 rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-y-auto max-h-[90vh]"
      >
        {/* Progress bar at the top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${project.achievement}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-orange-600"
          />
        </div>

        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-20 w-12 h-12 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-orange-600 hover:scale-110 transition-all border border-white/10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid lg:grid-cols-2 h-full">
          {/* Image Side */}
          <div className="relative h-[400px] lg:h-auto overflow-hidden">
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              src={project.img} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent lg:bg-gradient-to-r lg:from-neutral-900/80 lg:to-transparent" />
            
            <div className="absolute bottom-12 left-12 right-12">
               <div className="inline-flex items-center gap-3 bg-orange-600 text-white px-6 py-3 rounded-2xl text-sm font-black tracking-widest shadow-2xl shadow-orange-600/30">
                <Trophy className="w-5 h-5 fill-white" />
                {project.achievement}% EXCELLENCE RATING
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="p-8 md:p-16 lg:p-20 bg-neutral-900/50 backdrop-blur-md">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-3 py-1 bg-orange-600/10 border border-orange-600/20 rounded-lg">
                <Layers className="w-3 h-3 text-orange-500" />
                <span className="text-[10px] text-orange-500 font-mono font-black tracking-[0.2em] uppercase">
                  {project.category}
                </span>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <Search className="w-3 h-3 text-neutral-500" />
                <span className="text-[10px] text-neutral-500 font-mono font-bold tracking-widest uppercase">{project.displayDate}</span>
              </div>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-[0.95]">
              {project.title}
            </h2>

            <div className="flex items-center gap-6 mb-12 p-6 bg-white/[0.02] rounded-[2rem] border border-white/5 group/owner">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-800 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-orange-600/20 rotate-3 transition-transform group-hover/owner:rotate-0">
                  {project.student?.charAt(0) || 'S'}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-neutral-900 rounded-full" />
              </div>
              <div 
                className={`flex-1 ${onViewProfile ? 'cursor-pointer' : ''}`}
                onClick={() => {
                  if (onViewProfile) {
                    onViewProfile(project.studentUid || project.student || 'anonymous');
                    onClose();
                  }
                }}
              >
                <p className="text-neutral-500 text-[10px] uppercase tracking-[0.3em] font-black mb-1">Project Lead</p>
                <h4 className="text-white text-xl font-bold group-hover/owner:text-orange-500 transition-colors">
                  {project.student || project.studentName || 'Distinguished Graduate'}
                </h4>
              </div>
              {onViewProfile && (
                <button 
                  onClick={() => {
                    onViewProfile(project.studentUid || project.student || 'anonymous');
                    onClose();
                  }}
                  className="flex items-center gap-3 text-orange-500 hover:text-white transition-colors group/btn"
                >
                  <span className="text-xs font-black tracking-widest uppercase">View Profile</span>
                  <div className="w-8 h-8 rounded-full border border-orange-500/30 flex items-center justify-center group-hover/btn:bg-orange-600 group-hover/btn:border-orange-600 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              )}
            </div>

            <div className="space-y-10">
              <div>
                <h4 className="flex items-center gap-2 text-white text-sm font-black tracking-[0.2em] uppercase mb-4">
                  <Activity className="w-4 h-4 text-orange-600" />
                  Engineering Insight
                </h4>
                <p className="text-neutral-400 text-xl leading-relaxed font-medium italic">
                  "{project.desc}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-10 border-t border-white/5">
                <div>
                  <h4 className="text-neutral-500 text-[10px] font-black tracking-widest uppercase mb-4 text-center lg:text-left">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {['PLC Systems', 'AutoCAD', 'Python'].map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-white/5 text-white text-[10px] font-bold rounded-lg border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-neutral-500 text-[10px] font-black tracking-widest uppercase mb-4 text-center lg:text-left">Industry standard</h4>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {['ISO 9001', 'IEC 61131'].map(std => (
                      <span key={std} className="px-3 py-1.5 bg-orange-600/10 text-orange-500 text-[10px] font-bold rounded-lg border border-orange-600/20">
                        {std}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-10">
                <button className="group/inquiry relative w-full h-16 bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-orange-600/20 transition-all active:scale-[0.98]">
                  <div className="absolute inset-0 bg-neutral-950 translate-y-full group-hover/inquiry:translate-y-0 transition-transform duration-500" />
                  <div className="relative h-full flex items-center justify-center gap-4">
                    <span className="text-neutral-950 font-black text-sm uppercase tracking-widest group-hover:text-white transition-colors duration-500">
                      Inquire About This Research
                    </span>
                    <ArrowRight className="w-5 h-5 text-neutral-950 group-hover:text-white transition-colors duration-500 group-hover:translate-x-2 transition-transform" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProjectsShowcase = ({ projects, onViewProfile }: { projects: any[]; onViewProfile?: (uid: string) => void }) => {
  const [filter, setFilter] = React.useState('All');
  const [sortBy, setSortBy] = React.useState('Newest');
  const [selectedProject, setSelectedProject] = React.useState<any>(null);

  const filteredProjects = projects
    .filter(p => p && (filter === 'All' || p.category === filter))
    .sort((a, b) => {
      if (sortBy === 'Newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'Oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === 'Achievements') return b.achievement - a.achievement;
      return 0;
    });

  return (
    <section id="projects" className="bg-neutral-950 py-24">
      <div className={sectionPadding}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl">
            <span className="text-orange-600 font-mono text-xs tracking-widest uppercase mb-4 block">Student Excellence</span>
            <h2 className={headingLg}>Innovative <br /> <span className="text-neutral-500 underline decoration-orange-600 underline-offset-8 decoration-4">Project Showcase</span></h2>
            <p className="text-neutral-400 text-lg">
              Celebrating the breakthroughs and master-craftsmanship of our students. 
              Real-world problems met with engineering solutions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-center">
            {/* Filter Buttons */}
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto max-w-full">
              {['All', 'Mechanical', 'Electrical', 'Civil', 'Automotive', 'Automation', 'Safety'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${filter === cat ? 'bg-orange-600 text-white' : 'text-neutral-500 hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Selection */}
            <div className="relative group min-w-[160px]">
              <div className="flex items-center justify-between bg-white/5 border border-white/10 px-4 py-2 rounded-xl cursor-default text-xs font-bold text-white">
                <div className="flex items-center gap-2">
                  <Filter className="w-3 h-3 text-orange-600" />
                  Sort: {sortBy}
                </div>
                <ChevronDown className="w-3 h-3 text-neutral-500" />
              </div>
              <div className="absolute top-full right-0 mt-2 w-full bg-neutral-900 border border-white/10 rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 shadow-2xl">
                {['Newest', 'Oldest', 'Achievements'].map(option => (
                  <button
                    key={option}
                    onClick={() => setSortBy(option)}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-neutral-400 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((proj) => (
            <motion.div 
              layout
              key={proj.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => setSelectedProject(proj)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 border border-white/5 group-hover:border-orange-600/50 transition-all duration-300">
                <img src={proj.img} alt={proj.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                
                {/* Achievement Badge */}
                <div className="absolute top-6 right-6 bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest flex items-center gap-1 shadow-lg shadow-orange-600/20">
                  <Star className="w-3 h-3 fill-white" />
                  {proj.achievement}%
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] text-orange-500 font-mono font-bold tracking-tighter uppercase px-2 py-0.5 bg-orange-600/10 border border-orange-600/20 rounded">
                      {proj.category}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">{proj.displayDate}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-600 transition-colors leading-tight">{proj.title}</h3>
                </div>

                {/* Share Options - Visible on Hover */}
                <div className="absolute top-6 left-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const text = `Check out this project: ${proj.title} at Ramzan Technical Academy!`;
                      const url = window.location.href;
                      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                    }}
                    className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                    title="Share on Twitter"
                  >
                    <Share2 className="w-4 h-4 rotate-90" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const url = window.location.href;
                      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                    }}
                    className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                    title="Share on LinkedIn"
                  >
                    <Share2 className="w-4 h-4 -rotate-90" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(window.location.href);
                    }}
                    className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                    title="Copy Link"
                  >
                    <Link className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-500 font-mono italic">No projects found in this category.</p>
          </div>
        )}

        <AnimatePresence>
          <ProjectDetailsModal 
            isOpen={!!selectedProject} 
            onClose={() => setSelectedProject(null)} 
            project={selectedProject} 
            onViewProfile={onViewProfile}
          />
        </AnimatePresence>
        
        <div className="mt-16 text-center">
          <button className="px-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors">
            View All Student Achievements
          </button>
        </div>
      </div>
    </section>
  );
};

const FeedbackModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [type, setType] = React.useState('Suggestion');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-neutral-950/95 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-neutral-900 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
      >
        {!isSubmitted ? (
          <div className="p-8 md:p-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">RTA Feedback Portal</h2>
                <p className="text-neutral-500 text-sm">Help us improve the technical experience.</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-neutral-400 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
              <div className="flex gap-4 p-1 bg-white/5 rounded-xl border border-white/10">
                {['Suggestion', 'Issue'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setType(opt)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${type === opt ? 'bg-orange-600 text-white' : 'text-neutral-500 hover:text-white'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Subject</label>
                <input required type="text" placeholder="e.g. Navigation issue in Marine course" className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white outline-none focus:border-orange-600 transition-colors" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Details</label>
                <textarea required rows={4} placeholder="Describe your suggestion or issue in detail..." className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white outline-none focus:border-orange-600 transition-colors resize-none" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Attach Screenshot (Optional)</label>
                <div className="border border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/5 cursor-pointer transition-colors group">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-neutral-500 group-hover:text-orange-600 transition-colors">
                    <Camera className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-neutral-500">Click or drag image to upload</span>
                </div>
              </div>

              <button type="submit" className="w-full bg-white text-neutral-950 py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                Submit Report <MessageSquare className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="p-16 text-center">
            <div className="w-20 h-20 bg-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <MessageSquare className="text-orange-600 w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Feedback Sent</h2>
            <p className="text-neutral-400 mb-8 max-w-sm mx-auto font-mono text-sm">
              Your ticket ID: #RTA-FB-{Math.floor(Math.random() * 9000) + 1000}. <br />
              Thank you for contributing to mechanical excellence.
            </p>
            <button onClick={onClose} className="bg-orange-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-orange-500 transition-colors">
              Done
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const Footer = ({ user }: { user: FirebaseUser | null }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = React.useState(false);

  return (
    <footer className="bg-neutral-950 border-t border-white/5 pt-20 pb-10">
      <div className={sectionPadding}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="mb-8">
              <Logo />
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed mb-8">
              Ramzan Technical Academy is dedicated to providing specialized education 
              for the pioneers of mechanical and automotive industries.
            </p>
            <div className="flex flex-col gap-6">
              {user ? (
                <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || ''} className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center font-bold text-white text-lg">
                      {user.displayName?.[0] || 'U'}
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-white text-xs font-bold">{user.displayName}</p>
                    <button onClick={logout} className="text-neutral-500 text-[10px] uppercase font-bold hover:text-white transition-colors">Logout</button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={signInWithGoogle}
                  className="bg-white text-neutral-950 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform w-full"
                >
                  <User className="w-5 h-5" /> Student Login
                </button>
              )}
              <div className="flex gap-4">
                {[
                  { icon: X, href: "https://twitter.com/rta_academy" },
                  { icon: MessageCircle, href: "https://facebook.com/rta_academy" },
                  { icon: Link, href: "https://linkedin.com/school/rta_academy" }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-orange-600 transition-all font-bold text-lg"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Courses', 'Research', 'Community', 'Projects', 'Partnerships'].map(item => (
                <li key={item}><a href="#" className="text-neutral-500 hover:text-orange-600 text-sm transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
             <h4 className="text-white font-bold mb-8">Categories</h4>
            <ul className="space-y-4">
              {['Mechanical', 'Electrical', 'Civil', 'Automotive', 'Automation'].map(cat => (
                <li key={cat}><a href="#" className="text-neutral-500 hover:text-orange-600 text-sm transition-colors">{cat}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 text-neutral-500 text-sm">
                <MapPin className="w-5 h-5 text-orange-600 shrink-0" />
                <span>Plot 44, Industrial Sector E-Commerce Road, Karachi, Pakistan</span>
              </li>
              <li className="flex items-center gap-4 text-neutral-500 text-sm">
                <Phone className="w-5 h-5 text-orange-600 shrink-0" />
                <span>+92 21 3456789</span>
              </li>
              <li className="flex items-center gap-4 text-neutral-500 text-sm">
                <Mail className="w-5 h-5 text-orange-600 shrink-0" />
                <span>contact@rta-academy.edu.pk</span>
              </li>
            </ul>
            <div className="mt-12 pt-8 border-t border-white/5">
              <button 
                onClick={() => setIsFeedbackOpen(true)}
                className="flex items-center gap-2 text-neutral-400 hover:text-orange-500 transition-colors group"
              >
                <MessageSquare className="w-5 h-5 group-hover:animate-bounce" />
                <span className="text-xs font-bold uppercase tracking-widest">Submit Feedback</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-10 text-center">
          <p className="text-neutral-600 text-xs tracking-widest uppercase">
            © 2024 Ramzan Technical Academy. All Rights Reserved. Engineered with precision.
          </p>
        </div>
      </div>
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </footer>
  );
};

const CourseAdvisor = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Assalam-o-Alaikum! I'm your RTA Senior Advisor. How can I help you choose the right engineering or technical path today?" }
  ]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const systemInstruction = `You are a helpful senior course advisor for Ramzan Technical Academy (RTA), Pakistan's leading engineering and technical training institute.

RTA offers courses across major disciplines:

MECHANICAL:
- Basic Mechanical Workshop (Lathe, Milling, Drilling)
- Welding & Fabrication (MIG, TIG, Arc)
- CNC Machine Operation (G-Code, CNC Lathe/Milling)
- Hydraulics & Pneumatics

ELECTRICAL & AUTOMATION:
- Industrial Electrician (3-Phase, Motor Control)
- Solar PV Installation
- PLC & Automation (Siemens, Allen Bradley, HMI)

CIVIL ENGINEERING:
- Construction Site Supervision
- Quantity Surveying (BOQ, Estimation)
- Land Surveying (Total Station, GPS)

DESIGN & CAD:
- AutoCAD 2D & 3D
- SolidWorks Essentials
- BIM / Revit Integration

AUTOMOTIVE:
- Motorcycle Mechanics (Bronze/Silver/Gold)
- Car Diagnostics
- Heavy Vehicle / Diesel Mechanics
- EV Technology (Battery, Motors, BMS)

SAFETY & QUALITY:
- NEBOSH / HSE Safety Protocols
- Quality Control & Inspection (Metrology)
- ISO Awareness

Your role:
- Ask about the student's current education (e.g., student, mechanic, engineer) and career goal.
- Match them to the most suitable course or pathway.
- Explain job market demand in Pakistan for the field.
- Guide working professionals on upskilling.
- Always recommend a specific course with a clear next step. Keep responses concise. Use a professional yet warm tone.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const aiText = response.text || "I'm sorry, I couldn't process that. Please try again or contact our main desk.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having some technical trouble connecting to my database. Please check your internet or try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <motion.div 
        animate={isOpen ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.8, opacity: 0, y: 20 }}
        className={`absolute bottom-20 right-0 w-[400px] max-w-[calc(100vw-4rem)] bg-neutral-900 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col ${!isOpen && 'pointer-events-none'}`}
      >
        <div className="bg-orange-600 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="text-white w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">RTA Advisor</h3>
              <p className="text-white/60 text-[10px] uppercase tracking-widest font-bold">Powered by AI</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div 
          ref={scrollRef}
          className="flex-1 h-[400px] overflow-y-auto p-6 space-y-4 scroll-smooth"
        >
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                m.role === 'user' 
                  ? 'bg-orange-600 text-white rounded-tr-none' 
                  : 'bg-white/5 border border-white/10 text-neutral-300 rounded-tl-none'
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1">
                <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-white/5">
          <div className="relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about courses, career, etc..."
              className="w-full bg-white/5 border border-white/10 px-6 py-4 pr-16 rounded-2xl text-sm text-white focus:border-orange-600 outline-none transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-orange-600 text-white rounded-xl hover:bg-orange-500 disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${isOpen ? 'bg-neutral-800 scale-90' : 'bg-orange-600 hover:scale-110'}`}
      >
        {isOpen ? <X className="text-white w-8 h-8" /> : <Bot className="text-white w-8 h-8" />}
        {!isOpen && (
          <div className="absolute -top-2 -right-2 bg-white text-orange-600 px-2 py-1 rounded-full text-[10px] font-black animate-bounce shadow-lg">
            AI HELP
          </div>
        )}
      </button>
    </div>
  );
};

const UserProfileView = ({ uid, onBack, showcaseProjects = [] }: { uid: string; onBack: () => void; showcaseProjects?: any[] }) => {
  const [researchProjects, setResearchProjects] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [studentName, setStudentName] = React.useState(uid.length > 20 ? 'Loading...' : uid);
  const [selectedProject, setSelectedProject] = React.useState<any>(null);

  React.useEffect(() => {
    const q = query(
      collection(db, 'research_projects'), 
      where('studentUid', '==', uid),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
      setResearchProjects(docs);
      if (docs.length > 0 && (docs[0] as any).studentName) setStudentName((docs[0] as any).studentName);
      setLoading(false);
    }, (error) => {
      console.error("Profile fetch error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [uid]);

  const filteredShowcase = showcaseProjects.filter(p => p.studentUid === uid || p.student === uid);
  const allUserProjects = [
    ...researchProjects.map(p => ({
      ...p,
      img: p.imageUrl,
      student: p.studentName,
      desc: p.description,
      achievement: 95,
      displayDate: p.createdAt?.toDate ? new Date(p.createdAt.toDate()).toLocaleDateString() : 'Active'
    })),
    ...filteredShowcase
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="mb-12 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
        >
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest">Back to Academy</span>
        </button>

        <div className="hidden md:flex items-center gap-4">
          <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors">
            Share Profile
          </button>
          <button className="px-6 py-2 bg-orange-600 rounded-xl text-xs font-bold hover:bg-orange-500 transition-colors">
            Contact Researcher
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="p-10 bg-neutral-900 rounded-[3rem] border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full blur-3xl -mr-16 -mt-16" />
            
            <div className="relative z-10 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-600 to-orange-800 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-orange-600/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                {studentName[0]}
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{studentName}</h1>
              <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-6">Distinguished Engineering Fellow</p>
              
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer">
                  <Link className="w-4 h-4" />
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer">
                  <Star className="w-4 h-4" />
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer">
                  <Users className="w-4 h-4" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-8">
                <div>
                  <p className="text-orange-500 text-xl font-black">{allUserProjects.length}</p>
                  <p className="text-[10px] text-neutral-500 uppercase font-black">Publications</p>
                </div>
                <div>
                  <p className="text-blue-500 text-xl font-black">12.4k</p>
                  <p className="text-[10px] text-neutral-500 uppercase font-black">Total Reach</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-neutral-900/50 rounded-[2rem] border border-white/10">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-600" />
              Achievements
            </h3>
            <div className="space-y-4">
              {[
                { title: "Gold Medalist 2024", org: "National Engineering Summit" },
                { title: "Top Innovator", org: "RTA Academy Board" },
                { title: "Patent Pending #4292", org: "Renewable Tech" }
              ].map((ach, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <h4 className="text-white text-sm font-bold mb-1">{ach.title}</h4>
                  <p className="text-neutral-500 text-[10px] uppercase tracking-widest">{ach.org}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Engineering Portfolio</h2>
            <div className="flex gap-2">
              {['Recent', 'Popular', 'Featured'].map(tab => (
                <button key={tab} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${tab === 'Recent' ? 'bg-orange-600 text-white' : 'text-neutral-500 hover:text-white'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="py-20 flex justify-center italic text-neutral-500">Retrieving digital credentials...</div>
          ) : allUserProjects.length === 0 ? (
            <div className="py-20 text-center bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10">
              <Code className="w-12 h-12 text-neutral-800 mx-auto mb-4" />
              <p className="text-neutral-500">No public research projects found for this profile.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {allUserProjects.map((item) => (
                <motion.div 
                  key={item.id}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => setSelectedProject(item)}
                  className="p-6 bg-neutral-900 rounded-3xl border border-white/10 hover:border-orange-600/50 transition-all cursor-pointer group"
                >
                  <div className="h-40 rounded-2xl overflow-hidden mb-6 relative">
                    <img src={item.img || item.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={item.title} />
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10">
                      {item.category}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">{item.title}</h3>
                  <p className="text-neutral-500 text-xs line-clamp-2 leading-relaxed italic mb-6">
                    "{item.desc || item.description}"
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-[10px] text-neutral-500 uppercase font-bold">
                        <Star className="w-3 h-3" /> {item.likesCount || 0}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-neutral-500 uppercase font-bold">
                        <Sparkles className="w-3 h-3" /> {item.promotesCount || 0}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <ProjectDetailsModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject}
      />
    </div>
  );
};

export default function App() {
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [currentView, setCurrentView] = React.useState<'home' | 'profile' | 'community'>('home');
  const [profileUid, setProfileUid] = React.useState<string | null>(null);
  const [enrolled, setEnrolled] = React.useState<string[]>([]);
  const [completed, setCompleted] = React.useState<string[]>([]);
  const [certCourse, setCertCourse] = React.useState<string | null>(null);
  const [studentName, setStudentName] = React.useState("Distinguished Student");
  const [isInternshipOpen, setIsInternshipOpen] = React.useState(false);
  const [internshipType, setInternshipType] = React.useState<'Virtual' | 'On-site'>('On-site');
  const [isProjectUploadOpen, setIsProjectUploadOpen] = React.useState(false);
  const [uploadIsResearch, setUploadIsResearch] = React.useState(false);

  const [projects, setProjects] = React.useState<any[]>([
    { 
      id: 1,
      title: "Automated Industrial Sorting Line", 
      category: "Automation", 
      date: "2024-04-15", 
      displayDate: "April 2024",
      achievement: 95,
      img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop",
      desc: "A fully integrated sorting system using PLC control and computer vision to categorize industrial components by size and material. Achieved 98% sorting accuracy with a 40% reduction in cycle time compared to manual processes. Featured custom-built pneumatic actuators and high-speed conveyor synchronization.",
      student: "Hammad Ramzan"
    },
    { 
      id: 2,
      title: "Smart Grid Solar PV Optimizer", 
      category: "Electrical", 
      date: "2024-02-10", 
      displayDate: "Feb 2024",
      achievement: 88,
      img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1000&auto=format&fit=crop",
      desc: "Developed a micro-controller based power tracking system that optimizes solar panel output by 15% through dynamic load matching. Includes a real-time monitoring dashboard via Wi-Fi and automated fault detection for inverter systems. Optimized for grid-tie stability in residential areas.",
      student: "Asad Mehmood"
    },
    { 
      id: 3,
      title: "Low-Cost Concrete Strength Test", 
      category: "Civil", 
      date: "2024-01-05", 
      displayDate: "Jan 2024",
      achievement: 92,
      img: "https://images.unsplash.com/photo-1541888941257-244243618173?q=80&w=1000&auto=format&fit=crop",
      desc: "An innovative ultrasonic testing rig for determining the compressive strength of curing concrete without destructive sampling. Designed for use in rural construction sites where lab testing is inaccessible. Verified against standard cube tests with a 5% margin of error.",
      student: "Zainab Ali"
    },
    { 
      id: 4,
      title: "EV Drivetrain Thermal Mapping", 
      category: "Automotive", 
      date: "2023-12-20", 
      displayDate: "Dec 2023",
      achievement: 97,
      img: "https://images.unsplash.com/photo-1593941829627-bb46ae0062f8?q=80&w=1000&auto=format&fit=crop",
      desc: "Comprehensive thermal analysis of a brushless DC motor and power inverter during high-torque operation. Created a liquid cooling prototype that reduced peak operating temperatures by 22°C. Utilized multi-sensor thermocouple arrays and data logging software.",
      student: "Hammad Ramzan"
    },
    { 
      id: 5,
      title: "CNC Optimized Component Design", 
      category: "Mechanical", 
      date: "2023-11-12", 
      displayDate: "Nov 2023",
      achievement: 90,
      img: "https://images.unsplash.com/photo-1549400262-97ba744ea96a?q=80&w=1000&auto=format&fit=crop",
      desc: "Topology optimization of aerospace-grade aluminum brackets for weight reduction. Reduced component mass by 35% without compromising structural integrity. Successfully machined on a 3-axis CNC milling center with sub-micron tolerances.",
      student: "Bilal Saboor"
    },
    { 
      id: 6,
      title: "ISO Standard Compliance Audit", 
      category: "Safety", 
      date: "2023-10-25", 
      displayDate: "Oct 2023",
      achievement: 85,
      img: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?q=80&w=1000&auto=format&fit=crop",
      desc: "Documentation and implementation of safety protocols for a local manufacturing plant to achieve ISO 45001 compliance. Conducted hazardous area mapping and developed a digital incident reporting system. Reduced workplace accidents by 60% over a 6-month trial.",
      student: "Irfan Khan"
    }
  ]);

  const coursesData = {
    'Mechanical': [
      { 
        id: "mech-workshop",
        icon: Wrench, 
        title: "Basic Mechanical Workshop", 
        desc: "3 months. Master lathe, milling, drilling, and high-precision measuring tools for industrial parts manufacturing.",
        curriculum: ["Lathe Operations", "Milling Procedures", "Drilling Techniques", "Metrology Basics", "Shop Floor Safety"]
      },
      { 
        id: "cnc-ops",
        icon: Monitor, 
        title: "CNC Machine Operation", 
        desc: "3 months. Covers G-code basics, CNC lathe/milling setups, and advanced tooling strategies.",
        curriculum: ["G-Code Programming", "Tool Offsets", "CNC Setups", "Path Optimization"]
      },
      { 
        id: "welding-fab",
        icon: Flame, 
        title: "Welding & Fabrication", 
        desc: "3 months. Specialized training in MIG, TIG, and arc welding for structural and industrial fabrication.",
        curriculum: ["MIG/MAG Welding", "TIG Specialists", "Structural Layout", "Metal Cutting Tech"]
      }
    ],
    'Electrical': [
      { 
        id: "industrial-elec",
        icon: Zap, 
        title: "Industrial Electrician", 
        desc: "4 months. Master 3-phase systems, motor control circuits, contactors, and fundamental PLC wiring.",
        curriculum: ["3-Phase Theory", "Motor Control Centers", "Contactor Logic", "Industrial Safety"]
      },
      { 
        id: "plc-automation",
        icon: Cpu, 
        title: "PLC & Automation", 
        desc: "3 months. Hands-on with Siemens and Allen Bradley systems, ladder logic, and HMI design.",
        curriculum: ["Ladder Logic", "HMI Development", "Sensor Integration", "Fault Finding"]
      },
      { 
        id: "solar-pv",
        icon: Sun, // Note: I need to import Sun if not present
        title: "Solar PV Installation", 
        desc: "2 months. Comprehensive panel sizing, inverter selection, and grid-tie vs off-grid configuration.",
        curriculum: ["System Sizing", "Inverter Tech", "Battery Storage", "On-Grid/Off-Grid"]
      }
    ],
    'Civil': [
      { 
        id: "site-super",
        icon: HardHat, 
        title: "Construction Site Supervision", 
        desc: "3 months. Master concrete pouring, brickwork standards, reinforcement quality, and team management.",
        curriculum: ["Concrete Quality", "Reinforcement Checks", "Site Safety", "Resource Planning"]
      },
      { 
        id: "quantity-survey",
        icon: Ruler, 
        title: "Quantity Surveying Basics", 
        desc: "2 months. Master Bill of Quantities (BOQ), rate analysis, project estimation, and tender fundamentals.",
        curriculum: ["BOQ Preparation", "Rate Analysis", "Estimation Logic", "Tendering Process"]
      },
      { 
        id: "land-survey",
        icon: MapPin, 
        title: "Land Surveying", 
        desc: "2 months. Hands-on with Total Station, GPS mapping, and precision levelling for construction projects.",
        curriculum: ["Total Station Use", "GPS Mapping", "Levelling Protocols", "Data Processing"]
      }
    ],
    'Automotive': [
      { 
        id: "bike-mechanic",
        icon: Bike, 
        title: "Motorcycle Mechanics (Gold)", 
        desc: "6 months. Advanced engine diagnostics, drivetrain overhaul, and performance tuning for all motorcycle types.",
        curriculum: ["Engine Rebuild", "Transmission Tuning", "EFI Systems", "Drivetrain Mastery"]
      },
      { 
        id: "ev-tech",
        icon: Zap, 
        title: "EV Technology", 
        desc: "4 months. Master lithium-ion battery management, electric drivetrains, and charging infrastructure.",
        curriculum: ["BMS Engineering", "EV Drivetrains", "Charging Tech", "HV Safety"]
      },
      { 
        id: "diesel-mechanic",
        icon: Truck, 
        title: "Diesel & Heavy Vehicle", 
        desc: "5 months. Master heavy-duty engine rebuilds and commercial vehicle diagnostics for fleet services.",
        curriculum: ["Heavy Diesel Rebuild", "Air Brakes", "Hydraulic Sytems", "Fleet Management"]
      }
    ],
    'Safety & Quality': [
      { 
        id: "hse-safety",
        icon: ShieldCheck, 
        title: "NEBOSH / HSE Safety", 
        desc: "2 months. Global standards in workplace safety, risk assessment, and incident reporting for industrial sites.",
        curriculum: ["Risk Assessment", "Workplace Hazards", "HSE Protocols", "Incident Reporting"]
      },
      { 
        id: "qc-inspection",
        icon: CheckCircle, 
        title: "Quality Control & Inspection", 
        desc: "2 months. Master industrial gauges, precision measurement, and QC documentation standards.",
        curriculum: ["Precision Metrology", "QC Documents", "Gauge Calibration", "ISO Standards"]
      }
    ]
  };

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        setStudentName(u.displayName || u.email?.split('@')[0] || "Distinguished Student");
      } else {
        setStudentName("Distinguished Student");
      }
    });
    return unsub;
  }, []);

  const navigateToProfile = (uid: string) => {
    setProfileUid(uid);
    setCurrentView('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentView('home');
    setProfileUid(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCommunity = () => {
    setCurrentView('community');
    setProfileUid(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const enroll = (id: string) => {
    if (!enrolled.includes(id)) setEnrolled([...enrolled, id]);
  };

  const complete = (id: string) => {
    if (!completed.includes(id)) setCompleted([...completed, id]);
  };

  if (currentView === 'profile' && profileUid) {
    return (
      <main className="bg-neutral-950 min-h-screen text-white font-sans selection:bg-orange-600 selection:text-white">
        <Navbar onNavigateToCommunity={navigateToCommunity} onNavigateToHome={navigateToHome} />
        <div className="pt-32 pb-24">
          <UserProfileView 
            uid={profileUid} 
            onBack={navigateToHome}
            showcaseProjects={projects}
          />
        </div>
        <Footer user={user} />
      </main>
    );
  }

  if (currentView === 'community') {
    return (
      <main className="bg-neutral-950 min-h-screen text-white font-sans selection:bg-orange-600 selection:text-white">
        <Navbar onNavigateToCommunity={navigateToCommunity} onNavigateToHome={navigateToHome} />
        <div className="pt-32 pb-24">
          <CommunityHub 
            user={user} 
            onBack={navigateToHome}
          />
        </div>
        <Footer user={user} />
      </main>
    );
  }

  return (
    <main className="font-sans antialiased bg-neutral-950">
      <Navbar onNavigateToCommunity={navigateToCommunity} onNavigateToHome={navigateToHome} />
      <Hero />
      <MyCourses 
        enrolled={enrolled} 
        completed={completed} 
        coursesData={coursesData}
        setCertCourse={setCertCourse}
        complete={complete}
      />
      <CoursesGrid 
        enrolled={enrolled}
        completed={completed}
        enroll={enroll}
        complete={complete}
        setCertCourse={setCertCourse}
        categories={coursesData}
        certCourse={certCourse}
      />
      <ResearchSection 
        user={user} 
        onOpenUpload={() => {
          setUploadIsResearch(true);
          setIsProjectUploadOpen(true);
        }} 
      />
      <VirtualInternshipsSection onApply={() => {
        setInternshipType('Virtual');
        setIsInternshipOpen(true);
      }} />
      <CommunitySection 
        onApply={(type) => {
          setInternshipType(type);
          setIsInternshipOpen(true);
        }}
        user={user}
        onOpenUpload={() => {
          setUploadIsResearch(false);
          setIsProjectUploadOpen(true);
        }}
        onNavigateToCommunity={navigateToCommunity}
      />
      <GlobalPartnerships />
      <ProjectsShowcase projects={projects} onViewProfile={navigateToProfile} />
      <Footer user={user} />
      <CourseAdvisor />
      <CertificateModal 
        isOpen={!!certCourse} 
        onClose={() => setCertCourse(null)} 
        courseTitle={certCourse || ''} 
        studentName={studentName} 
      />
      <InternshipFormModal 
        isOpen={isInternshipOpen} 
        onClose={() => setIsInternshipOpen(false)} 
        type={internshipType}
      />
      <ProjectUploadModal 
        isOpen={isProjectUploadOpen}
        onClose={() => setIsProjectUploadOpen(false)}
        onUpload={(p) => setProjects([p, ...projects])}
        user={user}
        initialIsResearch={uploadIsResearch}
      />
    </main>
  );
}
