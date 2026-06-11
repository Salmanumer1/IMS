// frontend/src/pages/AgileHub.jsx
import React, { useState, useRef } from 'react';
import './AgileHub.css';

const DEMO_PROJECTS = [
    { id: 1, name: 'NADRA Digital Portal',     project_key: 'NDP' },
    { id: 2, name: 'Health Logistics Platform', project_key: 'HLP' },
];

const DEMO_EPICS = [
    { id: 1, project_id: 1, name: 'Authentication Module',  description: 'Biometric and OTP-based login system for citizen portal access.' },
    { id: 2, project_id: 1, name: 'Dashboard Reporting',    description: 'Executive-level KPI dashboards with drill-down analytics.' },
    { id: 3, project_id: 1, name: 'Notification Engine',    description: 'Real-time push and email notification service layer.' },
    { id: 4, project_id: 2, name: 'Inventory Tracking',     description: 'Real-time stock visibility across all national distribution nodes.' },
    { id: 5, project_id: 2, name: 'Supply Chain Reports',   description: 'Automated reporting for procurement and logistics operations.' },
];

const DEMO_TASKS = [
    { id: 1,  project_id: 1, epic_id: 1, title: 'Design login UI mockups',           status: 'Done',        assignedto_id: '' },
    { id: 2,  project_id: 1, epic_id: 1, title: 'Implement OTP service integration',  status: 'In Progress', assignedto_id: '' },
    { id: 3,  project_id: 1, epic_id: 1, title: 'Write auth unit tests',              status: 'To Do',       assignedto_id: '' },
    { id: 4,  project_id: 1, epic_id: 2, title: 'Build BarChart component',           status: 'To Do',       assignedto_id: '' },
    { id: 5,  project_id: 1, epic_id: 2, title: 'Connect dashboard to data layer',    status: 'Review',      assignedto_id: '' },
    { id: 6,  project_id: 1, epic_id: 2, title: 'Optimize query performance',         status: 'In Progress', assignedto_id: '' },
    { id: 7,  project_id: 1, epic_id: 3, title: 'Setup notification microservice',    status: 'To Do',       assignedto_id: '' },
    { id: 8,  project_id: 2, epic_id: 4, title: 'Define inventory data schema',       status: 'Done',        assignedto_id: '' },
    { id: 9,  project_id: 2, epic_id: 4, title: 'Build stock alert notifications',    status: 'To Do',       assignedto_id: '' },
    { id: 10, project_id: 2, epic_id: 5, title: 'Generate weekly supply PDF report',  status: 'Review',      assignedto_id: '' },
];

const DEMO_MEMBERS = [
    { id: 1, name: 'Salman Umer'  },
    { id: 2, name: 'Zain Ahmed'   },
    { id: 3, name: 'Ayesha Malik' },
];

const COLUMNS = ['To Do', 'In Progress', 'Review', 'Done'];

const COLUMN_META = {
    'To Do':       { color: 'rgba(42,38,32,0.55)',     bg: 'rgba(42,38,32,0.04)'     },
    'In Progress': { color: 'rgba(191,149,48,0.90)',   bg: 'rgba(191,149,48,0.06)'   },
    'Review':      { color: 'rgba(59,130,200,0.90)',   bg: 'rgba(59,130,200,0.05)'   },
    'Done':        { color: 'rgba(34,160,90,0.90)',    bg: 'rgba(34,160,90,0.05)'    },
};

let nextEpicId = 20;
let nextTaskId = 30;

