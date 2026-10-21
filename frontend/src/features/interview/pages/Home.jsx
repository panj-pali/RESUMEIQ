
import React, { useState, useRef } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth.js";

const Home = () => {
    const { loading, generateReport } = useInterview();
    const { user, handleLogout } = useAuth();

    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [resumeFile, setResumeFile] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const resumeInputRef = useRef(null);
    const navigate = useNavigate();

    const handleResumeChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            setResumeFile(null);
            return;
        }

        if (file.type !== "application/pdf") {
            alert("Please upload a PDF resume");
            e.target.value = "";
            setResumeFile(null);
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Resume size must be less than 5MB");
            e.target.value = "";
            setResumeFile(null);
            return;
        }

        setResumeFile(file);
    };

    const handleGenerateReport = async (e) => {
        e.preventDefault();

        if (!jobDescription.trim()) {
            alert("Please enter the job description");
            return;
        }

        if (!resumeFile && !selfDescription.trim()) {
            alert("Please upload your resume or enter a self-description");
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

    const onLogout = async () => {
        try {
            await handleLogout();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Logout failed. Please try again.");
        }
    };

    if (loading) {
        return (
            <main className="loading-screen">
                <h1>Generating your interview plan...</h1>
            </main>
        );
    }

    return (
        <main className="home">
            <div className="interview-page">

                <div className="home-topbar">
                    <div className="brand">ResumeIQ</div>

                    <div className="profile-menu">
                        <button
                            type="button"
                            className="profile-menu-button"
                            onClick={() => setMenuOpen(!menuOpen)}
                          
                        >
                            <span className="avatar">
                                {(user?.username || user?.name || "U")
                                    .charAt(0)
                                    .toUpperCase()}
                            </span>

                            <span>My Account</span>
                            <span>{menuOpen ? "▲" : "▼"}</span>
                        </button>

                        {menuOpen && (
                            <div className="profile-dropdown">
                                <div className="dropdown-user">
                                    <strong>
                                        {user?.username ||
                                         user?.name ||
                                         "User"}
                                    </strong>
                                    <small>{user?.email || ""}</small>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        navigate("/profile");
                                    }}
                                >
                                    👤 Profile
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        navigate("/reports");
                                    }}
                                >
                                    📄 Reports
                                </button>

                                <button
                                    type="button"
                                    className="logout-option"
                                    onClick={onLogout}
                                >
                                    ↪ Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <header className="page-header">
                    <h1>
                        Create Your Custom{" "}
                        <span>Interview Plan</span>
                    </h1>

                    <p>
                        Let our AI analyze the job requirements and your
                        unique profile to build a winning strategy.
                    </p>
                </header>

                <form
                    className="interview-input-group"
                    onSubmit={handleGenerateReport}
                >
                    <section className="left">
                        <label
                            className="section-label"
                            htmlFor="jobDescription"
                        >
                            <span>▣</span>
                            Target Job Description
                            <small>REQUIRED</small>
                        </label>

                        <textarea
                            id="jobDescription"
                            name="jobDescription"
                            value={jobDescription}
                            onChange={(e) =>
                                setJobDescription(e.target.value)
                            }
                            maxLength={5000}
                            required
                            placeholder="Paste the full job description here..."
                        />

                        <span className="char-count">
                            {jobDescription.length} / 5000 chars
                        </span>
                    </section>

                    <section className="right">
                        <div className="profile-heading">
                            <span>♙</span>
                            <h2>Your Profile</h2>
                        </div>

                        <div className="input-group">
                            <label>
                                Upload Resume
                                <small>BEST RESULTS</small>
                            </label>

                            <label
                                htmlFor="resume"
                                className={`upload-box ${
                                    resumeFile ? "file-selected" : ""
                                }`}
                            >
                                <input
                                    ref={resumeInputRef}
                                    type="file"
                                    id="resume"
                                    name="resume"
                                    accept=".pdf,application/pdf"
                                    onChange={handleResumeChange}
                                />

                                {resumeFile ? (
                                    <>
                                        <span className="upload-icon">✓</span>
                                        <strong>
                                            Resume uploaded successfully
                                        </strong>
                                        <span>{resumeFile.name}</span>
                                        <span>Click to change resume</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="upload-icon">⇧</span>
                                        <strong>
                                            Click to upload your resume
                                        </strong>
                                        <span>PDF (Max 5MB)</span>
                                    </>
                                )}
                            </label>
                        </div>

                        <div className="or-divider">
                            <span>OR</span>
                        </div>

                        <div className="input-group">
                            <label htmlFor="selfDescription">
                                Quick Self-Description
                            </label>

                            <textarea
                                id="selfDescription"
                                name="selfDescription"
                                className="self-description"
                                value={selfDescription}
                                onChange={(e) =>
                                    setSelfDescription(e.target.value)
                                }
                                placeholder="Briefly describe your experience, key skills, and years of experience..."
                            />
                        </div>

                        <div className="info-box">
                            <span>ⓘ</span>
                            <p>
                                Either a Resume or a Self Description is
                                required to generate a personalized plan.
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="generate-btn"
                            disabled={loading}
                        >
                            <span>★</span>
                            Generate My Interview Strategy
                        </button>
                    </section>

                    <footer className="form-footer">
                        <span>
                            AI-Powered Strategy Generation · Approx 30s
                        </span>
                    </footer>
                </form>
            </div>
        </main>
    );
};

export default Home;
