import type { ResumeData } from '../types/resume';
import './ResumePreview.css';

interface ResumePreviewProps {
    data: ResumeData;
    previewRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * 履歷預覽元件
 * 呈現專業的雙欄式履歷排版樣式
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
     * 檢查是否有內容可顯示
     */
    const hasContent =
        personalInfo.fullName ||
        personalInfo.email ||
        workExperiences.length > 0 ||
        educations.length > 0 ||
        skills.length > 0;

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
                    <>
                        {/* 頂部區域：姓名置中 */}
                        <header className="resume-header">
                            <h1 className="resume-name">
                                {personalInfo.fullName || '您的姓名'}
                            </h1>
                            {personalInfo.summary && (
                                <p className="resume-summary">{personalInfo.summary}</p>
                            )}
                        </header>

                        {/* 雙欄式主體內容 */}
                        <div className="resume-body">
                            {/* 左側欄位：照片、聯絡資訊、技能 */}
                            <aside className="resume-sidebar">
                                {/* 照片區塊 */}
                                {personalInfo.photo && (
                                    <div className="sidebar-photo">
                                        <img
                                            src={personalInfo.photo}
                                            alt="大頭照"
                                            className="resume-photo"
                                        />
                                    </div>
                                )}

                                {/* 聯絡資訊區塊 */}
                                <section className="sidebar-section">
                                    <h2 className="sidebar-section-title">聯絡資訊</h2>
                                    <div className="contact-list">
                                        {personalInfo.email && (
                                            <div className="contact-item">
                                                <span className="contact-icon">✉️</span>
                                                <span className="contact-text">{personalInfo.email}</span>
                                            </div>
                                        )}
                                        {personalInfo.phone && (
                                            <div className="contact-item">
                                                <span className="contact-icon">📱</span>
                                                <span className="contact-text">{personalInfo.phone}</span>
                                            </div>
                                        )}
                                        {personalInfo.address && (
                                            <div className="contact-item">
                                                <span className="contact-icon">📍</span>
                                                <span className="contact-text">{personalInfo.address}</span>
                                            </div>
                                        )}
                                    </div>
                                </section>

                                {/* 專業技能區塊 */}
                                {skills.length > 0 && (
                                    <section className="sidebar-section">
                                        <h2 className="sidebar-section-title">專業技能</h2>
                                        <div className="skills-list">
                                            {skills.map((skill) => (
                                                <div key={skill.id} className="skill-item">
                                                    <div className="skill-header">
                                                        <span className="skill-name">{skill.name || '技能'}</span>
                                                        <span className="skill-level-label">{getLevelLabel(skill.level)}</span>
                                                    </div>
                                                    <div className="skill-bar">
                                                        <div
                                                            className="skill-bar-fill"
                                                            style={{ width: `${(skill.level / 5) * 100}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </aside>

                            {/* 右側欄位：工作經歷、教育背景 */}
                            <main className="resume-main">
                                {/* 工作經歷區塊 */}
                                {workExperiences.length > 0 && (
                                    <section className="main-section">
                                        <h2 className="main-section-title">工作經歷</h2>
                                        {workExperiences.map((exp) => (
                                            <div key={exp.id} className="experience-item">
                                                <div className="experience-header">
                                                    <div className="experience-title">
                                                        <h3 className="experience-company">{exp.company || '公司名稱'}</h3>
                                                        <span className="experience-position">{exp.position || '職位'}</span>
                                                    </div>
                                                    <span className="experience-date">
                                                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : '至今'}
                                                    </span>
                                                </div>
                                                {exp.description && (
                                                    <p className="experience-description">{exp.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </section>
                                )}

                                {/* 教育背景區塊 */}
                                {educations.length > 0 && (
                                    <section className="main-section">
                                        <h2 className="main-section-title">教育背景</h2>
                                        {educations.map((edu) => (
                                            <div key={edu.id} className="education-item">
                                                <div className="education-header">
                                                    <div className="education-title">
                                                        <h3 className="education-school">{edu.school || '學校名稱'}</h3>
                                                        <span className="education-degree">
                                                            {edu.degree} {edu.major && `・ ${edu.major}`}
                                                        </span>
                                                    </div>
                                                    {edu.graduationYear && (
                                                        <span className="education-date">{edu.graduationYear} 年畢業</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </section>
                                )}
                            </main>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
