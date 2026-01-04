import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * PDF 匯出工具函式
 * 將 HTML 元素轉換為 PDF 並下載
 */

/**
 * 匯出 PDF 的選項
 */
interface ExportOptions {
    filename?: string;
    scale?: number;
    margin?: number;
}

/**
 * 將指定的 HTML 元素匯出為 PDF
 * @param element 要轉換的 HTML 元素
 * @param options 匯出選項
 */
export async function exportToPdf(
    element: HTMLElement,
    options: ExportOptions = {}
): Promise<void> {
    const {
        filename = '履歷表.pdf',
        scale = 2,
        margin = 10,
    } = options;

    try {
        // NOTE: 使用 html2canvas 將 HTML 元素轉換為 Canvas
        const canvas = await html2canvas(element, {
            scale,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
        });

        const imgData = canvas.toDataURL('image/png');

        // NOTE: 計算 PDF 尺寸，使用 A4 紙張比例
        const imgWidth = 210 - margin * 2; // A4 寬度 (mm) 減去邊距
        const pageHeight = 297 - margin * 2; // A4 高度 (mm) 減去邊距
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // NOTE: 建立 PDF 文件
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        let heightLeft = imgHeight;
        let position = margin;

        // NOTE: 處理多頁情況
        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight + margin;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // NOTE: 下載 PDF 檔案
        pdf.save(filename);
    } catch (error) {
        console.error('PDF 匯出失敗:', error);
        throw new Error('PDF 匯出失敗，請稍後再試');
    }
}
