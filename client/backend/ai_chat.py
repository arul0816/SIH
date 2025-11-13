from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import json
import os
from datetime import datetime
import random
import logging

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ------------------ ENHANCED SETTINGS ------------------
MODEL_NAME = "llama3"
OLLAMA_TIMEOUT_SEC = 15
MAX_QUESTIONS_AFTER_10TH = 8
MAX_QUESTIONS_AFTER_12TH = 10
CONFIDENCE_THRESHOLD = 85
DATA_DIR = "edutrack_data"
# ------------------------------------------------------

# Create data directory
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

# Session storage: { session_id: session_data }
sessions = {}

# Enhanced Stream Definitions with detailed scoring
STREAM_DEFINITIONS = {
    # ============================
    # AFTER 10TH OPTIONS
    # ============================
    "Science Stream (PCM)": {
        "pathway": "after10th",
        "subjects": ["Physics", "Chemistry", "Mathematics", "Computer Science/Biology"],
        "careers": [
            "Engineering (Mechanical, Civil, Electrical, Computer Science)",
            "Architecture", "Data Science & AI", "Research & Development",
            "Aerospace Engineering", "Robotics", "Automobile Engineering"
        ],
        "keywords": ["engineering", "math", "technology", "computer", "machines", "design", "innovation"],
        "scoring_rules": {
            "education_preference": {"A": 25, "B": 5, "C": 15, "D": 10},
            "academic_strength": {"A": 30, "B": 5, "C": 15, "D": 5},
            "career_interest": {"A": 35, "B": 5, "C": 10, "D": 5},
            "problem_solving": {"A": 25, "B": 10, "C": 5, "D": 15},
            "study_duration": {"A": 15, "B": 25, "C": 5, "D": 0}
        },
        "min_confidence": 70
    },

    "Science Stream (PCB)": {
        "pathway": "after10th", 
        "subjects": ["Physics", "Chemistry", "Biology", "Mathematics (Optional)"],
        "careers": [
            "Medicine (MBBS, BDS, BAMS, BHMS)", "Pharmacy", "Nursing",
            "Physiotherapy", "Biotechnology", "Life Sciences Research",
            "Veterinary Science", "Agricultural Science", "Forensic Science"
        ],
        "keywords": ["medicine", "doctor", "biology", "health", "research", "life sciences", "pharmacy"],
        "scoring_rules": {
            "education_preference": {"A": 25, "B": 5, "C": 15, "D": 10},
            "academic_strength": {"A": 25, "B": 5, "C": 15, "D": 5},
            "career_interest": {"A": 5, "B": 35, "C": 5, "D": 5},
            "work_environment": {"A": 15, "B": 30, "C": 5, "D": 5},
            "study_duration": {"A": 10, "B": 30, "C": 5, "D": 0}
        },
        "min_confidence": 70
    },

    "Commerce Stream": {
        "pathway": "after10th",
        "subjects": ["Accountancy", "Business Studies", "Economics", "Mathematics"],
        "careers": [
            "Chartered Accountant (CA)", "Company Secretary (CS)", "Cost Accountant (CMA)",
            "Banking & Finance", "Business Management", "Digital Marketing",
            "Stock Market Analysis", "Import-Export Business", "Entrepreneurship"
        ],
        "keywords": ["business", "finance", "accounting", "management", "banking", "economics", "commerce"],
        "scoring_rules": {
            "education_preference": {"A": 20, "B": 10, "C": 15, "D": 10},
            "academic_strength": {"A": 10, "B": 15, "C": 25, "D": 10},
            "career_interest": {"A": 5, "B": 5, "C": 35, "D": 5},
            "future_goals": {"A": 30, "B": 25, "C": 10, "D": 5},
            "study_duration": {"A": 25, "B": 20, "C": 15, "D": 10}
        },
        "min_confidence": 65
    },

    "Arts Stream": {
        "pathway": "after10th",
        "subjects": ["History", "Political Science", "Geography", "Economics", "Psychology"],
        "careers": [
            "Civil Services (IAS, IPS, IFS)", "Law (Lawyer, Judge)", "Journalism",
            "Teaching & Education", "Social Work", "Psychology & Counseling",
            "Literature & Writing", "Foreign Services", "Archaeological Research"
        ],
        "keywords": ["civil services", "law", "journalism", "teaching", "social work", "literature", "history"],
        "scoring_rules": {
            "education_preference": {"A": 20, "B": 5, "C": 15, "D": 15},
            "academic_strength": {"A": 5, "B": 30, "C": 20, "D": 15},
            "career_interest": {"A": 5, "B": 5, "C": 15, "D": 35},
            "future_goals": {"A": 5, "B": 15, "C": 30, "D": 25},
            "work_environment": {"A": 5, "B": 10, "C": 25, "D": 20}
        },
        "min_confidence": 60
    },

    "Diploma in Engineering": {
        "pathway": "after10th",
        "subjects": ["Technical Subjects", "Practical Training", "Workshop Practice"],
        "careers": [
            "Junior Engineer", "Technician", "Supervisor in Industries",
            "Government Technical Jobs", "Private Sector Technical Roles",
            "Entrepreneurship in Technical Field", "Further Studies (B.Tech Lateral Entry)"
        ],
        "keywords": ["practical", "hands-on", "technical", "industry", "quick job", "diploma"],
        "scoring_rules": {
            "education_preference": {"A": 10, "B": 35, "C": 15, "D": 20},
            "learning_style": {"A": 30, "B": 10, "C": 15, "D": 20},
            "study_duration": {"A": 15, "B": 10, "C": 30, "D": 25},
            "future_goals": {"A": 20, "B": 25, "C": 15, "D": 10},
            "career_interest": {"A": 25, "B": 5, "C": 10, "D": 15}
        },
        "min_confidence": 65
    },

    # ============================
    # AFTER 12TH OPTIONS (Expandable)
    # ============================
    "Engineering Colleges": {
        "pathway": "after12th",
        "subjects": ["Advanced Engineering Courses"],
        "careers": ["Software Engineer", "Mechanical Engineer", "Civil Engineer"],
        "keywords": ["engineering", "technology", "JEE", "technical"],
        "scoring_rules": {},
        "min_confidence": 70
    },

    "Medical Colleges": {
        "pathway": "after12th", 
        "subjects": ["MBBS", "BDS", "BAMS", "Other Medical Courses"],
        "careers": ["Doctor", "Dentist", "Medical Research"],
        "keywords": ["medicine", "NEET", "doctor", "healthcare"],
        "scoring_rules": {},
        "min_confidence": 75
    }
}

