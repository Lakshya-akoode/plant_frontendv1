'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function getLast7Days() {
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d;
    });
}

function dateLabel(d) {
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: '#1e1e2e',
            titleColor: '#e2e8f0',
            bodyColor: '#94a3b8',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            padding: 10,
            cornerRadius: 8,
        },
    },
    scales: {
        x: {
            grid: { display: false },
            ticks: { color: '#94a3b8', font: { size: 11 } },
        },
        y: {
            grid: { color: 'rgba(148,163,184,0.1)' },
            ticks: { color: '#94a3b8', font: { size: 11 } },
            beginAtZero: true,
        },
    },
};

const ratingOptions = {
    ...commonOptions,
    scales: {
        ...commonOptions.scales,
        y: { ...commonOptions.scales.y, min: 0, max: 10, ticks: { ...commonOptions.scales.y.ticks, stepSize: 2 } },
    },
};

export default function ActivityCharts({ activitySeries = null, growthLogs = [], extractLogs = [], universalLogs = [], isCannabisUser = false }) {
    const last7 = getLast7Days();
    const labels = last7.map(dateLabel);
    const series = activitySeries;

    if (isCannabisUser) {
        // --- Cannabis: bar (growth vs extract) + 2 line charts ---
        const growthPerDay = last7.map(day => growthLogs.filter(l => l.createdAt && isSameDay(new Date(l.createdAt), day)).length);
        const extractPerDay = last7.map(day => extractLogs.filter(l => l.createdAt && isSameDay(new Date(l.createdAt), day)).length);

        const entriesData = {
            labels,
            datasets: [
                { label: 'Plant Growth', data: growthPerDay, backgroundColor: 'rgba(40,167,69,0.75)', borderRadius: 6, borderSkipped: false },
                { label: 'Extract Use', data: extractPerDay, backgroundColor: 'rgba(111,66,193,0.75)', borderRadius: 6, borderSkipped: false },
            ],
        };

        const recentGrowth = [...growthLogs].sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)).slice(-7);
        const recentExtract = [...extractLogs].sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)).slice(-7);

        const growthRatingData = {
            labels: recentGrowth.map(l => l.createdAt ? new Date(l.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '?'),
            datasets: [{ label: 'Growth Rating', data: recentGrowth.map(l => Number(l.growthSuccessRating) || 0), borderColor: '#28a745', backgroundColor: 'rgba(40,167,69,0.12)', tension: 0.4, fill: true, pointRadius: 5, pointBackgroundColor: '#28a745', pointBorderColor: '#fff', pointBorderWidth: 2 }],
        };

        const extractDeltaData = {
            labels: recentExtract.map(l => l.createdAt ? new Date(l.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '?'),
            datasets: [{ label: 'Improvement Score', data: recentExtract.map(l => Number(l.beforeAfterDeltaScores) || 0), borderColor: '#6f42c1', backgroundColor: 'rgba(111,66,193,0.12)', tension: 0.4, fill: true, pointRadius: 5, pointBackgroundColor: '#6f42c1', pointBorderColor: '#fff', pointBorderWidth: 2 }],
        };

        return (
            <div className="dashboard-section">
                <div className="dashboard-section__heading">
                    <span className="dashboard-section__tag">ACTIVITY</span>
                    <h3 className="dashboard-section__title">Visual Activity Charts</h3>
                </div>
                <div className="charts-grid">
                    <div className="chart-card">
                        <div className="chart-card__header"><span className="chart-card__title">📅 Entries Per Day — Last 7 Days</span></div>
                        <div className="chart-card__legend"><span style={{ color: '#28a745' }}>■ Plant Growth</span><span style={{ color: '#6f42c1', marginLeft: '12px' }}>■ Extract Use</span></div>
                        <div className="chart-card__body"><Bar data={entriesData} options={commonOptions} /></div>
                    </div>
                    <div className="chart-card">
                        <div className="chart-card__header"><span className="chart-card__title">🌱 Growth Success Rating Trend</span></div>
                        <div className="chart-card__body">
                            {recentGrowth.length > 0 ? <Line data={growthRatingData} options={ratingOptions} /> : <div className="chart-empty"><span>🌱 Submit plant growth logs to see your rating trend</span></div>}
                        </div>
                    </div>
                    <div className="chart-card">
                        <div className="chart-card__header"><span className="chart-card__title">💊 Extract Improvement Score Trend</span></div>
                        <div className="chart-card__body">
                            {recentExtract.length > 0 ? <Line data={extractDeltaData} options={ratingOptions} /> : <div className="chart-empty"><span>💊 Submit extract use logs to see your improvement trend</span></div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- Non-cannabis: bar chart per log type per day (from universalLogs) ---
    const LOG_TYPES = ['diet', 'wellness', 'lifestyle', 'parenting'];
    const LOG_COLORS = {
        diet: 'rgba(245,158,11,0.75)',
        wellness: 'rgba(59,130,246,0.75)',
        lifestyle: 'rgba(16,185,129,0.75)',
        parenting: 'rgba(236,72,153,0.75)',
    };

    const presentTypes = series?.last7Days?.some(d => d.byCategory && Object.keys(d.byCategory).length > 0)
        ? [...new Set(series.last7Days.flatMap(d => Object.keys(d.byCategory || {})))].filter(t => LOG_TYPES.includes(t))
        : [...new Set(universalLogs.map(l => l.type))].filter(t => LOG_TYPES.includes(t));

    // If backend series exists, use its dates for labels to avoid timezone day-shifts.
    const seriesDays = series?.last7Days?.length === 7
        ? series.last7Days.map(d => new Date(`${d.date}T00:00:00.000Z`))
        : null;
    const chartDays = seriesDays || last7;
    const chartLabels = chartDays.map(dateLabel);

    const allPerDay = series?.last7Days?.length === 7
        ? series.last7Days.map(d => d.count)
        : chartDays.map(day => universalLogs.filter(l => l.createdAt && isSameDay(new Date(l.createdAt), day)).length);

    const barData = {
        labels: chartLabels,
        datasets: presentTypes.length > 0
            ? presentTypes.map(type => ({
                label: type.charAt(0).toUpperCase() + type.slice(1),
                data: series?.last7Days?.length === 7
                    ? series.last7Days.map(d => (d.byCategory?.[type] || 0))
                    : chartDays.map(day => universalLogs.filter(l => l.type === type && l.createdAt && isSameDay(new Date(l.createdAt), day)).length),
                backgroundColor: LOG_COLORS[type] || 'rgba(91,106,240,0.75)',
                borderRadius: 6,
                borderSkipped: false,
            }))
            : [{
                label: 'All Logs',
                data: allPerDay,
                backgroundColor: 'rgba(91,106,240,0.75)',
                borderRadius: 6,
                borderSkipped: false,
            }],
    };

    // Activity frequency line (total entries per day as a trend)
    const frequencyData = {
        labels: chartLabels,
        datasets: [{
            label: 'Total Entries',
            data: allPerDay,
            borderColor: '#5b6af0',
            backgroundColor: 'rgba(91,106,240,0.12)',
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointBackgroundColor: '#5b6af0',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
        }],
    };

    // Weekly cumulative trend
    const cumulative = series?.weeklyCumulative?.length === 7
        ? series.weeklyCumulative
        : allPerDay.reduce((acc, val, i) => { acc.push((acc[i - 1] || 0) + val); return acc; }, []);
    const hasChartData = (series?.last7Days?.some(d => d.count > 0)) || (universalLogs.length > 0);
    const cumulativeData = {
        labels: chartLabels,
        datasets: [{
            label: 'Cumulative Logs',
            data: cumulative,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16,185,129,0.12)',
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointBackgroundColor: '#10b981',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
        }],
    };

    return (
        <div className="dashboard-section">
            <div className="dashboard-section__heading">
                <span className="dashboard-section__tag">ACTIVITY</span>
                <h3 className="dashboard-section__title">Visual Activity Charts</h3>
            </div>
            <div className="charts-grid">
                <div className="chart-card">
                    <div className="chart-card__header"><span className="chart-card__title">📅 Entries Per Day — Last 7 Days</span></div>
                    {presentTypes.length > 1 && (
                        <div className="chart-card__legend">
                            {presentTypes.map(t => <span key={t} style={{ color: LOG_COLORS[t], marginRight: '10px' }}>■ {t.charAt(0).toUpperCase() + t.slice(1)}</span>)}
                        </div>
                    )}
                    <div className="chart-card__body">
                        {hasChartData ? <Bar data={barData} options={commonOptions} /> : <div className="chart-empty"><span>📋 Record 1 log to view your daily and weekly charts</span></div>}
                    </div>
                </div>
                <div className="chart-card">
                    <div className="chart-card__header"><span className="chart-card__title">📈 Daily Logging Frequency</span></div>
                    <div className="chart-card__body">
                        {hasChartData ? <Line data={frequencyData} options={commonOptions} /> : <div className="chart-empty"><span>📋 Record 1 log to view your daily and weekly charts</span></div>}
                    </div>
                </div>
                <div className="chart-card">
                    <div className="chart-card__header"><span className="chart-card__title">📊 Cumulative Logs This Week</span></div>
                    <div className="chart-card__body">
                        {hasChartData ? <Line data={cumulativeData} options={commonOptions} /> : <div className="chart-empty"><span>📋 Record 1 log to view your daily and weekly charts</span></div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
