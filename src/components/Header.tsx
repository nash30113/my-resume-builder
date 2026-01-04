import './Header.css';

/**
 * 頁首元件
 * 顯示應用程式標題與說明
 */
export function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <h1 className="header-title">
                    <span className="header-icon">📄</span>
                    履歷產生器
                </h1>
                <p className="header-subtitle">
                    輕鬆建立專業履歷，即時預覽，一鍵匯出 PDF
                </p>
            </div>
        </header>
    );
}
