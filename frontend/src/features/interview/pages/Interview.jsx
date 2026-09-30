import React, { useState } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview.js";

const Interview = () => {

  // =========================
  // GET REPORT FROM BACKEND
  // =========================

  const { loading, report } = useInterview();


  // =========================
  // ACTIVE SIDEBAR SECTION
  // =========================

  const [activeSection, setActiveSection] = useState("technical");


  // =========================
  // OPEN QUESTION
  // =========================

  const [openQuestion, setOpenQuestion] = useState(0);


  // =========================
  // REPORT DATA
  // =========================

  const technicalQuestions = report?.technicalQuestions || [];

  const behavioralQuestions = report?.behavioralQuestions || [];

  const preparationPlan = report?.preparationPlan || [];

  const skillGaps = report?.skillGaps || [];

  const matchScore = report?.matchScore ?? 0;


  // =========================
  // HANDLE QUESTION CLICK
  // =========================

  const handleQuestionClick = (index) => {

    if (openQuestion === index) {
      setOpenQuestion(-1);
    } else {
      setOpenQuestion(index);
    }

  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <main className="loading-screen">

        <h1>
          Loading your interview plan...
        </h1>

      </main>
    );

  }


  // =========================
  // NO REPORT
  // =========================

  if (!report) {

    return (
      <main className="loading-screen">

        <h1>
          Interview report not found.
        </h1>

      </main>
    );

  }


  // =========================
  // RETURN UI
  // =========================

  return (

    <main className="interview-report">


      {/* =====================================
          LEFT SIDEBAR
      ===================================== */}

      <aside className="sidebar">

        <div className="sidebar-heading">
          SECTIONS
        </div>


        <div className="sidebar-menu">


          {/* =================================
              TECHNICAL
          ================================= */}

          <div
            className={`sidebar-item ${
              activeSection === "technical" ? "active" : ""
            }`}
            onClick={() => {

              setActiveSection("technical");

              setOpenQuestion(0);

            }}
          >

            <span className="sidebar-icon">
              &lt;/&gt;
            </span>

            <span>
              Technical Questions
            </span>

          </div>


          {/* =================================
              BEHAVIORAL
          ================================= */}

          <div
            className={`sidebar-item ${
              activeSection === "behavioral" ? "active" : ""
            }`}
            onClick={() => {

              setActiveSection("behavioral");

              setOpenQuestion(0);

            }}
          >

            <span className="sidebar-icon">
              □
            </span>

            <span>
              Behavioral Questions
            </span>

          </div>


          {/* =================================
              ROAD MAP
          ================================= */}

          <div
            className={`sidebar-item ${
              activeSection === "roadmap" ? "active" : ""
            }`}
            onClick={() => {

              setActiveSection("roadmap");

              setOpenQuestion(0);

            }}
          >

            <span className="sidebar-icon">
              ➤
            </span>

            <span>
              Road Map
            </span>

          </div>


        </div>

      </aside>



      {/* =====================================
          CENTER CONTENT
      ===================================== */}

      <section className="questions-section">


        {/* =================================
            TECHNICAL QUESTIONS
        ================================= */}

        {activeSection === "technical" && (

          <>

            <div className="questions-heading">

              <h1>
                Technical Questions
              </h1>

              <span className="questions-count">
                {technicalQuestions.length} questions
              </span>

            </div>


            <div className="questions-list">

              {technicalQuestions.length === 0 ? (

                <div className="question-card">

                  <div className="question-content">

                    <p>
                      No technical questions available.
                    </p>

                  </div>

                </div>

              ) : (

                technicalQuestions.map((item, index) => {

                  const isOpen =
                    openQuestion === index;


                  return (

                    <div
                      className="question-card"
                      key={index}
                    >


                      {/* QUESTION HEADER */}

                      <div
                        className="question-header"
                        onClick={() =>
                          handleQuestionClick(index)
                        }
                      >

                        <div className="question-number">

                          Q
                          {String(index + 1).padStart(2, "0")}

                        </div>


                        <div className="question-text">

                          {item.question}

                        </div>


                        <div className="question-arrow">

                          {isOpen ? "⌃" : "⌄"}

                        </div>

                      </div>


                      {/* QUESTION CONTENT */}

                      {isOpen && (

                        <div className="question-content">


                          {/* INTENTION */}

                          <div className="content-label intention">

                            INTENTION

                          </div>


                          <p>

                            {item.intention}

                          </p>


                          {/* MODEL ANSWER */}

                          <div className="content-label model-answer">

                            MODEL ANSWER

                          </div>


                          <p>

                            {item.answer}

                          </p>


                        </div>

                      )}

                    </div>

                  );

                })

              )}

            </div>

          </>

        )}



        {/* =================================
            BEHAVIORAL QUESTIONS
        ================================= */}

        {activeSection === "behavioral" && (

          <>

            <div className="questions-heading">

              <h1>
                Behavioral Questions
              </h1>

              <span className="questions-count">

                {behavioralQuestions.length} questions

              </span>

            </div>


            <div className="questions-list">

              {behavioralQuestions.length === 0 ? (

                <div className="question-card">

                  <div className="question-content">

                    <p>
                      No behavioral questions available.
                    </p>

                  </div>

                </div>

              ) : (

                behavioralQuestions.map((item, index) => {

                  const isOpen =
                    openQuestion === index;


                  return (

                    <div
                      className="question-card"
                      key={index}
                    >


                      {/* QUESTION HEADER */}

                      <div
                        className="question-header"
                        onClick={() =>
                          handleQuestionClick(index)
                        }
                      >

                        <div className="question-number">

                          Q
                          {String(index + 1).padStart(2, "0")}

                        </div>


                        <div className="question-text">

                          {item.question}

                        </div>


                        <div className="question-arrow">

                          {isOpen ? "⌃" : "⌄"}

                        </div>

                      </div>


                      {/* QUESTION CONTENT */}

                      {isOpen && (

                        <div className="question-content">


                          {/* INTENTION */}

                          <div className="content-label intention">

                            INTENTION

                          </div>


                          <p>

                            {item.intention}

                          </p>


                          {/* MODEL ANSWER */}

                          <div className="content-label model-answer">

                            MODEL ANSWER

                          </div>


                          <p>

                            {item.answer}

                          </p>


                        </div>

                      )}

                    </div>

                  );

                })

              )}

            </div>

          </>

        )}



        {/* =================================
            ROAD MAP
        ================================= */}

        {activeSection === "roadmap" && (

          <>

            <div className="questions-heading">

              <h1>
                Road Map
              </h1>

              <span className="questions-count">

                {preparationPlan.length} days

              </span>

            </div>


            <div className="questions-list">

              {preparationPlan.length === 0 ? (

                <div className="question-card">

                  <div className="question-content">

                    <p>
                      No preparation plan available.
                    </p>

                  </div>

                </div>

              ) : (

                preparationPlan.map((item, index) => (

                  <div
                    className="question-card"
                    key={index}
                  >

                    <div className="question-content">


                      {/* DAY */}

                      <div className="content-label model-answer">

                        DAY {item.day}

                      </div>


                      {/* FOCUS */}

                      <h2
                        style={{
                          margin: "5px 0 10px",
                          color: "#f0f2f4",
                          fontSize: "16px"
                        }}
                      >

                        {item.focus}

                      </h2>


                      {/* TASKS */}

                      {item.tasks?.map((task, taskIndex) => (

                        <p key={taskIndex}>

                          • {task}

                        </p>

                      ))}


                    </div>

                  </div>

                ))

              )}

            </div>

          </>

        )}

      </section>



      {/* =====================================
          RIGHT PANEL
      ===================================== */}

      <aside className="right-panel">


        {/* =================================
            MATCH SCORE
        ================================= */}

        <div className="match-title">

          MATCH SCORE

        </div>


        <div className="score-area">


          <div className="score-circle">

            <div className="score-number">

              {matchScore}

            </div>


            <div className="score-percent">

              %

            </div>

          </div>


          <div className="match-text">

            Match score for this role

          </div>

        </div>



        {/* =================================
            SKILL GAPS
        ================================= */}

        <div className="skill-gap">


          <div className="skill-heading">

            SKILL GAPS

          </div>


          {skillGaps.length === 0 ? (

            <div className="skill skill-low">

              No skill gaps found

            </div>

          ) : (

            skillGaps.map((item, index) => (

              <div
                key={index}
                className={`skill skill-${item.severity}`}
              >

                {item.skill}

              </div>

            ))

          )}

        </div>


      </aside>


    </main>

  );

};


export default Interview;