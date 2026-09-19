import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Plus,
  Trash2,
  Pencil,
  X,
  MapPin,
  CalendarDays,
  Sparkles
} from "lucide-react";

import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication
} from "../services/applicationService";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const emptyForm = {
    company: "",
    role: "",
    status: "Applied",
    location: "",
    applicationDate: ""
  };

  const [form, setForm] = useState(emptyForm);

  const loadApplications = async () => {
    try {
      setError("");
      const data = await getApplications();
      setApplications(data);
    } catch (err) {
      console.error("Failed to load applications:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load applications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
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

  const openEditForm = (application) => {
    setEditingId(application.id);

    setForm({
      company: application.company || "",
      role: application.role || "",
      status: application.status || "Applied",
      location: application.location || "",
      applicationDate: application.applicationDate || ""
    });

    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    if (saving) return;

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

    if (!form.applicationDate) {
      setError("Please select an application date.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        company: form.company.trim(),
        role: form.role.trim(),
        status: form.status,
        location: form.location.trim(),
        applicationDate: form.applicationDate
      };

      if (editingId) {
        await updateApplication(editingId, payload);
      } else {
        await createApplication(payload);
      }

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);

      await loadApplications();
    } catch (err) {
      console.error("Failed to save application:", err);

      setError(
        err.response?.data?.message ||
        "Unable to save application."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteApplication(id);

      setApplications((previous) =>
        previous.filter(
          (application) => application.id !== id
        )
      );
    } catch (err) {
      console.error("Failed to delete application:", err);

      setError(
        err.response?.data?.message ||
        "Unable to delete application."
      );
    }
  };

  const getStatusClass = (status) => {
    return (
      status
        ?.toLowerCase()
        .replace(/\s+/g, "-") || "applied"
    );
  };

  return (
    <section className="page-content applications-page">

      <div className="page-heading">
        <div>
          <p className="eyebrow">CAREER PIPELINE</p>

          <h2>Applications</h2>

          <p>
            Track every internship and job application in one place.
          </p>
        </div>

        <button
          className="primary-button cinematic-button"
          onClick={openCreateForm}
        >
          <Plus size={17} />
          Add Application
        </button>
      </div>

      {error && (
        <div className="auth-error">
          {error}
        </div>
      )}

      {showForm && (
        <div className="form-panel cinematic-form">

          <div className="panel-header">
            <div>
              <p className="eyebrow">
                {editingId
                  ? "UPDATE APPLICATION"
                  : "NEW APPLICATION"}
              </p>

              <h3>
                {editingId
                  ? "Edit Application"
                  : "Add Application"}
              </h3>
            </div>

            <button
              type="button"
              className="icon-button"
              onClick={closeForm}
              disabled={saving}
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <input
                type="text"
                name="company"
                placeholder="Company"
                value={form.company}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="role"
                placeholder="Role"
                value={form.role}
                onChange={handleChange}
                required
              />

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
              />

              <input
                type="date"
                name="applicationDate"
                value={form.applicationDate}
                onChange={handleChange}
                required
              />

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
                    ? "Update Application"
                    : "Save Application"}
              </button>

            </div>

          </form>
        </div>
      )}

      <div className="panel applications-panel">

        <div className="panel-header">

          <div>
            <p className="eyebrow">ALL APPLICATIONS</p>

            <h3>
              {applications.length}{" "}
              {applications.length === 1
                ? "Application"
                : "Applications"}
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

          <div className="empty-state">
            <div className="empty-icon">
              <BriefcaseBusiness size={24} />
            </div>

            <h4>Loading applications</h4>

            <p>
              Fetching your career pipeline...
            </p>
          </div>

        ) : applications.length === 0 ? (

          <div className="empty-state">
            <div className="empty-icon">
              <BriefcaseBusiness size={24} />
            </div>

            <h4>No applications yet</h4>

            <p>
              Add your first internship or job application
              to start tracking your pipeline.
            </p>

            <button
              className="primary-button cinematic-button"
              onClick={openCreateForm}
            >
              <Plus size={17} />
              Add Application
            </button>
          </div>

        ) : (

          <div className="application-list">

            {applications.map((application) => (

              <div
                className="application-row cinematic-application"
                key={application.id}
              >

                <div className="company-logo cinematic-company-logo">
                  {application.company
                    ?.charAt(0)
                    ?.toUpperCase() || "?"}
                </div>

                <div className="application-main">

                  <strong>
                    {application.company}
                  </strong>

                  <span>
                    {application.role}
                  </span>

                </div>

                <div className="application-meta">

                  <span>
                    <MapPin size={14} />
                    {application.location || "Remote"}
                  </span>

                  <span>
                    <CalendarDays size={14} />
                    {application.applicationDate}
                  </span>

                </div>

                <span
                  className={`status-badge cinematic-status ${getStatusClass(
                    application.status
                  )}`}
                >
                  {application.status}
                </span>

                <div className="application-actions cinematic-actions">

                  <button
                    className="icon-button cinematic-edit"
                    onClick={() =>
                      openEditForm(application)
                    }
                    title="Edit application"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className="icon-danger cinematic-delete"
                    onClick={() =>
                      handleDelete(application.id)
                    }
                    title="Delete application"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      <div className="application-footer-card">

        <div className="application-footer-icon">
          <Sparkles size={20} />
        </div>

        <div>
          <strong>Keep your pipeline updated</strong>

          <span>
            Update application statuses after every recruiter response,
            interview or offer.
          </span>
        </div>

      </div>

    </section>
  );
}

export default Applications;