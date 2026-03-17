// Log Dashboard Analytics API
// Fetches history data used for the plant log dashboard analytics.

const BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_API_URL;

const getAuthHeaders = () => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const token = userData.token;
    if (!token) throw new Error('User not authenticated!');
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
};

export interface PlantGrowthHistoryEntry {
    _id?: string;
    userId: string;
    plantType?: string;
    growthStage?: string;
    growthSuccessRating?: number | string;
    stressEventsVsYield?: number | string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PlantExtractHistoryEntry {
    _id?: string;
    userId: string;
    extractType?: string;
    purpose?: string;
    beforeAfterDeltaScores?: number | string;
    createdAt?: string;
    updatedAt?: string;
}

// ---- Local Cache Helpers ----
// We maintain a local history in localStorage because the APIs only return
// the most-recent log entry per user (not a full list).

const GROWTH_CACHE_KEY = 'plant_growth_log_local_history';
const EXTRACT_CACHE_KEY = 'plant_extract_log_local_history';

export function appendGrowthLogEntry(data: Record<string, unknown>) {
    try {
        const existing: PlantGrowthHistoryEntry[] = JSON.parse(
            localStorage.getItem(GROWTH_CACHE_KEY) || '[]'
        );
        existing.push({ ...data, createdAt: new Date().toISOString() } as PlantGrowthHistoryEntry);
        localStorage.setItem(GROWTH_CACHE_KEY, JSON.stringify(existing));
    } catch {
        // ignore storage errors
    }
}

export function appendExtractLogEntry(data: Record<string, unknown>) {
    try {
        const existing: PlantExtractHistoryEntry[] = JSON.parse(
            localStorage.getItem(EXTRACT_CACHE_KEY) || '[]'
        );
        existing.push({ ...data, createdAt: new Date().toISOString() } as PlantExtractHistoryEntry);
        localStorage.setItem(EXTRACT_CACHE_KEY, JSON.stringify(existing));
    } catch {
        // ignore storage errors
    }
}

export function getLocalGrowthLogs(): PlantGrowthHistoryEntry[] {
    try {
        return JSON.parse(localStorage.getItem(GROWTH_CACHE_KEY) || '[]');
    } catch {
        return [];
    }
}

export function getLocalExtractLogs(): PlantExtractHistoryEntry[] {
    try {
        return JSON.parse(localStorage.getItem(EXTRACT_CACHE_KEY) || '[]');
    } catch {
        return [];
    }
}

// ---- Universal Log Cache (tracks ALL log types for the dashboard) ----
// Entries from every form (diet, wellness, lifestyle, plant-growth, plant-extract, parenting)
// are stored here so non-cannabis users also have dashboard data.

export type UniversalLogType = 'diet' | 'wellness' | 'lifestyle' | 'plant-growth' | 'plant-extract' | 'parenting';

export interface UniversalLogEntry {
    type: UniversalLogType;
    createdAt: string;
}

const UNIVERSAL_CACHE_KEY = 'plant_log_universal_history';

export function appendUniversalLogEntry(type: UniversalLogType) {
    try {
        const existing: UniversalLogEntry[] = JSON.parse(
            localStorage.getItem(UNIVERSAL_CACHE_KEY) || '[]'
        );
        existing.push({ type, createdAt: new Date().toISOString() });
        localStorage.setItem(UNIVERSAL_CACHE_KEY, JSON.stringify(existing));
    } catch {
        // ignore storage errors
    }
}

export function getUniversalLogs(): UniversalLogEntry[] {
    try {
        return JSON.parse(localStorage.getItem(UNIVERSAL_CACHE_KEY) || '[]');
    } catch {
        return [];
    }
}

// ---- Dashboard stats (persistent, from backend) ----
export interface DashboardStats {
    todayCount: number;
    weeklyCount: number;
    monthlyCount: number;
    currentStreak: number;
    longestStreak: number;
    lastLoginDate: string | null;
    lastActivityAt: string | null;
    todayByCategory: Record<string, number>;
    daysLoggedThisMonth?: number;
}

export async function getDashboardStats(): Promise<DashboardStats | null> {
    try {
        const response = await fetch(`${BASE_URL}api/dashboard/stats`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        if (!response.ok) return null;
        const json = await response.json();
        if (json.status === 'success' && json.data) return json.data as DashboardStats;
        return null;
    } catch {
        return null;
    }
}

export interface DashboardActivitySeries {
    last7Days: { date: string; count: number; byCategory?: Record<string, number> }[];
    weeklyCumulative: number[];
    weekStart: string;
    weeklyByCategory?: Record<string, number>;
}

export async function getDashboardActivitySeries(): Promise<DashboardActivitySeries | null> {
    try {
        const response = await fetch(`${BASE_URL}api/dashboard/activity-series`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        if (!response.ok) return null;
        const json = await response.json();
        if (json.status === 'success' && json.data) return json.data as DashboardActivitySeries;
        return null;
    } catch {
        return null;
    }
}

// ---- Remote API fetchers (supplement local cache when available) ----

export async function getPlantGrowthLogHistory(userId: string): Promise<PlantGrowthHistoryEntry[]> {
    try {
        const response = await fetch(`${BASE_URL}api/plant-growth-log-history/${userId}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        if (response.ok) {
            const data = await response.json();
            // API may return a single object or an array
            const remote: PlantGrowthHistoryEntry[] = Array.isArray(data?.data)
                ? data.data
                : data?.data
                    ? [data.data]
                    : [];
            // Use only API data so dashboard counts match DB (no duplicate from local merge)
            return deduplicateById(remote);
        }
    } catch {
        // fall back to local
    }
    return getLocalGrowthLogs();
}

export async function getPlantExtractLogHistory(userId: string): Promise<PlantExtractHistoryEntry[]> {
    try {
        const response = await fetch(`${BASE_URL}api/plant-extract-use-log-history/${userId}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        if (response.ok) {
            const data = await response.json();
            const remote: PlantExtractHistoryEntry[] = Array.isArray(data?.data)
                ? data.data
                : data?.data
                    ? [data.data]
                    : [];
            // Use only API data so dashboard counts match DB (no duplicate from local merge)
            return deduplicateById(remote);
        }
    } catch {
        // fall back to local
    }
    return getLocalExtractLogs();
}

/** Deduplicate by _id so the same log is not counted twice; sort by createdAt. */
function deduplicateById<T extends { _id?: string; createdAt?: string }>(entries: T[]): T[] {
    const byId = new Map<string, T>();
    let fallbackIdx = 0;
    for (const e of entries) {
        const id = (e._id != null ? String(e._id) : null) as string | null;
        const key = id ?? `_no_id_${fallbackIdx++}`;
        if (id && byId.has(key)) continue; // already have this doc
        byId.set(key, e);
    }
    return Array.from(byId.values()).sort((a, b) => {
        const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return ta - tb;
    });
}
