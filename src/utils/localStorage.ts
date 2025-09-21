import { JournalEntry } from '../types';

const JOURNAL_STORAGE_KEY = 'aura_wellness_journal_entries';

export const saveJournalEntry = (entry: JournalEntry): void => {
  const existingEntries = getJournalEntries();
  const updatedEntries = [...existingEntries, entry];
  localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(updatedEntries));
};

export const getJournalEntries = (): JournalEntry[] => {
  try {
    const stored = localStorage.getItem(JOURNAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error retrieving journal entries:', error);
    return [];
  }
};

export const deleteJournalEntry = (entryId: string): void => {
  const existingEntries = getJournalEntries();
  const updatedEntries = existingEntries.filter(entry => entry.id !== entryId);
  localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(updatedEntries));
};