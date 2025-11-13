// App.jsx - Fixed version
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import ScrollToTop from "./components/ScrollToTop";
import LoadingSpinner from "./components/LoadingSpinner";
import StudentAnalytics from "./components/StudentAnalytics";
import Home from './pages/Home';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import Navbar from './components/Navbar';
import CareerGuidanceAI from './components/CareerGuidanceAI';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';

// Import other pages...
import After12th from './pages/After12th/After12th';
import AllCourses from './pages/AllCourses';
import Colleges from './pages/Colleges';
import Exams from './pages/Exams';
import ScopedSectors from './pages/ScopedSectors';
import EntranceExams from './pages/EntranceExams';
import CCPM from './pages/CCPM';
import GovernmentColleges from './pages/GovernmentColleges';
import ResourceHub from './pages/ResourceHub';
import CollegeCategoriesPage from "./pages/CollegeCategoriesPage";

// After10th imports...
import After10th from "./pages/After10th/After10th";
import Course from "./pages/After10th/Courses/Course";
import Entrance from "./pages/After10th/Entrance";
import Scholarship from "./pages/After10th/Scholarship";
import Diploma from "./pages/After10th/Courses/Diploma/Diploma";

// Course Detail Pages...
import MathCSPage from './pages/After10th/Courses/Main/MathCSPage';
import MathIPPage from './pages/After10th/Courses/Main/MathIPPage';
import MathEconomicsPage from './pages/After10th/Courses/Main/MathEconomicsPage';
import MathPEPage from './pages/After10th/Courses/Main/MathPEPage';
import BioMathPage from './pages/After10th/Courses/Main/BioMathPage';
import BioCSPage from './pages/After10th/Courses/Main/BioCSPage';
import BioPsychologyPage from './pages/After10th/Courses/Main/BioPsychologyPage';
import CommerceWithMathPage from './pages/After10th/Courses/CommercePages/CommerceWithMathPage';
import CommerceWithCSPage from './pages/After10th/Courses/CommercePages/CommerceWithCSPage';
import CommerceWithEntrepreneurshipPage from './pages/After10th/Courses/CommercePages/CommerceWithEntrepreneurshipPage';
import HumanitiesHPGPage from './pages/After10th/Courses/HumanitiesPages/HumanitiesHPGPage';
import HumanitiesPSEPage from './pages/After10th/Courses/HumanitiesPages/HumanitiesPSEPage';
import HumanitiesArtsPage from './pages/After10th/Courses/HumanitiesPages/HumanitiesArtsPage';
import VocationalComputerPage from './pages/After10th/Courses/VocationalPages/VocationalComputerPage';
import VocationalFashionPage from './pages/After10th/Courses/VocationalPages/VocationalFashionPage';
import VocationalTourismPage from './pages/After10th/Courses/VocationalPages/VocationalTourismPage';

// Diploma Course Pages...
import CivilEngineering from './pages/After10th/Courses/Diploma/Engineering/CivilEngineering';
import MechanicalEngineering from './pages/After10th/Courses/Diploma/Engineering/MechanicalEngineering';
import LabAssistant from './pages/After10th/Courses/Diploma/Medical/LabAssistant';
import DEd from './pages/After10th/Courses/Diploma/Education/DEd';

//After12th
import Entrance12 from './pages/After12th/Entrance';
import Scholarship12 from './pages/After12th/Scholar';
import Cutoff12 from './pages/After12th/Cutoff';
import CivilEngineering12 from './pages/After12th/Courses/General/CivilEngineering';

//AI
import AICareerTest from './pages/AICareerTest';
import AIChatbox from './pages/AIChatbox';

const App = () => {
  // ✅ Extract authentication state from AppContext
  const { loading, isLoggedIn, userData } = useContext(AppContext);

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner message="Initializing EduAdvisor..." />;
  }

  return (
    <>
      <ScrollToTop />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/career-ai" element={<CareerGuidanceAI />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dropout" element={<StudentAnalytics />} />

        {/* New Routes */}
        <Route path="/after-12th" element={<After12th />} />
        <Route path="/courses" element={<AllCourses />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/scoped-sectors" element={<ScopedSectors />} />
        <Route path="/entrance" element={<EntranceExams />} />
        <Route path="/course-career-mapping" element={<CCPM />} />
        <Route path="/nearby-gov-college" element={<GovernmentColleges />} />
        <Route path="/resource-hub" element={<ResourceHub />} />
        <Route path="/college-categories" element={<CollegeCategoriesPage />} />

        {/* After10th Pages */}
        <Route path="/after-10th" element={<After10th />} />
        <Route path="/after10th/course" element={<Course />} />
        <Route path="/after10th/entrance" element={<Entrance />} />
        <Route path="/after10th/scholarship" element={<Scholarship />} />
        <Route path="/after10th/diploma" element={<Diploma />} />

        {/* Course Detail Pages */}
        <Route path="/courses/math-cs" element={<MathCSPage />} />
        <Route path="/courses/math-ip" element={<MathIPPage />} />
        <Route path="/courses/math-economics" element={<MathEconomicsPage />} />
        <Route path="/courses/math-pe" element={<MathPEPage />} />
        <Route path="/courses/bio-math" element={<BioMathPage />} />
        <Route path="/courses/bio-cs" element={<BioCSPage />} />
        <Route path="/courses/bio-psychology" element={<BioPsychologyPage />} />

        {/* Commerce Stream */}
        <Route path="/courses/commerce-math" element={<CommerceWithMathPage />} />
        <Route path="/courses/commerce-cs" element={<CommerceWithCSPage />} />
        <Route path="/courses/commerce-entrepreneurship" element={<CommerceWithEntrepreneurshipPage />} />

        {/* Humanities Stream */}
        <Route path="/courses/humanities-hpg" element={<HumanitiesHPGPage />} />
        <Route path="/courses/humanities-pse" element={<HumanitiesPSEPage />} />
        <Route path="/courses/humanities-arts" element={<HumanitiesArtsPage />} />

        {/* Vocational Stream */}
        <Route path="/courses/vocational-computer" element={<VocationalComputerPage />} />
        <Route path="/courses/vocational-fashion" element={<VocationalFashionPage />} />
        <Route path="/courses/vocational-tourism" element={<VocationalTourismPage />} />

        {/* Diploma Courses */}
        <Route path="/after10th/diploma/engineering/civil-engineering" element={<CivilEngineering />} />
        <Route path="/after10th/diploma/engineering/mechanical-engineering" element={<MechanicalEngineering />} />
        <Route path="/after10th/diploma/medical/lab-assistant" element={<LabAssistant />} />
        <Route path="/after10th/diploma/education/ded" element={<DEd />} />

        {/* After 12th Routes */}
        <Route path="/after12th/engineering" element={<Navigate to="/after-12th" replace />} />
        <Route path="/after12th/scholarship12" element={<Scholarship12 />} />
        <Route path="/after12th/entrance12" element={<Entrance12 />} />
        <Route path="/after12th/cutoff12" element={<Cutoff12 />} />
        <Route path="/after12th/courses/general/civil-engineering" element={<CivilEngineering12 />} />

        {/* ✅ AI Routes - Fixed */}
        <Route path="/ai-career-test" element={<AICareerTest isLoggedIn={isLoggedIn} userData={userData} />} />
        <Route path="/ai-chat" element={<AIChatbox isLoggedIn={isLoggedIn} userData={userData} />} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;