// frontend/src/pages/GitIntegration.jsx
import React, { useState } from 'react';
import './GitIntegration.css';

const GOLD = '#BF9530';

// ── Demo Data ──
const DEMO_PROJECTS = [
    { id: 1, name: 'NADRA Digital Portal',      project_key: 'NDP' },
    { id: 2, name: 'Health Logistics Platform',  project_key: 'HLP' },
];

const DEMO_COMMITS = [
    { id: 1, commit_message: 'fix(auth): resolve OTP token expiry edge case',        commit_hash: 'a3f9d21c', author_name: 'Salman Umer',  branch_name: 'feature/auth-otp',   commit_date: '2026-06-10T09:14:00Z', task_id: 2,    author_avatar_url: '' },
    { id: 2, commit_message: 'feat(dashboard): add KPI summary bar chart component', commit_hash: 'b7e12398', author_name: 'Zain Ahmed',   branch_name: 'feature/dashboard',  commit_date: '2026-06-10T11:32:00Z', task_id: 4,    author_avatar_url: '' },
    { id: 3, commit_message: 'chore: update dependency versions and lockfile',        commit_hash: 'c1d84a55', author_name: 'Ayesha Malik', branch_name: 'main',               commit_date: '2026-06-09T16:08:00Z', task_id: null, author_avatar_url: '' },
    { id: 4, commit_message: 'fix(inventory): correct stock threshold calculation',   commit_hash: 'f4c20b71', author_name: 'Salman Umer',  branch_name: 'fix/inventory-calc', commit_date: '2026-06-09T13:45:00Z', task_id: 9,    author_avatar_url: '' },
    { id: 5, commit_message: 'refactor(api): extract auth middleware to service layer', commit_hash: 'e9a31d04', author_name: 'Zain Ahmed', branch_name: 'feature/auth-otp',  commit_date: '2026-06-08T10:22:00Z', task_id: 2,    author_avatar_url: '' },
];

const DEMO_PRS = [
    { id: 1, pr_number: 14, pr_title: 'Merge OTP auth feature into staging',      author_name: 'Salman Umer',  branch_name: 'feature/auth-otp',   base_branch: 'staging', status: 'open',   task_id: 2,    pr_url: '#' },
    { id: 2, pr_number: 13, pr_title: 'Dashboard KPI components phase 1',         author_name: 'Zain Ahmed',   branch_name: 'feature/dashboard',  base_branch: 'main',    status: 'merged', task_id: 4,    pr_url: '#' },
    { id: 3, pr_number: 12, pr_title: 'Fix inventory stock threshold logic',       author_name: 'Ayesha Malik', branch_name: 'fix/inventory-calc', base_branch: 'main',    status: 'merged', task_id: 9,    pr_url: '#' },
    { id: 4, pr_number: 15, pr_title: 'Refactor auth middleware architecture',     author_name: 'Salman Umer',  branch_name: 'refactor/auth-mw',   base_branch: 'staging', status: 'open',   task_id: null, pr_url: '#' },
];

const DEMO_LINKED_REPOS = [
    { id: 1, repository_owner: 'gov-pak', repository_name: 'nadra-portal-api',      repository_url: '#', last_sync: '2026-06-10T11:00:00Z' },
    { id: 2, repository_owner: 'gov-pak', repository_name: 'nadra-portal-frontend',  repository_url: '#', last_sync: '2026-06-10T10:30:00Z' },
];

const DEMO_AVAILABLE_REPOS = [
    { id: 1, name: 'nadra-portal-api',      owner: 'gov-pak', description: 'REST API backend for NADRA citizen portal'        },
    { id: 2, name: 'nadra-portal-frontend', owner: 'gov-pak', description: 'React frontend for NADRA citizen portal'           },
    { id: 3, name: 'hlp-inventory-service', owner: 'gov-pak', description: 'Inventory microservice for Health Logistics'       },
    { id: 4, name: 'shared-auth-lib',       owner: 'gov-pak', description: 'Shared OAuth and JWT authentication utilities'     },
];

const INITIALS = (name) => name ? name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : '??';

