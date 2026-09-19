import { useEffect, useState } from "react";
import {
  CalendarDays,
  Plus,
  Trash2,
  Pencil,
  X,
  Clock3,
  MapPin,
  UserRound,
  Video,
  Sparkles
} from "lucide-react";

import {
  getInterviews,
  createInterview,
  updateInterview,
  deleteInterview
} from "../services/interviewService";

function Interviews() {
  const emptyForm = {
    applicationId: "",
    company: "",
    role: "",
    interviewDate: "",
    interviewTime: "",
    interviewType: "Technical",
    interviewer: "",
    location: "Online",
    notes: "",
    status: "Scheduled"
  };

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState(emptyForm);

  const loadInterviews = async () => {
    try {
      setError("");

      const data = await getInterviews();

      setInterviews(data);
    } catch (err) {
      console.error("Failed to load interviews:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load interviews."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInterviews();
  }, []);

  const handleChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value
    }));
  };

  const openCreateForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  };

  const openEditForm = (interview) => {
    setEditingId(interview.id);

    setForm({
      applicationId: interview.applicationId ?? "",
      company: interview.company || "",
      role: interview.role || "",
      interviewDate: interview.interviewDate || "",
      interviewTime: interview.interviewTime || "",
      interviewType: interview.interviewType || "Technical",
      interviewer: interview.interviewer || "",
      location: interview.location || "Online",
      notes: interview.notes || "",
      status: interview.status || "Scheduled"
    });

    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    if (saving) {
      return;
    }

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.company.trim() || !form.role.trim()) {
      setError("Company and role are required.");
      return;
    }

    if (!form.interviewDate || !form.interviewTime) {
      setError("Interview date and time are required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...form,
        applicationId: form.applicationId
          ? Number(form.applicationId)
          : null,
        company: form.company.trim(),
        role: form.role.trim(),
        interviewer: form.interviewer.trim(),
        location: form.location.trim(),
        notes: form.notes.trim()
      };

      if (editingId) {
        await updateInterview(editingId, payload);
      } else {
        await createInterview(payload);
      }

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);

      await loadInterviews();
    } catch (err) {
      console.error("Failed to save interview:", err);

      setError(
        err.response?.data?.message ||
        "Unable to save interview."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this interview?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteInterview(id);

      setInterviews((previous) =>
        previous.filter(
          (interview) => interview.id !== id
        )
      );
    } catch (err) {
      console.error("Failed to delete interview:", err);

      setError(
        err.response?.data?.message ||
        "Unable to delete interview."
      );
    }
  };

  const getStatusClass = (status) => {
    return (
      status
        ?.toLowerCase()
        .replace(/\s+/g, "-") || "scheduled"
    );
  };

  const getInterviewTypeClass = (type) => {
    return (
      type
        ?.toLowerCase()
        .replace(/\s+/g, "-") || "technical"
    );
  };

  return (
    <section className="page-content interviews-page">

      <div className="page-heading cinematic-page-heading">

        <div>
          <p className="eyebrow">INTERVIEW MANAGEMENT</p>

          <h2>Interviews</h2>

          <p>
            Keep every technical, HR and final-round interview
            organized in one command center.
          </p>
        </div>

        <button
          className="primary-button cinematic-button"
          onClick={openCreateForm}
        >
          <Plus size={17} />
          Add Interview
        </button>

      </div>

      {error && (
        <div className="auth-error cinematic-error">
          {error}
        </div>
      )}

      {showForm && (
        <div className="form-panel cinematic-form">

          <div className="panel-header">

            <div>
              <p className="eyebrow">
                {editingId
                  ? "UPDATE INTERVIEW"
                  : "NEW INTERVIEW"}
              </p>

              <h3>
                {editingId
                  ? "Edit Interview"
                  : "Schedule Interview"}
              </h3>
            </div>

            <button
              type="button"
              className="icon-button cinematic-close"
              onClick={closeForm}
              disabled={saving}
              title="Close"
            >
              <X size={18} />
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-grid cinematic-interview-form">

              <div className="cinematic-field">
                <label>Application ID</label>

                <input
                  name="applicationId"
                  type="number"
                  placeholder="Optional"
                  value={form.applicationId}
                  onChange={handleChange}
                />
              </div>

              <div className="cinematic-field">
                <label>Company</label>

                <input
                  name="company"
                  placeholder="e.g. Google"
                  value={form.company}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="cinematic-field">
                <label>Role</label>

                <input
                  name="role"
                  placeholder="e.g. Software Engineer Intern"
                  value={form.role}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="cinematic-field">
                <label>Interview date</label>

                <input
                  name="interviewDate"
                  type="date"
                  value={form.interviewDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="cinematic-field">
                <label>Interview time</label>

                <input
                  name="interviewTime"
                  type="time"
                  value={form.interviewTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="cinematic-field">
                <label>Interview type</label>

                <select
                  name="interviewType"
                  value={form.interviewType}
                  onChange={handleChange}
                >
                  <option>Technical</option>
                  <option>HR</option>
                  <option>Managerial</option>
                  <option>Final</option>
                </select>
              </div>

              <div className="cinematic-field">
                <label>Interviewer</label>

                <input
                  name="interviewer"
                  placeholder="Interviewer name"
                  value={form.interviewer}
                  onChange={handleChange}
                />
              </div>

              <div className="cinematic-field">
                <label>Location</label>

                <input
                  name="location"
                  placeholder="Online / Hyderabad"
                  value={form.location}
                  onChange={handleChange}
                />
              </div>

              <div className="cinematic-field cinematic-field-wide">
                <label>Notes</label>

                <textarea
                  name="notes"
                  placeholder="Preparation notes, topics, links, reminders..."
                  value={form.notes}
                  onChange={handleChange}
                />
              </div>

              <div className="cinematic-field">
                <label>Status</label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option>Scheduled</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>

            </div>

            <div className="form-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={closeForm}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                className="primary-button cinematic-button"
                type="submit"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Interview"
                    : "Schedule Interview"}
              </button>

            </div>

          </form>

        </div>
      )}

      <div className="panel interviews-panel">

        <div className="panel-header">

          <div>
            <p className="eyebrow">YOUR SCHEDULE</p>

            <h3>
              {interviews.length}{" "}
              {interviews.length === 1
                ? "Interview"
                : "Interviews"}
            </h3>
          </div>

          {!showForm && (
            <button
              className="panel-action"
              onClick={openCreateForm}
            >
              <Plus size={15} />
              Add new
            </button>
          )}

        </div>

        {loading ? (

          <div className="empty-state cinematic-empty">

            <div className="empty-icon cinematic-empty-icon">
              <CalendarDays size={24} />
            </div>

            <h4>Loading interviews</h4>

            <p>
              Preparing your interview schedule...
            </p>

          </div>

        ) : interviews.length === 0 ? (

          <div className="empty-state cinematic-empty">

            <div className="empty-icon cinematic-empty-icon">
              <CalendarDays size={24} />
            </div>

            <h4>No interviews scheduled</h4>

            <p>
              Add your first interview to start managing
              your preparation schedule.
            </p>

            <button
              className="primary-button cinematic-button"
              onClick={openCreateForm}
            >
              <Plus size={17} />
              Schedule Interview
            </button>

          </div>

        ) : (

          <div className="application-list interview-list">

            {interviews.map((interview) => (

              <div
                className="application-row cinematic-interview"
                key={interview.id}
              >

                <div className="company-logo cinematic-company-logo">
                  {interview.company
                    ?.charAt(0)
                    ?.toUpperCase() || "?"}
                </div>

                <div className="application-main">

                  <strong>
                    {interview.company}
                  </strong>

                  <span>
                    {interview.role}
                  </span>

                </div>

                <div className="application-meta cinematic-interview-meta">

                  <span>
                    <CalendarDays size={14} />
                    {interview.interviewDate}
                  </span>

                  <span>
                    <Clock3 size={14} />
                    {interview.interviewTime}
                  </span>

                  {interview.location && (
                    <span>
                      <MapPin size={14} />
                      {interview.location}
                    </span>
                  )}

                </div>

                <div className="interview-type-wrap">

                  <span
                    className={`status-badge cinematic-interview-type ${getInterviewTypeClass(
                      interview.interviewType
                    )}`}
                  >
                    {interview.interviewType}
                  </span>

                  <span
                    className={`cinematic-interview-status ${getStatusClass(
                      interview.status
                    )}`}
                  >
                    {interview.status}
                  </span>

                </div>

                <div className="cinematic-interview-actions">

                  <button
                    className="icon-button cinematic-edit"
                    onClick={() =>
                      openEditForm(interview)
                    }
                    title="Edit interview"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className="icon-danger cinematic-delete"
                    onClick={() =>
                      handleDelete(interview.id)
                    }
                    title="Delete interview"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      <div className="interview-footer-card">

        <div className="interview-footer-icon">
          <Sparkles size={20} />
        </div>

        <div>

          <strong>
            Prepare before every conversation
          </strong>

          <span>
            Keep your interview notes, topics and recruiter
            details updated so you're ready when the call starts.
          </span>

        </div>

      </div>

    </section>
  );
}

export default Interviews;