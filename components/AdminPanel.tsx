export default function AdminPanel() {
  return (
    <div className="p-4 bg-red-100 rounded-xl shadow mt-6">
      <h2 className="text-xl font-semibold">🛠️ Admin Panel</h2>
      <p>Only visible to users with the admin role.</p>
    </div>
  );
}
