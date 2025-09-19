import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Heart, 
  Shield, 
  Activity, 
  Globe,
  Users,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const WelcomeScreen = ({ onGetStarted, currentLanguage = 'en' }) => {
  
  const welcomeData = {
    en: {
      greeting: "Welcome to Health AI 🤖",
      subtitle: "Your AI assistant for preventive care, disease awareness, and vaccination updates",
      description: "Empowering rural and semi-urban communities with accessible healthcare information in your local language.",
      features: [
        {
          icon: Bot,
          title: "AI-Powered Assistance",
          description: "Get instant answers about symptoms, treatments, and preventive measures"
        },
        {
          icon: Shield,
          title: "Vaccination Tracking",
          description: "Stay updated with vaccination schedules and government health programs"
        },
        {
          icon: AlertTriangle,
          title: "Real-time Alerts",
          description: "Receive timely notifications about disease outbreaks and health advisories"
        },
        {
          icon: Globe,
          title: "Multilingual Support",
          description: "Available in Hindi, Bengali, Tamil, Telugu, and English"
        }
      ],
      examples: [
        "What are the symptoms of malaria?",
        "When is my next polio vaccination due?",
        "Give me preventive measures for seasonal flu",
        "Show outbreak alerts near me"
      ],
      cta: "Start Conversation",
      emergency: "For medical emergencies, call your local emergency services immediately"
    },
    hi: {
      greeting: "स्वास्थ्य AI में आपका स्वागत है 🤖",
      subtitle: "निवारक देखभाल, रोग जागरूकता और टीकाकरण अपडेट के लिए आपका AI सहायक",
      description: "स्थानीय भाषा में सुलभ स्वास्थ्य जानकारी के साथ ग्रामीण और अर्ध-शहरी समुदायों को सशक्त बनाना।",
      features: [
        {
          icon: Bot,
          title: "AI-संचालित सहायता",
          description: "लक्षण, उपचार और निवारक उपायों के बारे में तत्काल उत्तर प्राप्त करें"
        },
        {
          icon: Shield,
          title: "टीकाकरण ट्रैकिंग",
          description: "टीकाकरण कार्यक्रम और सरकारी स्वास्थ्य कार्यक्रमों के साथ अपडेट रहें"
        },
        {
          icon: AlertTriangle,
          title: "वास्तविक समय अलर्ट",
          description: "रोग प्रकोप और स्वास्थ्य सलाह के बारे में समय पर सूचना प्राप्त करें"
        },
        {
          icon: Globe,
          title: "बहुभाषी समर्थन",
          description: "हिंदी, बंगाली, तमिल, तेलुगु और अंग्रेजी में उपलब्ध"
        }
      ],
      examples: [
        "मलेरिया के लक्षण क्या हैं?",
        "मेरा अगला पोलियो टीकाकरण कब है?",
        "मौसमी फ्लू के लिए निवारक उपाय दें",
        "मेरे पास प्रकोप अलर्ट दिखाएं"
      ],
      cta: "बातचीत शुरू करें",
      emergency: "चिकित्सा आपातकाल के लिए, तुरंत अपनी स्थानीय आपातकालीन सेवाओं को कॉल करें"
    },
    bn: {
      greeting: "স্বাস্থ্য AI-তে স্বাগতম 🤖",
      subtitle: "প্রতিরোধমূলক যত্ন, রোগ সচেতনতা এবং টিকাদান আপডেটের জন্য আপনার AI সহায়ক",
      description: "আপনার স্থানীয় ভাষায় অ্যাক্সেসযোগ্য স্বাস্থ্যসেবা তথ্য দিয়ে গ্রামীণ এবং আধা-শহুরে সম্প্রদায়কে ক্ষমতায়িত করা।",
      features: [
        {
          icon: Bot,
          title: "AI-চালিত সহায়তা",
          description: "লক্ষণ, চিকিৎসা এবং প্রতিরোধমূলক ব্যবস্থা সম্পর্কে তাৎক্ষণিক উত্তর পান"
        },
        {
          icon: Shield,
          title: "টিকাদান ট্র্যাকিং",
          description: "টিকাদানের সময়সূচী এবং সরকারি স্বাস্থ্য কর্মসূচীর সাথে আপডেট থাকুন"
        },
        {
          icon: AlertTriangle,
          title: "রিয়েল-টাইম সতর্কতা",
          description: "রোগের প্রাদুর্ভাব এবং স্বাস্থ্য পরামর্শ সম্পর্কে সময়মত বিজ্ঞপ্তি পান"
        },
        {
          icon: Globe,
          title: "বহুভাষিক সমর্থন",
          description: "হিন্দি, বাংলা, তামিল, তেলুগু এবং ইংরেজিতে উপলব্ধ"
        }
      ],
      examples: [
        "ম্যালেরিয়ার লক্ষণগুলি কী?",
        "আমার পরবর্তী পোলিও টিকা কবে?",
        "মৌসুমী ফ্লুর জন্য প্রতিরোধমূলক ব্যবস্থা দিন",
        "আমার কাছে প্রাদুর্ভাব সতর্কতা দেখান"
      ],
      cta: "কথোপকথন শুরু করুন",
      emergency: "চিকিৎসা জরুরী অবস্থার জন্য, অবিলম্বে আপনার স্থানীয় জরুরী সেবায় কল করুন"
    }
  };

  const content = welcomeData[currentLanguage] || welcomeData.en;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-12 space-y-8 md:space-y-16 pb-16">
        
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center space-y-8">
          <div className="flex justify-center mb-6">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-3xl flex items-center justify-center shadow-xl shadow-emerald-500/25">
                <Bot className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl blur-lg opacity-20 animate-pulse"></div>
            </motion.div>
          </div>
          
          <div className="space-y-6">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-emerald-800 bg-clip-text text-transparent leading-tight"
              variants={itemVariants}
            >
              {content.greeting}
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed px-4 sm:px-0"
              variants={itemVariants}
            >
              {content.subtitle}
            </motion.p>
            
            <motion.p 
              className="text-lg text-slate-500 max-w-4xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              {content.description}
            </motion.p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div variants={itemVariants} className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Key Features</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Comprehensive healthcare support designed for everyone</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {content.features.map((feature, index) => (
              <motion.div
                key={index}
                variants={featureVariants}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group bg-white/80 backdrop-blur-sm p-4 md:p-8 rounded-xl md:rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-emerald-200"
              >
                <div className="flex items-start space-x-4 md:space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:from-emerald-100 group-hover:to-emerald-200 transition-all duration-300">
                      <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-emerald-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2 md:mb-3 group-hover:text-emerald-800 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Example Questions */}
        <motion.div variants={itemVariants} className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Try Asking:</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Get started with these common health questions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.examples.map((example, index) => (
              <motion.button
                key={index}
                variants={featureVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onGetStarted(example)}
                className="group p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-100 rounded-2xl text-left hover:from-emerald-100 hover:to-teal-100 hover:border-emerald-200 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <p className="text-slate-700 group-hover:text-slate-800 font-medium text-base leading-relaxed pr-4">
                    "{example}"
                  </p>
                  <ArrowRight className="w-5 h-5 text-emerald-600 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="text-center space-y-8">
          <motion.button
            onClick={() => onGetStarted()}
            className="group inline-flex items-center space-x-4 px-10 py-5 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <Sparkles className="w-6 h-6 relative z-10" />
            <span className="relative z-10">{content.cta}</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />
          </motion.button>
          
          <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Click the button above or choose one of the example questions to start your health consultation
          </p>
        </motion.div>

        {/* Emergency Notice */}
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8 shadow-lg"
        >
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-red-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-red-900 mb-3">Important Notice</h3>
              <p className="text-red-800 leading-relaxed text-base">
                {content.emergency}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Government Integration Badge */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="inline-flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-sm">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-base text-green-800 font-semibold">
              Integrated with Government Health Databases
            </span>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default WelcomeScreen;