export interface HistoryItem {
    id: string;
    toolTitle: string;
    originalUrl: string;
    processedUrl: string;
    timestamp: number;
}

const HISTORY_KEY = 'smart-photo-studio-history';
const MAX_HISTORY_ITEMS = 9; // Keep the last 9 edits

export const getHistory = (): HistoryItem[] => {
    try {
        const historyJson = localStorage.getItem(HISTORY_KEY);
        return historyJson ? JSON.parse(historyJson) : [];
    } catch (e) {
        console.error("Failed to retrieve history:", e);
        return [];
    }
};

export const addHistoryItem = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const history = getHistory();
    const newItem: HistoryItem = {
        ...item,
        id: new Date().toISOString(),
        timestamp: Date.now(),
    };

    const updatedHistory = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
    
    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (e) {
        console.error("Failed to save history:", e);
    }
};
