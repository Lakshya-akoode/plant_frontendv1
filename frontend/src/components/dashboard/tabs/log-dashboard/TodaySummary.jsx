'use client';

function formatTimeSince(dateStr) {
    if (!dateStr) return 'Never';
    const now = new Date();
    const past = new Date(dateStr);
    const diffMins = Math.floor((now - past) / 60000);
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
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
}

export default function TodaySummary({ stats = null, growthLogs = [], extractLogs = [], universalLogs = [], isCannabisUser = false }) {
    if (isCannabisUser) {
        const allLogs = [
            ...growthLogs.map(l => ({ ...l, type: 'growth' })),
            ...extractLogs.map(l => ({ ...l, type: 'extract' })),
        ];
        const todayAll = allLogs.filter(l => isToday(l.createdAt));
        const todayGrowth = todayAll.filter(l => l.type === 'growth').length;
        const todayExtract = todayAll.filter(l => l.type === 'extract').length;
        // Use only plant growth + extract count so totals match the breakdown and are consistent across browsers
        const todayCount = todayGrowth + todayExtract;
        const lastEntry = stats?.lastActivityAt != null ? stats.lastActivityAt : (() => {
            const sorted = [...allLogs].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
            return sorted[0]?.createdAt;
        })();

        return (
            <div className="dashboard-section">
                <div className="dashboard-section__heading">
                    <span className="dashboard-section__tag">TODAY</span>
                    <h3 className="dashboard-section__title">Today&apos;s Summary</h3>
                </div>
                <div className="today-summary-grid">
                    <div className="dashboard-stat-card" style={{ '--card-color': '#5b6af0' }}>
                        <div className="dashboard-stat-card__icon">📋</div>
                        <div className="dashboard-stat-card__body">
                            <div className="dashboard-stat-card__value">{todayCount}</div>
                            <div className="dashboard-stat-card__label">Entries Today</div>
                        </div>
                    </div>
                    <div className="dashboard-stat-card" style={{ '--card-color': '#10b981' }}>
                        <div className="dashboard-stat-card__icon">⏱️</div>
                        <div className="dashboard-stat-card__body">
                            <div className="dashboard-stat-card__value small">{formatTimeSince(lastEntry)}</div>
                            <div className="dashboard-stat-card__label">Last Entry</div>
                        </div>
                    </div>
                    <div className="dashboard-stat-card" style={{ '--card-color': '#28a745' }}>
                        <div className="dashboard-stat-card__icon">🌱</div>
                        <div className="dashboard-stat-card__body">
                            <div className="dashboard-stat-card__value">{todayGrowth}</div>
                            <div className="dashboard-stat-card__label">Plant Growth Today</div>
                        </div>
                    </div>
                    <div className="dashboard-stat-card" style={{ '--card-color': '#6f42c1' }}>
                        <div className="dashboard-stat-card__icon">💊</div>
                        <div className="dashboard-stat-card__body">
                            <div className="dashboard-stat-card__value">{todayExtract}</div>
                            <div className="dashboard-stat-card__label">Extract Use Today</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Non-cannabis: all from DB (stats) so both browsers show the same
    const todayCount = stats != null ? stats.todayCount : 0;
    const monthlyCount = stats != null ? stats.monthlyCount : 0;
    const lastEntry = stats?.lastActivityAt || null;
    const todayByCategory = stats?.todayByCategory || {};

    const LOG_META = {
        diet: { icon: '🥗', label: 'Diet Logs Today' },
        wellness: { icon: '💉', label: 'Wellness Logs Today' },
        lifestyle: { icon: '🏃', label: 'Lifestyle Logs Today' },
        parenting: { icon: '👨‍👩‍👧', label: 'Parenting Logs Today' },
        'plant-growth': { icon: '🌱', label: 'Growth Logs Today' },
        'plant-extract': { icon: '💊', label: 'Extract Logs Today' },
    };

    const categoryEntries = Object.entries(todayByCategory)
        .filter(([cat, n]) => cat !== 'other' && n > 0);
    const topTypes = categoryEntries.sort((a, b) => b[1] - a[1]).slice(0, 3);

    return (
        <div className="dashboard-section">
            <div className="dashboard-section__heading">
                <span className="dashboard-section__tag">TODAY</span>
                <h3 className="dashboard-section__title">Today&apos;s Summary</h3>
            </div>
            <div className="today-summary-grid">
                <div className="dashboard-stat-card" style={{ '--card-color': '#5b6af0' }}>
                    <div className="dashboard-stat-card__icon">📋</div>
                    <div className="dashboard-stat-card__body">
                        <div className="dashboard-stat-card__value">{todayCount}</div>
                        <div className="dashboard-stat-card__label">Total entries today</div>
                    </div>
                </div>
                <div className="dashboard-stat-card" style={{ '--card-color': '#10b981' }}>
                    <div className="dashboard-stat-card__icon">⏱️</div>
                    <div className="dashboard-stat-card__body">
                        <div className="dashboard-stat-card__value small">{formatTimeSince(lastEntry)}</div>
                        <div className="dashboard-stat-card__label">Last Entry</div>
                    </div>
                </div>
                {topTypes.map(([type, count]) => {
                    const meta = LOG_META[type] || { icon: '📋', label: `${type} Today` };
                    return (
                        <div key={type} className="dashboard-stat-card" style={{ '--card-color': '#ea580c' }}>
                            <div className="dashboard-stat-card__icon">{meta.icon}</div>
                            <div className="dashboard-stat-card__body">
                                <div className="dashboard-stat-card__value">{count}</div>
                                <div className="dashboard-stat-card__label">{meta.label}</div>
                            </div>
                        </div>
                    );
                })}
                <div className="dashboard-stat-card" style={{ '--card-color': '#ea580c' }}>
                    <div className="dashboard-stat-card__icon">📅</div>
                    <div className="dashboard-stat-card__body">
                        <div className="dashboard-stat-card__value">{monthlyCount}</div>
                        <div className="dashboard-stat-card__label">Total this month</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