# Enhanced Question Bank for After 10th (Aptitude + Interest Based)
AFTER_10TH_QUESTIONS = [
    {
        "id": "education_preference",
        "question": "What type of education path interests you more after 10th?",
        "options": [
            "A) 11th & 12th standard with detailed theory subjects",
            "B) Diploma courses with practical hands-on training", 
            "C) Both seem equally interesting to me",
            "D) I'm not sure, need guidance on this"
        ],
        "category": "education_path",
        "type": "preference",
        "weight": 0.25
    },
    {
        "id": "academic_strength", 
        "question": "Which subjects did you perform best in during 10th grade?",
        "options": [
            "A) Mathematics and Science (Physics, Chemistry)",
            "B) Social Studies, History, and Languages",
            "C) All subjects performed equally well",
            "D) I struggled with most subjects but interested in practical work"
        ],
        "category": "academic_performance",
        "type": "aptitude",
        "weight": 0.3
    },
    {
        "id": "learning_style",
        "question": "How do you prefer to learn new concepts?",
        "options": [
            "A) Through experiments and practical demonstrations",
            "B) Reading textbooks and theoretical explanations", 
            "C) Group discussions and interactive sessions",
            "D) Visual aids like videos, diagrams, and hands-on activities"
        ],
        "category": "learning_preference",
        "type": "aptitude",
        "weight": 0.2
    },
    {
        "id": "career_interest",
        "question": "Which career field excites you the most?",
        "options": [
            "A) Engineering, Technology, and Innovation",
            "B) Medicine, Healthcare, and Life Sciences",
            "C) Business, Finance, and Management", 
            "D) Arts, Literature, Social Sciences, and Civil Services"
        ],
        "category": "career_aspiration", 
        "type": "interest",
        "weight": 0.35
    },
    {
        "id": "problem_solving",
        "question": "When faced with a challenging problem, you prefer to:",
        "options": [
            "A) Use logical reasoning and mathematical formulas",
            "B) Research and gather information from multiple sources",
            "C) Discuss with others to get different perspectives",
            "D) Try different creative approaches until something works"
        ],
        "category": "aptitude",
        "type": "aptitude", 
        "weight": 0.25
    },
    {
        "id": "future_goals",
        "question": "What's most important to you in your future career?",
        "options": [
            "A) High salary and financial stability",
            "B) Job security and steady growth",
            "C) Making a positive impact on society", 
            "D) Creative freedom and self-expression"
        ],
        "category": "values",
        "type": "interest",
        "weight": 0.2
    },
    {
        "id": "study_duration",
        "question": "How long are you willing to study after 12th for your dream career?",
        "options": [
            "A) 3-4 years (Bachelor's degree)",
            "B) 5-7 years (Professional courses like Engineering/Medicine)",
            "C) 1-2 years (Diploma/Certificate courses)", 
            "D) I want to start working as soon as possible"
        ],
        "category": "commitment",
        "type": "preference",
        "weight": 0.15
    },
    {
        "id": "work_environment",
        "question": "What kind of work environment appeals to you most?",
        "options": [
            "A) Laboratories and research facilities with cutting-edge technology",
            "B) Hospitals and healthcare settings helping people",
            "C) Corporate offices and business meetings with financial decisions",
            "D) Creative studios, educational institutions, or flexible workspaces"
        ],
        "category": "environment_preference",
        "type": "interest", 
        "weight": 0.18
    }
]

# After 12th Questions (Basic set - expandable)
AFTER_12TH_QUESTIONS = [
    {
        "id": "current_stream",
        "question": "What stream did you choose in 11th-12th?",
        "options": [
            "A) Science (PCM - Physics, Chemistry, Math)",
            "B) Science (PCB - Physics, Chemistry, Biology)", 
            "C) Commerce",
            "D) Arts/Humanities"
        ],
        "category": "current_education",
        "type": "factual",
        "weight": 0.4
    },
    {
        "id": "entrance_exam_preference",
        "question": "Which entrance exam are you most interested in preparing for?",
        "options": [
            "A) JEE Main/Advanced for Engineering",
            "B) NEET for Medical courses",
            "C) CA Foundation, Bank exams for Commerce",
            "D) CLAT for Law, Civil Services preparation"
        ],
        "category": "exam_preference",
        "type": "interest",
        "weight": 0.35
    }
    # Add more After 12th questions as needed
]

def _ai_call(prompt: str, timeout=OLLAMA_TIMEOUT_SEC) -> str:
    """Enhanced AI call with better error handling and fallback"""
    try:
        logger.info(f"Making AI call with prompt length: {len(prompt)}")
        
        result = subprocess.run(
            ["ollama", "run", MODEL_NAME],
            input=prompt,
            capture_output=True,
            text=True,
            timeout=timeout
        )
        
        if result.returncode != 0:
            logger.error(f"Ollama returned error code: {result.returncode}")
            logger.error(f"Error output: {result.stderr}")
            return ""
            
        output = (result.stdout or "").strip()
        if not output:
            logger.warning("Empty output from Ollama")
            return ""
            
        # Clean and return first meaningful response
        lines = [line.strip() for line in output.split('\n') if line.strip()]
        response = lines[0] if lines else ""
        
        logger.info(f"AI response received: {response[:100]}...")
        return response
        
    except subprocess.TimeoutExpired:
        logger.error(f"AI call timed out after {timeout} seconds")
        return ""
    except FileNotFoundError:
        logger.error("Ollama not found. Make sure it's installed and in PATH")
        return ""
    except Exception as e:
        logger.error(f"AI call error: {e}")
        return ""

def analyze_responses_advanced(responses, pathway):
    """Advanced analysis with weighted scoring and confidence calculation"""
    
    # Get available streams for the pathway
    available_streams = {name: info for name, info in STREAM_DEFINITIONS.items() 
                        if info["pathway"] == pathway}
    
    # Initialize scores
    scores = {stream_name: 0 for stream_name in available_streams.keys()}
    
    # Process each response
    for response in responses:
        question_id = response.get("questionId", "")
        answer = response.get("answer", "").strip()
        
        if not answer:
            continue
            
        # Extract answer choice (A, B, C, D)
        answer_choice = answer[0].upper() if answer else ""
        
        if answer_choice not in ["A", "B", "C", "D"]:
            continue
            
        # Apply scoring rules for each stream
        for stream_name, stream_info in available_streams.items():
            scoring_rules = stream_info.get("scoring_rules", {})
            
            if question_id in scoring_rules:
                question_scores = scoring_rules[question_id]
                if answer_choice in question_scores:
                    points = question_scores[answer_choice]
                    scores[stream_name] += points
                    logger.info(f"Stream {stream_name}: +{points} points for {question_id}={answer_choice}")

    # Calculate confidence based on score distribution
    total_responses = len(responses)
    max_possible_score = total_responses * 35  # Assuming max 35 points per question
    
    confidence_scores = {}
    for stream_name, score in scores.items():
        # Calculate confidence percentage
        raw_confidence = (score / max_possible_score) * 100 if max_possible_score > 0 else 0
        
        # Apply minimum confidence threshold
        min_confidence = available_streams[stream_name].get("min_confidence", 60)
        confidence = max(raw_confidence, min_confidence) if score > 0 else 30
        
        # Cap at 95% to maintain realism
        confidence_scores[stream_name] = min(confidence, 95)
    
    return scores, confidence_scores

def generate_recommendation(responses, pathway):
    """Generate final recommendation with detailed analysis"""
    
    if not responses:
        return {
            "error": "No responses to analyze",
            "recommendation": "Please complete the assessment first",
            "confidence": 0
        }
    
    # Analyze responses
    scores, confidence_scores = analyze_responses_advanced(responses, pathway)
    
    if not scores:
        return {
            "error": "No valid streams found for pathway",
            "recommendation": "Invalid pathway selected",
            "confidence": 0
        }
    
    # Find best recommendation
    best_stream = max(scores.keys(), key=lambda x: scores[x])
    best_score = scores[best_stream]
    best_confidence = confidence_scores.get(best_stream, 60)
    
    # Get alternatives (top 3 excluding the best)
    sorted_streams = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    alternatives = [stream[0] for stream in sorted_streams[1:4] if stream[1] > 0]
    
    # Generate explanation
    stream_info = STREAM_DEFINITIONS.get(best_stream, {})
    explanation = generate_explanation(best_stream, stream_info, responses, best_confidence)
    
    # Prepare resources
    resources = [
        {"title": "Career Guidance", "type": "careerGuidance"},
        {"title": "College Options", "type": "collegeOptions"}, 
        {"title": "Subject Details", "type": "subjectDetails"},
        {"title": "Scholarships", "type": "scholarships"}
    ]
    
    return {
        "recommendation": best_stream,
        "confidence": int(best_confidence),
        "alternatives": alternatives,
        "explanation": explanation,
        "stream_info": stream_info,
        "resources": resources,
        "score_breakdown": scores,
        "pathway": pathway
    }

def generate_explanation(stream_name, stream_info, responses, confidence):
    """Generate personalized explanation for the recommendation"""
    
    explanation = f"Based on your {len(responses)} responses, {stream_name} is the ideal choice for you:\n\n"
    
    # Add stream-specific reasoning
    careers = stream_info.get("careers", [])[:3]
    if careers:
        explanation += f"• Your interests align perfectly with careers in {', '.join(careers)}\n"
    
    # Add confidence reasoning
    if confidence >= 80:
        explanation += f"• High confidence ({confidence}%) indicates strong alignment with your aptitude and interests\n"
    elif confidence >= 70:
        explanation += f"• Good confidence ({confidence}%) shows this stream matches your profile well\n"
    else:
        explanation += f"• Moderate confidence ({confidence}%) suggests this is a suitable option to explore further\n"
    
    # Add subjects info
    subjects = stream_info.get("subjects", [])
    if subjects:
        explanation += f"• The subjects ({', '.join(subjects[:3])}) align with your academic strengths\n"
    
    explanation += f"\nThis recommendation is based on analysis of your aptitude, interests, and career aspirations."
    
    return explanation

def get_next_question(session_data, pathway):
    """Get the next most appropriate question based on pathway and progress"""
    
    current_responses = session_data.get("responses", [])
    question_count = len(current_responses)
    
    # Select question bank based on pathway
    questions = AFTER_10TH_QUESTIONS if pathway == "after10th" else AFTER_12TH_QUESTIONS
    max_questions = MAX_QUESTIONS_AFTER_10TH if pathway == "after10th" else MAX_QUESTIONS_AFTER_12TH
    
    # Check if we should stop
    if question_count >= min(len(questions), max_questions):
        return None
        
    # For now, use sequential questioning (can be made smarter)
    if question_count < len(questions):
        return questions[question_count]
    
    return None

# ==================== API ENDPOINTS ====================

@app.route("/health", methods=["GET"])
def health_check():
    """Enhanced health check with system status"""
    
    # Check if Ollama is available
    ollama_status = "unknown"
    try:
        result = subprocess.run(["ollama", "list"], capture_output=True, text=True, timeout=5)
        ollama_status = "available" if result.returncode == 0 else "error"
    except:
        ollama_status = "not_installed"
    
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "model": MODEL_NAME,
        "ollama_status": ollama_status,
        "max_questions": {
            "after10th": MAX_QUESTIONS_AFTER_10TH,
            "after12th": MAX_QUESTIONS_AFTER_12TH
        },
        "active_sessions": len(sessions),
        "supported_pathways": ["after10th", "after12th"],
        "available_streams": len(STREAM_DEFINITIONS)
    }), 200

@app.route("/start-assessment", methods=["POST"])
def start_assessment():
    """Start a new assessment session"""
    
    try:
        data = request.get_json() or {}
        session_id = data.get("session_id")
        pathway = data.get("pathway", "after10th")  # after10th or after12th
        
        if not session_id:
            return jsonify({"error": "Session ID is required"}), 400
            
        if pathway not in ["after10th", "after12th"]:
            return jsonify({"error": "Invalid pathway. Use 'after10th' or 'after12th'"}), 400
        
        # Initialize session
        sessions[session_id] = {
            "pathway": pathway,
            "responses": [],
            "conversation": [],
            "started_at": datetime.now().isoformat(),
            "question_count": 0
        }
        
        # Get first question
        first_question = get_next_question(sessions[session_id], pathway)
        
        if not first_question:
            return jsonify({"error": "No questions available for this pathway"}), 500
        
        logger.info(f"Started assessment for session {session_id}, pathway {pathway}")
        
        return jsonify({
            "success": True,
            "session_id": session_id,
            "pathway": pathway,
            "question": first_question,
            "question_number": 1,
            "total_questions": MAX_QUESTIONS_AFTER_10TH if pathway == "after10th" else MAX_QUESTIONS_AFTER_12TH
        })
        
    except Exception as e:
        logger.error(f"Error in start_assessment: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route("/submit-answer", methods=["POST"])
def submit_answer():
    """Submit answer and get next question or final recommendation"""
    
    try:
        data = request.get_json() or {}
        session_id = data.get("session_id")
        answer = data.get("answer", "").strip()
        clarification = data.get("clarification", "").strip()
        
        if not session_id or not answer:
            return jsonify({"error": "Session ID and answer are required"}), 400
        
        if session_id not in sessions:
            return jsonify({"error": "Invalid session ID"}), 400
        
        session_data = sessions[session_id]
        pathway = session_data["pathway"]
        
        # Store the response
        response_data = {
            "questionId": data.get("question_id", ""),
            "question": data.get("question", ""),
            "answer": answer,
            "clarification": clarification,
            "timestamp": datetime.now().isoformat()
        }
        
        session_data["responses"].append(response_data)
        session_data["conversation"].extend([
            f"AI: {response_data['question']}",
            f"Student: {answer}" + (f" ({clarification})" if clarification else "")
        ])
        
        logger.info(f"Answer submitted for session {session_id}: {answer[:50]}...")
        
        # Check if we should end the assessment
        questions = AFTER_10TH_QUESTIONS if pathway == "after10th" else AFTER_12TH_QUESTIONS
        max_questions = MAX_QUESTIONS_AFTER_10TH if pathway == "after10th" else MAX_QUESTIONS_AFTER_12TH
        
        current_count = len(session_data["responses"])
        
        # End conditions: reached max questions or no more questions available
        if current_count >= min(len(questions), max_questions):
            # Generate final recommendation
            recommendation = generate_recommendation(session_data["responses"], pathway)
            
            # Store recommendation in session
            session_data["final_recommendation"] = recommendation
            session_data["completed_at"] = datetime.now().isoformat()
            
            logger.info(f"Assessment completed for session {session_id}: {recommendation.get('recommendation', 'Unknown')}")
            
            return jsonify({
                "success": True,
                "completed": True,
                "recommendation": recommendation,
                "session_summary": {
                    "total_responses": len(session_data["responses"]),
                    "pathway": pathway,
                    "duration": "calculated_in_frontend"  # Frontend can calculate from timestamps
                }
            })
        
        # Get next question
        next_question = get_next_question(session_data, pathway)
        
        if not next_question:
            # No more questions available, generate recommendation
            recommendation = generate_recommendation(session_data["responses"], pathway)
            session_data["final_recommendation"] = recommendation
            session_data["completed_at"] = datetime.now().isoformat()
            
            return jsonify({
                "success": True,
                "completed": True,
                "recommendation": recommendation
            })
        
        # Return next question
        return jsonify({
            "success": True,
            "completed": False,
            "question": next_question,
            "question_number": current_count + 1,
            "progress": {
                "current": current_count + 1,
                "total": min(len(questions), max_questions),
                "percentage": ((current_count + 1) / min(len(questions), max_questions)) * 100
            }
        })
        
    except Exception as e:
        logger.error(f"Error in submit_answer: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route("/get-recommendation", methods=["POST"])
def get_recommendation():
    """Get recommendation for a completed session"""
    
    try:
        data = request.get_json() or {}
        session_id = data.get("session_id")
        
        if not session_id:
            return jsonify({"error": "Session ID is required"}), 400
        
        if session_id not in sessions:
            return jsonify({"error": "Session not found"}), 404
            
        session_data = sessions[session_id]
        
        if "final_recommendation" in session_data:
            return jsonify({
                "success": True,
                "recommendation": session_data["final_recommendation"],
                "session_info": {
                    "pathway": session_data["pathway"],
                    "responses_count": len(session_data["responses"]),
                    "started_at": session_data["started_at"],
                    "completed_at": session_data.get("completed_at")
                }
            })
        
        # Generate recommendation if not already generated
        if session_data["responses"]:
            recommendation = generate_recommendation(session_data["responses"], session_data["pathway"])
            session_data["final_recommendation"] = recommendation
            session_data["completed_at"] = datetime.now().isoformat()
            
            return jsonify({
                "success": True,
                "recommendation": recommendation
            })
        
        return jsonify({"error": "No responses found to generate recommendation"}), 400
        
    except Exception as e:
        logger.error(f"Error in get_recommendation: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route("/reset-session", methods=["POST"])
def reset_session():
    """Reset/clear a session"""
    
    try:
        data = request.get_json() or {}
        session_id = data.get("session_id")
        
        if not session_id:
            return jsonify({"error": "Session ID is required"}), 400
        
        if session_id in sessions:
            del sessions[session_id]
            logger.info(f"Session {session_id} reset successfully")
        
        return jsonify({
            "success": True,
            "message": "Session reset successfully"
        })
        
    except Exception as e:
        logger.error(f"Error in reset_session: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route("/session-status", methods=["GET"])
def session_status():
    """Get status of a specific session"""
    
    try:
        session_id = request.args.get("session_id")
        
        if not session_id:
            return jsonify({"error": "Session ID is required"}), 400
        
        if session_id not in sessions:
            return jsonify({"error": "Session not found"}), 404
        
        session_data = sessions[session_id]
        
        return jsonify({
            "success": True,
            "session": {
                "session_id": session_id,
                "pathway": session_data["pathway"],
                "started_at": session_data["started_at"],
                "responses_count": len(session_data["responses"]),
                "is_completed": "final_recommendation" in session_data,
                "completed_at": session_data.get("completed_at"),
                "last_activity": session_data.get("last_activity", session_data["started_at"])
            }
        })
        
    except Exception as e:
        logger.error(f"Error in session_status: {e}")
        return jsonify({"error": "Internal server error"}), 500

# ==================== AI INTEGRATION ENDPOINTS ====================

@app.route("/ask-ai", methods=["POST"])
def ask_ai():
    """Direct AI interaction (when Ollama is available)"""
    
    try:
        data = request.get_json() or {}
        prompt = data.get("prompt", "").strip()
        context = data.get("context", "")
        
        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400
        
        # Prepare enhanced prompt for career guidance
        enhanced_prompt = f"""
You are EduTrack AI, an expert Indian career counselor. Help students with career guidance.

Context: {context}
Student Query: {prompt}

Provide helpful, accurate advice specific to the Indian education system and career opportunities.
Keep responses concise but informative.
"""
        
        ai_response = _ai_call(enhanced_prompt)
        
        if not ai_response:
            return jsonify({
                "success": False,
                "error": "AI service unavailable",
                "fallback_message": "I'm sorry, the AI service is currently unavailable. Please try again later or use the guided assessment."
            }), 503
        
        return jsonify({
            "success": True,
            "response": ai_response,
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Error in ask_ai: {e}")
        return jsonify({"error": "Internal server error"}), 500

# ==================== ADMIN/MONITORING ENDPOINTS ====================

@app.route("/admin/sessions", methods=["GET"])
def admin_get_sessions():
    """Get all active sessions (for monitoring)"""
    
    try:
        session_summaries = []
        
        for session_id, session_data in sessions.items():
            session_summaries.append({
                "session_id": session_id,
                "pathway": session_data["pathway"],
                "started_at": session_data["started_at"],
                "responses_count": len(session_data["responses"]),
                "is_completed": "final_recommendation" in session_data,
                "recommendation": session_data.get("final_recommendation", {}).get("recommendation", "N/A")
            })
        
        return jsonify({
            "success": True,
            "total_sessions": len(sessions),
            "sessions": session_summaries
        })
        
    except Exception as e:
        logger.error(f"Error in admin_get_sessions: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route("/admin/clear-all", methods=["POST"])
def admin_clear_all():
    """Clear all sessions (for testing/maintenance)"""
    
    try:
        session_count = len(sessions)
        sessions.clear()
        
        logger.info(f"Cleared {session_count} sessions")
        
        return jsonify({
            "success": True,
            "message": f"Cleared {session_count} sessions successfully"
        })
        
    except Exception as e:
        logger.error(f"Error in admin_clear_all: {e}")
        return jsonify({"error": "Internal server error"}), 500

# ==================== STREAM INFORMATION ENDPOINTS ====================

@app.route("/streams", methods=["GET"])
def get_streams():
    """Get all available streams with details"""
    
    try:
        pathway = request.args.get("pathway", "all")
        
        if pathway == "all":
            filtered_streams = STREAM_DEFINITIONS
        else:
            filtered_streams = {name: info for name, info in STREAM_DEFINITIONS.items() 
                              if info["pathway"] == pathway}
        
        return jsonify({
            "success": True,
            "streams": filtered_streams,
            "total_streams": len(filtered_streams)
        })
        
    except Exception as e:
        logger.error(f"Error in get_streams: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route("/stream/<stream_name>", methods=["GET"])
def get_stream_details(stream_name):
    """Get detailed information about a specific stream"""
    
    try:
        if stream_name not in STREAM_DEFINITIONS:
            return jsonify({"error": "Stream not found"}), 404
        
        stream_info = STREAM_DEFINITIONS[stream_name]
        
        return jsonify({
            "success": True,
            "stream_name": stream_name,
            "stream_info": stream_info
        })
        
    except Exception as e:
        logger.error(f"Error in get_stream_details: {e}")
        return jsonify({"error": "Internal server error"}), 500

# ==================== PLACEHOLDER ENDPOINTS FOR LOGIN INTEGRATION ====================

@app.route("/user/save-assessment", methods=["POST"])
def save_user_assessment():
    """Save assessment to user profile (Login integration placeholder)"""
    
    # TODO: Integrate with your existing authentication system
    # This endpoint will save assessment results to user's profile
    
    return jsonify({
        "success": False,
        "message": "Login integration pending - assessments not saved to user profile yet",
        "note": "Replace this endpoint with your authentication system integration"
    }), 501

@app.route("/user/get-history", methods=["GET"])
def get_user_history():
    """Get user's assessment history (Login integration placeholder)"""
    
    # TODO: Integrate with your existing authentication system
    # This endpoint will retrieve user's assessment history from database
    
    return jsonify({
        "success": False,
        "message": "Login integration pending - user history not available yet",
        "note": "Replace this endpoint with your authentication system integration"
    }), 501

@app.route("/user/profile", methods=["GET"])
def get_user_profile():
    """Get user profile with career recommendations (Login integration placeholder)"""
    
    # TODO: Integrate with your existing authentication system
    
    return jsonify({
        "success": False,
        "message": "Login integration pending",
        "note": "Integrate with your existing user authentication and profile system"
    }), 501

# ==================== ERROR HANDLERS ====================

@app.errorhandler(404)
def not_found_error(error):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    logger.error(f"Internal server error: {error}")
    return jsonify({"error": "Internal server error"}), 500

@app.errorhandler(400)
def bad_request_error(error):
    return jsonify({"error": "Bad request"}), 400

# ==================== STARTUP ====================

if __name__ == "__main__":
    print("\n" + "="*60)
    print("🚀 EduTrack Smart Career AI Backend Starting...")
    print("="*60)
    print(f"📊 Configuration:")
    print(f"   • Model: {MODEL_NAME}")
    print(f"   • After 10th Max Questions: {MAX_QUESTIONS_AFTER_10TH}")
    print(f"   • After 12th Max Questions: {MAX_QUESTIONS_AFTER_12TH}")
    print(f"   • Confidence Threshold: {CONFIDENCE_THRESHOLD}%")
    print(f"   • Data Directory: {DATA_DIR}")
    print(f"   • Available Streams: {len(STREAM_DEFINITIONS)}")
    print(f"   • Supported Pathways: after10th, after12th")
    
    print(f"\n🎯 Features:")
    print("   • Smart aptitude + interest based questioning")
    print("   • Advanced scoring system with confidence calculation") 
    print("   • Separate pathways for After 10th & After 12th")
    print("   • Session management for guest & logged-in users")
    print("   • Resource routing for stream-specific information")
    print("   • AI integration ready (Ollama)")
    
    print(f"\n🔗 API Endpoints Ready:")
    print("   • /health - System status")
    print("   • /start-assessment - Begin assessment")
    print("   • /submit-answer - Submit responses") 
    print("   • /get-recommendation - Get final recommendation")
    print("   • /streams - Stream information")
    print("   • /admin/* - Admin endpoints")
    print("   • /user/* - User integration placeholders")
    
    print(f"\n💡 Next Steps:")
    print("   1. Install Ollama: curl -fsSL https://ollama.ai/install.sh | sh")
    print("   2. Install LLaMA3: ollama pull llama3")
    print("   3. Integrate with your login system (replace /user/* endpoints)")
    print("   4. Test the React component with this backend")
    
    print("="*60)
    print("🌟 Ready to serve intelligent career guidance!")
    print("="*60 + "\n")
    
    # Check Ollama availability on startup
    try:
        result = subprocess.run(["ollama", "--version"], capture_output=True, text=True, timeout=5)
        if result.returncode == 0:
            print("✅ Ollama detected and ready")
        else:
            print("⚠️ Ollama installed but may have issues")
    except FileNotFoundError:
        print("❌ Ollama not found - AI features will be limited")
        print("   Install from: https://ollama.ai")
    except:
        print("⚠️ Could not verify Ollama status")
    
    app.run(host="127.0.0.1", port=5000, debug=True, threaded=True)