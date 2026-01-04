import type { ResumeData, Skill } from '../types/resume';
import './ResumePreview.css';

interface ResumePreviewProps {
    data: ResumeData;
    previewRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * SVG Icon 元件
 * NOTE: 使用 inline SVG 確保 PDF 匯出時圖示正確顯示
 */
const Icons = {
    email: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="section-icon">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
    ),
    phone: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="section-icon">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
    ),
    location: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="section-icon">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
    ),
    work: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="section-icon-lg">
            <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
        </svg>
    ),
    education: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="section-icon-lg">
            <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
        </svg>
    ),
    skills: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="section-icon-lg">
            <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
        </svg>
    ),
    contact: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="section-icon-lg">
            <path d="M21 8V7l-3 2-3-2v1l3 2 3-2zm1-5H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM8 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H2v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1zm8-6h-8V6h8v6z" />
        </svg>
    ),
};

/**
 * 履歷預覽元件
 * 呈現專業的雙欄式履歷排版樣式
 * 左側深色背景放置照片、聯絡資訊與技能
 * 右側放置個人簡介、工作經歷與教育背景
 */
export function ResumePreview({ data, previewRef }: ResumePreviewProps) {
    const { personalInfo, workExperiences, educations, skills } = data;

    /**
     * 格式化日期顯示
     */
    const formatDate = (dateStr: string): string => {
        if (!dateStr) return '';
        const [year, month] = dateStr.split('-');
        return `${year}/${month}`;
    };

    /**
     * 取得熟練度標籤
     */
    const getLevelLabel = (level: number): string => {
        const labels: Record<number, string> = {
            1: '入門',
            2: '初級',
            3: '中級',
            4: '進階',
            5: '專家',
        };
        return labels[level] || '中級';
    };

    /**
     * 依技能評分排序（高到低）
     * NOTE: 評分最高的技能會顯示在最上方
     */
    const sortSkillsByLevel = (skillList: Skill[]): Skill[] => {
        return [...skillList].sort((a, b) => b.level - a.level);
    };

    /**
     * 高亮量化成就（數字與百分比）
     * NOTE: 自動偵測文字中的數字與百分比並加上強調樣式
     */
    const highlightQuantifiedResults = (text: string): React.ReactNode => {
        // 匹配數字（含逗號）與百分比
        const regex = /(\d{1,3}(?:,\d{3})*(?:\.\d+)?%?|\d+(?:\.\d+)?%?)/g;
        const parts = text.split(regex);

        return parts.map((part, index) => {
            if (regex.test(part) || /^\d/.test(part)) {
                return (
                    <span key={index} className="highlight-number">
                        {part}
                    </span>
                );
            }
            return part;
        });
    };

    /**
     * 檢查是否有內容可顯示
     */
    const hasContent =
        personalInfo.fullName ||
        personalInfo.email ||
        workExperiences.length > 0 ||
        educations.length > 0 ||
        skills.length > 0;

    const sortedSkills = sortSkillsByLevel(skills);

    return (
        <div className="preview-container">
            <div className="preview-paper" ref={previewRef}>
                {!hasContent ? (
                    <div className="preview-empty">
                        <div className="preview-empty-icon">📝</div>
                        <h3>開始建立您的履歷</h3>
                        <p>在左側輸入您的資訊，履歷將即時顯示在這裡</p>
                    </div>
                ) : (
                    <div className="resume-layout">
                        {/* 左側深色欄位 */}
                        <aside className="resume-sidebar">
                            {/* 照片區塊 */}
                            <div className="sidebar-photo-wrapper">
                                {personalInfo.photo ? (
                                    <img
                                        src={personalInfo.photo}
                                        alt="大頭照"
                                        className="resume-photo"
                                    />
                                ) : (
                                    <div className="resume-photo-placeholder">
                                        <span>{personalInfo.fullName?.charAt(0) || '?'}</span>
                                    </div>
                                )}
                            </div>

                            {/* 聯絡資訊區塊 */}
                            <section className="sidebar-section">
                                <h2 className="sidebar-section-title">
                                    {Icons.contact}
                                    <span>聯絡資訊</span>
                                </h2>
                                <div className="contact-list">
                                    {personalInfo.email && (
                                        <div className="contact-item">
                                            {Icons.email}
                                            <span className="contact-text">{personalInfo.email}</span>
                                        </div>
                                    )}
                                    {personalInfo.phone && (
                                        <div className="contact-item">
                                            {Icons.phone}
                                            <span className="contact-text">{personalInfo.phone}</span>
                                        </div>
                                    )}
                                    {personalInfo.address && (
                                        <div className="contact-item">
                                            {Icons.location}
                                            <span className="contact-text">{personalInfo.address}</span>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* 專業技能區塊 */}
                            {sortedSkills.length > 0 && (
                                <section className="sidebar-section">
                                    <h2 className="sidebar-section-title">
                                        {Icons.skills}
                                        <span>專業技能</span>
                                    </h2>
                                    <div className="skills-grid">
                                        {sortedSkills.map((skill) => (
                                            <div key={skill.id} className="skill-tag">
                                                <span className="skill-name">{skill.name || '技能'}</span>
                                                <span className="skill-level-badge">
                                                    {getLevelLabel(skill.level)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </aside>

                        {/* 右側主內容區 */}
                        <main className="resume-main">
                            {/* 頂部：姓名與簡介 */}
                            <header className="resume-header">
                                <h1 className="resume-name">
                                    {personalInfo.fullName || '您的姓名'}
                                </h1>
                                {personalInfo.summary && (
                                    <p className="resume-summary">{personalInfo.summary}</p>
                                )}
                            </header>

                            {/* 工作經歷區塊 */}
                            {workExperiences.length > 0 && (
                                <section className="main-section">
                                    <h2 className="main-section-title">
                                        {Icons.work}
                                        <span>工作經歷</span>
                                    </h2>
                                    <div className="experience-list">
                                        {workExperiences.map((exp) => (
                                            <div key={exp.id} className="experience-item">
                                                <div className="experience-header">
                                                    <div className="experience-title">
                                                        <h3 className="experience-company">
                                                            {exp.company || '公司名稱'}
                                                        </h3>
                                                        <span className="experience-position">
                                                            {exp.position || '職位'}
                                                        </span>
                                                    </div>
                                                    <span className="experience-date">
                                                        {formatDate(exp.startDate)} -{' '}
                                                        {exp.endDate ? formatDate(exp.endDate) : '至今'}
                                                    </span>
                                                </div>
                                                {exp.description && (
                                                    <div className="experience-description">
                                                        {exp.description.split('\n').map((line, idx) => (
                                                            <p key={idx} className="description-line">
                                                                {highlightQuantifiedResults(line)}
                                                            </p>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* 教育背景區塊 */}
                            {educations.length > 0 && (
                                <section className="main-section">
                                    <h2 className="main-section-title">
                                        {Icons.education}
                                        <span>教育背景</span>
                                    </h2>
                                    <div className="education-list">
                                        {educations.map((edu) => (
                                            <div key={edu.id} className="education-item">
                                                <div className="education-header">
                                                    <div className="education-title">
                                                        <h3 className="education-school">
                                                            {edu.school || '學校名稱'}
                                                        </h3>
                                                        <span className="education-degree">
                                                            {edu.degree} {edu.major && `・ ${edu.major}`}
                                                        </span>
                                                    </div>
                                                    {edu.graduationYear && (
                                                        <span className="education-date">
                                                            {edu.graduationYear} 年畢業
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </main>
                    </div>
                )}
            </div>
        </div>
    );
}
