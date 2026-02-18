
import React from 'react';

const PillarsSection: React.FC = () => {
  const pillars = [
    {
      title: 'Prayer',
      icon: '🙏',
      description: 'Prayer is our conversation with God. During Lent, we seek to deepen this relationship by setting aside more time for silence, Scripture, and the Sacraments.',
      focus: 'Focus: Developing a more intimate union with Christ.'
    },
    {
      title: 'Fasting',
      icon: '🍞',
      description: 'Fasting is more than skipping meals; it is an act of self-denial that helps us detach from worldly pleasures and re-center our lives on what truly satisfies.',
      focus: 'Focus: Mastering our desires to make room for God.'
    },
    {
      title: 'Almsgiving',
      icon: '🤝',
      description: 'Almsgiving is an expression of gratitude for God\'s gifts. It challenges us to look beyond ourselves and serve Christ by serving our brothers and sisters in need.',
      focus: 'Focus: Practicing sacrificial love and charity.'
    }
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 px-2">
        <div className="h-6 w-1 bg-purple-700 rounded-full"></div>
        <h2 className="text-xl font-bold text-purple-900 serif">The Three Pillars of Lent</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {pillars.map((pillar) => (
          <div 
            key={pillar.title} 
            className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm transition-hover hover:shadow-md group"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl bg-purple-50 p-3 rounded-xl group-hover:bg-purple-100 transition-colors">
                {pillar.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-purple-900 mb-1">{pillar.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {pillar.description}
                </p>
                <div className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                  {pillar.focus}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PillarsSection;
