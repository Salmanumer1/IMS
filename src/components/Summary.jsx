// frontend/src/pages/SummaryDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Summary.css';
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar,
    PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Comprehensive Client-Side Mock Database Engine
const MOCK_API_DATABASE = {
    // Data structures indexed explicitly by Project ID to mirror real database queries
    "1": {
        tasks: [
            { id: '101', title: 'Setup database schema with RLS configurations', status: 'In Progress', priority: 'High', parent_id: null, epic_id: 'ep-1', sprint_id: 's2' },
            { id: '102', title: 'Design component layout architecture', status: 'Done', priority: 'Critical', parent_id: null, epic_id: 'ep-1', sprint_id: 's1' },
            { id: '103', title: 'Integrate Recharts component primitives', status: 'To Do', priority: 'Medium', parent_id: null, epic_id: 'ep-2', sprint_id: 's2' },
            { id: '104', title: 'Verify cross-browser CSS support matrix', status: 'In Review', priority: 'Low', parent_id: null, epic_id: 'ep-2', sprint_id: 's2' },
            { id: '105', title: 'Subtask: Configure Postgres policies', status: 'In Progress', priority: 'High', parent_id: '101', epic_id: 'ep-1', sprint_id: 's2' },
            { id: '106', title: 'Construct executive summary layouts', status: 'To Do', priority: 'High', parent_id: null, epic_id: 'ep-2', sprint_id: 's3' }
        ],
        sprints: [
            { id: 's1', name: 'Sprint 1 - Foundations', status: 'Closed', start_date: '2026-06-01', end_date: '2026-06-15' },
            { id: 's2', name: 'Sprint 2 - Visualization Integration', status: 'Active', start_date: '2026-06-16', end_date: '2026-06-30' },
            { id: 's3', name: 'Sprint 3 - Polish & Launch', status: 'Planned', start_date: '2026-07-01', end_date: '2026-07-15' }
        ],
        epics: [
            { id: 'ep-1', name: 'Epic Architecture & Security Core' },
            { id: 'ep-2', name: 'Epic Premium Data Insights Engine' }
        ]
    },
    "2": {
        tasks: [
            { id: '201', title: 'Build streaming pipeline listeners', status: 'Done', priority: 'Critical', parent_id: null, epic_id: 'ep-3', sprint_id: 's4' },
            { id: '202', title: 'Document pipeline downstream maps', status: 'In Progress', priority: 'Medium', parent_id: null, epic_id: 'ep-3', sprint_id: 's4' }
        ],
        sprints: [
            { id: 's4', name: 'Pipeline Data Sync Alpha', status: 'Active', start_date: '2026-06-10', end_date: '2026-06-24' }
        ],
        epics: [
            { id: 'ep-3', name: 'Data Pipeline Infrastructure' }
        ]
    }
};

// Fallback template for any undefined/new dynamic Project IDs
const DEFAULT_FALLBACK_DATA = {
    tasks: [
        { id: '901', title: 'Discovery meeting baseline analysis', status: 'Done', priority: 'Low', parent_id: null, epic_id: 'ep-f', sprint_id: 'sf' },
         { id: '902', title: 'meeting baseline analysis', status: 'In Progress', priority: 'Low', parent_id: null, epic_id: 'ep-u', sprint_id: 'sop' }
    ],
    sprints: [
        { id: 'sf', name: 'Sprint Target Discovery', status: 'Active', start_date: '2026-06-15', end_date: '2026-06-29' }
    ],
    epics: [
        { id: 'ep-f', name: 'General Evaluation' }
    ]
};

