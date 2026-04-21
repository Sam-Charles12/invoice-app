import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faChevronDown,
  faCirclePlus,
  faMoon,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import logo from "./img/Oval.png";
import emptyIllustration from "./img/Email campaign_Flatline 2.png";
import { useState } from "react";

const createInitialFormData = () => ({
  senderStreet: "",
  senderCity: "",
  senderPostCode: "",
  senderCountry: "",
  clientName: "",
  clientEmail: "",
  clientStreet: "",
  clientCity: "",
  clientPostCode: "",
  clientCountry: "",
  invoiceDate: "",
  paymentTerms: "30",
  projectDescription: "",
  items: [{ name: "", quantity: "1", price: "" }],
});

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState(createInitialFormData());
  const [invoices, setInvoices] = useState([]);

  const inputClass =
    "h-10 rounded-[4px] border border-[#dfe3fa] px-4 text-[13px] font-bold text-text outline-none transition-colors focus:border-primary";

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    setFormData((prev) => {
      const nextItems = [...prev.items];
      nextItems[index] = { ...nextItems[index], [field]: value };
      return { ...prev, items: nextItems };
    });
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: "1", price: "" }],
    }));
  };

  const removeItem = (index) => {
    setFormData((prev) => {
      if (prev.items.length === 1) {
        return { ...prev, items: [{ name: "", quantity: "1", price: "" }] };
      }

      return {
        ...prev,
        items: prev.items.filter((_, itemIndex) => itemIndex !== index),
      };
    });
  };

  const getLineTotal = (item) => {
    const qty = Number(item.quantity);
    const price = Number(item.price);
    if (!Number.isFinite(qty) || !Number.isFinite(price)) {
      return "0.00";
    }
    return (qty * price).toFixed(2);
  };

  const getInvoiceTotal = (items) => {
    return items.reduce((sum, item) => {
      const qty = Number(item.quantity);
      const price = Number(item.price);
      if (!Number.isFinite(qty) || !Number.isFinite(price)) {
        return sum;
      }
      return sum + qty * price;
    }, 0);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatDueDate = (invoiceDate, paymentTerms) => {
    if (!invoiceDate) {
      return "No due date";
    }
    const date = new Date(invoiceDate);
    if (Number.isNaN(date.getTime())) {
      return "No due date";
    }
    date.setDate(date.getDate() + Number(paymentTerms || 0));
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const generateInvoiceId = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letterPart =
      letters[Math.floor(Math.random() * letters.length)] +
      letters[Math.floor(Math.random() * letters.length)];
    const numberPart = Math.floor(1000 + Math.random() * 9000);
    return `${letterPart}${numberPart}`;
  };

  const buildInvoice = (status) => {
    const filteredItems = formData.items.filter(
      (item) => item.name || item.quantity || item.price,
    );

    const safeItems =
      filteredItems.length > 0
        ? filteredItems
        : [{ name: "Untitled item", quantity: "1", price: "0" }];

    return {
      id: generateInvoiceId(),
      clientName: formData.clientName || "Unnamed Client",
      dueDate: formatDueDate(formData.invoiceDate, formData.paymentTerms),
      total: getInvoiceTotal(safeItems),
      status,
      items: safeItems,
    };
  };

  const saveInvoice = (status) => {
    const invoice = buildInvoice(status);
    setInvoices((prev) => [invoice, ...prev]);
    setFormData(createInitialFormData());
    setIsFormOpen(false);
  };

  const closeForm = () => setIsFormOpen(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <aside className="fixed left-0 top-0 z-20 flex h-screen w-[80px] flex-col overflow-hidden rounded-r-[16px] bg-dark">
        <div className="relative h-[92px] bg-primary">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={logo}
              alt="Invoice logo"
              className="h-6 w-6 object-contain"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 rounded-tl-[16px] bg-primary-hover" />
        </div>

        <div className="mt-auto flex flex-col items-center">
          <button
            type="button"
            aria-label="Toggle theme"
            className="mb-6 text-[#7e88c3] transition-colors hover:text-white"
          >
            <FontAwesomeIcon icon={faMoon} className="text-[18px]" />
          </button>

          <div className="h-px w-full bg-[#494e6e]" />

          <button
            type="button"
            aria-label="User profile"
            className="my-5 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#ff8f7e] to-[#ec5757] text-xs font-semibold text-white"
          >
            FR
          </button>
        </div>
      </aside>

      <main className="ml-[80px] px-12 pb-8 pt-10">
        <section className="mx-auto max-w-[700px]">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-[29px] font-bold leading-none text-text">
                Invoices
              </h1>
              <p className="mt-1 text-[11px] font-medium text-[#888eb0]">
                {invoices.length === 0
                  ? "No invoices"
                  : `There ${invoices.length === 1 ? "is" : "are"} ${invoices.length} total invoice${invoices.length === 1 ? "" : "s"}`}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <button
                type="button"
                className="flex items-center gap-2 text-[12px] font-bold text-[#1e2139]"
              >
                <span>Filter by status</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="text-[10px] text-primary"
                />
              </button>

              <button
                type="button"
                onClick={() => setIsFormOpen(true)}
                className="flex items-center gap-2.5 rounded-full bg-primary px-2 py-1.5 pr-3.5 text-[12px] font-bold text-white transition-colors hover:bg-primary-hover"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-bg">
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    className="text-[20px]"
                  />
                </span>
                <span>New Invoice</span>
              </button>
            </div>
          </header>

          {invoices.length === 0 ? (
            <section className="mx-auto mt-28 flex max-w-[320px] flex-col items-center text-center">
              <img
                src={emptyIllustration}
                alt="Empty invoice list illustration"
                className="h-auto w-[220px] object-contain"
              />

              <h2 className="mt-10 font-heading text-[30px] font-bold leading-none text-text">
                There is nothing here
              </h2>
              <p className="mt-4 max-w-[220px] text-[12px] font-medium leading-5 text-muted">
                Create an invoice by clicking the{" "}
                <span className="font-bold">New Invoice</span> button and get
                started
              </p>
            </section>
          ) : (
            <section className="mt-8 space-y-3">
              {invoices.map((invoice) => (
                <article
                  key={invoice.id}
                  className="grid grid-cols-[102px_1fr_1.2fr_120px_86px_14px] items-center gap-3 rounded-[8px] cursor-pointer bg-white px-7 py-4 shadow-[0_4px_12px_rgba(72,84,159,0.08)]"
                >
                  <p className="text-[17px] font-bold text-text">
                    <span className="text-[#7e88c3]">#</span>
                    {invoice.id}
                  </p>
                  <p className="text-[11px] font-medium text-[#7e88c3]">
                    Due {invoice.dueDate}
                  </p>
                  <p className="truncate text-[11px] font-medium text-[#7e88c3]">
                    {invoice.clientName}
                  </p>
                  <p className="text-right text-[20px] font-bold text-text">
                    {formatCurrency(invoice.total)}
                  </p>
                  <div
                    className={`flex items-center justify-center gap-1.5 rounded-[6px] py-2.5 text-[13px] font-bold ${
                      invoice.status === "pending"
                        ? "bg-[#fff8f0] text-[#ff8f00]"
                        : "bg-[#f4f4f8] text-[#373b53]"
                    }`}
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
          )}
        </section>
      </main>

      {isFormOpen && (
        <div
          className="fixed inset-0 left-[80px] z-30 bg-black/50"
          onClick={closeForm}
        >
          <div
            className="absolute  top-0 flex h-full w-[clamp(320px,52vw,540px)] flex-col rounded-r-[16px] bg-white shadow-[0_20px_40px_rgba(72,84,159,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-10 pb-6 pt-8">
              <h2 className="font-heading text-[28px] font-bold leading-none text-text">
                New Invoice
              </h2>

              {/* <button
                type="button"
                onClick={closeForm}
                className="rounded-full px-3 py-2 text-[12px] font-bold text-[#7e88c3] transition-colors hover:text-text"
              >
                Close
              </button> */}
            </div>

            <div className="flex-1 overflow-y-auto px-10 pb-28">
              <section className="space-y-5">
                <h3 className="text-[13px] font-bold text-primary">
                  Bill From
                </h3>

                <div className="space-y-5">
                  <label className="flex flex-col gap-3">
                    <span className="text-[12px] leading-none text-[#7e88c3]">
                      Street Address
                    </span>
                    <input
                      type="text"
                      name="senderStreet"
                      value={formData.senderStreet}
                      onChange={handleFieldChange}
                      placeholder="Street Address"
                      className={inputClass}
                    />
                  </label>

                  <div className="grid grid-cols-3 gap-4">
                    <label className="flex flex-col gap-3">
                      <span className="text-[12px] leading-none text-[#7e88c3]">
                        City
                      </span>
                      <input
                        type="text"
                        name="senderCity"
                        value={formData.senderCity}
                        onChange={handleFieldChange}
                        placeholder="City"
                        className={inputClass}
                      />
                    </label>
                    <label className="flex flex-col gap-3">
                      <span className="text-[12px] leading-none text-[#7e88c3]">
                        Post Code
                      </span>
                      <input
                        type="text"
                        name="senderPostCode"
                        value={formData.senderPostCode}
                        onChange={handleFieldChange}
                        placeholder="Post Code"
                        className={inputClass}
                      />
                    </label>
                    <label className="flex flex-col gap-3">
                      <span className="text-[12px] leading-none text-[#7e88c3]">
                        Country
                      </span>
                      <input
                        type="text"
                        name="senderCountry"
                        value={formData.senderCountry}
                        onChange={handleFieldChange}
                        placeholder="Country"
                        className={inputClass}
                      />
                    </label>
                  </div>
                </div>
              </section>

              <section className="mt-10 space-y-5">
                <h3 className="text-[13px] font-bold text-primary">Bill To</h3>

                <div className="space-y-5">
                  <label className="flex flex-col gap-3">
                    <span className="text-[12px] leading-none text-[#7e88c3]">
                      Client&apos;s Name
                    </span>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleFieldChange}
                      placeholder="Client name"
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-3">
                    <span className="text-[12px] leading-none text-[#7e88c3]">
                      Client&apos;s Email
                    </span>
                    <input
                      type="email"
                      name="clientEmail"
                      value={formData.clientEmail}
                      onChange={handleFieldChange}
                      placeholder="client@example.com"
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-3">
                    <span className="text-[12px] leading-none text-[#7e88c3]">
                      Street Address
                    </span>
                    <input
                      type="text"
                      name="clientStreet"
                      value={formData.clientStreet}
                      onChange={handleFieldChange}
                      placeholder="Street Address"
                      className={inputClass}
                    />
                  </label>

                  <div className="grid grid-cols-3 gap-4">
                    <label className="flex flex-col gap-3">
                      <span className="text-[12px] leading-none text-[#7e88c3]">
                        City
                      </span>
                      <input
                        type="text"
                        name="clientCity"
                        value={formData.clientCity}
                        onChange={handleFieldChange}
                        placeholder="City"
                        className={inputClass}
                      />
                    </label>
                    <label className="flex flex-col gap-3">
                      <span className="text-[12px] leading-none text-[#7e88c3]">
                        Post Code
                      </span>
                      <input
                        type="text"
                        name="clientPostCode"
                        value={formData.clientPostCode}
                        onChange={handleFieldChange}
                        placeholder="Post Code"
                        className={inputClass}
                      />
                    </label>
                    <label className="flex flex-col gap-3">
                      <span className="text-[12px] leading-none text-[#7e88c3]">
                        Country
                      </span>
                      <input
                        type="text"
                        name="clientCountry"
                        value={formData.clientCountry}
                        onChange={handleFieldChange}
                        placeholder="Country"
                        className={inputClass}
                      />
                    </label>
                  </div>
                </div>
              </section>

              <section className="mt-10 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex flex-col gap-3">
                    <span className="text-[12px] leading-none text-[#7e88c3]">
                      Invoice Date
                    </span>
                    <input
                      type="date"
                      name="invoiceDate"
                      value={formData.invoiceDate}
                      onChange={handleFieldChange}
                      className={inputClass}
                    />
                  </label>

                  <label className="flex flex-col gap-3">
                    <span className="text-[12px] leading-none text-[#7e88c3]">
                      Payment Terms
                    </span>
                    <div className="relative">
                      <select
                        name="paymentTerms"
                        value={formData.paymentTerms}
                        onChange={handleFieldChange}
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
                  <span className="text-[12px] leading-none text-[#7e88c3]">
                    Project Description
                  </span>
                  <input
                    type="text"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleFieldChange}
                    placeholder="Project Description"
                    className={inputClass}
                  />
                </label>

                <div className="space-y-3.5">
                  <h4 className="text-[15px] font-bold text-[#777f98]">
                    Item List
                  </h4>

                  <div className="grid grid-cols-[minmax(150px,1fr)_56px_90px_90px_16px] gap-2.5 text-[12px] text-[#7e88c3]">
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
                          handleItemChange(index, "name", event.target.value)
                        }
                        placeholder="Item Name"
                        className="h-10 rounded-[4px] border border-[#dfe3fa] px-3 text-[13px] font-bold text-text outline-none"
                      />
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(event) =>
                          handleItemChange(
                            index,
                            "quantity",
                            event.target.value,
                          )
                        }
                        placeholder="1"
                        className="h-10 rounded-[4px] border border-[#dfe3fa] px-3 text-[13px] font-bold text-text outline-none"
                      />
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.price}
                        onChange={(event) =>
                          handleItemChange(index, "price", event.target.value)
                        }
                        placeholder="0.00"
                        className="h-10 rounded-[4px] border border-[#dfe3fa] px-3 text-[13px] font-bold text-text outline-none"
                      />
                      <input
                        type="text"
                        value={getLineTotal(item)}
                        readOnly
                        className="h-10 border-none bg-transparent px-0 text-[13px] font-bold text-[#888eb0] outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        aria-label="Remove item"
                        className="grid h-6 w-6 place-items-center text-[12px] text-[#888eb0] transition-colors hover:text-danger"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addItem}
                    className="w-full rounded-full bg-[#f9fafe] py-3 text-[13px] font-bold text-[#7e88c3] transition-colors hover:bg-[#edf0fd]"
                  >
                    + Add New Item
                  </button>
                </div>
              </section>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between rounded-r-[16px] bg-white px-10 py-4 shadow-[0_-10px_24px_rgba(72,84,159,0.08)]">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-full bg-[#f9fafe] px-5 py-3 text-[13px] font-bold text-[#7e88c3] transition-colors hover:bg-[#edf0fd]"
              >
                Discard
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => saveInvoice("draft")}
                  className="rounded-full bg-[#373b53] px-5 py-3 text-[13px] font-bold text-[#888eb0] transition-colors hover:bg-[#1e2139]"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  onClick={() => saveInvoice("pending")}
                  className="rounded-full bg-primary px-5 py-3 text-[13px] font-bold text-white transition-colors hover:bg-primary-hover"
                >
                  Save &amp; Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
