import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const courseCategories = [
  {
    name: 'Higher Secondary',
    icon: '🎓',
    bg: 'from-blue-50 via-blue-100 to-blue-200',
    particles: '📚📝✏️',
    streams: ['Science', 'Commerce', 'Arts/Humanities', 'Vocational']
  },
  {
    name: 'Diploma',
    icon: '📜',
    bg: 'from-green-50 via-green-100 to-green-200',
    particles: '⚙️🔧🏗️',
    streams: ['Engineering', 'Medical/Paramedical', 'ITI Trades', 'Design & Arts', 'Business/Management', 'IT & Computer']
  },
  {
    name: 'Undergraduate',
    icon: '🎯',
    bg: 'from-purple-50 via-purple-100 to-purple-200',
    particles: '🎓📊💻',
    streams: ['Engineering', 'Medical', 'Commerce & Management', 'Arts & Humanities', 'Law', 'Architecture']
  },
  {
    name: 'Medical',
    icon: '🏥',
    bg: 'from-red-50 via-red-100 to-red-200',
    particles: '🩺💊🔬',
    streams: ['MBBS/BDS', 'MD Specializations', 'MS Specializations', 'Super Specialty (DM)', 'Super Specialty (MCh)', 'AYUSH', 'Nursing', 'Pharmacy', 'Allied Health']
  },
  {
    name: 'Engineering',
    icon: '⚙️',
    bg: 'from-orange-50 via-orange-100 to-orange-200',
    particles: '🔧🏗️💻',
    streams: ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical', 'Chemical', 'Biotechnology', 'Aerospace']
  },
  {
    name: 'Law',
    icon: '⚖️',
    bg: 'from-indigo-50 via-indigo-100 to-indigo-200',
    particles: '📖⚖️🏛️',
    streams: ['LLB (3 Year)', 'Integrated Law (5 Year)', 'LLM', 'Specialized Law', 'Legal Certifications']
  },
  {
    name: 'Management',
    icon: '💼',
    bg: 'from-teal-50 via-teal-100 to-teal-200',
    particles: '📈💼📊',
    streams: ['MBA General', 'MBA Specializations', 'BBA', 'Commerce', 'Professional Certifications']
  },
  {
    name: 'Arts & Design',
    icon: '🎨',
    bg: 'from-pink-50 via-pink-100 to-pink-200',
    particles: '🎨🖌️🎭',
    streams: ['Fine Arts', 'Design', 'Performing Arts', 'Media & Communication', 'Fashion Design']
  }
];

