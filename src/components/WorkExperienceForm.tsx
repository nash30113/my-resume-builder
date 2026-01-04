import type { WorkExperience } from '../types/resume';
import './WorkExperienceForm.css';

interface WorkExperienceFormProps {
    data: WorkExperience[];
    onAdd: () => void;
    onUpdate: (id: string, data: Partial<WorkExperience>) => void;
    onRemove: (id: string) => void;
}

/**
 * 工作經歷表單元件
 * 支援動態新增/刪除多筆工作經歷
 */
export function WorkExperienceForm({
    data,
    onAdd,
    onUpdate,
    onRemove,
}: WorkExperienceFormProps) {
    return (
        <div className="form-section">
            <div className="form-section-header">
                <h2 className="form-section-title">
                    <span className="form-section-icon">💼</span>
                    工作經歷
                </h2>
                <button type="button" className="btn-add" onClick={onAdd}>
                    <span className="btn-icon">+</span>
                    新增經歷
                </button>
            </div>

            {data.length === 0 ? (
                <div className="empty-state">
                    <p>尚未新增工作經歷</p>
                    <button type="button" className="btn-add-first" onClick={onAdd}>
                        新增您的第一份工作經歷
                    </button>
                </div>
            ) : (
                <div className="experience-list">
                    {data.map((exp, index) => (
                        <div key={exp.id} className="experience-item">
                            <div className="experience-item-header">
                                <span className="experience-number">經歷 {index + 1}</span>
                                <button
                                    type="button"
                                    className="btn-remove"
                                    onClick={() => onRemove(exp.id)}
                                    aria-label="刪除此工作經歷"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">公司名稱</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="公司名稱"
                                        value={exp.company}
                                        onChange={(e) => onUpdate(exp.id, { company: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">職位</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="您的職位"
                                        value={exp.position}
                                        onChange={(e) => onUpdate(exp.id, { position: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">開始日期</label>
                                    <input
                                        type="month"
                                        className="form-input"
                                        value={exp.startDate}
                                        onChange={(e) => onUpdate(exp.id, { startDate: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">結束日期</label>
                                    <input
                                        type="month"
                                        className="form-input"
                                        placeholder="至今請留空"
                                        value={exp.endDate}
                                        onChange={(e) => onUpdate(exp.id, { endDate: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-group form-group-full">
                                <label className="form-label">工作描述</label>
                                <textarea
                                    className="form-textarea"
                                    placeholder="描述您的工作職責與成就..."
                                    rows={3}
                                    value={exp.description}
                                    onChange={(e) => onUpdate(exp.id, { description: e.target.value })}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
