import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';

interface LoginFormProps {
  type: 'student' | 'admin';
}

export function LoginForm({ type }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const signIn = useAuthStore((state) => state.signIn);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (err) {
      setError('Invalid credentials. Use username/password');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-type={type}>
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      <div>
        <label htmlFor={`${type}-username`} className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id={`${type}-username`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
          placeholder="username"
        />
      </div>
      <div>
        <label htmlFor={`${type}-password`} className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id={`${type}-password`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
          placeholder="password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
      >
        Login as {type === 'student' ? 'Student' : 'Admin'}
      </button>
      <p className="text-sm text-gray-500 text-center mt-2">
        Use username: "username" and password: "password"
      </p>
    </form>
  );
}