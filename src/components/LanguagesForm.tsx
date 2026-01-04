import type { Language } from '../types/resume';
import './SkillsForm.css';

interface LanguagesFormProps {
    data: Language[];
    onAdd: () => void;
    onUpdate: (id: string, data: Partial<Language>) => void;
    onRemove: (id: string) => void;
}

/**
 * 語言能力表單元件
 * 支援新增語言並設定熟練度
 */
export function LanguagesForm({
    data,
    onAdd,
    onUpdate,
    onRemove,
}: LanguagesFormProps) {
    /**
     * 取得熟練度標籤
     */
    const getLevelLabel = (level: number): string => {
        const labels: Record<number, string> = {
            1: '入門',
            2: '初級',
            3: '中級',
            4: '進階',
            5: '精通',
        };
        return labels[level] || '中級';
    };

    return (
        <div className="form-section">
            <div className="form-section-header">
                <h2 className="form-section-title">
                    <span className="form-section-icon">🌐</span>
                    語言能力
                </h2>
                <button type="button" className="btn-add" onClick={onAdd}>
                    <span className="btn-icon">+</span>
                    新增語言
                </button>
            </div>

            {data.length === 0 ? (
                <div className="empty-state">
                    <p>尚未新增語言能力</p>
                    <button type="button" className="btn-add-first" onClick={onAdd}>
                        新增您的語言能力
                    </button>
                </div>
            ) : (
                <div className="skills-grid">
                    {data.map((lang) => (
                        <div key={lang.id} className="skill-item">
                            <div className="skill-input-row">
                                <input
                                    type="text"
                                    className="form-input skill-name-input"
                                    placeholder="語言名稱（如：英文）"
                                    value={lang.name}
                                    onChange={(e) => onUpdate(lang.id, { name: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="btn-remove btn-remove-small"
                                    onClick={() => onRemove(lang.id)}
                                    aria-label="刪除此語言"
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
                                    value={lang.level}
                                    onChange={(e) => onUpdate(lang.id, { level: Number(e.target.value) })}
                                />
                                <span className="skill-level-label">
                                    {getLevelLabel(lang.level)}
                                </span>
                            </div>

                            <div className="skill-level-dots">
                                {[1, 2, 3, 4, 5].map((level) => (
                                    <span
                                        key={level}
                                        className={`skill-dot star ${level <= lang.level ? 'active' : ''}`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
