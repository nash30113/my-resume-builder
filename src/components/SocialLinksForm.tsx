import type { SocialLink } from '../types/resume';
import './SocialLinksForm.css';

interface SocialLinksFormProps {
    data: SocialLink[];
    onAdd: () => void;
    onUpdate: (id: string, data: Partial<SocialLink>) => void;
    onRemove: (id: string) => void;
}

/**
 * 社群連結表單元件
 * 支援新增 GitHub、LinkedIn、個人網站等連結
 */
export function SocialLinksForm({
    data,
    onAdd,
    onUpdate,
    onRemove,
}: SocialLinksFormProps) {
    const linkTypes = [
        { value: 'github', label: 'GitHub', icon: '🐙' },
        { value: 'linkedin', label: 'LinkedIn', icon: '💼' },
        { value: 'website', label: '個人網站', icon: '🌐' },
        { value: 'other', label: '其他', icon: '🔗' },
    ];

    return (
        <div className="form-section">
            <div className="form-section-header">
                <h2 className="form-section-title">
                    <span className="form-section-icon">🔗</span>
                    社群連結
                </h2>
                <button type="button" className="btn-add" onClick={onAdd}>
                    <span className="btn-icon">+</span>
                    新增連結
                </button>
            </div>

            {data.length === 0 ? (
                <div className="empty-state">
                    <p>尚未新增社群連結</p>
                    <button type="button" className="btn-add-first" onClick={onAdd}>
                        新增您的社群連結
                    </button>
                </div>
            ) : (
                <div className="social-links-list">
                    {data.map((link) => (
                        <div key={link.id} className="social-link-item">
                            <div className="social-link-row">
                                <select
                                    className="form-select social-type-select"
                                    value={link.type}
                                    onChange={(e) => onUpdate(link.id, { type: e.target.value as SocialLink['type'] })}
                                >
                                    {linkTypes.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.icon} {type.label}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    className="btn-remove btn-remove-small"
                                    onClick={() => onRemove(link.id)}
                                    aria-label="刪除此連結"
                                >
                                    ✕
                                </button>
                            </div>
                            <input
                                type="url"
                                className="form-input social-url-input"
                                placeholder="https://..."
                                value={link.url}
                                onChange={(e) => onUpdate(link.id, { url: e.target.value })}
                            />
                            <input
                                type="text"
                                className="form-input social-label-input"
                                placeholder="顯示名稱（選填）"
                                value={link.label || ''}
                                onChange={(e) => onUpdate(link.id, { label: e.target.value })}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
