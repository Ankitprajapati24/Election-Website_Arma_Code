import React from 'react';
import { useVoteStore } from '../store/voteStore';
import { VotingCard } from './VotingSection';

export function StudentDashboard() {
  const { candidates, addVote, hasVoted } = useVoteStore();

  const positionGroups = candidates.reduce((groups, candidate) => {
    const group = groups[candidate.position] || [];
    return { ...groups, [candidate.position]: [...group, candidate] };
  }, {} as Record<string, typeof candidates>);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Student Elections</h2>
        <p className="mt-2 text-gray-600">Cast your vote for various positions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(positionGroups).map(([position, candidates]) => (
          <div key={position}>
            <VotingCard
              position={position}
              candidates={candidates}
              hasVoted={hasVoted(position)}
              onVote={addVote}
            />
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          Note: You can only vote once for each position. Your vote cannot be changed once submitted.
        </p>
      </div>
    </div>
  );
}