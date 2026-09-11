import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminSessionGuard from "@/components/admin/AdminSessionGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-surface-bg text-surface-text">
      <AdminSessionGuard />

      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0">
        <AdminSidebar />
      </div>

      {/* Main Admin Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
