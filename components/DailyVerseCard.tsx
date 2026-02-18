
import React, { useEffect, useState } from 'react';
import { fetchDailyVerse } from '../services/geminiService';
import { DailyVerse } from '../types';

const DailyVerseCard: React.FC = () => {
  const [data, setData] = useState<DailyVerse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVerse = async () => {
      try {
        const cached = localStorage.getItem('daily_verse');
        const cachedDate = localStorage.getItem('daily_verse_date');
        const today = new Date().toDateString();

        if (cached && cachedDate === today) {
          setData(JSON.parse(cached));
          setLoading(false);
          return;
        }

        const verse = await fetchDailyVerse();
        setData(verse);
        localStorage.setItem('daily_verse', JSON.stringify(verse));
        localStorage.setItem('daily_verse_date', today);
      } catch (err) {
        console.error("Failed to load verse", err);
      } finally {
        setLoading(false);
      }
    };

    loadVerse();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse bg-white p-6 rounded-2xl border border-purple-100 shadow-sm h-48 flex flex-col justify-center items-center">
        <div className="h-4 w-3/4 bg-purple-50 rounded mb-4"></div>
        <div className="h-4 w-1/2 bg-purple-50 rounded"></div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-white p-8 rounded-2xl border border-purple-100 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <span className="text-8xl serif">"</span>
      </div>
      <blockquote className="relative z-10">
        <p className="text-xl md:text-2xl serif italic text-purple-900 leading-relaxed mb-4">
          "{data.verse}"
        </p>
        <cite className="block text-sm font-semibold text-purple-700 not-italic mb-6">
          — {data.reference}
        </cite>
        <div className="mt-4 pt-4 border-t border-purple-50">
          <p className="text-sm text-gray-600 leading-relaxed">
            <span className="font-bold text-purple-800 uppercase text-[10px] tracking-widest block mb-1">Reflection</span>
            {data.reflection}
          </p>
        </div>
      </blockquote>
    </div>
  );
};

export default DailyVerseCard;
