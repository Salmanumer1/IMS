import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './Layout.css';

const GOLD = '#BF9530';

const Layout = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="layout-wrapper">

            {/* ══ SIDEBAR ══ */}
            <aside className="layout-sidebar">

                {/* Logo */}
                <div className="layout-sidebar-header">
                    <div className="layout-emblem-row">
                        <div className="layout-emblem-circle">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                                <path d="M15 12a6 6 0 1 1-6-6 4.8 4.8 0 1 0 6 6z" fill={GOLD} />
                                <path d="M14.5 8l1.1.85-.42 1.3 1.05-.85 1.05.85-.42-1.3 1.1-.85h-1.3l-.43-1.3-.43 1.3z" fill={GOLD} />
                            </svg>
                        </div>
                        <div>
                            <div className="layout-logo-text">ProjectFlow</div>
                            <div className="layout-logo-sub">IMS · PKG-2026</div>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="layout-nav-section">
                    <div className="layout-nav-group-label">Administration</div>
                    
                    {/* Dashboard Link */}
                    <Link
                        to="/workspace"
                        className={`layout-nav-link${isActive('/workspace') ? ' actijirave' : ''}`}
                    >
                        <span className="layout-nav-icon"></span>
                        Dashboard
                        {isActive('/workspace') && <span className="layout-active-dot" />}
                    </Link>
                       <Link
                        to="/git"
                        className={`layout-nav-link${isActive('/git') ? ' actijirave' : ''}`}
                    >
                        <span className="layout-nav-icon"></span>
                       Git
                        {isActive('/git') && <span className="layout-active-dot" />}
                    </Link>
                    {/* Projects Link */}
                    <Link
                        to="/projects"
                        className={`layout-nav-link${isActive('/projects') ? ' active' : ''}`}
                    >
                        <span className="layout-nav-icon"></span>
                        Projects
                        {isActive('/projects') && <span className="layout-active-dot" />}
                    </Link>

                    {/* Onboard Members Link */}
                 

                    {/* Launch Project Link */}
                    <Link
                        to="/create-project"
                        className={`layout-nav-link${isActive('/create-project') ? ' active' : ''}`}
                    >
                        <span className="layout-nav-icon"></span>
                        Launch Project
                        {isActive('/create-project') && <span className="layout-active-dot" />}
                    </Link>

                    {/* Kanban Board Link */}
                 
                     <Link
                        to="/sprints"
                        className={`layout-nav-link${isActive('/sprints') ? ' actijirave' : ''}`}
                    >
                        <span className="layout-nav-icon"></span>
                        Sprints
                        {isActive('/sprints') && <span className="layout-active-dot" />}
                    </Link>

                      <Link
                        to='/agile-hub'
                        className={`layout-nav-link${isActive('/agile-hub') ? ' active' : ''}`}
                    >
                        <span className="layout-nav-icon"></span>
                       Agile
                        {isActive('/kanban') && <span className="layout-active-dot" />}
                    </Link>
                        <Link
                        to='/for-you'
                        className={`layout-nav-link${isActive('/for-you') ? ' active' : ''}`}
                    >
                        <span className="layout-nav-icon"></span>
                       ForYou
                        {isActive('/kanban') && <span className="layout-active-dot" />}
                    </Link>
                   
                </nav>

                {/* Footer */}
                <div className="layout-sidebar-footer">
                    <div className="layout-pk-badge">
                        <span>🇵🇰</span>
                        <span className="layout-pk-label">Government of Pakistan</span>
                    </div>
                </div>
            </aside>

            <div className="layout-gold-rule" />

            {/* ══ MAIN ══ */}
            <main className="layout-main-content">

                {/* Top Bar */}
                <div className="layout-top-bar">
                    <div className="layout-breadcrumb">
                        <span>Administration</span>
                    </div>
                    <div className="layout-top-pk-badge">
                        <span>🇵🇰</span>
                        <span className="layout-top-pk-label">پاکستان</span>
                    </div>
                </div>

                <div className="layout-page-body">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;