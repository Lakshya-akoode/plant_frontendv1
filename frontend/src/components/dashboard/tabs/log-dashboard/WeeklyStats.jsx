'use client';

function isThisWeek(dateStr) {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    const now = new Date();
    // Start of current week (Monday)
    const startOfWeek = new Date(now);
    const day = now.getDay(); // 0=Sun, 1=Mon...
    const diff = day === 0 ? -6 : 1 - day;
    startOfWeek.setDate(now.getDate() + diff);
    startOfWeek.setHours(0, 0, 0, 0);
    return d >= startOfWeek;
}

export default function WeeklyStats({ growthLogs = [], extractLogs = [] }) {
    const weekGrowth = growthLogs.filter(l => isThisWeek(l.createdAt)).length;
    const weekExtract = extractLogs.filter(l => isThisWeek(l.createdAt)).length;
    const weekTotal = weekGrowth + weekExtract;

    const cards = [
        {
            icon: '🌱',
            label: 'Plant Growth Logs This Week',
            value: weekGrowth,
            color: '#28a745',
            bg: 'rgba(40,167,69,0.08)',
        },
        {
            icon: '💊',
            label: 'Extract Use Logs This Week',
            value: weekExtract,
            color: '#6f42c1',
            bg: 'rgba(111,66,193,0.08)',
        },
        {
            icon: '📊',
            label: 'Total Logs This Week',
            value: weekTotal,
            color: '#5b6af0',
            bg: 'rgba(91,106,240,0.08)',
        },
    ];

    return (
        <div className="dashboard-section">
            <div className="dashboard-section__heading">
                <span className="dashboard-section__tag">WEEKLY</span>
                <h3 className="dashboard-section__title">Weekly Totals</h3>
            </div>
            <div className="weekly-stats-grid">
                {cards.map(c => (
                    <div
                        key={c.label}
                        className="weekly-stat-card"
                        style={{ '--wcard-color': c.color, '--wcard-bg': c.bg }}
                    >
                        <div className="weekly-stat-card__icon">{c.icon}</div>
                        <div className="weekly-stat-card__value">{c.value}</div>
                        <div className="weekly-stat-card__label">{c.label}</div>
                        <div className="weekly-stat-card__bar">
                            <div
                                className="weekly-stat-card__bar-fill"
                                style={{ width: `${Math.min(100, (c.value / Math.max(weekTotal, 1)) * 100)}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
