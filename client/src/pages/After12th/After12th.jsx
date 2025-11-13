import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Link } from 'react-router-dom';


// Define all streams with their courses
const streams = [
  {
    name: 'Engineering',
    icon: '⚙️',
    bg: 'from-blue-50 via-blue-100 to-blue-200',
    courses: [
      {
        name: 'Civil Engineering',
        category: 'Core Engineering',
        duration: '4 years (8 semesters)',
        subjects: [
          { name: 'Surveying', description: 'Techniques to measure land areas, distances, elevations; used in mapping, construction, road/bridge layout.' },
          { name: 'Strength of Materials', description: 'Study of stresses, strains, bending, torsion in materials like steel, concrete, timber.' },
          { name: 'Structural Engineering', description: 'Design and analysis of safe & stable structures (buildings, bridges, dams).' },
          { name: 'Fluid Mechanics', description: 'Properties & behavior of fluids (liquids/gases), applications in hydraulics, water supply, irrigation.' },
          { name: 'Transportation Engineering', description: 'Design & maintenance of roads, railways, airports, and traffic management systems.' }
        ],
        location: 'GCET Ganderbal'
      },
      {
        name: 'Mechanical Engineering',
        category: 'Core Engineering',
        duration: '4 years',
        subjects: [
          { name: 'Engineering Mechanics', description: 'Laws of forces, motion, equilibrium; basics of analyzing mechanical systems.' },
          { name: 'Thermodynamics', description: 'Study of energy, heat, work, power cycles (engines, turbines, refrigerators).' },
          { name: 'Strength of Materials', description: 'Mechanical behavior of solids under load; stress, strain, failure analysis.' },
          { name: 'Manufacturing Technology', description: 'Processes like casting, welding, machining, forming, 3D printing.' },
          { name: 'Machine Design', description: 'Designing mechanical components (gears, shafts, bearings) to be safe & efficient.' }
        ]
      },
      {
        name: 'Electrical Engineering',
        category: 'Core Engineering',
        duration: '4 years',
        subjects: [
          { name: 'Basic Electrical Engineering', description: 'Fundamentals of circuits, Ohm\'s law, AC/DC networks, power basics.' },
          { name: 'Electrical Machines', description: 'Study of motors, generators, transformers; conversion between electrical & mechanical energy.' },
          { name: 'Power Systems', description: 'Generation, transmission, distribution of electrical power.' },
          { name: 'Control Systems', description: 'Feedback & automation systems for stability and regulation (used in robotics, power grids).' },
          { name: 'Electrical Measurements', description: 'Measuring electrical quantities (voltage, current, resistance, power) with instruments.' }
        ]
      },
      {
        name: 'Electronics & Communication Engineering',
        category: 'Core Engineering',
        duration: '4 years',
        subjects: [
          { name: 'Basic Electronics', description: 'Fundamentals of diodes, transistors, circuits, amplifiers.' },
          { name: 'Digital Electronics', description: 'Logic gates, flip-flops, counters, digital systems design.' },
          { name: 'Communication Systems', description: 'Transmission & reception of signals (analog, digital, wireless, satellite).' },
          { name: 'Microprocessors & Microcontrollers', description: 'Small computing units that control devices, appliances, robots.' },
          { name: 'Embedded Systems', description: 'Hardware + software integration for dedicated devices (smartphones, IoT, cars).' }
        ]
      },
      {
        name: 'Computer Science & Engineering',
        category: 'Core Engineering',
        duration: '4 years',
        subjects: [
          { name: 'Programming Languages (C, Java, Python)', description: 'Writing instructions for computers; problem-solving through coding.' },
          { name: 'Data Structures', description: 'Organizing data (arrays, stacks, queues, trees, graphs) for efficient storage & retrieval.' },
          { name: 'Database Management Systems (DBMS)', description: 'Managing and querying structured data using SQL & database models.' },
          { name: 'Computer Networks', description: 'Communication between computers (LAN, WAN, Internet, protocols like TCP/IP).' },
          { name: 'Operating Systems', description: 'Software that manages hardware & resources (Windows, Linux, scheduling, memory mgmt.).' }
        ]
      },
      {
        name: 'Information Technology',
        category: 'Core Engineering',
        duration: '4 years',
        subjects: [
          { name: 'Programming Languages (C, Java, Python)', description: 'Writing instructions for computers; problem-solving through coding.' },
          { name: 'Data Structures', description: 'Organizing data (arrays, stacks, queues, trees, graphs) for efficient storage & retrieval.' },
          { name: 'Database Management Systems (DBMS)', description: 'Managing and querying structured data using SQL & database models.' },
          { name: 'Computer Networks', description: 'Communication between computers (LAN, WAN, Internet, protocols like TCP/IP).' },
          { name: 'Operating Systems', description: 'Software that manages hardware & resources (Windows, Linux, scheduling, memory mgmt.).' }
        ]
      },
      {
        name: 'Biomedical Engineering',
        category: 'Specialized Engineering',
        duration: '4 years',
        subjects: [
          { name: 'Human Physiology', description: 'Study of human body functions and systems.' },
          { name: 'Biomaterials', description: 'Materials used in medical devices and implants.' },
          { name: 'Biomechanics', description: 'Mechanical principles applied to biological systems.' },
          { name: 'Medical Instrumentation', description: 'Design and operation of medical devices.' },
          { name: 'Biomedical Signals', description: 'Processing and analysis of biological signals.' }
        ],
        location: 'GCET Ganderbal'
      },
      {
        name: 'Renewable Energy Engineering',
        category: 'Specialized Engineering',
        duration: '4 years',
        subjects: [
          { name: 'Solar PV', description: 'Photovoltaic systems and solar energy conversion.' },
          { name: 'Wind Power', description: 'Wind turbine technology and wind farm design.' },
          { name: 'Batteries', description: 'Energy storage systems and battery technology.' },
          { name: 'Power Electronics', description: 'Electronic systems for power conversion and control.' },
          { name: 'Microgrids', description: 'Small-scale power grids with distributed energy resources.' },
          { name: 'Energy Policy', description: 'Regulations and policies for renewable energy.' }
        ],
        location: 'BGSBU Rajouri'
      },
      {
        name: 'Food Technology',
        category: 'Specialized Engineering',
        duration: '4 years',
        subjects: [
          { name: 'Food Chemistry', description: 'Chemical composition and reactions in food.' },
          { name: 'Microbiology', description: 'Microorganisms in food production and safety.' },
          { name: 'Process Engineering', description: 'Food processing operations and equipment.' },
          { name: 'Packaging', description: 'Food packaging materials and technologies.' },
          { name: 'Food Laws', description: 'Regulations and standards for food safety.' }
        ],
        location: 'SMVDU Katra'
      },
      {
        name: 'Materials Engineering',
        category: 'Specialized Engineering',
        duration: '4 years',
        subjects: [
          { name: 'Materials Science', description: 'Structure and properties of materials.' },
          { name: 'Metallurgy', description: 'Processing and properties of metals.' },
          { name: 'Corrosion', description: 'Material degradation and protection methods.' },
          { name: 'Nanomaterials', description: 'Materials at nanoscale and their applications.' },
          { name: 'Composite Materials', description: 'Multi-component materials with enhanced properties.' }
        ],
        location: 'IIT Jammu / NIT Srinagar'
      },
      {
        name: 'Chemical Engineering',
        category: 'Specialized Engineering',
        duration: '4 years',
        subjects: [
          { name: 'Heat & Mass Transfer', description: 'Transfer of heat and mass in chemical processes.' },
          { name: 'Fluid Mechanics', description: 'Flow behavior of fluids in chemical systems.' },
          { name: 'Reaction Engineering', description: 'Design and analysis of chemical reactors.' },
          { name: 'Process Control', description: 'Control systems for chemical processes.' },
          { name: 'Plant Design', description: 'Design of chemical processing plants.' }
        ],
        location: 'IIT Jammu & NIT Srinagar'
      },
      {
        name: 'Mathematics & Computing',
        category: 'Specialized Engineering',
        duration: '4 years',
        subjects: [
          { name: 'Linear Algebra', description: 'Vector spaces, matrices, and linear transformations.' },
          { name: 'Probability', description: 'Mathematical study of random phenomena.' },
          { name: 'Algorithms', description: 'Design and analysis of computational algorithms.' },
          { name: 'Optimization', description: 'Mathematical techniques for finding optimal solutions.' },
          { name: 'Numerical Methods', description: 'Computational methods for solving mathematical problems.' },
          { name: 'ML basics', description: 'Introduction to machine learning concepts.' }
        ],
        location: 'IIT Jammu'
      },
      {
        name: 'Engineering Physics',
        category: 'Specialized Engineering',
        duration: '4 years',
        subjects: [
          { name: 'Quantum Mechanics', description: 'Physics at atomic and subatomic scales.' },
          { name: 'Semiconductor Devices', description: 'Physics and applications of semiconductor devices.' },
          { name: 'Optoelectronics', description: 'Devices that source, detect and control light.' },
          { name: 'Electrodynamics', description: 'Study of electromagnetic phenomena.' },
          { name: 'Instrumentation', description: 'Design and use of measuring instruments.' }
        ],
        location: 'IIT Jammu'
      }
    ]
  },
  {
    name: 'Medical',
    icon: '🏥',
    bg: 'from-green-50 via-green-100 to-green-200',
    courses: [
      {
        name: 'MBBS',
        category: 'Medical',
        duration: '5.5 years',
        subjects: [
          { name: 'Anatomy', description: 'Study of human body structure.' },
          { name: 'Physiology', description: 'Study of body functions and systems.' },
          { name: 'Biochemistry', description: 'Chemical processes within living organisms.' },
          { name: 'Pathology', description: 'Study of disease causes and effects.' },
          { name: 'Microbiology', description: 'Study of microorganisms and infections.' },
          { name: 'Pharmacology', description: 'Study of drugs and their effects.' },
          { name: 'Medicine', description: 'Diagnosis and treatment of diseases.' },
          { name: 'Surgery', description: 'Surgical procedures and techniques.' }
        ]
      },
      {
        name: 'BDS',
        category: 'Medical',
        duration: '5 years',
        subjects: [
          { name: 'General Human Anatomy', description: 'Including Embryology & Histology.' },
          { name: 'General Human Physiology & Biochemistry', description: 'Body functions and chemical processes.' },
          { name: 'Dental Anatomy', description: 'Embryology & Oral Histology.' },
          { name: 'Oral Pathology', description: 'Diseases of the oral cavity.' },
          { name: 'Conservative Dentistry', description: 'Tooth preservation and restoration.' },
          { name: 'Prosthodontics', description: 'Replacement of missing teeth.' },
          { name: 'Oral & Maxillofacial Surgery', description: 'Surgical procedures of mouth and jaw.' },
          { name: 'Orthodontics', description: 'Correction of teeth and jaw alignment.' }
        ]
      },
      {
        name: 'BAMS',
        category: 'Medical',
        duration: '5.5 years',
        subjects: [
          { name: 'Padartha Vigyan & Ayurveda Itihas', description: 'Philosophy & History of Ayurveda.' },
          { name: 'Sanskrit', description: 'Basic language for classical Ayurvedic texts.' },
          { name: 'Kriya Sharir', description: 'Human Physiology in Ayurveda.' },
          { name: 'Rachana Sharir', description: 'Human Anatomy in Ayurveda.' },
          { name: 'Dravyaguna Vigyan', description: 'Ayurvedic Pharmacology – medicinal plants & herbs.' },
          { name: 'Panchakarma', description: 'Detoxification & Rejuvenation therapies.' },
          { name: 'Kayachikitsa', description: 'General Medicine in Ayurveda.' },
          { name: 'Shalya Tantra', description: 'Surgery in Ayurveda.' }
        ]
      },
      {
        name: 'BUMS',
        category: 'Medical',
        duration: '5.5 years',
        subjects: [
          { name: 'Arabic & Mantiq wa Falsafa', description: 'Language, Logic & Philosophy.' },
          { name: 'Kulliyat Umoor-e-Tabiya', description: 'Basic Principles of Unani Medicine.' },
          { name: 'Tashreeh-ul-Badan', description: 'Anatomy.' },
          { name: 'Munafe-ul-Aza', description: 'Physiology.' },
          { name: 'Ilmul Advia', description: 'Pharmacology – study of Unani drugs, herbs, minerals.' },
          { name: 'Ilaj bit Tadbeer', description: 'Regimenal Therapy – Hijama, Dalak, Hammam, etc.' },
          { name: 'Moalijat', description: 'General Medicine in Unani.' },
          { name: 'Jarahat', description: 'Surgery in Unani + modern basics.' }
        ]
      },
      {
        name: 'B.Sc Nursing',
        category: 'Medical',
        duration: '4 years',
        subjects: [
          { name: 'Anatomy', description: 'Human body structure.' },
          { name: 'Physiology', description: 'Body functions and systems.' },
          { name: 'Medical-Surgical Nursing', description: 'Adult nursing care.' },
          { name: 'Community Health Nursing', description: 'Public health and community care.' },
          { name: 'Obstetrics & Gynecological Nursing', description: 'Maternity and women\'s health.' },
          { name: 'Pediatric Nursing', description: 'Child health nursing.' },
          { name: 'Mental Health Nursing', description: 'Psychiatric nursing care.' },
          { name: 'Nursing Research', description: 'Research methods in nursing.' }
        ]
      },
      {
        name: 'BPT',
        category: 'Medical',
        duration: '4 years',
        subjects: [
                    { name: 'Anatomy', description: 'Human body structure and systems.' },
          { name: 'Biomechanics', description: 'Mechanical principles of human movement.' },
          { name: 'Exercise Therapy', description: 'Therapeutic exercises and movements.' },
          { name: 'Electrotherapy', description: 'Therapeutic modalities using electrical stimulation.' },
          { name: 'Orthopedics', description: 'Musculoskeletal conditions and rehabilitation.' },
          { name: 'Neurology', description: 'Neurological conditions and rehabilitation.' },
          { name: 'Cardio-respiratory', description: 'Cardiac and respiratory rehabilitation.' },
          { name: 'Community Physiotherapy', description: 'Community-based rehabilitation.' }
        ]
      }
    ]
  },
  {
    name: 'Arts & Science',
    icon: '🎨',
    bg: 'from-purple-50 via-purple-100 to-purple-200',
    courses: [
      {
        name: 'B.Sc Agriculture',
        category: 'Science',
        duration: '3-4 years',
        subjects: [
          { name: 'Agronomy', description: 'Crop production principles and practices.' },
          { name: 'Horticulture', description: 'Fruit and vegetable cultivation.' },
          { name: 'Soil Science', description: 'Soil properties and management.' },
          { name: 'Plant Breeding', description: 'Crop improvement techniques.' },
          { name: 'Entomology', description: 'Study of insects and pest management.' },
          { name: 'Agricultural Economics', description: 'Economics of agricultural systems.' },
          { name: 'Plant Pathology', description: 'Plant diseases and their management.' },
          { name: 'Agricultural Extension', description: 'Technology transfer to farmers.' }
        ]
      },
      {
        name: 'B.Sc Horticulture',
        category: 'Science',
        duration: '3-4 years',
        subjects: [
          { name: 'Plant Physiology', description: 'Plant functions and processes.' },
          { name: 'Genetics', description: 'Principles of heredity and variation.' },
          { name: 'Pest Management', description: 'Integrated pest control methods.' },
          { name: 'Floriculture', description: 'Flower cultivation and management.' },
          { name: 'Post-harvest Technology', description: 'Handling and storage of produce.' },
          { name: 'Fruit Science', description: 'Fruit crop production and management.' },
          { name: 'Vegetable Science', description: 'Vegetable crop cultivation.' },
          { name: 'Landscaping', description: 'Garden design and maintenance.' }
        ]
      },
      {
        name: 'B.Sc Botany',
        category: 'Science',
        duration: '3 years',
        subjects: [
          { name: 'Plant Morphology', description: 'External structure of plants.' },
          { name: 'Plant Physiology', description: 'Plant functions and processes.' },
          { name: 'Plant Biochemistry', description: 'Chemical processes in plants.' },
          { name: 'Genetics', description: 'Heredity and variation in plants.' },
          { name: 'Plant Biotechnology', description: 'Modern techniques in plant science.' },
          { name: 'Plant Taxonomy', description: 'Classification of plants.' },
          { name: 'Ecology', description: 'Plant-environment interactions.' },
          { name: 'Microbiology', description: 'Study of microorganisms.' }
        ]
      },
      {
        name: 'B.Sc Zoology',
        category: 'Science',
        duration: '3 years',
        subjects: [
          { name: 'Animal Physiology', description: 'Functions of animal body systems.' },
          { name: 'Genetics', description: 'Heredity and variation in animals.' },
          { name: 'Ecology', description: 'Animal-environment interactions.' },
          { name: 'Evolution', description: 'Evolutionary biology and processes.' },
          { name: 'Conservation Biology', description: 'Biodiversity conservation.' },
          { name: 'Cell Biology', description: 'Structure and function of cells.' },
          { name: 'Developmental Biology', description: 'Animal development and embryology.' },
          { name: 'Animal Behavior', description: 'Study of animal behavior patterns.' }
        ]
      },
      {
        name: 'B.Sc Chemistry',
        category: 'Science',
        duration: '3 years',
        subjects: [
          { name: 'Organic Chemistry', description: 'Chemistry of carbon compounds.' },
          { name: 'Inorganic Chemistry', description: 'Chemistry of all elements except carbon.' },
          { name: 'Physical Chemistry', description: 'Physical properties and changes of matter.' },
          { name: 'Analytical Chemistry', description: 'Analysis of matter composition.' },
          { name: 'Biochemistry', description: 'Chemical processes in living organisms.' },
          { name: 'Environmental Chemistry', description: 'Chemistry of the environment.' },
          { name: 'Industrial Chemistry', description: 'Chemical processes in industry.' },
          { name: 'Spectroscopy', description: 'Study of matter-radiation interaction.' }
        ]
      },
      {
        name: 'B.Sc Medical Lab Technology',
        category: 'Science',
        duration: '3 years',
        subjects: [
          { name: 'Clinical Biochemistry', description: 'Study of blood, urine & body fluids to detect diseases.' },
          { name: 'Pathology', description: 'Diagnosis of diseases through lab examination.' },
          { name: 'Microbiology', description: 'Study of bacteria, viruses, fungi, parasites.' },
          { name: 'Hematology', description: 'Analysis of blood cells for disorders.' },
          { name: 'Instrumentation', description: 'Operation of lab equipment.' },
          { name: 'Immunology', description: 'Study of immune system.' },
          { name: 'Clinical Pathology', description: 'Laboratory diagnosis of diseases.' },
          { name: 'Blood Banking', description: 'Blood collection and transfusion.' }
        ]
      },
      {
        name: 'B.Sc Physics',
        category: 'Science',
        duration: '3 years',
        subjects: [
          { name: 'Classical Mechanics', description: 'Motion and forces in classical physics.' },
          { name: 'Quantum Physics', description: 'Physics at atomic and subatomic scales.' },
          { name: 'Thermodynamics', description: 'Heat and temperature relationships.' },
          { name: 'Electromagnetism', description: 'Electric and magnetic phenomena.' },
          { name: 'Optics', description: 'Study of light and its properties.' },
          { name: 'Nuclear Physics', description: 'Physics of atomic nuclei.' },
          { name: 'Solid State Physics', description: 'Physics of solid materials.' },
          { name: 'Mathematical Physics', description: 'Mathematical methods in physics.' }
        ]
      },
      {
        name: 'B.Sc Mathematics',
        category: 'Science',
        duration: '3 years',
        subjects: [
          { name: 'Algebra', description: 'Abstract algebraic structures.' },
          { name: 'Calculus', description: 'Differential and integral calculus.' },
          { name: 'Real Analysis', description: 'Properties of real numbers and functions.' },
          { name: 'Differential Equations', description: 'Equations involving derivatives.' },
          { name: 'Probability & Statistics', description: 'Mathematical study of uncertainty.' },
          { name: 'Linear Algebra', description: 'Vector spaces and linear mappings.' },
          { name: 'Complex Analysis', description: 'Functions of complex variables.' },
          { name: 'Numerical Methods', description: 'Computational mathematics.' }
        ]
      },
      {
        name: 'B.Sc Computer Science',
        category: 'Science',
        duration: '3 years',
        subjects: [
          { name: 'Programming', description: 'C, C++, Java, Python programming.' },
          { name: 'Data Structures', description: 'Organization and storage of data.' },
          { name: 'DBMS', description: 'Database management systems.' },
          { name: 'Networking', description: 'Computer networks and protocols.' },
          { name: 'Software Engineering', description: 'Software development methodologies.' },
          { name: 'Operating Systems', description: 'OS concepts and design.' },
          { name: 'Web Development', description: 'Web technologies and applications.' },
          { name: 'Algorithms', description: 'Algorithm design and analysis.' }
        ]
      },
      {
        name: 'B.Sc Environmental Science',
        category: 'Science',
        duration: '3 years',
        subjects: [
          { name: 'Ecology', description: 'Ecosystem structure and function.' },
          { name: 'Environmental Chemistry', description: 'Chemical processes in environment.' },
          { name: 'Pollution Control', description: 'Methods to control pollution.' },
          { name: 'GIS', description: 'Geographic Information Systems.' },
          { name: 'EIA', description: 'Environmental Impact Assessment.' },
          { name: 'Climate Change', description: 'Global climate change science.' },
          { name: 'Natural Resource Management', description: 'Sustainable resource use.' },
          { name: 'Environmental Law', description: 'Environmental regulations and policies.' }
        ]
      },
      {
        name: 'BA English',
        category: 'Arts',
        duration: '3 years',
        subjects: [
          { name: 'British Literature', description: 'Literature from Britain across periods.' },
          { name: 'American Literature', description: 'Literature from America.' },
          { name: 'Indian Writing', description: 'Indian literature in English.' },
          { name: 'Linguistics', description: 'Scientific study of language.' },
          { name: 'Creative Writing', description: 'Writing fiction, poetry, and drama.' },
          { name: 'Literary Theory', description: 'Theoretical approaches to literature.' },
          { name: 'World Literature', description: 'Literature from around the world.' },
          { name: 'Shakespeare', description: 'Works of William Shakespeare.' }
        ]
      },
      {
        name: 'BA History',
        category: 'Arts',
        duration: '3 years',
        subjects: [
          { name: 'Ancient History', description: 'History of ancient civilizations.' },
          { name: 'Medieval History', description: 'History of medieval period.' },
          { name: 'Modern History', description: 'History from 18th century onwards.' },
          { name: 'Historiography', description: 'Study of historical writing.' },
          { name: 'Archaeology', description: 'Study of human history through excavation.' },
          { name: 'Indian History', description: 'History of Indian subcontinent.' },
          { name: 'World History', description: 'Global historical developments.' },
          { name: 'Economic History', description: 'History of economic systems.' }
        ]
      },
      {
        name: 'BA Visual Arts',
        category: 'Arts',
        duration: '3 years',
        subjects: [
          { name: 'Drawing', description: 'Fundamental drawing techniques.' },
          { name: 'Painting', description: 'Various painting techniques and styles.' },
          { name: 'Sculpture', description: 'Three-dimensional art creation.' },
          { name: 'Digital Art', description: 'Computer-based art creation.' },
          { name: 'Photography', description: 'Photographic techniques and art.' },
          { name: 'Art History', description: 'History of visual arts.' },
          { name: 'Printmaking', description: 'Various printing techniques.' },
          { name: 'Installation Art', description: 'Large-scale, mixed-media artworks.' }
        ]
      },
      {
        name: 'BA Sociology',
        category: 'Arts',
        duration: '3 years',
        subjects: [
          { name: 'Social Theory', description: 'Theoretical frameworks in sociology.' },
          { name: 'Research Methods', description: 'Sociological research techniques.' },
          { name: 'Urban Sociology', description: 'Study of urban life and cities.' },
          { name: 'Gender Studies', description: 'Study of gender in society.' },
          { name: 'Rural Sociology', description: 'Study of rural communities.' },
          { name: 'Social Stratification', description: 'Study of social hierarchy.' },
          { name: 'Criminology', description: 'Study of crime and criminal behavior.' },
          { name: 'Medical Sociology', description: 'Sociology of health and illness.' }
        ]
      },
      {
        name: 'BA Political Science',
        category: 'Arts',
        duration: '3 years',
        subjects: [
          { name: 'Political Theory', description: 'Theoretical foundations of politics.' },
          { name: 'Comparative Politics', description: 'Comparison of political systems.' },
          { name: 'International Relations', description: 'Relations between nations.' },
          { name: 'Public Administration', description: 'Study of government administration.' },
          { name: 'Indian Politics', description: 'Indian political system and processes.' },
          { name: 'Political Philosophy', description: 'Philosophical approaches to politics.' },
          { name: 'Electoral Politics', description: 'Study of elections and voting.' },
          { name: 'Human Rights', description: 'Study of human rights issues.' }
        ]
      },
      {
        name: 'BA Economics',
        category: 'Arts',
        duration: '3 years',
        subjects: [
          { name: 'Microeconomics', description: 'Individual economic behavior.' },
          { name: 'Macroeconomics', description: 'Economy-wide phenomena.' },
          { name: 'Econometrics', description: 'Statistical methods in economics.' },
          { name: 'Development Economics', description: 'Economic development theories.' },
          { name: 'Statistics', description: 'Statistical analysis for economics.' },
          { name: 'International Economics', description: 'Global economic relations.' },
          { name: 'Public Finance', description: 'Government revenue and expenditure.' },
          { name: 'Mathematical Economics', description: 'Mathematical methods in economics.' }
        ]
      },
      {
        name: 'BA Psychology',
        category: 'Arts',
        duration: '3 years',
        subjects: [
          { name: 'General Psychology', description: 'Introduction to Psychology.' },
          { name: 'Developmental Psychology', description: 'Human development across lifespan.' },
          { name: 'Abnormal Psychology', description: 'Study of psychological disorders.' },
          { name: 'Research Methods', description: 'Research techniques in psychology.' },
          { name: 'Psychometrics', description: 'Psychological measurement.' },
          { name: 'Social Psychology', description: 'Psychology of social interactions.' },
          { name: 'Cognitive Psychology', description: 'Study of mental processes.' },
          { name: 'Clinical Psychology', description: 'Assessment and treatment of mental illness.' }
        ]
      },
      {
        name: 'BA Geography',
        category: 'Arts',
        duration: '3 years',
        subjects: [
          { name: 'Physical Geography', description: 'Natural features and processes.' },
          { name: 'Human Geography', description: 'Human activities and spaces.' },
          { name: 'Cartography', description: 'Map making and design.' },
          { name: 'GIS', description: 'Geographic Information Systems.' },
          { name: 'Remote Sensing', description: 'Earth observation from distance.' },
          { name: 'Economic Geography', description: 'Spatial aspects of economic activities.' },
          { name: 'Urban Geography', description: 'Study of cities and urban areas.' },
                    { name: 'Environmental Geography', description: 'Human-environment interactions.' }
        ]
      },
      {
        name: 'BA Anthropology',
        category: 'Arts',
        duration: '3 years',
        subjects: [
          { name: 'Physical Anthropology', description: 'Human evolution and biological variation.' },
          { name: 'Social-Cultural Anthropology', description: 'Study of human cultures and societies.' },
          { name: 'Archaeology', description: 'Study of human past through material remains.' },
          { name: 'Research Methods', description: 'Anthropological research techniques.' },
          { name: 'Linguistic Anthropology', description: 'Language in cultural context.' },
          { name: 'Medical Anthropology', description: 'Health and illness in cultural context.' },
          { name: 'Applied Anthropology', description: 'Practical applications of anthropology.' },
          { name: 'Tribal Studies', description: 'Study of tribal societies.' }
        ]
      },
      {
        name: 'BA Arabic',
        category: 'Arts',
        duration: '3 years',
        subjects: [
          { name: 'Arabic Grammar', description: 'Structure and rules of Arabic language.' },
          { name: 'Classical Literature', description: 'Classical Arabic literary works.' },
          { name: 'Modern Literature', description: 'Contemporary Arabic literature.' },
          { name: 'Translation', description: 'Arabic-English translation techniques.' },
          { name: 'Arabic Linguistics', description: 'Scientific study of Arabic language.' },
          { name: 'Islamic Literature', description: 'Religious texts and literature.' },
          { name: 'Arabic Poetry', description: 'Classical and modern Arabic poetry.' },
          { name: 'Arabic Prose', description: 'Arabic prose literature.' }
        ]
      },
      {
        name: 'BA Sanskrit',
        category: 'Arts',
        duration: '3 years',
        subjects: [
          { name: 'Sanskrit Grammar', description: 'Panini\'s grammar system.' },
          { name: 'Vedic Literature', description: 'Study of Vedic texts.' },
          { name: 'Classical Literature', description: 'Classical Sanskrit texts.' },
          { name: 'Indian Philosophy', description: 'Philosophical schools of India.' },
          { name: 'Sanskrit Poetry', description: 'Classical Sanskrit poetry.' },
          { name: 'Sanskrit Drama', description: 'Classical Sanskrit plays.' },
          { name: 'Linguistics', description: 'Sanskrit linguistic analysis.' },
          { name: 'Manuscriptology', description: 'Study of Sanskrit manuscripts.' }
        ]
      }
    ]
  },
  {
    name: 'Commerce',
    icon: '💼',
    bg: 'from-orange-50 via-orange-100 to-orange-200',
    courses: [
      {
        name: 'B.Com (Bachelor of Commerce)',
        category: 'Commerce',
        duration: '3 years',
        subjects: [
          { name: 'Financial Accounting', description: 'Recording and reporting financial transactions.' },
          { name: 'Cost Accounting', description: 'Cost analysis and control.' },
          { name: 'Business Law', description: 'Legal aspects of business.' },
          { name: 'Taxation', description: 'Direct and indirect tax laws.' },
          { name: 'Auditing', description: 'Examination of financial records.' },
          { name: 'Business Statistics', description: 'Statistical methods in business.' },
          { name: 'Corporate Accounting', description: 'Accounting for companies.' },
          { name: 'Management Accounting', description: 'Accounting for management decisions.' }
        ]
      },
      {
        name: 'BBA (Bachelor of Business Administration)',
        category: 'Commerce',
        duration: '3 years',
        subjects: [
          { name: 'Management', description: 'Principles and practices of management.' },
          { name: 'Marketing', description: 'Marketing concepts and strategies.' },
          { name: 'Finance', description: 'Financial management principles.' },
          { name: 'HR', description: 'Human resource management.' },
          { name: 'Operations', description: 'Operations and production management.' },
          { name: 'Business Ethics', description: 'Ethical issues in business.' },
          { name: 'Strategic Management', description: 'Business strategy formulation.' },
          { name: 'Entrepreneurship', description: 'Starting and managing new ventures.' }
        ]
      },
      {
        name: 'BCA (Bachelor of Computer Applications)',
        category: 'Commerce',
        duration: '3 years',
        subjects: [
          { name: 'Programming', description: 'C, C++, Java programming languages.' },
          { name: 'DBMS', description: 'Database design and management.' },
          { name: 'Web Development', description: 'HTML, CSS, JavaScript, PHP.' },
          { name: 'Software Engineering', description: 'Software development lifecycle.' },
          { name: 'Networks', description: 'Computer networking concepts.' },
          { name: 'Operating Systems', description: 'OS concepts and administration.' },
          { name: 'Data Structures', description: 'Data organization techniques.' },
          { name: 'Cloud Computing', description: 'Cloud services and deployment.' }
        ]
      },
      {
        name: 'B.Com (Hons)',
        category: 'Commerce',
        duration: '3 years',
        subjects: [
          { name: 'Advanced Accounting', description: 'Complex accounting concepts.' },
          { name: 'Financial Management', description: 'Corporate finance decisions.' },
          { name: 'Business Statistics', description: 'Statistical analysis for business.' },
          { name: 'Research Methods', description: 'Business research techniques.' },
          { name: 'International Business', description: 'Global business operations.' },
          { name: 'Investment Analysis', description: 'Security analysis and portfolio management.' },
          { name: 'Banking', description: 'Banking operations and management.' },
          { name: 'Insurance', description: 'Insurance principles and practices.' }
        ]
      },
      {
        name: 'Bachelor of Economics',
        category: 'Commerce',
        duration: '3 years',
        subjects: [
          { name: 'Microeconomics', description: 'Individual economic units.' },
          { name: 'Macroeconomics', description: 'Aggregate economic variables.' },
          { name: 'Econometrics', description: 'Economic data analysis.' },
          { name: 'Mathematical Economics', description: 'Mathematical tools in economics.' },
          { name: 'Trade', description: 'International trade theories.' },
          { name: 'Development Economics', description: 'Economic development issues.' },
          { name: 'Public Economics', description: 'Government economic policies.' },
          { name: 'Financial Economics', description: 'Financial markets and institutions.' }
        ]
      }
    ]
  },
  {
    name: 'Professional Courses',
    icon: '🎓',
    bg: 'from-red-50 via-red-100 to-red-200',
    courses: [
      {
        name: 'CA (Chartered Accountancy)',
        category: 'Professional',
        duration: '4.5-5 years',
        subjects: [
          { name: 'Financial Reporting', description: 'Advanced financial statements and reporting standards.' },
          { name: 'Strategic Financial Management', description: 'Investment decisions and financial strategy.' },
          { name: 'Auditing', description: 'Audit procedures and standards.' },
          { name: 'Taxation', description: 'Direct and indirect tax laws.' },
          { name: 'Corporate Laws', description: 'Company law and regulations.' },
          { name: 'Cost Management', description: 'Cost control and decision making.' },
          { name: 'Ethics', description: 'Professional ethics and standards.' },
          { name: 'Information Systems', description: 'IT systems and controls.' }
        ]
      },
      {
        name: 'CS (Company Secretary)',
        category: 'Professional',
        duration: '3-4 years',
        subjects: [
          { name: 'Company Law', description: 'Corporate legal framework.' },
          { name: 'Securities Law', description: 'Capital market regulations.' },
          { name: 'Corporate Governance', description: 'Board procedures and compliance.' },
          { name: 'Financial Management', description: 'Corporate finance principles.' },
          { name: 'Tax Laws', description: 'Corporate taxation.' },
          { name: 'Economic Laws', description: 'Business-related legislations.' },
          { name: 'Secretarial Practice', description: 'Company secretarial procedures.' },
          { name: 'Corporate Restructuring', description: 'Mergers and acquisitions.' }
        ]
      },
      {
        name: 'CMA (Cost Management Accountant)',
        category: 'Professional',
        duration: '3-4 years',
        subjects: [
          { name: 'Cost Accounting', description: 'Cost ascertainment and control.' },
          { name: 'Management Accounting', description: 'Decision-making tools.' },
          { name: 'Strategic Management', description: 'Business strategy and planning.' },
          { name: 'Budgeting', description: 'Budget preparation and control.' },
          { name: 'Financial Analysis', description: 'Financial statement analysis.' },
          { name: 'Performance Management', description: 'Performance measurement systems.' },
          { name: 'Risk Management', description: 'Risk assessment and mitigation.' },
          { name: 'Corporate Laws', description: 'Legal framework for business.' }
        ]
      },
      {
        name: 'Hotel Management',
        category: 'Professional',
        duration: '3-4 years',
        subjects: [
          { name: 'Food Production', description: 'Culinary arts and kitchen operations.' },
          { name: 'F&B Service', description: 'Restaurant and bar service.' },
          { name: 'Front Office', description: 'Reception and guest services.' },
          { name: 'Housekeeping', description: 'Room and public area maintenance.' },
          { name: 'Hotel Accounting', description: 'Financial management in hotels.' },
          { name: 'Marketing', description: 'Hotel marketing and sales.' },
          { name: 'Event Management', description: 'Planning and executing events.' },
          { name: 'Tourism', description: 'Travel and tourism management.' }
        ]
      },
      {
        name: 'Fashion Design',
        category: 'Professional',
        duration: '3-4 years',
        subjects: [
          { name: 'Fashion Illustration', description: 'Drawing and sketching fashion designs.' },
          { name: 'Pattern Making', description: 'Creating patterns for garments.' },
          { name: 'Garment Construction', description: 'Sewing and construction techniques.' },
          { name: 'Textile Science', description: 'Study of fabrics and materials.' },
          { name: 'Fashion History', description: 'Evolution of fashion trends.' },
          { name: 'CAD', description: 'Computer-aided design for fashion.' },
          { name: 'Fashion Marketing', description: 'Marketing fashion products.' },
          { name: 'Portfolio Development', description: 'Creating professional portfolio.' }
        ]
      },
      {
        name: 'Law (LLB)',
        category: 'Professional',
        duration: '3 or 5 years',
        subjects: [
          { name: 'Constitutional Law', description: 'Indian Constitution and fundamental rights.' },
          { name: 'Criminal Law', description: 'IPC and criminal procedures.' },
          { name: 'Civil Law', description: 'Civil procedures and property laws.' },
          { name: 'Corporate Law', description: 'Company and business laws.' },
          { name: 'Legal Research', description: 'Legal research methods and writing.' },
          { name: 'Contract Law', description: 'Law of contracts and agreements.' },
          { name: 'Family Law', description: 'Marriage, divorce, and succession.' },
          { name: 'International Law', description: 'Laws governing international relations.' }
        ]
      }
    ]
  },
  {
    name: 'Vocational & Diploma',
    icon: '🛠️',
    bg: 'from-indigo-50 via-indigo-100 to-indigo-200',
    courses: [
      {
        name: 'Polytechnic Diploma',
        category: 'Diploma',
        duration: '2-3 years',
        subjects: [
          { name: 'Engineering Drawing', description: 'Technical drawing and drafting.' },
          { name: 'Workshop Practice', description: 'Hands-on technical skills.' },
          { name: 'Applied Mathematics', description: 'Mathematics for engineering.' },
          { name: 'Applied Physics', description: 'Physics principles in engineering.' },
          { name: 'Applied Chemistry', description: 'Chemistry in technical applications.' },
          { name: 'Communication Skills', description: 'Professional communication.' },
          { name: 'Computer Applications', description: 'Basic computer skills.' },
          { name: 'Industrial Training', description: 'Practical industry experience.' }
        ]
      },
      {
        name: 'ITI (Industrial Training Institute)',
        category: 'Vocational',
        duration: '6 months to 2 years',
        subjects: [
          { name: 'Electrician', description: 'Electrical wiring and maintenance.' },
          { name: 'Fitter', description: 'Fitting and assembly work.' },
          { name: 'Welder', description: 'Welding techniques and safety.' },
          { name: 'Computer Operator', description: 'Computer operation and data entry.' },
          { name: 'Mechanic', description: 'Mechanical repair and maintenance.' },
          { name: 'Plumber', description: 'Plumbing installation and repair.' },
          { name: 'Carpenter', description: 'Woodworking and furniture making.' },
          { name: 'Electronics', description: 'Electronic equipment repair.' }
        ]
      },
      {
        name: 'Paramedical Courses',
        category: 'Vocational',
        duration: '1-3 years',
        subjects: [
          { name: 'X-ray Technology', description: 'Radiographic techniques and positioning.' },
          { name: 'Lab Technology', description: 'Clinical laboratory procedures.' },
          { name: 'Pharmacy', description: 'Pharmaceutical dispensing and management.' },
          { name: 'Physiotherapy', description: 'Physical therapy techniques.' },
          { name: 'OT Technology', description: 'Operation theatre procedures.' },
          { name: 'Emergency Care', description: 'Emergency medical services.' },
          { name: 'Optometry', description: 'Eye testing and vision care.' },
          { name: 'Dental Hygiene', description: 'Oral health and hygiene.' }
        ]
      },
      {
        name: 'Aviation & Hospitality',
        category: 'Vocational',
        duration: '6 months to 2 years',
        subjects: [
          { name: 'Airline Operations', description: 'Check-in, boarding, cargo handling.' },
          { name: 'Cabin Crew', description: 'In-flight service and safety.' },
          { name: 'Ground Handling', description: 'Airport ground operations.' },
          { name: 'Customer Service', description: 'Passenger handling and communication.' },
          { name: 'Aviation Safety', description: 'Safety procedures and regulations.' },
          { name: 'Ticketing', description: 'Reservation systems and fare calculation.' },
          { name: 'Front Office', description: 'Hotel reception operations.' },
          { name: 'Food Service', description: 'Restaurant and catering service.' }
        ]
      },
      {
        name: 'Digital Marketing',
        category: 'Vocational',
        duration: '3-6 months',
        subjects: [
          { name: 'SEO', description: 'Search Engine Optimization techniques.' },
                    { name: 'SEM', description: 'Search Engine Marketing and PPC advertising.' },
          { name: 'Social Media', description: 'Marketing on social media platforms.' },
          { name: 'Content Marketing', description: 'Creating and distributing valuable content.' },
          { name: 'Analytics', description: 'Web analytics and performance tracking.' },
          { name: 'Email Marketing', description: 'Email campaign design and management.' },
          { name: 'Affiliate Marketing', description: 'Partnership-based marketing strategies.' },
          { name: 'E-commerce', description: 'Online store marketing strategies.' }
        ]
      }
    ]
  },
  {
    name: 'Defense & Government',
    icon: '🎖️',
    bg: 'from-teal-50 via-teal-100 to-teal-200',
    courses: [
      {
        name: 'NDA (National Defence Academy)',
        category: 'Defense',
        duration: '3+1 years',
        subjects: [
          { name: 'Mathematics', description: 'Algebra, trigonometry, calculus, statistics.' },
          { name: 'General Ability', description: 'English, GK, physics, chemistry, history, geography.' },
          { name: 'Military Training', description: 'Physical training, drill, weapons training.' },
          { name: 'Leadership', description: 'Leadership development and team building.' },
          { name: 'Physical Training', description: 'Fitness and endurance training.' },
          { name: 'Service Training', description: 'Army, Navy, or Air Force specific training.' },
          { name: 'Academic Studies', description: 'BA/BSc degree courses.' },
          { name: 'Outdoor Training', description: 'Adventure activities and survival skills.' }
        ]
      },
      {
        name: 'Banking (IBPS/SBI)',
        category: 'Government',
        duration: 'Recruitment exams',
        subjects: [
          { name: 'Reasoning', description: 'Logical reasoning and analytical ability.' },
          { name: 'Quantitative Aptitude', description: 'Mathematical calculations and data interpretation.' },
          { name: 'English', description: 'Grammar, vocabulary, comprehension.' },
          { name: 'General Awareness', description: 'Current affairs and banking awareness.' },
          { name: 'Computer Knowledge', description: 'Basic computer and internet concepts.' },
          { name: 'Banking Awareness', description: 'RBI functions, monetary policy, banking terms.' },
          { name: 'Financial Awareness', description: 'Economic and financial current affairs.' },
          { name: 'Professional Knowledge', description: 'For specialist officer posts.' }
        ]
      },
      {
        name: 'SSC (Staff Selection Commission)',
        category: 'Government',
        duration: 'Recruitment exams',
        subjects: [
          { name: 'Reasoning', description: 'Verbal and non-verbal reasoning.' },
          { name: 'Quantitative Aptitude', description: 'Arithmetic and data interpretation.' },
          { name: 'English', description: 'Grammar, vocabulary, comprehension.' },
          { name: 'General Awareness', description: 'Static GK and current affairs.' },
          { name: 'General Science', description: 'Physics, chemistry, biology basics.' },
          { name: 'History', description: 'Indian and world history.' },
          { name: 'Geography', description: 'Indian and world geography.' },
          { name: 'Polity', description: 'Indian constitution and governance.' }
        ]
      },
      {
        name: 'Railway Recruitment',
        category: 'Government',
        duration: 'Direct recruitment',
        subjects: [
          { name: 'Mathematics', description: 'Arithmetic and basic mathematics.' },
          { name: 'General Intelligence', description: 'Reasoning and analytical skills.' },
          { name: 'General Awareness', description: 'Current affairs and general knowledge.' },
          { name: 'General Science', description: 'Science up to 10th standard.' },
          { name: 'Technical Knowledge', description: 'For technical posts - engineering subjects.' },
          { name: 'Railway Awareness', description: 'Indian Railways operations and history.' },
          { name: 'Computer Basics', description: 'For relevant posts.' },
          { name: 'Safety Rules', description: 'Railway safety regulations.' }
        ]
      },
      {
        name: 'UPSC Civil Services',
        category: 'Government',
        duration: 'Training after selection',
        subjects: [
          { name: 'General Studies I', description: 'History, geography, society, culture.' },
          { name: 'General Studies II', description: 'Polity, governance, international relations.' },
          { name: 'General Studies III', description: 'Economy, environment, technology, security.' },
          { name: 'General Studies IV', description: 'Ethics, integrity, aptitude.' },
          { name: 'Optional Subject', description: 'One subject of choice for mains.' },
          { name: 'Essay', description: 'Essay writing on various topics.' },
          { name: 'Current Affairs', description: 'National and international current events.' },
          { name: 'CSAT', description: 'Aptitude test in prelims.' }
        ]
      }
    ]
  },
  {
    name: 'MBA',
    icon: '📊',
    bg: 'from-pink-50 via-pink-100 to-pink-200',
    courses: [
      {
        name: 'MBA in Finance',
        category: 'Management',
        duration: '2 years',
        subjects: [
          { name: 'Financial Management', description: 'Corporate finance and investment decisions.' },
          { name: 'Investment Analysis', description: 'Security analysis and portfolio management.' },
          { name: 'Corporate Valuation', description: 'Business valuation techniques.' },
          { name: 'Financial Markets', description: 'Capital and money market operations.' },
          { name: 'Risk Management', description: 'Financial risk assessment and mitigation.' },
          { name: 'Banking Management', description: 'Banking operations and regulations.' },
          { name: 'International Finance', description: 'Global financial management.' },
          { name: 'Financial Derivatives', description: 'Options, futures, and swaps.' }
        ]
      },
      {
        name: 'MBA in Marketing',
        category: 'Management',
        duration: '2 years',
        subjects: [
          { name: 'Marketing Management', description: 'Marketing strategies and planning.' },
          { name: 'Consumer Behavior', description: 'Understanding consumer psychology.' },
          { name: 'Brand Management', description: 'Building and managing brands.' },
          { name: 'Digital Marketing', description: 'Online marketing strategies.' },
          { name: 'Sales Management', description: 'Sales force and channel management.' },
          { name: 'Market Research', description: 'Research methods and analytics.' },
          { name: 'Advertising', description: 'Advertising strategies and campaigns.' },
          { name: 'Retail Management', description: 'Retail operations and merchandising.' }
        ]
      },
      {
        name: 'MBA in Human Resource Management',
        category: 'Management',
        duration: '2 years',
        subjects: [
          { name: 'HR Planning', description: 'Strategic human resource planning.' },
          { name: 'Talent Management', description: 'Recruitment and talent development.' },
          { name: 'Compensation Management', description: 'Salary and benefits administration.' },
          { name: 'Performance Management', description: 'Employee performance systems.' },
          { name: 'Training & Development', description: 'Employee skill development programs.' },
          { name: 'Labor Laws', description: 'Employment and industrial relations laws.' },
          { name: 'Organizational Behavior', description: 'Workplace behavior and culture.' },
          { name: 'HR Analytics', description: 'Data-driven HR decision making.' }
        ]
      },
      {
        name: 'MBA in Operations Management',
        category: 'Management',
        duration: '2 years',
        subjects: [
          { name: 'Operations Research', description: 'Optimization techniques in operations.' },
          { name: 'Supply Chain Management', description: 'End-to-end supply chain processes.' },
          { name: 'Quality Management', description: 'Total quality management systems.' },
          { name: 'Project Management', description: 'Project planning and execution.' },
          { name: 'Logistics Management', description: 'Transportation and distribution.' },
          { name: 'Production Planning', description: 'Manufacturing planning and control.' },
          { name: 'Six Sigma', description: 'Process improvement methodologies.' },
          { name: 'Lean Management', description: 'Waste reduction and efficiency.' }
        ]
      },
      {
        name: 'MBA in IT/IT Systems Analytics',
        category: 'Management',
        duration: '2 years',
        subjects: [
          { name: 'IT Strategy', description: 'Aligning IT with business strategy.' },
          { name: 'Database Management', description: 'Enterprise database systems.' },
          { name: 'Business Intelligence', description: 'BI tools and data warehousing.' },
          { name: 'ERP Systems', description: 'Enterprise resource planning.' },
          { name: 'IT Project Management', description: 'Managing IT projects.' },
          { name: 'Cybersecurity Management', description: 'Information security management.' },
          { name: 'Cloud Computing', description: 'Cloud services and architecture.' },
          { name: 'IT Governance', description: 'IT policies and compliance.' }
        ]
      },
      {
        name: 'MBA in Business Analytics',
        category: 'Management',
        duration: '2 years',
        subjects: [
          { name: 'Data Analytics', description: 'Statistical analysis and data mining.' },
          { name: 'Predictive Modeling', description: 'Forecasting using statistical models.' },
          { name: 'Machine Learning', description: 'ML algorithms for business.' },
          { name: 'Big Data', description: 'Handling and analyzing large datasets.' },
          { name: 'Data Visualization', description: 'Presenting data insights effectively.' },
          { name: 'Business Intelligence', description: 'BI tools and dashboards.' },
          { name: 'R/Python Programming', description: 'Programming for data analysis.' },
          { name: 'Analytics Strategy', description: 'Building data-driven organizations.' }
        ]
      },
      {
        name: 'MBA in International Business',
        category: 'Management',
        duration: '2 years',
        subjects: [
          { name: 'Global Business', description: 'International business environment.' },
          { name: 'International Trade', description: 'Export-import procedures and policies.' },
          { name: 'Foreign Exchange', description: 'Currency markets and risk management.' },
          { name: 'Cross-cultural Management', description: 'Managing across cultures.' },
          { name: 'International Marketing', description: 'Global marketing strategies.' },
          { name: 'Trade Finance', description: 'International payment methods.' },
          { name: 'Global Supply Chain', description: 'International logistics management.' },
          { name: 'International Law', description: 'Legal aspects of global business.' }
        ]
      },
      {
        name: 'MBA in Entrepreneurship',
        category: 'Management',
        duration: '2 years',
        subjects: [
          { name: 'Venture Creation', description: 'Starting new business ventures.' },
          { name: 'Business Planning', description: 'Developing business plans.' },
          { name: 'Startup Finance', description: 'Funding and financial management.' },
          { name: 'Innovation Management', description: 'Managing innovation processes.' },
          { name: 'Growth Strategies', description: 'Scaling business operations.' },
          { name: 'Venture Capital', description: 'Understanding VC funding.' },
          { name: 'Social Entrepreneurship', description: 'Social impact ventures.' },
          { name: 'Family Business', description: 'Managing family enterprises.' }
        ]
      },
      {
        name: 'MBA in Healthcare/Hospital Management',
        category: 'Management',
        duration: '2 years',
        subjects: [
          { name: 'Healthcare Systems', description: 'Healthcare delivery systems.' },
          { name: 'Hospital Operations', description: 'Hospital administration and management.' },
          { name: 'Healthcare Finance', description: 'Financial management in healthcare.' },
          { name: 'Healthcare Quality', description: 'Quality assurance in healthcare.' },
          { name: 'Medical Ethics', description: 'Ethical issues in healthcare.' },
          { name: 'Healthcare IT', description: 'Information systems in healthcare.' },
          { name: 'Healthcare Marketing', description: 'Marketing healthcare services.' },
          { name: 'Healthcare Policy', description: 'Health policy and regulations.' }
        ]
      },
      {
        name: 'MBA in Supply Chain Management',
        category: 'Management',
        duration: '2 years',
        subjects: [
          { name: 'Supply Chain Strategy', description: 'Strategic supply chain design.' },
          { name: 'Procurement', description: 'Strategic sourcing and purchasing.' },
          { name: 'Inventory Management', description: 'Inventory control and optimization.' },
          { name: 'Warehouse Management', description: 'Warehouse operations and design.' },
          { name: 'Transportation', description: 'Transportation management systems.' },
          { name: 'Demand Planning', description: 'Forecasting and demand management.' },
          { name: 'Supply Chain Analytics', description: 'Data analytics in supply chain.' },
          { name: 'Global Logistics', description: 'International logistics management.' }
        ]
      },
      {
        name: 'MBA in Retail Management',
        category: 'Management',
        duration: '2 years',
        subjects: [
          { name: 'Retail Operations', description: 'Store operations and management.' },
          { name: 'Merchandising', description: 'Product selection and display.' },
          { name: 'Retail Marketing', description: 'Marketing in retail context.' },
          { name: 'Category Management', description: 'Managing product categories.' },
          { name: 'Retail Analytics', description: 'Data analysis in retail.' },
          { name: 'E-commerce', description: 'Online retail management.' },
          { name: 'Customer Experience', description: 'Enhancing customer satisfaction.' },
          { name: 'Franchise Management', description: 'Managing franchise operations.' }
        ]
      },
      {
        name: 'MBA in Digital Marketing & Analytics',
        category: 'Management',
        duration: '2 years',
        subjects: [
          { name: 'Digital Strategy', description: 'Digital transformation strategies.' },
          { name: 'SEO/SEM', description: 'Search engine marketing techniques.' },
          { name: 'Social Media Marketing', description: 'Marketing on social platforms.' },
          { name: 'Content Strategy', description: 'Content creation and distribution.' },
          { name: 'Marketing Analytics', description: 'Measuring marketing performance.' },
          { name: 'Mobile Marketing', description: 'Mobile-first marketing strategies.' },
          { name: 'Marketing Automation', description: 'Automated marketing systems.' },
          { name: 'Growth Hacking', description: 'Rapid growth strategies.' }
        ]
      }
    ]
  }
];

