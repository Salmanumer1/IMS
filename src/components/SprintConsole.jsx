// frontend/src/pages/SprintConsole.jsx
import React, { useState } from 'react';
import './SprintConsole.css';

const GOLD = '#BF9530';

// ── Demo Data ──
const DEMO_PROJECTS = [
    { id: 1, name: 'NADRA Digital Portal',      project_key: 'NDP' },
    { id: 2, name: 'Health Logistics Platform',  project_key: 'HLP' },
];

const DEMO_SPRINTS = [
    { id: 1, name: 'Sprint 1 — Auth Core',         project_id: 1, project_name: 'NADRA Digital Portal',     start_date: '2026-05-01', end_date: '2026-05-14', status: 'Active'    },
    { id: 2, name: 'Sprint 2 — Dashboard Phase',    project_id: 1, project_name: 'NADRA Digital Portal',     start_date: '2026-05-15', end_date: '2026-05-28', status: 'Active'    },
    { id: 3, name: 'Sprint 1 — Inventory Baseline', project_id: 2, project_name: 'Health Logistics Platform', start_date: '2026-04-01', end_date: '2026-04-14', status: 'Completed' },
];

const DEMO_BACKLOG = [
    { id: 10, title: 'Setup CI/CD pipeline',             project_name: 'NADRA Digital Portal'     },
    { id: 11, title: 'Write integration test suite',     project_name: 'NADRA Digital Portal'     },
    { id: 12, title: 'Configure SMTP email gateway',     project_name: 'Health Logistics Platform' },
    { id: 13, title: 'Design mobile-responsive layouts', project_name: 'NADRA Digital Portal'     },
    { id: 14, title: 'Audit access control policies',    project_name: 'Health Logistics Platform' },
];

const DEMO_SUMMARY = {
    totalCount:     5,
    completeCount:  3,
    remainingCount: 2,
    completedTasks: [
        { id: 1, title: 'Design login UI mockups',          assignee_name: 'Salman Umer'  },
        { id: 2, title: 'Implement OTP service integration', assignee_name: 'Zain Ahmed'   },
        { id: 8, title: 'Define inventory data schema',      assignee_name: 'Ayesha Malik' },
    ],
    remainingTasks: [
        { id: 3, title: 'Write auth unit tests',          status: 'To Do',       assignee_name: 'Zain Ahmed'   },
        { id: 4, title: 'Build BarChart component',       status: 'In Progress', assignee_name: ''             },
    ],
};

let nextSprintId = 10;

