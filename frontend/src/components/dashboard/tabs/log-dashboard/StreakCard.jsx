'use client';

function computeStreak(dates) {
    const uniqueDays = [...new Set(
        dates.filter(Boolean).map(d => {
            const dt = new Date(d);
            return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
        })
    )].sort((a, b) => b > a ? 1 : -1);

    if (!uniqueDays.length) return { current: 0, longest: 0 };

    let current = 0;
    let cursor = new Date(); cursor.setHours(0, 0, 0, 0);
    for (const dayStr of uniqueDays) {
        const d = new Date(dayStr); d.setHours(0, 0, 0, 0);
        const diff = Math.round((cursor - d) / 86400000);
        if (diff === 0 || (current === 0 && diff === 1)) { current++; cursor = new Date(d); cursor.setDate(cursor.getDate() - 1); }
        else break;
    }

    let longest = 0, run = 0, prev = null;
    for (const dayStr of [...uniqueDays].reverse()) {
        const d = new Date(dayStr); d.setHours(0, 0, 0, 0);
        run = prev === null ? 1 : Math.round((d - prev) / 86400000) === 1 ? run + 1 : 1;
        longest = Math.max(longest, run);
        prev = d;
    }
    return { current, longest };
}

export default function StreakCard({ stats = null, growthLogs = [], extractLogs = [], universalLogs = [], isCannabisUser = false }) {
    const dates = isCannabisUser
        ? [...growthLogs.map(l => l.createdAt), ...extractLogs.map(l => l.createdAt)]
        : universalLogs.map(l => l.createdAt);

    const { current, longest } = stats != null
        ? { current: stats.currentStreak, longest: stats.longestStreak }
        : computeStreak(dates);

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    let daysLoggedThisMonth;
    if (stats != null && typeof stats.daysLoggedThisMonth === 'number') {
        daysLoggedThisMonth = stats.daysLoggedThisMonth;
    } else {
        daysLoggedThisMonth = new Set(
            dates.filter(d => d && new Date(d) >= monthStart).map(d => {
                const dt = new Date(d);
                return `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`;
            })
        ).size;
        if (stats != null && daysLoggedThisMonth === 0 && (stats.monthlyCount > 0 || stats.currentStreak > 0)) {
            daysLoggedThisMonth = Math.min(Math.max(1, stats.monthlyCount), 31);
        }
    }

    const streakProgress = longest > 0 ? Math.min(100, (current / longest) * 100) : 0;

    return (
        <div className="dashboard-section">
            <div className="dashboard-section__heading">
                <span className="dashboard-section__tag">CONSISTENCY</span>
                <h3 className="dashboard-section__title">Streak &amp; Consistency</h3>
            </div>
            <div className="streak-grid">
                <div className="streak-card streak-card--current">
                    <div className="streak-card__emoji">🔥</div>
                    <div className="streak-card__value">{current}</div>
                    <div className="streak-card__label">Current Streak</div>
                    <div className="streak-card__sub">consecutive day{current !== 1 ? 's' : ''}</div>
                    <div className="streak-progress">
                        <div className="streak-progress__fill" style={{ width: `${streakProgress}%`, backgroundColor: '#f97316' }} />
                    </div>
                    <div className="streak-card__hint">
                        {current === 0 ? 'Log today to start your streak!'
                            : current === longest ? '🏆 New personal best!'
                                : `${longest - current} more to beat your record`}
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
                    <div className="streak-card__value">{daysLoggedThisMonth}</div>
                    <div className="streak-card__label">Days Logged</div>
                    <div className="streak-card__sub">this month</div>
                </div>
            </div>
        </div>
    );
}