const AgileHub = () => {
    const [projects]                                  = useState(DEMO_PROJECTS);
    const [selectedProjectId, setSelectedProjectId]   = useState(1);
    const [epics, setEpics]                           = useState(DEMO_EPICS);
    const [tasks, setTasks]                           = useState(DEMO_TASKS);
    const [activeEpicFilter, setActiveEpicFilter]     = useState('all');
    const [viewingEpic, setViewingEpic]               = useState(null);

    // collapsible form toggles
    const [epicFormOpen, setEpicFormOpen]             = useState(false);
    const [taskFormOpen, setTaskFormOpen]             = useState(false);

    const [newEpicName, setNewEpicName]               = useState('');
    const [newEpicDesc, setNewEpicDesc]               = useState('');
    const [taskTitle, setTaskTitle]                   = useState('');
    const [taskEpicId, setTaskEpicId]                 = useState('');

    // drag state
    const dragTaskId  = useRef(null);
    const dragOverCol = useRef(null);

    const projectEpics   = epics.filter(e => e.project_id === Number(selectedProjectId));
    const displayedTasks = tasks.filter(t =>
        t.project_id === Number(selectedProjectId) &&
        (activeEpicFilter === 'all' || String(t.epic_id) === String(activeEpicFilter))
    );

    /* ── Epic CRUD ── */
    const handleCreateEpic = (e) => {
        e.preventDefault();
        if (!newEpicName.trim()) return;
        setEpics([...epics, {
            id: nextEpicId++,
            project_id: Number(selectedProjectId),
            name: newEpicName,
            description: newEpicDesc,
        }]);
        setNewEpicName('');
        setNewEpicDesc('');
        setEpicFormOpen(false);
    };

    const handleDeleteEpic = (epicId) => {
        if (!window.confirm('Delete this Epic?')) return;
        setEpics(epics.filter(e => e.id !== epicId));
        if (String(activeEpicFilter) === String(epicId)) setActiveEpicFilter('all');
    };

    /* ── Task CRUD ── */
    const handleCreateTask = (e) => {
        e.preventDefault();
        if (!taskTitle.trim()) return;
        setTasks([...tasks, {
            id: nextTaskId++,
            project_id: Number(selectedProjectId),
            epic_id: taskEpicId ? Number(taskEpicId) : null,
            title: taskTitle,
            status: 'To Do',
            assignedto_id: '',
        }]);
        setTaskTitle('');
        setTaskEpicId('');
        setTaskFormOpen(false);
    };

    const handleUpdateTask = (taskId, fields) =>
        setTasks(tasks.map(t => t.id === taskId ? { ...t, ...fields } : t));

    /* ── Drag & Drop ── */
    const onDragStart = (taskId) => { dragTaskId.current = taskId; };
    const onDragOver  = (e, col)  => { e.preventDefault(); dragOverCol.current = col; };
    const onDrop      = (col)     => {
        if (dragTaskId.current !== null) {
            handleUpdateTask(dragTaskId.current, { status: col });
            dragTaskId.current  = null;
            dragOverCol.current = null;
        }
    };

    return (
        <div className="agile-hub-container">

            {/* ── Toolbar ── */}
            <header className="hub-toolbar">
                <div className="project-select-pane">
                    <label>Active Project:</label>
                    <select
                        value={selectedProjectId}
                        onChange={(e) => { setSelectedProjectId(Number(e.target.value)); setActiveEpicFilter('all'); }}
                    >
                        {projects.map(p => (
                            <option key={p.id} value={p.id}>{p.name} ({p.project_key})</option>
                        ))}
                    </select>
                </div>
                <div className="epic-filter-pane">
                    <label>Epic Filter:</label>
                    <select value={activeEpicFilter} onChange={(e) => setActiveEpicFilter(e.target.value)}>
                        <option value="all">All Epics</option>
                        {projectEpics.map(e => (
                            <option key={e.id} value={e.id}>{e.name}</option>
                        ))}
                    </select>
                </div>
            </header>

            <main className="hub-workspace-grid">

                {/* ── Management Sidebar ── */}
                <section className="hub-management-sidebar">

                    {/* Create Epic Card */}
                    <div className="sidebar-card">
                        <div className="sidebar-card-header" onClick={() => setEpicFormOpen(o => !o)}>
                            <h3>+ Create Epic</h3>
                            <span className="collapse-toggle">{epicFormOpen ? '−' : '+'}</span>
                        </div>
                        {epicFormOpen && (
                            <form onSubmit={handleCreateEpic} className="inline-hub-form">
                                <input
                                    type="text"
                                    placeholder="Epic name (e.g., Auth Module)"
                                    value={newEpicName}
                                    onChange={(e) => setNewEpicName(e.target.value)}
                                    required
                                />
                                <textarea
                                    placeholder="Feature description..."
                                    value={newEpicDesc}
                                    onChange={(e) => setNewEpicDesc(e.target.value)}
                                />
                                <button type="submit" className="hub-btn-primary">Create Epic</button>
                            </form>
                        )}
                    </div>

                    {/* Add Task Card */}
                    <div className="sidebar-card">
                        <div className="sidebar-card-header" onClick={() => setTaskFormOpen(o => !o)}>
                            <h3>+ Add Task</h3>
                            <span className="collapse-toggle">{taskFormOpen ? '−' : '+'}</span>
                        </div>
                        {taskFormOpen && (
                            <form onSubmit={handleCreateTask} className="inline-hub-form">
                                <input
                                    type="text"
                                    placeholder="Task summary..."
                                    value={taskTitle}
                                    onChange={(e) => setTaskTitle(e.target.value)}
                                    required
                                />
                                <select value={taskEpicId} onChange={(e) => setTaskEpicId(e.target.value)}>
                                    <option value="">Assign Epic (Optional)</option>
                                    {projectEpics.map(e => (
                                        <option key={e.id} value={e.id}>{e.name}</option>
                                    ))}
                                </select>
                                <button type="submit" className="hub-btn-success">Append Card</button>
                            </form>
                        )}
                    </div>

                    {/* Epics List — scrollable */}
                    <div className="sidebar-card active-epics-list">
                        <div className="sidebar-card-header no-toggle">
                            <h3>Project Epics</h3>
                            <span className="epic-count-pill">{projectEpics.length}</span>
                        </div>
                        <ul>
                            {projectEpics.length === 0 && (
                                <li className="empty-epics-note">No epics yet.</li>
                            )}
                            {projectEpics.map(e => (
                                <li
                                    key={e.id}
                                    className={String(activeEpicFilter) === String(e.id) ? 'active-epic-item' : ''}
                                >
                                    <span onClick={() => setActiveEpicFilter(e.id)}>{e.name}</span>
                                    <button onClick={() => handleDeleteEpic(e.id)} className="hub-btn-danger-text">✕</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* ── Kanban Board ── */}
                <section className="hub-kanban-board">
                    {COLUMNS.map(col => {
                        const colTasks = displayedTasks.filter(t => t.status === col);
                        const meta     = COLUMN_META[col];
                        return (
                            <div
                                key={col}
                                className="kanban-column"
                                style={{ '--col-bg': meta.bg }}
                                onDragOver={(e) => onDragOver(e, col)}
                                onDrop={() => onDrop(col)}
                            >
                                <div className="column-header" style={{ '--col-color': meta.color }}>
                                    <h4>{col}</h4>
                                    <span className="card-counter-pill" style={{ '--col-color': meta.color }}>
                                        {colTasks.length}
                                    </span>
                                </div>
                                <div className="column-cards-container">
                                    {colTasks.map(task => {
                                        const assignedEpic = projectEpics.find(e => String(e.id) === String(task.epic_id));
                                        return (
                                            <div
                                                key={task.id}
                                                className="kanban-task-card"
                                                draggable
                                                onDragStart={() => onDragStart(task.id)}
                                            >
                                                {assignedEpic && (
                                                    <span
                                                        className="epic-tag-badge"
                                                        onClick={() => setViewingEpic(assignedEpic)}
                                                        title="View epic details"
                                                    >
                                                        {assignedEpic.name}
                                                    </span>
                                                )}
                                                <h5>{task.title}</h5>
                                                <div className="card-dropdown-control">
                                                    <span>Assignee</span>
                                                    <select
                                                        value={task.assignedto_id || ''}
                                                        onChange={(e) => handleUpdateTask(task.id, { assignedto_id: e.target.value })}
                                                    >
                                                        <option value="">Unassigned</option>
                                                        {DEMO_MEMBERS.map(m => (
                                                            <option key={m.id} value={m.id}>{m.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="card-dropdown-control">
                                                    <span>Status</span>
                                                    <select
                                                        value={task.status}
                                                        onChange={(e) => handleUpdateTask(task.id, { status: e.target.value })}
                                                    >
                                                        {COLUMNS.map(c => (
                                                            <option key={c} value={c}>{c}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {colTasks.length === 0 && (
                                        <div className="empty-column-hint">Drop cards here</div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </section>
            </main>

            {/* ── Epic Detail Modal ── */}
            {viewingEpic && (
                <div className="epic-modal-overlay" onClick={() => setViewingEpic(null)}>
                    <div className="epic-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="epic-modal-header">
                            <h4>Epic Feature Details</h4>
                            <button className="epic-modal-close" onClick={() => setViewingEpic(null)}>&times;</button>
                        </div>
                        <div className="epic-modal-body">
                            <div className="epic-detail-field">
                                <label>Epic Name</label>
                                <h2>{viewingEpic.name}</h2>
                            </div>
                            <div className="epic-detail-field">
                                <label>Description</label>
                                <p className="epic-description-text">
                                    {viewingEpic.description || 'No description provided for this feature block.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgileHub;