import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Heart, 
  Droplets, 
  Sun, 
  Wind, 
  Utensils,
  Activity,
  Users,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

const PreventionPage = ({ currentLanguage }) => {
  const navigate = useNavigate();

  const preventionData = {
    en: {
      title: "Prevention Hub",
      subtitle: "Your comprehensive guide to preventive healthcare",
      categories: [
        {
          title: "Personal Hygiene",
          icon: Droplets,
          color: "text-blue-600 bg-blue-50 border-blue-200",
          tips: [
            "Wash hands frequently with soap for 20+ seconds",
            "Use alcohol-based hand sanitizer when soap unavailable",
            "Cover mouth and nose when coughing or sneezing",
            "Avoid touching face with unwashed hands",
            "Keep fingernails short and clean"
          ]
        },
        {
          title: "Nutrition & Diet",
          icon: Utensils,
          color: "text-green-600 bg-green-50 border-green-200",
          tips: [
            "Eat a balanced diet rich in fruits and vegetables",
            "Drink at least 8 glasses of clean water daily",
            "Limit processed foods and excessive sugar",
            "Include protein sources in every meal",
            "Maintain regular meal timings"
          ]
        },
        {
          title: "Physical Activity",
          icon: Activity,
          color: "text-orange-600 bg-orange-50 border-orange-200",
          tips: [
            "Exercise for at least 30 minutes daily",
            "Take regular walks and use stairs",
            "Practice yoga or stretching exercises",
            "Maintain good posture while working",
            "Limit sedentary screen time"
          ]
        },
        {
          title: "Environmental Health",
          icon: Wind,
          color: "text-purple-600 bg-purple-50 border-purple-200",
          tips: [
            "Ensure proper ventilation in living spaces",
            "Keep surroundings clean and dry",
            "Dispose of garbage properly",
            "Eliminate standing water to prevent mosquito breeding",
            "Use air purifiers in polluted areas"
          ]
        }
      ],
      seasonalTips: [
        { season: "Monsoon", tips: ["Boil drinking water", "Avoid street food", "Use mosquito nets"] },
        { season: "Winter", tips: ["Get flu vaccination", "Keep warm", "Eat vitamin C rich foods"] },
        { season: "Summer", tips: ["Stay hydrated", "Avoid peak sun hours", "Use sunscreen"] }
      ]
    }
  };

  const data = preventionData[currentLanguage] || preventionData.en;

  const handleStartChat = (topic) => {
    navigate('/chat', { state: { initialMessage: `Tell me more about ${topic}` } });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full overflow-y-auto mobile-scroll p-4 sm:p-8 space-y-8 bg-gradient-to-br from-slate-50 to-white scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-slate-800">{data.title}</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">{data.subtitle}</p>
      </motion.div>

      {/* Prevention Categories */}
      <div className="space-y-8">
        {data.categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className={`p-3 rounded-xl border-2 ${category.color}`}>
                <category.icon className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">{category.title}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.tips.map((tip, tipIndex) => (
                <motion.div
                  key={tipIndex}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-700 leading-relaxed">{tip}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <motion.button
                onClick={() => handleStartChat(category.title.toLowerCase())}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:border-emerald-200 border-2 border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:text-emerald-700 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Ask AI about {category.title}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Seasonal Prevention Tips */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl border-2 border-blue-200 p-6"
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center space-x-3">
          <Sun className="w-6 h-6 text-orange-500" />
          <span>Seasonal Prevention Tips</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.seasonalTips.map((seasonal, index) => (
            <div key={index} className="bg-white rounded-xl p-4 border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-3">{seasonal.season}</h3>
              <ul className="space-y-2">
                {seasonal.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-slate-600">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Emergency Notice */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6"
      >
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-red-900 mb-2">Important Reminder</h3>
            <p className="text-red-800">
              Prevention is the best medicine. These tips complement but don't replace professional medical advice. 
              Consult healthcare providers for personalized guidance and regular check-ups.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PreventionPage;