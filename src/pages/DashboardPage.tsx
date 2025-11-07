
export default function Dashboard() {
  return (
    <div className="min-h-screen   rounded-xl   text-white p-6">
      {/* Top header (static) */}
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-gray-400">Overview of your workspace</p>
          </div>
          <div className="text-sm text-gray-400">Last updated: {new Date().toLocaleString()}</div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        

        {/* Main content */}
        <main className="lg:col-span-4">
          <div className="bg-white/3 border border-white/6 rounded-2xl p-6 min-h-[56vh]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Welcome back.</h2>
              <div className="text-sm text-gray-400">Last updated: {new Date().toLocaleString()}</div>
            </div>

            {/* Minimal placeholder content */}
            <div className="h-[28rem] rounded-lg border-2 border-dashed border-white/6 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-300 mb-4">This dashboard is intentionally minimal — ready for your widgets.</p>
                <p className="text-sm text-gray-400">Add charts, tables, or quick-actions here when needed.</p>
              </div>
            </div>
          </div>

          {/* Small footer note */}
          <div className="mt-4 text-xs text-gray-500">
            Tip: use the sidebar to add quick navigation or include a compact activity feed.
          </div>
        </main>
      </div>
    </div>
  );
}
