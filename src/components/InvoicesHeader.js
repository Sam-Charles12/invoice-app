import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function InvoicesHeader({
  summaryText,
  compactSummaryText,
  onNewInvoice,
  isDarkMode,
  selectedStatuses,
  onToggleStatusFilter,
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const statusOptions = ["all", "draft", "pending", "paid"];

  return (
    <header className="flex items-center justify-between gap-3">
      <div>
        <h1 className="font-heading text-[29px] font-bold leading-none text-text">
          Invoices
        </h1>
        <p className="mt-1 text-[11px] font-medium text-muted">
          <span className="sm:hidden">{compactSummaryText}</span>
          <span className="hidden sm:inline">{summaryText}</span>
        </p>
      </div>

      <div className="relative flex items-center gap-4 sm:gap-6">
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className={`flex items-center gap-2 text-[12px] font-bold transition-colors hover:text-primary ${
              isDarkMode ? "text-[#dfe3fa]" : "text-text"
            }`}
          >
            <span className="whitespace-nowrap text-[12px]">
              <span className="sm:hidden">Filter</span>
              <span className="hidden sm:inline">Filter by status</span>
            </span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-[10px] text-primary transition-transform sm:text-[10px] ${
                isFilterOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isFilterOpen && (
            <div
              className={`absolute right-0 top-[38px] z-20 w-[190px] rounded-[8px] p-6 shadow-[0_12px_24px_rgba(72,84,159,0.2)] sm:top-[40px] ${
                isDarkMode ? "bg-[#252945]" : "bg-white"
              }`}
            >
              <div className="space-y-4">
                {statusOptions.map((status) => {
                  const checked =
                    status === "all"
                      ? selectedStatuses.length === 0
                      : selectedStatuses.includes(status);
                  return (
                    <label
                      key={status}
                      className="flex cursor-pointer items-center gap-3 rounded-[4px] px-1 py-0.5 transition-colors hover:bg-[var(--soft-bg)]"
                    >
                      <span
                        className={`grid h-4 w-4 place-items-center rounded-[2px] border ${
                          checked
                            ? "border-primary bg-primary"
                            : "border-border bg-[var(--soft-bg)]"
                        }`}
                      >
                        {checked ? (
                          <span className="text-[10px] font-bold text-white">
                            ✓
                          </span>
                        ) : null}
                      </span>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => onToggleStatusFilter(status)}
                      />
                      <span
                        className={`text-[15px] font-bold capitalize ${
                          isDarkMode ? "text-white" : "text-text"
                        }`}
                      >
                        {status === "all" ? "All" : status}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onNewInvoice}
          className="flex items-center gap-2 rounded-full bg-primary px-2 py-1.5 pr-3 text-[11px] font-bold text-white transition-colors hover:bg-primary-hover sm:gap-2.5 sm:pr-3.5 sm:text-[12px]"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-primary shadow-sm sm:h-6 sm:w-6">
            <FontAwesomeIcon icon={faPlus} className="text-[12px]" />
          </span>
          <span className="whitespace-nowrap">
            <span className="sm:hidden">New</span>
            <span className="hidden sm:inline">New Invoice</span>
          </span>
        </button>
      </div>
    </header>
  );
}
