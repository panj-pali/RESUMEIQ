import React, { useState, useRef } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate } from "react-router";

const Home = () => {

    const { loading, generateReport } = useInterview();

    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");

    const resumeInputRef = useRef();

    const navigate = useNavigate();

    const handleGenerateReport = async () => {

        const resumeFile = resumeInputRef.current.files[0];

        if (!resumeFile) {
            alert("Please upload your resume");
            return;
        }

        const data = await generateReport({
            jobDescription,
            selfDescription,
            resumeFile
        });

        if (data?._id) {
            navigate(`/interview/${data._id}`);
        }
    };

    if (loading) {
        return (
            <main className="loading-screen">
                <h1>Loading your interview plan...</h1>
            </main>
        );
    }

    return (
        <main className="home">

            <div className="interview-input-group">

                <div className="left">

                    <textarea
                        onChange={(e) => {
                            setJobDescription(e.target.value);
                        }}
                        className="textarea"
                        name="jobDescription"
                        id="jobDescription"
                        placeholder="Enter the job description"
                    />

                </div>

                <div className="right">

                    <div className="input-group">

                        <label
                            className="file-lebel"
                            htmlFor="resume"
                        >
                            Upload Resume
                        </label>

                        <input
                            ref={resumeInputRef}
                            hidden
                            type="file"
                            name="resume"
                            id="resume"
                            accept=".pdf"
                        />

                    </div>

                    <div className="input-group">

                        <label htmlFor="selfDescription">
                            Self Description
                        </label>

                        <input
                            onChange={(e) => {
                                setSelfDescription(e.target.value);
                            }}
                            className="textarea"
                            type="text"
                            name="selfDescription"
                            id="selfDescription"
                            placeholder="Enter the self description"
                        />

                    </div>

                    <button
                        onClick={handleGenerateReport}
                        className="generate-btn"
                    >
                        Generate Interview Report
                    </button>

                </div>

            </div>

        </main>
    );
};

export default Home;