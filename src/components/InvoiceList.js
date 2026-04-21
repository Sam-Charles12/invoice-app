import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function InvoiceList({
  invoices,
  onSelectInvoice,
  formatCurrency,
  getStatusStyle,
  isDarkMode,
}) {
  return (
    <section className="mt-8 space-y-3">
      {invoices.map((invoice) => (
        <article
          key={invoice.id}
          onClick={() => onSelectInvoice(invoice.id)}
          className={`grid cursor-pointer grid-cols-[102px_1fr_1.2fr_120px_86px_14px] items-center gap-3 rounded-[8px] border border-transparent px-7 py-4 shadow-[0_4px_12px_rgba(72,84,159,0.08)] ${isDarkMode ? "bg-[#1e2139]" : "bg-white"}`}
        >
          <p className="text-[17px] font-bold text-text">
            <span className="text-muted">#</span>
            {invoice.id}
          </p>
          <p className="text-[11px] font-medium text-muted">
            Due {invoice.dueDate}
          </p>
          <p className="truncate text-[11px] font-medium text-muted">
            {invoice.clientName}
          </p>
          <p className="text-right text-[20px] font-bold text-text">
            {formatCurrency(invoice.total)}
          </p>
          <div
            className={`flex items-center justify-center gap-1.5 rounded-[6px] py-2.5 text-[13px] font-bold ${getStatusStyle(
              invoice.status,
              isDarkMode,
            )}`}
          >
            <span className="text-[16px] leading-none">•</span>
            <span className="capitalize">{invoice.status}</span>
          </div>
          <FontAwesomeIcon
            icon={faAngleRight}
            className="text-[14px] text-primary"
          />
        </article>
      ))}
    </section>
  );
}
