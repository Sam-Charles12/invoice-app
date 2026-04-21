export default function DeleteConfirmationModal({
  isOpen,
  invoiceId,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-5"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-[480px] rounded-[10px] bg-white px-12 py-10 shadow-[0_24px_44px_rgba(72,84,159,0.22)]"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="font-heading text-[32px] font-bold leading-none text-text">
          Confirm Deletion
        </h2>

        <p className="mt-7 text-[13px] font-medium leading-6 text-[#888eb0]">
          Are you sure you want to delete invoice #{invoiceId}? This action
          cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full bg-[#f9fafe] px-6 py-3 text-[13px] font-bold text-[#7e88c3] transition-colors hover:bg-[#edf0fd]"
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
