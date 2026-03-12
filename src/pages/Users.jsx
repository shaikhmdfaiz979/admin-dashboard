import { useMemo, useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import UserModal from "../components/users/UserModal";
import DeleteModal from "../components/users/DeleteModal";

function Users() {
  const initialData = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@mail.com`,
      role: i % 3 === 0 ? "Admin" : "User",
    }));
  }, []);

  const [users, setUsers] = useState(initialData);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const usersPerPage = 5;

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;

  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  const handleSave = (userData) => {
    if (editUser) {
      setUsers(
        users.map((u) =>
          u.id === editUser.id ? { ...userData, id: editUser.id } : u
        )
      );
    } else {
      const newUser = {
        ...userData,
        id: users.length + 1,
      };
      setUsers([newUser, ...users]);
    }
  };

  const handleDelete = () => {
    setUsers(users.filter((u) => u.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">Users Management</h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          <button
            className="btn btn-primary"
            onClick={() => {
              setEditUser(null);
              setIsModalOpen(true);
            }}
          >
            <FiPlus /> Add
          </button>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th className="hidden md:table-cell">Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td className="hidden md:table-cell">{user.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "Admin"
                          ? "badge-primary"
                          : "badge-secondary"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => {
                        setEditUser(user);
                        setIsModalOpen(true);
                      }}
                    >
                      <FiEdit />
                    </button>

                    <button
                      className="btn btn-sm btn-error btn-outline"
                      onClick={() => setDeleteId(user.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

</table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          className="btn btn-outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editUser={editUser}
      />

      <DeleteModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />

    </div>
  );
}

export default Users;