const SprintConsole = () => {
    const [projects]                              = useState(DEMO_PROJECTS);
    const [allSprints, setAllSprints]             = useState(DEMO_SPRINTS);
    const [backlogTasks]                          = useState(DEMO_BACKLOG);
    const [selectedProjectId, setSelectedProjectId] = useState(1);
    const [sprintName, setSprintName]             = useState('');
    const [startDate, setStartDate]               = useState('');
    const [endDate, setEndDate]                   = useState('');
    const [selectedTaskIds, setSelectedTaskIds]   = useState([]);
    const [activeSummarySprintId, setActiveSummarySprintId] = useState(null);
    const [closureSummary, setClosureSummary]     = useState(null);

    const handleCheckboxToggle = (taskId) =>
        setSelectedTaskIds(prev =>
            prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
        );

    const handleProvisionSprint = (e) => {
        e.preventDefault();
        const proj = projects.find(p => p.id === Number(selectedProjectId));
        setAllSprints(prev => [...prev, {
            id:           nextSprintId++,
            name:         sprintName,
            project_id:   Number(selectedProjectId),
            project_name: proj?.name || '',
            start_date:   startDate,
            end_date:     endDate,
            status:       'Active',
        }]);
        setSprintName('');
        setStartDate('');
        setEndDate('');
        setSelectedTaskIds([]);
    };

    const handleInspectClosure = (sprintId) => {
        setActiveSummarySprintId(sprintId);
        setClosureSummary(DEMO_SUMMARY);
    };

    const handleExecuteFinalization = () => {
        if (!window.confirm('Officially close this sprint? Incomplete items will drop to backlog.')) return;
        setAllSprints(prev =>
            prev.map(s => s.id === activeSummarySprintId ? { ...s, status: 'Completed' } : s)
        );
        setActiveSummarySprintId(null);
        setClosureSummary(null);
    };

    const activeSprints    = allSprints.filter(s => s.status !== 'Completed');
    const completedSprints = allSprints.filter(s => s.status === 'Completed');

    return (
        <div className="sc-root">

            {/* ── Header ── */}
            <div className="sc-header">
                <div className="sc-header-left">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                        <path d="M15 12a6 6 0 1 1-6-6 4.8 4.8 0 1 0 6 6z" fill={GOLD} />
                        <path d="M14.5 8l1.1.85-.42 1.3 1.05-.85 1.05.85-.42-1.3 1.1-.85h-1.3l-.43-1.3-.43 1.3z" fill={GOLD} />
                    </svg>
                    <div>
                        <h1 className="sc-title">Sprint Console</h1>
                        <p className="sc-subtitle">Manage iterative sprint milestones, bind task subsets and analyze sprint velocity.</p>
                    </div>
                </div>
                <div className="sc-header-pills">
                    <span className="sc-stat-pill sc-pill-active">{activeSprints.length} Active</span>
                    <span className="sc-stat-pill sc-pill-done">{completedSprints.length} Completed</span>
                </div>
            </div>

            {/* ── Two-column grid ── */}
            <div className="sc-grid">

                {/* ── LEFT: Sprint Creation ── */}
                <section className="sc-card">
                    <div className="sc-card-strip">
                        <span className="sc-card-strip-label">— Initialize Sprint Timeframe —</span>
                    </div>
                    <div className="sc-card-body">
                        <form onSubmit={handleProvisionSprint} className="sc-form">

                            <label className="sc-label">Target Project <span>*</span></label>
                            <select
                                className="sc-input"
                                value={selectedProjectId}
                                onChange={(e) => setSelectedProjectId(e.target.value)}
                                required
                            >
                                {projects.map(p => (
                                    <option key={p.id} value={p.id}>{p.name} ({p.project_key})</option>
                                ))}
                            </select>
                            <p className="sc-hint">Bind this sprint to an active project workspace.</p>

                            <label className="sc-label">Sprint Name <span>*</span></label>
                            <input
                                type="text"
                                className="sc-input"
                                placeholder="e.g., Core API Framework — Sprint 1"
                                value={sprintName}
                                onChange={(e) => setSprintName(e.target.value)}
                                required
                            />
                            <p className="sc-hint">A descriptive iteration label for this sprint cycle.</p>

                            <div className="sc-date-row">
                                <div className="sc-date-col">
                                    <label className="sc-label">Start Date <span>*</span></label>
                                    <input type="date" className="sc-input" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                                </div>
                                <div className="sc-date-col">
                                    <label className="sc-label">End Date <span>*</span></label>
                                    <input type="date" className="sc-input" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                                </div>
                            </div>

                            {/* Backlog pool */}
                            <label className="sc-label" style={{ marginTop: '4px' }}>
                                Backlog Tasks
                                <span className="sc-selected-count">{selectedTaskIds.length} selected</span>
                            </label>
                            <div className="sc-backlog-zone">
                                {backlogTasks.length === 0 ? (
                                    <p className="sc-backlog-empty">All tasks are mapped to active sprints.</p>
                                ) : (
                                    backlogTasks.map(task => (
                                        <div
                                            key={task.id}
                                            className={`sc-backlog-row${selectedTaskIds.includes(task.id) ? ' selected' : ''}`}
                                            onClick={() => handleCheckboxToggle(task.id)}
                                        >
                                            <input
                                                type="checkbox"
                                                className="sc-checkbox"
                                                checked={selectedTaskIds.includes(task.id)}
                                                onChange={() => handleCheckboxToggle(task.id)}
                                                onClick={e => e.stopPropagation()}
                                            />
                                            <div className="sc-backlog-text">
                                                <span className="sc-task-id">#{task.id}</span>
                                                {task.title}
                                            </div>
                                            <span className="sc-backlog-proj">{task.project_name}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                            <p className="sc-hint">Select tasks to include in this sprint iteration.</p>

                            <button type="submit" className="sc-submit-btn">
                                Lock Iteration &amp; Deploy Sprint
                            </button>
                        </form>
                    </div>
                </section>

                {/* ── RIGHT: Sprint Registry ── */}
                <section className="sc-card">
                    <div className="sc-card-strip">
                        <span className="sc-card-strip-label">— Active Sprint Registry —</span>
                    </div>
                    <div className="sc-card-body sc-registry-body">

                        {/* Active */}
                        {activeSprints.length === 0 && completedSprints.length === 0 && (
                            <div className="sc-empty">
                                <span>🗓️</span>
                                <p>No sprints provisioned yet. Create your first sprint.</p>
                            </div>
                        )}

                        {activeSprints.map(sprint => (
                            <div key={sprint.id} className="sc-sprint-row sc-sprint-active">
                                <div className="sc-sprint-top">
                                    <div>
                                        <h4 className="sc-sprint-name">{sprint.name}</h4>
                                        <p className="sc-sprint-meta">
                                            {sprint.project_name} &nbsp;·&nbsp;
                                            {new Date(sprint.start_date).toLocaleDateString()} – {new Date(sprint.end_date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className="sc-status-pill sc-status-active">Active</span>
                                </div>
                                <button
                                    className="sc-inspect-btn"
                                    onClick={() => handleInspectClosure(sprint.id)}
                                >
                                    Inspect &amp; Wrap Sprint
                                </button>
                            </div>
                        ))}

                        {/* Completed */}
                        {completedSprints.length > 0 && (
                            <>
                                <div className="sc-section-divider">Completed</div>
                                {completedSprints.map(sprint => (
                                    <div key={sprint.id} className="sc-sprint-row sc-sprint-done">
                                        <div className="sc-sprint-top">
                                            <div>
                                                <h4 className="sc-sprint-name">{sprint.name}</h4>
                                                <p className="sc-sprint-meta">
                                                    {sprint.project_name} &nbsp;·&nbsp;
                                                    {new Date(sprint.start_date).toLocaleDateString()} – {new Date(sprint.end_date).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span className="sc-status-pill sc-status-done">Completed</span>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </section>
            </div>

            {/* ── Closure Modal ── */}
            {activeSummarySprintId && closureSummary && (
                <div className="sc-modal-overlay" onClick={() => { setActiveSummarySprintId(null); setClosureSummary(null); }}>
                    <div className="sc-modal" onClick={e => e.stopPropagation()}>
                        <div className="sc-modal-header">
                            <h4>Sprint Closure Audit</h4>
                            <button className="sc-modal-close" onClick={() => { setActiveSummarySprintId(null); setClosureSummary(null); }}>&times;</button>
                        </div>
                        <div className="sc-modal-body">
                            <p className="sc-modal-desc">Review sprint health before closing. Incomplete items will return to backlog.</p>

                            {/* Stats */}
                            <div className="sc-stats-grid">
                                <div className="sc-stat-box">
                                    <span className="sc-stat-num">{closureSummary.totalCount}</span>
                                    <span className="sc-stat-label">Total Items</span>
                                </div>
                                <div className="sc-stat-box sc-stat-green">
                                    <span className="sc-stat-num">{closureSummary.completeCount}</span>
                                    <span className="sc-stat-label">Completed</span>
                                </div>
                                <div className="sc-stat-box sc-stat-red">
                                    <span className="sc-stat-num">{closureSummary.remainingCount}</span>
                                    <span className="sc-stat-label">Remaining</span>
                                </div>
                            </div>

                            {/* Completed tasks */}
                            {closureSummary.completedTasks?.length > 0 && (
                                <div className="sc-task-section">
                                    <div className="sc-task-section-label sc-label-green">
                                        ✓ &nbsp;Completed ({closureSummary.completedTasks.length})
                                    </div>
                                    <div className="sc-task-list">
                                        {closureSummary.completedTasks.map(t => (
                                            <div key={t.id} className="sc-task-row">
                                                <span><strong>#{t.id}</strong> {t.title}</span>
                                                <span className="sc-assignee-tag sc-assignee-green">
                                                    👤 {t.assignee_name || 'Unassigned'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Remaining tasks */}
                            {closureSummary.remainingTasks?.length > 0 && (
                                <div className="sc-task-section">
                                    <div className="sc-task-section-label sc-label-red">
                                        ⚠ &nbsp;Will return to backlog ({closureSummary.remainingTasks.length})
                                    </div>
                                    <div className="sc-task-list">
                                        {closureSummary.remainingTasks.map(t => (
                                            <div key={t.id} className="sc-task-row">
                                                <div>
                                                    <span><strong>#{t.id}</strong> {t.title}</span>
                                                    <span className="sc-task-status">{t.status}</span>
                                                </div>
                                                <span className="sc-assignee-tag sc-assignee-red">
                                                    👤 {t.assignee_name || 'Unassigned'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="sc-modal-actions">
                                <button
                                    className="sc-cancel-btn"
                                    onClick={() => { setActiveSummarySprintId(null); setClosureSummary(null); }}
                                >
                                    Cancel
                                </button>
                                <button className="sc-confirm-btn" onClick={handleExecuteFinalization}>
                                    Confirm Closure &amp; Re-route
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SprintConsole;