'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    getPlantGrowthLogHistory,
    getPlantExtractLogHistory,
    getUniversalLogs,
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
    const [loading, setLoading] = useState(true);

    const loadDashboardData = useCallback(async () => {
        setLoading(true);
        try {
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            const userId = userData._id;

            if (isCannabisUser && userId) {
                const [growth, extract] = await Promise.all([
                    getPlantGrowthLogHistory(userId),
                    getPlantExtractLogHistory(userId),
                ]);
                setGrowthLogs(growth);
                setExtractLogs(extract);
            }

            setUniversalLogs(getUniversalLogs());
        } catch (err) {
            console.log('Dashboard load error:', err?.message);
            setUniversalLogs(getUniversalLogs());
        } finally {
            setLoading(false);
        }
    }, [isCannabisUser]);

    useEffect(() => {
        loadDashboardData();
    }, [loadDashboardData, refreshKey]);

    return (
        <div className="log-dashboard">
            <LogDashboardHeader isCannabisUser={isCannabisUser} />

            {loading ? (
                <div className="log-dashboard__loading">
                    <div className="log-dashboard__spinner" />
                    <span>Loading your dashboard…</span>
                </div>
            ) : (
                <>
                    {/* Same layout for ALL users — data source adapts by type */}
                    <TodaySummary
                        growthLogs={growthLogs}
                        extractLogs={extractLogs}
                        universalLogs={universalLogs}
                        isCannabisUser={isCannabisUser}
                    />
                    <WeeklyStats
                        growthLogs={growthLogs}
                        extractLogs={extractLogs}
                        universalLogs={universalLogs}
                        isCannabisUser={isCannabisUser}
                    />
                    <ActivityCharts
                        growthLogs={growthLogs}
                        extractLogs={extractLogs}
                        universalLogs={universalLogs}
                        isCannabisUser={isCannabisUser}
                    />
                    <StreakCard
                        growthLogs={growthLogs}
                        extractLogs={extractLogs}
                        universalLogs={universalLogs}
                        isCannabisUser={isCannabisUser}
                    />
                    <InsightsPanel
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
