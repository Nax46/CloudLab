export interface Unit {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  description: string;
  unit_number: number;
  learning_objectives: string[];
  estimated_minutes: number;
  icon: string;
  published: boolean;
  display_order: number;
  topicCount?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Topic {
  id: string;
  unit_id: string;
  slug: string;
  title: string;
  short_description: string;
  content: string;
  key_points: string[];
  real_world_example: string;
  display_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Lesson {
  id: string;
  topic_id: string;
  title: string;
  introduction: string;
  content: string;
  practical_example: string;
  summary: string;
  display_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question: string;
  options: string[];
  correct_answer: number; // 0-indexed
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Quiz {
  id: string;
  unit_id: string;
  title: string;
  description: string;
  published: boolean;
  unit?: any;
  questions?: QuizQuestion[];
  questionCount?: number;
  created_at?: string;
  updated_at?: string;
}

export interface LabConfiguration {
  id: string;
  unit_id?: string;
  slug: string;
  title: string;
  description: string;
  configuration: Record<string, any>;
  lab_type: string;
  display_order: number;
  published: boolean;
  unit?: any;
  created_at?: string;
  updated_at?: string;
}

export interface ProviderCategory {
  category: string;
  services: {
    name: string;
    description: string;
    use_case: string;
  }[];
}

export interface CloudProvider {
  id: string;
  name: string;
  description: string;
  service_categories: ProviderCategory[];
  official_website: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  organization: string;
  cloud_concepts: string[];
  description: string;
  lessons_learned: string[];
  source_url?: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  related_unit_id?: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface LearningResource {
  id: string;
  title: string;
  description: string;
  resource_type: 'Standard' | 'Textbook' | 'Documentation' | 'Whitepaper' | 'Tool';
  unit_id?: string;
  url: string;
  provider: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export type DataSourceMode = 'mongodb' | 'demo';
