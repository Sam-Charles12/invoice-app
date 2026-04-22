import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import InvoicesHeader from "./components/InvoicesHeader";
import EmptyInvoicesState from "./components/EmptyInvoicesState";
import InvoiceList from "./components/InvoiceList";
import InvoiceDetails from "./components/InvoiceDetails";
import InvoiceFormModal from "./components/InvoiceFormModal";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import {
  createInitialFormData,
  formatDisplayDate,
  formatDueDate,
  formatCurrency,
  formatAddressLines,
  generateInvoiceId,
  getInvoiceTotal,
  getLineTotal,
  getStatusStyle,
} from "./utils/invoiceUtils";

const INVOICES_STORAGE_KEY = "invoice-app-invoices";

const loadStoredInvoices = () => {
  try {
    const storedInvoices = localStorage.getItem(INVOICES_STORAGE_KEY);
    const parsedInvoices = storedInvoices ? JSON.parse(storedInvoices) : [];
    return Array.isArray(parsedInvoices) ? parsedInvoices : [];
  } catch {
    return [];
  }
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("invoice-theme");
    return savedTheme === "dark";
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState(createInitialFormData());
  const [invoices, setInvoices] = useState(() => loadStoredInvoices());
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [editingInvoiceId, setEditingInvoiceId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formAlerts, setFormAlerts] = useState([]);

  const inputClass =
    "h-11 rounded-[4px] border border-border bg-[var(--input-bg)] px-4 text-[13px] font-bold text-text outline-none transition-colors hover:border-primary focus:border-primary sm:h-10 sm:text-[13px]";

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormErrors({});
    setFormAlerts([]);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    setFormErrors({});
    setFormAlerts([]);
    setFormData((prev) => {
      const nextItems = [...prev.items];
      nextItems[index] = { ...nextItems[index], [field]: value };
      return { ...prev, items: nextItems };
    });
  };

  const addItem = () => {
    setFormErrors({});
    setFormAlerts([]);
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: "1", price: "" }],
    }));
  };

  const removeItem = (index) => {
    setFormErrors({});
    setFormAlerts([]);
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

  const validateInvoiceForm = () => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const requiredFields = [
      "senderStreet",
      "senderCity",
      "senderPostCode",
      "senderCountry",
      "clientName",
      "clientEmail",
      "clientStreet",
      "clientCity",
      "clientPostCode",
      "clientCountry",
      "invoiceDate",
      "projectDescription",
    ];

    requiredFields.forEach((fieldName) => {
      if (!String(formData[fieldName] || "").trim()) {
        errors[fieldName] = "can't be empty";
      }
    });

    if (
      String(formData.clientEmail || "").trim() &&
      !emailPattern.test(formData.clientEmail)
    ) {
      errors.clientEmail = "invalid email";
    }

    const hasCompleteItem = formData.items.some(
      (item) =>
        String(item.name || "").trim() &&
        Number(item.quantity) > 0 &&
        Number(item.price) > 0,
    );

    formData.items.forEach((item, index) => {
      const hasAnyValue =
        String(item.name || "").trim() ||
        String(item.quantity || "").trim() ||
        String(item.price || "").trim();

      if (!hasAnyValue) {
        return;
      }

      if (!String(item.name || "").trim()) {
        errors[`item-name-${index}`] = "can't be empty";
      }
      if (!(Number(item.quantity) > 0)) {
        errors[`item-quantity-${index}`] = "must be greater than 0";
      }
      if (!(Number(item.price) > 0)) {
        errors[`item-price-${index}`] = "must be greater than 0";
      }
    });

    const alerts = [];
    if (Object.keys(errors).length > 0) {
      alerts.push("- All fields must be added");
    }
    if (!hasCompleteItem) {
      alerts.push("- An item must be added");
    }

    setFormErrors(errors);
    setFormAlerts(alerts);

    return Object.keys(errors).length === 0 && hasCompleteItem;
  };

  const buildInvoice = (status, existingInvoiceId = null) => {
    const filteredItems = formData.items.filter(
      (item) => item.name || item.quantity || item.price,
    );

    const safeItems =
      filteredItems.length > 0
        ? filteredItems
        : [{ name: "Untitled item", quantity: "1", price: "0" }];

    const invoiceDateLabel = formatDisplayDate(formData.invoiceDate);
    return {
      id: existingInvoiceId || generateInvoiceId(),
      clientName: formData.clientName || "Unnamed Client",
      clientEmail: formData.clientEmail || "No email",
      description: formData.projectDescription || "No project description",
      createdAt: invoiceDateLabel,
      invoiceDate: formData.invoiceDate,
      paymentTerms: formData.paymentTerms,
      dueDate: formatDueDate(formData.invoiceDate, formData.paymentTerms),
      total: getInvoiceTotal(safeItems),
      status,
      senderAddress: {
        street: formData.senderStreet || "",
        city: formData.senderCity || "",
        postCode: formData.senderPostCode || "",
        country: formData.senderCountry || "",
      },
      clientAddress: {
        street: formData.clientStreet || "",
        city: formData.clientCity || "",
        postCode: formData.clientPostCode || "",
        country: formData.clientCountry || "",
      },
      items: safeItems,
    };
  };

  const saveInvoice = (status) => {
    const invoice = buildInvoice(status, editingInvoiceId);

    if (editingInvoiceId) {
      setInvoices((prev) =>
        prev.map((existingInvoice) =>
          existingInvoice.id === editingInvoiceId ? invoice : existingInvoice,
        ),
      );
    } else {
      setInvoices((prev) => [invoice, ...prev]);
    }

    setSelectedInvoiceId(invoice.id);
    setFormData(createInitialFormData());
    setEditingInvoiceId(null);
    setFormErrors({});
    setFormAlerts([]);
    setIsFormOpen(false);
  };

  const saveWithValidation = (status) => {
    if (!validateInvoiceForm()) {
      return;
    }
    saveInvoice(status);
  };

  const openNewInvoiceForm = () => {
    setEditingInvoiceId(null);
    setFormData(createInitialFormData());
    setFormErrors({});
    setFormAlerts([]);
    setIsFormOpen(true);
  };

  const openEditInvoiceForm = (invoice) => {
    if (!invoice) {
      return;
    }

    setEditingInvoiceId(invoice.id);
    setFormData({
      senderStreet: invoice.senderAddress?.street || "",
      senderCity: invoice.senderAddress?.city || "",
      senderPostCode: invoice.senderAddress?.postCode || "",
      senderCountry: invoice.senderAddress?.country || "",
      clientName: invoice.clientName || "",
      clientEmail: invoice.clientEmail || "",
      clientStreet: invoice.clientAddress?.street || "",
      clientCity: invoice.clientAddress?.city || "",
      clientPostCode: invoice.clientAddress?.postCode || "",
      clientCountry: invoice.clientAddress?.country || "",
      invoiceDate: invoice.invoiceDate || "",
      paymentTerms: invoice.paymentTerms || "30",
      projectDescription: invoice.description || "",
      items:
        invoice.items?.length > 0
          ? invoice.items.map((item) => ({
              name: item.name || "",
              quantity: String(item.quantity || "1"),
              price: String(item.price || ""),
            }))
          : [{ name: "", quantity: "1", price: "" }],
    });
    setFormErrors({});
    setFormAlerts([]);
    setIsFormOpen(true);
  };

  const markAsPaid = () => {
    if (!selectedInvoiceId || selectedInvoice?.status !== "pending") {
      return;
    }
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === selectedInvoiceId
          ? { ...invoice, status: "paid" }
          : invoice,
      ),
    );
  };

  const deleteSelectedInvoice = () => {
    if (!selectedInvoiceId) {
      return;
    }
    setInvoices((prev) =>
      prev.filter((invoice) => invoice.id !== selectedInvoiceId),
    );
    setSelectedInvoiceId(null);
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = () => {
    if (!selectedInvoiceId) {
      return;
    }
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingInvoiceId(null);
    setFormData(createInitialFormData());
    setFormErrors({});
    setFormAlerts([]);
  };

  const selectedInvoice = invoices.find(
    (invoice) => invoice.id === selectedInvoiceId,
  );

  const filteredInvoices =
    selectedStatuses.length === 0
      ? invoices
      : invoices.filter((invoice) => selectedStatuses.includes(invoice.status));

  const summaryText =
    invoices.length === 0
      ? "No invoices"
      : selectedStatuses.length === 1
        ? `There ${filteredInvoices.length === 1 ? "is" : "are"} ${filteredInvoices.length} ${selectedStatuses[0]} invoice${filteredInvoices.length === 1 ? "" : "s"}`
        : selectedStatuses.length > 1
          ? `There ${filteredInvoices.length === 1 ? "is" : "are"} ${filteredInvoices.length} filtered invoice${filteredInvoices.length === 1 ? "" : "s"}`
          : `There ${invoices.length === 1 ? "is" : "are"} ${invoices.length} total invoice${invoices.length === 1 ? "" : "s"}`;

  const compactSummaryText =
    filteredInvoices.length === 0
      ? "No invoices"
      : selectedStatuses.length === 1
        ? `${filteredInvoices.length} ${selectedStatuses[0]} invoice${filteredInvoices.length === 1 ? "" : "s"}`
        : `${filteredInvoices.length} invoice${filteredInvoices.length === 1 ? "" : "s"}`;

  const toggleStatusFilter = (status) => {
    if (status === "all") {
      setSelectedStatuses([]);
      return;
    }

    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((currentStatus) => currentStatus !== status)
        : [...prev, status],
    );
  };

  useEffect(() => {
    document.body.classList.toggle("theme-dark", isDarkMode);
    localStorage.setItem("invoice-theme", isDarkMode ? "dark" : "light");

    return () => {
      document.body.classList.remove("theme-dark");
    };
  }, [isDarkMode]);

  useEffect(() => {
    try {
      localStorage.setItem(INVOICES_STORAGE_KEY, JSON.stringify(invoices));
    } catch {
      // Ignore storage write failures and keep the in-memory state working.
    }
  }, [invoices]);

  return (
    <div
      className={`relative min-h-screen overflow-hidden bg-bg ${isDarkMode ? "theme-dark" : ""}`}
    >
      <Sidebar
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
      />

      <main className="mt-[80px] px-6 pb-8 pt-8 sm:px-10 sm:pt-10 lg:ml-[80px] lg:mt-0 lg:px-12">
        <section className="mx-auto max-w-[700px]">
          <InvoicesHeader
            summaryText={summaryText}
            compactSummaryText={compactSummaryText}
            onNewInvoice={openNewInvoiceForm}
            isDarkMode={isDarkMode}
            selectedStatuses={selectedStatuses}
            onToggleStatusFilter={toggleStatusFilter}
          />

          {selectedInvoice ? (
            <InvoiceDetails
              invoice={selectedInvoice}
              onBack={() => setSelectedInvoiceId(null)}
              onEdit={() => openEditInvoiceForm(selectedInvoice)}
              onDelete={openDeleteModal}
              onMarkAsPaid={markAsPaid}
              canMarkAsPaid={selectedInvoice.status === "pending"}
              getStatusStyle={getStatusStyle}
              formatAddressLines={formatAddressLines}
              getLineTotal={getLineTotal}
              formatCurrency={formatCurrency}
              isDarkMode={isDarkMode}
            />
          ) : filteredInvoices.length === 0 ? (
            <EmptyInvoicesState />
          ) : (
            <InvoiceList
              invoices={filteredInvoices}
              onSelectInvoice={setSelectedInvoiceId}
              formatCurrency={formatCurrency}
              getStatusStyle={getStatusStyle}
              isDarkMode={isDarkMode}
            />
          )}
        </section>
      </main>

      <InvoiceFormModal
        isOpen={isFormOpen}
        editingInvoiceId={editingInvoiceId}
        formData={formData}
        formErrors={formErrors}
        formAlerts={formAlerts}
        inputClass={inputClass}
        onClose={closeForm}
        onFieldChange={handleFieldChange}
        onItemChange={handleItemChange}
        onAddItem={addItem}
        onRemoveItem={removeItem}
        getLineTotal={getLineTotal}
        onSaveDraft={() => saveWithValidation("draft")}
        onSavePending={() => saveWithValidation("pending")}
        onSaveChanges={() =>
          saveWithValidation(selectedInvoice?.status || "pending")
        }
        isDarkMode={isDarkMode}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        invoiceId={selectedInvoice?.id || ""}
        onCancel={closeDeleteModal}
        onConfirm={deleteSelectedInvoice}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
