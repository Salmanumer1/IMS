// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import CreateOrgLanding  from './components/CreateOrgLanding';
import Register          from './components/Register';
import Login             from './components/Login';
import Layout            from './components/Layout';
import WorkspaceDashboard from './components/WorkspaceDashboard';
import CreateProject     from './components/CreateProject';
import AgileHub from './components/AgileHub';
import ForYou from './components/ForYou';
import SprintConsole from './components/SprintConsole';
import GitIntegration from './components/GitIntegration';
import Summary from './components/Summary';
// inside <Route element={<Layout />}>


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* ── Auth flow ── */}
                <Route path="/"         element={<CreateOrgLanding />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login"    element={<Login />} />

                {/* ── Workspace (sidebar layout wraps all inner pages) ── */}
                <Route element={<Layout />}>
                    <Route path="/workspace"      element={<WorkspaceDashboard />} />
                    <Route path="/create-project" element={<CreateProject />} />

                    {/* Placeholder routes — add real pages later */}
                    <Route path="/projects"      element={<PlaceholderPage title="Projects" />} />
                    <Route path="/register-user" element={<PlaceholderPage title="Onboard Members" />} />
                    <Route path="/agile-hub" element={<AgileHub />} />
                    <Route path="/kanban"         element={<PlaceholderPage title="Kanban Board" />} />
                    <Route path="/sprints" element={<SprintConsole />} />
                    <Route path="/for-you" element={<ForYou />} />
                    <Route path="/git" element={<GitIntegration />} />
                    <Route path='/summary' element={<Summary/>}/>
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

// Temporary placeholder for pages not yet built
const PlaceholderPage = ({ title }) => (
    <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        minHeight: '50vh', gap: '12px',
        color: '#5C5444', fontFamily: "'Segoe UI', Arial, sans-serif"
    }}>
        <span style={{ fontSize: '36px' }}>🚧</span>
        <h2 style={{ margin: 0, color: '#1C1A14', fontFamily: 'Georgia, serif' }}>{title}</h2>
        <p style={{ margin: 0, fontSize: '13px' }}>This page is under construction.</p>
    </div>
);

export default App;