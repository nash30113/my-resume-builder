import { useState } from 'react';
import { exportToPdf } from '../utils/pdfExport';
import './PdfExportButton.css';

interface PdfExportButtonProps {
    targetRef: React.RefObject<HTMLDivElement | null>;
    filename?: string;
}

/**
 * PDF 匯出按鈕元件
 * 點擊後將預覽區域轉換為 PDF 並下載
 */
export function PdfExportButton({ targetRef, filename }: PdfExportButtonProps) {
    const [isExporting, setIsExporting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * 處理匯出 PDF
     */
    const handleExport = async () => {
        if (!targetRef.current) {
            setError('找不到預覽區域');
            return;
        }

        setIsExporting(true);
        setError(null);

        try {
            await exportToPdf(targetRef.current, { filename });
        } catch (err) {
            setError(err instanceof Error ? err.message : '匯出失敗');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="export-container">
            <button
                type="button"
                className={`btn-export ${isExporting ? 'exporting' : ''}`}
                onClick={handleExport}
                disabled={isExporting}
            >
                {isExporting ? (
                    <>
                        <span className="export-spinner" />
                        匯出中...
                    </>
                ) : (
                    <>
                        <span className="export-icon">📥</span>
                        匯出 PDF
                    </>
                )}
            </button>

            {error && (
                <p className="export-error">{error}</p>
            )}
        </div>
    );
}
