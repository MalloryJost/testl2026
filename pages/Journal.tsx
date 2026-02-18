
import React, { useState, useEffect } from 'react';
import { JournalEntry } from '../types';
import { generateJournalPrompt } from '../services/geminiService';

const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('lent_journal');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentText, setCurrentText] = useState('');
  const [prompt, setPrompt] = useState('How has your sacrifice challenged you today?');
  const [loadingPrompt, setLoadingPrompt] = useState(false);

  useEffect(() => {
    localStorage.setItem('lent_journal', JSON.stringify(entries));
  }, [entries]);

  const handleSave = () => {
    if (!currentText.trim()) return;
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      content: currentText,
    };
    setEntries([newEntry, ...entries]);
    setCurrentText('');
  };

  const fetchNewPrompt = async () => {
    setLoadingPrompt(true);
    try {
      const p = await generateJournalPrompt(entries.map(e => e.content));
      setPrompt(p);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPrompt(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-purple-900 serif text-xl italic">Lenten Reflection</h2>
          <button 
            onClick={fetchNewPrompt}
            disabled={loadingPrompt}
            className="text-[10px] uppercase font-bold text-purple-600 hover:text-purple-800 disabled:opacity-50"
          >
            {loadingPrompt ? 'Reflecting...' : 'New Prompt ✨'}
          </button>
        </div>
        
        <p className="text-sm text-gray-600 bg-purple-50 p-4 rounded-xl border border-purple-100 italic">
          "{prompt}"
        </p>

        <textarea
          className="w-full h-40 p-4 rounded-xl border border-purple-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-700 resize-none transition-all"
          placeholder="Pour out your heart here..."
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
        />
        
        <button
          onClick={handleSave}
          className="w-full bg-purple-800 text-white font-bold py-3 rounded-xl hover:bg-purple-900 transition-colors shadow-lg shadow-purple-200"
        >
          Save Reflection
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-purple-900 px-2">Previous Reflections</h3>
        {entries.length === 0 ? (
          <p className="text-center text-gray-400 py-8 text-sm italic">No entries yet. Start your journey today.</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-[10px] font-bold text-purple-600 uppercase mb-2">{entry.date}</div>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">
                {entry.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Journal;
