import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const collegeCategories = [
  {
    name: 'Degree Colleges',
    icon: '🎓',
    bg: 'from-blue-50 via-blue-100 to-blue-200',
    particles: '📚🎓📖',
    types: ['Government Degree Colleges', 'Private Degree Colleges', 'Autonomous Colleges']
  },
  {
    name: 'MBA Colleges',
    icon: '💼',
    bg: 'from-green-50 via-green-100 to-green-200',
    particles: '💼📊📈',
    types: ['IIM', 'University MBA', 'Private MBA', 'Specialized MBA']
  },
  {
    name: 'Education Colleges',
    icon: '👨‍🏫',
    bg: 'from-purple-50 via-purple-100 to-purple-200',
    particles: '👨‍🏫📝✏️',
    types: ['B.Ed Colleges', 'D.Ed Colleges', 'Physical Education', 'Teacher Training']
  },
  {
    name: 'Engineering Colleges',
    icon: '⚙️',
    bg: 'from-orange-50 via-orange-100 to-orange-200',
    particles: '⚙️🔧🏗️',
    types: ['Government Polytechnic', 'Private Polytechnic', 'Engineering Colleges', 'Technical Institutes']
  },
  {
    name: 'Medical Colleges',
    icon: '🏥',
    bg: 'from-red-50 via-red-100 to-red-200',
    particles: '🏥💊🩺',
    types: ['Government Medical', 'Private Medical', 'Paramedical', 'Nursing Colleges']
  },
  {
    name: 'Law Colleges',
    icon: '⚖️',
    bg: 'from-indigo-50 via-indigo-100 to-indigo-200',
    particles: '⚖️📖🏛️',
    types: ['Government Law', 'Private Law', 'Integrated Law', 'Legal Studies']
  },
  {
    name: 'Arts & Design',
    icon: '🎨',
    bg: 'from-pink-50 via-pink-100 to-pink-200',
    particles: '🎨🖌️🎭',
    types: ['Fine Arts', 'Design Institutes', 'Fashion Design', 'Media Colleges']
  },
  {
    name: 'Agriculture',
    icon: '🌾',
    bg: 'from-teal-50 via-teal-100 to-teal-200',
    particles: '🌾🚜🌱',
    types: ['Agricultural Colleges', 'Veterinary Colleges', 'Forestry Institutes', 'Horticulture']
  }
];

