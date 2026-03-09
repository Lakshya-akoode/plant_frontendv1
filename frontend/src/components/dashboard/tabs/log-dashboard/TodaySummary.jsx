'use client';

function formatTimeSince(dateStr) {
    if (!dateStr) return 'Never';
    const now = new Date();
    const past = new Date(dateStr);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs} hour${diffHrs !== 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHrs / 24);
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
}

function isToday(dateStr) {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    const now = new Date();
    return (
        d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate()
    );
}

export default function TodaySummary({ growthLogs = [], extractLogs = [] }) {
    const allLogs = [
        ...growthLogs.map(l => ({ ...l, type: 'growth' })),
        ...extractLogs.map(l => ({ ...l, type: 'extract' })),
    ];

    const todayAll = allLogs.filter(l => isToday(l.createdAt));
    const todayGrowth = todayAll.filter(l => l.type === 'growth').length;
    const todayExtract = todayAll.filter(l => l.type === 'extract').length;
    const todayTotal = todayAll.length;

    // Last entry across both types
    const sorted = [...allLogs].sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );
    const lastEntry = sorted[0]?.createdAt;

    const stats = [
        {
            icon: '📋',
            label: 'Entries Today',
            value: todayTotal,
            color: '#5b6af0',
        },
        {
            icon: '⏱️',
            label: 'Last Entry',
            value: formatTimeSince(lastEntry),
            color: '#10b981',
            small: true,
        },
        {
            icon: '🌱',
            label: 'Plant Growth Today',
            value: todayGrowth,
            color: '#28a745',
        },
        {
            icon: '💊',
            label: 'Extract Use Today',
            value: todayExtract,
            color: '#6f42c1',
        },
    ];

    return (
        <div className="dashboard-section">
            <div className="dashboard-section__heading">
                <span className="dashboard-section__tag">TODAY</span>
                <h3 className="dashboard-section__title">Today&apos;s Summary</h3>
            </div>
            <div className="today-summary-grid">
                {stats.map(s => (
                    <div key={s.label} className="dashboard-stat-card" style={{ '--card-color': s.color }}>
                        <div className="dashboard-stat-card__icon">{s.icon}</div>
                        <div className="dashboard-stat-card__body">
                            <div className={`dashboard-stat-card__value ${s.small ? 'small' : ''}`}>
                                {s.value}
                            </div>
                            <div className="dashboard-stat-card__label">{s.label}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
