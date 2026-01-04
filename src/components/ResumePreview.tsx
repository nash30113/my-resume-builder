import type { ResumeData, Skill, Language } from '../types/resume';
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
    language: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="section-icon-lg">
            <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
        </svg>
    ),
    link: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="section-icon-lg">
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
        </svg>
    ),
    github: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="link-icon">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    ),
    linkedin: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="link-icon">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
    ),
    website: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="link-icon">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
    ),
};

/**
 * 履歷預覽元件
 * 左側深色欄位包含：照片、職稱、簡介、聯絡資訊、技能、語言、社群連結、教育背景
 * 右側白色區域僅顯示工作經歷
 */
export function ResumePreview({ data, previewRef }: ResumePreviewProps) {
    const { personalInfo, workExperiences, educations, skills, languages, socialLinks } = data;

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
     * 依評分排序（高到低）
     */
    const sortByLevel = <T extends { level: number }>(items: T[]): T[] => {
        return [...items].sort((a, b) => b.level - a.level);
    };

    /**
     * 高亮量化成就（數字與百分比）
     */
    const highlightQuantifiedResults = (text: string): React.ReactNode => {
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
     * 取得社群連結圖示
     */
    const getSocialIcon = (type: string) => {
        switch (type) {
            case 'github': return Icons.github;
            case 'linkedin': return Icons.linkedin;
            case 'website': return Icons.website;
            default: return Icons.link;
        }
    };

    const hasContent =
        personalInfo.fullName ||
        personalInfo.email ||
        workExperiences.length > 0 ||
        educations.length > 0 ||
        skills.length > 0;

    const sortedSkills = sortByLevel(skills);
    const sortedLanguages = sortByLevel(languages || []);

    return (
        <div className="preview-container">
            <div className="preview-paper" id="resume-content" ref={previewRef}>
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
                            {/* 照片與姓名職稱 */}
                            <div className="sidebar-profile">
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
                                <h1 className="sidebar-name">{personalInfo.fullName || '您的姓名'}</h1>
                                {personalInfo.jobTitle && (
                                    <p className="sidebar-job-title">{personalInfo.jobTitle}</p>
                                )}
                            </div>

                            {/* 個人簡介 */}
                            {personalInfo.summary && (
                                <section className="sidebar-section">
                                    <p className="sidebar-summary">{personalInfo.summary}</p>
                                </section>
                            )}

                            {/* 聯絡資訊 */}
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

                            {/* 專業技能 */}
                            {sortedSkills.length > 0 && (
                                <section className="sidebar-section">
                                    <h2 className="sidebar-section-title">
                                        {Icons.skills}
                                        <span>專業技能</span>
                                    </h2>
                                    <div className="skills-grid">
                                        {sortedSkills.map((skill) => (
                                            <div key={skill.id} className="skill-tag">
                                                <span className="skill-name">{skill.name}</span>
                                                <span className="skill-level-badge">{getLevelLabel(skill.level)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* 語言能力 */}
                            {sortedLanguages.length > 0 && (
                                <section className="sidebar-section">
                                    <h2 className="sidebar-section-title">
                                        {Icons.language}
                                        <span>語言能力</span>
                                    </h2>
                                    <div className="language-list">
                                        {sortedLanguages.map((lang) => (
                                            <div key={lang.id} className="language-item">
                                                <span className="language-name">{lang.name}</span>
                                                <div className="language-stars">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <span
                                                            key={star}
                                                            className={`star ${star <= lang.level ? 'filled' : ''}`}
                                                        >
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* 社群連結 */}
                            {socialLinks && socialLinks.length > 0 && (
                                <section className="sidebar-section">
                                    <h2 className="sidebar-section-title">
                                        {Icons.link}
                                        <span>社群連結</span>
                                    </h2>
                                    <div className="links-list">
                                        {socialLinks.map((link) => (
                                            <div key={link.id} className="link-item">
                                                {getSocialIcon(link.type)}
                                                <span className="link-text">{link.label || link.url}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* 教育背景 */}
                            {educations.length > 0 && (
                                <section className="sidebar-section">
                                    <h2 className="sidebar-section-title">
                                        {Icons.education}
                                        <span>教育背景</span>
                                    </h2>
                                    <div className="education-list-sidebar">
                                        {educations.map((edu) => (
                                            <div key={edu.id} className="education-item-sidebar">
                                                <div className="edu-school">{edu.school}</div>
                                                <div className="edu-degree">
                                                    {edu.degree} {edu.major && `・${edu.major}`}
                                                </div>
                                                {edu.graduationYear && (
                                                    <div className="edu-year">{edu.graduationYear} 年畢業</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </aside>

                        {/* 右側主內容區：僅工作經歷 */}
                        <main className="resume-main">
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
                                                        <h3 className="experience-company">{exp.company}</h3>
                                                        <span className="experience-position">{exp.position}</span>
                                                    </div>
                                                    <span className="experience-date">
                                                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : '至今'}
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
                        </main>
                    </div>
                )}
            </div>
        </div>
    );
}