const lightColorGradients = [
  'from-blue-50 via-blue-100 to-blue-200',
  'from-green-50 via-green-100 to-green-200',
  'from-purple-50 via-purple-100 to-purple-200',
  'from-red-50 via-red-100 to-red-200',
  'from-orange-50 via-orange-100 to-orange-200',
  'from-indigo-50 via-indigo-100 to-indigo-200',
  'from-teal-50 via-teal-100 to-teal-200',
    'from-pink-50 via-pink-100 to-pink-200'
];

const After12th = () => {
  const [activeStream, setActiveStream] = useState(null);
  const [activeCourse, setActiveCourse] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [streamsExpanded, setStreamsExpanded] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [showSubjectsModal, setShowSubjectsModal] = useState(false);

  const toggleStream = (stream) => {
    setActiveCourse(null);
    setActiveStream(activeStream === stream ? null : stream);
    setShowAllCourses(false);
  };

  const handleCourseClick = (course) => {
    setActiveCourse(course);
    setShowSubjectsModal(true);
  };

  const closeSubjectsModal = () => {
    setShowSubjectsModal(false);
    setActiveCourse(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleStreamsInSidebar = () => {
    setStreamsExpanded(!streamsExpanded);
  };

  const handleExploreAllCourses = () => {
    setShowAllCourses(true);
    setActiveStream(null);
    setStreamsExpanded(false);
  };

  const floatingElements = ['📚', '🎓', '💡', '🔬', '💻', '🏥', '⚖️', '🎨'];

  // Get all courses from all streams
  const getAllCourses = () => {
    let allCourses = [];
    streams.forEach((stream) => {
      stream.courses.forEach((course) => {
        allCourses.push({
          ...course,
          streamName: stream.name,
          streamIcon: stream.icon,
          streamBg: stream.bg
        });
      });
    });
    return allCourses;
  };

  const slugify = (text) =>
    text ? text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') : '';

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-poppins select-none">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute text-4xl opacity-5 animate-bounce`}
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

      {/* Light Gradient Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>

      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed bg-gradient-to-r from-blue-100 to-blue-200 ml-8 mt-6 text-gray-800 p-3 rounded-lg shadow-lg hover:from-blue-200 hover:to-blue-300 transition z-50"
      >
        <div className="w-5 h-3 flex flex-col justify-between">
          <span className="block h-0.5 bg-gray-800"></span>
          <span className="block h-0.5 bg-gray-800"></span>
          <span className="block h-0.5 bg-gray-800"></span>
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
            className="fixed left-0 top-[5.5rem] h-[90vh] w-80 bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl z-40 overflow-y-auto rounded-r-2xl border border-gray-200"
          >
            <div className="p-6">
              <div className="flex items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 ml-18 -mt-0.5">Menu</h3>
              </div>

              {/* Streams Section */}
              <div className="mb-4">
                <button
                  onClick={toggleStreamsInSidebar}
                  className="w-full text-left py-3 px-4 font-semibold rounded-md bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-gray-800 transition-colors duration-300 border border-blue-200"
                >
                  Streams {streamsExpanded ? '▼' : '▶'}
                </button>

                <AnimatePresence>
                  {streamsExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-white rounded-md mt-2 border border-gray-200"
                    >
                      {streams.map((stream, index) => (
                        <motion.button
                          key={stream.name}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -20, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleStream(stream.name)}
                          className={`w-full text-left py-2 px-4 text-sm font-medium rounded transition-all duration-300 ${
                            activeStream === stream.name
                              ? `bg-gradient-to-r ${lightColorGradients[index % lightColorGradients.length]} text-gray-800 shadow-md`
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          <span className="mr-2">{stream.icon}</span>
                          {stream.name}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Move Explore All Courses Button here (after streams) */}
              <button
                onClick={handleExploreAllCourses}
                className={`w-full mb-4 py-3 px-4 font-semibold rounded-md text-gray-800 text-center transition border ${
                  showAllCourses
                    ? 'bg-gradient-to-r from-purple-100 to-purple-200 border-purple-300'
                    : 'bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border-purple-200'
                }`}
              >
                <span className="mr-2">🔍</span>
                Explore All Courses
              </button>

              {/* Enhanced Navigation Links */}
              <Link
                to="/after12th/entrance12"
                className="block w-full mb-4 py-3 px-4 font-semibold rounded-md bg-gradient-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 text-gray-800 text-center transition border border-yellow-200"
              >
                🎯 Entrance Exams Guide
              </Link>

              

              <Link
                to="/after12th/Scholarship12"
                className="block w-full mb-4 py-3 px-4 font-semibold rounded-md bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 text-gray-800 text-center transition border border-purple-200"
              >
                🎓 Scholarships & Aid
              </Link>

              <Link
                to="/after12th/cutoff12"
                className="block w-full mb-4 py-3 px-4 font-semibold rounded-md bg-gradient-to-r from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 text-gray-800 text-center transition border border-indigo-200"
              >
                Cutoff Analyser
              </Link>

              <Link
                to="/"
                className="block w-full py-3 px-4 font-semibold rounded-md bg-gradient-to-r from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 text-gray-800 text-center transition border border-pink-200"
              >
                🏠 Back to Home
              </Link>
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
              <span className="animation-delay-0">🎓</span>
              <span className="animation-delay-200">✨</span>
              <span className="animation-delay-400">🚀</span>
            </div>
          </div>

          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            After 12th Career Guide
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore comprehensive career options across Engineering, Medical, Arts, Science, Commerce, and more
          </p>
        </div>

        {/* Content Area */}
        <div className="px-8 pb-8">
          <AnimatePresence>
            {/* Show All Courses View */}
            {/* Show All Courses View */}
{showAllCourses && (
  <motion.div
    key="all-courses"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
  >
    <div className="mb-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">All Available Courses</h2>
      <p className="text-gray-600">Browse through {getAllCourses().length} courses across all streams</p>
    </div>

    {/* Group courses by stream */}
    {streams.map((stream, streamIndex) => (
      <div key={stream.name} className="mb-12">
        <div className={`bg-gradient-to-r ${stream.bg} rounded-2xl p-6 mb-6`}>
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="mr-3 text-3xl">{stream.icon}</span>
            {stream.name} Courses
          </h3>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {stream.courses.map((course, index) => (
            <motion.div
              key={course.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              whileHover={{ y: -5 }}
              onClick={() => handleCourseClick(course)}
              className={`cursor-pointer bg-gradient-to-br ${lightColorGradients[index % lightColorGradients.length]} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 relative overflow-hidden group`}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/30 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{course.name}</h3>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">📚 Duration:</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">🎯 Category:</span>
                    <span>{course.category}</span>
                  </div>
                  {course.location && (
                    <div className="flex items-center">
                      <span className="font-medium mr-2">📍 Location:</span>
                      <span className="text-xs">{course.location}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">View Subjects</span>
                  <svg className="w-5 h-5 text-gray-700 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ))}
  </motion.div>
)}
                {/* Stream View */}
            {activeStream && !showAllCourses && (
              <motion.div
                key={activeStream}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-8">
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    {streams.find(s => s.name === activeStream)?.icon} {activeStream} Courses
                  </h2>
                  <p className="text-gray-600">
                    Explore {streams.find(s => s.name === activeStream)?.courses.length} courses in {activeStream}
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {streams
                    .find(s => s.name === activeStream)
                    ?.courses.map((course, index) => (
                      <motion.div
                        key={course.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        onClick={() => handleCourseClick(course)}
                        className={`cursor-pointer bg-gradient-to-br ${lightColorGradients[index % lightColorGradients.length]} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 relative overflow-hidden group`}
                      >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/30 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>

                        <div className="relative z-10">
                          <h3 className="text-xl font-bold text-gray-800 mb-3">{course.name}</h3>

                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <span className="font-medium mr-2">📚 Duration:</span>
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium mr-2">🎯 Category:</span>
                              <span>{course.category}</span>
                            </div>
                            {course.location && (
                              <div className="flex items-center">
                                <span className="font-medium mr-2">📍 Location:</span>
                                <span className="text-xs">{course.location}</span>
                              </div>
                            )}
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-700">View Subjects</span>
                            <svg className="w-5 h-5 text-gray-700 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            )}

            {/* Default View - Stream Cards */}
            {!activeStream && !showAllCourses && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8 text-center">
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Stream</h2>
                  <p className="text-gray-600">Select a stream to explore career options</p>
                </div>

                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {streams.map((stream, index) => (
                    <motion.div
                      key={stream.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -10 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleStream(stream.name)}
                      className={`cursor-pointer bg-gradient-to-br ${stream.bg} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 relative overflow-hidden group`}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-500"></div>

                      <div className="relative z-10">
                        <div className="text-5xl mb-4">{stream.icon}</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{stream.name}</h3>
                        <p className="text-gray-700 font-medium">{stream.courses.length} Courses Available</p>

                        <div className="mt-6 flex items-center text-gray-700">
                          <span className="text-sm font-semibold">Explore Courses</span>
                          <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Subjects Modal */}
      <AnimatePresence>
        {showSubjectsModal && activeCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeSubjectsModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`bg-gradient-to-r ${
                activeCourse.streamBg || 
                streams.find(s => s.courses.includes(activeCourse))?.bg || 
                'from-blue-50 via-blue-100 to-blue-200'
              } p-8 relative`}>
                <button
                  onClick={closeSubjectsModal}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h2 className="text-3xl font-bold text-gray-800 mb-2">{activeCourse.name}</h2>
                <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                  <span className="flex items-center">
                    <span className="font-semibold mr-2">📚 Duration:</span>
                    {activeCourse.duration}
                  </span>
                  <span className="flex items-center">
                    <span className="font-semibold mr-2">🎯 Category:</span>
                    {activeCourse.category}
                  </span>
                  {activeCourse.location && (
                    <span className="flex items-center">
                      <span className="font-semibold mr-2">📍 Location:</span>
                      {activeCourse.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8 overflow-y-auto max-h-[60vh]">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Core Subjects</h3>
                
                <div className="grid gap-4">
                  {activeCourse.subjects.map((subject, index) => (
                    <motion.div
                      key={subject.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                    >
                      <h4 className="text-lg font-bold text-gray-800 mb-2">{subject.name}</h4>
                      <p className="text-gray-600 leading-relaxed">{subject.description}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Additional Info */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <h4 className="text-lg font-bold text-gray-800 mb-3">💡 Career Prospects</h4>
                  <p className="text-gray-700">
                    Graduates of {activeCourse.name} have diverse career opportunities in various sectors. 
                    This course provides a strong foundation for professional growth and specialization.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <Link
                    to={`/after12th/courses/${slugify(activeCourse.streamName || 'general')}/${slugify(activeCourse.name)}`}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition"
                  >
                    View Full Details
                  </Link>
                  <button
                    onClick={closeSubjectsModal}
                    className="text-gray-600 hover:text-gray-800 font-semibold transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default After12th;