const GitIntegration = () => {
    const [selectedProject, setSelectedProject]     = useState(1);
    const [activeViewTab, setActiveViewTab]         = useState('stream');
    const [dataSubTab, setDataSubTab]               = useState('commits');
    const [isConnected, setIsConnected]             = useState(false);
    const [linkedRepos, setLinkedRepos]             = useState(DEMO_LINKED_REPOS);

    const commits      = DEMO_COMMITS;
    const pullRequests = DEMO_PRS;

    const handleLinkRepo = (repo) => {
        if (linkedRepos.some(r => r.repository_name === repo.name)) return;
        setLinkedRepos(prev => [...prev, {
            id: Date.now(),
            repository_owner: repo.owner,
            repository_name:  repo.name,
            repository_url:   '#',
            last_sync:        new Date().toISOString(),
        }]);
    };

    const openPRs   = pullRequests.filter(p => p.status === 'open').length;
    const mergedPRs = pullRequests.filter(p => p.status === 'merged').length;

    const PR_STATUS = {
        open:   { color: '#BF9530', bg: 'rgba(191,149,48,0.10)', border: 'rgba(191,149,48,0.30)' },
        merged: { color: '#1A6B3C', bg: 'rgba(34,120,70,0.09)',  border: 'rgba(34,120,70,0.25)'  },
        closed: { color: '#C92A2A', bg: 'rgba(201,42,42,0.07)',  border: 'rgba(201,42,42,0.22)'  },
    };

    return (
        <div className="gi-root">

            {/* ── Header ── */}
            <div className="gi-header">
                <div className="gi-header-left">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                        <path d="M15 12a6 6 0 1 1-6-6 4.8 4.8 0 1 0 6 6z" fill={GOLD} />
                        <path d="M14.5 8l1.1.85-.42 1.3 1.05-.85 1.05.85-.42-1.3 1.1-.85h-1.3l-.43-1.3-.43 1.3z" fill={GOLD} />
                    </svg>
                    <div>
                        <h1 className="gi-title">Git Development Center</h1>
                        <p className="gi-subtitle">Track code metrics, repository workflows, branches and pull requests.</p>
                    </div>
                </div>
                <div className="gi-header-right">
                    <div className="gi-project-select">
                        <label>Project Scope:</label>
                        <select value={selectedProject} onChange={e => setSelectedProject(Number(e.target.value))}>
                            {DEMO_PROJECTS.map(p => (
                                <option key={p.id} value={p.id}>{p.name} ({p.project_key})</option>
                            ))}
                        </select>
                    </div>
                    <button className="gi-refresh-btn" onClick={() => {}}>↻ Refresh</button>
                </div>
            </div>

            {/* ── Nav Tabs ── */}
            <div className="gi-tabs">
                <button className={`gi-tab${activeViewTab === 'stream' ? ' active' : ''}`} onClick={() => setActiveViewTab('stream')}>
                    📊 Code Metrics Stream
                </button>
                <button className={`gi-tab${activeViewTab === 'config' ? ' active' : ''}`} onClick={() => setActiveViewTab('config')}>
                    ⚙ Account &amp; Repository Links
                </button>
            </div>

            {/* ══════════════ VIEW A: STREAM ══════════════ */}
            {activeViewTab === 'stream' && (
                <div className="gi-view">

                    {/* Metric Cards */}
                    <div className="gi-metrics-row">
                        <div className="gi-metric-card">
                            <span className="gi-metric-num">{commits.length}</span>
                            <span className="gi-metric-label">Synced Commits</span>
                        </div>
                        <div className="gi-metric-card gi-metric-gold">
                            <span className="gi-metric-num">{openPRs}</span>
                            <span className="gi-metric-label">Open Pull Requests</span>
                        </div>
                        <div className="gi-metric-card gi-metric-green">
                            <span className="gi-metric-num">{mergedPRs}</span>
                            <span className="gi-metric-label">Merged PRs</span>
                        </div>
                        <div className="gi-metric-card">
                            <span className="gi-metric-num">{linkedRepos.length}</span>
                            <span className="gi-metric-label">Linked Repositories</span>
                        </div>
                    </div>

                    <div className="gi-stream-layout">

                        {/* Feed */}
                        <div className="gi-feed">
                            <div className="gi-feed-tabs">
                                <button className={`gi-feed-tab${dataSubTab === 'commits' ? ' active' : ''}`} onClick={() => setDataSubTab('commits')}>
                                    Commits <span>{commits.length}</span>
                                </button>
                                <button className={`gi-feed-tab${dataSubTab === 'prs' ? ' active' : ''}`} onClick={() => setDataSubTab('prs')}>
                                    Pull Requests <span>{pullRequests.length}</span>
                                </button>
                            </div>

                            <div className="gi-feed-body">

                                {/* Commits */}
                                {dataSubTab === 'commits' && (
                                    <div className="gi-commits">
                                        {commits.length === 0 ? (
                                            <div className="gi-empty">No commits mapped to this project yet.</div>
                                        ) : commits.map(commit => (
                                            <div key={commit.id} className="gi-commit-row">
                                                <div className="gi-avatar">{INITIALS(commit.author_name)}</div>
                                                <div className="gi-commit-body">
                                                    <div className="gi-commit-top">
                                                        <span className="gi-commit-msg">{commit.commit_message}</span>
                                                        <span className="gi-hash-pill">{commit.commit_hash.substring(0, 7)}</span>
                                                    </div>
                                                    <div className="gi-commit-meta">
                                                        <span>By <strong>{commit.author_name}</strong></span>
                                                        <span className="gi-branch-tag">{commit.branch_name}</span>
                                                        {commit.commit_date && (
                                                            <span className="gi-meta-time">
                                                                {new Date(commit.commit_date).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                {commit.task_id && (
                                                    <span className="gi-task-pill">#{commit.task_id}</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Pull Requests */}
                                {dataSubTab === 'prs' && (
                                    <div className="gi-prs">
                                        {pullRequests.length === 0 ? (
                                            <div className="gi-empty">No pull requests found for this project.</div>
                                        ) : pullRequests.map(pr => {
                                            const meta = PR_STATUS[pr.status] || PR_STATUS.open;
                                            return (
                                                <div key={pr.id} className="gi-pr-row">
                                                    <span
                                                        className="gi-pr-status"
                                                        style={{ color: meta.color, background: meta.bg, border: `1px solid ${meta.border}` }}
                                                    >
                                                        {pr.status}
                                                    </span>
                                                    <div className="gi-pr-body">
                                                        <div className="gi-pr-title">
                                                            #{pr.pr_number}: {pr.pr_title}
                                                        </div>
                                                        <div className="gi-pr-meta">
                                                            By <strong>{pr.author_name}</strong>
                                                            &nbsp;·&nbsp;
                                                            <span className="gi-branch-tag">{pr.branch_name}</span>
                                                            &nbsp;→&nbsp;
                                                            <span className="gi-branch-tag">{pr.base_branch}</span>
                                                        </div>
                                                    </div>
                                                    {pr.task_id && (
                                                        <span className="gi-task-pill">#{pr.task_id}</span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar: Linked Repos */}
                        <div className="gi-repo-sidebar">
                            <div className="gi-sidebar-header">
                                Connected Repos
                                <span className="gi-sidebar-count">{linkedRepos.length}</span>
                            </div>
                            {linkedRepos.length === 0 ? (
                                <p className="gi-sidebar-empty">No repositories linked to this project.</p>
                            ) : linkedRepos.map(repo => (
                                <div key={repo.id} className="gi-sidebar-repo">
                                    <div className="gi-sidebar-repo-name">
                                        <span className="gi-repo-icon">⎇</span>
                                        {repo.repository_owner}/{repo.repository_name}
                                    </div>
                                    <div className="gi-sidebar-repo-meta">
                                        <span className="gi-pulse">● Active</span>
                                        {repo.last_sync && (
                                            <span className="gi-sync-time">
                                                {new Date(repo.last_sync).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ══════════════ VIEW B: CONFIG ══════════════ */}
            {activeViewTab === 'config' && (
                <div className="gi-view">
                    <div className="gi-config-grid">

                        {/* Step 1: OAuth */}
                        <div className="gi-config-card">
                            <div className="gi-config-card-strip">
                                <span>— Step 1: Account Authentication —</span>
                            </div>
                            <div className="gi-config-card-body">
                                <p className="gi-config-desc">Authenticate your organization against code management providers via OAuth.</p>
                                <div className="gi-provider-row">
                                    <span className="gi-provider-label">Provider:</span>
                                    <div className="gi-provider-btn active">
                                        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                                        GitHub
                                    </div>
                                </div>

                                {!isConnected ? (
                                    <button className="gi-oauth-btn" onClick={() => setIsConnected(true)}>
                                        🔐 Connect GitHub Organization
                                    </button>
                                ) : (
                                    <div className="gi-connected-banner">
                                        <div className="gi-connected-check">✓</div>
                                        <div>
                                            <strong>GitHub Connected</strong>
                                            <p>Polling engine tracking authenticated repository endpoints.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Step 2: Project Context */}
                        <div className="gi-config-card">
                            <div className="gi-config-card-strip">
                                <span>— Step 2: Project Assignment Context —</span>
                            </div>
                            <div className="gi-config-card-body">
                                <p className="gi-config-desc">The project context below receives webhook triggers parsed by the engine worker.</p>
                                <div className="gi-project-status">
                                    <div className="gi-project-active">
                                        <span className="gi-active-dot">●</span>
                                        <div>
                                            <div className="gi-project-status-label">Linked Target Scope</div>
                                            <div className="gi-project-status-name">
                                                {DEMO_PROJECTS.find(p => p.id === selectedProject)?.name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Available Repos */}
                    <div className="gi-avail-repos">
                        <div className="gi-avail-strip">
                            <span>— Step 3: Link Repositories to Project —</span>
                        </div>
                        <div className="gi-avail-body">
                            <div className="gi-avail-grid">
                                {DEMO_AVAILABLE_REPOS.map(repo => {
                                    const linked = linkedRepos.some(r => r.repository_name === repo.name);
                                    return (
                                        <div key={repo.id} className={`gi-avail-card${linked ? ' linked' : ''}`}>
                                            <div className="gi-avail-card-top">
                                                <span className="gi-repo-icon-lg">⎇</span>
                                                <div>
                                                    <div className="gi-avail-repo-name">{repo.name}</div>
                                                    <div className="gi-avail-repo-owner">{repo.owner}</div>
                                                </div>
                                                {linked && <span className="gi-linked-badge">Linked</span>}
                                            </div>
                                            {repo.description && (
                                                <p className="gi-avail-repo-desc">{repo.description}</p>
                                            )}
                                            <button
                                                className={`gi-link-btn${linked ? ' disabled' : ''}`}
                                                onClick={() => !linked && handleLinkRepo(repo)}
                                                disabled={linked}
                                            >
                                                {linked ? '🔒 Already Linked' : '🔗 Link to Project'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GitIntegration;