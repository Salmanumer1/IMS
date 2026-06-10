// frontend/src/pages/CreateProject.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateProject.css';

const GOLD = '#BF9530';

const CreateProject = () => {
    const navigate = useNavigate();

    const orgName = localStorage.getItem('active_org_name') || 'Demo Organization';

    const [formData, setFormData] = useState({
        name:        '',
        description: '',
        project_key: '',
    });
    const [error,   setError]   = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // Simulate network lag
            await new Promise((resolve) => setTimeout(resolve, 1200));

            // Demo Rule: "FAIL" key triggers error
            if (formData.project_key.toUpperCase() === 'FAIL') {
                throw new Error('Project key already exists in this workspace.');
            }

            setSuccess(
                `Project "${formData.name}" initialized with Key: [${formData.project_key.toUpperCase()}]`
            );
            setFormData({ name: '', description: '', project_key: '' });
        } catch (err) {
            setError(err.message || 'Failed to initialize project.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cp-root">
            <div className="cp-card">

                <div className="cp-top-accent" />

                {/* Heading */}
                <div className="cp-heading-block">
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
                        <path d="M15 12a6 6 0 1 1-6-6 4.8 4.8 0 1 0 6 6z" fill={GOLD} />
                        <path d="M14.5 8l1.1.85-.42 1.3 1.05-.85 1.05.85-.42-1.3 1.1-.85h-1.3l-.43-1.3-.43 1.3z" fill={GOLD} />
                    </svg>
                    <h2 className="cp-title">Launch New Project</h2>
                    <p className="cp-subtitle">
                        Initialize an isolated project workspace and assign a unique task prefix key.
                    </p>
                </div>

                {/* Form Panel */}
                <div className="cp-form-panel">
                    <div className="cp-panel-strip">
                        <span className="cp-panel-strip-label">— Configure Project Block —</span>
                    </div>

                    <form onSubmit={handleSubmit} className="cp-form">
                        {error && (
                            <div className="cp-msg-error">
                                <span>⚠</span><span>{error}</span>
                            </div>
                        )}
                        {success && (
                            <div className="cp-msg-success">
                                <span>✓</span><span>{success}</span>
                            </div>
                        )}

                        <label className="cp-label">Associated Workspace</label>
                        <input
                            type="text"
                            value={orgName}
                            readOnly
                            className="cp-input"
                        />
                        <p className="cp-input-hint">Bound to your active organization session.</p>

                        <label className="cp-label">
                            Project Name <span>*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="e.g., Mobile App Tracker"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="cp-input"
                        />
                        <p className="cp-input-hint">Display name for this project cluster.</p>

                        <label className="cp-label">
                            Project Key <span>*</span>
                        </label>
                        <input
                            type="text"
                            name="project_key"
                            placeholder='e.g., MAT, ECOMM  (use "FAIL" to test error)'
                            value={formData.project_key}
                            onChange={handleChange}
                            required
                            maxLength={10}
                            className="cp-input"
                        />
                        <p className="cp-input-hint">2–10 characters. Used as the prefix for all task IDs in this project.</p>

                        <label className="cp-label">Description</label>
                        <textarea
                            name="description"
                            placeholder="High-level context and scope for this sprint target..."
                            value={formData.description}
                            onChange={handleChange}
                            className="cp-textarea"
                        />
                        <p className="cp-input-hint">Optional. Visible to all members of this workspace.</p>

                        <button
                            type="submit"
                            disabled={loading}
                            className="cp-submit-btn"
                        >
                            {loading ? (
                                <span className="cp-loading-flex">
                                    <span className="cp-spinner" />
                                    Initializing Project Block...
                                </span>
                            ) : 'Launch Project'}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default CreateProject;