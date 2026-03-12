import { useState } from "react";
import { toast } from "react-toastify";

function Settings() {
  const [profile, setProfile] = useState({
    name: localStorage.getItem("adminName") || "Admin",
    email: localStorage.getItem("adminEmail") || "admin@email.com",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const handleProfileSave = () => {
    localStorage.setItem("adminName", profile.name);
    localStorage.setItem("adminEmail", profile.email);
    toast.success("Profile updated successfully ✅");
  };

  const handlePasswordChange = () => {
    if (!passwords.current || !passwords.newPass) {
      toast.error("Fill all password fields");
      return;
    }

    if (passwords.newPass !== passwords.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    toast.success("Password changed successfully 🔐");
    setPasswords({ current: "", newPass: "", confirm: "" });
  };

  return (
    <div className="p-4 md:p-6 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>

      {/* Profile Section */}
      <div className="bg-base-100 p-6 rounded-2xl shadow-md space-y-4">
        <h2 className="text-lg font-semibold">Profile Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>

          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
          </div>
        </div>

        <button className="btn btn-primary mt-4" onClick={handleProfileSave}>
          Save Profile
        </button>
      </div>

      {/* Password Section */}
      <div className="bg-base-100 p-6 rounded-2xl shadow-md space-y-4">
        <h2 className="text-lg font-semibold">Change Password</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="password"
            placeholder="Current Password"
            className="input input-bordered"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="New Password"
            className="input input-bordered"
            value={passwords.newPass}
            onChange={(e) =>
              setPasswords({ ...passwords, newPass: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
          />
        </div>

        <button
          className="btn btn-secondary mt-4"
          onClick={handlePasswordChange}
        >
          Update Password
        </button>
      </div>

      {/* Theme Info Section */}
      <div className="bg-base-100 p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Appearance</h2>

        <p className="opacity-70">
          Theme mode is controlled from the Navbar toggle. Your selection is
          saved automatically.
        </p>
      </div>
    </div>
  );
}

export default Settings;
