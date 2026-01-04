import { useRef, type ChangeEvent } from 'react';
import type { PersonalInfo } from '../types/resume';
import './PersonalInfoForm.css';

interface PersonalInfoFormProps {
    data: PersonalInfo;
    onChange: (data: Partial<PersonalInfo>) => void;
}

/**
 * 個人資訊表單元件
 * 用於輸入姓名、聯絡方式等基本資訊，並可上傳大頭照
 */
export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    /**
     * 處理照片上傳
     * 使用 URL.createObjectURL 建立預覽 URL
     */
    const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // NOTE: 使用 createObjectURL 產生暫時的預覽 URL
            const photoUrl = URL.createObjectURL(file);
            onChange({ photo: photoUrl });
        }
    };

    /**
     * 觸發檔案選擇對話框
     */
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    /**
     * 移除已上傳的照片
     */
    const handleRemovePhoto = () => {
        // NOTE: 釋放 Object URL 以避免記憶體洩漏
        if (data.photo) {
            URL.revokeObjectURL(data.photo);
        }
        onChange({ photo: undefined });
        // 清空 input 以便重新選擇相同檔案
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="form-section">
            <h2 className="form-section-title">
                <span className="form-section-icon">👤</span>
                個人資訊
            </h2>

            {/* 照片上傳區域 */}
            <div className="photo-upload-section">
                <div className="photo-preview-container">
                    {data.photo ? (
                        <img
                            src={data.photo}
                            alt="大頭照預覽"
                            className="photo-preview"
                        />
                    ) : (
                        <div className="photo-placeholder">
                            <span className="photo-placeholder-icon">📷</span>
                            <span className="photo-placeholder-text">上傳照片</span>
                        </div>
                    )}
                </div>
                <div className="photo-upload-actions">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="photo-input-hidden"
                        id="photo-upload"
                    />
                    <button
                        type="button"
                        onClick={handleUploadClick}
                        className="photo-upload-btn"
                    >
                        {data.photo ? '更換照片' : '選擇照片'}
                    </button>
                    {data.photo && (
                        <button
                            type="button"
                            onClick={handleRemovePhoto}
                            className="photo-remove-btn"
                        >
                            移除
                        </button>
                    )}
                </div>
            </div>

            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="fullName" className="form-label">
                        姓名 <span className="required">*</span>
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        className="form-input"
                        placeholder="請輸入您的姓名"
                        value={data.fullName}
                        onChange={(e) => onChange({ fullName: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        電子郵件 <span className="required">*</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="form-input"
                        placeholder="example@email.com"
                        value={data.email}
                        onChange={(e) => onChange({ email: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                        電話
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        className="form-input"
                        placeholder="0912-345-678"
                        value={data.phone}
                        onChange={(e) => onChange({ phone: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address" className="form-label">
                        地址
                    </label>
                    <input
                        id="address"
                        type="text"
                        className="form-input"
                        placeholder="台北市信義區..."
                        value={data.address}
                        onChange={(e) => onChange({ address: e.target.value })}
                    />
                </div>
            </div>

            <div className="form-group form-group-full">
                <label htmlFor="summary" className="form-label">
                    個人簡介
                </label>
                <textarea
                    id="summary"
                    className="form-textarea"
                    placeholder="簡短介紹您的專業背景、專長與職涯目標..."
                    rows={4}
                    value={data.summary}
                    onChange={(e) => onChange({ summary: e.target.value })}
                />
            </div>
        </div>
    );
}
