export type ProjectMember = {
  id: string
  name: string
  avatar?: string
}

export type ProjectLink = {
  label: string
  url: string
}

export type Project = {
  id: string
  title: string
  description: string
  content: string
  slug: string
  image_url: string | null
  tags: string[]
  links: ProjectLink[]
  members: ProjectMember[]
  is_featured: boolean
  order: number
  created_at: string
  updated_at: string
}

export type FaqItem = {
  id: string
  question: string
  answer: string
  order: number
  created_at: string
}

export type PlannedImprovement = {
  id: string
  title: string
  description: string | null
  status: 'planned' | 'in_progress' | 'completed'
  order: number
  created_at: string
}

export type SiteContent = {
  key: string
  value: string
  updated_at: string
}
