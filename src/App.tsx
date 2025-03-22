import React from 'react';
import { Vote, Users, UserCog, LogOut } from 'lucide-react';
import { LoginForm } from './components/LoginForm';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { useAuthStore } from './store/authStore';

function App() {
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Vote className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">College Elections</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user.role}</span>
              <button
                onClick={() => signOut()}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {user.role === 'student' ? (
            <StudentDashboard />
          ) : (
            <AdminDashboard />
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Vote className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">College Elections</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Welcome to College Elections
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Make your voice heard! Login to participate in the student body elections
            and help shape the future of our college.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex flex-col items-center">
              <Users className="h-16 w-16 text-indigo-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Student Login</h3>
              <p className="text-gray-600 text-center mb-6">
                Access your student voting portal to cast your vote in ongoing elections.
              </p>
              <LoginForm type="student" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex flex-col items-center">
              <UserCog className="h-16 w-16 text-indigo-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h3>
              <p className="text-gray-600 text-center mb-6">
                Manage elections, candidates, and monitor voting progress.
              </p>
              <LoginForm type="admin" />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} College Elections. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App