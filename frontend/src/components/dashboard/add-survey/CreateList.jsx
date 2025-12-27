"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addSurveyAPI } from "@/api/survey";
import { toast } from 'react-toastify';

const CreateList = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [studyName, setStudyName] = useState("");
  const [questions, setQuestions] = useState([{ question: "", options: [""] }]);
  const [error, setError] = useState("");

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

  const addSurvey = async (e) => {
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
        status: true // Default to active status
      };
      
      const data = await addSurveyAPI(formData);
     
      toast.success(data.message);
     
      if(data.status === "success"){
        setTimeout(() => {
          router.push("/livetest/cmsadminlogin/my-survey");
        }, 1500); 
      }

      setStudyName("");
      setQuestions([{ question: "", options: [""] }]);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
    
  return (
    <>
      <form onSubmit={addSurvey} className="row">
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
                  className="btn-default"
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
                      className="btn-default"
                      style={{ padding: '8px 12px', fontSize: '12px' }}
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

        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            <button 
              className="btn-default float-start" 
              type="button" 
              onClick={() => window.location.href = '/livetest/cmsadminlogin/my-dashboard'}
            >
              Back
            </button>
            <button 
              type="submit" 
              className="btn-default float-end" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;

