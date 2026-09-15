import { PortfolioState, Project, LabItem, ProfileData } from '../types';

export const initialProfileData: ProfileData = {
  name: 'Vidhan Rathod',
  role: 'AI-Powered Engineer | Python Automation | Data | Web Apps',
  tagline: 'Engineering Intelligent Systems Powered by AI.',
  heroSupportingText: 'I use AI as an engineering multiplier to automate workflows, transform data, and build practical web applications — faster, cleaner, and with a focus on quality.',
  about: 'I’m Vidhan, a Computer Engineering graduate focused on building practical solutions with Python, data, and AI-assisted development. I enjoy taking problems that are manual, messy, or inefficient and turning them into reliable, automated systems.',
  education: 'Diploma in Computer Engineering',
  location: 'India • Available for Remote Roles & Engineering Contracts',
  email: 'vidyt404@gmail.com',
  github: 'https://github.com/vidhan-79',
  availableForHire: true,
  statusMessage: 'Available for Automation, Data & Web App Engineering',
  bioNote: 'AI helps me move faster. Engineering makes the result reliable. I deliver clean, modular code with complete setup instructions.',
  coreSkills: [
    'Python Development & Automation',
    'Web Scraping (Selenium, BeautifulSoup, Requests)',
    'Data Cleaning & ETL (Pandas, SQL)',
    'Business Intelligence & Dashboards (Power BI, Tableau, Excel)',
    'API Integrations & Web Applications',
    'AI-Assisted Development & Rapid Prototyping'
  ],
  skillCategories: [
    {
      title: 'Python Automation',
      description: 'Eliminating repetitive manual work by engineering headless scrapers, API pipelines, and task schedulers.',
      iconName: 'Bot',
      skills: ['Python', 'Selenium', 'BeautifulSoup', 'Requests', 'REST APIs', 'Workflow Automation'],
      highlight: 'Turn manual clicks and copy-pasting into automated scripts'
    },
    {
      title: 'Data & Intelligence',
      description: 'Transforming messy spreadsheets and raw datasets into validated schemas, SQL queries, and decision dashboards.',
      iconName: 'Database',
      skills: ['Pandas', 'NumPy', 'SQL', 'Data Cleaning', 'ETL Pipelines', 'Power BI / Tableau'],
      highlight: 'Clean data foundations with zero guesswork'
    },
    {
      title: 'Web Applications',
      description: 'Building practical, fast internal tools, interactive dashboards, and client-facing web interfaces.',
      iconName: 'Code',
      skills: ['TypeScript', 'React', 'Tailwind CSS', 'Vite', 'Express', 'AI-assisted dev'],
      highlight: 'High-usability software solving concrete problems'
    }
  ],
  stats: {
    revenueAnalyzed: '$2.3M+',
    questionsAnswered: '14+',
    automationReliability: '100%',
    accuracyRate: '99.8%'
  }
};

