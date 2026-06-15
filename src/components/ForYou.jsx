// frontend/src/pages/ForYou.jsx
import React, { useState } from 'react';
import './ForYou.css';

const DEMO_TASKS = [
    { id: 1, project_name: 'NADRA Digital Portal',     epic_name: 'Authentication Module', title: 'Implement OTP service integration',  description: 'Integrate third-party OTP provider with the citizen login flow and fallback SMS gateway.', status: 'In Progress', priority: 'High'   },
    { id: 2, project_name: 'NADRA Digital Portal',     epic_name: 'Dashboard Reporting',   title: 'Connect dashboard to data layer',    description: 'Wire up the BarChart and KPI summary components to live aggregated query endpoints.',      status: 'Review',      priority: 'Medium' },
    { id: 3, project_name: 'Health Logistics Platform', epic_name: 'Inventory Tracking',   title: 'Build stock alert notifications',    description: 'Trigger real-time alerts when district warehouse stock drops below threshold levels.',       status: 'To Do',       priority: 'High'   },
    { id: 4, project_name: 'NADRA Digital Portal',     epic_name: 'Notification Engine',   title: 'Setup notification microservice',    description: 'Deploy and configure the async notification worker with queue and retry support.',           status: 'To Do',       priority: 'Low'    },
    { id: 5, project_name: 'Health Logistics Platform', epic_name: 'Supply Chain Reports', title: 'Generate weekly supply PDF report',  description: 'Automated weekly PDF generation of procurement and distribution summaries for review.',      status: 'Done',        priority: 'Medium' },
];

const STATUS_META = {
    'To Do':       { color: 'rgba(28,26,20,0.55)',   bg: 'rgba(28,26,20,0.06)'   },
    'In Progress': { color: '#7A5800',               bg: 'rgba(191,149,48,0.12)' },
    'Review':      { color: 'rgba(37,99,160,0.90)',  bg: 'rgba(37,99,160,0.09)'  },
    'Done':        { color: 'rgba(22,120,70,0.90)',  bg: 'rgba(22,120,70,0.09)'  },
};

const PRIORITY_META = {
    'High':   { color: '#C92A2A', bg: 'rgba(201,42,42,0.08)'   },
    'Medium': { color: '#7A5800', bg: 'rgba(191,149,48,0.10)'  },
    'Low':    { color: '#3D6B4F', bg: 'rgba(34,120,80,0.08)'   },
};

const ForYou = () => {
    const [tasks] = useState(DEMO_TASKS);
    const [filter, setFilter] = useState('all');

    const GOLD = '#BF9530';

    const filtered = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);

    const counts = {
        all:           tasks.length,
        'To Do':       tasks.filter(t => t.status === 'To Do').length,
        'In Progress': tasks.filter(t => t.status === 'In Progress').length,
        'Review':      tasks.filter(t => t.status === 'Review').length,
        'Done':        tasks.filter(t => t.status === 'Done').length,
    };

    return (
        <div className="fy-root">

            {/* ── Header ── */}
            <div className="fy-header">
                <div className="fy-header-left">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                        <path d="M15 12a6 6 0 1 1-6-6 4.8 4.8 0 1 0 6 6z" fill={GOLD} />
                        <path d="M14.5 8l1.1.85-.42 1.3 1.05-.85 1.05.85-.42-1.3 1.1-.85h-1.3l-.43-1.3-.43 1.3z" fill={GOLD} />
                    </svg>
                    <div>
                        <h1 className="fy-title">My Assignments</h1>
                        <p className="fy-subtitle">Tasks assigned directly to you within your organizational boundary.</p>
                    </div>
                </div>
                <div className="fy-total-pill">{tasks.length} Total</div>
            </div>

            {/* ── Filter Tabs ── */}
            <div className="fy-filter-bar">
                {['all', 'To Do', 'In Progress', 'Review', 'Done'].map(f => (
                    <button
                        key={f}
                        className={`fy-filter-tab${filter === f ? ' active' : ''}`}
                        onClick={() => setFilter(f)}
                    >
                        {f === 'all' ? 'All' : f}
                        <span className="fy-tab-count">{counts[f]}</span>
                    </button>
                ))}
            </div>

            {/* ── Task Grid ── */}
            <main className="fy-grid">
                {filtered.length === 0 ? (
                    <div className="fy-empty">
                        <span className="fy-empty-icon">📭</span>
                        <h3>No assignments in this category</h3>
                        <p>You have no tasks matching the selected filter.</p>
                    </div>
                ) : (
                    filtered.map(task => {
                        const sm = STATUS_META[task.status]   || STATUS_META['To Do'];
                        const pm = PRIORITY_META[task.priority] || PRIORITY_META['Medium'];
                        return (
                            <div key={task.id} className="fy-card">
                                {/* top accent */}
                                <div className="fy-card-accent" />

                                {/* badge row */}
                                <div className="fy-badge-row">
                                    <span className="fy-project-badge">{task.project_name}</span>
                                    {task.epic_name && (
                                        <span className="fy-epic-badge">{task.epic_name}</span>
                                    )}
                                </div>

                                {/* title + desc */}
                                <h3 className="fy-card-title">{task.title}</h3>
                                <p className="fy-card-desc">{task.description}</p>

                                {/* footer */}
                                <div className="fy-card-footer">
                                    <span
                                        className="fy-status-pill"
                                        style={{ color: sm.color, background: sm.bg }}
                                    >
                                        {task.status}
                                    </span>
                                    <span
                                        className="fy-priority-pill"
                                        style={{ color: pm.color, background: pm.bg }}
                                    >
                                        ↑ {task.priority}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </main>
        </div>
    );
};

export default ForYou;