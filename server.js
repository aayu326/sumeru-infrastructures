// server.js - Sumeru Infrastructures Chatbot - PRODUCTION VERSION
console.log("🏢 SUMERU INFRASTRUCTURES SERVER.JS - PRODUCTION VERSION 🏢");

const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// ==============================================
// API KEYS
// ==============================================
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialize Gemini
let genAI = null;
if (GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  console.log('✅ Gemini API initialized');
} else {
  console.log('⚠️ Gemini API key not found - using Knowledge Base only');
}

// ==============================================
// EMAIL CONFIGURATION
// ==============================================
const EMAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
};

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@sumeruinfrastructures.com';
const transporter = nodemailer.createTransport(EMAIL_CONFIG);



// ==============================================
// COMPREHENSIVE KNOWLEDGE BASE - SUMERU INFRASTRUCTURES
// ==============================================
const KNOWLEDGE_BASE = {

  // ==============================================
  // COMPANY INFORMATION
  // ==============================================
  company_info: {
    keywords: [
      'what is sumeru', 'sumeru infrastructures', 'about sumeru', 'sumeru company',
      'real estate company', 'dehradun builder', 'uttarakhand property developer',
      'residential projects', 'real estate investment', 'who is sumeru',
      'sumeru developer', 'about company', 'company details'
    ],
    answer: "🏢 About Sumeru Infrastructures:\n\nSumeru Infrastructures is a trusted real estate development company based in Dehradun, Uttarakhand, offering premium residential apartments and excellent investment opportunities.\n\n✅ Quality Construction\n✅ Transparent Dealings\n✅ Customer-First Approach\n✅ Eco-Friendly Development\n\n🔗 Learn More: https://www.sumeruinfrastructures.com/"
  },

  location: {
    keywords: [
      'location', 'address', 'where located', 'sumeru location', 'dehradun office',
      'uttarakhand real estate', 'property in dehradun', 'sumeru address',
      'how to reach', 'directions', 'map', 'office location'
    ],
    answer: "📍 Sumeru Infrastructures\nDehradun, Uttarakhand, India\n\n🔗 Contact Us: https://www.sumeruinfrastructures.com/contact\n\n📞 For directions and office address, please contact our sales team directly."
  },

  reliability: {
    keywords: [
      'reliable', 'trusted developer', 'reliable builder', 'quality construction',
      'customer satisfaction', 'reputable company', 'is sumeru good', 'sumeru trustworthy',
      'honest builder', 'transparency', 'fair dealings', 'trustworthy developer'
    ],
    answer: "🏆 Why Trust Sumeru Infrastructures?\n\nSumeru is a trusted developer known for:\n\n✅ Transparent pricing — No hidden charges\n✅ Quality construction standards\n✅ Customer-focused approach\n✅ Legal compliance & clear documentation\n✅ Timely project delivery\n\nYour investment is in safe hands! 🤝\n\n🔗 Learn More: https://www.sumeruinfrastructures.com/"
  },

  // ==============================================
  // PROJECTS
  // ==============================================
  eastern_arc: {
    keywords: [
      'eastern arc', 'eastern arc project', 'doon valley apartments', 'eastern arc flats',
      'sumeru eastern', 'eastern arc residential', 'eastern arc society'
    ],
    answer: "🏡 Eastern Arc — by Sumeru Infrastructures:\n\nEastern Arc is a premium residential apartment project located in the scenic Doon Valley.\n\n🏠 Configurations Available:\n• 1 BHK\n• 2 BHK\n• 3 BHK\n\n✅ Family-Friendly Community\n✅ Gated & Secure Society\n✅ Scenic Valley Views\n✅ Modern Amenities\n✅ Eco-Friendly Design\n\n🔗 View Project: https://www.sumeruinfrastructures.com/eastern-arc"
  },

  paras_tower: {
    keywords: [
      'paras tower', 'paras tower sumeru', 'dehradun residential tower',
      'paras apartment complex', 'paras tower housing'
    ],
    answer: "🏢 Paras Tower — by Sumeru Infrastructures:\n\nParas Tower is a residential development by Sumeru Infrastructures in Dehradun offering modern living spaces.\n\n✅ Prime location in Dehradun\n✅ Modern apartment design\n✅ Quality construction\n✅ Essential amenities included\n\n🔗 View Project: https://www.sumeruinfrastructures.com/paras-tower"
  },

  sumeru_vihar: {
    keywords: [
      'sumeru vihar', 'sumeru vihar project', 'sumeru vihar apartments',
      'vihar residential', 'sumeru vihar housing'
    ],
    answer: "🌿 Sumeru Vihar — by Sumeru Infrastructures:\n\nSumeru Vihar is a residential project offering modern apartments with scenic surroundings in Dehradun.\n\n✅ Scenic natural surroundings\n✅ Modern apartment design\n✅ Family-friendly environment\n✅ Sustainable development\n\n🔗 View Project: https://www.sumeruinfrastructures.com/sumeru-vihar"
  },

  all_projects: {
    keywords: [
      'projects', 'all projects', 'available projects', 'sumeru projects list',
      'what projects', 'current projects', 'ongoing projects', 'residential projects'
    ],
    answer: "🏗️ Our Projects:\n\n🏡 1. Eastern Arc\n• 1BHK, 2BHK, 3BHK apartments\n• Scenic Doon Valley location\n\n🏢 2. Paras Tower\n• Modern residential development\n• Prime Dehradun location\n\n🌿 3. Sumeru Vihar\n• Scenic surroundings\n• Family-friendly community\n\n🔗 All Projects: https://www.sumeruinfrastructures.com/projects"
  },

  // ==============================================
  // APARTMENT TYPES & CONFIGURATIONS
  // ==============================================
  apartment_types: {
    keywords: [
      'apartment types', 'flat types', '1bhk', '2bhk', '3bhk', 'configurations',
      'flat sizes', 'housing options', 'apartment configurations', 'what flat',
      'residential apartments', 'affordable flats', 'premium homes', 'housing choices'
    ],
    answer: "🏠 Apartment Configurations:\n\nSumeru offers multiple apartment options:\n\n📐 1 BHK — Ideal for individuals & couples\n📐 2 BHK — Perfect for small families\n📐 3 BHK — Spacious for larger families\n\n✅ Affordable housing options\n✅ Premium luxury apartments\n✅ Modern layouts & fittings\n✅ Vastu-compliant designs\n\n🔗 View Options: https://www.sumeruinfrastructures.com/apartments"
  },

  spacious_apartments: {
    keywords: [
      'spacious', 'spacious apartments', 'large rooms', 'comfortable layout', 'room space',
      'modern design apartment', 'apartment layout', 'flat interior space', 'big flat'
    ],
    answer: "🛋️ Spacious Apartments:\n\nAll Sumeru apartments are designed to maximize space and comfort:\n\n✅ Open & airy floor plans\n✅ Proper ventilation & natural lighting\n✅ Modern layouts\n✅ Sufficient storage space\n✅ Thoughtfully designed rooms\n\nComfort and style — perfectly balanced! 🏡"
  },

  vastu: {
    keywords: [
      'vastu', 'vastu compliant', 'vastu approved', 'vastu apartments', 'positive energy',
      'balanced living', 'vastu design', 'vastu home'
    ],
    answer: "🙏 Vastu-Compliant Apartments:\n\nYes! All apartments at Sumeru are designed following Vastu Shastra principles for balanced, positive, and harmonious living.\n\n✅ Vastu-approved layouts\n✅ Positive energy flow\n✅ Balanced directional planning\n✅ Traditional Indian design principles\n\nA home that brings peace and prosperity! 🌟"
  },

  modular_kitchen: {
    keywords: [
      'modular kitchen', 'modern kitchen', 'kitchen design', 'apartment kitchen',
      'kitchen fittings', 'contemporary kitchen', 'home interiors'
    ],
    answer: "🍳 Modular Kitchen:\n\nSelect units offer modern modular kitchen layouts featuring:\n\n✅ Contemporary design\n✅ Modern fittings & fixtures\n✅ Efficient use of space\n✅ Durable materials\n\nFor specific availability, please contact our sales team! 📞\n\n🔗 Contact: https://www.sumeruinfrastructures.com/contact"
  },

  interior_customization: {
    keywords: [
      'customize', 'customization', 'interior customization', 'flat personalization',
      'home design options', 'apartment modifications', 'tailor interiors', 'design flexibility',
      'interior design assistance', 'flat customization', 'personalized apartment'
    ],
    answer: "🎨 Interior Customization:\n\nInterior customization options may be available depending on the project phase and agreement.\n\n✅ Personalized layouts\n✅ Design guidance available\n✅ Modern interior options\n\nContact our team to discuss specific customization requirements!\n\n📞 Contact: https://www.sumeruinfrastructures.com/contact"
  },

  // ==============================================
  // AMENITIES
  // ==============================================
  amenities: {
    keywords: [
      'amenities', 'facilities', 'apartment amenities', 'society facilities',
      'what amenities', 'modern amenities', 'residential facilities', 'features'
    ],
    answer: "🌟 Amenities at Sumeru Projects:\n\n🔒 Security:\n• 24/7 Security personnel\n• CCTV surveillance\n• Gated entry\n\n🌿 Outdoor:\n• Landscaped gardens\n• Children's play area\n• Jogging track\n\n🏋️ Fitness:\n• Gym (select projects)\n• Swimming pool (premium projects)\n\n🏠 Convenience:\n• Dedicated parking\n• Power backup\n• Water backup\n• Regular maintenance\n• Community hall\n\n🔗 Full Details: https://www.sumeruinfrastructures.com/amenities"
  },

  gym: {
    keywords: [
      'gym', 'gymnasium', 'fitness center', 'exercise room', 'workout facility',
      'health amenities', 'resident fitness', 'fitness club'
    ],
    answer: "🏋️ Gym & Fitness:\n\nSome Sumeru projects include a gym or fitness facility for residents.\n\n✅ Modern equipment\n✅ Spacious workout area\n✅ Health-focused living\n\nFor specific availability per project, contact our team!\n\n🔗 Contact: https://www.sumeruinfrastructures.com/contact"
  },

  swimming_pool: {
    keywords: [
      'swimming pool', 'pool', 'pool facility', 'water leisure', 'recreational amenity',
      'luxury amenities', 'pool in project'
    ],
    answer: "🏊 Swimming Pool:\n\nCertain premium Sumeru projects offer a swimming pool for residents.\n\n✅ Well-maintained pool\n✅ Recreational facility\n✅ Luxury living experience\n\nFor specific project availability, contact our team!\n\n🔗 Contact: https://www.sumeruinfrastructures.com/contact"
  },

  parking: {
    keywords: [
      'parking', 'car parking', 'dedicated parking', 'parking facility', 'residential parking',
      'apartment parking', 'assigned parking', 'secure parking', 'parking space'
    ],
    answer: "🚗 Parking Facility:\n\nYes! Each apartment has a dedicated parking space:\n\n✅ Assigned parking per apartment\n✅ Secure parking area\n✅ Easy access\n✅ 24/7 security coverage\n\nNo parking worries for residents! 🅿️"
  },

  power_backup: {
    keywords: [
      'power backup', 'electricity backup', 'inverter', 'uninterrupted power',
      '24x7 power', 'apartment utilities', 'power supply', 'electricity facility'
    ],
    answer: "⚡ Power Backup:\n\nYes! Essential power backup facilities are available:\n\n✅ Uninterrupted power supply\n✅ Backup for common areas\n✅ Generator/Inverter support\n✅ Reliable electricity\n\nNever worry about power cuts! 💡"
  },

  water_backup: {
    keywords: [
      'water backup', 'water supply', 'overhead tank', 'continuous water',
      'water facility', 'water purification', 'clean water', 'drinking water',
      'safe drinking water', 'filtered water', 'water system'
    ],
    answer: "💧 Water Facilities:\n\n✅ 24/7 water supply\n✅ Backup water systems\n✅ Overhead tank storage\n✅ Clean drinking water\n✅ Water purification systems available\n\nUninterrupted, clean water for all residents! 🚿"
  },

  elevators: {
    keywords: [
      'elevator', 'lift', 'lift facility', 'apartment lift', 'multi-storey lift',
      'vertical transport', 'building elevator', 'floors elevator'
    ],
    answer: "🛗 Elevators:\n\nYes! Multi-storey apartments are equipped with elevators for convenience:\n\n✅ Modern elevator systems\n✅ Regular maintenance\n✅ Easy access to all floors\n\nConvenience for every resident! ✅"
  },

  balcony: {
    keywords: [
      'balcony', 'apartment balcony', 'outdoor space', 'private balcony',
      'scenic view balcony', 'terrace access', 'balcony feature'
    ],
    answer: "🌄 Balconies:\n\nYes! Most Sumeru apartments include balconies:\n\n✅ Private outdoor space\n✅ Scenic mountain & valley views\n✅ Fresh air & natural surroundings\n✅ Relaxing open-air area\n\nEnjoy breathtaking Dehradun views every day! 🏔️"
  },

  community_hall: {
    keywords: [
      'community hall', 'clubhouse', 'social space', 'resident gathering', 'communal area',
      'community events', 'gathering area', 'social events', 'resident activities',
      'activity area', 'common area'
    ],
    answer: "🎉 Community Hall & Common Spaces:\n\nYes! Projects include community spaces:\n\n✅ Community hall for events\n✅ Social gathering areas\n✅ Resident meeting spaces\n✅ Festive celebrations\n✅ Cultural events\n\nA vibrant, friendly community awaits you! 🤝"
  },

  jogging_track: {
    keywords: [
      'jogging track', 'walking path', 'fitness trail', 'exercise path',
      'jogging facility', 'walking track', 'fitness path', 'healthy lifestyle'
    ],
    answer: "🏃 Jogging & Walking Tracks:\n\nSome residential projects offer jogging and walking tracks:\n\n✅ Dedicated fitness trail\n✅ Scenic walking paths\n✅ Healthy lifestyle support\n✅ Fresh air & greenery\n\nStay fit right in your community! 💪"
  },

  garden: {
    keywords: [
      'garden', 'landscaped garden', 'green area', 'green space', 'outdoor greenery',
      'nature surroundings', 'eco friendly area', 'park inside', 'open green space'
    ],
    answer: "🌿 Landscaped Gardens:\n\n✅ Beautiful landscaped gardens\n✅ Lush green spaces\n✅ Open area for relaxation\n✅ Eco-friendly environment\n✅ Fresh natural surroundings\n\nLive close to nature in the heart of Dehradun! 🌳"
  },

  children_play: {
    keywords: [
      'children park', 'playground', 'kids area', 'outdoor play', 'children play',
      'kids friendly', 'play area', 'kids park', 'children playground', 'family play'
    ],
    answer: "👧 Children's Play Area:\n\n✅ Safe & fun playground\n✅ Dedicated kids zone\n✅ Family-friendly design\n✅ Secure outdoor play\n✅ Age-appropriate equipment\n\nA happy, safe space for your little ones! 🎠"
  },

  maintenance: {
    keywords: [
      'maintenance', 'maintenance service', 'upkeep service', 'apartment management',
      'resident support', 'facility management', 'property maintenance', 'society upkeep'
    ],
    answer: "🔧 Maintenance Services:\n\nYes! Ongoing maintenance and management support is provided:\n\n✅ Regular upkeep of common areas\n✅ Maintenance team on standby\n✅ Prompt issue resolution\n✅ Clean & well-maintained society\n\nHassle-free living guaranteed! ✅"
  },

  wifi: {
    keywords: [
      'wifi', 'wi-fi', 'internet', 'broadband', 'wifi connectivity', 'internet facility',
      'online service', 'digital amenities', 'wifi in society'
    ],
    answer: "📶 Wi-Fi & Internet:\n\nWi-Fi may be available in common areas, and individual broadband connections can be arranged per apartment.\n\n✅ Digital-ready infrastructure\n✅ High-speed internet support\n\nContact our team for specific connectivity details!\n\n🔗 Contact: https://www.sumeruinfrastructures.com/contact"
  },

  waste_management: {
    keywords: [
      'waste management', 'garbage disposal', 'clean society', 'sanitation',
      'environment friendly waste', 'waste system', 'cleanliness'
    ],
    answer: "♻️ Waste Management:\n\nProper garbage disposal and waste management systems are implemented:\n\n✅ Regular garbage collection\n✅ Responsible waste disposal\n✅ Clean society standards\n✅ Eco-friendly practices\n\nA clean and healthy community! 🌍"
  },

  security: {
    keywords: [
      'security', 'safety', 'cctv', 'secure', 'safe', 'gated community', 'gated society',
      'security measures', '24/7 security', 'security personnel', 'surveillance',
      'protected living', 'controlled access', 'secure apartments', 'safe living'
    ],
    answer: "🔒 Safety & Security:\n\n✅ 24/7 Security personnel\n✅ CCTV surveillance in common areas\n✅ Gated entry with controlled access\n✅ Secure, private community\n✅ Regular security checks\n\nYour family's safety is our top priority! 🛡️\n\n🔗 Learn More: https://www.sumeruinfrastructures.com/amenities"
  },

  earthquake_safe: {
    keywords: [
      'earthquake', 'earthquake resistant', 'seismic', 'seismic safety', 'reinforced',
      'structural safety', 'safe building', 'earthquake proof', 'construction safety',
      'building standards', 'structural integrity'
    ],
    answer: "🏗️ Earthquake-Resistant Construction:\n\nYes! All Sumeru constructions follow seismic safety norms:\n\n✅ Seismic-resistant design\n✅ Reinforced concrete structure\n✅ Safety norms compliance\n✅ Strong structural integrity\n\nBuilt to protect you and your family! 🛡️"
  },

  // ==============================================
  // LOCATION ADVANTAGES
  // ==============================================
  near_schools: {
    keywords: [
      'near schools', 'school proximity', 'education facilities', 'schools nearby',
      'reputed schools', 'child friendly area', 'family convenience near school'
    ],
    answer: "🏫 Near Schools:\n\nYes! Reputed schools are located near our projects:\n\n✅ Top-rated schools nearby\n✅ Easy school commute for kids\n✅ Family-friendly neighborhood\n✅ Educational hub accessibility\n\nPerfect for families with school-going children! 📚"
  },

  near_hospitals: {
    keywords: [
      'near hospital', 'hospital nearby', 'healthcare access', 'medical facilities',
      'emergency services', 'clinic nearby', 'healthcare proximity', 'hospital tie-up'
    ],
    answer: "🏥 Near Hospitals:\n\nMajor hospitals and healthcare facilities are easily accessible:\n\n✅ Top hospitals nearby\n✅ Emergency services accessible\n✅ Clinics & medical stores close by\n✅ Quick medical response\n\nYour health is never far from help! 💊"
  },

  near_shopping: {
    keywords: [
      'near market', 'shopping proximity', 'shopping nearby', 'retail access',
      'convenience store', 'shopping center', 'commercial area', 'daily necessities',
      'near shopping center', 'shopping areas nearby'
    ],
    answer: "🛍️ Near Shopping Areas:\n\nEssential shops and commercial areas are easily accessible:\n\n✅ Markets & supermarkets nearby\n✅ Shopping centers close by\n✅ Daily essentials convenient\n✅ Restaurants & eateries accessible\n\nEverything you need, just minutes away! 🛒"
  },

  transport: {
    keywords: [
      'transport', 'public transport', 'easy commute', 'bus access', 'taxi connectivity',
      'transportation', 'road connectivity', 'commute', 'connected location', 'transport access'
    ],
    answer: "🚌 Transport & Connectivity:\n\nExcellent connectivity and transport options:\n\n✅ Easy access to buses & taxis\n✅ Good road connectivity\n✅ Smooth daily commute\n✅ Well-connected to city centre\n\nTravel without worry every day! 🚗"
  },

  scenic: {
    keywords: [
      'scenic', 'mountain view', 'valley view', 'nature', 'green surroundings',
      'scenic property', 'nature living', 'beautiful view', 'doon valley', 'hill view',
      'peaceful location', 'calm area', 'quiet neighborhood', 'peaceful area'
    ],
    answer: "🏔️ Scenic Location:\n\nOur projects offer stunning natural surroundings:\n\n🌄 Valley & mountain views\n🌿 Lush green environment\n🌬️ Fresh clean air\n☀️ Natural sunlight\n🏔️ Himalayan backdrop\n\nWake up to breathtaking Dehradun scenery every day! ✨"
  },

  dehradun_investment: {
    keywords: [
      'dehradun good', 'buy property dehradun', 'uttarakhand real estate', 'dehradun investment',
      'property growth', 'investment location', 'hill city housing', 'dehradun market'
    ],
    answer: "📈 Why Invest in Dehradun?\n\nDehradun is one of India's fastest-growing cities:\n\n✅ Strong real estate growth potential\n✅ Capital appreciation over time\n✅ Tourism & IT hub development\n✅ Quality of life is excellent\n✅ Government infrastructure investments\n✅ Natural beauty boosts demand\n\nInvest now for long-term returns! 💰\n\n🔗 Explore Projects: https://www.sumeruinfrastructures.com/projects"
  },

  // ==============================================
  // INVESTMENT & FINANCIAL
  // ==============================================
  investment: {
    keywords: [
      'investment', 'property investment', 'roi', 'real estate investment',
      'investor support', 'property returns', 'capital appreciation', 'long term investment',
      'property growth', 'real estate returns', 'good investment'
    ],
    answer: "💰 Property Investment with Sumeru:\n\nSumeru provides guidance for property investment:\n\n✅ Strong ROI potential in Dehradun\n✅ Capital appreciation over time\n✅ Guidance for first-time investors\n✅ Transparent dealings\n✅ Legal compliance\n\n📞 Speak with our investment advisor!\n\n🔗 Contact: https://www.sumeruinfrastructures.com/contact"
  },

  long_term_investment: {
    keywords: [
      'long term', 'long term investment', 'long-term value', 'future investment',
      'property future', 'property value growth', 'future returns'
    ],
    answer: "📊 Long-Term Investment Value:\n\nProperties in Dehradun have strong long-term growth potential:\n\n✅ Growing city infrastructure\n✅ Tourism & IT sector expansion\n✅ Population growth driving demand\n✅ Limited supply in scenic areas\n✅ Historical capital appreciation\n\nA smart investment for your future! 🚀"
  },

  multiple_investment: {
    keywords: [
      'multiple properties', 'multiple units', 'investment portfolio', 'real estate portfolio',
      'buy multiple', 'multiple apartments', 'buying multiple', 'investor multiple'
    ],
    answer: "🏘️ Multiple Property Investment:\n\nYes! Investors can purchase multiple units:\n\n✅ Portfolio-building opportunities\n✅ Dedicated guidance for investors\n✅ Special assistance for bulk buyers\n✅ Rental income potential\n\n📞 Contact our investment team for customized guidance!\n\n🔗 Contact: https://www.sumeruinfrastructures.com/contact"
  },

  nri_investment: {
    keywords: [
      'nri', 'nri investment', 'foreign buyer', 'overseas property', 'international investment',
      'nri property', 'overseas buyer', 'nri real estate', 'foreigner invest'
    ],
    answer: "🌍 NRI Investment:\n\nYes! NRIs can invest in Sumeru projects following Indian property regulations:\n\n✅ FEMA guidelines compliant\n✅ Legal documentation support\n✅ Hassle-free process\n✅ Remote buying assistance\n✅ NRI-friendly services\n\n📞 Dedicated NRI support available!\n\n🔗 Contact: https://www.sumeruinfrastructures.com/contact"
  },

  rental_property: {
    keywords: [
      'rental', 'rent apartment', 'rental property', 'lease', 'tenant',
      'rental assistance', 'property for rent', 'rental income', 'rental agreement',
      'leasing assistance', 'rent flat'
    ],
    answer: "🏠 Rental Property:\n\nYes! Sumeru provides rental property assistance:\n\n✅ Rental property listings\n✅ Rental agreement guidance\n✅ Tenant matching support\n✅ Rental income for investors\n\n📞 Contact us for available rental units!\n\n🔗 Contact: https://www.sumeruinfrastructures.com/contact"
  },

  home_loan: {
    keywords: [
      'home loan', 'loan', 'bank loan', 'emi', 'finance', 'loan assistance',
      'property loan', 'bank finance', 'loan support', 'installment', 'payment plan',
      'flexible payment', 'pay installment', 'emi options'
    ],
    answer: "🏦 Home Loan & Finance Assistance:\n\nYes! We help with home loan guidance:\n\n✅ Bank loan assistance\n✅ EMI calculation support\n✅ Multiple bank partnerships\n✅ Flexible payment plans\n✅ Quick loan processing guidance\n\n📞 Speak with our finance team!\n\n🔗 Contact: https://www.sumeruinfrastructures.com/contact"
  },

  price: {
    keywords: [
      'price', 'cost', 'rates', 'apartment price', 'flat cost', 'property rates',
      'pricing', 'quotation', 'how much', 'value', 'market rate', 'apartment pricing',
      'price list', 'property cost clarity', 'transparent price', 'no hidden charges'
    ],
    answer: "💰 Pricing & Transparency:\n\nSumeru maintains complete transparency in pricing:\n\n✅ Clear, upfront pricing\n✅ No hidden charges\n✅ Honest property dealings\n✅ Multiple budget options\n\n📞 For updated pricing & availability, contact our sales team!\n\n📱 Contact: https://www.sumeruinfrastructures.com/contact"
  },

  // ==============================================
  // BOOKING & DOCUMENTATION
  // ==============================================
  booking: {
    keywords: [
      'book flat', 'book apartment', 'how to book', 'property enquiry', 'contact builder',
      'schedule visit', 'buy apartment', 'purchase flat', 'booking process'
    ],
    answer: "📝 How to Book a Flat:\n\n✅ Step 1: Contact our sales team\n✅ Step 2: Schedule a site visit\n✅ Step 3: Choose your apartment\n✅ Step 4: Documentation & agreement\n✅ Step 5: Payment & possession\n\n📞 Start your journey today!\n\n🔗 Enquire Now: https://www.sumeruinfrastructures.com/contact"
  },

  site_visit: {
    keywords: [
      'site visit', 'property tour', 'project visit', 'schedule visit', 'visit booking',
      'visit property', 'online appointment', 'schedule appointment', 'see property',
      'virtual scheduling', 'can i visit', 'view apartment'
    ],
    answer: "🏠 Schedule a Site Visit:\n\nYes! You can schedule a site visit easily:\n\n✅ Visit at your convenience\n✅ Guided property tour\n✅ Meet our sales team\n✅ Online booking available\n\n📞 Call or fill the contact form to book!\n\n🔗 Book Visit: https://www.sumeruinfrastructures.com/contact"
  },

  documents: {
    keywords: [
      'documents', 'property documents', 'kyc', 'required documents', 'legal documents',
      'flat registration', 'home buying paperwork', 'documents required', 'what documents'
    ],
    answer: "📄 Documents Required for Property Purchase:\n\n• Aadhaar Card & PAN Card\n• Passport-size photographs\n• Address proof\n• Bank statements (for loan)\n• Income proof (for loan)\n• Sale agreement\n\n📞 Our team will guide you through the complete documentation process!\n\n🔗 Contact: https://www.sumeruinfrastructures.com/contact"
  },

  legal_assistance: {
    keywords: [
      'legal', 'legal assistance', 'legal advice', 'property legal', 'registration',
      'legal documentation', 'legal guidance', 'compliance', 'legal support', 'property law'
    ],
    answer: "⚖️ Legal Assistance:\n\nYes! Sumeru provides complete legal support for property purchase:\n\n✅ Documentation guidance\n✅ Registration assistance\n✅ Legal compliance support\n✅ Transparent property dealings\n\n📞 Contact us for legal guidance!\n\n🔗 Contact: https://www.sumeruinfrastructures.com/contact"
  },

  brochure: {
    keywords: [
      'brochure', 'project brochure', 'download brochure', 'property details',
      'sumeru brochure', 'apartment info', 'project details', 'pdf brochure'
    ],
    answer: "📋 Project Brochure:\n\nYes! Brochures are available:\n\n✅ Download from website\n✅ Request via email\n✅ Detailed project information\n✅ Floor plans & layouts included\n\n🔗 Visit: https://www.sumeruinfrastructures.com/projects\n📧 Or email us to request a brochure!"
  },

  ready_to_move: {
    keywords: [
      'ready to move', 'possession', 'under construction', 'project phase',
      'housing availability', 'when ready', 'possession status', 'available now'
    ],
    answer: "🔑 Possession Status:\n\nAvailability depends on the project phase.\n\n📞 Contact our sales team for:\n✅ Current project status\n✅ Ready-to-move options\n✅ Under-construction projects\n✅ Expected possession dates\n\n🔗 Contact: https://www.sumeruinfrastructures.com/contact"
  },

  // ==============================================
  // LIFESTYLE & SPECIAL BUYERS
  // ==============================================
  family_friendly: {
    keywords: [
      'family friendly', 'family housing', 'suitable for families', 'family apartment',
      'safe for family', 'family community', 'residential comfort', 'joint family'
    ],
    answer: "👨‍👩‍👧‍👦 Family-Friendly Living:\n\nYes! Sumeru projects are perfect for families:\n\n✅ Safe gated community\n✅ Children's play areas\n✅ Spacious apartment layouts\n✅ Family-friendly neighborhoods\n✅ Schools & hospitals nearby\n✅ Secure, peaceful environment\n\nA true home for every family! 🏡"
  },

  joint_family: {
    keywords: [
      'joint family', 'large family', 'multi-family', 'big family', 'joint family home',
      'spacious for family', 'large apartment'
    ],
    answer: "👨‍👩‍👧‍👦 Apartments for Joint Families:\n\nYes! Larger 3BHK apartments are designed to accommodate joint families comfortably:\n\n✅ Spacious floor plans\n✅ Multiple bedrooms\n✅ Common living spaces\n✅ Ample storage\n\nPerfect for big, happy families! 🏠"
  },

  senior_citizens: {
    keywords: [
      'senior citizen', 'retirement', 'elder', 'senior friendly', 'old age',
      'retirement home', 'elderly accommodation', 'retirement living', 'senior living'
    ],
    answer: "👴 Senior-Friendly Apartments:\n\nYes! Peaceful surroundings and convenient amenities make Sumeru projects ideal for senior citizens:\n\n✅ Calm & peaceful environment\n✅ Elevators for easy access\n✅ Hospitals nearby\n✅ Security 24/7\n✅ Maintenance support\n\nA comfortable, secure retirement home! 🌅"
  },

  pet_friendly: {
    keywords: [
      'pet', 'pets', 'pet friendly', 'animals allowed', 'pet policy', 'dogs allowed',
      'animal friendly', 'pet accommodation', 'pets in society'
    ],
    answer: "🐾 Pet-Friendly Apartments:\n\nYes! Pets are typically allowed as per society guidelines:\n\n✅ Pet-friendly community\n✅ Open spaces for pets\n✅ Clear pet policy\n\nContact our team for specific society pet rules!\n\n🔗 Contact: https://www.sumeruinfrastructures.com/contact"
  },

  eco_friendly: {
    keywords: [
      'eco friendly', 'sustainable', 'green living', 'environment', 'sustainable construction',
      'energy efficient', 'environment conscious', 'green development', 'rainwater harvesting',
      'eco-friendly apartments', 'green apartments', 'green initiative'
    ],
    answer: "🌱 Eco-Friendly & Sustainable Development:\n\nSumeru emphasizes sustainable and eco-friendly construction:\n\n✅ Energy-efficient designs\n✅ Rainwater harvesting systems\n✅ Landscaped green areas\n✅ Reduced carbon footprint\n✅ Environment-conscious building\n\nLive green. Live well. 🌍\n\n🔗 Learn More: https://www.sumeruinfrastructures.com/"
  },

  building_floors: {
    keywords: [
      'floors', 'how many floors', 'building height', 'multi-storey', 'storey',
      'residential towers', 'floor count', 'building floors'
    ],
    answer: "🏢 Building Floors:\n\nBuildings vary from 3 to 7 floors depending on the project.\n\n✅ Elevators for all floors\n✅ Scenic views from upper floors\n✅ Well-planned vertical layout\n\nFor specific project details, contact us!\n\n🔗 Contact: https://www.sumeruinfrastructures.com/contact"
  },

  // ==============================================
  // CONTACT
  // ==============================================
  contact: {
    keywords: [
      'contact', 'phone', 'email', 'call', 'reach', 'number', 'customer support',
      'sales team', 'enquiry', 'query help', 'get in touch', 'how to contact'
    ],
    answer: "📞 Contact Sumeru Infrastructures:\n\n🌐 Website: https://www.sumeruinfrastructures.com/\n📧 Email: info@sumeruinfrastructures.com\n\n🔗 Enquiry Form: https://www.sumeruinfrastructures.com/contact\n\n📅 Office Hours: Mon-Sat, 10:00 AM - 6:00 PM\n\nOur team is always happy to help! 😊"
  },

  thanks: {
    keywords: [
      'thank you', 'thanks', 'thnx', 'thankyou', 'ok', 'okay', 'okk', 'k',
      'great', 'good', 'nice', 'alright', 'perfect', 'got it'
    ],
    answer: "😊 You're Welcome!\n\nIt's our pleasure to assist you.\n\nIf you have any more questions about our projects, apartments, amenities, or investment — feel free to ask!\n\n📞 You can also contact us directly for detailed guidance.\n\n🔗 Visit: https://www.sumeruinfrastructures.com/\n\nHave a great day! 🌟"
  }
};


