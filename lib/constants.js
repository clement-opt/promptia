/**
 * PromptIA - Constantes et BDD des domaines, rôles, formats, templates
 */

// ─── Menus mode EXPRESS ───────────────────────────────────────────────────────

export const EXPRESS_ROLES = [
  'Expert marketing',
  'Consultant stratégique',
  'Rédacteur web',
  'Analyste financier',
  'DRH',
  'Chef de projet',
  'Juriste',
  'Designer',
  'Commercial',
  'Formateur',
  'Développeur',
  'Data analyst',
]

export const EXPRESS_FORMATS = [
  'Email professionnel',
  'Post LinkedIn',
  'Post Instagram',
  'Article de blog',
  'Rapport / Synthèse',
  'Tableau comparatif',
  'Liste d\'idées',
  'Plan de slides',
  'Script vidéo',
  'Cahier des charges',
]

// ─── BDD Domaines et sous-domaines ───────────────────────────────────────────

export const DOMAINS = {
  'Technologie': [
    'Automatisation', 'Programmation', 'Intelligence artificielle',
    'Outils numériques', 'Data & Analytics', 'Cybersécurité',
    'Robotique', 'Innovation logicielle', 'Transformation digitale', 'Cloud & Infrastructure',
  ],
  'Business': [
    'Stratégie d\'entreprise', 'Gestion de projet', 'Entrepreneuriat',
    'Finance & Comptabilité', 'Vente & Négociation', 'Management',
    'Analyse de marché', 'Croissance & Scaling', 'Organisation', 'Immobilier',
  ],
  'Communication': [
    'Marketing digital', 'Storytelling', 'Rédaction & Copywriting',
    'Réseaux sociaux', 'Branding & Identité', 'Publicité',
    'Relations presse', 'Influence & Partenariats', 'Communication interne', 'Content marketing',
  ],
  'Formation': [
    'Ingénierie pédagogique', 'E-learning', 'Coaching',
    'Éducation', 'Méthodes d\'enseignement', 'Formation professionnelle',
    'Onboarding', 'Mentorat',
  ],
  'RH': [
    'Recrutement', 'Gestion d\'équipe', 'Leadership',
    'Motivation & Engagement', 'Développement des compétences', 'Bien-être au travail',
    'Organisation interne', 'Droit social', 'Marque employeur', 'Conduite du changement',
  ],
  'BTP': [
    'Construction', 'Rénovation', 'Électricité & Fluides',
    'Gestion de chantier', 'Appels d\'offres', 'Sécurité',
    'Bureau d\'études', 'Architecture', 'Urbanisme',
  ],
  'Collectivités': [
    'Administration publique', 'Services aux citoyens', 'Marchés publics',
    'Transition numérique', 'Politique locale', 'Aménagement du territoire',
    'Budget & Finances publiques', 'Développement économique',
  ],
  'Industrie': [
    'Production & Manufacturing', 'Supply chain & Logistique', 'Qualité & Normes',
    'Maintenance', 'R&D', 'Lean management', 'Achats industriels', 'Sécurité industrielle',
  ],
  'Services': [
    'Conseil', 'Immobilier', 'Assurance',
    'Tourisme & Hôtellerie', 'Transport', 'Restauration', 'Santé', 'Beauté & Bien-être',
  ],
  'Juridique': [
    'Droit du travail', 'Fiscalité', 'Protection des données / RGPD',
    'Contrats', 'Propriété intellectuelle', 'Droit commercial',
    'Conformité & Compliance', 'Contentieux',
  ],
  'Création': [
    'Design graphique', 'UX/UI', 'Écriture créative',
    'Musique & Audio', 'Photographie', 'Vidéo & Motion',
    'Direction artistique', 'Scénario',
  ],
  'Santé': [
    'Nutrition', 'Sport & Performance', 'Bien-être mental',
    'Prévention', 'Recherche médicale', 'Pharmacie', 'Gestion hospitalière',
  ],
  'Écologie': [
    'Développement durable', 'Énergies renouvelables', 'RSE',
    'Économie circulaire', 'Biodiversité', 'Climat', 'Innovation verte',
  ],
}

// ─── BDD Rôles par domaine (mode Expert) ─────────────────────────────────────