const courseDetails = {
  // Higher Secondary (11th & 12th)
  'Science': {
    courses: [
      'PCM (Physics, Chemistry, Maths)',
      'PCB (Physics, Chemistry, Biology)', 
      'PCMB (Physics, Chemistry, Maths, Biology)',
      'Science + Computer Science (PCM + CS)',
      'Physics',
      'Chemistry', 
      'Biology',
      'Mathematics',
      'Computer Science',
      'Electronics',
      'Biotechnology',
      'Environmental Science'
    ],
    desc: 'Science stream opens doors to engineering, medical, and research careers',
    duration: '2 years (11th & 12th)',
    eligibility: '10th pass with good marks in Science and Maths'
  },
  
  'Commerce': {
    courses: [
      'Commerce with Maths',
      'Commerce without Maths',
      'Commerce with Computer Applications',
      'Accountancy',
      'Business Studies',
      'Economics',
      'Mathematics',
      'Statistics',
      'Informatics Practices',
      'Entrepreneurship'
    ],
    desc: 'Commerce stream leads to business, finance, and management careers',
    duration: '2 years (11th & 12th)',
    eligibility: '10th pass, preferably with good marks in Maths'
  },

  'Arts/Humanities': {
    courses: [
      'History',
      'Geography', 
      'Political Science',
      'Sociology',
      'Psychology',
      'Economics',
      'Philosophy',
      'English Literature',
      'Hindi Literature',
      'Sanskrit',
      'French',
      'German',
      'Fine Arts',
      'Performing Arts',
      'Music',
      'Dance'
    ],
    desc: 'Arts stream offers diverse career options in humanities and social sciences',
    duration: '2 years (11th & 12th)',
    eligibility: '10th pass from any stream'
  },

  'Vocational': {
    courses: [
      'Travel & Tourism',
      'Hospitality Management',
      'Retail Management',
      'Information Technology',
      'Computer Applications',
      'Health & Nursing',
      'Agriculture',
      'Automobile Technology',
      'Beauty & Wellness',
      'Food Production',
      'Banking & Insurance',
      'Marketing & Sales'
    ],
    desc: 'Vocational subjects provide practical skills for immediate employment',
    duration: '2 years (11th & 12th)',
    eligibility: '10th pass from any stream'
  },

  // Engineering Diplomas
  'Engineering': {
    courses: [
      'Civil Engineering Diploma',
      'Mechanical Engineering Diploma', 
      'Electrical Engineering Diploma',
      'Electronics & Communication Engineering Diploma',
      'Computer Science Engineering Diploma',
      'Information Technology Diploma',
      'Chemical Engineering Diploma',
      'Automobile Engineering Diploma',
      'Production Engineering Diploma',
      'Instrumentation Engineering Diploma',
      'Mining Engineering Diploma',
      'Metallurgy Engineering Diploma',
      'Textile Engineering Diploma',
      'Agricultural Engineering Diploma',
      'Food Technology Diploma',
      'Environmental Engineering Diploma'
    ],
    desc: 'Engineering diplomas provide practical technical skills for immediate employment',
    duration: '3 years (6 semesters)',
    eligibility: '10th pass with Science and Maths'
  },

  'Medical/Paramedical': {
    courses: [
      'Diploma in Medical Laboratory Technology (DMLT)',
      'Diploma in Radiology & Imaging Technology (DRIT)',
      'Diploma in Operation Theatre Technology (DOTT)',
      'Diploma in Anesthesia Technology (DAT)',
      'Diploma in Dialysis Technology (DDT)',
      'Diploma in Perfusion Technology',
      'Diploma in Cardiac Care Technology (DCCT)',
      'Diploma in Neuroscience Technology (DNT)',
      'Diploma in Respiratory Therapy (DRT)',
      'Diploma in Emergency & Trauma Care Technology',
      'Diploma in ECG Technology',
      'Diploma in Blood Bank Technology (DBBT)',
      'Diploma in Clinical Research (DCR)',
      'Diploma in Nutrition & Dietetics (DND)',
      'Diploma in Public Health (DPH)',
      'Diploma in Health Information Management',
      'General Nursing & Midwifery (GNM)',
      'Auxiliary Nurse Midwife (ANM)',
      'Diploma in Pharmacy (D.Pharm)',
      'Diploma in Physiotherapy',
      'Diploma in Optometry',
      'Diploma in Dental Hygiene',
      'Diploma in Medical Record Technology',
      'Diploma in Hospital Administration'
    ],
    desc: 'Medical and paramedical diplomas for healthcare sector careers',
    duration: '1-3 years depending on course',
    eligibility: '10th/12th pass with Science background'
  },

  'ITI Trades': {
    courses: [
      'Electrician',
      'Fitter', 
      'Machinist',
      'Motor Mechanic Vehicle',
      'Welder',
      'Turner',
      'Plumber',
      'Carpenter',
      'Mason',
      'Painter',
      'Electronics Mechanic',
      'Computer Operator & Programming Assistant (COPA)',
      'Information Technology & Electronics System Maintenance (ITES)',
      'Refrigeration & Air Conditioning Technician',
      'Diesel Mechanic',
      'Automobile Technician',
      'Draughtsman Mechanical',
      'Draughtsman Civil',
      'Surveyor',
      'Architectural Draughtsman',
      'Tool & Die Maker',
      'Foundry Man',
      'Pattern Maker',
      'Moulder',
      'Sheet Metal Worker',
      'Boiler Operator',
      'Lift & Escalator Mechanic',
      'Medical Electronics',
      'Hospital House Keeping',
      'Catering & Hospitality Assistant',
      'Food Production',
      'Baker & Confectioner',
      'Cutting & Sewing',
      'Embroidery & Needle Work',
      'Fashion Design & Technology',
      'Hair & Skin Care',
      'Cosmetology',
      'Stenographer',
      'Secretarial Practice',
      'Desktop Publishing Operator',
      'Multimedia Animation & Special Effects',
      'Web Designing & Computer Graphics',
      'Digital Photographer',
      'Videography',
      'Sound Engineering',
      'Interior Decoration & Designing'
    ],
    desc: 'Industrial Training Institute trades for skilled technical jobs',
    duration: '6 months to 2 years',
    eligibility: '8th/10th pass depending on trade'
  },

  'Design & Arts': {
    courses: [
      'Diploma in Fashion Design',
      'Diploma in Interior Design',
      'Diploma in Graphic Design',
      'Diploma in Animation & VFX',
      'Diploma in Multimedia',
      'Diploma in Web Design',
      'Diploma in Photography',
      'Diploma in Videography',
      'Diploma in Film Making',
      'Diploma in Fine Arts',
      'Diploma in Applied Arts',
      'Diploma in Commercial Art',
      'Diploma in Textile Design',
      'Diploma in Jewelry Design',
      'Diploma in Product Design',
      'Diploma in UI/UX Design',
      'Diploma in Game Design',
      'Diploma in 3D Animation',
      'Diploma in Digital Arts',
      'Diploma in Advertising Design'
    ],
    desc: 'Creative design and arts diplomas for artistic careers',
    duration: '1-3 years',
    eligibility: '10th/12th pass, portfolio may be required'
  },

  'Business/Management': {
    courses: [
      'Diploma in Business Management',
      'Diploma in Retail Management',
      'Diploma in Marketing',
      'Diploma in Human Resource Management',
      'Diploma in Banking & Finance',
      'Diploma in Insurance',
      'Diploma in Export-Import Management',
      'Diploma in Supply Chain Management',
      'Diploma in Event Management',
      'Diploma in Hotel Management',
      'Diploma in Tourism Management',
      'Diploma in Travel & Tourism',
      'Diploma in Hospitality Management',
      'Diploma in Food & Beverage Service',
      'Diploma in Housekeeping',
      'Diploma in Front Office Operations',
      'Diploma in Culinary Arts',
      'Diploma in Bakery & Confectionery',
      'Diploma in Food Production',
      'Diploma in Catering Technology'
    ],
    desc: 'Business and management diplomas for corporate and service sectors',
    duration: '1-2 years',
    eligibility: '10th/12th pass'
  },

  'IT & Computer': {
    courses: [
      'Diploma in Computer Applications (DCA)',
      'Diploma in Computer Science',
      'Diploma in Information Technology',
      'Diploma in Software Engineering',
      'Diploma in Web Development',
      'Diploma in Mobile App Development',
      'Diploma in Database Management',
      'Diploma in Network Administration',
      'Diploma in Cybersecurity',
      'Diploma in Ethical Hacking',
      'Diploma in Cloud Computing',
      'Diploma in Artificial Intelligence',
      'Diploma in Machine Learning',
      'Diploma in Data Science',
      'Diploma in Big Data Analytics',
      'Diploma in Blockchain Technology',
      'Diploma in IoT (Internet of Things)',
      'Diploma in Robotics',
      'Diploma in Digital Marketing',
      'Diploma in E-Commerce',
      'Diploma in SEO & SEM',
      'Diploma in Social Media Marketing',
      'Diploma in Content Writing',
      'Diploma in Graphic Design',
      'Diploma in UI/UX Design',
      'Diploma in Game Development',
      'Diploma in AR/VR Development'
    ],
    desc: 'IT and computer diplomas for technology sector careers',
    duration: '6 months to 2 years',
    eligibility: '10th/12th pass, basic computer knowledge preferred'
  },

  // Undergraduate Engineering
    // Undergraduate Engineering
  'Computer Science': {
    courses: [
      'BTech Computer Science & Engineering',
      'BTech Information Technology',
      'BTech Software Engineering',
      'BTech Artificial Intelligence',
      'BTech Machine Learning',
      'BTech Data Science',
      'BTech Cybersecurity',
      'BTech Cloud Computing',
      'BTech Blockchain Technology',
      'BTech Internet of Things (IoT)',
      'BTech Robotics & Automation',
      'BTech Computer Networks',
      'BTech Database Systems',
      'BTech Human-Computer Interaction',
      'BTech Gaming Technology',
      'BTech Virtual Reality',
      'BTech Augmented Reality',
      'BTech Quantum Computing',
      'BTech Bioinformatics',
      'BTech Computational Biology'
    ],
    desc: 'Computer science engineering for software development and IT careers',
    duration: '4 years (8 semesters)',
    eligibility: '12th with PCM, JEE Main/Advanced'
  },

  'Electronics': {
    courses: [
      'BTech Electronics & Communication Engineering',
      'BTech Electronics & Electrical Engineering',
      'BTech Electronics & Instrumentation',
      'BTech Electronics & Telecommunication',
      'BTech VLSI Design',
      'BTech Embedded Systems',
      'BTech Signal Processing',
      'BTech Microelectronics',
      'BTech Nanoelectronics',
      'BTech Optoelectronics',
      'BTech Power Electronics',
      'BTech Control Systems',
      'BTech Biomedical Electronics',
      'BTech Avionics',
      'BTech Satellite Communication',
      'BTech Wireless Communication',
      'BTech Digital Electronics',
      'BTech Analog Electronics',
      'BTech RF Engineering',
      'BTech Antenna Design'
    ],
    desc: 'Electronics engineering for communication and embedded systems',
    duration: '4 years (8 semesters)',
    eligibility: '12th with PCM, JEE Main/Advanced'
  },

  'Mechanical': {
    courses: [
      'BTech Mechanical Engineering',
      'BTech Production Engineering',
      'BTech Manufacturing Engineering',
      'BTech Industrial Engineering',
      'BTech Automobile Engineering',
      'BTech Aerospace Engineering',
      'BTech Mechatronics Engineering',
      'BTech Thermal Engineering',
      'BTech Design Engineering',
      'BTech Materials Engineering',
      'BTech Robotics Engineering',
      'BTech Marine Engineering',
      'BTech Agricultural Engineering',
      'BTech Tool Engineering',
      'BTech CAD/CAM Engineering',
      'BTech Automation Engineering',
      'BTech Energy Engineering',
      'BTech Renewable Energy',
      'BTech Nuclear Engineering',
      'BTech Petroleum Engineering'
    ],
    desc: 'Mechanical engineering for manufacturing, automotive, and design industries',
    duration: '4 years (8 semesters)',
    eligibility: '12th with PCM, JEE Main/Advanced'
  },

  'Civil': {
    courses: [
      'BTech Civil Engineering',
      'BTech Structural Engineering',
      'BTech Transportation Engineering',
      'BTech Environmental Engineering',
      'BTech Geotechnical Engineering',
      'BTech Water Resources Engineering',
      'BTech Construction Engineering',
      'BTech Urban Planning',
      'BTech Surveying Engineering',
      'BTech Highway Engineering',
      'BTech Bridge Engineering',
      'BTech Earthquake Engineering',
      'BTech Coastal Engineering',
      'BTech Mining Engineering',
      'BTech Geological Engineering',
      'BTech Remote Sensing',
      'BTech GIS Engineering',
      'BTech Building Technology',
      'BTech Infrastructure Engineering',
      'BTech Smart City Planning'
    ],
    desc: 'Civil engineering for infrastructure development and construction',
    duration: '4 years (8 semesters)',
    eligibility: '12th with PCM, JEE Main/Advanced'
  },

  'Electrical': {
    courses: [
      'BTech Electrical Engineering',
      'BTech Electrical & Electronics Engineering',
      'BTech Power Engineering',
      'BTech Power Systems',
      'BTech Electrical Machines',
      'BTech Control Systems',
      'BTech Instrumentation Engineering',
      'BTech Renewable Energy Systems',
      'BTech Smart Grid Technology',
      'BTech Electric Vehicles',
      'BTech Power Electronics',
      'BTech High Voltage Engineering',
      'BTech Electrical Drives',
      'BTech Industrial Automation',
      'BTech Energy Management',
      'BTech Solar Energy',
      'BTech Wind Energy',
      'BTech Hydroelectric Engineering',
      'BTech Nuclear Power Engineering',
      'BTech Electrical Safety'
    ],
    desc: 'Electrical engineering for power systems and electrical technology',
    duration: '4 years (8 semesters)',
    eligibility: '12th with PCM, JEE Main/Advanced'
  },

  'Chemical': {
    courses: [
      'BTech Chemical Engineering',
      'BTech Petrochemical Engineering',
      'BTech Polymer Engineering',
      'BTech Process Engineering',
      'BTech Biochemical Engineering',
      'BTech Environmental Chemical Engineering',
      'BTech Food Technology',
      'BTech Pharmaceutical Engineering',
      'BTech Materials Science',
      'BTech Nanotechnology',
      'BTech Catalysis Engineering',
      'BTech Reaction Engineering',
      'BTech Separation Processes',
      'BTech Heat Transfer',
      'BTech Mass Transfer',
      'BTech Fluid Mechanics',
      'BTech Thermodynamics',
      'BTech Chemical Process Safety',
      'BTech Industrial Chemistry',
      'BTech Green Technology'
    ],
    desc: 'Chemical engineering for process industries and chemical manufacturing',
    duration: '4 years (8 semesters)',
    eligibility: '12th with PCM, JEE Main/Advanced'
  },

  'Biotechnology': {
    courses: [
      'BTech Biotechnology',
      'BTech Biomedical Engineering',
      'BTech Genetic Engineering',
      'BTech Molecular Biology',
      'BTech Microbiology',
      'BTech Biochemical Engineering',
      'BTech Bioinformatics',
      'BTech Agricultural Biotechnology',
      'BTech Industrial Biotechnology',
      'BTech Environmental Biotechnology',
      'BTech Marine Biotechnology',
      'BTech Food Biotechnology',
      'BTech Pharmaceutical Biotechnology',
      'BTech Medical Biotechnology',
      'BTech Tissue Engineering',
      'BTech Stem Cell Technology',
      'BTech Genomics',
      'BTech Proteomics',
      'BTech Bioprocess Engineering',
      'BTech Biosafety'
    ],
    desc: 'Biotechnology engineering for biological and medical applications',
    duration: '4 years (8 semesters)',
    eligibility: '12th with PCB/PCMB, JEE Main/BITSAT'
  },

  'Aerospace': {
    courses: [
      'BTech Aerospace Engineering',
      'BTech Aeronautical Engineering',
      'BTech Avionics Engineering',
      'BTech Aircraft Maintenance',
      'BTech Rocket Engineering',
      'BTech Satellite Engineering',
      'BTech Space Technology',
      'BTech Flight Dynamics',
      'BTech Propulsion Systems',
      'BTech Aircraft Design',
      'BTech Spacecraft Design',
      'BTech Aerodynamics',
      'BTech Aircraft Structures',
      'BTech Navigation Systems',
      'BTech Radar Technology',
      'BTech Missile Technology',
      'BTech Drone Technology',
      'BTech UAV Systems',
      'BTech Air Traffic Management',
      'BTech Airport Engineering'
    ],
    desc: 'Aerospace engineering for aviation and space technology',
    duration: '4 years (8 semesters)',
    eligibility: '12th with PCM, JEE Main/Advanced'
  },

  // Medical Undergraduate
  'MBBS/BDS': {
    courses: [
      'MBBS (Bachelor of Medicine and Bachelor of Surgery)',
      'BDS (Bachelor of Dental Surgery)',
      'BAMS (Bachelor of Ayurvedic Medicine and Surgery)',
      'BHMS (Bachelor of Homeopathic Medicine and Surgery)',
      'BUMS (Bachelor of Unani Medicine and Surgery)',
      'BSMS (Bachelor of Siddha Medicine and Surgery)',
      'BNYS (Bachelor of Naturopathy and Yogic Sciences)',
      'BVSc (Bachelor of Veterinary Science)',
      'BPTH (Bachelor of Physiotherapy)',
      'BOT (Bachelor of Occupational Therapy)',
      'BASLP (Bachelor of Audiology and Speech Language Pathology)',
      'BOptom (Bachelor of Optometry)',
      'BPharma (Bachelor of Pharmacy)',
      'PharmD (Doctor of Pharmacy)',
      'BSc Nursing',
      'Post Basic BSc Nursing'
    ],
    desc: 'Primary medical degrees for healthcare professionals',
    duration: 'MBBS: 5.5 years, BDS: 5 years, Others: 4-4.5 years',
    eligibility: '12th with PCB, NEET qualification'
  },

  'MD Specializations': {
    courses: [
      'MD General Medicine',
      'MD Pediatrics',
      'MD Obstetrics and Gynecology',
      'MD Anesthesiology',
      'MD Radiodiagnosis',
      'MD Dermatology, Venereology, and Leprosy',
      'MD Psychiatry',
      'MD Emergency Medicine',
      'MD Physical Medicine and Rehabilitation',
      'MD Nuclear Medicine',
      'MD Palliative Medicine',
      'MD Pulmonary Medicine',
      'MD Pathology',
      'MD Microbiology',
      'MD Pharmacology',
      'MD Forensic Medicine and Toxicology',
      'MD Community Medicine',
      'MD Immunohematology and Blood Transfusion',
      'MD Anatomy',
      'MD Physiology',
      'MD Biochemistry',
      'MD Tropical Medicine',
      'MD Geriatric Medicine',
      'MD Sports Medicine',
      'MD Occupational Medicine'
    ],
    desc: 'Postgraduate medical specializations for advanced medical practice',
    duration: '3 years',
    eligibility: 'MBBS degree with NEET PG qualification'
  },

  'MS Specializations': {
    courses: [
      'MS General Surgery',
      'MS Orthopedics',
      'MS Ophthalmology',
      'MS ENT (Otorhinolaryngology)',
      'MS Obstetrics and Gynecology',
      'MS Anatomy',
      'MS Physiology',
      'MS Biochemistry'
    ],
    desc: 'Master of Surgery specializations for surgical practice',
    duration: '3 years',
    eligibility: 'MBBS degree with NEET PG qualification'
  },

  'Super Specialty (DM)': {
    courses: [
      'DM Cardiology',
      'DM Neurology',
      'DM Nephrology',
      'DM Endocrinology',
      'DM Medical Gastroenterology',
      'DM Hepatology',
      'DM Pulmonary Medicine',
      'DM Rheumatology',
      'DM Clinical Hematology',
      'DM Medical Oncology',
      'DM Pediatric Oncology',
      'DM Geriatric Medicine',
      'DM Critical Care Medicine',
      'DM Pain Medicine',
      'DM Palliative Medicine',
      'DM Neuroimaging and Interventional Neuroradiology',
      'DM Interventional Radiology',
      'DM Neonatology',
      'DM Pediatric Cardiology',
      'DM Pediatric Neurology',
      'DM Pediatric Nephrology',
      'DM Infectious Diseases',
      'DM Clinical Pharmacology',
      'DM Immunology',
      'DM Allergy and Clinical Immunology',
      'DM Advanced Imaging',
      'DM Cardiac Electrophysiology',
      'DM Transfusion Medicine'
    ],
    desc: 'Super-specialty medical degrees for advanced subspecialty practice',
    duration: '3 years',
    eligibility: 'MD/MS degree with NEET SS qualification'
  },

  'Super Specialty (MCh)': {
    courses: [
      'MCh Neurosurgery',
      'MCh Urology',
      'MCh Plastic and Reconstructive Surgery',
      'MCh Pediatric Surgery',
      'MCh Surgical Gastroenterology',
      'MCh Surgical Oncology',
      'MCh Vascular Surgery',
      'MCh Cardiothoracic and Vascular Surgery',
      'MCh Endocrine Surgery',
      'MCh Hepato-Pancreato-Biliary Surgery',
      'MCh Hand and Microsurgery',
      'MCh Reproductive Medicine and Surgery',
      'MCh Colorectal Surgery',
      'MCh Minimal Access Surgery',
      'MCh Burn Surgery',
      'MCh Trauma Surgery',
      'MCh Spine Surgery',
      'MCh Oral and Maxillofacial Surgery'
    ],
    desc: 'Super-specialty surgical degrees for advanced surgical subspecialties',
    duration: '3 years',
    eligibility: 'MS degree with NEET SS qualification'
  },

  'AYUSH': {
    courses: [
      'MD Ayurveda - Kayachikitsa',
      'MD Ayurveda - Panchakarma',
      'MD Ayurveda - Dravyaguna',
      'MD Ayurveda - Rasashastra and Bhaishajya Kalpana',
      'MD Ayurveda - Kaumarabhritya',
      'MD Ayurveda - Shalya Tantra',
      'MD Ayurveda - Shalakya Tantra',
      'MD Ayurveda - Prasuti Tantra',
      'MD Ayurveda - Swasthavritta',
      'MD Homeopathy - Materia Medica',
      'MD Homeopathy - Organon of Medicine',
      'MD Homeopathy - Repertory',
      'MD Homeopathy - Practice of Medicine',
      'MD Homeopathy - Pediatrics',
      'MD Homeopathy - Psychiatry',
      'MD Unani - Moalijat',
      'MD Unani - Ilmul Advia',
      'MD Unani - Tahaffuzi wa Samaji Tib',
      'MD Unani - Jarahiyat',
      'MD Siddha - Maruthuvam',
      'MD Siddha - Gunapadam',
      'MD Siddha - Noi Nadal',
      'MD Yoga and Naturopathy',
      'PhD Ayurveda',
      'PhD Homeopathy',
      'PhD Unani',
      'PhD Siddha',
      'PhD Yoga and Naturopathy'
    ],
    desc: 'AYUSH medical systems and alternative medicine specializations',
    duration: '3 years for MD, 3-5 years for PhD',
    eligibility: 'BAMS/BHMS/BUMS/BSMS/BNYS degree'
  },

  'Nursing': {
    courses: [
      'MSc Nursing - Medical-Surgical Nursing',
      'MSc Nursing - Pediatric Nursing',
      'MSc Nursing - Obstetrics and Gynecological Nursing',
      'MSc Nursing - Psychiatric Nursing',
      'MSc Nursing - Community Health Nursing',
      'MSc Nursing - Critical Care Nursing',
      'MSc Nursing - Oncology Nursing',
      'MSc Nursing - Cardiothoracic Nursing',
            'MSc Nursing - Cardiothoracic Nursing',
      'MSc Nursing - Nephrology Nursing',
      'MSc Nursing - Neuroscience Nursing',
      'MSc Nursing - Emergency Nursing',
      'MSc Nursing - Geriatric Nursing',
      'MSc Nursing - Infection Control Nursing',
      'MSc Nursing - Nursing Administration',
      'MSc Nursing - Nursing Education',
      'PhD Nursing',
      'Post Basic BSc Nursing',
      'BSc Nursing (Post Certificate)',
      'Diploma in Critical Care Nursing',
      'Diploma in Cardiac Nursing',
      'Diploma in Dialysis Technology',
      'Diploma in Operation Theatre Technology',
      'Certificate in ICU Nursing',
      'Certificate in Emergency Nursing'
    ],
    desc: 'Nursing education for healthcare and patient care',
    duration: 'BSc: 4 years, MSc: 2 years, PhD: 3-5 years',
    eligibility: 'BSc Nursing for MSc, MSc for PhD'
  },

  'Pharmacy': {
    courses: [
      'MPharm - Pharmaceutics',
      'MPharm - Pharmacology',
      'MPharm - Pharmaceutical Chemistry',
      'MPharm - Pharmacognosy',
      'MPharm - Pharmaceutical Biotechnology',
      'MPharm - Pharmaceutical Analysis',
      'MPharm - Industrial Pharmacy',
      'MPharm - Quality Assurance',
      'MPharm - Regulatory Affairs',
      'MPharm - Clinical Pharmacy',
      'MPharm - Hospital Pharmacy',
      'MPharm - Community Pharmacy',
      'MPharm - Pharmaceutical Marketing',
      'PhD Pharmacy',
      'PharmD (Post Baccalaureate)',
      'Diploma in Clinical Research',
      'Diploma in Drug Regulatory Affairs',
      'Certificate in Good Manufacturing Practices',
      'Certificate in Pharmacovigilance'
    ],
    desc: 'Pharmacy education for pharmaceutical industry and clinical practice',
    duration: 'MPharm: 2 years, PhD: 3-5 years, PharmD: 3 years',
    eligibility: 'BPharm/PharmD for MPharm, MPharm for PhD'
  },

  'Allied Health': {
    courses: [
      'MSc Medical Laboratory Technology',
      'MSc Radiology and Imaging Technology',
      'MSc Operation Theatre Technology',
      'MSc Anesthesia Technology',
      'MSc Dialysis Therapy Technology',
      'MSc Perfusion Technology',
      'MSc Cardiac Care Technology',
      'MSc Neuroscience Technology',
      'MSc Respiratory Therapy',
      'MSc Emergency and Trauma Care',
      'MSc Clinical Research',
      'MSc Physician Assistant Studies',
      'MSc Health Information Management',
      'MSc Nuclear Medicine Technology',
      'MSc Radiotherapy Technology',
      'MOptom - Master of Optometry',
      'MPT Orthopedics',
      'MPT Neurology',
      'MPT Cardio-Pulmonary Sciences',
      'MPT Sports Physiotherapy',
      'MPT Pediatrics',
      'MPT Community Health Physiotherapy',
      'PhD Physiotherapy',
      'MOT - Master of Occupational Therapy',
      'MASLP - Master of Audiology and Speech-Language Pathology',
      'MSc Forensic Science',
      'MSc Biomedical Science',
      'MSc Genetics',
      'MSc Microbiology',
      'MSc Biotechnology',
      'MSc Biochemistry',
      'MSc Molecular Biology',
      'MSc Immunology',
      'MSc Neuroscience',
      'MSc Public Health',
      'MPH - Master of Public Health',
      'MSc Nutrition & Dietetics',
      'MSc Clinical Nutrition',
      'MSc Epidemiology'
    ],
    desc: 'Allied health sciences for specialized healthcare support roles',
    duration: '2 years for MSc, 3-5 years for PhD',
    eligibility: 'Relevant bachelor degree in allied health sciences'
  },

  // Law
  'LLB (3 Year)': {
    courses: [
      'LLB General',
      'LLB Corporate Law',
      'LLB Criminal Law',
      'LLB Constitutional Law',
      'LLB International Law',
      'LLB Environmental Law',
      'LLB Human Rights Law',
      'LLB Intellectual Property Law',
      'LLB Taxation Law',
      'LLB Banking Law',
      'LLB Insurance Law',
      'LLB Labour Law',
      'LLB Family Law',
      'LLB Property Law',
      'LLB Commercial Law',
      'LLB Administrative Law',
      'LLB Cyber Law',
      'LLB Media Law',
      'LLB Sports Law',
      'LLB Aviation Law'
    ],
    desc: 'Three-year law degree for graduates from any discipline',
    duration: '3 years (6 semesters)',
    eligibility: 'Graduation in any discipline'
  },

  'Integrated Law (5 Year)': {
    courses: [
      'BA LLB',
      'BCom LLB',
      'BBA LLB',
      'BSc LLB',
      'BTech LLB',
      'BCA LLB',
      'BA LLB (Hons)',
      'BCom LLB (Hons)',
      'BBA LLB (Hons)',
      'BA LLB Corporate Law',
      'BCom LLB Taxation',
      'BBA LLB Business Law',
      'BA LLB Constitutional Law',
      'BA LLB International Law',
      'BCom LLB Banking Law',
      'BBA LLB Corporate Governance'
    ],
    desc: 'Five-year integrated law programs combining undergraduate and law studies',
    duration: '5 years (10 semesters)',
    eligibility: '12th pass, CLAT qualification'
  },

  'LLM': {
    courses: [
      'LLM Constitutional Law',
      'LLM Criminal Law',
      'LLM Corporate Law',
      'LLM International Law',
      'LLM Human Rights Law',
      'LLM Environmental Law',
      'LLM Intellectual Property Law',
      'LLM Taxation Law',
      'LLM Banking Law',
      'LLM Insurance Law',
      'LLM Labour Law',
      'LLM Family Law',
      'LLM Property Law',
      'LLM Commercial Law',
      'LLM Administrative Law',
      'LLM Cyber Law',
      'LLM Media Law',
      'LLM Sports Law',
      'LLM Aviation Law',
      'LLM Maritime Law',
      'LLM Space Law',
      'LLM Energy Law',
      'LLM Competition Law',
      'LLM Securities Law',
      'LLM International Trade Law',
      'LLM Comparative Law',
      'LLM Jurisprudence',
      'LLM Legal Theory'
    ],
    desc: 'Master of Law for specialized legal practice and research',
    duration: '1-2 years',
    eligibility: 'LLB degree'
  },

  'Specialized Law': {
    courses: [
      'PG Diploma in Cyber Law',
      'PG Diploma in Intellectual Property Rights',
      'PG Diploma in Human Rights',
      'PG Diploma in International Law',
      'PG Diploma in Corporate Governance',
      'PG Diploma in Taxation Law',
      'PG Diploma in Banking Law',
      'PG Diploma in Insurance Law',
      'PG Diploma in Labour Law',
      'PG Diploma in Environmental Law',
      'Certificate in Corporate Law',
      'Certificate in Criminal Law',
      'Certificate in Family Law',
      'Certificate in Property Law',
      'Certificate in Contract Law',
      'Certificate in Tort Law',
      'Certificate in Evidence Law',
      'Certificate in Civil Procedure',
      'Certificate in Criminal Procedure',
      'Certificate in Legal Writing'
    ],
    desc: 'Specialized legal certifications and diplomas',
    duration: '6 months to 1 year',
    eligibility: 'LLB degree or graduation for some courses'
  },

  'Legal Certifications': {
    courses: [
      'Certificate in Legal Research',
      'Certificate in Legal Documentation',
      'Certificate in Court Procedures',
      'Certificate in Alternative Dispute Resolution',
      'Certificate in Mediation',
      'Certificate in Arbitration',
      'Certificate in Negotiation Skills',
      'Certificate in Legal Ethics',
      'Certificate in Professional Responsibility',
      'Certificate in Client Counseling',
      'Certificate in Trial Advocacy',
      'Certificate in Moot Court',
      'Certificate in Legal Aid',
      'Certificate in Public Interest Law',
      'Certificate in Legal Journalism',
      'Certificate in Law Firm Management',
      'Certificate in Legal Technology',
      'Certificate in E-Discovery',
      'Certificate in Compliance Management',
      'Certificate in Risk Assessment'
    ],
    desc: 'Professional certifications for legal practice enhancement',
    duration: '3-6 months',
    eligibility: 'Law students or LLB graduates'
  },

  // Management
  'MBA General': {
    courses: [
      'MBA General Management',
      'MBA Finance',
      'MBA Marketing',
      'MBA Human Resources',
      'MBA Operations Management',
      'MBA Supply Chain Management',
      'MBA International Business',
      'MBA Information Technology',
      'MBA Healthcare Management',
      'MBA Hospital Administration',
      'MBA Pharmaceutical Management',
      'MBA Retail Management',
      'MBA Banking & Financial Services',
      'MBA Insurance Management',
      'MBA Investment Banking',
      'MBA Corporate Finance',
      'MBA Digital Marketing',
      'MBA Brand Management',
      'MBA Sales Management',
      'MBA Customer Relationship Management',
      'MBA Business Analytics',
      'MBA Data Analytics',
      'MBA Project Management',
      'MBA Quality Management',
      'MBA Strategic Management',
      'MBA Entrepreneurship',
      'MBA Family Business Management',
      'MBA Non-Profit Management',
      'MBA Public Administration',
      'MBA Rural Management'
    ],
    desc: 'Master of Business Administration for management and leadership roles',
    duration: '2 years (4 semesters)',
    eligibility: 'Graduation with CAT/MAT/XAT/GMAT scores'
  },

  'MBA Specializations': {
    courses: [
      'MBA Finance & Accounting',
      'MBA Investment Management',
      'MBA Financial Planning',
      'MBA Risk Management',
      'MBA Treasury Management',
      'MBA Mergers & Acquisitions',
      'MBA Private Equity',
      'MBA Venture Capital',
      'MBA Digital Marketing & E-Commerce',
      'MBA Social Media Marketing',
      'MBA Content Marketing',
      'MBA Performance Marketing',
      'MBA Marketing Research',
      'MBA Consumer Behavior',
      'MBA Talent Management',
      'MBA Organizational Development',
      'MBA Industrial Relations',
      'MBA Compensation Management',
      'MBA Training & Development',
      'MBA Leadership Development',
      'MBA Production Management',
      'MBA Logistics Management',
      'MBA Procurement Management',
      'MBA Inventory Management',
      'MBA Lean Management',
      'MBA Six Sigma',
      'MBA Technology Management',
      'MBA Innovation Management',
      'MBA Product Management',
      'MBA Service Management'
    ],
    desc: 'Specialized MBA programs for focused career development',
    duration: '2 years (4 semesters)',
    eligibility: 'Graduation with entrance exam scores'
  },

  'BBA': {
    courses: [
      'BBA General',
      'BBA Finance',
      'BBA Marketing',
      'BBA Human Resources',
      'BBA Operations',
      'BBA International Business',
      'BBA Information Technology',
      'BBA E-Commerce',
      'BBA Digital Marketing',
      'BBA Retail Management',
      'BBA Banking & Insurance',
      'BBA Event Management',
      'BBA Hotel Management',
      'BBA Tourism Management',
      'BBA Aviation Management',
      'BBA Healthcare Management',
      'BBA Sports Management',
      'BBA Media Management',
      'BBA Entertainment Management',
      'BBA Fashion Management',
      'BBA Supply Chain Management',
      'BBA Logistics Management',
      'BBA Entrepreneurship',
      'BBA Family Business',
      'BBA Rural Management',
      'BBA Cooperative Management',
      'BBA Non-Profit Management',
      'BBA Public Administration',
      'BBA Corporate Governance',
      'BBA Business Analytics'
    ],
    desc: 'Bachelor of Business Administration for business and management careers',
    duration: '3 years (6 semesters)',
    eligibility: '12th pass from any stream'
  },

  'Commerce Advanced': {
    courses: [
      'BCom General',
      'BCom (Hons)',
      'BCom Accounting & Finance',
      'BCom Banking & Insurance',
      'BCom Taxation',
      'BCom Corporate Secretaryship',
      'BCom Cost Accounting',
      'BCom Management Accounting',
      'BCom Financial Markets',
      'BCom International Finance',
      'BCom E-Commerce',
      'BCom Computer Applications',
      'BCom Business Process Outsourcing',
      'BCom Foreign Trade',
      'BCom Logistics',
      'BCom Travel & Tourism',
      'BCom Hotel Management',
      'BCom Event Management',
      'BCom Retail Management',
      'BCom Advertising & Sales Promotion',
      'BCom Marketing',
      'BCom Human Resource Management',
      'BCom Industrial Relations',
      'BCom Cooperative Management',
      'BCom Rural Development',
      'BCom Micro Finance',
      'BCom Entrepreneurship Development',
      'BCom Business Economics',
      'BCom Statistics',
      'BCom Mathematics'
    ],
    desc: 'Bachelor of Commerce for business, finance, and accounting careers',
    duration: '3 years (6 semesters)',
    eligibility: '12th pass, preferably Commerce stream'
  },

  'Professional Certifications': {
    courses: [
      'CA - Chartered Accountant',
      'CS - Company Secretary',
      'CMA - Cost & Management Accountant',
      'CFP - Certified Financial Planner',
      'CFA - Chartered Financial Analyst',
      'FRM - Financial Risk Manager',
      'PMP - Project Management Professional',
      'PRINCE2 - Project Management',
      'Six Sigma Green Belt',
      'Six Sigma Black Belt',
      'Lean Management Certification',
      'Agile Project Management',
      'Scrum Master Certification',
      'Digital Marketing Certification',
      'Google Analytics Certification',
      'Google Ads Certification',
      'Facebook Marketing Certification',
      'HubSpot Marketing Certification',
      'Salesforce Certification',
      'SAP Certification',
      'Oracle Certification',
      'Microsoft Certification',
      'AWS Certification',
      'Azure Certification',
      'Google Cloud Certification',
      'CISSP - Information Security',
      'CISA - Information Systems Audit',
      'CISM - Information Security Management',
      'CEH - Certified Ethical Hacker',
      'ITIL - IT Service Management'
    ],
    desc: 'Professional certifications for career advancement',
    duration: '3 months to 3 years depending on certification',
    eligibility: 'Varies by certification'
  },

  // Architecture
  'Architecture': {
    courses: [
      'BArch - Bachelor of Architecture',
      'MArch - Master of Architecture',
      'MArch Urban Design',
      'MArch Landscape Architecture',
      'MArch Housing',
      'MArch Building Engineering & Management',
      'MArch Environmental Architecture',
      'MArch Digital Architecture',
      'MArch Sustainable Architecture',
      'MArch Conservation Architecture',
      'BPlan - Bachelor of Planning',
            'MPlan - Master of Planning',
      'MPlan Urban Planning',
      'MPlan Regional Planning',
      'MPlan Transport Planning',
      'MPlan Environmental Planning',
      'MPlan Housing & Development',
      'MPlan Infrastructure Planning',
      'MPlan Smart Cities',
      'Diploma in Interior Design',
      'Diploma in Landscape Architecture',
      'Diploma in Urban Design',
      'Certificate in Architectural Drafting',
      'Certificate in Building Information Modeling (BIM)',
      'Certificate in Green Building Design',
      'Certificate in Heritage Conservation',
      'Certificate in Construction Management',
      'Certificate in Real Estate Development',
      'Certificate in Project Planning',
      'Certificate in Quantity Surveying',
      'Certificate in Structural Design'
    ],
    desc: 'Architecture and planning for building design and urban development',
    duration: 'BArch: 5 years, MArch: 2 years, BPlan: 4 years, MPlan: 2 years',
    eligibility: '12th with PCM for BArch, BArch for MArch'
  },

  // Arts & Design
  'Fine Arts': {
    courses: [
      'BFA Painting',
      'BFA Sculpture',
      'BFA Applied Arts',
      'BFA Printmaking',
      'BFA Photography',
      'BFA Ceramics',
      'BFA Textile Design',
      'BFA Graphics',
      'BFA Animation',
      'BFA Digital Arts',
      'MFA Painting',
      'MFA Sculpture',
      'MFA Applied Arts',
      'MFA Printmaking',
      'MFA Photography',
      'MFA Art History',
      'MFA Art Criticism',
      'MFA Museum Studies',
      'MFA Gallery Management',
      'MFA Art Therapy',
      'Diploma in Commercial Art',
      'Diploma in Graphic Design',
      'Diploma in Web Design',
      'Diploma in UI/UX Design',
      'Diploma in Game Art',
      'Diploma in Concept Art',
      'Diploma in Storyboarding',
      'Diploma in Character Design',
      'Certificate in Digital Painting',
      'Certificate in 3D Modeling'
    ],
    desc: 'Fine arts education for creative and artistic careers',
    duration: 'BFA: 4 years, MFA: 2 years, Diploma: 1-2 years',
    eligibility: '12th pass, portfolio and entrance test'
  },

  'Design': {
    courses: [
      'BDes Fashion Design',
      'BDes Product Design',
      'BDes Graphic Design',
      'BDes Interior Design',
      'BDes Textile Design',
      'BDes Jewelry Design',
      'BDes Furniture Design',
      'BDes Automotive Design',
      'BDes Communication Design',
      'BDes Interaction Design',
      'BDes User Experience Design',
      'BDes Game Design',
      'BDes Animation Design',
      'BDes Film & Video Design',
      'BDes Exhibition Design',
      'MDes Fashion Design',
      'MDes Product Design',
      'MDes Graphic Design',
      'MDes Interior Design',
      'MDes Design Research',
      'MDes Design Management',
      'MDes Sustainable Design',
      'MDes Innovation Design',
      'Diploma in Fashion Technology',
      'Diploma in Leather Design',
      'Diploma in Accessory Design',
      'Diploma in Footwear Design',
      'Diploma in Knitwear Design',
      'Diploma in Surface Design',
      'Diploma in Pattern Making'
    ],
    desc: 'Design education for creative industries and product development',
    duration: 'BDes: 4 years, MDes: 2 years, Diploma: 1-3 years',
    eligibility: '12th pass, design aptitude test, portfolio'
  },

  'Performing Arts': {
    courses: [
      'BA Music',
      'BA Dance',
      'BA Theater',
      'BA Drama',
      'BA Performing Arts',
      'BA Film Studies',
      'BA Television Production',
      'BA Radio Production',
      'BA Sound Engineering',
      'BA Music Production',
      'MA Music',
      'MA Dance',
      'MA Theater',
      'MA Drama',
      'MA Performing Arts',
      'MA Film Studies',
      'MA Cinema Studies',
      'MA Media Studies',
      'Diploma in Music',
      'Diploma in Dance',
      'Diploma in Theater',
      'Diploma in Acting',
      'Diploma in Direction',
      'Diploma in Cinematography',
      'Diploma in Film Editing',
      'Diploma in Sound Design',
      'Diploma in Music Composition',
      'Certificate in Voice Training',
      'Certificate in Instrument Training',
      'Certificate in Stage Craft'
    ],
    desc: 'Performing arts for entertainment and cultural industries',
    duration: 'BA/MA: 3/2 years, Diploma: 1-2 years, Certificate: 6 months-1 year',
    eligibility: '12th pass, audition/practical test'
  },

  'Media & Communication': {
    courses: [
      'BA Mass Communication',
      'BA Journalism',
      'BA Advertising',
      'BA Public Relations',
      'BA Digital Media',
      'BA Social Media',
      'BA Content Writing',
      'BA Broadcast Journalism',
      'BA Print Journalism',
      'BA Online Journalism',
      'BA Photojournalism',
      'BA Video Journalism',
      'BA Radio Jockeying',
      'BA Television Anchoring',
      'MA Mass Communication',
      'MA Journalism',
      'MA Advertising',
      'MA Public Relations',
      'MA Digital Media',
      'MA Film & Television',
      'MA Documentary Film Making',
      'MA Media Management',
      'MA Communication Research',
      'PG Diploma in Journalism',
      'PG Diploma in Mass Communication',
      'PG Diploma in Digital Marketing',
      'PG Diploma in Public Relations',
      'PG Diploma in Event Management',
      'Certificate in Content Writing',
      'Certificate in Copywriting'
    ],
    desc: 'Media and communication for journalism and digital media careers',
    duration: 'BA/MA: 3/2 years, PG Diploma: 1 year, Certificate: 3-6 months',
    eligibility: '12th pass for BA, graduation for MA/PG Diploma'
  },

  'Fashion Design': {
    courses: [
      'BDes Fashion Design',
      'BDes Fashion Communication',
      'BDes Fashion & Lifestyle Accessories',
      'BDes Knitwear Design',
      'BDes Textile Design',
      'BDes Leather Design',
      'BDes Footwear Design & Development',
      'MDes Fashion Design',
      'MDes Fashion Management',
      'MDes Fashion Technology',
      'MDes Luxury Brand Management',
      'Diploma in Fashion Design',
      'Diploma in Fashion Styling',
      'Diploma in Fashion Photography',
      'Diploma in Fashion Merchandising',
      'Diploma in Fashion Marketing',
      'Diploma in Pattern Making',
      'Diploma in Garment Manufacturing',
      'Diploma in Fashion Illustration',
      'Diploma in Costume Design',
      'Diploma in Fashion Journalism',
      'Certificate in Fashion Sketching',
      'Certificate in Draping',
      'Certificate in Embroidery',
      'Certificate in Surface Ornamentation',
      'Certificate in Fashion Buying',
      'Certificate in Visual Merchandising',
      'Certificate in Fashion Retail',
      'Certificate in Fashion Entrepreneurship',
      'Certificate in Sustainable Fashion',
      'Certificate in Fashion Technology'
    ],
    desc: 'Fashion design and technology for apparel and lifestyle industries',
    duration: 'BDes: 4 years, MDes: 2 years, Diploma: 1-3 years, Certificate: 3-12 months',
    eligibility: '12th pass, design aptitude test, portfolio'
  },

  // Computer Applications & IT
  'Computer Applications': {
    courses: [
      'BCA - Bachelor of Computer Applications',
      'BCA Cloud Computing',
      'BCA Data Science',
      'BCA Artificial Intelligence',
      'BCA Machine Learning',
      'BCA Cybersecurity',
      'BCA Mobile Application Development',
      'BCA Web Development',
      'BCA Game Development',
      'BCA Digital Marketing',
      'MCA - Master of Computer Applications',
      'MCA Software Engineering',
      'MCA Data Science & Analytics',
      'MCA Artificial Intelligence',
      'MCA Machine Learning',
      'MCA Cybersecurity',
      'MCA Cloud Computing',
      'MCA Mobile Computing',
      'MCA Web Technologies',
      'MCA Database Management',
      'MCA Network Security',
      'MCA Software Testing',
      'MCA System Administration',
      'MCA IT Project Management',
      'PG Diploma in Computer Applications',
      'PG Diploma in Software Development',
      'PG Diploma in Web Development',
      'PG Diploma in Mobile App Development',
      'PG Diploma in Data Science',
      'PG Diploma in AI & ML'
    ],
    desc: 'Computer applications for software development and IT careers',
    duration: 'BCA: 3 years, MCA: 2-3 years, PG Diploma: 1 year',
    eligibility: '12th with Maths for BCA, BCA/BSc for MCA'
  },

  // Agriculture & Related
  'Agriculture': {
    courses: [
      'BSc Agriculture',
      'BSc Horticulture',
      'BSc Forestry',
      'BSc Fishery Science',
      'BSc Dairy Technology',
      'BSc Food Technology',
      'BSc Seed Technology',
      'BSc Plant Pathology',
      'BSc Entomology',
      'BSc Soil Science',
      'BSc Agricultural Economics',
      'BSc Agricultural Extension',
      'BSc Agricultural Engineering',
      'BSc Biotechnology',
      'BSc Environmental Science',
      'MSc Agriculture',
      'MSc Horticulture',
      'MSc Forestry',
      'MSc Fishery Science',
      'MSc Food Technology',
      'MSc Agricultural Economics',
      'MSc Plant Breeding',
      'MSc Genetics',
      'MSc Agronomy',
      'MSc Soil Science',
      'MSc Plant Pathology',
      'MSc Entomology',
      'MSc Agricultural Extension',
      'PG Diploma in Agribusiness',
      'PG Diploma in Organic Farming',
      'Certificate in Sustainable Agriculture',
      'Certificate in Precision Farming',
      'Certificate in Greenhouse Technology',
      'Certificate in Mushroom Cultivation',
      'Certificate in Beekeeping',
      'Certificate in Poultry Management',
      'Certificate in Dairy Management',
      'Certificate in Fish Farming',
      'Certificate in Vermicomposting',
      'Certificate in Hydroponics'
    ],
    desc: 'Agriculture and allied sciences for farming and food production',
    duration: 'BSc: 4 years, MSc: 2 years, PG Diploma: 1 year, Certificate: 3-6 months',
    eligibility: '12th with PCB/PCM for BSc, BSc Agriculture for MSc'
  },

  // Education & Teaching
  'Education': {
    courses: [
      'BEd - Bachelor of Education',
      'BEd Elementary Education',
      'BEd Secondary Education',
      'BEd Special Education',
      'BEd Physical Education',
      'BEd Computer Science Education',
      'BEd Mathematics Education',
      'BEd Science Education',
      'BEd English Education',
      'BEd Social Science Education',
      'MEd - Master of Education',
      'MEd Educational Psychology',
      'MEd Educational Administration',
      'MEd Curriculum & Instruction',
      'MEd Educational Technology',
      'MEd Guidance & Counseling',
      'MEd Special Education',
      'MEd Adult Education',
      'MEd Distance Education',
      'MEd Comparative Education',
      'PhD Education',
      'Diploma in Elementary Education (DEd)',
      'Diploma in Special Education',
      'Diploma in Early Childhood Education',
      'Diploma in Adult Education',
      'PG Diploma in Educational Technology',
      'PG Diploma in Guidance & Counseling',
      'PG Diploma in Educational Management',
      'Certificate in Teacher Training',
      'Certificate in Educational Psychology',
      'Certificate in Classroom Management',
      'Certificate in Assessment & Evaluation',
      'Certificate in Educational Research',
      'Certificate in Inclusive Education',
      'Certificate in Digital Teaching',
      'Certificate in Online Teaching',
      'Certificate in Montessori Education',
      'Certificate in Waldorf Education',
      'Certificate in Play-based Learning',
      'Certificate in STEM Education'
    ],
    desc: 'Education and teaching for academic and training careers',
    duration: 'BEd: 2 years, MEd: 2 years, PhD: 3-5 years, Diploma: 1-2 years',
    eligibility: 'Graduation for BEd, BEd for MEd'
  },

  // Hospitality & Tourism
  'Hospitality': {
    courses: [
      'BHM - Bachelor of Hotel Management',
      'BHM Hotel Administration',
      'BHM Culinary Arts',
      'BHM Food & Beverage Service',
      'BHM Front Office Operations',
      'BHM Housekeeping Operations',
      'BHM Event Management',
      'BHM Catering Technology',
      'BTTM - Bachelor of Travel & Tourism Management',
      'BTTM Tourism Studies',
      'BTTM Adventure Tourism',
      'BTTM Eco-Tourism',
      'BTTM Cultural Tourism',
      'BTTM Medical Tourism',
      'MHM - Master of Hotel Management',
      'MHM Hospitality Administration',
      'MHM Food Service Management',
      'MHM Revenue Management',
      'MHM Hospitality Marketing',
      'MTM - Master of Tourism Management',
      'MTM Sustainable Tourism',
      'MTM Tourism Planning',
      'MTM Heritage Tourism',
      'MBA Tourism & Hospitality',
      'MBA Hotel Management',
      'MBA Event Management',
      'Diploma in Hotel Management',
      'Diploma in Culinary Arts',
      'Diploma in Food Production',
      'Diploma in Bakery & Confectionery',
      'Diploma in Food & Beverage Service',
      'Diploma in Front Office Operations',
      'Diploma in Housekeeping',
      'Diploma in Travel & Tourism',
      'Diploma in Tour Operations',
      'Diploma in Airline & Airport Management',
      'Diploma in Cruise Management',
      'Certificate in Hospitality Operations',
      'Certificate in Restaurant Management',
      'Certificate in Bar Operations'
    ],
    desc: 'Hospitality and tourism for service industry careers',
    duration: 'Bachelor: 3-4 years, Master: 2 years, Diploma: 1-3 years, Certificate: 3-12 months',
    eligibility: '12th pass for Bachelor, graduation for Master'
  },

  // Sports & Physical Education
  'Sports': {
    courses: [
      'BSc Physical Education',
      'BSc Sports Science',
      'BSc Exercise Science',
      'BSc Kinesiology',
      'BSc Sports Management',
      'BSc Sports Psychology',
      'BSc Sports Nutrition',
      'BSc Sports Medicine',
      'BSc Recreation & Leisure',
      'BSc Adventure Sports',
      'MSc Physical Education',
      'MSc Sports Science',
      'MSc Exercise Physiology',
      'MSc Sports Psychology',
      'MSc Sports Management',
      'MSc Sports Nutrition',
      'MSc Sports Medicine',
      'MSc Sports Biomechanics',
      'MSc Adapted Physical Education',
      'MSc Sports Coaching',
      'PG Diploma in Sports Management',
            'PG Diploma in Sports Psychology',
      'PG Diploma in Sports Nutrition',
      'PG Diploma in Sports Medicine',
      'PG Diploma in Fitness Training',
      'PG Diploma in Yoga Therapy',
      'Diploma in Physical Education',
      'Diploma in Sports Coaching',
      'Diploma in Fitness Training',
      'Diploma in Yoga & Naturopathy',
      'Diploma in Sports Management',
      'Diploma in Adventure Sports',
      'Diploma in Martial Arts',
      'Certificate in Personal Training',
      'Certificate in Aerobics & Fitness',
      'Certificate in Yoga Instruction',
      'Certificate in Sports Nutrition',
      'Certificate in Sports Psychology',
      'Certificate in Sports Massage',
      'Certificate in Athletic Training',
      'Certificate in Strength & Conditioning',
      'Certificate in Sports Officiating',
      'Certificate in Sports Event Management',
      'Certificate in Sports Marketing',
      'Certificate in Sports Journalism',
      'Certificate in Sports Photography'
    ],
    desc: 'Sports and physical education for fitness and sports industry careers',
    duration: 'BSc: 3 years, MSc: 2 years, PG Diploma: 1 year, Certificate: 3-12 months',
    eligibility: '12th pass for BSc, BSc for MSc, participation in sports preferred'
  },

  // Aviation & Aerospace
  'Aviation': {
    courses: [
      'BSc Aviation',
      'BSc Aeronautical Science',
      'BSc Aircraft Maintenance Engineering',
      'BSc Airport Management',
      'BSc Air Traffic Management',
      'BSc Airline & Airport Management',
      'BSc Aviation Operations',
      'BSc Flight Operations',
      'BSc Ground Operations',
      'BSc Cargo Management',
      'MSc Aviation Management',
      'MSc Airport Planning & Management',
      'MSc Air Transport Management',
      'MSc Aviation Safety',
      'MSc Aviation Security',
      'MBA Aviation Management',
      'MBA Airport Management',
      'MBA Airline Management',
      'Diploma in Aircraft Maintenance',
      'Diploma in Airport Ground Services',
      'Diploma in Air Traffic Control',
      'Diploma in Flight Dispatcher',
      'Diploma in Cargo Operations',
      'Diploma in Airport Security',
      'Diploma in Aviation Hospitality',
      'Commercial Pilot License (CPL)',
      'Airline Transport Pilot License (ATPL)',
      'Private Pilot License (PPL)',
      'Instrument Rating (IR)',
      'Multi-Engine Rating',
      'Flight Instructor Rating',
      'Cabin Crew Training',
      'Ground Staff Training',
      'Airport Operations Training',
      'Aviation English Proficiency',
      'Dangerous Goods Training',
      'Aircraft Dispatcher Training',
      'Air Traffic Controller Training',
      'Aviation Meteorology',
      'Aviation Law & Regulations'
    ],
    desc: 'Aviation and aerospace for airline and airport industry careers',
    duration: 'BSc: 3 years, MSc/MBA: 2 years, Pilot Training: 18-24 months, Diplomas: 6-18 months',
    eligibility: '12th with PCM for BSc, specific medical and age requirements for pilot training'
  },

  // Defence & Security
  'Defence': {
    courses: [
      'BA Defence & Strategic Studies',
      'BA Military Science',
      'BA Security Studies',
      'BA International Relations',
      'BA Geopolitics',
      'BA Conflict Resolution',
      'BA Peace Studies',
      'BA Intelligence Studies',
      'BA Homeland Security',
      'BA Border Management',
      'MA Defence & Strategic Studies',
      'MA Military History',
      'MA Security Studies',
      'MA International Security',
      'MA Counter-terrorism Studies',
      'MA Cyber Security',
      'MA Maritime Security',
      'MA Aviation Security',
      'MA Nuclear Security',
      'MA Intelligence Analysis',
      'PG Diploma in Defence Studies',
      'PG Diploma in Security Management',
      'PG Diploma in Intelligence Studies',
      'PG Diploma in Cyber Security',
      'PG Diploma in Disaster Management',
      'Diploma in Security Management',
      'Diploma in Industrial Security',
      'Diploma in Corporate Security',
      'Diploma in Event Security',
      'Diploma in VIP Protection',
      'Certificate in Security Guard Training',
      'Certificate in Bouncer Training',
      'Certificate in Fire Safety',
      'Certificate in First Aid',
      'Certificate in Emergency Response',
      'Certificate in Crisis Management',
      'Certificate in Risk Assessment',
      'Certificate in Surveillance Operations',
      'Certificate in Investigation Techniques',
      'Certificate in Forensic Science'
    ],
    desc: 'Defence and security studies for military and security sector careers',
    duration: 'BA/MA: 3/2 years, PG Diploma: 1 year, Certificate: 1-6 months',
    eligibility: '12th pass for BA, graduation for MA, physical fitness requirements'
  },

  // Environmental Sciences
  'Environmental': {
    courses: [
      'BSc Environmental Science',
      'BSc Environmental Studies',
      'BSc Ecology',
      'BSc Climate Science',
      'BSc Marine Science',
      'BSc Atmospheric Science',
      'BSc Renewable Energy',
      'BSc Sustainable Development',
      'BSc Environmental Engineering',
      'BSc Environmental Management',
      'MSc Environmental Science',
      'MSc Environmental Studies',
      'MSc Ecology & Environment',
      'MSc Climate Change',
      'MSc Environmental Chemistry',
      'MSc Environmental Biology',
      'MSc Environmental Geology',
      'MSc Environmental Economics',
      'MSc Environmental Law',
      'MSc Environmental Health',
      'MSc Pollution Control',
      'MSc Waste Management',
      'MSc Water Resource Management',
      'MSc Forest Management',
      'MSc Wildlife Management',
      'MSc Conservation Biology',
      'PG Diploma in Environmental Management',
      'PG Diploma in Environmental Impact Assessment',
      'PG Diploma in Environmental Audit',
      'PG Diploma in Pollution Control',
      'PG Diploma in Waste Management',
      'PG Diploma in Water Treatment',
      'PG Diploma in Renewable Energy',
      'Certificate in Environmental Monitoring',
      'Certificate in Environmental Compliance',
      'Certificate in Green Building',
      'Certificate in Carbon Footprint',
      'Certificate in Sustainability',
      'Certificate in Organic Farming',
      'Certificate in Biodiversity Conservation'
    ],
    desc: 'Environmental sciences for sustainability and conservation careers',
    duration: 'BSc: 3 years, MSc: 2 years, PG Diploma: 1 year, Certificate: 3-6 months',
    eligibility: '12th with PCB/PCM for BSc, BSc for MSc'
  },

  // Languages & Literature
  'Languages': {
    courses: [
      'BA English Literature',
      'BA Hindi Literature',
      'BA Sanskrit Literature',
      'BA Urdu Literature',
      'BA Tamil Literature',
      'BA Telugu Literature',
      'BA Malayalam Literature',
      'BA Kannada Literature',
      'BA Marathi Literature',
      'BA Bengali Literature',
      'BA Gujarati Literature',
      'BA Punjabi Literature',
      'BA Assamese Literature',
      'BA Odia Literature',
      'BA French Language',
      'BA German Language',
      'BA Spanish Language',
      'BA Italian Language',
      'BA Japanese Language',
      'BA Chinese Language',
      'BA Korean Language',
      'BA Arabic Language',
      'BA Persian Language',
      'BA Russian Language',
      'MA English Literature',
      'MA Hindi Literature',
      'MA Sanskrit Literature',
      'MA Comparative Literature',
      'MA Translation Studies',
      'MA Linguistics',
      'MA Applied Linguistics',
      'MA Foreign Languages',
      'MA Creative Writing',
      'MA Technical Writing',
      'PG Diploma in Translation',
      'PG Diploma in Interpretation',
      'PG Diploma in Creative Writing',
      'PG Diploma in Content Writing',
      'PG Diploma in Copy Editing',
      'Certificate in Foreign Languages',
      'Certificate in Translation',
      'Certificate in Content Writing',
      'Certificate in Technical Writing',
      'Certificate in Business Communication'
    ],
    desc: 'Languages and literature for communication and cultural careers',
    duration: 'BA/MA: 3/2 years, PG Diploma: 1 year, Certificate: 3-12 months',
    eligibility: '12th pass for BA, BA for MA'
  },

  // Social Sciences
  'Social Sciences': {
    courses: [
      'BA History',
      'BA Political Science',
      'BA Sociology',
      'BA Psychology',
      'BA Anthropology',
      'BA Geography',
      'BA Economics',
      'BA Philosophy',
      'BA Social Work',
      'BA Public Administration',
      'BA International Relations',
      'BA Development Studies',
      'BA Gender Studies',
      'BA Cultural Studies',
      'BA Area Studies',
      'BA Human Rights',
      'BA Criminology',
      'BA Archaeology',
      'MA History',
      'MA Political Science',
      'MA Sociology',
      'MA Psychology',
      'MA Anthropology',
      'MA Geography',
      'MA Economics',
      'MA Philosophy',
      'MA Social Work',
      'MA Public Administration',
      'MA International Relations',
      'MA Development Studies',
      'MA Gender Studies',
      'MA Cultural Studies',
      'MA Human Rights',
      'MA Criminology',
      'MA Archaeology',
      'MSW - Master of Social Work',
      'MSW Medical & Psychiatric Social Work',
      'MSW Community Development',
      'MSW Human Resource Management',
      'MSW Rural Development',
      'MSW Urban Development',
      'MSW Child & Family Welfare',
      'MSW Women & Development',
      'MSW Disaster Management',
      'PG Diploma in Social Work',
      'PG Diploma in Human Rights',
      'PG Diploma in Gender Studies',
      'PG Diploma in Development Studies',
      'Certificate in Counseling',
      'Certificate in Community Development',
      'Certificate in NGO Management'
    ],
    desc: 'Social sciences for research, administration, and social development careers',
    duration: 'BA/MA: 3/2 years, MSW: 2 years, PG Diploma: 1 year, Certificate: 3-6 months',
    eligibility: '12th pass for BA, BA for MA, graduation for MSW'
  },

  // Emerging Technologies
  'Emerging Tech': {
    courses: [
      'BTech Artificial Intelligence',
      'BTech Machine Learning',
      'BTech Data Science',
      'BTech Blockchain Technology',
      'BTech Internet of Things',
      'BTech Robotics Engineering',
      'BTech Quantum Computing',
      'BTech Nanotechnology',
      'BTech Renewable Energy',
      'BTech Smart Manufacturing',
      'MTech Artificial Intelligence',
      'MTech Machine Learning',
      'MTech Data Science',
      'MTech Blockchain Technology',
      'MTech IoT Systems',
      'MTech Robotics',
      'MTech Quantum Computing',
      'MTech Nanotechnology',
      'MSc Data Science',
      'MSc Artificial Intelligence',
      'MSc Machine Learning',
      'MSc Cybersecurity',
      'MSc Blockchain Technology',
      'MSc IoT & Embedded Systems',
      'MSc Robotics',
      'MSc Quantum Computing',
      'PG Diploma in Data Science',
      'PG Diploma in AI & ML',
      'PG Diploma in Blockchain',
      'PG Diploma in IoT',
      'PG Diploma in Cybersecurity',
      'PG Diploma in Cloud Computing',
      'PG Diploma in Digital Transformation',
      'Certificate in Python Programming',
      'Certificate in R Programming',
      'Certificate in Machine Learning',
      'Certificate in Deep Learning',
      'Certificate in Natural Language Processing',
      'Certificate in Computer Vision',
      'Certificate in Blockchain Development',
      'Certificate in IoT Development',
      'Certificate in Cloud Computing',
      'Certificate in DevOps',
      'Certificate in Kubernetes',
      'Certificate in Docker',
      'Certificate in Microservices',
      'Certificate in API Development',
      'Certificate in Mobile App Development',
      'Certificate in Web Development',
      'Certificate in Game Development',
      'Certificate in AR/VR Development'
    ],
    desc: 'Emerging technologies for future-ready careers in tech industry',
    duration: 'BTech/MTech: 4/2 years, MSc: 2 years, PG Diploma: 1 year, Certificate: 3-12 months',
    eligibility: '12th with PCM for BTech, BTech for MTech, graduation for MSc'
  }
};

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeStream, setActiveStream] = useState(null);
  const [activeCourse, setActiveCourse] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');

  const toggleCategory = (category) => {
    setActiveStream(null);
    setActiveCourse(null);
    setActiveCategory(activeCategory === category ? null : category);
  };

  const toggleStream = (stream) => {
    setActiveCourse(null);
    setActiveStream(activeStream === stream ? null : stream);
  };

  const toggleCourse = (course) => {
    setActiveCourse(activeCourse === course ? null : course);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const levels = ['All', 'Higher Secondary', 'Diploma', 'Undergraduate', 'Postgraduate'];
  const floatingElements = ["📚", "🎓", "💻", "🔬", "⚙️", "🏥", "⚖️", "🎨"];

  // Search functionality
  const getFilteredCategories = () => {
    return courseCategories.filter(category => {
      const matchesSearch = category.name.toLowerCase().includes(search.toLowerCase()) ||
                           category.streams.some(stream => stream.toLowerCase().includes(search.toLowerCase()));
      const matchesLevel = levelFilter === 'All' || category.name === levelFilter;
      return matchesSearch && matchesLevel;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden font-poppins select-none">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute text-2xl opacity-5 animate-bounce`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {element}
          </div>
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>

      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed bg-blue-600 ml-8 mt-5 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition z-50"
      >
        <div className="w-5 h-3 flex flex-col justify-between">
          <span className="block h-0.5 bg-white"></span>
          <span className="block h-0.5 bg-white"></span>
          <span className="block h-0.5 bg-white"></span>
        </div>
      </button>

      {/* Enhanced Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-[5.5rem] h-[90vh] w-80 bg-white/90 backdrop-blur-lg shadow-xl z-40 overflow-y-auto rounded-r-2xl border border-gray-200"
          >
            <div className="p-6">
              <div className="flex items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 ml-18 -mt-0.5">
                  Course Categories
                </h3>
              </div>

              {/* Course Categories */}
              <div className="space-y-3 mb-8">
                {courseCategories.map((category) => (
                  <motion.button
                    key={category.name}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleCategory(category.name)}
                    className={`w-full text-left py-3 px-4 font-semibold rounded-md transition-colors duration-300 ${
                      activeCategory === category.name
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </motion.button>
                ))}
              </div>

              {/* Navigation Links */}
              <div className="mt-8 space-y-4">
                <Link
                  to="/after10th/entrance"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-blue-500/20 hover:bg-blue-500/30 text-black-200 text-center transition backdrop-blur-sm border border-blue-500/30"
                >
                  🎯 Entrance Exams
                </Link>

                <Link
                  to="/after10th/scholarship"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-cyan-500/20 hover:bg-cyan-500/30 text-black-200 text-center transition backdrop-blur-sm border border-cyan-500/30"
                >
                  🎓 Scholarships
                </Link>

                <Link
                  to="/after10th/colleges"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-green-500/20 hover:bg-green-500/30 text-black-200 text-center transition backdrop-blur-sm border border-green-500/30"
                >
                  🏫 Colleges
                </Link>

                <Link
                  to="/"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-pink-500/20 hover:bg-pink-500/30 text-black-200 text-center transition backdrop-blur-sm border border-pink-500/30"
                >
                  🏠 Back to Home
                </Link>
              </div>
            </div>
          </motion.div>
        )}
            </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'} relative z-10`}>
        
        {/* Animated Header */}
        <div className="text-center py-12 px-4">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2 text-3xl animate-bounce">
              <span className="animation-delay-0">📚</span>
              <span className="animation-delay-200">🎓</span>
              <span className="animation-delay-400">💻</span>
            </div>
          </div>
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-700 to-blue-800 bg-clip-text text-transparent mb-6 animate-pulse">
            All Courses
          </h1>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search courses, streams, categories..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-8 pb-8">
          <AnimatePresence>
            {!activeCategory && !search && levelFilter === 'All' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mb-16"
              >
                {/* Introduction */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200 max-w-4xl mx-auto mb-12 shadow-sm">
                  <p className="text-gray-700 text-xl leading-relaxed">
                    Explore comprehensive course options across all education levels - from Higher Secondary streams to Professional degrees. Whether you're planning after 10th, 12th, or looking for postgraduate specializations, <span className="text-blue-600 font-semibold">EduAdvisor</span> provides detailed information about courses, eligibility, duration, and career prospects. Make informed decisions about your educational journey with our complete course database covering Engineering, Medical, Law, Management, Arts, and emerging fields.
                  </p>
                </div>

                {/* Course Category Cards */}
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full max-w-7xl mx-auto">
                  {courseCategories.map((category, index) => (
                    <div
                      key={category.name}
                      onClick={() => toggleCategory(category.name)}
                      className={`group cursor-pointer relative overflow-hidden bg-gradient-to-br ${category.bg} rounded-3xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transition-all duration-500 transform hover:shadow-xl border border-gray-200`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Card Background Pattern */}
                      <div className="absolute inset-0 bg-white/30"></div>
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/20 rounded-full translate-y-10 -translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>

                      {/* Floating Particles */}
                      <div className="absolute top-2 right-2 text-lg opacity-50 group-hover:animate-spin">
                        {category.particles.split('')[0]}
                      </div>
                      <div className="absolute top-4 right-6 text-sm opacity-40 group-hover:animate-bounce">
                        {category.particles.split('')[1]}
                      </div>
                      <div className="absolute top-6 right-10 text-xs opacity-30 group-hover:animate-pulse">
                        {category.particles.split('')[2]}
                      </div>

                      <div className="relative z-10">
                        {/* Icon */}
                        <div className="text-4xl mb-4 group-hover:animate-bounce">
                          {category.icon}
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold mb-3 text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                          {category.name}
                        </h2>

                        {/* Stream Count */}
                        <p className="text-sm text-gray-600 mb-4">
                          {category.streams.length} streams available
                        </p>

                        {/* Enhanced Button */}
                        <button className="relative overflow-hidden bg-white/70 text-gray-700 font-bold py-2 px-6 rounded-full border border-gray-300 hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg text-sm">
                          <span className="relative z-10">Explore</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </button>
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/30 group-hover:to-white/20 transition-all duration-500"></div>
                    </div>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  <div className="bg-white rounded-xl p-6 border border-gray-200 text-center shadow-sm">
                    <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                    <div className="text-gray-600 text-sm">Total Courses</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 text-center shadow-sm">
                    <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                    <div className="text-gray-600 text-sm">Specializations</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 text-center shadow-sm">
                    <div className="text-3xl font-bold text-green-600 mb-2">8</div>
                    <div className="text-gray-600 text-sm">Major Categories</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 text-center shadow-sm">
                    <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                    <div className="text-gray-600 text-sm">Career Guidance</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Results View */}
          {(search || levelFilter !== 'All') && !activeCategory && (
            <div className="animate-fadeIn">
              <div className="mb-6">
                <p className="text-gray-600">
                  Found {getFilteredCategories().length} course categories
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredCategories().map((category, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer"
                    onClick={() => setActiveCategory(category.name)}
                  >
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">{category.icon}</span>
                      <h3 className="font-bold text-gray-800 text-lg">{category.name}</h3>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-3">
                      {category.streams.length} streams: {category.streams.slice(0, 3).join(', ')}
                      {category.streams.length > 3 && '...'}
                    </div>

                    <div className="text-xs text-blue-600 font-medium">
                      Click to explore streams →
                    </div>
                  </motion.div>
                ))}
              </div>

              {getFilteredCategories().length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No categories found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          )}

          {/* Category Streams View */}
          {activeCategory && !activeStream && (
            <motion.section
              key={activeCategory}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                <span className="bg-gradient-to-r from-blue-600 to-purple-800 bg-clip-text text-transparent">
                  {activeCategory} Streams
                </span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {courseCategories.find(cat => cat.name === activeCategory)?.streams.map((stream) => (
                  <motion.div
                    key={stream}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-50 p-6 rounded-xl shadow cursor-pointer hover:shadow-md transition border border-gray-200"
                    onClick={() => toggleStream(stream)}
                  >
                    <h3 className="font-semibold text-gray-800 text-lg mb-3">{stream}</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {courseDetails[stream]?.desc || 'Explore various courses in this stream'}
                    </p>
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-600">
                        {courseDetails[stream]?.courses?.length || 'Multiple'} courses
                      </span>
                      <span className="text-gray-500">Click to view →</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={() => setActiveCategory(null)}
                  className="bg-gray-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                >
                  ← Back to All Categories
                </button>
              </div>
            </motion.section>
          )}

          {/* Stream Courses View */}
          {activeStream && (
            <motion.section
              key={activeStream}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                <span className="bg-gradient-to-r from-purple-600 to-blue-800 bg-clip-text text-transparent">
                  {activeStream} Courses
                </span>
              </h2>

              {/* Stream Overview */}
              {courseDetails[activeStream] && (
                <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl mb-8">
                  <div className="grid md:grid-cols-3 gap-4 text-gray-700">
                    <div>
                      <p className="mb-2"><strong className="text-blue-700">Duration:</strong> {courseDetails[activeStream].duration}</p>
                    </div>
                    <div>
                      <p className="mb-2"><strong className="text-blue-700">Eligibility:</strong> {courseDetails[activeStream].eligibility}</p>
                    </div>
                    <div>
                      <p className="mb-2"><strong className="text-blue-700">Total Courses:</strong> {courseDetails[activeStream].courses?.length || 'Multiple'}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700">{courseDetails[activeStream].desc}</p>
                </div>
              )}
              
              {/* Course List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {courseDetails[activeStream]?.courses?.map((course, index) => (
                  <motion.div
                    key={course}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-50 p-6 rounded-xl shadow cursor-pointer hover:shadow-md transition border border-gray-200"
                    onClick={() => toggleCourse(course)}
                  >
                                        <h3 className="font-semibold text-gray-800 text-lg mb-3">{course}</h3>
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-600">Click for details</span>
                      <span className="text-gray-500">Course Info →</span>
                    </div>
                  </motion.div>
                )) || (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-600">Course details are being updated for this stream.</p>
                  </div>
                )}
              </div>

              {/* Course Details */}
              {activeCourse && (
                <motion.div
                  key={activeCourse}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className="bg-green-50 border border-green-200 p-6 rounded-xl shadow-sm mb-8"
                >
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">{activeCourse}</h4>
                  <div className="text-center mt-6">
                    <Link
                      to={`/courses/${activeCategory.toLowerCase().replace(/\s+/g, '-')}/${activeStream.toLowerCase().replace(/\s+/g, '-')}/${activeCourse.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '').replace(/&/g, 'and')}`}
                      className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105"
                    >
                      View Complete Details →
                    </Link>
                  </div>
                </motion.div>
              )}

              <div className="text-center mt-8 space-x-4">
                <button
                  onClick={() => setActiveStream(null)}
                  className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                  ← Back to {activeCategory} Streams
                </button>
                <button
                  onClick={() => {setActiveCategory(null); setActiveStream(null);}}
                  className="bg-gray-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                >
                  ← Back to All Categories
                </button>
              </div>
            </motion.section>
          )}

          {/* Course Benefits */}
          {!activeCategory && !search && levelFilter === 'All' && (
            <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-200 max-w-6xl mx-auto shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">🎯 Why Choose the Right Course?</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">Career Alignment</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Match your interests with career prospects</li>
                    <li>• Industry-relevant skills and knowledge</li>
                    <li>• Future job market demands</li>
                    <li>• Salary and growth potential</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">Educational Pathways</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Clear progression from 10th to career</li>
                    <li>• Multiple entry and exit points</li>
                    <li>• Lateral entry opportunities</li>
                    <li>• Higher education options</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">Skill Development</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Practical and theoretical knowledge</li>
                    <li>• Industry certifications</li>
                    <li>• Soft skills development</li>
                    <li>• Entrepreneurship opportunities</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <style jsx>{`
        .animation-delay-0 { animation-delay: 0ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-2000 { animation-delay: 2000ms; }
      `}</style>
    </div>
  );
};

export default Courses;