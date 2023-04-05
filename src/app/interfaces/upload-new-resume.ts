export interface ResumeInfo {
  name: string
  skills: Object
  phone: string[]
  email: string[]
  domains: any[]
  hyperlinks: Hyperlinks
}

export interface Hyperlinks {
  email: any[]
  github: string[]
  linkedin: string[]
  others: any[]
  skype_id: any[]
}