export const ROLES_BY_DOMAIN = {
  'Technologie': [
    'Développeur senior', 'Architecte solutions', 'Data scientist',
    'Chef de projet IT', 'Consultant transformation digitale',
    'Expert cybersécurité', 'Product manager', 'DevOps engineer',
  ],
  'Business': [
    'Consultant stratégique', 'Directeur financier', 'Business developer',
    'Analyste marché', 'Chef de projet', 'Directeur commercial',
    'Contrôleur de gestion', 'Entrepreneur',
  ],
  'Communication': [
    'Directeur de communication', 'Social media manager', 'Rédacteur en chef',
    'Copywriter senior', 'Brand strategist', 'Responsable RP',
    'Content strategist', 'Planneur stratégique',
  ],
  'Formation': [
    'Ingénieur pédagogique', 'Formateur expert', 'Responsable formation',
    'Coach professionnel', 'Concepteur e-learning', 'Mentor',
  ],
  'RH': [
    'DRH', 'Responsable recrutement', 'Consultant RH',
    'Coach en management', 'Responsable QVT', 'Chargé de développement RH',
    'Expert marque employeur',
  ],
  'BTP': [
    'Conducteur de travaux', 'Ingénieur structure', 'Chef de chantier',
    'Économiste de la construction', 'Architecte',
    'Responsable bureau d\'études', 'Expert sécurité chantier',
  ],
  'Collectivités': [
    'Directeur général des services', 'Responsable numérique',
    'Chef de projet smart city', 'Directeur administratif',
    'Responsable marchés publics', 'Chargé de mission développement',
  ],
  'Industrie': [
    'Directeur de production', 'Ingénieur qualité', 'Responsable supply chain',
    'Chef de projet industriel', 'Responsable maintenance',
    'Lean manager', 'Directeur R&D',
  ],
  'Services': [
    'Directeur d\'agence', 'Consultant senior', 'Responsable relation client',
    'Chef de projet', 'Business analyst', 'Account manager',
  ],
  'Juridique': [
    'Avocat spécialisé', 'Juriste d\'entreprise', 'DPO',
    'Responsable conformité', 'Notaire', 'Fiscaliste', 'Consultant RGPD',
  ],
  'Création': [
    'Directeur artistique', 'UX designer senior', 'Rédacteur créatif',
    'Motion designer', 'Photographe', 'Scénariste', 'Concepteur-rédacteur',
  ],
  'Santé': [
    'Médecin spécialiste', 'Pharmacien', 'Nutritionniste',
    'Coach sportif certifié', 'Directeur d\'établissement', 'Chercheur',
  ],
  'Écologie': [
    'Consultant RSE', 'Ingénieur environnement',
    'Chef de projet développement durable',
    'Responsable transition écologique', 'Expert bilan carbone',
  ],
}

// ─── Types de tâches (modes Structuré & Expert) ───────────────────────────────

export const TASK_TYPES = [
  'Créer / Rédiger',
  'Analyser / Évaluer',
  'Résumer / Synthétiser',
  'Comparer',
  'Planifier / Organiser',
  'Corriger / Améliorer',
  'Brainstormer / Idéer',
]

// ─── Tailles de structure ────────────────────────────────────────────────────

export const SIZES = [
  'TPE < 10 salariés',
  'PME 10-250 salariés',
  'ETI 250-5000 salariés',
  'Grand groupe',
  'Collectivité',
  'Association',
  'Indépendant',
]

// ─── Publics cibles ───────────────────────────────────────────────────────────

export const AUDIENCES = [
  'Dirigeants',
  'Managers',
  'Salariés',
  'Clients B2B',
  'Clients B2C',
  'Grand public',
  'Investisseurs',
]

// ─── Niveaux d'audience ───────────────────────────────────────────────────────

export const LEVELS = ['Débutant', 'Intermédiaire', 'Expert', 'Mixte']

// ─── Types de documents ───────────────────────────────────────────────────────

export const DOCUMENT_TYPES = [
  'Email professionnel',
  'Post LinkedIn',
  'Post Instagram',
  'Article de blog',
  'Rapport / Synthèse',
  'Tableau comparatif',
  'Liste d\'idées',
  'Plan de slides',
  'Script vidéo',
  'Cahier des charges',
  'Étude de marché',
  'Business plan',
  'Fiche technique',
  'FAQ',
  'Newsletter',
  'Communiqué de presse',
  'Argumentaire commercial',
]