export const initialProjects: Project[] = [
  {
    id: 'superstore-sales-profit-intelligence',
    title: 'Superstore Sales & Profit Intelligence',
    tagline: 'Turning raw sales data into actionable business insights',
    category: 'Data & Analytics',
    summary: 'Comprehensive Exploratory Data Analysis & interactive decision dashboard uncovering $17,725 in margin erosion in the Tables subcategory and isolating the 7 worst-performing deficit SKUs across 9,994 transactions.',
    featured: true,
    problem: 'A national retail superstore experienced declining profit margins despite achieving $2.3M in sales. Management lacked clear visibility into which product categories, regions, and discount structures were generating revenue versus quietly destroying net profit.',
    approach: 'Conducted systematic Exploratory Data Analysis across 14 high-priority business inquiries. Mapped discount elasticity against margin loss, cleaned transaction anomalies with Python Pandas, and synthesized strategic recommendations.',
    whereAiHelped: 'Leveraged AI-assisted workflows to accelerate initial exploratory query structuring, rapidly test regression hypotheses on discount-to-profit degradation, and format complex business analysis questions.',
    engineering: 'Built clean data cleansing and validation scripts in Python, calculated SKU-level unit economics, isolated negative-profit clusters, and architected a production-ready interactive web dashboard deployed to Netlify.',
    result: 'Pinpointed exact margin leakages: $17,725.48 loss in Tables subcategory and isolated the top 7 loss-making products (led by the Cubify 3D Printer at -$8,879.97). Recommended an immediate 20% ceiling on discounts to preserve operating profits.',
    githubUrl: 'https://github.com/vidhan-79/Superstore-Sales-profit-Analysis',
    liveUrl: 'https://analysis-dashboardproject.netlify.app/',
    metrics: [
      { label: 'Revenue Analyzed', value: '$2,297,201', positive: true },
      { label: 'Net Profit Isolated', value: '$286,397', positive: true },
      { label: 'Loss Drains Found', value: '-$17,725', positive: false },
      { label: 'Business Inquiries', value: '14 Solved', positive: true }
    ],
    tags: ['Python', 'Pandas', 'Data Analysis', 'Interactive BI', 'EDA', 'SQL'],
    details: {
      overview: 'This flagship intelligence study transformed 9,994 raw commercial transactions into an executive decision model. Through systematic exploratory data analysis in Python, it examined sales performance, profit margins, regional anomalies, and customer segment dynamics.',
      problemStatement: 'Unchecked discounting policies without real-time margin visibility caused hidden financial deficits across high-volume sales categories, eroding corporate earnings.',
      businessQuestions: [
        'Total sales & net profit across the entire retail network ($2.3M revenue, $286.4K profit)?',
        'Which product category generated the highest profit (Technology with $145,454)?',
        'Which sub-category operated at an active financial deficit (Tables with -$17,725 loss)?',
        'What was the effect of discounts exceeding 20% on overall transaction margins (immediate negative net return)?',
        'Which customer segment drove the highest volume (Consumer at 50.56% of total revenue)?',
        'Which geographical region generated peak sales (West Region leading with $725,457)?',
        'What are the specific 7 deficit products incurring the deepest corporate losses?',
        'How do shipping modes impact delivery timelines and cost efficiency across classes?'
      ],
      keyFindings: [
        'Technology is the most lucrative category ($145,454.87 profit, ~50.8% of total retail profit).',
        'The Tables sub-category lost -$17,725.48 despite driving $206,965.53 in gross revenue.',
        'Discounts > 20% exhibit negative margin elasticity, accelerating net cash deficits.',
        'Central region generated the lowest profit margin ratio despite moderate sales volume.',
        'Top 7 deficit products accounted for more than $22,000 in avoidable financial losses.'
      ],
      lossMakingProducts: [
        { product: 'Cubify Triple Head 3D Printer', loss: '-$8,879.97', category: 'Technology' },
        { product: 'Lexmark MX611dhe Monochrome Laser Printer', loss: '-$4,599.96', category: 'Technology' },
        { product: 'Chromcraft Bull-Nose Wood Executive Desk', loss: '-$2,876.12', category: 'Furniture' },
        { product: 'Bush Advantage Collection Large Credenza', loss: '-$1,980.00', category: 'Furniture' },
        { product: 'Riverside Palais Royal Lawyers Bookcase', loss: '-$1,665.99', category: 'Furniture' },
        { product: 'Boxx Mid-Century Conference Table', loss: '-$1,450.20', category: 'Furniture' },
        { product: 'GBC DocuBind P400 Electric Binding Machine', loss: '-$1,378.14', category: 'Office Supplies' }
      ],
      recommendations: [
        'Enforce a strict 20% discount ceiling on furniture and office equipment.',
        'Renegotiate wholesale vendor pricing or discontinue the top 7 loss-incurring SKUs.',
        'Re-evaluate promotional campaigns in the Tables category to prevent volume-driven losses.',
        'Focus commercial marketing efforts on high-margin Technology categories.'
      ],
      techStack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Interactive Web BI', 'Netlify']
    },
    createdAt: '2026-03-01',
    updatedAt: '2026-03-10'
  },
  {
    id: 'retail-price-intelligence-scraper',
    title: 'Automated E-Commerce Price & Catalog Scraper',
    tagline: 'Headless Python scraper with anti-bot handling and automated ETL',
    category: 'Python Automation',
    summary: 'Engineered a resilient web scraper extracting competitive product listings, live pricing shifts, and inventory statuses, transforming unstructured HTML into clean tabular SQL data.',
    featured: false,
    problem: 'Businesses spend dozens of manual hours every week copying competitor prices from dynamic e-commerce websites into spreadsheets, prone to human error and outdated records.',
    approach: 'Architected a modular Python pipeline combining Selenium for dynamic JavaScript execution with BeautifulSoup for high-speed parsing, backed by robust retry policies.',
    whereAiHelped: 'Used AI assistance to quickly map dynamic DOM selectors across diverse HTML structures and draft modular exception-handling logic for anti-scraping challenges.',
    engineering: 'Built headless Chrome session managers, user-agent rotators, structured schema validators using Pandas, and an automated export pipeline feeding clean CSV/JSON/SQL tables.',
    result: 'Eliminated manual copy-paste routines, executing daily multi-thousand page extractions in minutes with automated logging and zero data loss.',
    githubUrl: 'https://github.com/vidhan-79',
    metrics: [
      { label: 'Extraction Speed', value: '10x Faster', positive: true },
      { label: 'Pipeline Reliability', value: '99.9%', positive: true },
      { label: 'Manual Hours Saved', value: '15+ hrs/wk', positive: true },
      { label: 'Data Accuracy', value: '100% Validated', positive: true }
    ],
    tags: ['Python', 'Selenium', 'BeautifulSoup', 'Web Scraping', 'Automation', 'ETL'],
    details: {
      overview: 'Modular Python-based scraping and ETL engine designed for reliable, scheduled extraction from complex dynamic storefronts.',
      problemStatement: 'Manual price monitoring is unscalable and fails to capture intraday flash sales or inventory shortages.',
      businessQuestions: [
        'How can dynamic JavaScript-rendered catalog pages be parsed reliably without crashing?',
        'How to maintain scraping uptime when site layouts change unexpectedly?',
        'How to validate scraped records before inserting into analytical databases?'
      ],
      keyFindings: [
        'Headless execution with headless=new reduces memory consumption by 40%.',
        'Vectorized schema checks in Pandas catch formatting discrepancies instantly.'
      ],
      recommendations: [
        'Store snapshots in timestamped data lakes prior to ETL transformation.',
        'Utilize webhook alerts for immediate notification on schema breaks.'
      ],
      techStack: ['Python', 'Selenium', 'BeautifulSoup4', 'Pandas', 'Requests', 'SQLite']
    },
    createdAt: '2026-02-15',
    updatedAt: '2026-02-28'
  },
  {
    id: 'workflow-automation-data-pipeline',
    title: 'End-to-End ETL & Reporting Automation System',
    tagline: 'Transforming messy multi-source data into structured intelligence',
    category: 'Web Applications',
    summary: 'A streamlined data pipeline and reporting interface that cleans disparate spreadsheets, reconciles discrepancies, and outputs executive-ready summaries automatically.',
    featured: false,
    problem: 'Operations teams struggle with disjointed spreadsheets from multiple vendors, spending hours manually reconciling inconsistent date formats, null fields, and mismatched IDs.',
    approach: 'Built an automated Python transformation pipeline that standardizes schema types, executes outlier validation, and exports clean tables into visual dashboard interfaces.',
    whereAiHelped: 'Applied AI prompting to brainstorm edge cases for messy date strings and generate regex patterns for complex address and currency normalization.',
    engineering: 'Engineered idempotent data loaders in Python, custom data validation assertions, and a lightweight web console for non-technical team members to trigger pipeline runs.',
    result: 'Reduced monthly reporting turnaround from 3 days to under 30 seconds with complete traceability and zero calculation errors.',
    githubUrl: 'https://github.com/vidhan-79',
    metrics: [
      { label: 'Processing Time', value: '< 30 Secs', positive: true },
      { label: 'Turnaround Reduction', value: '95% Faster', positive: true },
      { label: 'Schema Consistency', value: '100%', positive: true },
      { label: 'Error Rate', value: '0.0%', positive: true }
    ],
    tags: ['Python', 'ETL', 'Pandas', 'SQL', 'Web Apps', 'Automation'],
    details: {
      overview: 'Automated data pipeline unifying disparate data feeds into clean, analytics-ready formats.',
      problemStatement: 'Manual spreadsheet reconciliation causes reporting delays and human calculation discrepancies.',
      businessQuestions: [
        'Can multi-source vendor files be reconciled without manual intervention?',
        'How to ensure 100% data integrity during schema conversions?'
      ],
      keyFindings: [
        'Automated schema assertions eliminate 99% of downstream calculation mismatches.'
      ],
      recommendations: [
        'Standardize source column naming at ingest boundary.',
        'Generate automated reconciliation audit logs for every batch run.'
      ],
      techStack: ['Python', 'Pandas', 'SQL', 'React', 'FastAPI / Express']
    },
    createdAt: '2026-01-20',
    updatedAt: '2026-02-10'
  }
];

