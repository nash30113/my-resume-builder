import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * PDF 匯出工具函式
 * 將 HTML 元素轉換為 PDF 並下載
 * NOTE: 固定 A4 寬度（794px @ 96 DPI）確保橫向兩欄佈局不會跑版
 */

/**
 * 匯出 PDF 的選項
 */
interface ExportOptions {
    filename?: string;
    scale?: number;
}

/**
 * A4 紙張尺寸常數
 */
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const A4_WIDTH_PX = 794;  // A4 寬度在 96 DPI 下的像素值
const A4_HEIGHT_PX = 1123; // A4 高度在 96 DPI 下的像素值

/**
 * 將指定的 HTML 元素匯出為 PDF
 * NOTE: 固定 windowWidth 為 794px 確保桌面版佈局
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
    } = options;

    try {
        // NOTE: 使用 html2canvas 將 HTML 元素轉換為 Canvas
        // 設定固定寬度確保維持桌面版兩欄佈局
        const canvas = await html2canvas(element, {
            scale,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
            width: A4_WIDTH_PX,
            height: A4_HEIGHT_PX,
            windowWidth: A4_WIDTH_PX,
            windowHeight: A4_HEIGHT_PX,
        });

        const imgData = canvas.toDataURL('image/png');

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
            'PNG',
            0,           // X 座標：從左邊緣開始
            0,           // Y 座標：從上邊緣開始
            A4_WIDTH_MM, // 寬度：完整 A4 寬度 (210mm)
            A4_HEIGHT_MM // 高度：完整 A4 高度 (297mm)
        );

        // NOTE: 下載 PDF 檔案
        pdf.save(filename);
    } catch (error) {
        console.error('PDF 匯出失敗:', error);
        throw new Error('PDF 匯出失敗，請稍後再試');
    }
}
