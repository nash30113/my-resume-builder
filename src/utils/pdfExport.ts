import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * PDF 匯出工具函式
 * 將 HTML 元素轉換為 PDF 並下載
 * NOTE: 優化為單頁 A4 輸出，無邊距填滿
 */

/**
 * 匯出 PDF 的選項
 */
interface ExportOptions {
    filename?: string;
    scale?: number;
}

/**
 * A4 紙張尺寸常數 (mm)
 */
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

/**
 * 將指定的 HTML 元素匯出為 PDF
 * NOTE: 優化為 100% 填滿 A4 頁面，無多餘白邊
 * @param element 要轉換的 HTML 元素
 * @param options 匯出選項
 */
export async function exportToPdf(
    element: HTMLElement,
    options: ExportOptions = {}
): Promise<void> {
    const {
        filename = '履歷表.pdf',
        scale = 3, // 提高至 3 倍以確保高清晰度
    } = options;

    try {
        // NOTE: 暫時設定元素為固定 A4 尺寸以確保擷取正確
        const originalStyle = {
            width: element.style.width,
            height: element.style.height,
            overflow: element.style.overflow,
        };

        // 強制設定為 A4 尺寸
        element.style.width = `${A4_WIDTH_MM}mm`;
        element.style.height = `${A4_HEIGHT_MM}mm`;
        element.style.overflow = 'hidden';

        // NOTE: 使用 html2canvas 將 HTML 元素轉換為 Canvas
        const canvas = await html2canvas(element, {
            scale,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
            // 設定擷取尺寸與 A4 比例匹配
            width: element.scrollWidth,
            height: element.scrollHeight,
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight,
        });

        // 還原原始樣式
        element.style.width = originalStyle.width;
        element.style.height = originalStyle.height;
        element.style.overflow = originalStyle.overflow;

        const imgData = canvas.toDataURL('image/jpeg', 0.95);

        // NOTE: 建立 PDF 文件，設定為 A4 尺寸
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true,
        });

        // NOTE: 100% 填滿 A4 頁面，無邊距
        pdf.addImage(
            imgData,
            'JPEG',
            0,           // X 座標：從左邊緣開始
            0,           // Y 座標：從上邊緣開始
            A4_WIDTH_MM, // 寬度：完整 A4 寬度
            A4_HEIGHT_MM // 高度：完整 A4 高度
        );

        // NOTE: 下載 PDF 檔案
        pdf.save(filename);
    } catch (error) {
        console.error('PDF 匯出失敗:', error);
        throw new Error('PDF 匯出失敗，請稍後再試');
    }
}
