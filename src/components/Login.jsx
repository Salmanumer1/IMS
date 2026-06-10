// frontend/src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bgAsset from './bg.jpg';
import './Login.css';

const GOLD = '#BF9530';

const Login = () => {
    const [email, setEmail]               = useState('');
    const [password, setPassword]         = useState('');
    const [error, setError]               = useState('');
    const [loading, setLoading]           = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passFocused, setPassFocused]   = useState(false);
    const [avatarHovered, setAvatarHovered] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Simulate network lag
            await new Promise((resolve) => setTimeout(resolve, 1200));

            // Demo Rule: trigger error state with wrong@test.com
            if (email === 'wrong@test.com') {
                throw new Error('Authentication failed. Invalid credentials.');
            }

            // Store a fake session token and navigate
            localStorage.setItem('token', 'demo-token-xyz');
            localStorage.setItem('user', JSON.stringify({ name: 'Demo User', email }));
            navigate('/workspace');
        } catch (err) {
            setError(err.message || 'Authentication failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            {/* ══ HEADER ══ */}
            <header className="login-header">
                <div className="login-header-left">
                    <div className="login-header-emblem">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                            <path d="M15 12a6 6 0 1 1-6-6 4.8 4.8 0 1 0 6 6z" fill={GOLD} />
                            <path d="M14.5 8l1.1.85-.42 1.3 1.05-.85 1.05.85-.42-1.3 1.1-.85h-1.3l-.43-1.3-.43 1.3z" fill={GOLD} />
                        </svg>
                    </div>
                    <div>
                        <div className="login-header-brand">IMS</div>
                        <div className="login-header-sysid">
                            GOV-SYS · ID&nbsp;
                            <span className="login-id-badge">PKG-2026-001</span>
                        </div>
                    </div>
                </div>

                <div className="login-header-rule" />

                <div
                    className="login-header-right"
                    style={{ fontSize: '12px', color: 'rgba(28,26,20,0.38)', letterSpacing: '0.4px' }}
                >
                    SECURE PORTAL ACCESS
                </div>
            </header>

            <div className="login-header-stripe" />

            {/* ══ MAIN ══ */}
            <main className="login-main">
                <div className="login-card">

                    {/* Top accent */}
                    <div className="login-top-accent" />

                    {/* Heading */}
                    <div className="login-heading-block">
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
                            <path d="M15 12a6 6 0 1 1-6-6 4.8 4.8 0 1 0 6 6z" fill={GOLD} />
                            <path d="M14.5 8l1.1.85-.42 1.3 1.05-.85 1.05.85-.42-1.3 1.1-.85h-1.3l-.43-1.3-.43 1.3z" fill={GOLD} />
                        </svg>
                        <h2 className="login-title">Interlink Management System</h2>
                        <p className="login-subtitle">
                            Authenticate with your registered credentials to access your assigned workspace.
                        </p>
                    </div>

                    {/* Form Panel */}
                    <div className="login-form-panel">
                        <div className="login-panel-strip">
                            <span className="login-panel-strip-label">— Secure Workspace Sign-In —</span>
                        </div>

                        <form onSubmit={handleLogin} className="login-form">
                            {error && (
                                <div className="login-msg-error">
                                    <span>⚠</span><span>{error}</span>
                                </div>
                            )}

                            <label className="login-label">
                                Corporate Email <span>*</span>
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(false)}
                                required
                                placeholder="e.g., zain@enterprise.com"
                                className="login-input"
                                style={{ marginBottom: 0 }}
                            />
                            <p className="login-input-hint">Use "wrong@test.com" to test the error state.</p>

                            <label className="login-label">
                                Password <span>*</span>
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setPassFocused(true)}
                                onBlur={() => setPassFocused(false)}
                                required
                                placeholder="••••••••"
                                className="login-input"
                                style={{ marginBottom: 0 }}
                            />
                            <p className="login-input-hint">Enter your account password to continue.</p>

                            <button
                                type="submit"
                                disabled={loading}
                                className="login-submit-btn"
                            >
                                {loading ? (
                                    <span className="login-loading-flex">
                                        <span className="login-spinner" />
                                        Verifying Credentials...
                                    </span>
                                ) : 'Access Workspace'}
                            </button>

                            <p className="login-footer-link">
                                New to the portal?&nbsp;
                                <Link to="/">Register an Organization</Link>
                            </p>
                        </form>
                    </div>

                </div>
            </main>

            {/* ══ FOOTER ══ */}
            <footer className="login-page-footer">
                <span style={{ width: '140px' }} />
                <p className="login-footer-copy">
                    &copy; 2026 Government of Pakistan &mdash; All Rights Reserved
                    &nbsp;&bull;&nbsp; ProjectFlow Enterprise Portal
                </p>
                <span className="login-footer-badge">OFFICIAL USE ONLY</span>
            </footer>

        </div>
    );
};

export default Login;