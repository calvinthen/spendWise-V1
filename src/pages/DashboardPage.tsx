function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
      <p className="text-gray-500 mt-1 text-sm">
        Welcome to SpendWise — Sprint 2 features coming soon.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Total Balance</p>
          <p className="text-2xl font-semibold text-gray-800 mt-1">Rp 0</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Total Income</p>
          <p className="text-2xl font-semibold text-green-600 mt-1">Rp 0</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Total Expenses</p>
          <p className="text-2xl font-semibold text-red-500 mt-1">Rp 0</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage