'use client';

function getDateOnly(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function getMonthStart() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
}

function computeStreak(allDates) {
    // Convert to unique date strings YYYY-MM-DD sorted desc
    const uniqueDays = [
        ...new Set(
            allDates
                .filter(Boolean)
                .map(d => {
                    const dt = new Date(d);
                    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
                })
        ),
    ].sort((a, b) => (b > a ? 1 : -1)); // newest first

    if (uniqueDays.length === 0) return { current: 0, longest: 0 };

    // Current streak: count consecutive days ending today or yesterday
    let current = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let cursor = new Date(today);
    for (const dayStr of uniqueDays) {
        const d = new Date(dayStr);
        d.setHours(0, 0, 0, 0);
        const diffDays = Math.round((cursor - d) / 86400000);
        if (diffDays === 0 || (current === 0 && diffDays === 1)) {
            current++;
            cursor = d;
            cursor.setDate(cursor.getDate() - 0); // stay at d
            cursor = new Date(d);
            cursor.setDate(cursor.getDate() - 1); // step back for next
        } else {
            break;
        }
    }

    // Longest streak (full scan)
    const sortedAsc = [...uniqueDays].reverse();
    let longest = 0;
    let run = 0;
    let prev = null;
    for (const dayStr of sortedAsc) {
        const d = new Date(dayStr);
        d.setHours(0, 0, 0, 0);
        if (prev === null) {
            run = 1;
        } else {
            const diff = Math.round((d - prev) / 86400000);
            if (diff === 1) {
                run++;
            } else {
                run = 1;
            }
        }
        longest = Math.max(longest, run);
        prev = d;
    }

    return { current, longest };
}

export default function StreakCard({ growthLogs = [], extractLogs = [] }) {
    const allDates = [
        ...growthLogs.map(l => l.createdAt),
        ...extractLogs.map(l => l.createdAt),
    ];

    const { current, longest } = computeStreak(allDates);

    const monthStart = getMonthStart();
    const thisMonthDates = allDates.filter(d => {
        if (!d) return false;
        return new Date(d) >= monthStart;
    });
    const daysLoggedThisMonth = new Set(
        thisMonthDates.map(d => {
            const dt = new Date(d);
            return `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`;
        })
    ).size;

    // Progress of current streak vs longest
    const streakProgress = longest > 0 ? Math.min(100, (current / longest) * 100) : 0;

    return (
        <div className="dashboard-section">
            <div className="dashboard-section__heading">
                <span className="dashboard-section__tag">CONSISTENCY</span>
                <h3 className="dashboard-section__title">Streak &amp; Consistency</h3>
            </div>

            <div className="streak-grid">
                {/* Current streak */}
                <div className="streak-card streak-card--current">
                    <div className="streak-card__emoji">🔥</div>
                    <div className="streak-card__value">{current}</div>
                    <div className="streak-card__label">Current Streak</div>
                    <div className="streak-card__sub">consecutive day{current !== 1 ? 's' : ''}</div>
                    <div className="streak-progress">
                        <div
                            className="streak-progress__fill"
                            style={{ width: `${streakProgress}%`, backgroundColor: '#f97316' }}
                        />
                    </div>
                    <div className="streak-card__hint">
                        {current === 0
                            ? 'Log today to start your streak!'
                            : current === longest
                                ? '🏆 New personal best!'
                                : `${longest - current} more to beat your record`}
                    </div>
                </div>

                {/* Longest streak */}
                <div className="streak-card streak-card--longest">
                    <div className="streak-card__emoji">🏆</div>
                    <div className="streak-card__value">{longest}</div>
                    <div className="streak-card__label">Longest Streak</div>
                    <div className="streak-card__sub">personal best</div>
                </div>

                {/* Days this month */}
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
