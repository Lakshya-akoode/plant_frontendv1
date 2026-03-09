'use client';

export default function LogDashboardHeader({ isCannabisUser = false }) {
    return (
        <div className="log-dashboard-header">
            <div className="log-dashboard-header__inner">
                <div className="log-dashboard-header__icon">{isCannabisUser ? '🌿' : '📊'}</div>
                <div className="log-dashboard-header__text">
                    <h2 className="log-dashboard-header__title">Log Dashboard</h2>
                    <p className="log-dashboard-header__subtitle">
                        {isCannabisUser
                            ? 'Your plant journey at a glance — track growth, extract use, and build consistency.'
                            : 'Your health journey at a glance — track daily logs and build healthy habits.'}
                    </p>
                </div>
            </div>
        </div>
    );
}
