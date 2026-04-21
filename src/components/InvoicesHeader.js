import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function InvoicesHeader({
  invoicesCount,
  onNewInvoice,
  isDarkMode,
}) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="font-heading text-[29px] font-bold leading-none text-text">
          Invoices
        </h1>
        <p className="mt-1 text-[11px] font-medium text-muted">
          {invoicesCount === 0
            ? "No invoices"
            : `There ${invoicesCount === 1 ? "is" : "are"} ${invoicesCount} total invoice${invoicesCount === 1 ? "" : "s"}`}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <button
          type="button"
          className={`flex items-center gap-2 text-[12px] font-bold ${
            isDarkMode ? "text-[#dfe3fa]" : "text-text"
          }`}
        >
          <span>Filter by status</span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-[10px] text-primary"
          />
        </button>

        <button
          type="button"
          onClick={onNewInvoice}
          className="flex items-center gap-2.5 rounded-full bg-primary px-2 py-1.5 pr-3.5 text-[12px] font-bold text-white transition-colors hover:bg-primary-hover"
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-primary shadow-sm">
            <FontAwesomeIcon icon={faPlus} className="text-[12px]" />
          </span>
          <span>New Invoice</span>
        </button>
      </div>
    </header>
  );
}
