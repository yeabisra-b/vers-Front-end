export default function ProfilePage() {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Your Profile</h1>
        
        {/* Profile Info Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Full Name</span>
              <span className="text-gray-600">John Doe</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Username</span>
              <span className="text-gray-600">johndoe123</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Email</span>
              <span className="text-gray-600">johndoe@example.com</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Date of Birth</span>
              <span className="text-gray-600">01/01/1990</span>
            </div>
          </div>
        </div>
        
        {/* Update Info Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Profile</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="full-name" className="block text-xl text-gray-700 font-semibold">Full Name</label>
              <input
                type="text"
                id="full-name"
                name="full-name"
                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xl text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="johndoe@example.com"
              />
            </div>
            <div>
              <label htmlFor="dob" className="block text-xl text-gray-700 font-semibold">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="1990-01-01"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 mt-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Save Changes
            </button>
          </form>
        </div>
  
        {/* Password Change Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Change Password</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="current-password" className="block text-xl text-gray-700 font-semibold">Current Password</label>
              <input
                type="password"
                id="current-password"
                name="current-password"
                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="new-password" className="block text-xl text-gray-700 font-semibold">New Password</label>
              <input
                type="password"
                id="new-password"
                name="new-password"
                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-xl text-gray-700 font-semibold">Confirm New Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 mt-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    );
  }
  