const collegeDetails = {
  // Degree Colleges
  'Government Degree Colleges': {
    colleges: [
      {
        name: 'Government Degree College, Baramulla (Boys)',
        established: '1943',
        affiliation: 'University of Kashmir; Autonomous; UGC recognised',
        location: 'Khwaja Bagh, Baramulla, on NH-44, ~4 km from Baramulla town centre; ~51 km from Srinagar',
        campusSize: 'Semi-urban hillock site',
        website: 'baramullacollege.net',
        programs: [
          'B.A., B.Sc. (Medical & Non-Medical), B.Com, BBA, BCA',
          'Bio-Technology, Electronics, Information Technology',
          'Mass Communication & Video Production',
          'Multimedia & Mass Comm. Honours',
          'M.A./M.Sc in some subjects',
          'Master\'s in Computer Applications'
        ],
        infrastructure: [
          'Allama Rumi Central Library: automated (SOUL 2.0) and uses KOHA and RFID tech',
          'Labs for science/IT etc; several departments (Botany, Chemistry, Physics, Mathematics)',
          'Auditorium, seminar halls, spaces for co-curricular, cultural & sports activities'
        ],
        accreditation: 'NAAC Grade: A',
        recognition: 'Recognised by UGC under 2(f) & 12(B)',
        contact: 'Phone/email not clearly listed',
        notes: 'Strong reputation in the region for offering diverse fields, especially in Science/IT/Media'
      },
      {
        name: 'Government Degree College (Women), Baramulla',
        established: '1986',
        affiliation: 'University of Kashmir; UGC recognised under 2(f) & 12(B)',
        location: 'On National Highway Road, near Tehsil point, Baramulla; ~54 km NW of Srinagar',
        campusSize: '~4.625 acres',
        website: 'gdcwbla.ac.in',
        programs: [
          'B.A., B.Sc. (Medical & Non-Medical), B.Com, BCA',
          'Data Care Management',
          'Data Processing & Management',
          'Sericulture'
        ],
        infrastructure: [
          'Science stream (introduced in 2002)',
          'Computer science (from ~2005)',
          'Library, labs, classrooms for Arts/Science/Commerce streams'
        ],
        accreditation: 'NAAC Grade: B',
        recognition: 'UGC recognised under 2(f) & 12(B)',
        contact: 'Language of instruction includes English, Urdu, Kashmiri',
        notes: 'Dedicated women\'s college serving the region'
      },
      {
        name: 'Government Degree College, Boniyar',
        established: '2020',
        affiliation: 'University of Kashmir (co-educational degree college)',
        location: 'Chahal, Boniyar, Baramulla; ~20 km west from Baramulla headquarters',
        campusSize: 'Infrastructure under development',
        website: 'gdcboniyar.com',
        programs: [
          'Arts stream (B.A) confirmed',
          'Other streams (Science/Commerce) likely developing'
        ],
        infrastructure: [
          'Construction ongoing: two laboratory blocks',
          'Cost of construction ~Rs 13.92 crore for initial phases',
          'Basic classrooms, library under development'
        ],
        accreditation: 'UGC recognition inferred',
        recognition: 'Government degree college status',
        contact: 'New establishment',
        notes: 'Important for access in Boniyar region; students earlier had to travel to Baramulla or Uri'
      },
      {
        name: 'Government Degree College, Tangmarg',
        established: '2011',
        affiliation: 'University of Kashmir; UGC recognised; NAAC accredited',
        location: 'Tangmarg, Baramulla district, Jammu & Kashmir',
        campusSize: '~10.84 acres',
        website: 'Not reliably found',
        programs: [
          'B.A. and B.Sc.'
        ],
        infrastructure: [
          'Library, departmental labs for sciences',
          'Facilities for sports, gym, health centre/basic medical facilities',
          'IT support'
        ],
        accreditation: 'NAAC Grade: C (CGPA ~1.84/4)',
        recognition: 'UGC recognised',
        contact: 'Student count ~571; faculty count ~19',
        notes: 'Assessment in May 2022'
      },
      {
        name: 'Government Degree College, Pattan',
        established: '2005',
        affiliation: 'University of Kashmir; UGC recognised under 2(f) & 12(B)',
        location: 'Pattan, Baramulla district; about 0.5 km from Pattan Chowk; rural setting',
        campusSize: 'Not clearly sized',
        website: 'Not specified',
        programs: [
          'B.A., B.Sc (Medical & Non-Medical), B.Com',
          'B.Sc in IT',
          'Skill-courses under NEP 2020'
        ],
        infrastructure: [
          'Labs for science',
          'Library, classrooms',
          'Computer labs for IT course'
        ],
        accreditation: 'NAAC Grade: C (first cycle; score ~2.0)',
        recognition: 'UGC recognised under 2(f) & 12(B)',
        contact: 'Basic amenities available',
        notes: 'Serves students of the Pattan area and surroundings'
      },
      {
        name: 'Government Degree College, Uri',
        established: '2005',
        affiliation: 'University of Kashmir; UGC recognised under sections 2(f) & 12(B)',
        location: 'Uri town, Baramulla district; rural border/hilly area; ~50 km west of Baramulla',
        campusSize: 'Rural campus',
        website: 'Not specified',
        programs: [
          'B.A.',
          'B.Sc (Medical)',
          'B.Sc (Non-Medical)'
        ],
        infrastructure: [
          'Basic labs, classrooms',
          'Library and general UG college facilities',
          'Emphasis on access for border/remote area students'
        ],
        accreditation: 'UGC recognised',
        recognition: 'Meets affiliation criteria under University of Kashmir',
        contact: 'Border area location',
        notes: 'Important for local students; helps reduce long travel for students in far-flung/border regions'
      },
      {
        name: 'Government Degree College, Dangiwacha (Rafiabad)',
        established: '2019',
        affiliation: 'University of Kashmir; recognized by UGC',
        location: 'Dangiwacha, Rafiabad, Baramulla district, Jammu & Kashmir',
        campusSize: 'Currently operates from make-shift accommodation',
        website: 'gdcdangiwacha.edu.in',
        programs: [
          'Undergraduate courses in Arts, Science, Commerce streams',
          'NEP-aligned 5th & 6th Semester courses',
          'Honours/Research courses'
        ],
        infrastructure: [
          'Classrooms and administrative offices in temporary structures',
          'Basic labs, library, student services being arranged',
          'Full permanent infrastructure under planning'
        ],
        accreditation: 'UGC recognised',
        recognition: 'Government Order No. 48-HE dated 05/02/2019',
        contact: 'Phone: 9419012350, Email: gdc-dangiwacha@jk.gov.in',
        notes: 'Offers local students in Rafiabad easier access, reducing need for long travel'
      },
      {
        name: 'Government Degree College, Sopore',
        established: '1951',
        affiliation: 'University of Kashmir; UGC recognised under 2(f) & 12(B)',
        location: 'Sopore town, Baramulla; ~50 km NW of Srinagar',
        campusSize: '~52 kanals (semi-urban campus)',
        website: 'gdcsopore.ac.in',
        programs: [
          'B.A., B.Sc. (Medical/Non-Medical), B.Com, BBA, BCA',
          'M.A. in English, M.A. in Urdu, M.A. in Political Science',
          'IT & vocational courses under NEP-2020'
        ],
        infrastructure: [
          'Central library with digital services',
          'Science labs, IT/computer labs',
          'Auditorium, NSS/NCC units, sports grounds',
          'Women\'s study centre'
        ],
        accreditation: 'NAAC Grade: B+',
        recognition: 'UGC recognised',
        contact: 'Phone: 01954-222507, Email: info@gdcsopore.ac.in',
        notes: 'One of the older established colleges in the region'
      },
      {
        name: 'Government Degree College, Sumbal',
        established: '2012',
        affiliation: 'University of Kashmir',
        location: 'Nesbal (Sumbal Sonawari), Baramulla district',
        campusSize: 'Rural/semi-urban site; new permanent campus developing',
        website: 'gdcsumbal.in',
        programs: [
          'B.A., B.Sc. (Medical/Non-Medical), B.Com, BCA',
          'Environmental Studies, IT courses'
        ],
        infrastructure: [
          'Library, science labs (developing)',
          'Basic sports facilities, NSS activities',
          'Still expanding infrastructure'
        ],
        accreditation: 'NAAC accreditation process under way',
        recognition: 'Recognised by UGC (sections 2f & 12B)',
        contact: 'Email: principal@gdcsumbal.in',
        notes: 'One of the newer colleges, still developing'
      },
      {
        name: 'Government Degree College, Ajas',
        established: '2008 (functioning started in 2012)',
        affiliation: 'University of Kashmir',
        location: 'Ajas town, Sonawari tehsil, Baramulla district',
        campusSize: 'Rural setting; developing infrastructure',
        website: 'gdcajas.ac.in',
        programs: [
          'B.A., B.Sc. (Medical/Non-Medical), B.Com',
          'Computer literacy programs'
        ],
        infrastructure: [
          'Library, science/computer labs (basic)',
          'Sports & co-curricular activities encouraged'
        ],
        accreditation: 'NAAC assessment awaited',
        recognition: 'Recognised by UGC under 2(f)',
        contact: 'Phone: 01957-274344',
        notes: 'Serves rural Sonawari tehsil area'
      }
    ]
  },

  // MBA Colleges
  'IIM': {
    colleges: [
      {
        name: 'IIM Jammu (Indian Institute of Management, Jammu)',
        established: '2016',
        affiliation: 'Institute of National Importance',
        location: 'Jagti, Jammu',
        campusSize: 'Modern campus at Jagti',
        website: 'iimjammu.ac.in',
        programs: [
          'MBA (General)',
          'Executive MBA',
          'MBA in IT Systems & Analytics (Electives)',
          'PhD in Management'
        ],
        infrastructure: [
          'Smart classrooms',
          'Bloomberg Lab',
          'Hostel facilities',
          'Library with digital resources',
          'Entrepreneurship cell'
        ],
        accreditation: 'NIRF 2024 MBA Ranking ~41',
        recognition: 'Institute of National Importance',
        placements: 'Average CTC ₹17–18 LPA; Top recruiters: Deloitte, EY, ICICI, Infosys, Amazon',
        fees: '~₹17–18 lakhs for 2 years',
        admission: 'CAT + WAT/PI',
        faculty: 'IIM/IIT/Foreign university alumni, PhD holders',
        contact: 'Excellent placements, tough curriculum, good peer group',
        notes: 'Very high degree value in India & abroad, leadership roles after 5–10 years'
      }
    ]
  },

  'University MBA': {
    colleges: [
      {
        name: 'University of Jammu',
        established: '1969',
                affiliation: 'NAAC A+ accredited; UGC recognized',
        location: 'Jammu, Jammu & Kashmir',
        campusSize: 'Large university campus',
        website: 'jammuuniversity.ac.in',
        programs: [
          'MBA (General)',
          'MBA (Hospitality & Tourism Management)',
          'MBA (International Business)',
          'MBA (HR/Finance/Marketing electives)'
        ],
        infrastructure: [
          'Central library',
          'Hostel facilities',
          'IT labs',
          'Sports facilities',
          'Auditorium'
        ],
        accreditation: 'NAAC A+ accredited',
        recognition: 'UGC recognized',
        placements: 'Average ₹5–6 LPA; recruiters include banks, IT firms, corporates',
        fees: '₹1.2–1.5 lakhs approx.',
        admission: 'JUET/CMAT/CAT + GD/PI',
        faculty: 'Mix of senior professors & young researchers',
        contact: 'Good ROI, strong alumni in govt & corporate',
        notes: 'Good for govt jobs + corporate mid-level roles'
      },
      {
        name: 'Central University of Jammu',
        established: '2011',
        affiliation: 'UGC recognized, NAAC accredited',
        location: 'Rahya-Suchani, Bagla, Jammu',
        campusSize: 'Wi-Fi campus',
        website: 'cujammu.ac.in',
        programs: [
          'MBA (General)',
          'MBA (HR, Marketing, Finance electives)'
        ],
        infrastructure: [
          'Hostel facilities',
          'Wi-Fi campus',
          'Labs',
          'Seminar halls'
        ],
        accreditation: 'NAAC accredited',
        recognition: 'UGC recognized',
        placements: 'Average ₹4–5 LPA',
        fees: '~₹80,000–1 lakh',
        admission: 'CUET-PG + Interview',
        faculty: 'Qualified PhDs, young faculty',
        contact: 'Budget-friendly, decent placements',
        notes: 'Good value for money option'
      },
      {
        name: 'University of Kashmir (Hazratbal, Srinagar)',
        established: '1948',
        affiliation: 'NAAC A+; UGC recognized',
        location: 'Hazratbal, Srinagar, Kashmir',
        campusSize: 'IT-enabled campus',
        website: 'kashmiruniversity.net',
        programs: [
          'MBA (General)',
          'MBA (Financial Management)',
          'MBA (Tourism & Travel)'
        ],
        infrastructure: [
          'IT-enabled campus',
          'Hostels',
          'Sports facilities',
          'Research centres'
        ],
        accreditation: 'NAAC A+',
        recognition: 'UGC recognized',
        placements: '₹4–5 LPA average, mostly in banking/finance, regional IT',
        fees: '₹1–1.5 lakhs',
        admission: 'CMAT/University Test + GD/PI',
        faculty: 'Experienced faculty with research background',
        contact: 'Safe environment, high local govt job opportunities',
        notes: 'Strong regional presence and government job opportunities'
      },
      {
        name: 'SMVDU (Shri Mata Vaishno Devi University, Katra)',
        established: '1999',
        affiliation: 'NAAC A, AICTE & UGC approved',
        location: 'Katra, Jammu & Kashmir',
        campusSize: 'Campus near Vaishno Devi',
        website: 'smvdu.ac.in',
        programs: [
          'MBA (Finance, Marketing, HR, Operations, Business Analytics)'
        ],
        infrastructure: [
          'Modern hostels',
          'Labs',
          'Incubation centres',
          'Campus near Vaishno Devi shrine'
        ],
        accreditation: 'NAAC A',
        recognition: 'AICTE & UGC approved',
        placements: 'Average ₹5 LPA; recruiters: Wipro, HDFC, Infosys',
        fees: '~₹2–2.5 lakhs',
        admission: 'CAT/CMAT/SMVDU Test',
        faculty: 'Qualified faculty with industry experience',
        contact: 'Good environment, but far from city',
        notes: 'Unique location advantage near religious site'
      },
      {
        name: 'IUST (Islamic University of Science & Technology, Awantipora)',
        established: '2005',
        affiliation: 'NAAC accredited; state public university',
        location: 'Awantipora, Kashmir',
        campusSize: 'Eco-friendly campus',
        website: 'islamicuniversity.edu.in',
        programs: [
          'MBA (General)',
          'MBA (International Business)'
        ],
        infrastructure: [
          'Good IT labs',
          'Hostels',
          'Eco-friendly campus'
        ],
        accreditation: 'NAAC accredited',
        recognition: 'State public university',
        placements: '₹3.5–4.5 LPA average',
        fees: '₹1–1.2 lakhs',
        admission: 'CMAT/University entrance',
        faculty: 'Academic faculty with research focus',
        contact: 'Rising popularity in J&K, improving placement',
        notes: 'Growing reputation in the region'
      },
      {
        name: 'BGSBU (Baba Ghulam Shah Badshah University, Rajouri)',
        established: '2002',
        affiliation: 'UGC approved, NAAC accredited',
        location: 'Rajouri, Jammu & Kashmir',
        campusSize: 'University campus',
        website: 'bgsbu.ac.in',
        programs: [
          'MBA (General with Finance/HR/Marketing)'
        ],
        infrastructure: [
          'Hostels',
          'IT centre',
          'Library',
          'Sports facilities'
        ],
        accreditation: 'NAAC accredited',
        recognition: 'UGC approved',
        placements: 'Mostly local jobs & banks, avg. ₹3–4 LPA',
        fees: '₹80,000–1 lakh',
        admission: 'CMAT/University entrance',
        faculty: 'University faculty',
        contact: 'Regional focus',
        notes: 'Good for local employment opportunities'
      }
    ]
  },

  'Specialized MBA': {
    colleges: [
      {
        name: 'AIIMS Jammu (Hospital/Healthcare Management)',
        established: '2019',
        affiliation: 'Institute of National Importance',
        location: 'Vijaypur, Jammu',
        campusSize: 'Super-specialty hospital campus',
        website: 'aiimsjammu.edu.in',
        programs: [
          'MBA/PG Diploma in Hospital & Healthcare Management'
        ],
        infrastructure: [
          'Super-specialty hospital',
          'Labs',
          'Research centres'
        ],
        accreditation: 'Institute of National Importance',
        recognition: 'AIIMS status',
        placements: 'Healthcare industry, public health jobs',
        fees: 'Nominal (govt subsidized)',
        admission: 'Entrance exam/interview (allied health stream)',
        faculty: 'Medical and management faculty',
        contact: 'Healthcare sector focus',
        notes: 'Specialized in healthcare management'
      }
    ]
  },

  // Education Colleges
  'B.Ed Colleges': {
    colleges: [
      {
        name: 'Government College of Education, Jammu',
        established: 'Not specified',
        affiliation: 'Affiliated with University of Jammu',
        location: 'Jammu, Jammu & Kashmir',
        campusSize: 'Well-maintained campus',
        website: 'Not specified',
        programs: [
          'B.Ed (Bachelor of Education): 2-year full-time program',
          'M.Ed (Master of Education): 2-year full-time program',
          'B.Ed-M.Ed Integrated: 5-year full-time program'
        ],
        infrastructure: [
          'Separate hostels for boys and girls',
          'Well-stocked library with educational resources',
          'Laboratories equipped with modern teaching aids',
          'Sports facilities for various activities',
          'Cafeteria for students and staff',
          'On-campus medical facility',
          'Computer labs with internet access',
          'Gym facilities'
        ],
        accreditation: 'Recognized by NCTE',
        recognition: 'NCTE and University of Jammu recognized',
        placements: 'Approximately 70–80% placement rate; Average salary: ₹15,000–₹25,000/month',
        fees: 'B.Ed: ₹23,180/year; M.Ed: ₹25,248/year; Hostel: ₹1,000/year (refundable)',
        admission: 'Graduation with 50% marks; JKBOPEE entrance exam; June–August timeline',
        faculty: 'Approximately 35–40 members; M.Ed, Ph.D. in Education; Student–Faculty Ratio: ~15:1',
        contact: 'Intake: B.Ed: 200 students, M.Ed: 29 students',
        notes: 'One of the premier institutions for teacher education in J&K'
      },
      {
        name: 'University of Kashmir, Srinagar',
        established: '1948',
        affiliation: 'Affiliated with University of Kashmir',
        location: 'Hazratbal, Srinagar, Kashmir',
        campusSize: 'University campus',
        website: 'kashmiruniversity.net',
        programs: [
          'Integrated B.Ed-M.Ed: 3-year full-time program'
        ],
        infrastructure: [
          'Hostels for both boys and girls',
          'Well-stocked library with educational resources',
          'Laboratories equipped with modern teaching aids',
          'Sports facilities',
          'Cafeteria',
          'On-campus medical facility',
          'Computer labs with internet access'
        ],
        accreditation: 'Recognized by NCTE',
        recognition: 'NCTE and University of Kashmir recognized',
        placements: 'Approximately 70–80% placement rate; Average salary: ₹15,000–₹25,000/month',
        fees: 'Tuition Fee: ₹23,180/year; Hostel: ₹1,000/year (refundable)',
        admission: 'Postgraduate in Science/Social Science/Humanities with 55% marks; JKBOPEE; June–August',
        faculty: 'Approximately 35–40 members; M.Ed, Ph.D. in Education; Student–Faculty Ratio: ~15:1',
        contact: 'Eligibility: Graduation with 50% marks minimum',
        notes: 'Premier institution for teacher education in Kashmir'
      },
      {
        name: 'Central University of Kashmir, Srinagar',
        established: '2009',
        affiliation: 'Affiliated with Central University of Kashmir',
        location: 'Ganderbal, Kashmir',
        campusSize: 'Modern university campus',
        website: 'cukashmir.ac.in',
        programs: [
          'Integrated B.Ed-M.Ed: 5-year full-time program',
          'Master of Education (M.Ed.): 2-year full-time program'
        ],
        infrastructure: [
          'Hostels for both boys and girls',
          'Well-stocked library',
          'Modern laboratories with teaching aids',
          'Sports facilities',
          'Cafeteria',
          'Medical facility',
          'Computer labs with internet'
        ],
        accreditation: 'Recognized by NCTE',
        recognition: 'NCTE and Central University of Kashmir recognized',
        placements: 'Approximately 60–70% placement rate; Average salary: ₹12,000–₹20,000/month',
        fees: 'M.Ed: ₹33,770 for entire 2-year program; Hostel: ₹1,500–₹2,000/year',
        admission: 'M.Ed: B.Ed with 50% marks; Integrated: PG with 55% marks; CUET-PG; June–August',
        faculty: 'Approximately 30–35 members; M.Ed, Ph.D.; Student–Faculty Ratio: ~15:1',
        contact: 'Intake: M.Ed: 50 students, Integrated: 52 students',
        notes: 'Emerging prominent institution for teacher education'
      }
    ]
  },

  'D.Ed Colleges': {
    colleges: [
      {
        name: 'District Institute of Education and Training (DIET), Jammu',
        established: 'Government institute',
        affiliation: 'Affiliated with JKBOSE',
        location: 'Jammu, Jammu & Kashmir',
        campusSize: 'Basic government institute setup',
        website: 'Not specified',
        programs: [
          'D.Ed (Diploma in Education): 2-year program for primary/elementary teaching',
          'ETT (Elementary Teacher Training): 1–2 year program for elementary education'
        ],
        infrastructure: [
          'Limited hostel facilities (priority to outstation students)',
          'Educational resources and teaching manuals library',
          'Smart classrooms for teaching practice',
          'Basic sports facilities for physical education',
          'Computer lab with internet for research',
          'Small refreshment facilities'
        ],
        accreditation: 'Recognized by NCTE',
        recognition: 'NCTE and JKBOSE recognized',
        placements: '~65–75% placement rate; Average salary: ₹10,000–₹18,000/month',
        fees: 'Tuition: ₹4,500–₹6,000/year; Hostel: ₹500–₹1,000/year',
        admission: '10+2 with 50% marks; Merit-based/state-level selection; June–August',
        faculty: '15–25 faculty; B.Ed, M.Ed, Ph.D. in Education; Student–Faculty Ratio: ~20:1',
        contact: 'Intake: 50–100 students per course',
        notes: 'Leading government teacher training institute in Jammu region'
      }
    ]
  },

  'Physical Education': {
    colleges: [
      {
        name: 'Government College of Physical Education, Ganderbal',
        established: 'Not specified',
        affiliation: 'Affiliated with University of Kashmir',
        location: 'Ganderbal, Kashmir',
        campusSize: 'Sports-focused campus',
        website: 'Not specified',
        programs: [
          'Bachelor of Physical Education (B.P.Ed): 2-year full-time program'
        ],
        infrastructure: [
          'Hostels for boys and girls with basic amenities',
          'Library with physical education and sports science books',
          'Modern sports labs and fitness labs',
          'Physiotherapy equipment for practical training',
          'Cricket, football, basketball, volleyball grounds',
          'Athletics track and gymnasium',
          'Indoor sports facilities',
          'Cafeteria/Canteen',
          'IT & Multimedia labs with projectors',
          'Auditorium for seminars and events'
        ],
        accreditation: 'Recognized by NCTE',
        recognition: 'NCTE and University of Kashmir recognized',
        placements: 'Approximately 60–70% placement rate; Average salary: ₹15,000–₹25,000/month',
        fees: 'Tuition: ₹20,000–₹25,000/year; Hostel: ₹1,500–₹2,000/year',
                admission: 'Graduation with 45% marks + physical education subject; University entrance/fitness test; June–August',
        faculty: '20–25 faculty specializing in sports and health sciences; M.P.Ed, Ph.D., B.P.Ed; Student–Faculty Ratio: ~15:1',
        contact: 'Intake: 80 students; Emphasis on practical training',
        notes: 'Leading institution for physical education in J&K; Career paths include PE teacher, sports coach, fitness trainer'
      }
    ]
  },

  // Engineering Colleges
  'Government Polytechnic': {
    colleges: [
      {
        name: 'Government Polytechnic College, Jammu',
        established: 'Not specified',
        affiliation: 'AICTE approved',
        location: 'Khellani, Jammu',
        campusSize: 'Technical campus',
        website: 'Not specified',
        programs: [
          'Diploma in Civil Engineering',
          'Diploma in Mechanical Engineering',
          'Diploma in Electrical Engineering',
          'Diploma in Electronics & Communication Engineering',
          'Diploma in Computer Science/IT'
        ],
        infrastructure: [
          'Separate hostels for boys and girls (130 capacity)',
          'Well-equipped department-wise laboratories',
          'Extensive library with books and journals',
          'Wi-Fi campus',
          'Sports ground',
          'Cafeteria/Canteen',
          'Auditorium for events and seminars'
        ],
        accreditation: 'AICTE approved',
        recognition: 'AICTE approval',
        placements: 'Approximately 70–80% placement rate; Average salary: ₹12,000–₹18,000/month; Recruiters: L&T, BHEL, local infrastructure firms',
        fees: 'Annual tuition: ₹6,690; Hostel: ₹700/year (₹100 refundable)',
        admission: 'Class 10th with 50% marks; JKBOTE entrance exam; June–August',
        faculty: '30–40 teaching staff; Bachelor\'s to Master\'s degrees; Student–Faculty Ratio: ~15:1',
        contact: 'Total intake: 370 seats across all branches',
        notes: 'Lateral entry to B.E/B.Tech 2nd year available; Overall rating 3.75/5'
      },
      {
        name: 'Government Polytechnic College, Baramulla',
        established: 'Not specified',
        affiliation: 'AICTE approved',
        location: 'Baramulla, Kashmir',
        campusSize: 'Technical campus',
        website: 'Not specified',
        programs: [
          'Diploma in Civil Engineering',
          'Diploma in Mechanical Engineering',
          'Diploma in Electrical Engineering'
        ],
        infrastructure: [
          'Well-equipped department-wise laboratories',
          'Extensive library collection',
          'Wi-Fi campus',
          'Sports ground',
          'Cafeteria/Canteen',
          'Auditorium for events'
        ],
        accreditation: 'AICTE approved',
        recognition: 'AICTE approval',
        placements: 'Approximately 60–70% placement rate; Average salary: ₹12,000–₹15,000/month; Recruiters: L&T, BHEL, local firms',
        fees: 'Annual tuition: ₹6,690; No hostel facility',
        admission: 'Class 10th with 50% marks; JKBOTE entrance; June–August',
        faculty: '25–30 teaching staff; Bachelor\'s to Master\'s; Student–Faculty Ratio: ~15:1',
        contact: 'Intake: ~60 seats per branch',
        notes: 'Lateral entry to B.E/B.Tech available; Rating 3.7/5'
      },
      {
        name: 'Government Polytechnic College, Budgam',
        established: 'Not specified',
        affiliation: 'AICTE approved',
        location: 'Budgam, Kashmir',
        campusSize: 'Technical campus',
        website: 'Not specified',
        programs: [
          'Diploma in Civil Engineering',
          'Diploma in Mechanical Engineering',
          'Diploma in Automobile Engineering'
        ],
        infrastructure: [
          'Well-equipped laboratories',
          'Library with technical books',
          'Wi-Fi campus',
          'Sports facilities',
          'Cafeteria',
          'Auditorium'
        ],
        accreditation: 'AICTE approved',
        recognition: 'AICTE approval',
        placements: 'Approximately 60–70% placement rate; Average salary: ₹11,000–₹14,000/month',
        fees: 'Annual tuition: ₹6,690; No hostel',
        admission: 'Class 10th with 50% marks; JKBOTE entrance; June–August',
        faculty: '25–30 teaching staff; Student–Faculty Ratio: ~15:1',
        contact: 'Civil & Mechanical: 60 seats each, Automobile: 30 seats',
        notes: 'Rating 3.6/5; Lateral entry available'
      },
      {
        name: 'Government Polytechnic College, Doda',
        established: 'Not specified',
        affiliation: 'AICTE approved',
        location: 'Doda, Jammu & Kashmir',
        campusSize: 'Technical campus',
        website: 'Not specified',
        programs: [
          'Diploma in Civil Engineering',
          'Diploma in Mechanical Engineering'
        ],
        infrastructure: [
          'Department laboratories',
          'Library facilities',
          'Wi-Fi campus',
          'Sports ground',
          'Cafeteria',
          'Auditorium'
        ],
        accreditation: 'AICTE approved',
        recognition: 'AICTE approval',
        placements: 'Approximately 60–70% placement rate; Average salary: ₹11,000–₹14,000/month',
        fees: 'Annual tuition: ₹6,690; No hostel',
        admission: 'Class 10th with 50% marks; JKBOTE entrance; June–August',
        faculty: '25–30 teaching staff; Student–Faculty Ratio: ~15:1',
        contact: 'Intake: ~60 seats per branch',
        notes: 'Rating 3.5/5; Government projects participation'
      },
      {
        name: 'Government Polytechnic College, Shopian',
        established: 'Not specified',
        affiliation: 'AICTE approved',
        location: 'Shopian, Kashmir',
        campusSize: 'Technical campus',
        website: 'Not specified',
        programs: [
          'Diploma in Civil Engineering',
          'Diploma in Mechanical Engineering'
        ],
        infrastructure: [
          'Hostels (limited capacity)',
          'Departmental labs',
          'Library with academic resources',
          'Wi-Fi access',
          'Sports grounds',
          'Cafeteria/canteen',
          'Auditorium'
        ],
        accreditation: 'AICTE approved',
        recognition: 'AICTE approval',
        placements: 'Approximately 60–70% placement rate; Average salary: ₹11,000–₹15,000/month',
        fees: 'Tuition: ₹6,690/year; Hostel: ₹700/year (refundable)',
        admission: 'Class 10th with 50% marks; JKBOTE merit-based; June–August',
        faculty: '~25 faculty members; B.Tech/M.Tech; Student–Faculty Ratio: ~15:1',
        contact: '~60 seats per branch',
        notes: 'Rating 3.5/5; Local industries tie-ups for training'
      },
      {
        name: 'Government Polytechnic College, Udhampur',
        established: 'Not specified',
        affiliation: 'AICTE approved',
        location: 'Udhampur, Jammu & Kashmir',
        campusSize: 'Technical campus',
        website: 'Not specified',
        programs: [
          'Diploma in Automobile Engineering',
          'Diploma in Civil Engineering',
          'Diploma in Mechanical Engineering'
        ],
        infrastructure: [
          'Hostels for boys and girls',
          'Well-equipped labs for practical sessions',
          'Library with books, journals, reference materials',
          'Wi-Fi campus',
          'Sports grounds, cafeteria, auditorium'
        ],
        accreditation: 'AICTE approved',
        recognition: 'AICTE approval',
        placements: '~65–75% placement rate; Average salary: ₹12,000–₹16,000/month; Recruiters: L&T, BHEL, JK PWD, local manufacturing',
        fees: 'Tuition: ₹6,690/year; Hostel: ₹700/year (refundable)',
        admission: 'Class 10th with 50% marks; JKBOTE counselling; June–August',
        faculty: '25–30 faculty; B.Tech/M.Tech; Student–Faculty Ratio: ~15:1',
        contact: '~60 seats per branch',
        notes: 'Rating 3.6–3.7/5; Government projects exposure'
      },
      {
        name: 'Kashmir Government Polytechnic College, Srinagar',
        established: 'Not specified',
        affiliation: 'AICTE approved',
        location: 'Srinagar, Kashmir',
        campusSize: 'Technical campus',
        website: 'Not specified',
        programs: [
          'Diploma in Civil Engineering',
          'Diploma in Mechanical Engineering',
          'Diploma in Electrical Engineering',
          'Diploma in Electronics & Communication',
          'Diploma in Computer Science/IT'
        ],
        infrastructure: [
          'Separate hostels for boys and girls',
          'Well-equipped department labs',
          'Library with extensive academic resources',
          'Wi-Fi campus',
          'Sports grounds',
          'Cafeteria and auditorium'
        ],
        accreditation: 'AICTE approved',
        recognition: 'AICTE approval',
        placements: '~70–80% placement rate; Average salary: ₹12,000–₹18,000/month; Recruiters: L&T, JK PWD, BHEL, IT & manufacturing firms',
        fees: 'Tuition: ₹6,690/year; Hostel: ₹700/year (refundable)',
        admission: 'Class 10th with 50% marks; JKBOTE counselling; June–August',
        faculty: '35–40 teaching staff; B.Tech/M.Tech; Student–Faculty Ratio: ~15:1',
        contact: '~70 seats per branch',
        notes: 'Rating 3.7/5; Real-world industrial training exposure'
      }
    ]
  },

  // Medical Colleges
  'Government Medical': {
    colleges: [
      {
        name: 'Government Medical College, Jammu',
        established: '1973',
        affiliation: 'NMC approved',
        location: 'Jammu, Jammu & Kashmir',
        campusSize: 'Medical campus with hospital',
        website: 'gmcjammu.nic.in',
        programs: [
          'MBBS',
          'MD/MS specializations',
          'Diploma courses in Medical/Paramedical fields',
          'Nursing programs'
        ],
        infrastructure: [
          'Separate hostels for boys and girls',
          'Well-equipped laboratories for Medical, Paramedical courses',
          'Central library with medical journals and digital resources',
          'Wi-Fi enabled campus',
          'Sports facilities',
          'Cafeteria and auditorium',
          'Attached hospital for clinical training'
        ],
        accreditation: 'NMC approved',
        recognition: 'National Medical Commission recognized',
        placements: '~70–80% placement rate; Average salary: ₹12,000–₹18,000/month for diploma courses',
        fees: 'Tuition: ₹6,690/year for diploma; Hostel: ₹700/year (refundable)',
        admission: '10+2 with PCB, 50% marks; NEET for MBBS; Merit for diploma; June–September',
        faculty: '40–50 qualified faculty; MBBS, MD, MS; Student–Faculty Ratio: ~12:1',
        contact: 'Various intake depending on course',
        notes: 'Premier medical institution in Jammu region'
      },
      {
        name: 'Government Medical College, Kathua',
        established: '2019',
        affiliation: 'NMC approved',
        location: 'Kathua, Jammu & Kashmir',
        campusSize: 'New medical campus',
        website: 'gmckathua.ac.in',
        programs: [
          'MBBS',
          'Diploma in Medical/Paramedical fields',
          'Nursing courses'
        ],
        infrastructure: [
          'Modern hostels',
          'State-of-the-art laboratories',
          'Digital library',
          'Wi-Fi campus',
          'Sports facilities',
          'Cafeteria and auditorium',
          'Attached hospital'
        ],
        accreditation: 'NMC approved',
        recognition: 'National Medical Commission recognized',
        placements: '~70–80% placement rate for diploma courses',
        fees: 'Tuition: ₹6,000–₹10,000/year for diploma courses',
        admission: '10+2 with PCB; NEET for MBBS; Merit for diploma',
        faculty: 'Qualified medical faculty; MBBS, MD, MS',
        contact: 'New establishment with growing programs',
        notes: 'Newest medical college in J&K'
      },
      {
        name: 'Government Medical College, Rajouri',
        established: '2017',
        affiliation: 'NMC approved',
        location: 'Rajouri, Jammu & Kashmir',
        campusSize: 'Medical campus',
        website: 'gmcrajouri.ac.in',
        programs: [
          'MBBS',
          'Medical diploma courses',
          'Paramedical programs'
        ],
        infrastructure: [
          'Hostels for students',
          'Medical laboratories',
          'Library with medical resources',
          'Wi-Fi campus',
          'Sports facilities',
          'Hospital for clinical training'
        ],
        accreditation: 'NMC approved',
        recognition: 'National Medical Commission recognized',
        placements: '~70–80% placement rate',
        fees: 'Government subsidized fees',
        admission: 'NEET for MBBS; Merit for diploma courses',
        faculty: 'Medical faculty with specializations',
        contact: 'Serves border region students',
        notes: 'Important for healthcare in border areas'
      },
      {
        name: 'Government Medical College, Srinagar',
        established: '1959',
        affiliation: 'NMC approved',
        location: 'Srinagar, Kashmir',
        campusSize: 'Large medical campus',
        website: 'gmcsrinagar.edu.in',
        programs: [
          'MBBS',
          'MD/MS specializations',
          'Diploma in Medical/Paramedical fields',
          'Nursing programs',
          'Allied health sciences'
        ],
        infrastructure: [
          'Separate hostels with adequate capacity',
          'Well-equipped laboratories for all medical departments',
          'Central library with medical journals and digital resources',
          'Wi-Fi enabled campus',
          'Sports facilities',
          'Cafeteria and auditorium',
          'Associated hospitals for clinical training'
        ],
        accreditation: 'NMC approved',
        recognition: 'National Medical Commission recognized',
        placements: '~80% placement rate; Average salary: ₹15,000–₹25,000/month for diploma',
                fees: 'Tuition: ₹6,000–₹10,000/year for diploma; Hostel: ₹1,000/year (refundable)',
        admission: '10+2 with PCB, 50% marks; NEET for MBBS; Merit for diploma; June–September',
        faculty: '40–50 qualified faculty; MBBS, MD, MS; Student–Faculty Ratio: ~12:1',
        contact: 'Rating 3.8/5 for overall satisfaction',
        notes: 'Premier medical institution in Kashmir; Strong clinical training'
      },
      {
        name: 'Sher-I-Kashmir Institute of Medical Sciences (SKIMS), Srinagar',
        established: '1982',
        affiliation: 'NMC approved',
        location: 'Soura, Srinagar, Kashmir',
        campusSize: 'Super-specialty medical campus',
        website: 'skims.ac.in',
        programs: [
          'MBBS, MD, MS, DM, MCh',
          'Diploma in Nursing',
          'Medical Lab Technology',
          'Radiology',
          'Paramedical fields'
        ],
        infrastructure: [
          'Separate hostels for male and female students',
          'Modern laboratories for medical, nursing, paramedical programs',
          'Library with e-resources, books, journals, research facilities',
          'Wi-Fi campus',
          'Sports facilities, auditorium, seminar halls',
          'Cafeteria',
          'Super-specialty hospital for clinical training'
        ],
        accreditation: 'NMC approved',
        recognition: 'Institute of National Importance status',
        placements: '~80% diploma and paramedical graduates secure jobs; Average salary: ₹15,000–₹25,000/month',
        fees: 'Diploma/paramedical: ₹8,000–₹12,000/year; Hostel: ₹1,200–₹1,500/year',
        admission: '10+2 for diplomas (Science background); NEET for MBBS/PG; Merit-based for diplomas; June–September',
        faculty: 'Highly qualified faculty with specialized degrees and research experience; Student–Faculty Ratio: ~10:1',
        contact: 'Intake varies by course; diploma courses 50–100 per year',
        notes: 'Premier medical institute in J&K; Strong research focus; Career opportunities in hospitals, labs, research'
      }
    ]
  }
};

