import type { ResumeData } from '../types/resume';

/**
 * 專業履歷範例資料
 * 用於展示完整的履歷排版效果
 * NOTE: 包含量化成就數據，用於測試高亮功能
 */
export const dummyResumeData: ResumeData = {
    personalInfo: {
        fullName: '王小明',
        email: 'xiaoming.wang@email.com',
        phone: '0912-345-678',
        address: '台北市信義區松仁路 100 號',
        summary:
            '擁有 8 年以上軟體開發經驗的全端工程師，專精於 React、Node.js 與雲端架構設計。曾帶領 10 人團隊完成多個大型專案，成功將系統效能提升 40%，並降低 25% 的營運成本。熱衷於技術分享與團隊協作，致力於打造高品質的使用者體驗。',
        photo: undefined,
    },
    workExperiences: [
        {
            id: 'exp-1',
            company: '科技創新股份有限公司',
            position: '資深全端工程師 / 技術主管',
            startDate: '2021-03',
            endDate: '',
            description: `• 主導電商平台重構專案，將單體架構遷移至微服務，系統響應時間降低 60%
• 建立 CI/CD 流程與自動化測試框架，部署頻率提升 300%，錯誤率下降 45%
• 帶領 10 人跨國團隊，採用敏捷開發方法論，準時交付率達 95%
• 設計並實作即時通訊系統，支援每日 50 萬筆訊息處理量`,
        },
        {
            id: 'exp-2',
            company: '數位服務有限公司',
            position: '全端工程師',
            startDate: '2018-06',
            endDate: '2021-02',
            description: `• 開發企業級 ERP 系統，服務超過 200 家客戶，年營收貢獻達 1,500 萬元
• 優化資料庫查詢效能，將報表產出時間從 30 秒縮短至 3 秒
• 導入 TypeScript 與單元測試，程式碼覆蓋率從 20% 提升至 85%
• 獲選年度最佳員工，績效評等連續 3 年為 A+`,
        },
        {
            id: 'exp-3',
            company: '新創科技公司',
            position: '前端工程師',
            startDate: '2016-07',
            endDate: '2018-05',
            description: `• 負責公司官網與後台管理系統開發，月活躍用戶數達 10 萬人
• 實作響應式網頁設計，行動裝置轉換率提升 35%
• 與 UI/UX 團隊密切合作，完成 15 個以上的產品功能迭代`,
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
        { id: 'skill-3', name: 'Node.js / Express', level: 4 },
        { id: 'skill-4', name: 'PostgreSQL / MongoDB', level: 4 },
        { id: 'skill-5', name: 'Docker / Kubernetes', level: 4 },
        { id: 'skill-6', name: 'AWS / GCP', level: 3 },
        { id: 'skill-7', name: 'Python', level: 3 },
    ],
};
