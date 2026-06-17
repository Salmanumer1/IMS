// frontend/src/pages/WorkspaceDashboard.jsx
import React, { useState } from 'react';
import './WorkspaceDashboard.css';
import {
    LineChart, Line, BarChart, Bar,
    PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Static Mock Data for Layout Tracking
const MOCK_PROJECTS = [
    { id: '1', name: 'ProjectFlow Core', project_key: 'PFC', description: 'Enterprise workspace and workflow planning management tracking dashboard.' },
    { id: '2', name: 'IMS Analytics Hub', project_key: 'IAH', description: 'Data integration pipeline and cross-platform metrics reporting application.' },
    { id: '3', name: 'Marketing Website Redesign', project_key: 'MWR', description: 'Overhauling public-facing landing architecture for premium branding.' }
];

const MOCK_TASKS = [
    { id: '101', title: 'Setup database schema with RLS configurations', status: 'In Progress', priority: 'High', description: 'Secure user onboarding datasets.' },
    { id: '102', title: 'Design component layout architecture', status: 'Done', priority: 'Critical', description: 'Build flexible workspace panels.' },
    { id: '103', title: 'Integrate Recharts component primitives', status: 'To Do', priority: 'Medium', description: 'Configure custom executive themes.' },
    { id: '104', title: 'Verify cross-browser CSS support matrix', status: 'In Review', priority: 'Low', description: 'Test responsive wrapper states.' }
];

const MOCK_SPRINTS = [
    { id: 's1', name: 'Sprint 1 - Foundations', status: 'Active', start_date: 'Jun 01, 2026', end_date: 'Jun 15, 2026', daysLeft: 0, progress: 100 },
    { id: 's2', name: 'Sprint 2 - Visualization Integration', status: 'Active', start_date: 'Jun 16, 2026', end_date: 'Jun 30, 2026', daysLeft: 13, progress: 42 },
    { id: 's3', name: 'Sprint 3 - Polish & Launch', status: 'Planned', start_date: 'Jul 01, 2026', end_date: 'Jul 15, 2026', daysLeft: 28, progress: 0 }
];

const WorkspaceDashboard = () => {
    const [projects] = useState(MOCK_PROJECTS);
    const [tasks] = useState(MOCK_TASKS);
    const [sprints] = useState(MOCK_SPRINTS);
    const [selectedProjectId, setSelectedProjectId] = useState('1');
    const [activeTab, setActiveTab] = useState('overview');
    const [showBannerError, setShowBannerError] = useState(true);

    const taskStats = { total: 4, todo: 1, inProgress: 1, inReview: 1, done: 1 };
    const completionRate = 25;

    // Theme Accent Palettes
    const statusData = [
        { name: 'To Do', value: taskStats.todo, fill: '#EF4444' },
        { name: 'In Progress', value: taskStats.inProgress, fill: '#BF9530' }, 
        { name: 'In Review', value: taskStats.inReview, fill: '#8B5CF6' },
        { name: 'Done', value: taskStats.done, fill: '#2A2620' }  
    ];

    const priorityData = [
        { name: 'Low', value: 1 },
        { name: 'Medium', value: 1 },
        { name: 'High', value: 1 },
        { name: 'Critical', value: 1 }
    ];

    return (
        <div className="dash-root">
            {/* Header Area */}
            <header className="dash-header">
                <div>
                    <h1 className="dash-header-title">📊 Executive Workspace</h1>
                    <p className="dash-header-sub">Monitor your projects, tasks, and sprints in real-time</p>
                </div>

                <div className="dash-header-controls">
                    <select
                        value={selectedProjectId}
                        onChange={(e) => setSelectedProjectId(e.target.value)}
                        className="dash-selector"
                    >
                        {projects.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                    <button className="dash-new-btn">
                        + Add Record
                    </button>
                </div>
            </header>

            {/* Error Banner Container */}
            {showBannerError && (
                <div className="dash-error-banner" onClick={() => setShowBannerError(false)}>
                    <span>⚠️ Review Theme Elements: Click this notice banner to clear or toggle error visibility states.</span>
                    <strong>[Dismiss]</strong>
                </div>
            )}

            {/* Navigation Tab Menu */}
            <div className="dash-tabs-nav">
                {['overview', 'projects', 'tasks', 'sprints'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`dash-tab-item ${activeTab === tab ? 'active' : ''}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Overview Display Grid Layout */}
            {activeTab === 'overview' && (
                <div>
                    {/* KPI Display Panels */}
                    <div className="dash-kpi-grid">
                        {[
                            { label: 'Total Tasks', value: taskStats.total, icon: '📋' },
                            { label: 'Active Progress', value: taskStats.inProgress, icon: '⚙️' },
                            { label: 'Completed Metrics', value: taskStats.done, icon: '✅' },
                            { label: 'Target Completion', value: `${completionRate}%`, icon: '📈' }
                        ].map((card, idx) => (
                            <div key={idx} className="dash-project-card kpi-card-flex">
                                <div>
                                    <p className="kpi-card-label">{card.label}</p>
                                    <h2 className="kpi-card-value">{card.value}</h2>
                                </div>
                                <span className="kpi-card-icon">{card.icon}</span>
                            </div>
                        ))}
                    </div>

                    {/* Chart Visualization Layout */}
                    <div className="dash-charts-grid">
                        <div className="dash-project-card">
                            <h3 className="dash-empty-title">Task Distribution Ratio</h3>
                            <ResponsiveContainer width="100%" height={260}>
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        cx="50%" cy="50%"
                                        innerRadius={60} outerRadius={90}
                                        paddingAngle={4} dataKey="value"
                                    >
                                        {statusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="dash-project-card">
                            <h3 className="dash-empty-title">Priority Densities</h3>
                            <ResponsiveContainer width="100%" height={260}>
                                <BarChart data={priorityData}>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#BF9530" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="dash-project-card chart-full-span">
                            <h3 className="dash-empty-title">Velocity Metric Progression</h3>
                            <ResponsiveContainer width="100%" height={260}>
                                <LineChart data={statusData}>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="value" stroke="#2A2620" strokeWidth={2} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {/* Projects Grid Section */}
            {activeTab === 'projects' && (
                <div className="dash-grid">
                    {projects.map(p => (
                        <div key={p.id} className="dash-project-card">
                            <div className="dash-card-title-row">
                                <span className="dash-card-icon">📁</span>
                                <h3 className="dash-card-title">{p.name}</h3>
                            </div>
                            <p className="dash-card-desc">{p.description}</p>
                            <div className="dash-card-footer">
                                <span className="dash-card-seg-id">SYS · <strong>{p.project_key}</strong></span>
                                <span className="dash-card-arrow">→</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* List-Based Row Content Layer */}
            {activeTab === 'tasks' && (
                <div className="dash-list-wrapper">
                    {tasks.map(t => (
                        <div key={t.id} className="dash-project-card task-item-row">
                            <div className="task-row-left">
                                <span className="task-row-id">#{t.id}</span>
                                <h4 className="dash-card-title">{t.title}</h4>
                            </div>
                            <div className="task-row-right">
                                <span className="badge-pill badge-charcoal">{t.status}</span>
                                <span className="badge-pill badge-gold">{t.priority}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Sprint Status Panel / Empty Fallback Layer */}
            {activeTab === 'sprints' && (
                <div className="dash-list-wrapper">
                    {sprints.length === 0 ? (
                        <div className="dash-empty">
                            <div className="dash-empty-icon">🚀</div>
                            <h3 className="dash-empty-title">No active milestones configured</h3>
                            <p className="dash-empty-sub">Establish structured process durations to visualize sprint trends.</p>
                            <button className="dash-empty-btn">Initialize Sprint Lifecycle</button>
                        </div>
                    ) : (
                        sprints.map(s => (
                            <div key={s.id} className="dash-project-card">
                                <div className="sprint-row-header">
                                    <h3 className="dash-card-title">🚀 {s.name}</h3>
                                    <span className="sprint-badge-status">{s.status}</span>
                                </div>
                                <p className="sprint-date-label">Duration: {s.start_date} - {s.end_date} ({s.daysLeft} days remaining)</p>
                                <div className="sprint-progress-bg">
                                    <div className="sprint-progress-fill" style={{ width: `${s.progress}%` }} />
                                </div>
                                <p className="sprint-percentage-label">{s.progress}% Finished</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default WorkspaceDashboard;