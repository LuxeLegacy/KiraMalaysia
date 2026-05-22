export function TestPage() {
  console.log('TestPage: Rendering');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Test Page</h1>
        <p className="text-gray-700 mb-4">
          If you can see this page, React Router is working correctly.
        </p>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
          <ul className="space-y-2 text-sm">
            <li>✓ React is working</li>
            <li>✓ React Router is working</li>
            <li>✓ Tailwind CSS is working</li>
            <li>✓ TypeScript is working</li>
          </ul>
        </div>

        <div className="mt-6">
          <a
            href="/finance/unified-payroll-calculator-malaysia"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Unified Payroll Calculator
          </a>
        </div>
      </div>
    </div>
  );
}
