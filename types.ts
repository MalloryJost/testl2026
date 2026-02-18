
export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood?: string;
}

export interface DailyVerse {
  verse: string;
  reference: string;
  reflection: string;
}

export interface LentGoal {
  id: string;
  title: string;
  description: string;
  completedDays: string[]; // Array of ISO date strings
}

export interface LentConfig {
  startDate: string; // Ash Wednesday
  endDate: string;   // Easter Sunday
}
