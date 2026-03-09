'use client';

/**
 * GenericDashboard — shown to non-cannabis users (diet / wellness / lifestyle / parenting)
 * Uses the universal log cache to compute today summary, streak, and insights.
 */

const LOG_LABELS = {
    diet: { icon: '🥗', label: 'Diet' },
    wellness: { icon: '💉', label: 'Wellness' },
    lifestyle: { icon: '🏃', label: 'Lifestyle' },
    parenting: { icon: '👨‍👩‍👧', label: 'Parenting' },
    'plant-growth': { icon: '🌱', label: 'Plant Growth' },
    'plant-extract': { icon: '💊', label: 'Extract' },
};

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

function computeStreak(allDates) {
    const uniqueDays = [
        ...new Set(
            allDates
                .filter(Boolean)
                .map(d => {
                    const dt = new Date(d);
                    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
                })
        ),
    ].sort((a, b) => (b > a ? 1 : -1));

    if (!uniqueDays.length) return { current: 0, longest: 0 };

    let current = 0;
    let cursor = new Date();
    cursor.setHours(0, 0, 0, 0);

    for (const dayStr of uniqueDays) {
        const d = new Date(dayStr);
        d.setHours(0, 0, 0, 0);
        const diff = Math.round((cursor - d) / 86400000);
        if (diff === 0 || (current === 0 && diff === 1)) {
            current++;
            cursor = new Date(d);
            cursor.setDate(cursor.getDate() - 1);
        } else break;
    }

    const sortedAsc = [...uniqueDays].reverse();
    let longest = 0, run = 0;
    let prev = null;
    for (const dayStr of sortedAsc) {
        const d = new Date(dayStr);
        d.setHours(0, 0, 0, 0);
        run = prev === null ? 1 : Math.round((d - prev) / 86400000) === 1 ? run + 1 : 1;
        longest = Math.max(longest, run);
        prev = d;
    }

    return { current, longest };
}

