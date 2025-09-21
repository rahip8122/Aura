import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Calendar, Trash2, Edit3 } from 'lucide-react';
import { JournalEntry } from '../types';
import { saveJournalEntry, getJournalEntries, deleteJournalEntry } from '../utils/localStorage';

interface JournalProps {
  onBack: () => void;
}

const Journal: React.FC<JournalProps> = ({ onBack }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    setEntries(getJournalEntries().sort((a, b) => b.timestamp - a.timestamp));
  }, []);

  const handleSaveEntry = () => {
    if (title.trim() === '' || content.trim() === '') return;

    const entry: JournalEntry = {
      id: editingEntry?.id || Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      timestamp: editingEntry?.timestamp || Date.now()
    };

    if (editingEntry) {
      // Update existing entry
      const updatedEntries = entries.map(e => e.id === editingEntry.id ? entry : e);
      setEntries(updatedEntries);
      localStorage.setItem('aura_wellness_journal_entries', JSON.stringify(updatedEntries));
    } else {
      // Save new entry
      saveJournalEntry(entry);
      setEntries([entry, ...entries]);
    }

    // Reset form
    setTitle('');
    setContent('');
    setShowNewEntry(false);
    setEditingEntry(null);
  };

  const handleDeleteEntry = (entryId: string) => {
    deleteJournalEntry(entryId);
    setEntries(entries.filter(entry => entry.id !== entryId));
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setTitle(entry.title);
    setContent(entry.content);
    setShowNewEntry(true);
  };

  const cancelEdit = () => {
    setTitle('');
    setContent('');
    setShowNewEntry(false);
    setEditingEntry(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-2xl font-semibold text-gray-800">My Journal</h1>
            </div>
            {!showNewEntry && (
              <button
                onClick={() => setShowNewEntry(true)}
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Entry
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {showNewEntry && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {editingEntry ? 'Edit Entry' : 'New Journal Entry'}
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your entry a title..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                    Your thoughts
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write about your day, feelings, thoughts, or anything on your mind..."
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent resize-vertical"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveEntry}
                    disabled={title.trim() === '' || content.trim() === ''}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {editingEntry ? 'Update Entry' : 'Save Entry'}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-2xl mx-auto">
          {entries.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <Edit3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No entries yet</h3>
                <p className="text-gray-500 mb-6">
                  Start your journaling journey by writing your first entry. It's a great way to process your thoughts and feelings.
                </p>
                <button
                  onClick={() => setShowNewEntry(true)}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Write First Entry
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Entries ({entries.length})</h2>
              {entries.map((entry) => (
                <div key={entry.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">{entry.title}</h3>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditEntry(entry)}
                          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">{entry.date}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {entry.content.length > 200 
                        ? entry.content.substring(0, 200) + '...'
                        : entry.content
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;