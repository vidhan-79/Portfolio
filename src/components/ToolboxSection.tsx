import React from 'react';
import { 
  Code2, 
  Database, 
  Bot, 
  BarChart3, 
  Sparkles, 
  Layers, 
  Terminal, 
  CheckCircle2, 
  Wrench,
  Cpu
} from 'lucide-react';

export function ToolboxSection() {
  const toolCategories = [
    {
      category: 'Languages',
      icon: <Terminal className="w-4 h-4 text-cyan-400" />,
      items: [
        { name: 'Python', role: 'Primary engineering language for automation, scrapers & analytics' },
        { name: 'SQL (PostgreSQL)', role: 'Relational data querying, schema normalization & aggregation' },
        { name: 'TypeScript / JS', role: 'Frontends, interactive dashboards & full-stack interfaces' }
      ]
    },
    {
      category: 'Data & ETL',
      icon: <Database className="w-4 h-4 text-teal-400" />,
      items: [
        { name: 'Pandas', role: 'High-performance dataframe manipulation & data cleaning' },
        { name: 'NumPy', role: 'Vectorized mathematical operations & calculations' },
        { name: 'ETL Pipelines', role: 'Ingestion, validation assertions, type conversions & exports' },
        { name: 'Data Cleaning', role: 'Outlier detection, null handling & schema reconciliation' }
      ]
    },
    {
      category: 'Automation & Scraping',
      icon: <Bot className="w-4 h-4 text-blue-400" />,
      items: [
        { name: 'Selenium', role: 'Headless browser automation & dynamic JavaScript pages' },
        { name: 'BeautifulSoup', role: 'High-speed DOM parsing, tag extraction & data isolation' },
        { name: 'REST APIs', role: 'Webhook listeners, API authentication & payload ingestion' },
        { name: 'Requests / HTTP', role: 'Network calls, session headers & retry wrappers' }
      ]
    },
    {
      category: 'Business Intelligence',
      icon: <BarChart3 className="w-4 h-4 text-emerald-400" />,
      items: [
        { name: 'Power BI', role: 'Data modeling, DAX measures & executive visual reports' },
        { name: 'Tableau', role: 'Interactive visual analytics & multi-dimensional drill-downs' },
        { name: 'Advanced Excel', role: 'Pivot models, lookup formulas & data auditing' },
        { name: 'Interactive Web BI', role: 'Live browser-based analytics deployed to production' }
      ]
    },
    {
      category: 'AI as an Accelerator',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      items: [
        { name: 'AI Coding Copilots', role: 'Rapid scaffolding, boilerplate generation & debugging' },
        { name: 'LLM Prompt Engineering', role: 'Unstructured text parsing, classification & data extraction' },
        { name: 'AI-Assisted Prototyping', role: 'Compressing research and syntax exploration cycles' }
      ]
    }
  ];

  return (
    <section id="toolbox" className="py-20 bg-[#090d16] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-xs font-semibold text-cyan-400 mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>Practical Engineering Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Engineering Toolbox
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Grounded strictly in tools I use to build real-world software, automated pipelines, and verified data models.
          </p>
        </div>

        {/* Toolbox Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolCategories.map((group, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between ${
                idx === toolCategories.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                    {group.icon}
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    {group.category}
                  </h3>
                </div>

                <div className="space-y-3.5">
                  {group.items.map((tool, tIdx) => (
                    <div key={tIdx} className="text-xs">
                      <span className="font-mono font-bold text-slate-200 block mb-0.5">
                        {tool.name}
                      </span>
                      <span className="text-slate-400 text-[11px] leading-relaxed block">
                        {tool.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-800/80 text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                <span>Production tested</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