// ─── Longueurs ────────────────────────────────────────────────────────────────

export const LENGTHS = [
  'Court < 200 mots',
  'Moyen 200-500 mots',
  'Long 500-1500 mots',
  'Approfondi > 1500 mots',
]

// ─── Tons ─────────────────────────────────────────────────────────────────────

export const TONES = [
  'Professionnel',
  'Pédagogique',
  'Stratégique',
  'Commercial / Persuasif',
  'Vulgarisé',
  'Technique / Précis',
  'Créatif / Engageant',
  'Factuel / Neutre',
]

// ─── Structures de sortie ─────────────────────────────────────────────────────

export const STRUCTURES = [
  'Texte libre',
  'Points clés',
  'Tableau / Matrice',
  'Étapes numérotées',
  'Question / Réponse',
  'Pour / Contre',
  'Plan d\'action avec échéances',
  'L\'IA décide',
]

// ─── Personnalités (mode Expert) ──────────────────────────────────────────────

export const PERSONALITIES = [
  'Analytique',
  'Créatif',
  'Pragmatique',
  'Pédagogue',
  'Provocateur',
  'Diplomate',
]

// ─── Garde-fous (mode Expert) ─────────────────────────────────────────────────

export const GUARDRAILS = [
  {
    id: 'anti-hallucination',
    label: 'Anti-hallucination',
    text: "N'invente aucun chiffre, aucune date, aucun nom. Si une info te manque, écris [A VERIFIER].",
  },
  {
    id: 'sourcing',
    label: 'Sourcing',
    text: "Cite la source de chaque affirmation factuelle. Si tu ne peux pas sourcer, signale-le.",
  },
  {
    id: 'incertitude',
    label: 'Incertitude',
    text: "Si tu n'es pas sûr d'une information, dis-le explicitement.",
  },
  {
    id: 'perimetre',
    label: 'Périmètre',
    text: "Reste strictement dans le périmètre défini. Ne complète pas avec des informations hors contexte.",
  },
  {
    id: 'rgpd',
    label: 'RGPD',
    text: "Ne génère aucune donnée personnelle fictive (noms, emails, téléphones).",
  },
  {
    id: 'biais',
    label: 'Équilibre',
    text: "Présente les arguments de manière équilibrée.",
  },
]

// ─── Formats recommandés par type de tâche ────────────────────────────────────

export const FORMATS_BY_TASK = {
  'Créer / Rédiger': {
    documents: ['Article de blog', 'Post LinkedIn', 'Email professionnel', 'Newsletter', 'Communiqué de presse', 'Script vidéo'],
    structures: ['Texte libre', 'Étapes numérotées'],
  },
  'Analyser / Évaluer': {
    documents: ['Rapport / Synthèse', 'Tableau comparatif', 'Étude de marché'],
    structures: ['Pour / Contre', 'Tableau / Matrice', 'Points clés'],
  },
  'Résumer / Synthétiser': {
    documents: ['Rapport / Synthèse', 'FAQ'],
    structures: ['Points clés', 'Texte libre'],
  },
  'Comparer': {
    documents: ['Tableau comparatif', 'Rapport / Synthèse'],
    structures: ['Tableau / Matrice', 'Pour / Contre'],
  },
  'Planifier / Organiser': {
    documents: ['Plan de slides', 'Cahier des charges', 'Business plan'],
    structures: ['Étapes numérotées', 'Plan d\'action avec échéances'],
  },
  'Corriger / Améliorer': {
    documents: ['Rapport / Synthèse', 'Fiche technique'],
    structures: ['Points clés', 'Texte libre'],
  },
  'Brainstormer / Idéer': {
    documents: ['Liste d\'idées', 'FAQ'],
    structures: ['Points clés', 'Question / Réponse'],
  },
}

// ─── Critères d'auto-vérification par défaut ─────────────────────────────────

export const DEFAULT_CRITERIA = [
  "Le livrable répond à l'objectif défini",
  "Le ton est adapté au public cible",
  "Aucune information factuelle n'est inventée",
  "Les recommandations sont concrètes et actionnables",
  "Le format de sortie est respecté",
]

// ─── Templates pré-remplis ────────────────────────────────────────────────────