const Colleges = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');

  const toggleCategory = (category) => {
    setActiveType(null);
    setSelectedCollege(null);
    setActiveCategory(activeCategory === category ? null : category);
  };

  const toggleType = (type) => {
    setSelectedCollege(null);
    setActiveType(activeType === type ? null : type);
  };

  const openCollegePopup = (college) => {
    setSelectedCollege(college);
  };

  const closeCollegePopup = () => {
    setSelectedCollege(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const locations = ['All', 'Jammu', 'Srinagar', 'Baramulla', 'Kashmir', 'Border Areas'];
  const floatingElements = ["🏫", "🎓", "📚", "🔬", "⚙️", "🏥", "⚖️", "🎨"];

  // Search functionality
  const getFilteredCategories = () => {
    return collegeCategories.filter(category => {
      const matchesSearch = category.name.toLowerCase().includes(search.toLowerCase()) ||
                           category.types.some(type => type.toLowerCase().includes(search.toLowerCase()));
      return matchesSearch;
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
                  College Categories
                </h3>
              </div>

              {/* College Categories */}
              <div className="space-y-3 mb-8">
                {collegeCategories.map((category) => (
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
                  to="/after10th/course"
                  className="block w-full py-3 px-4 font-semibold rounded-md bg-green-500/20 hover:bg-green-500/30 text-black-200 text-center transition backdrop-blur-sm border border-green-500/30"
                >
                  📚 All Courses
                </Link>

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
                  to="/after-10th"
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
              <span className="animation-delay-0">🏫</span>
              <span className="animation-delay-200">🎓</span>
              <span className="animation-delay-400">📚</span>
            </div>
          </div>
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-700 to-blue-800 bg-clip-text text-transparent mb-6 animate-pulse">
            All Colleges
          </h1>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search colleges, categories, locations..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-8 pb-8">
          <AnimatePresence>
            {!activeCategory && !search && (
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
                    Discover the best Government across all disciplines. From premier medical institutions like SKIMS to top engineering polytechnics and renowned degree colleges, <span className="text-blue-600 font-semibold">EduAdvisor</span> provides comprehensive information about admissions, facilities, placements, and campus life. Whether you're looking for government colleges with affordable fees or specialized institutions with excellent infrastructure, find your perfect educational match to shape your future.
                  </p>
                </div>

                {/* College Category Cards */}
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full max-w-7xl mx-auto">
                  {collegeCategories.map((category, index) => (
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

                        {/* Type Count */}
                        <p className="text-sm text-gray-600 mb-4">
                          {category.types.length} types available
                        </p>

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
                    <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                    <div className="text-gray-600 text-sm">Total Colleges</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 text-center shadow-sm">
                    <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
                    <div className="text-gray-600 text-sm">Categories</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 text-center shadow-sm">
                    <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                    <div className="text-gray-600 text-sm">Verified Info</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 text-center shadow-sm">
                    <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                    <div className="text-gray-600 text-sm">Support</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Results View */}
          {search && !activeCategory && (
            <div className="animate-fadeIn">
              <div className="mb-6">
                <p className="text-gray-600">
                  Found {getFilteredCategories().length} college categories
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
                      {category.types.length} types: {category.types.slice(0, 2).join(', ')}
                      {category.types.length > 2 && '...'}
                    </div>

                    <div className="text-xs text-blue-600 font-medium">
                      Click to explore colleges →
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

          {/* Category Types View */}
          {activeCategory && !activeType && (
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
                  {activeCategory}
                </span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {collegeCategories.find(cat => cat.name === activeCategory)?.types.map((type) => (
                  <motion.div
                    key={type}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-50 p-6 rounded-xl shadow cursor-pointer hover:shadow-md transition border border-gray-200"
                    onClick={() => toggleType(type)}
                  >
                    <h3 className="font-semibold text-gray-800 text-lg mb-3">{type}</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {collegeDetails[type]?.colleges?.length || 'Multiple'} colleges available
                    </p>
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-600">
                        Click to view colleges
                      </span>
                      <span className="text-gray-500">Explore →</span>
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

          {/* Type Colleges View */}
          {activeType && (
            <motion.section
              key={activeType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                <span className="bg-gradient-to-r from-purple-600 to-blue-800 bg-clip-text text-transparent">
                  {activeType}
                </span>
              </h2>
              
              {/* Colleges Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {collegeDetails[activeType]?.colleges?.map((college, index) => (
                  <motion.div
                    key={college.name}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-50 p-6 rounded-xl shadow cursor-pointer hover:shadow-md transition border border-gray-200"
                    onClick={() => openCollegePopup(college)}
                  >
                    <h3 className="font-semibold text-gray-800 text-lg mb-3">{college.name}</h3>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p><strong>Established:</strong> {college.established}</p>
                      <p><strong>Location:</strong> {college.location.split(',')[0]}</p>
                      <p><strong>Accreditation:</strong> {college.accreditation}</p>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-600">Click for details</span>
                      <span className="text-gray-500">View More →</span>
                    </div>
                  </motion.div>
                )) || (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-600">College details are being updated for this category.</p>
                  </div>
                )}
              </div>

              <div className="text-center mt-8 space-x-4">
                <button
                  onClick={() => setActiveType(null)}
                  className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                  ← Back to {activeCategory}
                </button>
                <button
                  onClick={() => {setActiveCategory(null); setActiveType(null);}}
                  className="bg-gray-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                >
                  ← Back to All Categories
                </button>
              </div>
            </motion.section>
          )}

          {/* College Benefits */}
          {!activeCategory && !search && (
            <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-200 max-w-6xl mx-auto shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">🎯 Why Choose Government Colleges?</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">Quality Education</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• NAAC accredited institutions</li>
                    <li>• UGC recognized programs</li>
                    <li>• Experienced faculty</li>
                    <li>• Modern infrastructure</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">Affordable Fees</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Government subsidized education</li>
                    <li>• Scholarship opportunities</li>
                    <li>• Low hostel fees</li>
                    <li>• Financial aid available</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">Career Opportunities</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Government job preferences</li>
                    <li>• Industry partnerships</li>
                    <li>• Placement assistance</li>
                    <li>• Higher education pathways</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* College Details Popup */}
      <AnimatePresence>
        {selectedCollege && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeCollegePopup}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeCollegePopup}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>

              {/* College Header */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedCollege.name}</h2>
                <p className="text-blue-600 font-semibold">Established: {selectedCollege.established}</p>
              </div>

              {/* College Details Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">🏛️ Affiliation & Recognition</h3>
                    <p className="text-gray-600 text-sm">{selectedCollege.affiliation}</p>
                    <p className="text-gray-600 text-sm mt-1">{selectedCollege.recognition}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">📍 Location & Campus</h3>
                    <p className="text-gray-600 text-sm">{selectedCollege.location}</p>
                    <p className="text-gray-600 text-sm mt-1">Campus Size: {selectedCollege.campusSize}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">🎓 Academic Programs</h3>
                    <ul className="text-gray-600 text-sm space-y-1">
                      {selectedCollege.programs?.map((program, index) => (
                        <li key={index}>• {program}</li>
                      ))}
                    </ul>
                  </div>

                  {selectedCollege.website && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">🌐 Website</h3>
                      <p className="text-blue-600 text-sm">{selectedCollege.website}</p>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                                        <h3 className="font-semibold text-gray-800 mb-2">🏢 Infrastructure & Facilities</h3>
                    <ul className="text-gray-600 text-sm space-y-1">
                      {selectedCollege.infrastructure?.map((facility, index) => (
                        <li key={index}>• {facility}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">🏆 Accreditation</h3>
                    <p className="text-gray-600 text-sm">{selectedCollege.accreditation}</p>
                  </div>

                  {selectedCollege.placements && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">💼 Placements</h3>
                      <p className="text-gray-600 text-sm">{selectedCollege.placements}</p>
                    </div>
                  )}

                  {selectedCollege.fees && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">💰 Fees</h3>
                      <p className="text-gray-600 text-sm">{selectedCollege.fees}</p>
                    </div>
                  )}

                  {selectedCollege.admission && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">📝 Admission</h3>
                      <p className="text-gray-600 text-sm">{selectedCollege.admission}</p>
                    </div>
                  )}

                  {selectedCollege.faculty && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">👨‍🏫 Faculty</h3>
                      <p className="text-gray-600 text-sm">{selectedCollege.faculty}</p>
                    </div>
                  )}

                  {selectedCollege.contact && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">📞 Contact & Additional Info</h3>
                      <p className="text-gray-600 text-sm">{selectedCollege.contact}</p>
                    </div>
                  )}

                  {selectedCollege.notes && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">📌 Important Notes</h3>
                      <p className="text-gray-600 text-sm">{selectedCollege.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-center space-x-4">
                <Link
                  to={`/colleges/${activeCategory?.toLowerCase().replace(/\s+/g, '-')}/${activeType?.toLowerCase().replace(/\s+/g, '-')}/${selectedCollege.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '').replace(/&/g, 'and').replace(/,/g, '')}`}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  View Complete Details →
                </Link>
                <button
                  onClick={closeCollegePopup}
                  className="bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

export default Colleges;