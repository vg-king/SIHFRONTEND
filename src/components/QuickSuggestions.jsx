import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Shield, 
  Thermometer, 
  Baby, 
  Calendar, 
  MapPin, 
  AlertTriangle,
  Pill,
  Activity,
  Users,
  TrendingUp,
  Clock
} from 'lucide-react';

const QuickSuggestions = ({ onSuggestionClick, currentLanguage = 'en' }) => {
  
  // Multilingual suggestions data
  const suggestionsData = {
    en: {
      title: "Quick Suggestions",
      subtitle: "Try asking about these common topics:",
      categories: [
        {
          title: "Symptoms & Diagnosis",
          icon: Thermometer,
          color: "text-red-600 bg-red-50 border-red-200",
          suggestions: [
            "What are the symptoms of malaria?",
            "How to identify dengue fever symptoms?",
            "Signs of diabetes I should watch for",
            "Common cold vs flu symptoms"
          ]
        },
        {
          title: "Vaccination",
          icon: Shield,
          color: "text-blue-600 bg-blue-50 border-blue-200",
          suggestions: [
            "When is my next polio vaccination due?",
            "COVID-19 vaccination schedule",
            "Child vaccination calendar",
            "Flu shot timing and effectiveness"
          ]
        },
        {
          title: "Prevention",
          icon: Heart,
          color: "text-green-600 bg-green-50 border-green-200",
          suggestions: [
            "Preventive measures for seasonal flu",
            "How to prevent malaria transmission?",
            "Hygiene practices for disease prevention",
            "Diet tips for diabetes prevention"
          ]
        },
        {
          title: "Health Alerts",
          icon: AlertTriangle,
          color: "text-orange-600 bg-orange-50 border-orange-200",
          suggestions: [
            "Outbreak alerts near me",
            "Current health advisories",
            "Seasonal disease warnings",
            "Emergency health notifications"
          ]
        }
      ]
    },
    hi: {
      title: "त्वरित सुझाव",
      subtitle: "इन सामान्य विषयों के बारे में पूछने का प्रयास करें:",
      categories: [
        {
          title: "लक्षण और निदान",
          icon: Thermometer,
          color: "text-red-600 bg-red-50 border-red-200",
          suggestions: [
            "मलेरिया के लक्षण क्या हैं?",
            "डेंगू बुखार के लक्षणों की पहचान कैसे करें?",
            "मधुमेह के संकेत जिन पर मुझे ध्यान देना चाहिए",
            "सामान्य सर्दी बनाम फ्लू के लक्षण"
          ]
        },
        {
          title: "टीकाकरण",
          icon: Shield,
          color: "text-blue-600 bg-blue-50 border-blue-200",
          suggestions: [
            "मेरा अगला पोलियो टीकाकरण कब है?",
            "COVID-19 टीकाकरण कार्यक्रम",
            "बच्चों का टीकाकरण कैलेंडर",
            "फ्लू शॉट का समय और प्रभावशीलता"
          ]
        },
        {
          title: "रोकथाम",
          icon: Heart,
          color: "text-green-600 bg-green-50 border-green-200",
          suggestions: [
            "मौसमी फ्लू के लिए निवारक उपाय",
            "मलेरिया संचरण को कैसे रोकें?",
            "रोग की रोकथाम के लिए स्वच्छता प्रथाएं",
            "मधुमेह की रोकथाम के लिए आहार सुझाव"
          ]
        },
        {
          title: "स्वास्थ्य अलर्ट",
          icon: AlertTriangle,
          color: "text-orange-600 bg-orange-50 border-orange-200",
          suggestions: [
            "मेरे पास प्रकोप अलर्ट",
            "वर्तमान स्वास्थ्य सलाह",
            "मौसमी बीमारी की चेतावनी",
            "आपातकालीन स्वास्थ्य सूचनाएं"
          ]
        }
      ]
    },
    bn: {
      title: "দ্রুত পরামর্শ",
      subtitle: "এই সাধারণ বিষয়গুলি সম্পর্কে জিজ্ঞাসা করার চেষ্টা করুন:",
      categories: [
        {
          title: "লক্ষণ ও নির্ণয়",
          icon: Thermometer,
          color: "text-red-600 bg-red-50 border-red-200",
          suggestions: [
            "ম্যালেরিয়ার লক্ষণগুলি কী?",
            "ডেঙ্গু জ্বরের লক্ষণগুলি কীভাবে চিহ্নিত করবেন?",
            "ডায়াবেটিসের লক্ষণগুলি যা আমার লক্ষ্য রাখা উচিত",
            "সাধারণ ঠাণ্ডা বনাম ফ্লুর লক্ষণ"
          ]
        },
        {
          title: "টিকাদান",
          icon: Shield,
          color: "text-blue-600 bg-blue-50 border-blue-200",
          suggestions: [
            "আমার পরবর্তী পোলিও টিকা কবে?",
            "COVID-19 টিকাদানের সময়সূচী",
            "শিশু টিকাদান ক্যালেন্ডার",
            "ফ্লু শটের সময় এবং কার্যকারিতা"
          ]
        },
        {
          title: "প্রতিরোধ",
          icon: Heart,
          color: "text-green-600 bg-green-50 border-green-200",
          suggestions: [
            "মৌসুমী ফ্লুর জন্য প্রতিরোধমূলক ব্যবস্থা",
            "ম্যালেরিয়া সংক্রমণ কীভাবে প্রতিরোধ করবেন?",
            "রোগ প্রতিরোধের জন্য স্বাস্থ্যবিধি অনুশীলন",
            "ডায়াবেটিস প্রতিরোধের জন্য খাদ্যতালিকা টিপস"
          ]
        },
        {
          title: "স্বাস্থ্য সতর্কতা",
          icon: AlertTriangle,
          color: "text-orange-600 bg-orange-50 border-orange-200",
          suggestions: [
            "আমার কাছে প্রাদুর্ভাব সতর্কতা",
            "বর্তমান স্বাস্থ্য পরামর্শ",
            "মৌসুমী রোগের সতর্কতা",
            "জরুরী স্বাস্থ্য বিজ্ঞপ্তি"
          ]
        }
      ]
    }
  };

  const suggestions = suggestionsData[currentLanguage] || suggestionsData.en;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.2
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.1
      }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <motion.div
      className="p-6 pb-24 space-y-8 bg-gradient-to-br from-slate-50 to-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-3">{suggestions.title}</h2>
        <p className="text-lg text-slate-600">{suggestions.subtitle}</p>
      </motion.div>

      {/* Categories */}
      <div className="space-y-8">
        {suggestions.categories.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            variants={itemVariants}
            className="space-y-4"
          >
            {/* Category Header */}
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl border-2 ${category.color} shadow-sm`}>
                <category.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">{category.title}</h3>
            </div>

            {/* Suggestion Chips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.suggestions.map((suggestion, suggestionIndex) => (
                <motion.button
                  key={suggestionIndex}
                  variants={chipVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => onSuggestionClick(suggestion)}
                  className="p-5 bg-white border-2 border-slate-200 rounded-xl shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 text-left group"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${category.color} group-hover:scale-110 transition-transform duration-200`}>
                      <category.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors leading-relaxed">
                        {suggestion}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Popular Topics */}
      <motion.div variants={itemVariants} className="mt-10">
        <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center space-x-3">
          <TrendingUp className="w-6 h-6 text-emerald-600" />
          <span>Popular Topics</span>
        </h3>
        
        <div className="flex flex-wrap gap-3">
          {[
            { text: "Fever Treatment", icon: Thermometer },
            { text: "Baby Care", icon: Baby },
            { text: "Medicine Dosage", icon: Pill },
            { text: "Health Checkup", icon: Activity },
            { text: "Emergency Care", icon: Clock },
            { text: "Family Health", icon: Users }
          ].map((topic, index) => (
            <motion.button
              key={index}
              variants={chipVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => onSuggestionClick(`Tell me about ${topic.text.toLowerCase()}`)}
              className="flex items-center space-x-2 px-5 py-3 bg-slate-100 hover:bg-emerald-50 hover:border-emerald-200 border-2 border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:text-emerald-700 transition-all duration-200"
            >
              <topic.icon className="w-4 h-4" />
              <span>{topic.text}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Emergency Notice */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h4 className="text-base font-bold text-red-900 mb-2">Emergency Notice</h4>
            <p className="text-sm text-red-800 leading-relaxed">
              For immediate medical emergencies, please call your local emergency services. 
              This AI assistant provides general health information and should not replace professional medical advice.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuickSuggestions;