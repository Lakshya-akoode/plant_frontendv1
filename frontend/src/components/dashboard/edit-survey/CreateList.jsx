"use client"; 

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getSurveyById, updateSurveyAPI } from "../../../api/survey";
import { toast } from 'react-toastify';

const CreateList = () => {
  const params = useParams();  
  const id = params?.id;  
  const router = useRouter();
  const [studyName, setStudyName] = useState("");
  const [questions, setQuestions] = useState([{ question: "", options: [""] }]);
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;      
    const fetchSurvey = async () => {
      try {
        const data = await getSurveyById(id);
        
        if (data.status === "success" && data.data) {
          setStudyName(data.data.studyName || "");
          setStatus(data.data.status !== undefined ? data.data.status : true);
          
          // Handle both old format (strings) and new format (objects with question and options)
          const fetchedQuestions = data.data.questions || [];
          const formattedQuestions = fetchedQuestions.length > 0 
            ? fetchedQuestions.map(q => {
                if (typeof q === 'string') {
                  return { question: q, options: [""] };
                }
                return {
                  question: q.question || "",
                  options: q.options && q.options.length > 0 ? q.options : [""]
                };
              })
            : [{ question: "", options: [""] }];
          
          setQuestions(formattedQuestions);
        }
        
      } catch (error) {
        console.error("Error fetching Survey:", error);
        toast.error("Failed to load Survey data");
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
    
  }, [id]);

  const handleStudyNameChange = (e) => {
    setStudyName(e.target.value);
    if (e.target.value.trim() !== "") {
      setError("");
    }
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], question: value };
    setQuestions(newQuestions);
    setError("");
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
    setError("");
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push("");
    setQuestions(newQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].options.length > 1) {
      newQuestions[questionIndex].options = newQuestions[questionIndex].options.filter((_, i) => i !== optionIndex);
      setQuestions(newQuestions);
    } else {
      toast.warning("At least one option is required");
    }
  };

  const addQuestion = () => {
    if (questions.length < 10) {
      setQuestions([...questions, { question: "", options: [""] }]);
    } else {
      toast.warning("Maximum of 10 questions allowed");
    }
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
    } else {
      toast.warning("At least one question is required");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!studyName.trim()) {
      setError("Study name is required");
      setIsSubmitting(false);
      return;
    }

    // Validate and format questions
    const validQuestions = questions
      .map(q => ({
        question: (q.question || "").trim(),
        options: (q.options || []).filter(opt => opt && opt.trim().length > 0).map(opt => opt.trim())
      }))
      .filter(q => q.question && q.question.length > 0);
    
    if (validQuestions.length < 1) {
      setError("At least one question is required");
      setIsSubmitting(false);
      return;
    }

    if (validQuestions.length > 10) {
      setError("Maximum of 10 questions allowed");
      setIsSubmitting(false);
      return;
    }
    
    setError("");
    
    try {
      const formData = {
        studyName: studyName.trim(),
        questions: validQuestions,
        status: status
      };
      
      const data = await updateSurveyAPI(id, formData);
      toast.success(data.message);
      
      if(data.status === "success"){
        setTimeout(() => {
          router.push("/livetest/cmsadminlogin/my-survey");
        }, 1500); 
      }
      
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-lg-12 col-xl-12">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="StudyName">Study Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="StudyName" 
              value={studyName} 
              onChange={handleStudyNameChange}
              placeholder="Enter study name"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>
        {/* End .col */}

        <div className="col-lg-12">
          <div className="my_profile_setting_input form-group">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <label htmlFor="Questions">Questions (1-10 required)</label>
              {questions.length < 10 && (
                <button
                  type="button"
                  onClick={addQuestion}
                  className="btn btn-sm btn-primary"
                  style={{ padding: '6px 12px', fontSize: '14px' }}
                >
                  <i className="fa fa-plus mr-1"></i> Add Question
                </button>
              )}
            </div>
            
            {questions.map((q, questionIndex) => (
              <div key={questionIndex} className="mb-4" style={{ 
                padding: '20px', 
                border: '2px solid #e5e7eb', 
                borderRadius: '8px',
                backgroundColor: '#f9fafb'
              }}>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <label htmlFor={`question-${questionIndex}`} style={{ fontWeight: '600', marginBottom: '8px', fontSize: '16px' }}>
                    Question {questionIndex + 1}
                  </label>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(questionIndex)}
                      className="btn btn-sm btn-danger"
                      style={{ padding: '4px 8px', fontSize: '12px' }}
                      title="Remove question"
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  )}
                </div>
                
                <div className="mb-3">
                  <label htmlFor={`question-text-${questionIndex}`} style={{ fontWeight: '500', marginBottom: '8px', display: 'block' }}>
                    Question Text
                  </label>
                  <textarea
                    id={`question-text-${questionIndex}`}
                    className="form-control"
                    rows="2"
                    value={q.question || ""}
                    onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                    placeholder={`Enter question ${questionIndex + 1} text`}
                    required
                  />
                </div>

                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label style={{ fontWeight: '500', marginBottom: '0' }}>
                      Optional Answers (Multiple Choice Options)
                    </label>
                    <button
                      type="button"
                      onClick={() => addOption(questionIndex)}
                      className="btn btn-sm btn-primary"
                      style={{ padding: '4px 8px', fontSize: '12px' }}
                      title="Add option"
                    >
                      <i className="fa fa-plus mr-1"></i> Add Option
                    </button>
                  </div>
                  
                  {q.options && q.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="d-flex align-items-center mb-2">
                      <input
                        type="text"
                        className="form-control"
                        value={option || ""}
                        onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                        placeholder={`Option ${optionIndex + 1} (optional)`}
                        style={{ marginRight: '8px' }}
                      />
                      {q.options.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeOption(questionIndex, optionIndex)}
                          className="btn btn-sm btn-danger"
                          style={{ padding: '4px 8px', fontSize: '12px' }}
                          title="Remove option"
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      )}
                    </div>
                  ))}
                  
                  <small className="text-muted d-block mt-2">
                    {q.options.filter(opt => opt && opt.trim()).length} option(s) added. Leave empty for text-based answers.
                  </small>
                </div>
              </div>
            ))}
            
            <div className="mt-2">
              <small className="text-muted">
                {questions.filter(q => q.question && q.question.trim()).length} of {questions.length} question(s) entered 
                {questions.filter(q => q.question && q.question.trim()).length < 1 && " (minimum 1 required)"}
                {questions.length >= 10 && " (maximum 10 allowed)"}
              </small>
            </div>
          </div>
        </div>
        {/* End .col */}

        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label>Status</label>
            <select
              className="selectpicker form-select"
              data-live-search="true"
              data-width="100%"
              value={status ? "active" : "deactive"}
              onChange={(e) => setStatus(e.target.value === "active")}
            >
              <option value="active">Active</option>
              <option value="deactive">Deactive</option>
            </select>
          </div>
        </div>
        {/* End .col */}

        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            <button 
              className="btn-default float-start" 
              type="button" 
              onClick={() => window.location.href = '/livetest/cmsadminlogin/my-survey'}
            >
              Back
            </button>
            <button 
              type="submit" 
              className="btn btn2 float-end" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;

