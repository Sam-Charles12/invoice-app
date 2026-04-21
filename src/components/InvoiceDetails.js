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
    <section className="mt-8 space-y-6 pb-28 md:pb-0">
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
        className={`flex items-center justify-between rounded-[8px] px-6 py-6 shadow-[0_4px_12px_rgba(72,84,159,0.08)] md:px-8 ${
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

          <div className="hidden items-center gap-1.5 sm:gap-2 md:flex">
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
        className={`rounded-[8px] px-6 py-8 shadow-[0_4px_12px_rgba(72,84,159,0.08)] md:px-10 md:py-10 ${
          isDarkMode ? "bg-[#1e2139]" : "bg-white"
        }`}
      >
        <div className="space-y-8 md:hidden">
          <div>
            <h2 className="text-[17px] font-bold leading-none text-text">
              <span className="text-muted">#</span>
              {invoice.id}
            </h2>
            <p className="mt-2 text-[15px] text-muted">{invoice.description}</p>
          </div>

          <div className="text-[15px] leading-7 text-muted">
            {formatAddressLines(invoice.senderAddress).map((line) => (
              <p key={`sender-mobile-${line}`}>{line}</p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-[12px] text-muted">Invoice Date</p>
              <p className="mt-3 text-[17px] font-bold leading-none text-text">
                {invoice.createdAt}
              </p>

              <p className="mt-8 text-[12px] text-muted">Payment Due</p>
              <p className="mt-3 text-[17px] font-bold leading-none text-text">
                {invoice.dueDate}
              </p>
            </div>

            <div>
              <p className="text-[12px] text-muted">Bill To</p>
              <p className="mt-3 text-[17px] font-bold leading-none text-text">
                {invoice.clientName}
              </p>
              <div className="mt-3 text-[15px] leading-7 text-muted">
                {formatAddressLines(invoice.clientAddress).map((line) => (
                  <p key={`client-mobile-${line}`}>{line}</p>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-[12px] text-muted">Sent to</p>
            <p className="mt-3 break-all text-[17px] font-bold leading-none text-text">
              {invoice.clientEmail}
            </p>
          </div>

          <div className="overflow-hidden rounded-[8px] bg-[var(--soft-bg)]">
            <div className="space-y-6 px-6 pb-8 pt-8">
              {invoice.items.map((item, index) => {
                const itemTotal = Number(getLineTotal(item));
                return (
                  <div
                    key={`detail-item-mobile-${index}`}
                    className="flex items-end justify-between gap-4"
                  >
                    <div>
                      <p className="text-[15px] font-bold leading-none text-text">
                        {item.name || "Untitled item"}
                      </p>
                      <p className="mt-2 text-[15px] font-bold leading-none text-muted">
                        {item.quantity || 0} x {formatCurrency(Number(item.price) || 0)}
                      </p>
                    </div>
                    <p className="text-[17px] font-bold leading-none text-text">
                      {formatCurrency(Number.isFinite(itemTotal) ? itemTotal : 0)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between bg-[var(--panel-strong)] px-6 py-6 text-white">
              <span className="text-[13px] font-medium">Grand Total</span>
              <span className="text-[24px] font-bold leading-none">
                {formatCurrency(invoice.total)}
              </span>
            </div>
          </div>
        </div>

        <div className="hidden w-[117.647%] origin-top-left scale-[0.85] md:block">
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

      <div
        className={`fixed inset-x-0 bottom-0 z-20 flex items-center gap-3 px-6 py-6 shadow-[0_-10px_24px_rgba(72,84,159,0.08)] md:hidden ${
          isDarkMode ? "bg-[#141625]" : "bg-white"
        }`}
      >
        <button
          type="button"
          onClick={onEdit}
          className="flex-1 whitespace-nowrap rounded-full bg-[var(--soft-bg)] px-4 py-3 text-[13px] font-bold text-[#7e88c3] transition-colors hover:bg-[var(--soft-bg-hover)]"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="flex-1 whitespace-nowrap rounded-full bg-danger px-4 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#ff9797]"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={onMarkAsPaid}
          className="flex-[1.4] whitespace-nowrap rounded-full bg-primary px-4 py-3 text-[13px] font-bold text-white transition-colors hover:bg-primary-hover"
        >
          Mark as Paid
        </button>
      </div>
    </section>
  );
}