// ==============================================
// EMAIL FUNCTIONALITY
// ==============================================
async function sendAdminEmail(userDetails) {
  try {
    const mailOptions = {
      from: EMAIL_CONFIG.auth.user,
      to: ADMIN_EMAIL,
      subject: '🏢 New User — Sumeru Infrastructures Chatbot',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0f4f8; }
            .wrapper { max-width: 580px; margin: 30px auto; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.12); }
            .header { background: linear-gradient(135deg, #1a3a52 0%, #0d2436 100%); padding: 40px 30px; text-align: center; position: relative; }
            .header::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 5px; background: linear-gradient(90deg, #e8502a, #f4854e, #e8502a); }
            .header h1 { color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: 1px; margin-bottom: 6px; }
            .header p { color: rgba(255,255,255,0.6); font-size: 12px; }
            .new-badge { display: inline-block; background: linear-gradient(135deg, #e8502a, #c73d1a); color: white; padding: 6px 18px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-top: 14px; }
            .body { background: #ffffff; padding: 35px 30px; }
            .section-label { font-size: 11px; font-weight: 700; color: #a0aec0; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #e8502a; display: inline-block; }
            .user-header { display: flex; align-items: center; gap: 16px; background: linear-gradient(135deg, #f7fafc, #edf2f7); border-radius: 12px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #1a3a52; }
            .avatar { width: 55px; height: 55px; background: linear-gradient(135deg, #1a3a52, #2d6a8a); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
            .uname { font-size: 20px; font-weight: 700; color: #1a202c; }
            .utag { font-size: 12px; color: #718096; margin-top: 3px; }
            .info-list { display: grid; gap: 10px; }
            .info-item { background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 18px; display: flex; align-items: center; gap: 14px; }
            .iicon { width: 38px; height: 38px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
            .ilabel { font-size: 10px; color: #a0aec0; text-transform: uppercase; letter-spacing: 1px; }
            .ivalue { font-size: 14px; color: #2d3748; font-weight: 600; margin-top: 2px; }
            .note-box { background: #fff8f6; border: 1px solid rgba(232,80,42,0.2); border-radius: 10px; padding: 16px 18px; margin-top: 20px; display: flex; gap: 12px; align-items: flex-start; }
            .footer { background: #1a3a52; padding: 25px 30px; text-align: center; }
            .footer .school { color: rgba(255,255,255,0.9); font-size: 13px; font-weight: 600; margin-bottom: 6px; }
            .divider { width: 40px; height: 2px; background: #e8502a; margin: 8px auto 10px; border-radius: 2px; }
            .footer p { color: rgba(255,255,255,0.45); font-size: 11px; line-height: 1.8; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <h1>🏢 New User Started Chat</h1>
              <p>A visitor has registered on the Sumeru Chatbot</p>
              <span class="new-badge">✨ New Registration</span>
            </div>
            <div class="body">
              <div class="section-label">User Details</div>
              <div class="user-header">
                <div class="avatar">👤</div>
                <div>
                  <div class="uname">${userDetails.name}</div>
                  <div class="utag">New Chatbot User</div>
                </div>
              </div>
              <div class="info-list">
                <div class="info-item">
                  <div class="iicon">📧</div>
                  <div>
                    <div class="ilabel">Email Address</div>
                    <div class="ivalue">${userDetails.email}</div>
                  </div>
                </div>
                <div class="info-item">
                  <div class="iicon">📱</div>
                  <div>
                    <div class="ilabel">Phone Number</div>
                    <div class="ivalue">${userDetails.phone}</div>
                  </div>
                </div>
                <div class="info-item">
                  <div class="iicon">⏰</div>
                  <div>
                    <div class="ilabel">Registration Time</div>
                    <div class="ivalue">${new Date().toLocaleString('en-IN', {
                      timeZone: 'Asia/Kolkata',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })} IST</div>
                  </div>
                </div>
              </div>
              <div class="note-box">
                <div>💡</div>
                <p>This user has registered on the Sumeru Infrastructures chatbot and may have a property enquiry. Consider following up if no callback request is received.</p>
              </div>
            </div>
            <div class="footer">
              <div class="school">Sumeru Infrastructures — Dehradun, Uttarakhand</div>
              <div class="divider"></div>
              <p>Automated notification from Sumeru Chatbot System</p>
              <p>© ${new Date().getFullYear()} Sumeru Infrastructures</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    await transporter.sendMail(mailOptions);
    console.log('✅ Admin email sent!');
    return true;
  } catch (error) {
    console.error('❌ Email failed:', error.message);
    return false;
  }
}

async function sendCallbackEmail(userDetails, query, callbackNumber) {
  try {
    const mailOptions = {
      from: EMAIL_CONFIG.auth.user,
      to: ADMIN_EMAIL,
      subject: '📞 Callback Request - Sumeru Infrastructures Chatbot',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0f4f8; }
            .wrapper { max-width: 620px; margin: 30px auto; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.15); }
            .header { background: linear-gradient(135deg, #1a3a52 0%, #0d2436 100%); padding: 40px 30px; text-align: center; position: relative; }
            .header::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 5px; background: linear-gradient(90deg, #e8502a, #f4854e, #e8502a); }
            .header h1 { color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px; }
            .header p { color: rgba(255,255,255,0.6); font-size: 12px; }
            .alert-banner { background: linear-gradient(90deg, #e8502a, #c73d1a); padding: 14px 30px; text-align: center; }
            .alert-banner span { color: white; font-weight: 700; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; }
            .body { background: #ffffff; padding: 35px 30px; }
            .phone-box { background: linear-gradient(135deg, #1a3a52 0%, #0d2436 100%); border-radius: 14px; padding: 28px; text-align: center; margin-bottom: 28px; border: 2px solid rgba(232,80,42,0.4); }
            .phone-box .plabel { color: rgba(255,255,255,0.6); font-size: 10px; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 10px; }
            .phone-box .pnumber { color: #ffffff; font-size: 34px; font-weight: 800; letter-spacing: 4px; }
            .section-label { font-size: 11px; font-weight: 700; color: #a0aec0; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 14px; padding-bottom: 8px; border-bottom: 2px solid #e8502a; display: inline-block; }
            .info-grid { display: grid; gap: 12px; margin-bottom: 24px; }
            .info-card { background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 18px; display: flex; align-items: center; gap: 14px; border-left: 4px solid #1a3a52; }
            .icon-box { width: 42px; height: 42px; background: linear-gradient(135deg, #1a3a52, #2d6a8a); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
            .ilabel { font-size: 10px; color: #a0aec0; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 3px; }
            .ivalue { font-size: 15px; color: #2d3748; font-weight: 600; }
            .query-box { background: #fff8f6; border: 1px solid rgba(232,80,42,0.2); border-left: 4px solid #e8502a; border-radius: 10px; padding: 20px; margin-top: 5px; }
            .qlabel { color: #e8502a; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; margin-bottom: 10px; }
            .qtext { color: #4a5568; font-size: 15px; line-height: 1.7; }
            .time-bar { background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 18px; margin-top: 20px; display: flex; align-items: center; gap: 8px; }
            .footer { background: #1a3a52; padding: 25px 30px; text-align: center; }
            .footer p { color: rgba(255,255,255,0.5); font-size: 12px; line-height: 1.8; }
            .footer .school { color: rgba(255,255,255,0.8); font-size: 13px; font-weight: 600; margin-bottom: 5px; }
            .divider { width: 40px; height: 2px; background: #e8502a; margin: 10px auto; border-radius: 2px; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <h1>Callback Request</h1>
              <p>Sumeru Infrastructures · Dehradun, Uttarakhand</p>
            </div>
            <div class="alert-banner">
              <span>⚡ Action Required — Please Call Back</span>
            </div>
            <div class="body">
              <div class="phone-box">
                <div class="plabel">Callback Number</div>
                <div class="pnumber">📱 ${callbackNumber}</div>
              </div>
              <div class="section-label">User Information</div>
              <div class="info-grid">
                <div class="info-card">
                  <div class="icon-box">👤</div>
                  <div><div class="ilabel">Full Name</div><div class="ivalue">${userDetails.name}</div></div>
                </div>
                <div class="info-card">
                  <div class="icon-box">📧</div>
                  <div><div class="ilabel">Email</div><div class="ivalue">${userDetails.email}</div></div>
                </div>
                <div class="info-card">
                  <div class="icon-box">📱</div>
                  <div><div class="ilabel">Registered Phone</div><div class="ivalue">${userDetails.phone}</div></div>
                </div>
              </div>
              <div class="section-label">Query Details</div>
              <div class="query-box">
                <div class="qlabel">❓ User's Question</div>
                <div class="qtext">${query}</div>
              </div>
              <div class="time-bar">
                <span>⏰ Received: ${new Date().toLocaleString('en-IN', {
                  timeZone: 'Asia/Kolkata',
                  day: 'numeric', month: 'long', year: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })} IST</span>
              </div>
            </div>
            <div class="footer">
              <p class="school">Sumeru Infrastructures — Dehradun, Uttarakhand</p>
              <div class="divider"></div>
              <p>Automated message from Sumeru Chatbot System</p>
              <p>Please call back at your earliest convenience</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    await transporter.sendMail(mailOptions);
    console.log('✅ Callback email sent!');
    return true;
  } catch (error) {
    console.error('❌ Email failed:', error.message);
    return false;
  }
}

// ==============================================
// SMART KEYWORD MATCHING
// ==============================================
function findBestMatch(userMessage) {
  const msg = userMessage.toLowerCase().trim();

  let bestMatch = null;
  let highestScore = 0;

  for (const [topic, data] of Object.entries(KNOWLEDGE_BASE)) {
    let score = 0;

    for (const keyword of data.keywords) {
      const keywordLower = keyword.toLowerCase();

      if (msg === keywordLower) {
        score += 100;
      } else if (new RegExp(`\\b${keywordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(msg)) {
        score += 50;
      } else if (msg.includes(keywordLower)) {
        score += 10;
      }
    }

    if (score > highestScore && score > 0) {
      highestScore = score;
      bestMatch = {
        answer: data.answer,
        topic: topic,
        score: score
      };
    }
  }

  if (bestMatch && bestMatch.score >= 10) {
    console.log(`✅ Best Match: ${bestMatch.topic} (Score: ${bestMatch.score})`);
    return bestMatch;
  }

  return null;
}

// ==============================================
// GEMINI API
// ==============================================
async function callGemini(prompt) {
  if (!genAI) throw new Error('Gemini API not initialized');

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const systemContext = `You are a friendly real estate assistant for Sumeru Infrastructures, a property development company in Dehradun, Uttarakhand.

Company Information:
- Company: Sumeru Infrastructures
- Location: Dehradun, Uttarakhand, India
- Website: https://www.sumeruinfrastructures.com/
- Projects: Eastern Arc, Paras Tower, Sumeru Vihar

Guidelines:
- Answer ONLY questions about Sumeru Infrastructures and their properties
- Keep responses friendly, warm, and concise
- For unrelated questions, politely redirect to property-related topics
- Use emojis appropriately to keep responses engaging
- If you don't know specific details, suggest contacting the company

User question: ${prompt}`;

  const result = await model.generateContent(systemContext);
  const response = await result.response;
  const text = response.text();
  if (!text) throw new Error('No response from Gemini');
  return text;
}

// ==============================================
// ENDPOINTS
// ==============================================
app.get('/', (req, res) => {
  res.json({
    status: '✅ Server Running',
    message: 'Sumeru Infrastructures Chatbot API - Production Ready',
    model: 'Google Gemini Pro + Comprehensive Knowledge Base',
    knowledgeBaseTopics: Object.keys(KNOWLEDGE_BASE).length,
    geminiConfigured: !!GEMINI_API_KEY,
    emailConfigured: !!EMAIL_CONFIG.auth.user && EMAIL_CONFIG.auth.user !== 'your-email@gmail.com',
    endpoints: {
      health: '/api/health',
      chat: '/api/chat (POST)',
      register: '/api/register (POST)',
      callback: '/api/callback-request (POST)',
      test: '/api/test'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    geminiConfigured: !!GEMINI_API_KEY,
    emailConfigured: !!EMAIL_CONFIG.auth.user && EMAIL_CONFIG.auth.user !== 'your-email@gmail.com'
  });
});

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, error: 'All fields (name, email, phone) are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, '').slice(-10))) {
      return res.status(400).json({ success: false, error: 'Invalid phone number' });
    }

    console.log('📝 New user registration:', { name, email, phone });
    const emailSent = await sendAdminEmail({ name, email, phone });

    res.json({ success: true, message: 'Registration successful! You can now start chatting.', emailSent });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ success: false, error: 'Registration failed. Please try again.' });
  }
});

app.post('/api/callback-request', async (req, res) => {
  try {
    const { name, email, phone, query, callback_number } = req.body;

    if (!name || !email || !phone || !query || !callback_number) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanedNumber = callback_number.replace(/\D/g, '');
    if (!phoneRegex.test(cleanedNumber)) {
      return res.status(400).json({ success: false, error: 'Invalid callback number' });
    }

    console.log('📞 New callback request:', { name, callback_number, query });
    const emailSent = await sendCallbackEmail({ name, email, phone }, query, cleanedNumber);

    if (emailSent) {
      res.json({ success: true, message: 'Callback request received successfully' });
    } else {
      res.json({ success: false, message: 'Failed to send email notification' });
    }
  } catch (error) {
    console.error('❌ Callback request error:', error);
    res.status(500).json({ success: false, error: 'Failed to process callback request' });
  }
});

app.get('/api/test', async (req, res) => {
  try {
    if (!GEMINI_API_KEY) {
      return res.json({
        success: true,
        message: '✅ Server is working!',
        geminiStatus: 'Not configured (using Knowledge Base only)',
        emailStatus: EMAIL_CONFIG.auth.user !== 'your-email@gmail.com' ? 'Configured ✅' : 'Not configured',
        knowledgeBaseTopics: Object.keys(KNOWLEDGE_BASE).length,
        mode: 'Knowledge Base Mode'
      });
    }
    const reply = await callGemini('Say "Hello! The Gemini API is working!" in one sentence.');
    res.json({
      success: true,
      message: '✅ Gemini API is WORKING!',
      testReply: reply,
      emailStatus: EMAIL_CONFIG.auth.user !== 'your-email@gmail.com' ? 'Configured ✅' : 'Not configured',
      knowledgeBaseTopics: Object.keys(KNOWLEDGE_BASE).length
    });
  } catch (error) {
    res.json({
      success: true,
      message: '✅ Server is working!',
      geminiStatus: 'Unavailable (' + error.message + ')',
      fallbackMode: 'Using comprehensive Knowledge Base',
      knowledgeBaseTopics: Object.keys(KNOWLEDGE_BASE).length
    });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    console.log(`📩 User: ${message}`);

    const GREETINGS = [
      "Hello! 👋 Welcome to Sumeru Infrastructures. How can I help you find your dream property today?",
      "Hi there! 🏢 I'm your Sumeru property assistant! Ask me about our projects, amenities, pricing, or anything else!"
    ];

    if (/^(hi|hello|hey|good morning|good afternoon|good evening)/i.test(message.trim())) {
      return res.json({ success: true, reply: GREETINGS[Math.floor(Math.random() * GREETINGS.length)], mode: 'greeting' });
    }

    const knowledgeMatch = findBestMatch(message);

    if (knowledgeMatch) {
      console.log(`✅ Knowledge Base Match - Topic: ${knowledgeMatch.topic}`);
      return res.json({
        success: true,
        reply: knowledgeMatch.answer,
        mode: 'knowledge-base',
        currentTopic: knowledgeMatch.topic
      });
    }

    if (GEMINI_API_KEY) {
      try {
        const reply = await callGemini(message);
        return res.json({
          success: true,
          reply: reply.trim() + "\n\n🤖 *Powered by Google Gemini*",
          mode: 'ai-powered'
        });
      } catch (geminiError) {
        console.log('⚠️ Gemini unavailable, triggering callback');
      }
    }

    return res.json({
      success: true,
      reply: "I apologize, but I don't have specific information about that right now. 😊\n\nWould you like me to have our property expert call you back?\n\nIf yes, please provide your contact number below:",
      mode: 'callback-request',
      requiresCallback: true,
      userQuery: message
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    res.json({
      success: true,
      reply: `I can help you with Sumeru Infrastructures information! 😊\n\nFor detailed assistance:\n🌐 Website: https://www.sumeruinfrastructures.com/\n📧 Email: info@sumeruinfrastructures.com`,
      mode: 'emergency-fallback'
    });
  }
});

// ==============================================
// START SERVER
// ==============================================
app.listen(PORT, () => {
  console.log('\n╔════════════════════════════════════════════════╗');
  console.log('║  🏢 Sumeru Infrastructures Chatbot - PRODUCTION  ║');
  console.log('╚════════════════════════════════════════════════╝');
  console.log(`🌐 Server: http://localhost:${PORT}`);
  console.log(`🧪 Test API: http://localhost:${PORT}/api/test`);
  console.log(`🤖 AI Model: ${GEMINI_API_KEY ? 'Google Gemini Pro ✅' : 'Not Configured ⚠️'}`);
  console.log(`📚 Knowledge Base: ${Object.keys(KNOWLEDGE_BASE).length} topics ✅`);
  console.log(`📧 Email: ${EMAIL_CONFIG.auth.user !== 'your-email@gmail.com' ? 'Configured ✅' : 'Not Configured ❌'}`);
  console.log(`📞 Callback System: Active ✅`);
  console.log(`🏡 Projects: Eastern Arc, Paras Tower, Sumeru Vihar`);
  console.log('╚════════════════════════════════════════════════\n');

  if (!GEMINI_API_KEY) {
    console.log('⚠️ NOTE: Gemini API key not configured. Using Knowledge Base + Callback system.\n');
  }
  if (EMAIL_CONFIG.auth.user === 'your-email@gmail.com') {
    console.log('⚠️ IMPORTANT: Update ADMIN_EMAIL and EMAIL_PASSWORD in your .env file!\n');
  }
});