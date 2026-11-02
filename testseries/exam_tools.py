"""On-screen tools that real exams provide, applied to their pattern mocks."""

# Exam name (TestSeries.exam) -> Test.calculator
EXAM_CALCULATORS = {
    'GATE': 'scientific',        # virtual scientific calculator in the CBT
    'IIT JAM': 'scientific',     # virtual scientific calculator in the CBT
    'CAT': 'basic',              # on-screen basic calculator
    'CA Foundation': 'basic',    # ICAI allows a simple non-programmable calculator
    'CA Intermediate': 'basic',
    'CMA Foundation': 'basic',   # ICMAI allows a simple calculator
}

# Home page "Browse all test series" tabs: (key, label, icon, exam names in display order).
# Series whose exam is not listed here fall into the last tab.
EXAM_GROUPS = [
    ('engineering', 'Engineering', 'gears', [
        'JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'MHT CET', 'WBJEE', 'KCET', 'AP EAPCET',
        'TS EAPCET', 'GATE', 'UPSC ESE', 'NATA', 'Polytechnic Entrance',
    ]),
    ('medical', 'Medical', 'stethoscope', [
        'NEET UG', 'AIIMS', 'NEET PG', 'NEET MDS', 'FMGE', 'AIIMS NORCET', 'UPSC CMS',
    ]),
    ('ssc-railway', 'SSC & Railways', 'train', [
        'SSC CGL', 'SSC CHSL', 'SSC MTS', 'SSC GD', 'SSC JE', 'SSC Stenographer',
        'RRB NTPC', 'RRB Group D', 'RRB ALP', 'RRB JE',
    ]),
    ('banking', 'Banking & Insurance', 'building-columns', [
        'IBPS PO', 'IBPS Clerk', 'SBI PO', 'SBI Clerk', 'IBPS RRB PO', 'IBPS RRB Clerk',
        'RBI Grade B', 'NABARD Grade A', 'SEBI Grade A', 'LIC AAO',
    ]),
    ('defence-police', 'Defence & Police', 'shield-halved', [
        'NDA', 'CDS', 'AFCAT', 'CAPF Assistant Commandant', 'Indian Air Force', 'Indian Army GD',
        'Indian Navy Agniveer', 'Indian Coast Guard', 'Sub Inspector (SI)', 'State Police Constable',
        'Delhi Police Constable', 'RPF Constable',
    ]),
    ('civil-services', 'Civil Services', 'landmark', [
        'UPSC Civil Services', 'State PSC', 'UPSC EPFO', 'Judicial Services',
    ]),
    ('mba-law', 'MBA & Law', 'briefcase', [
        'CAT', 'XAT', 'MAT', 'CMAT', 'NMAT', 'IPMAT', 'CLAT', 'AILET',
    ]),
    ('university', 'University & Research', 'graduation-cap', [
        'CUET UG', 'CUET PG', 'IIT JAM', 'CSIR NET', 'UGC NET', 'NIFT Entrance',
    ]),
    ('teaching', 'Teaching', 'chalkboard-user', [
        'CTET', 'State TET', 'KVS Teacher', 'DSSSB',
    ]),
    ('commerce', 'CA, CS & CMA', 'calculator', [
        'CA Foundation', 'CA Intermediate', 'CSEET', 'CMA Foundation',
    ]),
    ('scholarship', 'Olympiads & Scholarships', 'trophy', [
        'NSO Science Olympiad', 'IMO Maths Olympiad', 'IEO English Olympiad', 'NCO Cyber Olympiad', 'IOQM',
        'Olympiad', 'JNVST (Navodaya)', 'JNVST Class 9', 'Sainik School (AISSEE)', 'NMMS',
    ]),
]
