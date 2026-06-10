// frontend/src/pages/CreateOrgLanding.jsx
import React, { useState } from 'react';
import bgAsset from './bg.jpg';
import { useNavigate } from 'react-router-dom';

const CH_DEEP        = '#2A2620';
const CH_MID         = '#3D3830';
const CH_SURFACE     = '#4A4540';
const CH_LIGHT       = '#F7F6F4';
const CH_WARM_WHITE  = '#FDFCFB';
const CH_BORDER      = 'rgba(42,38,32,0.12)';
const CH_BORDER_MID  = 'rgba(42,38,32,0.22)';
const GOLD           = '#BF9530';
const GOLD_HOVER     = '#D4AA40';
const GOLD_LIGHT     = '#F7EED0';
const GOLD_BORDER    = 'rgba(191,149,48,0.35)';
const GOLD_MUTED     = 'rgba(191,149,48,0.10)';
const WHITE          = '#FFFFFF';
const TEXT_PRIMARY   = '#1C1A14';
const TEXT_MUTED     = '#5C5444';
const TEXT_FAINT     = 'rgba(28,26,20,0.38)';

const CreateOrgLanding = () => {
    const [activeAction, setActiveAction]   = useState('create');
    const [orgName, setOrgName]             = useState('');
    const [error, setError]                 = useState('');
    const [success, setSuccess]             = useState('');
    const [loading, setLoading]             = useState(false);
    const [inputFocused, setInputFocused]   = useState(false);
    const [hoveredCard, setHoveredCard]     = useState(null);
    const [btnHover, setBtnHover]           = useState(false);
    const [btnActive, setBtnActive]         = useState(false);
    const [avatarHovered, setAvatarHovered] = useState(false);

    const navigate = useNavigate();

    const handleSelectAction = (action) => {
        setActiveAction(action);
        setError(''); 
        setSuccess(''); 
        setOrgName('');
    };

    // Simulated Frontend-Only Workspace Creation
    const handleCreateOrg = async (e) => {
        e.preventDefault();
        setError(''); 
        setSuccess(''); 
        setLoading(true);

        try {
            // Simulate network processing lag
            await new Promise((resolve) => setTimeout(resolve, 1200));
            
            const fakeOrgId = Math.floor(Math.random() * 90000) + 10000;
            setSuccess(`Workspace "${orgName}" initialized successfully.`);
            
            setTimeout(() => {
                navigate(`/register?orgId=${fakeOrgId}`);
            }, 1200);
        } catch (err) {
            setError('Failed to initialize organization.');
        } finally {
            setLoading(false);
        }
    };

    // Simulated Frontend-Only Workspace Verification
    const handleFindOrg = async (e) => {
        e.preventDefault();
        setError(''); 
        setSuccess(''); 
        setLoading(true);

        try {
            // Simulate network processing lag
            await new Promise((resolve) => setTimeout(resolve, 1200));
            
            // Demo Rule: Simulate a missing workspace error if user inputs "error"
            if (orgName.toLowerCase() === 'error') {
                throw new Error('Workspace cluster not found on this domain.');
            }

            setSuccess('Workspace verified! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 1200);
        } catch (err) {
            setError(err.message || 'Workspace not found.');
        } finally {
            setLoading(false);
        }
    };

    const userName     = 'Salman Umer';
    const userInitials = userName.split(' ').map(w => w[0]).join('').toUpperCase();

    /* ── Dynamic button styles ── */
    const btnBg = loading
        ? CH_MID
        : btnActive
        ? CH_SURFACE
        : btnHover
        ? CH_MID
        : CH_DEEP;
    const btnShadow = btnHover && !btnActive
        ? '0 6px 18px rgba(42,38,32,0.32)'
        : '0 3px 10px rgba(42,38,32,0.18)';
    const btnTransform = btnActive
        ? 'scale(0.985)'
        : btnHover
        ? 'translateY(-1px)'
        : 'none';

    /* ── Dynamic input styles ── */
    const inputBorder = inputFocused
        ? `1.5px solid ${GOLD}`
        : orgName
        ? `1.5px solid ${CH_BORDER_MID}`
        : `1.5px solid ${CH_BORDER}`;
    const inputShadow = inputFocused
        ? `0 0 0 4px rgba(191,149,48,0.10)`
        : 'none';

    return (
        <div style={S.pageShell}>

            {/* ══ HEADER ══ */}
            <header style={S.header}>
                <div style={S.headerLeft}>
                    <div style={S.headerEmblem}>
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                            <path d="M15 12a6 6 0 1 1-6-6 4.8 4.8 0 1 0 6 6z" fill={GOLD}/>
                            <path d="M14.5 8l1.1.85-.42 1.3 1.05-.85 1.05.85-.42-1.3 1.1-.85h-1.3l-.43-1.3-.43 1.3z" fill={GOLD}/>
                        </svg>
                    </div>
                    <div>
                        <div style={S.headerBrand}>IMS</div>
                        <div style={S.headerSysId}>
                            GOV-SYS · ID&nbsp;
                            <span style={S.idBadge}>PKG-2026-001</span>
                        </div>
                    </div>
                </div>

                <div style={S.headerRule} />

                <div
                    style={{
                        ...S.userChip,
                        background: avatarHovered
                            ? 'rgba(42,38,32,0.06)'
                            : 'transparent',
                    }}
                    onMouseEnter={() => setAvatarHovered(true)}
                    onMouseLeave={() => setAvatarHovered(false)}
                >
                    <div style={S.avatarRing}>
                        <div style={S.avatar}>{userInitials}</div>
                    </div>
                    <div>
                        <div style={S.headerUserName}>{userName}</div>
                        <div style={S.headerUserRole}>System Administrator</div>
                    </div>
                    <div style={S.onlineDot} />
                </div>
            </header>

            {/* Gold + charcoal underline */}
            <div style={S.headerStripe} />

            {/* ══ MAIN ══ */}
            <main style={S.main}>
               
                <div style={S.card}>

                    {/* Top accent */}
                    <div style={S.topAccent} />

                    {/* Heading */}
                    <div style={S.headingBlock}>
                      <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
                            <path d="M15 12a6 6 0 1 1-6-6 4.8 4.8 0 1 0 6 6z" fill={GOLD}/>
                            <path d="M14.5 8l1.1.85-.42 1.3 1.05-.85 1.05.85-.42-1.3 1.1-.85h-1.3l-.43-1.3-.43 1.3z" fill={GOLD}/>
                        </svg>
                        <h2 style={S.title}>   Interlink Management System</h2>
                        <p style={S.subtitle}>
                            Select an action below to manage your central project clusters or deploy a new secure environment.
                        </p>
                    </div>

                    {/* Action cards */}
                    <div style={S.cardsGrid}>
                        {[
                            { key: 'create', label: 'New Organization',  desc: 'Initialize a clean, dedicated workspace instance.' },
                            { key: 'find',   label: 'Find Existing',      desc: 'Search and authenticate into a running cluster.'   },
                        ].map(({ key, label, desc }) => {
                            const active  = activeAction === key;
                            const hovered = hoveredCard === key;
                            return (
                                <div
                                    key={key}
                                    onClick={() => handleSelectAction(key)}
                                    onMouseEnter={() => setHoveredCard(key)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    style={{
                                        ...S.actionCard,
                                        border: active
                                            ? `2px solid ${CH_DEEP}`
                                            : hovered
                                            ? `2px solid ${GOLD}`
                                            : `2px solid ${CH_BORDER}`,
                                        background: active
                                            ? CH_LIGHT
                                            : WHITE,
                                        transform: active || hovered
                                            ? 'translateY(-3px)'
                                            : 'translateY(0)',
                                        boxShadow: active
                                            ? `0 10px 24px rgba(42,38,32,0.10), inset 0 1px 0 rgba(191,149,48,0.15)`
                                            : hovered
                                            ? `0 8px 20px rgba(191,149,48,0.14)`
                                            : '0 2px 8px rgba(42,38,32,0.04)',
                                    }}
                                >
                                    {/* Left gold accent bar when active */}
                                    {active && (
                                        <div style={{
                                            position: 'absolute',
                                            left: 0, top: 0, bottom: 0,
                                            width: '3px',
                                            background: GOLD,
                                            borderRadius: '12px 0 0 12px',
                                        }} />
                                    )}
                                    <div style={S.cardContent}>
                                        <h4 style={{ ...S.cardTitle, color: active ? CH_DEEP : TEXT_PRIMARY }}>
                                            {label}
                                        </h4>
                                        <p style={S.cardDesc}>{desc}</p>
                                    </div>
                                    <div style={{
                                        ...S.radioOuter,
                                        borderColor: active ? CH_DEEP : '#C8C0B4',
                                        background: active ? 'rgba(42,38,32,0.04)' : WHITE,
                                    }}>
                                        {active && <div style={S.radioInner} />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Form panel */}
                    <div style={S.formPanel}>
                        {/* Panel header strip */}
                        <div style={S.panelStrip}>
                            <span style={S.panelStripLabel}>
                                {activeAction === 'create'
                                    ? '— Initialize new workspace —'
                                    : '— Locate existing workspace —'}
                            </span>
                        </div>

                        <form
                            onSubmit={activeAction === 'create' ? handleCreateOrg : handleFindOrg}
                            style={S.form}
                        >
                            {error && (
                                <div style={S.msgError}>
                                    <span>⚠</span><span>{error}</span>
                                </div>
                            )}
                            {success && (
                                <div style={S.msgSuccess}>
                                    <span>✓</span><span>{success}</span>
                                </div>
                            )}

                            <label style={S.label}>
                                {activeAction === 'create'
                                    ? <>Organization Name <span style={{ color: GOLD }}>*</span></>
                                    : <>Registered Organization Name <span style={{ color: GOLD }}>*</span></>
                                }
                            </label>

                            <input
                                type="text"
                                value={orgName}
                                onChange={(e) => setOrgName(e.target.value)}
                                onFocus={() => setInputFocused(true)}
                                onBlur={() => setInputFocused(false)}
                                placeholder={
                                    activeAction === 'create'
                                        ? 'e.g., National Health Logistics, NADRA'
                                        : 'e.g., national-health-logistics (Type "error" to test failure state)'
                                }
                                required
                                style={{
                                    ...S.input,
                                    border: inputBorder,
                                    boxShadow: inputShadow,
                                    background: inputFocused ? WHITE : orgName ? '#FDFCFB' : WHITE,
                                }}
                            />

                            <p style={S.inputHint}>
                                {activeAction === 'create'
                                    ? 'A unique URL slug will be auto-generated for this workspace.'
                                    : 'Enter the exact registered name to verify access.'}
                            </p>

                            <button
                                type="submit"
                                disabled={loading}
                                onMouseEnter={() => !loading && setBtnHover(true)}
                                onMouseLeave={() => { setBtnHover(false); setBtnActive(false); }}
                                onMouseDown={() => !loading && setBtnActive(true)}
                                onMouseUp={() => setBtnActive(false)}
                                style={{
                                    ...S.submitBtn,
                                    background: btnBg,
                                    transform: btnTransform,
                                    boxShadow: btnShadow,
                                    opacity: loading ? 0.7 : 1,
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                }}
                            >
                                {loading ? (
                                    <span style={S.loadingFlex}>
                                        <span style={S.spinner} />
                                        Configuring Environment...
                                    </span>
                                ) : activeAction === 'create'
                                    ? 'Create Organization'
                                    : 'Verify & Enter Workspace'
                                }
                            </button>
                        </form>
                    </div>

                </div>
            </main>

            {/* ══ FOOTER ══ */}
            <footer style={S.footer}>
                <span style={{ width: '140px' }} />
                <p style={S.footerCopy}>
                    &copy; 2026 Government of Pakistan &mdash; All Rights Reserved
                    &nbsp;&bull;&nbsp; ProjectFlow Enterprise Portal
                </p>
                <span style={S.footerBadge}>OFFICIAL USE ONLY</span>
            </footer>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

const S = {
    pageShell: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: `radial-gradient(ellipse at 30% 20%, rgba(191,149,48,0.05) 0%, transparent 50%),
                     radial-gradient(ellipse at 70% 80%, rgba(42,38,32,0.06) 0%, transparent 50%),
                     #F7F6F4`,
        fontFamily: "'Segoe UI', Arial, sans-serif",
    },

    /* Header */
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '74px',
        padding: '0 28px',
        background: WHITE,
        borderBottom: `1px solid ${CH_BORDER}`,
        boxShadow: '0 1px 4px rgba(42,38,32,0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        flexShrink: 0,
    },
    headerLeft: {
        display: 'flex', alignItems: 'center', gap: '12px',
    },
    headerEmblem: {
        width: '60px', height: '60px',
        borderRadius: '50%',
        background: CH_DEEP,
        border: `1.5px solid ${GOLD_BORDER}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
    },
    headerBrand: {
        fontSize: '20px',
        fontWeight: '700',
        color: TEXT_PRIMARY,
        letterSpacing: '-0.2px',
        lineHeight: 1,
    },
    headerSysId: {
        fontSize: '15px',
        color: TEXT_FAINT,
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        marginTop: '3px',
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    idBadge: {
        background: GOLD_MUTED,
        border: `1px solid ${GOLD_BORDER}`,
        color: '#7A5800',
        borderRadius: '4px',
        padding: '1px 5px',
        fontSize: '13px',
        fontWeight: '600',
        letterSpacing: '0.4px',
    },
    headerRule: {
        flex: 1,
        height: '1px',
        margin: '0 28px',
        background: `linear-gradient(90deg, transparent, rgba(191,149,48,0.2), transparent)`,
    },
    userChip: {
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '6px 12px 6px 6px',
        borderRadius: '40px',
        border: `1px solid ${CH_BORDER}`,
        cursor: 'pointer',
        transition: 'background 0.2s ease',
        position: 'relative',
    },
    avatarRing: {
        padding: '4px',
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${CH_MID} 0%, ${GOLD} 100%)`,
        flexShrink: 0,
    },
    avatar: {
        width: '40px', height: '40px',
        borderRadius: '50%',
        background: CH_DEEP,
        border: `2px solid ${WHITE}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '11px', fontWeight: '700',
        color: GOLD,
        letterSpacing: '0.5px',
    },
    headerUserName: {
        fontSize: '17px', fontWeight: '600',
        color: TEXT_PRIMARY, lineHeight: 1,
    },
    headerUserRole: {
        fontSize: '13px', color: TEXT_MUTED,
        lineHeight: 1, marginTop: '2px',
    },
    onlineDot: {
        position: 'absolute', top: '7px', right: '9px',
        width: '7px', height: '7px',
        borderRadius: '50%',
        background: '#22C55E',
        border: `1.5px solid ${WHITE}`,
    },
    headerStripe: {
        height: '5px',
        background: `linear-gradient(90deg, ${CH_DEEP} 0%, ${GOLD} 45%, ${CH_DEEP} 100%)`,
        flexShrink: 0,
    },

    /* Main */
    main: {
        flex: 1,
        display: 'flex',
        background:`linear-gradient(90deg, #F7EED0 0%, White 50%, #F7EED0 75%)`,
        // background: '#F7EED0',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 24px',
        
        
        /* 1. Establish positioning context for the background element */

     
    },
    card: {
        position: 'relative',
        width: '100%',
        maxWidth: '820px',
        background: WHITE,
        borderRadius: '16px',
        border: `1px solid ${CH_BORDER}`,
        boxShadow: '0 4px 12px rgba(42,38,32,0.06), 0 20px 48px rgba(42,38,32,0.08)',
        overflow: 'hidden',
        padding: '44px 40px 36px',
        position: 'relative',
        overflow: 'hidden',
        
        
        /* CORRECTED LINE: Uses backticks (``) so React can read the bgAsset variable */
        backgroundImage: `linear-gradient( rgba(255, 255, 255, 0.9)), url(${bgAsset})`,
        
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    topAccent: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${CH_DEEP} 0%, ${GOLD} 50%, ${CH_DEEP} 100%)`,
    },
    headingBlock: {
        textAlign: 'center',
        marginBottom: '32px',
    },
    title: {
        fontSize: '22px',
        fontWeight: '700',
        color: TEXT_PRIMARY,
        letterSpacing: '-0.4px',
        margin: '0 0 10px 0',
        fontFamily: 'Georgia, serif',
    },
    subtitle: {
        fontSize: '13.5px',
        color: TEXT_MUTED,
        lineHeight: '1.6',
        margin: 0,
    },

    /* Action cards */
    cardsGrid: {
        display: 'flex',
        gap: '14px',
        marginBottom: '24px',
    },
    actionCard: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '18px 16px',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
        position: 'relative',
        overflow: 'hidden',
    },
    cardContent: { flex: 1, paddingRight: '12px' },
    cardTitle: {
        fontSize: '14px', fontWeight: '600',
        margin: '0 0 4px 0',
    },
    cardDesc: {
        fontSize: '12px', lineHeight: '1.45',
        color: TEXT_MUTED, margin: 0,
    },
    radioOuter: {
        width: '18px', height: '18px',
        borderRadius: '50%',
        border: '2px solid #C8C0B4',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 0.18s ease',
    },
    radioInner: {
        width: '10px', height: '10px',
        borderRadius: '50%',
        background: CH_DEEP,
    },

    /* Form panel */
    formPanel: {
        background: CH_LIGHT,
        border: `1px solid ${CH_BORDER}`,
        borderRadius: '10px',
        overflow: 'hidden',
    },
    panelStrip: {
        background: `linear-gradient(90deg, ${CH_DEEP}, ${CH_MID})`,
        padding: '8px 20px',
        display: 'flex',
        alignItems: 'center',
    },
    panelStripLabel: {
        fontSize: '10px',
        fontWeight: '600',
        color: `rgba(191,149,48,0.75)`,
        letterSpacing: '1.2px',
        textTransform: 'uppercase',
    },
    form: {
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        display: 'block',
        fontSize: '11px',
        fontWeight: '600',
        color: TEXT_PRIMARY,
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        marginBottom: '8px',
    },
    input: {
        width: '100%',
        padding: '11px 14px',
        borderRadius: '8px',
        fontSize: '14px',
        fontFamily: "'Segoe UI', Arial, sans-serif",
        color: TEXT_PRIMARY,
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
    },
    inputHint: {
        fontSize: '11px',
        color: TEXT_MUTED,
        marginTop: '6px',
        marginBottom: '20px',
    },
    submitBtn: {
        width: '100%',
        padding: '13px',
        color: WHITE,
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        fontFamily: "'Segoe UI', Arial, sans-serif",
        letterSpacing: '0.2px',
        transition: 'all 0.15s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        outline: 'none',
    },
    loadingFlex: {
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: '8px',
    },
    spinner: {
        display: 'inline-block',
        width: '14px', height: '14px',
        border: '2px solid rgba(255,255,255,0.25)',
        borderTopColor: WHITE,
        borderRadius: '50%',
        animation: 'spin 0.65s linear infinite',
    },
    msgSuccess: {
        display: 'flex', alignItems: 'flex-start', gap: '10px',
        padding: '11px 14px',
        background: GOLD_LIGHT,
        border: `1px solid ${GOLD_BORDER}`,
        borderRadius: '8px',
        fontSize: '13px', fontWeight: '500',
        color: '#7A5800',
        marginBottom: '18px',
    },
    msgError: {
        display: 'flex', alignItems: 'flex-start', gap: '10px',
        padding: '11px 14px',
        background: '#FDF3F3',
        border: '1px solid rgba(200,40,40,0.12)',
        borderRadius: '8px',
        fontSize: '13px', fontWeight: '500',
        color: '#C92A2A',
        marginBottom: '18px',
    },

    /* Footer */
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        padding: '0 28px',
        background: WHITE,
        borderTop: `1px solid ${CH_BORDER}`,
        flexShrink: 0,
    },
    footerCopy: {
        fontSize: '11px',
        color: TEXT_FAINT,
        margin: 0,
        flex: 1,
        textAlign: 'center',
        letterSpacing: '0.1px',
    },
    footerBadge: {
        fontSize: '9px',
        fontWeight: '700',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        color: '#7A5800',
        background: GOLD_MUTED,
        border: `1px solid ${GOLD_BORDER}`,
        borderRadius: '4px',
        padding: '3px 8px',
        width: '140px',
        textAlign: 'center',
    },
};

export default CreateOrgLanding;