// frontend/src/pages/WorkspaceDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkspaceDashboard.css';

// ── Demo project data (replaces API call) ──
const DEMO_PROJECTS = [
    { id: 1, name: 'NADRA Digital Portal',       description: 'Nationwide identity verification system modernization for citizen-facing services.' },
    { id: 2, name: 'Health Logistics Platform',   description: 'Supply chain tracking and distribution management for national medical inventory.' },
    { id: 3, name: 'Revenue Automation Suite',    description: 'Automated tax compliance and reporting pipeline for provincial revenue authorities.' },
    { id: 4, name: 'E-Governance Framework',      description: 'Unified API gateway connecting inter-ministerial data nodes and service endpoints.' },
];

const WorkspaceDashboard = () => {
    const navigate = useNavigate();
    const [projects] = useState(DEMO_PROJECTS);

    return (
        <div className="dash-root">

            {/* ── Header ── */}
            <div className="dash-header">
                <div>
                    <h1 className="dash-header-title">Operational Workspace</h1>
                    <p className="dash-header-sub">
                        Active project clusters for this organization partition.
                    </p>
                </div>
                <button
                    className="dash-new-btn"
                    onClick={() => navigate('/create-project')}
                >
                    + New Project
                </button>
            </div>

            {/* ── Project Grid ── */}
            {projects.length === 0 ? (
                <div className="dash-empty">
                    <div className="dash-empty-icon">📂</div>
                    <h3 className="dash-empty-title">No projects initialized yet</h3>
                    <p className="dash-empty-sub">
                        This organization partition does not contain any active project records.
                    </p>
                    <button
                        className="dash-empty-btn"
                        onClick={() => navigate('/create-project')}
                    >
                        Initialize First Project
                    </button>
                </div>
            ) : (
                <div className="dash-grid">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="dash-project-card"
                            onClick={() => navigate(`/kanban?projectId=${project.id}`)}
                        >
                            <div className="dash-card-title-row">
                                <span className="dash-card-icon">📁</span>
                                <h3 className="dash-card-title">{project.name}</h3>
                            </div>
                            <p className="dash-card-desc">
                                {project.description || 'No description attached to this segment node.'}
                            </p>
                            <div className="dash-card-footer">
                                <span className="dash-card-seg-id">
                                    SEG-ID: <strong>PROJ-{String(project.id).padStart(3, '0')}</strong>
                                </span>
                                <span className="dash-card-arrow">→</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WorkspaceDashboard;