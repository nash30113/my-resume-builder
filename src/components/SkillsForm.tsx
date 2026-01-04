import type { Skill } from '../types/resume';
import './SkillsForm.css';

interface SkillsFormProps {
    data: Skill[];
    onAdd: () => void;
    onUpdate: (id: string, data: Partial<Skill>) => void;
    onRemove: (id: string) => void;
}

/**
 * 專業技能表單元件
 * 支援新增技能並設定熟練度
 */
export function SkillsForm({
    data,
    onAdd,
    onUpdate,
    onRemove,
}: SkillsFormProps) {
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

    return (
        <div className="form-section">
            <div className="form-section-header">
                <h2 className="form-section-title">
                    <span className="form-section-icon">⚡</span>
                    專業技能
                </h2>
                <button type="button" className="btn-add" onClick={onAdd}>
                    <span className="btn-icon">+</span>
                    新增技能
                </button>
            </div>

            {data.length === 0 ? (
                <div className="empty-state">
                    <p>尚未新增專業技能</p>
                    <button type="button" className="btn-add-first" onClick={onAdd}>
                        新增您的專業技能
                    </button>
                </div>
            ) : (
                <div className="skills-grid">
                    {data.map((skill) => (
                        <div key={skill.id} className="skill-item">
                            <div className="skill-input-row">
                                <input
                                    type="text"
                                    className="form-input skill-name-input"
                                    placeholder="技能名稱"
                                    value={skill.name}
                                    onChange={(e) => onUpdate(skill.id, { name: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="btn-remove btn-remove-small"
                                    onClick={() => onRemove(skill.id)}
                                    aria-label="刪除此技能"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="skill-level-row">
                                <input
                                    type="range"
                                    className="skill-slider"
                                    min="1"
                                    max="5"
                                    value={skill.level}
                                    onChange={(e) => onUpdate(skill.id, { level: Number(e.target.value) })}
                                />
                                <span className="skill-level-label">
                                    {getLevelLabel(skill.level)}
                                </span>
                            </div>

                            <div className="skill-level-dots">
                                {[1, 2, 3, 4, 5].map((level) => (
                                    <span
                                        key={level}
                                        className={`skill-dot ${level <= skill.level ? 'active' : ''}`}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
