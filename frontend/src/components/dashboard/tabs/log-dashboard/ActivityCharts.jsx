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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function getLast7Days() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push(d);
    }
    return days;
}

function dateLabel(d) {
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function isSameDay(a, b) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
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

export default function ActivityCharts({ growthLogs = [], extractLogs = [] }) {
    const last7 = getLast7Days();
    const labels = last7.map(dateLabel);

    // Chart 1: Entries per day (bar)
    const growthPerDay = last7.map(day =>
        growthLogs.filter(l => l.createdAt && isSameDay(new Date(l.createdAt), day)).length
    );
    const extractPerDay = last7.map(day =>
        extractLogs.filter(l => l.createdAt && isSameDay(new Date(l.createdAt), day)).length
    );

    const entriesData = {
        labels,
        datasets: [
            {
                label: 'Plant Growth',
                data: growthPerDay,
                backgroundColor: 'rgba(40,167,69,0.75)',
                borderRadius: 6,
                borderSkipped: false,
            },
            {
                label: 'Extract Use',
                data: extractPerDay,
                backgroundColor: 'rgba(111,66,193,0.75)',
                borderRadius: 6,
                borderSkipped: false,
            },
        ],
    };

    // Chart 2: Growth success rating trend (last 7 entries)
    const recentGrowth = [...growthLogs]
        .sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0))
        .slice(-7);

    const growthRatingData = {
        labels: recentGrowth.map(l =>
            l.createdAt
                ? new Date(l.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                : '?'
        ),
        datasets: [
            {
                label: 'Growth Rating',
                data: recentGrowth.map(l => Number(l.growthSuccessRating) || 0),
                borderColor: '#28a745',
                backgroundColor: 'rgba(40,167,69,0.12)',
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: '#28a745',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
            },
        ],
    };

    // Chart 3: Extract improvement scores trend (last 7 entries)
    const recentExtract = [...extractLogs]
        .sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0))
        .slice(-7);

    const extractDeltaData = {
        labels: recentExtract.map(l =>
            l.createdAt
                ? new Date(l.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                : '?'
        ),
        datasets: [
            {
                label: 'Improvement Score',
                data: recentExtract.map(l => Number(l.beforeAfterDeltaScores) || 0),
                borderColor: '#6f42c1',
                backgroundColor: 'rgba(111,66,193,0.12)',
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: '#6f42c1',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
            },
        ],
    };

    const ratingOptions = {
        ...commonOptions,
        scales: {
            ...commonOptions.scales,
            y: {
                ...commonOptions.scales.y,
                min: 0,
                max: 10,
                ticks: { ...commonOptions.scales.y.ticks, stepSize: 2 },
            },
        },
    };

    const hasGrowthData = recentGrowth.length > 0;
    const hasExtractData = recentExtract.length > 0;

    return (
        <div className="dashboard-section">
            <div className="dashboard-section__heading">
                <span className="dashboard-section__tag">ACTIVITY</span>
                <h3 className="dashboard-section__title">Visual Activity Charts</h3>
            </div>

            <div className="charts-grid">
                {/* Bar chart */}
                <div className="chart-card">
                    <div className="chart-card__header">
                        <span className="chart-card__title">📅 Entries Per Day — Last 7 Days</span>
                    </div>
                    <div className="chart-card__legend">
                        <span style={{ color: '#28a745' }}>■ Plant Growth</span>
                        <span style={{ color: '#6f42c1', marginLeft: '12px' }}>■ Extract Use</span>
                    </div>
                    <div className="chart-card__body">
                        <Bar data={entriesData} options={{ ...commonOptions, plugins: { ...commonOptions.plugins, legend: { display: false } } }} />
                    </div>
                </div>

                {/* Growth rating line chart */}
                <div className="chart-card">
                    <div className="chart-card__header">
                        <span className="chart-card__title">🌱 Growth Success Rating Trend</span>
                    </div>
                    <div className="chart-card__body">
                        {hasGrowthData ? (
                            <Line data={growthRatingData} options={ratingOptions} />
                        ) : (
                            <div className="chart-empty">
                                <span>🌱 Submit plant growth logs to see your rating trend</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Extract delta line chart */}
                <div className="chart-card">
                    <div className="chart-card__header">
                        <span className="chart-card__title">💊 Extract Improvement Score Trend</span>
                    </div>
                    <div className="chart-card__body">
                        {hasExtractData ? (
                            <Line data={extractDeltaData} options={ratingOptions} />
                        ) : (
                            <div className="chart-empty">
                                <span>💊 Submit extract use logs to see your improvement trend</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
