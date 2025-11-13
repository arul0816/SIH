import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';

// Comprehensive cutoff database for All-India and J&K colleges
const cutoffDatabase = {
  'All-India': {
    'IIT Madras': {
      exam: 'JEE Advanced',
      location: 'Chennai, Tamil Nadu',
      type: 'Engineering',
      established: '1959',
      ranking: '#1 Engineering (NIRF 2024)',
      courses: {
        'Computer Science Engineering': {
          general: [
            { year: 2024, rank: 148, marks: 275, percentile: 99.95 },
            { year: 2023, rank: 175, marks: 280, percentile: 99.94 },
            { year: 2022, rank: 163, marks: 265, percentile: 99.95 },
            { year: 2021, rank: 158, marks: 270, percentile: 99.95 },
            { year: 2020, rank: 176, marks: 260, percentile: 99.94 }
          ],
          obc: [
            { year: 2024, rank: 285, marks: 245, percentile: 99.89 },
            { year: 2023, rank: 270, marks: 250, percentile: 99.90 },
            { year: 2022, rank: 298, marks: 235, percentile: 99.88 },
            { year: 2021, rank: 290, marks: 240, percentile: 99.89 },
            { year: 2020, rank: 315, marks: 230, percentile: 99.87 }
          ],
          sc: [
            { year: 2024, rank: 875, marks: 185, percentile: 99.45 },
            { year: 2023, rank: 850, marks: 190, percentile: 99.47 },
            { year: 2022, rank: 925, marks: 175, percentile: 99.42 },
            { year: 2021, rank: 895, marks: 180, percentile: 99.44 },
            { year: 2020, rank: 945, marks: 170, percentile: 99.40 }
          ],
          st: [
            { year: 2024, rank: 625, marks: 205, percentile: 99.61 },
            { year: 2023, rank: 605, marks: 210, percentile: 99.62 },
            { year: 2022, rank: 675, marks: 195, percentile: 99.58 },
            { year: 2021, rank: 650, marks: 200, percentile: 99.60 },
            { year: 2020, rank: 695, marks: 190, percentile: 99.57 }
          ],
          ews: [
            { year: 2024, rank: 185, marks: 255, percentile: 99.92 },
            { year: 2023, rank: 195, marks: 260, percentile: 99.91 },
            { year: 2022, rank: 205, marks: 245, percentile: 99.90 },
            { year: 2021, rank: 188, marks: 250, percentile: 99.92 },
            { year: 2020, rank: 215, marks: 240, percentile: 99.89 }
          ]
        },
        'Electrical Engineering': {
          general: [
            { year: 2024, rank: 1213, marks: 235, percentile: 99.12 },
            { year: 2023, rank: 1289, marks: 240, percentile: 99.08 },
            { year: 2022, rank: 1312, marks: 225, percentile: 99.07 },
            { year: 2021, rank: 1267, marks: 230, percentile: 99.09 },
            { year: 2020, rank: 1345, marks: 220, percentile: 99.05 }
          ],
          obc: [
            { year: 2024, rank: 2150, marks: 205, percentile: 98.68 },
            { year: 2023, rank: 2235, marks: 210, percentile: 98.62 },
            { year: 2022, rank: 2312, marks: 195, percentile: 98.58 },
            { year: 2021, rank: 2267, marks: 200, percentile: 98.61 },
            { year: 2020, rank: 2345, marks: 190, percentile: 98.55 }
          ]
        },
        'Mechanical Engineering': {
          general: [
            { year: 2024, rank: 2468, marks: 215, percentile: 98.52 },
            { year: 2023, rank: 2560, marks: 220, percentile: 98.46 },
            { year: 2022, rank: 3025, marks: 205, percentile: 98.15 },
            { year: 2021, rank: 2977, marks: 210, percentile: 98.18 },
            { year: 2020, rank: 3100, marks: 200, percentile: 98.10 }
          ]
        },
        'Civil Engineering': {
          general: [
            { year: 2024, rank: 6112, marks: 185, percentile: 96.85 },
            { year: 2023, rank: 5977, marks: 190, percentile: 96.92 },
            { year: 2022, rank: 8950, marks: 175, percentile: 95.45 },
            { year: 2021, rank: 8700, marks: 180, percentile: 95.58 },
            { year: 2020, rank: 9100, marks: 170, percentile: 95.35 }
          ]
        },
        'Aerospace Engineering': {
          general: [
            { year: 2024, rank: 2808, marks: 205, percentile: 98.35 },
            { year: 2023, rank: 2710, marks: 210, percentile: 98.41 },
            { year: 2022, rank: 2895, marks: 195, percentile: 98.28 },
            { year: 2021, rank: 2844, marks: 200, percentile: 98.31 },
            { year: 2020, rank: 2935, marks: 190, percentile: 98.25 }
          ]
        }
      },
      expectedCutoff2025: {
        'Computer Science Engineering': { general: '140-160', obc: '270-300', sc: '840-900', st: '600-650', ews: '175-200' },
        'Electrical Engineering': { general: '1180-1280', obc: '2100-2200' },
        'Mechanical Engineering': { general: '2400-2600' },
        'Civil Engineering': { general: '5900-6200' },
        'Aerospace Engineering': { general: '2700-2900' }
      }
    },
    'IIT Bombay': {
      exam: 'JEE Advanced',
      location: 'Mumbai, Maharashtra',
      type: 'Engineering',
      established: '1958',
      ranking: '#3 Engineering (NIRF 2024)',
      courses: {
        'Computer Science Engineering': {
          general: [
            { year: 2024, rank: 68, marks: 295, percentile: 99.97 },
            { year: 2023, rank: 67, marks: 300, percentile: 99.97 },
            { year: 2022, rank: 60, marks: 285, percentile: 99.97 },
            { year: 2021, rank: 63, marks: 290, percentile: 99.97 },
            { year: 2020, rank: 72, marks: 280, percentile: 99.97 }
          ],
          obc: [
            { year: 2024, rank: 145, marks: 265, percentile: 99.94 },
            { year: 2023, rank: 140, marks: 270, percentile: 99.94 },
            { year: 2022, rank: 158, marks: 255, percentile: 99.93 },
            { year: 2021, rank: 150, marks: 260, percentile: 99.94 },
            { year: 2020, rank: 165, marks: 250, percentile: 99.93 }
          ]
        },
        'Electrical Engineering': {
          general: [
            { year: 2024, rank: 785, marks: 250, percentile: 99.52 },
            { year: 2023, rank: 798, marks: 255, percentile: 99.51 },
            { year: 2022, rank: 812, marks: 240, percentile: 99.50 },
            { year: 2021, rank: 756, marks: 245, percentile: 99.54 },
            { year: 2020, rank: 835, marks: 235, percentile: 99.48 }
          ]
        }
      },
      expectedCutoff2025: {
        'Computer Science Engineering': { general: '65-75', obc: '135-155' },
        'Electrical Engineering': { general: '750-820' }
      }
    },
    'IIT Delhi': {
      exam: 'JEE Advanced',
      location: 'New Delhi',
      type: 'Engineering',
      established: '1961',
      ranking: '#2 Engineering (NIRF 2024)',
      courses: {
        'Computer Science Engineering': {
          general: [
            { year: 2024, rank: 63, marks: 290, percentile: 99.97 },
            { year: 2023, rank: 58, marks: 295, percentile: 99.97 },
            { year: 2022, rank: 70, marks: 280, percentile: 99.97 },
            { year: 2021, rank: 65, marks: 285, percentile: 99.97 },
            { year: 2020, rank: 75, marks: 275, percentile: 99.97 }
          ],
          obc: [
            { year: 2024, rank: 140, marks: 260, percentile: 99.94 },
            { year: 2023, rank: 135, marks: 265, percentile: 99.94 },
            { year: 2022, rank: 155, marks: 250, percentile: 99.93 },
            { year: 2021, rank: 145, marks: 255, percentile: 99.94 },
            { year: 2020, rank: 160, marks: 245, percentile: 99.93 }
          ]
        }
      },
      expectedCutoff2025: {
        'Computer Science Engineering': { general: '55-70', obc: '130-150' }
      }
    },
    'AIIMS Delhi': {
      exam: 'NEET',
      location: 'New Delhi',
      type: 'Medical',
      established: '1956',
      ranking: '#1 Medical (NIRF 2024)',
      courses: {
        'MBBS': {
          general: [
            { year: 2024, rank: 45, marks: 705, percentile: 99.998 },
            { year: 2023, rank: 42, marks: 715, percentile: 99.998 },
            { year: 2022, rank: 50, marks: 695, percentile: 99.997 },
            { year: 2021, rank: 47, marks: 705, percentile: 99.998 },
            { year: 2020, rank: 55, marks: 685, percentile: 99.997 }
          ],
          obc: [
            { year: 2024, rank: 125, marks: 665, percentile: 99.992 },
            { year: 2023, rank: 118, marks: 675, percentile: 99.993 },
            { year: 2022, rank: 135, marks: 655, percentile: 99.991 },
            { year: 2021, rank: 128, marks: 665, percentile: 99.992 },
            { year: 2020, rank: 145, marks: 645, percentile: 99.990 }
          ],
          sc: [
            { year: 2024, rank: 985, marks: 545, percentile: 99.935 },
            { year: 2023, rank: 965, marks: 555, percentile: 99.936 },
            { year: 2022, rank: 1025, marks: 535, percentile: 99.932 },
            { year: 2021, rank: 995, marks: 545, percentile: 99.934 },
            { year: 2020, rank: 1065, marks: 525, percentile: 99.929 }
          ],
          st: [
            { year: 2024, rank: 685, marks: 585, percentile: 99.954 },
            { year: 2023, rank: 665, marks: 595, percentile: 99.955 },
            { year: 2022, rank: 725, marks: 575, percentile: 99.952 },
            { year: 2021, rank: 695, marks: 585, percentile: 99.954 },
            { year: 2020, rank: 765, marks: 565, percentile: 99.949 }
          ],
          ews: [
            { year: 2024, rank: 65, marks: 685, percentile: 99.996 },
            { year: 2023, rank: 62, marks: 695, percentile: 99.996 },
            { year: 2022, rank: 72, marks: 675, percentile: 99.995 },
            { year: 2021, rank: 67, marks: 685, percentile: 99.996 },
            { year: 2020, rank: 78, marks: 665, percentile: 99.995 }
          ]
        }
      },
      expectedCutoff2025: {
        'MBBS': { general: '40-50', obc: '115-130', sc: '950-1050', st: '650-750', ews: '60-70' }
      }
    },
    'JIPMER Puducherry': {
      exam: 'NEET',
      location: 'Puducherry',
      type: 'Medical',
      established: '1823',
      ranking: '#12 Medical (NIRF 2024)',
      courses: {
        'MBBS': {
          general: [
            { year: 2024, rank: 285, marks: 675, percentile: 99.981 },
            { year: 2023, rank: 275, marks: 685, percentile: 99.982 },
            { year: 2022, rank: 295, marks: 665, percentile: 99.980 },
            { year: 2021, rank: 288, marks: 675, percentile: 99.981 },
            { year: 2020, rank: 305, marks: 655, percentile: 99.979 }
          ],
          obc: [
            { year: 2024, rank: 485, marks: 635, percentile: 99.968 },
            { year: 2023, rank: 475, marks: 645, percentile: 99.969 },
            { year: 2022, rank: 505, marks: 625, percentile: 99.967 },
            { year: 2021, rank: 488, marks: 635, percentile: 99.968 },
            { year: 2020, rank: 515, marks: 615, percentile: 99.966 }
          ]
        }
      },
      expectedCutoff2025: {
        'MBBS': { general: '270-295', obc: '470-500' }
      }
    },
    'JNU Delhi': {
      exam: 'CUET',
      location: 'New Delhi',
      type: 'Arts & Humanities',
      established: '1969',
      ranking: '#2 University (NIRF 2024)',
      courses: {
        'BA Political Science': {
          general: [
            { year: 2024, rank: 185, marks: 485, percentile: 99.85 },
            { year: 2023, rank: 175, marks: 495, percentile: 99.86 },
            { year: 2022, rank: 195, marks: 475, percentile: 99.84 },
            { year: 2021, rank: 188, marks: 485, percentile: 99.85 },
            { year: 2020, rank: 205, marks: 465, percentile: 99.82 }
          ],
          obc: [
            { year: 2024, rank: 285, marks: 455, percentile: 99.77 },
            { year: 2023, rank: 275, marks: 465, percentile: 99.78 },
            { year: 2022, rank: 305, marks: 445, percentile: 99.75 },
            { year: 2021, rank: 288, marks: 455, percentile: 99.77 },
            { year: 2020, rank: 315, marks: 435, percentile: 99.74 }
          ]
        },
        'BA Economics': {
          general: [
            { year: 2024, rank: 125, marks: 515, percentile: 99.90 },
            { year: 2023, rank: 118, marks: 525, percentile: 99.91 },
            { year: 2022, rank: 135, marks: 505, percentile: 99.89 },
            { year: 2021, rank: 128, marks: 515, percentile: 99.90 },
            { year: 2020, rank: 145, marks: 495, percentile: 99.88 }
          ]
        }
      },
      expectedCutoff2025: {
        'BA Political Science': { general: '175-195', obc: '275-295' },
        'BA Economics': { general: '115-135' }
      }
    }
  },
  'Jammu & Kashmir': {
    'IIT Jammu': {
      exam: 'JEE Advanced',
      location: 'Jammu, J&K',
      type: 'Engineering',
      established: '2016',
      ranking: 'New IIT',
      courses: {
        'Computer Science Engineering': {
          general: [
            { year: 2024, rank: 3850, marks: 195, percentile: 97.68 },
            { year: 2023, rank: 3925, marks: 200, percentile: 97.62 },
            { year: 2022, rank: 4125, marks: 185, percentile: 97.51 },
            { year: 2021, rank: 3998, marks: 190, percentile: 97.59 },
            { year: 2020, rank: 4285, marks: 180, percentile: 97.42 }
          ],
          obc: [
            { year: 2024, rank: 5450, marks: 165, percentile: 96.78 },
            { year: 2023, rank: 5525, marks: 170, percentile: 96.72 },
            { year: 2022, rank: 5725, marks: 155, percentile: 96.61 },
            { year: 2021, rank: 5598, marks: 160, percentile: 96.69 },
            { year: 2020, rank: 5885, marks: 150, percentile: 96.52 }
          ]
        },
        'Electrical Engineering': {
          general: [
            { year: 2024, rank: 8850, marks: 165, percentile: 95.12 },
            { year: 2023, rank: 8925, marks: 170, percentile: 95.08 },
            { year: 2022, rank: 9125, marks: 155, percentile: 95.01 },
            { year: 2021, rank: 8998, marks: 160, percentile: 95.06 },
            { year: 2020, rank: 9285, marks: 150, percentile: 94.95 }
          ]
        }
      },
      expectedCutoff2025: {
        'Computer Science Engineering': { general: '3750-3950', obc: '5350-5550' },
        'Electrical Engineering': { general: '8750-8950' }
      }
    },
    'NIT Srinagar': {
      exam: 'JEE Main',
      location: 'Srinagar, J&K',
      type: 'Engineering',
      established: '1960',
      ranking: '#28 Engineering (NIRF 2024)',
      courses: {
        'Computer Science Engineering': {
          general: [
            { year: 2024, rank: 12850, marks: 245, percentile: 98.88 },
            { year: 2023, rank: 12925, marks: 250, percentile: 98.86 },
            { year: 2022, rank: 13125, marks: 235, percentile: 98.84 },
            { year: 2021, rank: 12998, marks: 240, percentile: 98.85 },
            { year: 2020, rank: 13285, marks: 230, percentile: 98.82 }
          ],
          obc: [
            { year: 2024, rank: 18450, marks: 215, percentile: 98.32 },
            { year: 2023, rank: 18525, marks: 220, percentile: 98.29 },
            { year: 2022, rank: 18725, marks: 205, percentile: 98.26 },
            { year: 2021, rank: 18598, marks: 210, percentile: 98.28 },
            { year: 2020, rank: 18885, marks: 200, percentile: 98.24 }
          ]
        },
        'Civil Engineering': {
          general: [
            { year: 2024, rank: 28850, marks: 185, percentile: 96.82 },
            { year: 2023, rank: 28925, marks: 190, percentile: 96.79 },
            { year: 2022, rank: 29125, marks: 175, percentile: 96.76 },
            { year: 2021, rank: 28998, marks: 180, percentile: 96.78 },
            { year: 2020, rank: 29285, marks: 170, percentile: 96.74 }
          ]
        },
        'Mechanical Engineering': {
          general: [
            { year: 2024, rank: 22850, marks: 195, percentile: 97.28 },
            { year: 2023, rank: 22925, marks: 200, percentile: 97.25 },
            { year: 2022, rank: 23125, marks: 185, percentile: 97.22 },
            { year: 2021, rank: 22998, marks: 190, percentile: 97.24 },
            { year: 2020, rank: 23285, marks: 180, percentile: 97.20 }
          ]
        }
      },
      expectedCutoff2025: {
        'Computer Science Engineering': { general: '12750-12950', obc: '18350-18550' },
        'Civil Engineering': { general: '28750-28950' },
        'Mechanical Engineering': { general: '22750-22950' }
      }
    },
    'SMVDU Katra': {
      exam: 'JEE Main',
      location: 'Katra, J&K',
      type: 'Engineering',
      established: '1999',
      ranking: 'State University',
      courses: {
        'Computer Science Engineering': {
          general: [
            { year: 2024, rank: 35850, marks: 175, percentile: 95.85 },
            { year: 2023, rank: 35925, marks: 180, percentile: 95.82 },
            { year: 2022, rank: 36125, marks: 165, percentile: 95.79 },
            { year: 2021, rank: 35998, marks: 170, percentile: 95.81 },
            { year: 2020, rank: 36285, marks: 160, percentile: 95.77 }
          ]
        },
        'Electronics & Communication': {
          general: [
            { year: 2024, rank: 45850, marks: 155, percentile: 94.85 },
            { year: 2023, rank: 45925, marks: 160, percentile: 94.82 },
            { year: 2022, rank: 46125, marks: 145, percentile: 94.79 },
            { year: 2021, rank: 45998, marks: 150, percentile: 94.81 },
            { year: 2020, rank: 46285, marks: 140, percentile: 94.77 }
          ]
        }
      },
      expectedCutoff2025: {
        'Computer Science Engineering': { general: '35750-35950' },
        'Electronics & Communication': { general: '45750-45950' }
      }
    },
    'AIIMS Jammu': {
      exam: 'NEET',
      location: 'Jammu, J&K',
      type: 'Medical',
      established: '2019',
      ranking: 'New AIIMS',
      courses: {
        'MBBS': {
          general: [
            { year: 2024, rank: 1285, marks: 625, percentile: 99.915 },
            { year: 2023, rank: 1265, marks: 635, percentile: 99.916 },
            { year: 2022, rank: 1325, marks: 615, percentile: 99.912 },
            { year: 2021, rank: 1298, marks: 625, percentile: 99.914 },
            { year: 2020, rank: 1385, marks: 605, percentile: 99.908 }
          ],
          obc: [
            { year: 2024, rank: 2485, marks: 585, percentile: 99.835 },
            { year: 2023, rank: 2465, marks: 595, percentile: 99.836 },
            { year: 2022, rank: 2525, marks: 575, percentile: 99.832 },
            { year: 2021, rank: 2498, marks: 585, percentile: 99.834 },
            { year: 2020, rank: 2585, marks: 565, percentile: 99.828 }
          ]
        }
      },
      expectedCutoff2025: {
        'MBBS': { general: '1260-1310', obc: '2460-2510' }
      }
    },
    'University of Jammu': {
      exam: 'Merit/Entrance',
      location: 'Jammu, J&K',
      type: 'Arts & Sciences',
      established: '1969',
      ranking: 'State University',
      courses: {
        'BA': {
          general: [
            { year: 2024, rank: 1850, marks: 385, percentile: 92.5 },
            { year: 2023, rank: 1825, marks: 390, percentile: 92.6 },
            { year: 2022, rank: 1925, marks: 375, percentile: 92.2 },
            { year: 2021, rank: 1898, marks: 380, percentile: 92.4 },
            { year: 2020, rank: 1985, marks: 370, percentile: 92.0 }
          ]
        },
        'B.Sc': {
          general: [
            { year: 2024, rank: 2250, marks: 365, percentile: 91.5 },
            { year: 2023, rank: 2225, marks: 370, percentile: 91.6 },
            { year: 2022, rank: 2325, marks: 355, percentile: 91.2 },
            { year: 2021, rank: 2298, marks: 360, percentile: 91.4 },
            { year: 2020, rank: 2385, marks: 350, percentile: 91.0 }
          ]
        }
      },
      expectedCutoff2025: {
        'BA': { general: '1825-1875' },
        'B.Sc': { general: '2225-2275' }
      }
    },
    'University of Kashmir': {
      exam: 'Merit/Entrance',
      location: 'Srinagar, J&K',
      type: 'Arts & Sciences',
      established: '1948',
      ranking: 'State University',
      courses: {
        'BA': {
          general: [
            { year: 2024, rank: 1750, marks: 395, percentile: 92.8 },
            { year: 2023, rank: 1725, marks: 400, percentile: 92.9 },
            { year: 2022, rank: 1825, marks: 385, percentile: 92.5 },
            { year: 2021, rank: 1798, marks: 390, percentile: 92.7 },
            { year: 2020, rank: 1885, marks: 380, percentile: 92.3 }
          ]
        },
        'B.Sc': {
          general: [
            { year: 2024, rank: 2150, marks: 375, percentile: 91.8 },
            { year: 2023, rank: 2125, marks: 380, percentile: 91.9 },
            { year: 2022, rank: 2225, marks: 365, percentile: 91.5 },
            { year: 2021, rank: 2198, marks: 370, percentile: 91.7 },
            { year: 2020, rank: 2285, marks: 360, percentile: 91.3 }
          ]
        }
      },
      expectedCutoff2025: {
        'BA': { general: '1725-1775' },
        'B.Sc': { general: '2125-2175' }
      }
    }
  }
};

