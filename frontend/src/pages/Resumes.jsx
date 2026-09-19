import { useEffect, useState } from "react";
import {
  FileText,
  Plus,
  Trash2,
  Pencil,
  X,
  ExternalLink
} from "lucide-react";

import {
  getResumes,
  createResume,
  updateResume,
  deleteResume
} from "../services/resumeService";

function Resumes() {
  const emptyForm = {
    title: "",
    fileName: "",
    fileUrl: ""
  };

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState(emptyForm);

  const loadResumes = async () => {
    try {
      setError("");

      const data = await getResumes();

      setResumes(data);
    } catch (err) {
      console.error("Failed to load resumes:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load resumes."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResumes();
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

  const openEditForm = (resume) => {
    setEditingId(resume.id);

    setForm({
      title: resume.title || "",
      fileName: resume.fileName || "",
      fileUrl: resume.fileUrl || ""
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

    if (!form.title.trim()) {
      setError("Resume title is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        title: form.title.trim(),
        fileName: form.fileName.trim(),
        fileUrl: form.fileUrl.trim()
      };

      if (editingId) {
        await updateResume(editingId, payload);
      } else {
        await createResume(payload);
      }

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);

      await loadResumes();
    } catch (err) {
      console.error("Failed to save resume:", err);

      setError(
        err.response?.data?.message ||
        "Unable to save resume."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteResume(id);

      setResumes((previous) =>
        previous.filter((resume) => resume.id !== id)
      );
    } catch (err) {
      console.error("Failed to delete resume:", err);

      setError(
        err.response?.data?.message ||
        "Unable to delete resume."
      );
    }
  };

  return (
    <section className="page-content">

      <div className="page-heading">

        <div>
          <p className="eyebrow">RESUME MANAGEMENT</p>

          <h2>Resumes</h2>

          <p>
            Keep different resume versions ready for different roles.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={openCreateForm}
        >
          <Plus size={17} />
          Add Resume
        </button>

      </div>

      {error && (
        <div className="auth-error">
          {error}
        </div>
      )}

      {showForm && (
        <form
          className="form-panel"
          onSubmit={handleSubmit}
        >

          <div className="panel-header">

            <div>
              <p className="eyebrow">
                {editingId
                  ? "UPDATE RESUME"
                  : "NEW RESUME"}
              </p>

              <h3>
                {editingId
                  ? "Edit Resume"
                  : "Add Resume"}
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

          <div className="form-grid">

            <input
              name="title"
              placeholder="Resume title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <input
              name="fileName"
              placeholder="File name"
              value={form.fileName}
              onChange={handleChange}
            />

            <input
              name="fileUrl"
              placeholder="Resume URL"
              value={form.fileUrl}
              onChange={handleChange}
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
              className="primary-button"
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Resume"
                  : "Save Resume"}
            </button>

          </div>

        </form>
      )}

      <div className="panel">

        <div className="panel-header">

          <div>
            <p className="eyebrow">YOUR RESUMES</p>

            <h3>
              {resumes.length}{" "}
              {resumes.length === 1
                ? "Resume Version"
                : "Resume Versions"}
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
            Loading resumes...
          </div>

        ) : resumes.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              <FileText size={24} />
            </div>

            <h4>No resumes yet</h4>

            <p>
              Add a resume version for your internship applications.
            </p>

            <button
              className="primary-button"
              onClick={openCreateForm}
            >
              <Plus size={17} />
              Add Resume
            </button>

          </div>

        ) : (

          <div className="application-list">

            {resumes.map((resume) => (

              <div
                className="application-row"
                key={resume.id}
              >

                <div className="company-logo">
                  <FileText size={19} />
                </div>

                <div className="application-main">

                  <strong>
                    {resume.title}
                  </strong>

                  <span>
                    {resume.fileName || "Resume file"}
                  </span>

                </div>

                <div className="application-meta">

                  {resume.fileUrl ? (
                    <a
                      href={resume.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink size={14} />
                      Open resume
                    </a>
                  ) : (
                    <span>
                      No resume URL
                    </span>
                  )}

                </div>

                <div className="application-actions">

                  <button
                    className="icon-button"
                    onClick={() =>
                      openEditForm(resume)
                    }
                    title="Edit resume"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className="icon-danger"
                    onClick={() =>
                      handleDelete(resume.id)
                    }
                    title="Delete resume"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}

export default Resumes;