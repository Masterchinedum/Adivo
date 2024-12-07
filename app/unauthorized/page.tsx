export default function UnauthorizedPage() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Unauthorized Access
          </h1>
          <p className="text-lg text-red-800 mb-6">
            You do not have permission to access this page.
          </p>
          <a 
            href="/dashboard" 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    );
  }