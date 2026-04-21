import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function InvoiceDetails({
  invoice,
  onBack,
  onEdit,
  onDelete,
  onMarkAsPaid,
  getStatusStyle,
  formatAddressLines,
  getLineTotal,
  formatCurrency,
  isDarkMode,
}) {
  return (
    <section className="mt-8 space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-4 text-[12px] font-bold text-text"
      >
        <FontAwesomeIcon
          icon={faAngleRight}
          className="rotate-180 text-[10px] text-primary"
        />
        <span>Go back</span>
      </button>

      <div
        className={`flex items-center justify-between rounded-[8px] px-8 py-6 shadow-[0_4px_12px_rgba(72,84,159,0.08)] ${
          isDarkMode ? "bg-[#1e2139]" : "bg-white"
        }`}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-[#858bb2]">Status</span>
            <div
              className={`flex items-center justify-center gap-1.5 rounded-[6px] px-4 py-2.5 text-[13px] font-bold ${getStatusStyle(
                invoice.status,
                isDarkMode,
              )}`}
            >
              <span className="text-[16px] leading-none">•</span>
              <span className="capitalize">{invoice.status}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={onEdit}
              className="whitespace-nowrap rounded-full bg-[var(--soft-bg)] px-4 py-2.5 text-[12px] font-bold text-[#7e88c3] transition-colors hover:bg-[var(--soft-bg-hover)] lg:px-5 lg:py-3 lg:text-[13px]"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="whitespace-nowrap rounded-full bg-danger px-4 py-2.5 text-[12px] font-bold text-white transition-colors hover:bg-[#ff9797] lg:px-5 lg:py-3 lg:text-[13px]"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={onMarkAsPaid}
              className="whitespace-nowrap rounded-full bg-primary px-4 py-2.5 text-[12px] font-bold text-white transition-colors hover:bg-primary-hover lg:px-5 lg:py-3 lg:text-[13px]"
            >
              Mark as Paid
            </button>
          </div>
        </div>
      </div>

      <article
        className={`rounded-[8px] px-10 py-10 shadow-[0_4px_12px_rgba(72,84,159,0.08)] ${
          isDarkMode ? "bg-[#1e2139]" : "bg-white"
        }`}
      >
        <div className="w-[117.647%] origin-top-left scale-[0.85]">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[17px] font-bold text-text">
                <span className="text-muted">#</span>
                {invoice.id}
              </h2>
              <p className="mt-2 text-[12px] text-muted">
                {invoice.description}
              </p>
            </div>

            <div className="text-right text-[12px] leading-5 text-muted">
              {formatAddressLines(invoice.senderAddress).map((line) => (
                <p key={`sender-${line}`}>{line}</p>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-8">
            <div>
              <p className="text-[12px] text-muted">Invoice Date</p>
              <p className="mt-3 text-[15px] font-bold text-text">
                {invoice.createdAt}
              </p>

              <p className="mt-8 text-[12px] text-muted">Payment Due</p>
              <p className="mt-3 text-[15px] font-bold text-text">
                {invoice.dueDate}
              </p>
            </div>

            <div>
              <p className="text-[12px] text-muted">Bill To</p>
              <p className="mt-3 text-[15px] font-bold text-text">
                {invoice.clientName}
              </p>
              <div className="mt-3 text-[12px] leading-5 text-muted">
                {formatAddressLines(invoice.clientAddress).map((line) => (
                  <p key={`client-${line}`}>{line}</p>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[12px] text-muted">Sent to</p>
              <p className="mt-3 break-all text-[15px] font-bold text-text">
                {invoice.clientEmail}
              </p>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[8px] bg-[var(--soft-bg)]">
            <div className="space-y-3 px-8 pb-8 pt-6">
              <div className="grid grid-cols-[1fr_80px_120px_120px] text-[12px] text-[#7e88c3]">
                <span>Item Name</span>
                <span className="text-right">QTY.</span>
                <span className="text-right">Price</span>
                <span className="text-right">Total</span>
              </div>

              {invoice.items.map((item, index) => {
                const itemTotal = Number(getLineTotal(item));
                return (
                  <div
                    key={`detail-item-${index}`}
                    className="grid grid-cols-[1fr_80px_120px_120px] text-[13px] font-bold text-text"
                  >
                    <span>{item.name || "Untitled item"}</span>
                    <span className="text-right text-muted">
                      {item.quantity || 0}
                    </span>
                    <span className="text-right text-muted">
                      {formatCurrency(Number(item.price) || 0)}
                    </span>
                    <span className="text-right">
                      {formatCurrency(
                        Number.isFinite(itemTotal) ? itemTotal : 0,
                      )}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between bg-[var(--panel-strong)] px-8 py-6 text-white">
              <span className="text-[12px]">Amount Due</span>
              <span className="text-[24px] font-bold">
                {formatCurrency(invoice.total)}
              </span>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
