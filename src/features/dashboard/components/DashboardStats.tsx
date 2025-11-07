
export default function SignInForm() {
  return (
    <div className="flex w-full min-h-screen">
      {/* Left side - Brand/Info section */}
      <div className="flex-1 bg-gradient-to-br from-blue-900 via-black to-black flex items-center justify-center p-8 lg:p-12">
        <div className="text-white text-center lg:text-left max-w-md">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-green-100 text-lg mb-6">
            Create your account and unlock amazing features.
          </p>
          <div className="hidden lg:block">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <span className="text-green-100">Free to get started</span>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <span className="text-green-100">Instant access to dashboard</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <span className="text-green-100">24/7 support available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Static sign in form */}
      <div className="flex-2 flex items-center justify-center p-6 lg:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          </div>

          <form className="bg-white shadow-lg rounded-lg p-6 space-y-4 border">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
            >
              Sign In
            </button>
            <p className="text-sm text-gray-500 text-center">
              Don’t have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
