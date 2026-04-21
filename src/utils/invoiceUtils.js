export const createInitialFormData = () => ({
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

export const getLineTotal = (item) => {
  const qty = Number(item.quantity);
  const price = Number(item.price);
  if (!Number.isFinite(qty) || !Number.isFinite(price)) {
    return "0.00";
  }
  return (qty * price).toFixed(2);
};

export const getInvoiceTotal = (items) => {
  return items.reduce((sum, item) => {
    const qty = Number(item.quantity);
    const price = Number(item.price);
    if (!Number.isFinite(qty) || !Number.isFinite(price)) {
      return sum;
    }
    return sum + qty * price;
  }, 0);
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(value);
};

export const formatDueDate = (invoiceDate, paymentTerms) => {
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

export const formatDisplayDate = (dateValue) => {
  if (!dateValue) {
    return "No date";
  }
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "No date";
  }
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const generateInvoiceId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letterPart =
    letters[Math.floor(Math.random() * letters.length)] +
    letters[Math.floor(Math.random() * letters.length)];
  const numberPart = Math.floor(1000 + Math.random() * 9000);
  return `${letterPart}${numberPart}`;
};

export const getStatusStyle = (status, isDarkMode = false) => {
  if (status === "pending") {
    return isDarkMode
      ? "bg-[#2a273f] text-[#ff8f00]"
      : "bg-[#fff8f0] text-[#ff8f00]";
  }
  if (status === "paid") {
    return isDarkMode
      ? "bg-[#1f2b3f] text-[#33d69f]"
      : "bg-[#f3fdfa] text-[#33d69f]";
  }
  return isDarkMode
    ? "bg-[#2b304b] text-[#dfe3fa]"
    : "bg-[#f4f4f8] text-[#373b53]";
};

export const formatAddressLines = (address = {}) => {
  return [
    address.street,
    address.city,
    address.postCode,
    address.country,
  ].filter(Boolean);
};
