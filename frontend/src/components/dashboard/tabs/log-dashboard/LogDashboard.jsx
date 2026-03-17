'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    getPlantGrowthLogHistory,
    getPlantExtractLogHistory,
    getUniversalLogs,
    getDashboardStats,
    getDashboardActivitySeries,
} from '../../../../api/frontend/logDashboard';
import LogDashboardHeader from './LogDashboardHeader';
import TodaySummary from './TodaySummary';
import WeeklyStats from './WeeklyStats';
import ActivityCharts from './ActivityCharts';
import StreakCard from './StreakCard';
import InsightsPanel from './InsightsPanel';

export default function LogDashboard({ refreshKey = 0, isCannabisUser = false }) {
    const [growthLogs, setGrowthLogs] = useState([]);
    const [extractLogs, setExtractLogs] = useState([]);
    const [universalLogs, setUniversalLogs] = useState([]);
    const [stats, setStats] = useState(null);
    const [activitySeries, setActivitySeries] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadDashboardData = useCallback(async () => {
        setLoading(true);
        try {
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            const userId = userData._id;

            // Phase 1: fetch fast, persistent stats/series first (avoid blocking UI)
            const [statsRes, seriesRes] = await Promise.all([
                getDashboardStats(),
                getDashboardActivitySeries(),
            ]);
            setStats(statsRes || null);
            setActivitySeries(seriesRes || null);
            setUniversalLogs(getUniversalLogs());
        } catch (err) {
            console.log('Dashboard load error:', err?.message);
            setUniversalLogs(getUniversalLogs());
        } finally {
            setLoading(false);
        }

        // Phase 2 (optional): load plant-specific histories without blocking initial render
        try {
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            const userId = userData._id;
            if (isCannabisUser && userId) {
                const [growth, extract] = await Promise.all([
                    getPlantGrowthLogHistory(userId),
                    getPlantExtractLogHistory(userId),
                ]);
                setGrowthLogs(growth || []);
                setExtractLogs(extract || []);
            }
        } catch {
            // ignore
        }
    }, [isCannabisUser]);

    useEffect(() => {
        loadDashboardData();
    }, [loadDashboardData, refreshKey]);

    useEffect(() => {
        const onFocus = () => loadDashboardData();
        window.addEventListener('focus', onFocus);
        return () => window.removeEventListener('focus', onFocus);
    }, [loadDashboardData]);

    return (
        <div className="log-dashboard">
            <LogDashboardHeader isCannabisUser={isCannabisUser} lastLoginDate={stats?.lastLoginDate} />

            {loading ? (
                <div className="log-dashboard__loading">
                    <div className="log-dashboard__spinner" />
                    <span>Loading your dashboard…</span>
                </div>
            ) : (
                <>
                    {/* Same layout for ALL users — data source adapts by type */}
                    <TodaySummary
                        stats={stats}
                        growthLogs={growthLogs}
                        extractLogs={extractLogs}
                        universalLogs={universalLogs}
                        isCannabisUser={isCannabisUser}
                    />
                    <WeeklyStats
                        stats={stats}
                        activitySeries={activitySeries}
                        growthLogs={growthLogs}
                        extractLogs={extractLogs}
                        universalLogs={universalLogs}
                        isCannabisUser={isCannabisUser}
                    />
                    <ActivityCharts
                        activitySeries={activitySeries}
                        growthLogs={growthLogs}
                        extractLogs={extractLogs}
                        universalLogs={universalLogs}
                        isCannabisUser={isCannabisUser}
                    />
                    <StreakCard
                        stats={stats}
                        growthLogs={growthLogs}
                        extractLogs={extractLogs}
                        universalLogs={universalLogs}
                        isCannabisUser={isCannabisUser}
                    />
                    <InsightsPanel
                        stats={stats}
                        growthLogs={growthLogs}
                        extractLogs={extractLogs}
                        universalLogs={universalLogs}
                        isCannabisUser={isCannabisUser}
                    />

                    <div className="dashboard-section">
                        <div className="add-log-cta">
                            <div className="add-log-cta__text">
                                <span className="add-log-cta__title">📝 Ready to log?</span>
                                <span className="add-log-cta__sub">
                                    {isCannabisUser
                                        ? 'Use the forms below to record your plant growth or extract use.'
                                        : 'Use the forms below to record your daily health and activity logs.'}
                                </span>
                            </div>
                            <div className="add-log-cta__arrow">↓</div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
