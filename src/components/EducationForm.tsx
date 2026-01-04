import type { Education } from '../types/resume';
import './EducationForm.css';

interface EducationFormProps {
    data: Education[];
    onAdd: () => void;
    onUpdate: (id: string, data: Partial<Education>) => void;
    onRemove: (id: string) => void;
}

/**
 * 教育背景表單元件
 * 支援動態新增/刪除多筆學歷
 */
export function EducationForm({
    data,
    onAdd,
    onUpdate,
    onRemove,
}: EducationFormProps) {
    return (
        <div className="form-section">
            <div className="form-section-header">
                <h2 className="form-section-title">
                    <span className="form-section-icon">🎓</span>
                    教育背景
                </h2>
                <button type="button" className="btn-add" onClick={onAdd}>
                    <span className="btn-icon">+</span>
                    新增學歷
                </button>
            </div>

            {data.length === 0 ? (
                <div className="empty-state">
                    <p>尚未新增教育背景</p>
                    <button type="button" className="btn-add-first" onClick={onAdd}>
                        新增您的學歷資訊
                    </button>
                </div>
            ) : (
                <div className="education-list">
                    {data.map((edu, index) => (
                        <div key={edu.id} className="education-item">
                            <div className="education-item-header">
                                <span className="education-number">學歷 {index + 1}</span>
                                <button
                                    type="button"
                                    className="btn-remove"
                                    onClick={() => onRemove(edu.id)}
                                    aria-label="刪除此學歷"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">學校名稱</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="學校名稱"
                                        value={edu.school}
                                        onChange={(e) => onUpdate(edu.id, { school: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">學歷</label>
                                    <select
                                        className="form-select"
                                        value={edu.degree}
                                        onChange={(e) => onUpdate(edu.id, { degree: e.target.value })}
                                    >
                                        <option value="">請選擇學歷</option>
                                        <option value="博士">博士</option>
                                        <option value="碩士">碩士</option>
                                        <option value="學士">學士</option>
                                        <option value="副學士">副學士</option>
                                        <option value="高中職">高中職</option>
                                        <option value="其他">其他</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">主修科系</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="主修科系"
                                        value={edu.major}
                                        onChange={(e) => onUpdate(edu.id, { major: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">畢業年份</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        placeholder="2024"
                                        min="1950"
                                        max="2030"
                                        value={edu.graduationYear}
                                        onChange={(e) => onUpdate(edu.id, { graduationYear: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
