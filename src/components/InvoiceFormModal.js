import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function InvoiceFormModal({
  isOpen,
  editingInvoiceId,
  isDarkMode,
  formData,
  formErrors,
  formAlerts,
  inputClass,
  onClose,
  onFieldChange,
  onItemChange,
  onAddItem,
  onRemoveItem,
  getLineTotal,
  onSaveDraft,
  onSavePending,
  onSaveChanges,
}) {
  if (!isOpen) {
    return null;
  }

  const getInputClass = (fieldName) => {
    return `${inputClass} ${formErrors[fieldName] ? "border-danger focus:border-danger" : ""}`;
  };

  const getItemInputClass = (fieldName) => {
    return `h-10 rounded-[4px] border border-border bg-[var(--input-bg)] px-3 text-[13px] font-bold text-text outline-none ${
      formErrors[fieldName] ? "border-danger focus:border-danger" : ""
    }`;
  };

  return (
    <div
      className="fixed inset-0 left-[80px] z-30 bg-[var(--overlay)]"
      onClick={onClose}
    >
      <div
        className={`absolute top-0 flex h-full w-[clamp(320px,52vw,540px)] flex-col rounded-r-[16px] shadow-[0_20px_40px_rgba(72,84,159,0.25)] ${
          isDarkMode ? "bg-[#141625]" : "bg-white"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-10 pb-6 pt-8">
          <h2 className="font-heading text-[28px] font-bold leading-none text-text">
            {editingInvoiceId ? `Edit #${editingInvoiceId}` : "New Invoice"}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto px-10 pb-28">
          <section className="space-y-5">
            <h3 className="text-[13px] font-bold text-primary">Bill From</h3>

            <div className="space-y-5">
              <label className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-[12px] leading-none">
                  <span className="text-muted">Street Address</span>
                  {formErrors.senderStreet ? (
                    <span className="text-[10px] font-medium text-danger">
                      {formErrors.senderStreet}
                    </span>
                  ) : null}
                </div>
                <input
                  type="text"
                  name="senderStreet"
                  value={formData.senderStreet}
                  onChange={onFieldChange}
                  placeholder="Street Address"
                  className={getInputClass("senderStreet")}
                />
              </label>

              <div className="grid grid-cols-3 gap-4">
                <label className="flex flex-col gap-3">
                  <span className="text-[12px] leading-none text-muted">
                    City
                  </span>
                  <input
                    type="text"
                    name="senderCity"
                    value={formData.senderCity}
                    onChange={onFieldChange}
                    placeholder="City"
                    className={getInputClass("senderCity")}
                  />
                </label>
                <label className="flex flex-col gap-3">
                  <span className="text-[12px] leading-none text-muted">
                    Post Code
                  </span>
                  <input
                    type="text"
                    name="senderPostCode"
                    value={formData.senderPostCode}
                    onChange={onFieldChange}
                    placeholder="Post Code"
                    className={getInputClass("senderPostCode")}
                  />
                </label>
                <label className="flex flex-col gap-3">
                  <span className="text-[12px] leading-none text-muted">
                    Country
                  </span>
                  <input
                    type="text"
                    name="senderCountry"
                    value={formData.senderCountry}
                    onChange={onFieldChange}
                    placeholder="Country"
                    className={getInputClass("senderCountry")}
                  />
                </label>
              </div>
            </div>
          </section>

          <section className="mt-10 space-y-5">
            <h3 className="text-[13px] font-bold text-primary">Bill To</h3>

            <div className="space-y-5">
              <label className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-[12px] leading-none">
                  <span className="text-muted">Client&apos;s Name</span>
                  {formErrors.clientName ? (
                    <span className="text-[10px] font-medium text-danger">
                      {formErrors.clientName}
                    </span>
                  ) : null}
                </div>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={onFieldChange}
                  placeholder="Client name"
                  className={getInputClass("clientName")}
                />
              </label>
              <label className="flex flex-col gap-3">
                <span className="text-[12px] leading-none text-muted">
                  Client&apos;s Email
                </span>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={onFieldChange}
                  placeholder="e.g. email@example.com"
                  className={getInputClass("clientEmail")}
                />
              </label>
              <label className="flex flex-col gap-3">
                <span className="text-[12px] leading-none text-muted">
                  Street Address
                </span>
                <input
                  type="text"
                  name="clientStreet"
                  value={formData.clientStreet}
                  onChange={onFieldChange}
                  placeholder="Street Address"
                  className={getInputClass("clientStreet")}
                />
              </label>

              <div className="grid grid-cols-3 gap-4">
                <label className="flex flex-col gap-3">
                  <span className="text-[12px] leading-none text-muted">
                    City
                  </span>
                  <input
                    type="text"
                    name="clientCity"
                    value={formData.clientCity}
                    onChange={onFieldChange}
                    placeholder="City"
                    className={getInputClass("clientCity")}
                  />
                </label>
                <label className="flex flex-col gap-3">
                  <span className="text-[12px] leading-none text-muted">
                    Post Code
                  </span>
                  <input
                    type="text"
                    name="clientPostCode"
                    value={formData.clientPostCode}
                    onChange={onFieldChange}
                    placeholder="Post Code"
                    className={getInputClass("clientPostCode")}
                  />
                </label>
                <label className="flex flex-col gap-3">
                  <span className="text-[12px] leading-none text-muted">
                    Country
                  </span>
                  <input
                    type="text"
                    name="clientCountry"
                    value={formData.clientCountry}
                    onChange={onFieldChange}
                    placeholder="Country"
                    className={getInputClass("clientCountry")}
                  />
                </label>
              </div>
            </div>
          </section>

          <section className="mt-10 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-3">
                <span className="text-[12px] leading-none text-muted">
                  Issue Date
                </span>
                <input
                  type="date"
                  name="invoiceDate"
                  value={formData.invoiceDate}
                  onChange={onFieldChange}
                  className={getInputClass("invoiceDate")}
                />
              </label>

              <label className="flex flex-col gap-3">
                <span className="text-[12px] leading-none text-muted">
                  Payment Terms
                </span>
                <div className="relative">
                  <select
                    name="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={onFieldChange}
                    className={`${inputClass} w-full appearance-none pr-9`}
                  >
                    <option value="1">Net 1 Day</option>
                    <option value="7">Net 7 Days</option>
                    <option value="14">Net 14 Days</option>
                    <option value="30">Net 30 Days</option>
                  </select>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="pointer-events-none absolute right-4 top-1/2 text-[10px] text-primary"
                  />
                </div>
              </label>
            </div>

            <label className="flex flex-col gap-3">
              <span className="text-[12px] leading-none text-muted">
                Project Description
              </span>
              <input
                type="text"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={onFieldChange}
                placeholder="e.g. Graphic Design Service"
                className={getInputClass("projectDescription")}
              />
            </label>

            <div className="space-y-3.5">
              <h4 className="text-[15px] font-bold text-muted">Item List</h4>

              <div className="grid grid-cols-[minmax(150px,1fr)_56px_90px_90px_16px] gap-2.5 text-[12px] text-muted">
                <span>Item Name</span>
                <span>Qty.</span>
                <span>Price</span>
                <span>Total</span>
              </div>

              {formData.items.map((item, index) => (
                <div
                  key={`item-${index}`}
                  className="grid grid-cols-[minmax(150px,1fr)_56px_90px_90px_16px] items-center gap-2.5"
                >
                  <input
                    type="text"
                    value={item.name}
                    onChange={(event) =>
                      onItemChange(index, "name", event.target.value)
                    }
                    placeholder="Item Name"
                    className={getItemInputClass(`item-name-${index}`)}
                  />
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(event) =>
                      onItemChange(index, "quantity", event.target.value)
                    }
                    placeholder="1"
                    className={getItemInputClass(`item-quantity-${index}`)}
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(event) =>
                      onItemChange(index, "price", event.target.value)
                    }
                    placeholder="0.00"
                    className={getItemInputClass(`item-price-${index}`)}
                  />
                  <input
                    type="text"
                    value={getLineTotal(item)}
                    readOnly
                    className="h-10 border-none bg-transparent px-0 text-[13px] font-bold text-muted outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveItem(index)}
                    aria-label="Remove item"
                    className="grid h-6 w-6 place-items-center text-[12px] text-muted transition-colors hover:text-danger"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={onAddItem}
                className="w-full rounded-full bg-[var(--soft-bg)] py-3 text-[13px] font-bold text-[#7e88c3] transition-colors hover:bg-[var(--soft-bg-hover)]"
              >
                + Add New Item
              </button>
            </div>

            {formAlerts.length > 0 ? (
              <div className="space-y-1 text-[10px] font-medium text-danger">
                {formAlerts.map((alert) => (
                  <p key={alert}>{alert}</p>
                ))}
              </div>
            ) : null}
          </section>
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 flex items-center justify-between rounded-r-[16px] px-10 py-4 shadow-[0_-10px_24px_rgba(72,84,159,0.08)] ${
            isDarkMode ? "bg-[#141625]" : "bg-white"
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[var(--soft-bg)] px-5 py-3 text-[13px] font-bold text-[#7e88c3] transition-colors hover:bg-[var(--soft-bg-hover)]"
          >
            {editingInvoiceId ? "Cancel" : "Discard"}
          </button>

          {editingInvoiceId ? (
            <button
              type="button"
              onClick={onSaveChanges}
              className="rounded-full bg-primary px-5 py-3 text-[13px] font-bold text-white transition-colors hover:bg-primary-hover"
            >
              Save Changes
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onSaveDraft}
                className="rounded-full bg-[var(--soft-bg)] px-5 py-3 text-[13px] font-bold text-muted transition-colors hover:bg-[var(--soft-bg-hover)]"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={onSavePending}
                className="rounded-full bg-primary px-5 py-3 text-[13px] font-bold text-white transition-colors hover:bg-primary-hover"
              >
                Save &amp; Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
