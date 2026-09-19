import { useState } from "react";
import { Sparkles } from "lucide-react";
import { matchJob } from "../services/jobMatchService";

function JobMatch() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setResult(null);

    try {
      const data = await matchJob({
        resumeText,
        jobDescription
      });

      setResult(data);
    } catch (error) {
      console.error("Job matching failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-content">
      <div className="page-heading">
        <div>
          <p className="eyebrow">AI-STYLE CAREER TOOL</p>
          <h2>Job Match</h2>
          <p>
            Compare your resume skills against a job description.
          </p>
        </div>
      </div>

      <form
        className="job-match-grid"
        onSubmit={handleSubmit}
      >
        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">YOUR RESUME</p>
              <h3>Resume Skills</h3>
            </div>
          </div>

          <textarea
            className="large-textarea"
            placeholder="Paste your resume text here..."
            value={resumeText}
            onChange={(event) => setResumeText(event.target.value)}
            required
          />
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">TARGET ROLE</p>
              <h3>Job Description</h3>
            </div>
          </div>

          <textarea
            className="large-textarea"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(event) =>
              setJobDescription(event.target.value)
            }
            required
          />
        </div>

        <button
          className="primary-button job-match-button"
          type="submit"
          disabled={loading}
        >
          <Sparkles size={17} />
          {loading ? "Analyzing..." : "Analyze Match"}
        </button>
      </form>

      {result && (
        <div className="match-result">
          <div className="match-score">
            <span>Match Score</span>
            <strong>{result.matchScore}%</strong>
          </div>

          <div className="match-columns">
            <div>
              <p className="eyebrow">MATCHED SKILLS</p>

              <div className="skill-list">
                {result.matchedSkills.length === 0 ? (
                  <span>No matching skills found.</span>
                ) : (
                  result.matchedSkills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))
                )}
              </div>
            </div>

            <div>
              <p className="eyebrow">MISSING SKILLS</p>

              <div className="skill-list missing">
                {result.missingSkills.length === 0 ? (
                  <span>No missing skills detected.</span>
                ) : (
                  result.missingSkills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="recommendation">
            <strong>Recommendation</strong>
            <p>{result.recommendation}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default JobMatch;