/**
 * 履歷資料型別定義
 * 定義履歷表單中所有資料結構的 TypeScript 介面
 */

/**
 * 個人資訊
 */
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  /** 使用者大頭照（Object URL 或 Base64 格式） */
  photo?: string;
}

/**
 * 工作經歷
 */
export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

/**
 * 教育背景
 */
export interface Education {
  id: string;
  school: string;
  degree: string;
  major: string;
  graduationYear: string;
}

/**
 * 專業技能
 */
export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5 熟練度等級
}

/**
 * 完整履歷資料
 */
export interface ResumeData {
  personalInfo: PersonalInfo;
  workExperiences: WorkExperience[];
  educations: Education[];
  skills: Skill[];
}

/**
 * 建立空白的個人資訊
 */
export const createEmptyPersonalInfo = (): PersonalInfo => ({
  fullName: '',
  email: '',
  phone: '',
  address: '',
  summary: '',
});

/**
 * 建立空白的工作經歷
 */
export const createEmptyWorkExperience = (): WorkExperience => ({
  id: crypto.randomUUID(),
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  description: '',
});

/**
 * 建立空白的教育背景
 */
export const createEmptyEducation = (): Education => ({
  id: crypto.randomUUID(),
  school: '',
  degree: '',
  major: '',
  graduationYear: '',
});

/**
 * 建立空白的技能
 */
export const createEmptySkill = (): Skill => ({
  id: crypto.randomUUID(),
  name: '',
  level: 3,
});

/**
 * 建立空白的履歷資料
 */
export const createEmptyResumeData = (): ResumeData => ({
  personalInfo: createEmptyPersonalInfo(),
  workExperiences: [],
  educations: [],
  skills: [],
});
