'use client';

function isToday(d) {
    if (!d) return false;
    const dt = new Date(d), now = new Date();
    return dt.getFullYear() === now.getFullYear() && dt.getMonth() === now.getMonth() && dt.getDate() === now.getDate();
}
function isThisWeek(d) {
    if (!d) return false;
    const dt = new Date(d), now = new Date(), start = new Date(now);
    const day = now.getDay();
    start.setDate(now.getDate() - (day === 0 ? 6 : day - 1)); start.setHours(0, 0, 0, 0);
    return dt >= start;
}
function isLastWeek(d) {
    if (!d) return false;
    const dt = new Date(d), now = new Date(), startThis = new Date(now);
    const day = now.getDay();
    startThis.setDate(now.getDate() - (day === 0 ? 6 : day - 1)); startThis.setHours(0, 0, 0, 0);
    const startLast = new Date(startThis); startLast.setDate(startLast.getDate() - 7);
    return dt >= startLast && dt < startThis;
}
function avg(arr) { return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0; }
function computeCurrentStreak(dates) {
    const unique = [...new Set(dates.filter(Boolean).map(d => {
        const dt = new Date(d);
        return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
    }))].sort((a, b) => b > a ? 1 : -1);
    let current = 0, cursor = new Date(); cursor.setHours(0, 0, 0, 0);
    for (const s of unique) {
        const d = new Date(s); d.setHours(0, 0, 0, 0);
        const diff = Math.round((cursor - d) / 86400000);
        if (diff === 0 || (current === 0 && diff === 1)) { current++; cursor = new Date(d); cursor.setDate(cursor.getDate() - 1); } else break;
    }
    return current;
}

export default function InsightsPanel({ stats = null, growthLogs = [], extractLogs = [], universalLogs = [], isCannabisUser = false }) {
    const insights = [];

    if (isCannabisUser) {
        const allDates = [...growthLogs.map(l => l.createdAt), ...extractLogs.map(l => l.createdAt)];
        const streak = stats != null ? stats.currentStreak : computeCurrentStreak(allDates);

        if (streak >= 5) insights.push({ icon: '🔥', text: `You've logged ${streak} days in a row — incredible consistency!`, type: 'positive' });
        else if (streak >= 3) insights.push({ icon: '🔥', text: `You're on a ${streak}-day logging streak. Keep it going!`, type: 'positive' });
        else if (streak === 0) insights.push({ icon: '💡', text: 'Log today to start a new streak and build consistency.', type: 'info' });

        const weekGrowth = growthLogs.filter(l => isThisWeek(l.createdAt)).length;
        const weekExtract = extractLogs.filter(l => isThisWeek(l.createdAt)).length;
        if (weekGrowth > weekExtract && weekGrowth > 0) insights.push({ icon: '🌱', text: `More Plant Growth entries (${weekGrowth}) than Extract entries (${weekExtract}) this week.`, type: 'info' });
        else if (weekExtract > weekGrowth && weekExtract > 0) insights.push({ icon: '💊', text: `More Extract entries (${weekExtract}) than Plant Growth entries (${weekGrowth}) this week.`, type: 'info' });
        else if (weekGrowth === weekExtract && weekGrowth > 0) insights.push({ icon: '⚖️', text: `Equal Plant Growth and Extract entries this week (${weekGrowth} each). Great balance!`, type: 'positive' });

        const thisWeekRatings = growthLogs.filter(l => isThisWeek(l.createdAt)).map(l => Number(l.growthSuccessRating)).filter(n => n > 0);
        const lastWeekRatings = growthLogs.filter(l => isLastWeek(l.createdAt)).map(l => Number(l.growthSuccessRating)).filter(n => n > 0);
        if (thisWeekRatings.length > 0 && lastWeekRatings.length > 0) {
            const diff = (avg(thisWeekRatings) - avg(lastWeekRatings)).toFixed(1);
            if (avg(thisWeekRatings) > avg(lastWeekRatings)) insights.push({ icon: '📈', text: `Growth success rating improved by ${diff} points vs last week.`, type: 'positive' });
            else if (avg(thisWeekRatings) < avg(lastWeekRatings)) insights.push({ icon: '📉', text: `Growth success rating dropped by ${Math.abs(diff)} points vs last week. Review your grow conditions.`, type: 'warning' });
        }
        if (!allDates.some(isToday)) insights.push({ icon: '⏰', text: "You haven't logged anything yet today. A quick log keeps your streak alive!", type: 'reminder' });

    } else {
        const dates = universalLogs.map(l => l.createdAt);
        const streak = stats != null ? stats.currentStreak : computeCurrentStreak(dates);

        if (streak >= 5) insights.push({ icon: '🔥', text: `You've logged ${streak} days in a row — amazing consistency!`, type: 'positive' });
        else if (streak >= 3) insights.push({ icon: '🔥', text: `You're on a ${streak}-day logging streak. Keep building that habit!`, type: 'positive' });
        else if (streak === 0) insights.push({ icon: '💡', text: 'Log today to start a new streak and build consistency.', type: 'info' });

        const todayCount = stats != null ? stats.todayCount : universalLogs.filter(l => isToday(l.createdAt)).length;
        if (todayCount === 0) insights.push({ icon: '⏰', text: "You haven't logged anything yet today. Tap a form below to get started!", type: 'reminder' });
        else insights.push({ icon: '✅', text: `Great job — you've logged ${todayCount} entr${todayCount === 1 ? 'y' : 'ies'} today!`, type: 'positive' });

        // Most active category this week
        const weekLogs = universalLogs.filter(l => isThisWeek(l.createdAt));
        const byType = {};
        weekLogs.forEach(l => { byType[l.type] = (byType[l.type] || 0) + 1; });
        const top = Object.entries(byType).sort((a, b) => b[1] - a[1])[0];
        const LOG_LABELS = { diet: 'Diet 🥗', wellness: 'Wellness 💉', lifestyle: 'Lifestyle 🏃', parenting: 'Parenting 👨‍👩‍👧' };
        if (top) insights.push({ icon: '📊', text: `Your most active category this week: ${LOG_LABELS[top[0]] || top[0]} (${top[1]} entr${top[1] === 1 ? 'y' : 'ies'}).`, type: 'info' });

        // Week vs last week
        const thisWeek = weekLogs.length;
        const lastWeek = universalLogs.filter(l => isLastWeek(l.createdAt)).length;
        if (thisWeek > lastWeek && lastWeek > 0) insights.push({ icon: '📈', text: `You've logged more this week (${thisWeek}) than last week (${lastWeek}). Progress!`, type: 'positive' });
        else if (thisWeek < lastWeek && lastWeek > 0) insights.push({ icon: '📉', text: `Fewer entries this week (${thisWeek}) vs last week (${lastWeek}). Try to stay consistent!`, type: 'warning' });

        // Month consistency
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthDays = new Set(universalLogs.filter(l => l.createdAt && new Date(l.createdAt) >= monthStart).map(l => {
            const d = new Date(l.createdAt); return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
        })).size;
        const dayOfMonth = now.getDate();
        if (monthDays > 0 && dayOfMonth >= 7 && (monthDays / dayOfMonth) >= 0.7) {
            insights.push({ icon: '🏅', text: `You've logged on ${monthDays} of ${dayOfMonth} days this month — ${Math.round((monthDays / dayOfMonth) * 100)}% consistency!`, type: 'positive' });
        }
    }

    if (insights.length === 0) {
        insights.push({ icon: '🌿', text: 'Start logging to unlock personalized insights about your journey.', type: 'info' });
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
