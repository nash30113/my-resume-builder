import type { ResumeData } from '../types/resume';

/**
 * 專業履歷範例資料
 * 用於展示完整的履歷排版效果
 * NOTE: 包含量化成就數據、語言能力、社群連結
 */
export const dummyResumeData: ResumeData = {
    personalInfo: {
        fullName: '王小明',
        jobTitle: '資深全端工程師 / 技術主管',
        email: 'xiaoming.wang@email.com',
        phone: '0912-345-678',
        address: '台北市信義區',
        summary:
            '8 年以上軟體開發經驗，專精 React、Node.js 與雲端架構。曾帶領 10 人團隊完成多個大型專案，成功提升系統效能 40%，降低 25% 營運成本。',
        photo: undefined,
    },
    workExperiences: [
        {
            id: 'exp-1',
            company: '科技創新股份有限公司',
            position: '資深全端工程師 / 技術主管',
            startDate: '2021-03',
            endDate: '',
            description: `• 主導電商平台重構，系統響應時間降低 60%
• 建立 CI/CD 流程，部署頻率提升 300%，錯誤率下降 45%
• 帶領 10 人跨國團隊，準時交付率達 95%
• 設計即時通訊系統，支援每日 50 萬筆訊息`,
        },
        {
            id: 'exp-2',
            company: '數位服務有限公司',
            position: '全端工程師',
            startDate: '2018-06',
            endDate: '2021-02',
            description: `• 開發企業級 ERP 系統，服務 200+ 客戶，年營收 1,500 萬
• 優化資料庫查詢，報表產出時間從 30 秒縮短至 3 秒
• 導入 TypeScript，程式碼覆蓋率從 20% 提升至 85%`,
        },
        {
            id: 'exp-3',
            company: '新創科技公司',
            position: '前端工程師',
            startDate: '2016-07',
            endDate: '2018-05',
            description: `• 負責官網與後台系統，月活躍用戶 10 萬人
• 實作響應式設計，行動裝置轉換率提升 35%`,
        },
    ],
    educations: [
        {
            id: 'edu-1',
            school: '國立台灣大學',
            degree: '碩士',
            major: '資訊工程學系',
            graduationYear: '2016',
        },
        {
            id: 'edu-2',
            school: '國立成功大學',
            degree: '學士',
            major: '資訊工程學系',
            graduationYear: '2014',
        },
    ],
    skills: [
        { id: 'skill-1', name: 'React / Next.js', level: 5 },
        { id: 'skill-2', name: 'TypeScript', level: 5 },
        { id: 'skill-3', name: 'Node.js', level: 4 },
        { id: 'skill-4', name: 'PostgreSQL', level: 4 },
        { id: 'skill-5', name: 'Docker / K8s', level: 4 },
        { id: 'skill-6', name: 'AWS / GCP', level: 3 },
    ],
    languages: [
        { id: 'lang-1', name: '中文', level: 5 },
        { id: 'lang-2', name: '英文', level: 4 },
        { id: 'lang-3', name: '日文', level: 2 },
    ],
    socialLinks: [
        { id: 'link-1', type: 'github', url: 'https://github.com/xiaoming-wang', label: 'xiaoming-wang' },
        { id: 'link-2', type: 'linkedin', url: 'https://linkedin.com/in/xiaoming-wang', label: 'xiaoming-wang' },
        { id: 'link-3', type: 'website', url: 'https://xiaoming.dev', label: 'xiaoming.dev' },
    ],
};
