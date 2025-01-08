// app/(dashboards)/admindash/layout.tsx
import { AdminHeader } from "./components/AdminHeader"
import { AdminSidebar } from "./components/AdminSidebar"
import { AdminBreadcrumbs } from "./components/AdminBreadcrumbs"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader />
        <main className="container py-6 space-y-6">
          <AdminBreadcrumbs />
          {children}
        </main>
      </div>
    </div>
  )
}