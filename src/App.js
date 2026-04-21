import { useState } from "react";
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

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState(createInitialFormData());
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [editingInvoiceId, setEditingInvoiceId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const inputClass =
    "h-10 rounded-[4px] border border-border bg-[var(--input-bg)] px-4 text-[13px] font-bold text-text outline-none transition-colors focus:border-primary";

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
    setIsFormOpen(false);
  };

  const openNewInvoiceForm = () => {
    setEditingInvoiceId(null);
    setFormData(createInitialFormData());
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
    setIsFormOpen(true);
  };

  const markAsPaid = () => {
    if (!selectedInvoiceId) {
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
  };

  const selectedInvoice = invoices.find(
    (invoice) => invoice.id === selectedInvoiceId,
  );

  return (
    <div
      className={`relative min-h-screen overflow-hidden bg-bg ${isDarkMode ? "theme-dark" : ""}`}
    >
      <Sidebar
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
      />

      <main className="ml-[80px] px-12 pb-8 pt-10">
        <section className="mx-auto max-w-[700px]">
          <InvoicesHeader
            invoicesCount={invoices.length}
            onNewInvoice={openNewInvoiceForm}
            isDarkMode={isDarkMode}
          />

          {selectedInvoice ? (
            <InvoiceDetails
              invoice={selectedInvoice}
              onBack={() => setSelectedInvoiceId(null)}
              onEdit={() => openEditInvoiceForm(selectedInvoice)}
              onDelete={openDeleteModal}
              onMarkAsPaid={markAsPaid}
              getStatusStyle={getStatusStyle}
              formatAddressLines={formatAddressLines}
              getLineTotal={getLineTotal}
              formatCurrency={formatCurrency}
              isDarkMode={isDarkMode}
            />
          ) : invoices.length === 0 ? (
            <EmptyInvoicesState />
          ) : (
            <InvoiceList
              invoices={invoices}
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
        inputClass={inputClass}
        onClose={closeForm}
        onFieldChange={handleFieldChange}
        onItemChange={handleItemChange}
        onAddItem={addItem}
        onRemoveItem={removeItem}
        getLineTotal={getLineTotal}
        onSaveDraft={() => saveInvoice("draft")}
        onSavePending={() => saveInvoice("pending")}
        onSaveChanges={() => saveInvoice(selectedInvoice?.status || "pending")}
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
