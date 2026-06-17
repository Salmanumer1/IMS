// frontend/src/pages/SummaryDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import './Summary.css';
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar,
    PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Summary = () => {
    const { projectId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSummaryData();
    }, [projectId]);

    const fetchSummaryData = async () => {
        try {
            const response = await API.get(`/agile/hub/${projectId}`);
            if (response.data.success) {
                setData(response.data);
            }
        } catch (err) {
            console.error('Error fetching summary:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="summary-loading">📊 Loading analytics...</div>;
    if (!data) return <div className="summary-error">Failed to load data</div>;

    const tasks = data.tasks || [];
    const sprints = data.sprints || [];
    const epics = data.epics || [];
    const parentTasks = tasks.filter(t => !t.parent_id);

    // Calculations
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

    // Chart data mapping
    const statusData = [
        { name: 'To Do', value: stats.todo, fill: '#EF4444' },
        { name: 'In Progress', value: stats.inProgress, fill: '#F59E0B' },
        { name: 'In Review', value: stats.inReview, fill: '#8B5CF6' },
        { name: 'Done', value: stats.done, fill: '#10B981' }
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
            {/* Header */}
            <header className="summary-header">
                <h1>📊 Analytics & Insights</h1>
                <p>Comprehensive project analytics and performance metrics</p>
            </header>

            {/* KPI Section */}
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

            {/* Charts Section */}
            <section className="summary-charts-grid">
                {/* Task Status Distribution - Pie */}
                <div className="summary-chart-card">
                    <h3>Task Status Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name} (${value})`}
                                outerRadius={85}
                                fill="#8884d8"
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

                {/* Priority Distribution - Bar */}
                <div className="summary-chart-card">
                    <h3>Task Priority Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={priorityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Status Trend - Area Chart */}
                <div className="summary-chart-card chart-full-width">
                    <h3>Task Status Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={statusData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="value" fill="rgba(102, 126, 234, 0.25)" stroke="#667eea" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Epic Progress - Horizontal Bar */}
                <div className="summary-chart-card chart-full-width">
                    <h3>Epic Progress</h3>
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
                    <h3>Sprint Overview</h3>
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