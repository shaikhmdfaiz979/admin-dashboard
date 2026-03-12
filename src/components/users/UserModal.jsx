import { useEffect, useState } from "react";

function UserModal({ isOpen, onClose, onSave, editUser }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "User",
  });

  useEffect(() => {
    if (editUser) {
      setForm(editUser);
    } else {
      setForm({
        name: "",
        email: "",
        role: "User",
      });
    }
  }, [editUser]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          {editUser ? "Edit User" : "Add User"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
            value={form.name}
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={form.email}
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <select
            className="select select-bordered w-full"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option>User</option>
            <option>Admin</option>
          </select>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="btn btn-primary">
              {editUser ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserModal;
