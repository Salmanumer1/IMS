// frontend/src/pages/Register.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Register.css';

const GOLD = '#BF9530';

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const urlOrgId = queryParams.get('orgId');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Team Lead',
        organization_id: urlOrgId || ''
    });
    const [error, setError]     = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!urlOrgId) {
            navigate('/');
        }
    }, [urlOrgId, navigate]);

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

            // Demo Rule: "fail@test.com" triggers error state
            if (formData.email === 'fail@test.com') {
                throw new Error('User profile registration failed. Email already in use.');
            }

            setSuccess('Master Profile Created Successfully! Redirecting to login portal...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.message || 'User profile registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reg-page">

            {/* ══ HEADER ══ */}
            <header className="reg-header">
                <div className="reg-header-left">
                    <div className="reg-header-emblem">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                            <path d="M15 12a6 6 0 1 1-6-6 4.8 4.8 0 1 0 6 6z" fill={GOLD} />
                            <path d="M14.5 8l1.1.85-.42 1.3 1.05-.85 1.05.85-.42-1.3 1.1-.85h-1.3l-.43-1.3-.43 1.3z" fill={GOLD} />
                        </svg>
                    </div>
                    <div>
                        <div className="reg-header-brand">IMS</div>
                        <div className="reg-header-sysid">
                            GOV-SYS · ID&nbsp;
                            <span className="reg-id-badge">PKG-2026-001</span>
                        </div>
                    </div>
                </div>

                <div className="reg-header-rule" />

                <div className="reg-header-right">
                    NEW ACCOUNT REGISTRATION
                </div>
            </header>

            <div className="reg-header-stripe" />

            {/* ══ MAIN ══ */}
            <main className="reg-main">
                <div className="reg-card">

                    <div className="reg-top-accent" />

                    {/* Heading */}
                    <div className="reg-heading-block">
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
                            <path d="M15 12a6 6 0 1 1-6-6 4.8 4.8 0 1 0 6 6z" fill={GOLD} />
                            <path d="M14.5 8l1.1.85-.42 1.3 1.05-.85 1.05.85-.42-1.3 1.1-.85h-1.3l-.43-1.3-.43 1.3z" fill={GOLD} />
                        </svg>
                        <h2 className="reg-title">Register Admin Account</h2>
                        <div className="reg-org-id-pill">
                            ⬡ &nbsp;Workspace Container ID: {urlOrgId}
                        </div>
                    </div>

                    {/* Form Panel */}
                    <div className="reg-form-panel">
                        <div className="reg-panel-strip">
                            <span className="reg-panel-strip-label">— Create Master Profile —</span>
                        </div>

                        <form onSubmit={handleSubmit} className="reg-form">
                            {error && (
                                <div className="reg-msg-error">
                                    <span>⚠</span><span>{error}</span>
                                </div>
                            )}
                            {success && (
                                <div className="reg-msg-success">
                                    <span>✓</span><span>{success}</span>
                                </div>
                            )}

                            <label className="reg-label">
                                Full Name <span>*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                onChange={handleChange}
                                placeholder="e.g., Zain Ahmed"
                                className="reg-input"
                            />
                            <p className="reg-input-hint">Your display name within the workspace.</p>

                            <label className="reg-label">
                                Corporate Email <span>*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                onChange={handleChange}
                                placeholder="e.g., lead@company.com"
                                className="reg-input"
                            />
                            <p className="reg-input-hint">Use "fail@test.com" to test the error state.</p>

                            <label className="reg-label">
                                Account Password <span>*</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                required
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="reg-input"
                            />
                            <p className="reg-input-hint">Minimum 8 characters recommended.</p>

                            <label className="reg-label">
                                System Access Role <span>*</span>
                            </label>
                            <select
                                name="role"
                                onChange={handleChange}
                                value={formData.role}
                                className="reg-select"
                            >
                                <option value="Team Lead">Team Lead</option>
                                <option value="Admin">Admin</option>
                            </select>
                            <p className="reg-input-hint">Determines permission level within the workspace.</p>

                            <button
                                type="submit"
                                disabled={loading}
                                className="reg-submit-btn"
                            >
                                {loading ? (
                                    <span className="reg-loading-flex">
                                        <span className="reg-spinner" />
                                        Binding Profile to Workspace...
                                    </span>
                                ) : 'Register Profile & Bind to Org'}
                            </button>

                            <p className="reg-footer-link">
                                Already have an account?&nbsp;
                                <Link to="/login">Sign In</Link>
                            </p>
                        </form>
                    </div>

                </div>
            </main>

            {/* ══ FOOTER ══ */}
            <footer className="reg-page-footer">
                <span style={{ width: '140px' }} />
                <p className="reg-footer-copy">
                    &copy; 2026 Government of Pakistan &mdash; All Rights Reserved
                    &nbsp;&bull;&nbsp; ProjectFlow Enterprise Portal
                </p>
                <span className="reg-footer-badge">OFFICIAL USE ONLY</span>
            </footer>

        </div>
    );
};

export default Register;