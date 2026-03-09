'use client';

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
    const startOfWeek = new Date(now);
    const day = now.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    startOfWeek.setDate(now.getDate() + diff);
    startOfWeek.setHours(0, 0, 0, 0);
    return d >= startOfWeek;
}

function isLastWeek(dateStr) {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    const now = new Date();
    const startOfThisWeek = new Date(now);
    const day = now.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    startOfThisWeek.setDate(now.getDate() + diff);
    startOfThisWeek.setHours(0, 0, 0, 0);
    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
    return d >= startOfLastWeek && d < startOfThisWeek;
}

function avg(arr) {
    if (!arr.length) return 0;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
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

    if (uniqueDays.length === 0) return 0;

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
            cursor = new Date(d);
            cursor.setDate(cursor.getDate() - 1);
        } else break;
    }
    return current;
}

function isThisMonth(dateStr) {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    const now = new Date();
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
}

export default function InsightsPanel({ growthLogs = [], extractLogs = [] }) {
    const insights = [];

    const allDates = [
        ...growthLogs.map(l => l.createdAt),
        ...extractLogs.map(l => l.createdAt),
    ];

    const currentStreak = computeStreak(allDates);

    // Streak insights
    if (currentStreak >= 5) {
        insights.push({
            icon: '🔥',
            text: `You've logged ${currentStreak} days in a row — incredible consistency!`,
            type: 'positive',
        });
    } else if (currentStreak >= 3) {
        insights.push({
            icon: '🔥',
            text: `You're on a ${currentStreak}-day logging streak. Keep it going!`,
            type: 'positive',
        });
    } else if (currentStreak === 0) {
        insights.push({
            icon: '💡',
            text: 'Log today to start a new streak and build consistency.',
            type: 'info',
        });
    }

    // Weekly comparison
    const weekGrowth = growthLogs.filter(l => isThisWeek(l.createdAt)).length;
    const weekExtract = extractLogs.filter(l => isThisWeek(l.createdAt)).length;

    if (weekGrowth > weekExtract && weekGrowth > 0) {
        insights.push({
            icon: '🌱',
            text: `You logged more Plant Growth entries (${weekGrowth}) than Extract entries (${weekExtract}) this week.`,
            type: 'info',
        });
    } else if (weekExtract > weekGrowth && weekExtract > 0) {
        insights.push({
            icon: '💊',
            text: `You logged more Extract entries (${weekExtract}) than Plant Growth entries (${weekGrowth}) this week.`,
            type: 'info',
        });
    } else if (weekGrowth === weekExtract && weekGrowth > 0) {
        insights.push({
            icon: '⚖️',
            text: `You logged an equal number of Plant Growth and Extract entries this week (${weekGrowth} each). Great balance!`,
            type: 'positive',
        });
    }

    // Growth rating comparison: this week vs last week
    const thisWeekGrowthRatings = growthLogs
        .filter(l => isThisWeek(l.createdAt))
        .map(l => Number(l.growthSuccessRating))
        .filter(n => n > 0);

    const lastWeekGrowthRatings = growthLogs
        .filter(l => isLastWeek(l.createdAt))
        .map(l => Number(l.growthSuccessRating))
        .filter(n => n > 0);

    if (thisWeekGrowthRatings.length > 0 && lastWeekGrowthRatings.length > 0) {
        const thisAvg = avg(thisWeekGrowthRatings);
        const lastAvg = avg(lastWeekGrowthRatings);
        const diff = (thisAvg - lastAvg).toFixed(1);
        if (thisAvg > lastAvg) {
            insights.push({
                icon: '📈',
                text: `Your average growth success rating improved by ${diff} points compared to last week (${lastAvg.toFixed(1)} → ${thisAvg.toFixed(1)}).`,
                type: 'positive',
            });
        } else if (thisAvg < lastAvg) {
            insights.push({
                icon: '📉',
                text: `Your average growth success rating dropped by ${Math.abs(diff)} points vs last week. Consider reviewing your grow conditions.`,
                type: 'warning',
            });
        }
    }

    // Extract improvement comparison
    const thisWeekDelta = extractLogs
        .filter(l => isThisWeek(l.createdAt))
        .map(l => Number(l.beforeAfterDeltaScores))
        .filter(n => n > 0);

    const lastWeekDelta = extractLogs
        .filter(l => isLastWeek(l.createdAt))
        .map(l => Number(l.beforeAfterDeltaScores))
        .filter(n => n > 0);

    if (thisWeekDelta.length > 0 && lastWeekDelta.length > 0) {
        const thisAvg = avg(thisWeekDelta);
        const lastAvg = avg(lastWeekDelta);
        if (thisAvg > lastAvg) {
            insights.push({
                icon: '✨',
                text: `Your extract improvement scores are trending upward — great response this week!`,
                type: 'positive',
            });
        }
    }

    // Month activity
    const monthDays = new Set(
        allDates
            .filter(isThisMonth)
            .map(d => {
                const dt = new Date(d);
                return `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`;
            })
    ).size;

    const now = new Date();
    const dayOfMonth = now.getDate();
    if (monthDays > 0 && dayOfMonth >= 7) {
        const ratio = (monthDays / dayOfMonth) * 100;
        if (ratio >= 70) {
            insights.push({
                icon: '🏅',
                text: `You've logged on ${monthDays} of ${dayOfMonth} days this month — that's ${Math.round(ratio)}% consistency!`,
                type: 'positive',
            });
        }
    }

    // Today reminder
    const loggedToday = allDates.some(isToday);
    if (!loggedToday) {
        insights.push({
            icon: '⏰',
            text: "You haven't logged anything yet today. A quick log keeps your streak alive!",
            type: 'reminder',
        });
    }

    if (insights.length === 0) {
        insights.push({
            icon: '🌿',
            text: 'Start logging to unlock personalized insights about your plant journey.',
            type: 'info',
        });
    }

    return (
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
    );
}