export const TEMPLATES = [
  {
    name: 'Post LinkedIn engageant',
    mode: 'structured',
    values: {
      taskType: 'Créer / Rédiger',
      objective: 'Rédiger un post LinkedIn engageant qui génère des commentaires',
      domain: 'Communication',
      subdomain: 'Réseaux sociaux',
      audience: 'Dirigeants',
      level: 'Mixte',
      documentType: 'Post LinkedIn',
      length: 'Court < 200 mots',
      tone: 'Créatif / Engageant',
      structure: 'Texte libre',
    },
  },
  {
    name: 'Email de prospection B2B',
    mode: 'structured',
    values: {
      taskType: 'Créer / Rédiger',
      objective: 'Rédiger un email de premier contact pour un prospect qui ne me connaît pas',
      domain: 'Business',
      subdomain: 'Vente & Négociation',
      audience: 'Dirigeants',
      level: 'Expert',
      documentType: 'Email professionnel',
      length: 'Court < 200 mots',
      tone: 'Commercial / Persuasif',
      structure: 'Texte libre',
    },
  },
  {
    name: 'Résumé de réunion',
    mode: 'express',
    values: {
      role: 'Chef de projet',
      want: 'un compte-rendu structuré de ma réunion avec les décisions prises et les actions à mener',
      format: 'Rapport / Synthèse',
    },
  },
  {
    name: 'Analyse SWOT',
    mode: 'structured',
    values: {
      taskType: 'Analyser / Évaluer',
      objective: 'Réaliser une analyse SWOT complète',
      documentType: 'Tableau comparatif',
      tone: 'Stratégique',
      structure: 'Tableau / Matrice',
    },
  },
  {
    name: 'Plan de communication',
    mode: 'structured',
    values: {
      taskType: 'Planifier / Organiser',
      objective: 'Créer un plan de communication sur 3 mois',
      domain: 'Communication',
      subdomain: 'Marketing digital',
      documentType: 'Plan de slides',
      length: 'Long 500-1500 mots',
      tone: 'Stratégique',
      structure: 'Plan d\'action avec échéances',
    },
  },
  {
    name: 'Réponse appel d\'offres',
    mode: 'expert',
    values: {
      domain: 'BTP',
      subdomain: 'Appels d\'offres',
      taskType: 'Créer / Rédiger',
      objective: 'Structurer une réponse à un appel d\'offres public',
      documentType: 'Cahier des charges',
      tone: 'Professionnel',
      length: 'Approfondi > 1500 mots',
      guardrails: ['anti-hallucination', 'perimetre'],
    },
  },
  {
    name: 'Fiche de poste',
    mode: 'structured',
    values: {
      taskType: 'Créer / Rédiger',
      objective: 'Rédiger une fiche de poste attractive et complète',
      domain: 'RH',
      subdomain: 'Recrutement',
      documentType: 'Fiche technique',
      tone: 'Professionnel',
      structure: 'Étapes numérotées',
    },
  },
  {
    name: 'Cahier des charges technique',
    mode: 'expert',
    values: {
      taskType: 'Planifier / Organiser',
      objective: 'Rédiger un cahier des charges technique pour un projet',
      domain: 'Technologie',
      documentType: 'Cahier des charges',
      tone: 'Technique / Précis',
      length: 'Approfondi > 1500 mots',
      guardrails: ['anti-hallucination', 'perimetre'],
    },
  },
  {
    name: 'Newsletter mensuelle',
    mode: 'structured',
    values: {
      taskType: 'Créer / Rédiger',
      objective: 'Rédiger une newsletter mensuelle engageante pour fidéliser mes contacts',
      domain: 'Communication',
      subdomain: 'Content marketing',
      documentType: 'Newsletter',
      length: 'Moyen 200-500 mots',
      tone: 'Créatif / Engageant',
      structure: 'Texte libre',
    },
  },
  {
    name: 'Argumentaire commercial',
    mode: 'structured',
    values: {
      taskType: 'Créer / Rédiger',
      objective: 'Construire un argumentaire de vente structuré pour convaincre un prospect',
      domain: 'Business',
      subdomain: 'Vente & Négociation',
      audience: 'Dirigeants',
      documentType: 'Argumentaire commercial',
      tone: 'Commercial / Persuasif',
      structure: 'Étapes numérotées',
    },
  },
]
