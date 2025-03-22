import React, { useState } from 'react';
import { useVoteStore } from '../store/voteStore';
import { PlusCircle, Trash2 } from 'lucide-react';

export function AdminDashboard() {
  const { candidates, addCandidate, removeCandidate } = useVoteStore();
  const [showForm, setShowForm] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    position: '',
    department: '',
    year: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCandidate(newCandidate);
    setNewCandidate({ name: '', position: '', department: '', year: '' });
    setShowForm(false);
  };

  const positions = Array.from(new Set(candidates.map(c => c.position)));

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <PlusCircle className="h-5 w-5" />
          Add Candidate
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Add New Candidate</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                required
                value={newCandidate.name}
                onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <select
                required
                value={newCandidate.position}
                onChange={(e) => setNewCandidate({ ...newCandidate, position: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Position</option>
                <option value="Mess Representative">Mess Representative</option>
                <option value="Boys Hostel Representative">Boys Hostel Representative</option>
                <option value="Girls Hostel Representative">Girls Hostel Representative</option>
                <option value="Department Representative">Department Representative</option>
                <option value="Class Representative">Class Representative</option>
              </select>
            </div>
            {newCandidate.position === 'Department Representative' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <input
                  type="text"
                  required
                  value={newCandidate.department}
                  onChange={(e) => setNewCandidate({ ...newCandidate, department: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            )}
            {newCandidate.position === 'Class Representative' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Year</label>
                <select
                  required
                  value={newCandidate.year}
                  onChange={(e) => setNewCandidate({ ...newCandidate, year: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Add Candidate
            </button>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {positions.map((position) => (
          <div key={position} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{position}</h3>
            <div className="space-y-4">
              {candidates
                .filter((c) => c.position === position)
                .map((candidate) => (
                  <div
                    key={candidate.id}
                    className="flex items-center justify-between border rounded-lg p-4"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">{candidate.name}</h4>
                      {candidate.department && (
                        <p className="text-sm text-gray-600">Department: {candidate.department}</p>
                      )}
                      {candidate.year && (
                        <p className="text-sm text-gray-600">Year: {candidate.year}</p>
                      )}
                      <p className="text-sm font-medium text-indigo-600">
                        Votes: {candidate.votes}
                      </p>
                    </div>
                    <button
                      onClick={() => removeCandidate(candidate.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Remove Candidate"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}