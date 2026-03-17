'use client';

function isThisWeek(dateStr) {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    const now = new Date();
    const start = new Date(now);
    const day = now.getDay();
    start.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
    start.setHours(0, 0, 0, 0);
    return d >= start;
}

const LOG_META = {
    diet: { icon: '🥗', label: 'Diet Logs This Week', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
    wellness: { icon: '💉', label: 'Wellness Logs This Week', color: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
    lifestyle: { icon: '🏃', label: 'Activity Logs This Week', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
    parenting: { icon: '👨‍👩‍👧', label: 'Parenting Logs This Week', color: '#ec4899', bg: 'rgba(236,72,153,0.08)' },
    'plant-growth': { icon: '🌱', label: 'Growth Logs This Week', color: '#28a745', bg: 'rgba(40,167,69,0.08)' },
    'plant-extract': { icon: '💊', label: 'Extract Logs This Week', color: '#6f42c1', bg: 'rgba(111,66,193,0.08)' },
};

export default function WeeklyStats({ stats = null, growthLogs = [], extractLogs = [], universalLogs = [], isCannabisUser = false }) {
    if (isCannabisUser) {
        const weekGrowth = growthLogs.filter(l => isThisWeek(l.createdAt)).length;
        const weekExtract = extractLogs.filter(l => isThisWeek(l.createdAt)).length;
        const weekTotal = stats != null ? stats.weeklyCount : weekGrowth + weekExtract;

        const cards = [
            { icon: '🌱', label: 'Plant Growth Logs This Week', value: weekGrowth, color: '#28a745', bg: 'rgba(40,167,69,0.08)' },
            { icon: '💊', label: 'Extract Use Logs This Week', value: weekExtract, color: '#6f42c1', bg: 'rgba(111,66,193,0.08)' },
            { icon: '📊', label: 'Total Logs This Week', value: weekTotal, color: '#5b6af0', bg: 'rgba(91,106,240,0.08)' },
        ];

        return (
            <div className="dashboard-section">
                <div className="dashboard-section__heading">
                    <span className="dashboard-section__tag">WEEKLY</span>
                    <h3 className="dashboard-section__title">Weekly Totals</h3>
                </div>
                <div className="weekly-stats-grid">
                    {cards.map(c => (
                        <div key={c.label} className="weekly-stat-card" style={{ '--wcard-color': c.color, '--wcard-bg': c.bg }}>
                            <div className="weekly-stat-card__icon">{c.icon}</div>
                            <div className="weekly-stat-card__value">{c.value}</div>
                            <div className="weekly-stat-card__label">{c.label}</div>
                            <div className="weekly-stat-card__bar">
                                <div className="weekly-stat-card__bar-fill" style={{ width: `${Math.min(100, (c.value / Math.max(weekTotal, 1)) * 100)}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Non-cannabis: use API stats when available
    const weekLogs = universalLogs.filter(l => isThisWeek(l.createdAt));
    const weekTotal = stats != null ? stats.weeklyCount : weekLogs.length;
    const byType = {};
    weekLogs.forEach(l => { byType[l.type] = (byType[l.type] || 0) + 1; });
    const typeEntries = Object.entries(byType);

    // Always show at least 3 cards; pad with "total" if fewer categories
    const cards = typeEntries.map(([type, count]) => {
        const meta = LOG_META[type] || { icon: '📋', label: `${type} Logs This Week`, color: '#5b6af0', bg: 'rgba(91,106,240,0.08)' };
        return { ...meta, value: count };
    });

    if (cards.length === 0) {
        cards.push({ icon: '📊', label: 'Total Logs This Week', value: 0, color: '#5b6af0', bg: 'rgba(91,106,240,0.08)' });
    }

    // Append total card
    cards.push({ icon: '📊', label: 'Total Logs This Week', value: weekTotal, color: '#5b6af0', bg: 'rgba(91,106,240,0.08)' });

    return (
        <div className="dashboard-section">
            <div className="dashboard-section__heading">
                <span className="dashboard-section__tag">WEEKLY</span>
                <h3 className="dashboard-section__title">Weekly Totals</h3>
            </div>
            <div className="weekly-stats-grid">
                {cards.map((c, i) => (
                    <div key={i} className="weekly-stat-card" style={{ '--wcard-color': c.color, '--wcard-bg': c.bg }}>
                        <div className="weekly-stat-card__icon">{c.icon}</div>
                        <div className="weekly-stat-card__value">{c.value}</div>
                        <div className="weekly-stat-card__label">{c.label}</div>
                        <div className="weekly-stat-card__bar">
                            <div className="weekly-stat-card__bar-fill" style={{ width: `${Math.min(100, (c.value / Math.max(weekTotal, 1)) * 100)}%` }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
