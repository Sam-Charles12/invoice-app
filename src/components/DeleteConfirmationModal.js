export default function DeleteConfirmationModal({
  isOpen,
  invoiceId,
  onCancel,
  onConfirm,
  isDarkMode,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-[var(--overlay)] px-5"
      onClick={onCancel}
    >
      <div
        className={`w-full max-w-[480px] rounded-[10px] px-12 py-10 shadow-[0_24px_44px_rgba(72,84,159,0.22)] ${
          isDarkMode ? "bg-[#1e2139]" : "bg-white"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="font-heading text-[32px] font-bold leading-none text-text">
          Confirm Deletion
        </h2>

        <p className="mt-7 text-[13px] font-medium leading-6 text-muted">
          Are you sure you want to delete invoice #{invoiceId}? This action
          cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full bg-[var(--soft-bg)] px-6 py-3 text-[13px] font-bold text-[#7e88c3] transition-colors hover:bg-[var(--soft-bg-hover)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-danger px-6 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#ff9797]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
