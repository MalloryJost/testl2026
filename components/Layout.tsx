
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Reflection', icon: '🙏' },
    { path: '/tracker', label: 'Progress', icon: '📈' },
    { path: '/journal', label: 'Journal', icon: '✍️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      <header className="bg-purple-900 text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight serif italic">LentReflect</h1>
          <div className="text-xs uppercase tracking-widest opacity-80">Season of Lent 2026</div>
        </div>
      </header>

      <main className="flex-grow max-w-4xl w-full mx-auto p-4">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100 flex justify-around p-3 md:p-4 z-50">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center transition-colors ${
              location.pathname === item.path ? 'text-purple-800 font-semibold' : 'text-gray-400'
            }`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