const Summary = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        simulateMockFetch();
    }, [projectId]);

    const simulateMockFetch = () => {
        setLoading(true);
        // Simulating a quick, realistic 400ms network layout resolution delay
        setTimeout(() => {
            const projectData = MOCK_API_DATABASE[projectId] || DEFAULT_FALLBACK_DATA;
            setData(projectData);
            setLoading(false);
        }, 400);
    };

    if (loading) return <div className="summary-loading">📊 Loading executive analytics...</div>;
    if (!data) return <div className="summary-error">Failed to load system data</div>;

    const tasks = data.tasks || [];
    const sprints = data.sprints || [];
    const epics = data.epics || [];
    const parentTasks = tasks.filter(t => !t.parent_id);

    const stats = {
        total: parentTasks.length,
        todo: parentTasks.filter(t => t.status === 'To Do').length,
        inProgress: parentTasks.filter(t => t.status === 'In Progress').length,
        inReview: parentTasks.filter(t => t.status === 'In Review').length,
        done: parentTasks.filter(t => t.status === 'Done').length
    };

    const completionRate = parentTasks.length > 0
        ? Math.round((stats.done / parentTasks.length) * 100)
        : 0;

    // Integrated Executive Charcoal & Gold Color Palette configuration
    const statusData = [
        { name: 'To Do', value: stats.todo, fill: '#7A5800' },
        { name: 'In Progress', value: stats.inProgress, fill: '#BF9530' },
        { name: 'In Review', value: stats.inReview, fill: '#5C5444' },
        { name: 'Done', value: stats.done, fill: '#2A2620' }
    ];

    const priorityData = [
        { name: 'Low', value: parentTasks.filter(t => t.priority === 'Low').length },
        { name: 'Medium', value: parentTasks.filter(t => t.priority === 'Medium').length },
        { name: 'High', value: parentTasks.filter(t => t.priority === 'High').length },
        { name: 'Critical', value: parentTasks.filter(t => t.priority === 'Critical').length }
    ];

    const epicData = epics.map(epic => {
        const epicTasks = tasks.filter(t => t.epic_id === epic.id);
        const done = epicTasks.filter(t => t.status === 'Done').length;
        return {
            name: epic.name,
            total: epicTasks.length,
            completed: done,
            progress: epicTasks.length > 0 ? (done / epicTasks.length) * 100 : 0
        };
    });

    return (
        <div className="summary-dashboard">
            {/* Header Area */}
            <header className="summary-header">
                <div>
                    <h1>📊 Analytics & Insights</h1>
                    <p>Comprehensive project analytics and performance metrics (Mock Environment)</p>
                </div>
                <button className="summary-back-btn" onClick={() => navigate(-1)}>
                    ← Return to Workspace
                </button>
            </header>

            {/* Premium Left-Accent Card Grid */}
            <section className="summary-kpi-grid">
                <div className="summary-kpi-card kpi-1">
                    <div className="kpi-icon">📋</div>
                    <div>
                        <p className="kpi-label">Total Tasks</p>
                        <h3>{stats.total}</h3>
                    </div>
                </div>

                <div className="summary-kpi-card kpi-2">
                    <div className="kpi-icon">⚙️</div>
                    <div>
                        <p className="kpi-label">In Progress</p>
                        <h3>{stats.inProgress}</h3>
                    </div>
                </div>

                <div className="summary-kpi-card kpi-3">
                    <div className="kpi-icon">✅</div>
                    <div>
                        <p className="kpi-label">Completed</p>
                        <h3>{stats.done}</h3>
                    </div>
                </div>

                <div className="summary-kpi-card kpi-4">
                    <div className="kpi-icon">📈</div>
                    <div>
                        <p className="kpi-label">Completion</p>
                        <h3>{completionRate}%</h3>
                    </div>
                </div>

                <div className="summary-kpi-card kpi-5">
                    <div className="kpi-icon">🎯</div>
                    <div>
                        <p className="kpi-label">Epics</p>
                        <h3>{epics.length}</h3>
                    </div>
                </div>

                <div className="summary-kpi-card kpi-6">
                    <div className="kpi-icon">🚀</div>
                    <div>
                        <p className="kpi-label">Sprints</p>
                        <h3>{sprints.length}</h3>
                    </div>
                </div>
            </section>

            {/* Charts Visual Presentation Section */}
            <section className="summary-charts-grid">
                
                <div className="summary-chart-card">
                    <h3>Task Status Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={statusData}
                                cx="50%" cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name} (${value})`}
                                outerRadius={85}
                                dataKey="value"
                            >
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value} tasks`} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="summary-chart-card">
                    <h3>Task Priority Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={priorityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(42,38,32,0.06)" />
                            <XAxis dataKey="name" stroke="#5C5444" style={{ fontSize: '11px' }} />
                            <YAxis stroke="#5C5444" style={{ fontSize: '11px' }} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#BF9530" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="summary-chart-card chart-full-width">
                    <h3>Task Status Trend Area</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={statusData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#BF9530" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#BF9530" stopOpacity={0.0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(42,38,32,0.06)" />
                            <XAxis dataKey="name" stroke="#5C5444" style={{ fontSize: '11px' }} />
                            <YAxis stroke="#5C5444" style={{ fontSize: '11px' }} />
                            <Tooltip />
                            <Area type="monotone" dataKey="value" fill="url(#goldGradient)" stroke="#2A2620" strokeWidth={2.5} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Epic Progress Section */}
                <div className="summary-chart-card chart-full-width">
                    <h3>Epic Progress Metric</h3>
                    {epicData.length === 0 ? (
                        <p className="no-data">No epics created yet</p>
                    ) : (
                        <div className="epic-progress-list">
                            {epicData.map((epic, idx) => (
                                <div key={idx} className="epic-progress-item">
                                    <div className="epic-info">
                                        <h4>{epic.name}</h4>
                                        <span className="epic-count">{epic.completed}/{epic.total} tasks</span>
                                    </div>
                                    <div className="epic-progress-container">
                                        <div className="epic-progress-bar">
                                            <div
                                                className="progress-fill"
                                                style={{ width: `${epic.progress}%` }}
                                            />
                                        </div>
                                        <span className="progress-percent">{Math.round(epic.progress)}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sprint Overview Table */}
                <div className="summary-chart-card chart-full-width">
                    <h3>Sprint Operational Overview</h3>
                    {sprints.length === 0 ? (
                        <p className="no-data">No sprints created yet</p>
                    ) : (
                        <div className="sprint-overview-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sprint Name</th>
                                        <th>Status</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Linked Tasks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sprints.map((sprint, idx) => (
                                        <tr key={idx}>
                                            <td><strong>{sprint.name}</strong></td>
                                            <td>
                                                <span className={`status-badge sprint-${sprint.status.toLowerCase()}`}>
                                                    {sprint.status}
                                                </span>
                                            </td>
                                            <td>{new Date(sprint.start_date).toLocaleDateString()}</td>
                                            <td>{new Date(sprint.end_date).toLocaleDateString()}</td>
                                            <td>{tasks.filter(t => t.sprint_id === sprint.id).length} tasks</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Summary;