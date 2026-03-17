'use client';

function formatLastLogin(date) {
    if (!date) return null;
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function LogDashboardHeader({ isCannabisUser = false, lastLoginDate = null }) {
    const lastLoginStr = formatLastLogin(lastLoginDate);
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
                        {lastLoginStr && (
                            <span className="log-dashboard-header__last-login"> Last login: {lastLoginStr}</span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