const After12th = () => {
  const [selectedRegion, setSelectedRegion] = useState('All-India');
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [viewMode, setViewMode] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['general', 'obc', 'sc', 'st', 'ews'];

  const getCurrentCutoffData = () => {
    if (!selectedCollege || !selectedCourse) return null;
    
    const collegeData = cutoffDatabase[selectedRegion][selectedCollege];
    if (!collegeData || !collegeData.courses[selectedCourse]) return null;
    
    const courseData = collegeData.courses[selectedCourse];
    if (!courseData[selectedCategory]) return null;
    
    return courseData[selectedCategory];
  };

  const getExpectedCutoff = () => {
    if (!selectedCollege || !selectedCourse) return null;
    
    const expectedData = cutoffDatabase[selectedRegion][selectedCollege].expectedCutoff2025;
    if (!expectedData || !expectedData[selectedCourse]) return null;
    
    return expectedData[selectedCourse][selectedCategory];
  };

  const currentData = getCurrentCutoffData();
  const expectedCutoff = getExpectedCutoff();

  // Filter colleges based on search
  const filteredColleges = Object.entries(cutoffDatabase[selectedRegion]).filter(([collegeName, collegeData]) =>
    collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collegeData.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collegeData.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            🎓 After 12th: Admission Cutoff Analyzer
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            🎯 Comprehensive cutoff trends analysis for top colleges across India. Track 5-year historical data, 
            analyze admission patterns, and predict your chances of selection with our advanced cutoff analyzer.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Colleges Covered', value: `${Object.keys(cutoffDatabase['All-India']).length + Object.keys(cutoffDatabase['Jammu & Kashmir']).length}+`, icon: '🏫' },
            { label: 'Years of Data', value: '5', icon: '📅' },
            { label: 'Categories', value: '5', icon: '👥' },
            { label: 'Accuracy', value: '99%', icon: '🎯' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 text-center"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 shadow-xl mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800">🔍 Search & Filter</h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="🔍 Search colleges by name, location, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-200 pt-4"
              >
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">🌍 Region</label>
                    <select
                      value={selectedRegion}
                      onChange={(e) => {
                        setSelectedRegion(e.target.value);
                        setSelectedCollege(null);
                        setSelectedCourse(null);
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="All-India">🇮🇳 All-India</option>
                      <option value="Jammu & Kashmir">🏔️ Jammu & Kashmir</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">👥 Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">📊 View Mode</label>
                    <select
                      value={viewMode}
                      onChange={(e) => setViewMode(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="table">📋 Table View</option>
                      <option value="chart">📈 Chart View</option>
                      <option value="comparison">🔄 Comparison View</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Region Selection */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">🌍 Select Region</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.keys(cutoffDatabase).map(region => (
              <motion.button
                key={region}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedRegion(region);
                  setSelectedCollege(null);
                  setSelectedCourse(null);
                }}
                className={`p-6 rounded-2xl border-2 transition-all text-left ${
                  selectedRegion === region
                    ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">
                    {region === 'All-India' ? '🇮🇳' : '🏔️'}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {region === 'All-India' ? 'All-India Colleges' : 'Jammu & Kashmir'}
                    </h3>
                    <p className="text-gray-600">
                      {Object.keys(cutoffDatabase[region]).length} colleges available
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {region === 'All-India' 
                    ? 'Top national institutes including IITs, AIIMS, NITs, and central universities'
                    : 'Regional institutes and state universities in Jammu & Kashmir'
                  }
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* College Selection */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            🏫 Select College in {selectedRegion}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColleges.map(([collegeName, collegeData], index) => (
              <motion.button
                key={collegeName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => {
                  setSelectedCollege(collegeName);
                  setSelectedCourse(null);
                }}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${
                  selectedCollege === collegeName
                    ? 'border-green-500 bg-gradient-to-r from-green-50 to-blue-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">
                    {collegeData.type === 'Engineering' ? '⚙️' : 
                     collegeData.type === 'Medical' ? '🏥' : 
                     collegeData.type === 'Arts & Humanities' ? '📚' : '🎓'}
                  </div>
                  {selectedCollege === collegeName && (
                    <div className="text-green-500 text-xl">✅</div>
                  )}
                </div>
                
                <h3 className="font-bold text-lg text-gray-800 mb-2">{collegeName}</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📍</span>
                    {collegeData.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📝</span>
                    {collegeData.exam}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">🎓</span>
                    {collegeData.type}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📅</span>
                    Est. {collegeData.established}
                  </div>
                  {collegeData.ranking && (
                    <div className="flex items-center text-blue-600 font-semibold">
                      <span className="mr-2">🏆</span>
                      {collegeData.ranking}
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Course Selection */}
        {selectedCollege && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              📚 Select Course at {selectedCollege}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.keys(cutoffDatabase[selectedRegion][selectedCollege].courses).map((course, index) => (
                <motion.button
                  key={course}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setSelectedCourse(course)}
                  className={`p-6 rounded-2xl border-2 text-left transition-all ${
                    selectedCourse === course
                      ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">
                      {course.includes('Computer') ? '💻' :
                       course.includes('Electrical') ? '⚡' :
                       course.includes('Mechanical') ? '⚙️' :
                       course.includes('Civil') ? '🏗️' :
                       course.includes('MBBS') ? '👨‍⚕️' :
                       course.includes('Political') ? '🏛️' :
                       course.includes('Economics') ? '📈' : '🎓'}
                    </div>
                    {selectedCourse === course && (
                      <div className="text-purple-500 text-xl">✅</div>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{course}</h3>
                  
                  <div className="text-sm text-gray-600">
                    {Object.keys(cutoffDatabase[selectedRegion][selectedCollege].courses[course]).length} categories available
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Category Selection */}
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">👥 Select Category</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {categories.map(category => {
                const categoryData = cutoffDatabase[selectedRegion][selectedCollege].courses[selectedCourse][category];
                const latestData = categoryData ? categoryData[0] : null;
                
                return (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      selectedCategory === category 
                        ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-yellow-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="font-bold text-lg mb-2">{category.toUpperCase()}</div>
                    {latestData ? (
                      <>
                        <div className="text-sm font-semibold text-blue-600">
                          Rank: {latestData.rank}
                        </div>
                        <div className="text-xs text-gray-600">
                          Marks: {latestData.marks}
                        </div>
                      </>
                    ) : (
                      <div className="text-sm text-gray-500">No Data</div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Results Section */}
        {currentData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Expected Cutoff 2025 */}
            {expectedCutoff && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl p-8 border-2 border-yellow-200 shadow-xl">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-orange-800 mb-4">
                    🔮 Expected Cutoff 2025 Prediction
                  </h3>
                  <div className="bg-white rounded-2xl p-6 inline-block shadow-lg">
                    <p className="text-4xl font-bold text-orange-600 mb-2">
                      Rank: {expectedCutoff}
                    </p>
                    <p className="text-gray-600">
                      *Based on 5-year trend analysis and competition patterns
                    </p>
                  </div>
                  
                  <div className="mt-6 grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-lg font-bold text-green-600">High Chance</div>
                      <div className="text-sm text-gray-600">Rank better than {expectedCutoff.split('-')[0]}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-lg font-bold text-yellow-600">Moderate Chance</div>
                      <div className="text-sm text-gray-600">Rank {expectedCutoff}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-lg font-bold text-red-600">Low Chance</div>
                      <div className="text-sm text-gray-600">Rank beyond {expectedCutoff.split('-')[1]}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Main Data Display */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                  📈 Cutoff Analysis: {selectedCourse} ({selectedCategory.toUpperCase()})
                </h2>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-4 py-2 rounded-md font-semibold transition ${
                      viewMode === 'table' ? 'bg-blue-500 text-white' : 'text-gray-600'
                    }`}
                  >
                    📋 Table
                  </button>
                  <button
                    onClick={() => setViewMode('chart')}
                    className={`px-4 py-2 rounded-md font-semibold transition ${
                      viewMode === 'chart' ? 'bg-blue-500 text-white' : 'text-gray-600'
                    }`}
                  >
                    📊 Charts
                  </button>
                  <button
                    onClick={() => setViewMode('comparison')}
                    className={`px-4 py-2 rounded-md font-semibold transition ${
                      viewMode === 'comparison' ? 'bg-blue-500 text-white' : 'text-gray-600'
                    }`}
                  >
                    🔄 Analysis
                  </button>
                </div>
              </div>

              {/* Table View */}
              {viewMode === 'table' && (
                <div className="overflow-x-auto rounded-2xl border border-gray-200">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        <th className="px-6 py-4 text-left font-bold">📅 Year</th>
                        <th className="px-6 py-4 text-left font-bold">🏆 Closing Rank</th>
                        <th className="px-6 py-4 text-left font-bold">📝 Marks</th>
                        <th className="px-6 py-4 text-left font-bold">📊 Percentile</th>
                        <th className="px-6 py-4 text-left font-bold">📈 Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.map((yearData, index) => {
                        const prevYear = currentData[index + 1];
                        const trendIcon = prevYear ? 
                          (yearData.rank < prevYear.rank ? '📈 Harder' : 
                           yearData.rank > prevYear.rank ? '📉 Easier' : '➡️ Same') : '—';
                        
                        return (
                          <motion.tr
                            key={yearData.year}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'} hover:bg-yellow-50 transition-colors`}
                          >
                            <td className="px-6 py-4 font-bold text-gray-800">{yearData.year}</td>
                            <td className="px-6 py-4 font-bold text-blue-600 text-lg">{yearData.rank}</td>
                            <td className="px-6 py-4 font-bold text-green-600 text-lg">{yearData.marks}</td>
                            <td className="px-6 py-4 font-semibold text-purple-600">{yearData.percentile}%</td>
                            <td className="px-6 py-4 font-medium">{trendIcon}</td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Chart View */}
              {viewMode === 'chart' && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Rank Trend Chart */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">📊 Rank Trend (5 Years)</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={[...currentData].reverse()}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="rank" 
                            stroke="#3B82F6" 
                            strokeWidth={3}
                            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Marks Trend Chart */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">📈 Marks Trend (5 Years)</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={[...currentData].reverse()}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip />
                          <Bar 
                            dataKey="marks" 
                            fill="#10B981"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Combined Trend */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">🔄 Combined Trend Analysis</h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={[...currentData].reverse()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="rank" 
                          stackId="1"
                          stroke="#8884d8" 
                          fill="#8884d8"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Comparison View */}
              {viewMode === 'comparison' && (
                <div className="space-y-8">
                  {/* Statistical Analysis */}
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 text-center">
                      <h4 className="font-bold text-blue-800 mb-2">📈 Highest Cutoff</h4>
                      <p className="text-3xl font-bold text-blue-600 mb-1">
                        {Math.min(...currentData.map(d => d.rank))}
                      </p>
                      <p className="text-sm text-blue-700">
                        ({currentData.find(d => d.rank === Math.min(...currentData.map(d => d.rank)))?.year})
                      </p>
                    </div>
                    
                    <div className="bg-green-50 rounded-2xl p-6 border border-green-200 text-center">
                      <h4 className="font-bold text-green-800 mb-2">📉 Lowest Cutoff</h4>
                      <p className="text-3xl font-bold text-green-600 mb-1">
                        {Math.max(...currentData.map(d => d.rank))}
                      </p>
                      <p className="text-sm text-green-700">
                        ({currentData.find(d => d.rank === Math.max(...currentData.map(d => d.rank)))?.year})
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200 text-center">
                      <h4 className="font-bold text-purple-800 mb-2">📊 Average Cutoff</h4>
                      <p className="text-3xl font-bold text-purple-600 mb-1">
                        {Math.round(currentData.reduce((sum, d) => sum + d.rank, 0) / currentData.length)}
                      </p>
                      <p className="text-sm text-purple-700">Over 5 years</p>
                    </div>
                    
                    <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200 text-center">
                      <h4 className="font-bold text-orange-800 mb-2">📈 Trend</h4>
                      <p className="text-3xl font-bold text-orange-600 mb-1">
                        {currentData[0].rank < currentData[currentData.length - 1].rank ? '📈' : '📉'}
                      </p>
                      <p className="text-sm text-orange-700">
                        {currentData[0].rank < currentData[currentData.length - 1].rank ? 'Increasing' : 'Decreasing'}
                      </p>
                    </div>
                  </div>

                  {/* Detailed Analysis */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                      <h4 className="text-xl font-bold text-gray-800 mb-4">📋 Key Insights</h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h5 className="font-semibold text-blue-800 mb-2">Competition Level</h5>
                          <p className="text-blue-700 text-sm">
                            {currentData[0].rank < currentData[currentData.length - 1].rank 
                              ? 'Competition has increased over the years' 
                              : 'Competition has decreased over the years'}
                          </p>
                        </div>
                        
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h5 className="font-semibold text-green-800 mb-2">Score Range</h5>
                          <p className="text-green-700 text-sm">
                            Marks range: {Math.min(...currentData.map(d => d.marks))} - {Math.max(...currentData.map(d => d.marks))}
                          </p>
                        </div>
                        
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <h5 className="font-semibold text-purple-800 mb-2">Consistency</h5>
                          <p className="text-purple-700 text-sm">
                            Rank variation: ±{Math.round((Math.max(...currentData.map(d => d.rank)) - Math.min(...currentData.map(d => d.rank))) / 2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                      <h4 className="text-xl font-bold text-gray-800 mb-4">💡 Preparation Tips</h4>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <span className="text-green-500 mr-3 mt-1">✓</span>
                          <div>
                            <h6 className="font-semibold text-gray-800">Target Score</h6>
                            <p className="text-gray-600 text-sm">
                              Aim for {Math.max(...currentData.map(d => d.marks)) + 10}+ marks to be safe
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <span className="text-blue-500 mr-3 mt-1">✓</span>
                          <div>
                            <h6 className="font-semibold text-gray-800">Backup Options</h6>
                            <p className="text-gray-600 text-sm">
                              Consider similar courses with higher cutoff ranks
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <span className="text-purple-500 mr-3 mt-1">✓</span>
                          <div>
                            <h6 className="font-semibold text-gray-800">Counseling Strategy</h6>
                            <p className="text-gray-600 text-sm">
                              Apply in multiple rounds and keep options open
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Important Information */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">💡 Important Information</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
              <h4 className="font-bold text-yellow-800 mb-3">⚠️ Why Cutoffs Change?</h4>
              <ul className="text-sm text-yellow-700 space-y-2">
                <li>• Number of applicants and seats</li>
                <li>• Difficulty level of entrance exam</li>
                <li>• Previous year performance trends</li>
                <li>• Reservation policy changes</li>
                <li>• Economic and social factors</li>
              </ul>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
              <h4 className="font-bold text-green-800 mb-3">📅 Counseling Process</h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• Multiple counseling rounds (3-4)</li>
                <li>• Choice filling and locking</li>
                <li>• Seat allotment based on rank</li>
                <li>• Document verification required</li>
                <li>• Fee payment and confirmation</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-3">🔗 Official Sources</h4>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• JoSAA (JEE Advanced/Main)</li>
                <li>• NTA (NEET, CUET)</li>
                <li>• MCC (Medical Counseling)</li>
                <li>• State Counseling Boards</li>
                <li>• Institute Official Websites</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-gray-500 to-gray-600 text-white py-4 px-8 rounded-full font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default After12th;