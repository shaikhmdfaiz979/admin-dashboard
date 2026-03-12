function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Are you sure?</h3>

        <p className="py-4">This action cannot be undone.</p>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>

          <button className="btn btn-error" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