export default function GenericDashboard({ universalLogs = [] }) {
    const todayLogs = universalLogs.filter(l => isToday(l.createdAt));
    const weekLogs = universalLogs.filter(l => isThisWeek(l.createdAt));

    const sorted = [...universalLogs].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    const lastEntry = sorted[0]?.createdAt;

    // Counts by type today
    const todayByType = {};
    todayLogs.forEach(l => {
        todayByType[l.type] = (todayByType[l.type] || 0) + 1;
    });

    // Week counts by type
    const weekByType = {};
    weekLogs.forEach(l => {
        weekByType[l.type] = (weekByType[l.type] || 0) + 1;
    });

    const { current: currentStreak, longest } = computeStreak(universalLogs.map(l => l.createdAt));

    // Month days
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthDays = new Set(
        universalLogs
            .filter(l => l.createdAt && new Date(l.createdAt) >= monthStart)
            .map(l => {
                const d = new Date(l.createdAt);
                return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
            })
    ).size;

    // Insights
    const insights = [];
    if (currentStreak >= 3) {
        insights.push({ icon: '🔥', text: `You're on a ${currentStreak}-day logging streak!`, type: 'positive' });
    } else if (currentStreak === 0) {
        insights.push({ icon: '💡', text: 'Log today to start a new streak and build consistency.', type: 'info' });
    }

    if (todayLogs.length === 0) {
        insights.push({ icon: '⏰', text: "You haven't logged anything yet today. Tap a form below to get started!", type: 'reminder' });
    } else {
        insights.push({ icon: '✅', text: `Great job — you've already logged ${todayLogs.length} entr${todayLogs.length === 1 ? 'y' : 'ies'} today!`, type: 'positive' });
    }

    const topType = Object.entries(weekByType).sort((a, b) => b[1] - a[1])[0];
    if (topType) {
        const meta = LOG_LABELS[topType[0]] || { icon: '📋', label: topType[0] };
        insights.push({
            icon: meta.icon,
            text: `Your most active category this week: ${meta.label} (${topType[1]} entr${topType[1] === 1 ? 'y' : 'ies'}).`,
            type: 'info',
        });
    }

    if (insights.length === 0) {
        insights.push({ icon: '🌿', text: 'Start logging to unlock personalized insights.', type: 'info' });
    }

    return (
        <>
            {/* Today Summary */}
            <div className="dashboard-section">
                <div className="dashboard-section__heading">
                    <span className="dashboard-section__tag">TODAY</span>
                    <h3 className="dashboard-section__title">Today&apos;s Summary</h3>
                </div>
                <div className="today-summary-grid">
                    <div className="dashboard-stat-card" style={{ '--card-color': '#5b6af0' }}>
                        <div className="dashboard-stat-card__icon">📋</div>
                        <div className="dashboard-stat-card__body">
                            <div className="dashboard-stat-card__value">{todayLogs.length}</div>
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
                    <div className="dashboard-stat-card" style={{ '--card-color': '#f59e0b' }}>
                        <div className="dashboard-stat-card__icon">📅</div>
                        <div className="dashboard-stat-card__body">
                            <div className="dashboard-stat-card__value">{weekLogs.length}</div>
                            <div className="dashboard-stat-card__label">This Week</div>
                        </div>
                    </div>
                    <div className="dashboard-stat-card" style={{ '--card-color': '#ea580c' }}>
                        <div className="dashboard-stat-card__icon">🔥</div>
                        <div className="dashboard-stat-card__body">
                            <div className="dashboard-stat-card__value">{currentStreak}</div>
                            <div className="dashboard-stat-card__label">Day Streak</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Weekly Breakdown by type */}
            {Object.keys(weekByType).length > 0 && (
                <div className="dashboard-section">
                    <div className="dashboard-section__heading">
                        <span className="dashboard-section__tag">WEEKLY</span>
                        <h3 className="dashboard-section__title">Weekly Log Breakdown</h3>
                    </div>
                    <div className="weekly-stats-grid">
                        {Object.entries(weekByType).map(([type, count]) => {
                            const meta = LOG_LABELS[type] || { icon: '📋', label: type };
                            return (
                                <div key={type} className="weekly-stat-card" style={{ '--wcard-color': '#5b6af0', '--wcard-bg': 'rgba(91,106,240,0.08)' }}>
                                    <div className="weekly-stat-card__icon">{meta.icon}</div>
                                    <div className="weekly-stat-card__value">{count}</div>
                                    <div className="weekly-stat-card__label">{meta.label} Logs This Week</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Streak */}
            <div className="dashboard-section">
                <div className="dashboard-section__heading">
                    <span className="dashboard-section__tag">CONSISTENCY</span>
                    <h3 className="dashboard-section__title">Streak &amp; Consistency</h3>
                </div>
                <div className="streak-grid">
                    <div className="streak-card streak-card--current">
                        <div className="streak-card__emoji">🔥</div>
                        <div className="streak-card__value">{currentStreak}</div>
                        <div className="streak-card__label">Current Streak</div>
                        <div className="streak-card__sub">consecutive day{currentStreak !== 1 ? 's' : ''}</div>
                        <div className="streak-progress">
                            <div className="streak-progress__fill" style={{ width: `${longest > 0 ? Math.min(100, (currentStreak / longest) * 100) : 0}%`, backgroundColor: '#f97316' }} />
                        </div>
                        <div className="streak-card__hint">
                            {currentStreak === 0 ? 'Log today to start your streak!' : currentStreak === longest ? '🏆 Personal best!' : `${longest - currentStreak} more to beat your record`}
                        </div>
                    </div>
                    <div className="streak-card streak-card--longest">
                        <div className="streak-card__emoji">🏆</div>
                        <div className="streak-card__value">{longest}</div>
                        <div className="streak-card__label">Longest Streak</div>
                        <div className="streak-card__sub">personal best</div>
                    </div>
                    <div className="streak-card streak-card--month">
                        <div className="streak-card__emoji">📅</div>
                        <div className="streak-card__value">{monthDays}</div>
                        <div className="streak-card__label">Days Logged</div>
                        <div className="streak-card__sub">this month</div>
                    </div>
                </div>
            </div>

            {/* Insights */}
            <div className="dashboard-section">
                <div className="dashboard-section__heading">
                    <span className="dashboard-section__tag">INSIGHTS</span>
                    <h3 className="dashboard-section__title">Automatic Insights</h3>
                </div>
                <div className="insights-panel">
                    {insights.map((ins, i) => (
                        <div key={i} className={`insight-item insight-item--${ins.type}`}>
                            <span className="insight-item__icon">{ins.icon}</span>
                            <span className="insight-item__text">{ins.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
