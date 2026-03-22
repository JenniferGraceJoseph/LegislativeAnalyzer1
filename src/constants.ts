import { Law } from "./types";

export const INITIAL_LAWS: Law[] = [
  {
    id: "1",
    title: "Digital Personal Data Protection Act (DPDP), 2023",
    category: "Digital Law",
    date: "2023-08-11",
    compressedChunks: [],
    summary: {
      oneLiner: "A comprehensive framework for protecting personal data of Indian citizens while ensuring lawful processing.",
      shortPoints: [
        "Establishes rights for data principals (citizens).",
        "Defines obligations for data fiduciaries (companies).",
        "Creates a Data Protection Board of India.",
        "Imposes significant penalties for non-compliance (up to ₹250 crore).",
        "Regulates cross-border data transfers."
      ],
      detailed: "The Digital Personal Data Protection Act (DPDP), 2023, is India's first dedicated legislation for data privacy. It applies to the processing of digital personal data within India, and outside India if it involves offering goods or services to persons in India. The Act emphasizes 'Consent' as the primary ground for processing, with specific exemptions for 'Legitimate Uses'. Citizens have the right to access, correct, and erase their data. Companies must implement security safeguards and appoint a Data Protection Officer if they are 'Significant Data Fiduciaries'.",
      impact: {
        who: "Every Indian citizen (Data Principals) and any entity processing their data (Data Fiduciaries).",
        whatChanges: "Citizens now have legal control over their data; companies must be transparent and accountable for data usage.",
        whenApplies: "Phased implementation expected starting 2024-2025."
      },
      faqs: [
        { q: "Can a company use my data without consent?", a: "Generally no, except for 'Legitimate Uses' like medical emergencies, employment, or government services." },
        { q: "What happens if my data is leaked?", a: "The company must notify the Data Protection Board and you. They could face penalties up to ₹250 crore." }
      ]
    }
  },
  {
    id: "2",
    title: "National Education Policy (NEP) 2020",
    category: "Education",
    date: "2020-07-29",
    compressedChunks: [],
    summary: {
      oneLiner: "A transformative policy to overhaul India's education system from school to higher education.",
      shortPoints: [
        "Introduces 5+3+3+4 school structure.",
        "Focuses on foundational literacy and numeracy.",
        "Encourages multidisciplinary higher education with multiple entry/exit points.",
        "Promotes mother tongue/regional language as medium of instruction up to Grade 5.",
        "Aims for 50% Gross Enrolment Ratio in higher education by 2035."
      ],
      detailed: "The NEP 2020 replaces the 34-year-old National Policy on Education (1986). It aims to create an education system that is rooted in Indian ethos and contributes directly to transforming India into an equitable and vibrant knowledge society. Key reforms include the abolition of rigid streams (Science/Arts/Commerce), introduction of vocational education from Grade 6, and a common entrance exam for universities (CUET).",
      impact: {
        who: "Students, teachers, parents, and educational institutions across India.",
        whatChanges: "Shift from rote learning to holistic, flexible, and skill-based education.",
        whenApplies: "Ongoing implementation across various states and institutions."
      },
      faqs: [
        { q: "Is the 10+2 system gone?", a: "Yes, it is replaced by the 5+3+3+4 structure (Foundational, Preparatory, Middle, Secondary)." },
        { q: "Will my child have to study in regional language?", a: "The policy 'encourages' it up to Grade 5, but it is not mandatory for all schools (especially private ones)." }
      ]
    }
  }
];

export const CATEGORIES = ["Tax", "Education", "Digital Law", "Environment", "Labor", "Other"] as const;