export const initialLabItems: LabItem[] = [
  {
    id: 'lab-1',
    title: 'AI-Augmented Dynamic Web Extraction Engine',
    purpose: 'Investigating LLM-guided DOM navigation and selector resilience for scrapers to self-heal when website markup changes.',
    technologies: ['Python', 'Playwright', 'BeautifulSoup', 'LLM Assisted Extraction'],
    aiInvolvement: 'Using AI to parse unstructured page segments into structured JSON schemas on the fly.',
    status: 'Building',
    notes: 'Testing resilient fallback selectors on e-commerce catalog pagination.',
    updatedAt: '2026-09-14'
  },
  {
    id: 'lab-2',
    title: 'Automated Financial & Sales Reconciliation CLI',
    purpose: 'A lightweight command-line tool that auto-reconciles disparate bank statements, invoice spreadsheets, and ledger entries.',
    technologies: ['Python', 'Pandas', 'OpenPyXL', 'SQLite'],
    aiInvolvement: 'AI-assisted fuzzy string matching for merchant and vendor name reconciliation.',
    status: 'Testing',
    notes: 'Achieving 99.4% match rate on dirty vendor naming records.',
    updatedAt: '2026-09-10'
  },
  {
    id: 'lab-3',
    title: 'Internal Automation Orchestration Console',
    purpose: 'A web-based control panel to monitor scheduled Python scraping workers, inspect pipeline logs, and trigger batch jobs.',
    technologies: ['TypeScript', 'React', 'Tailwind', 'Express', 'Python Subprocesses'],
    aiInvolvement: 'AI-accelerated full-stack component generation and API contract modeling.',
    status: 'Exploring',
    notes: 'Defining WebSocket event bus for real-time scraper progress streams.',
    updatedAt: '2026-09-05'
  }
];

export const initialPortfolioData: PortfolioState = {
  profile: initialProfileData,
  projects: initialProjects,
  labItems: initialLabItems,
  adminPasscodeHash: 'vidhan2026'
};
