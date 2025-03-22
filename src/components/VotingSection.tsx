import React from 'react';
import { useVoteStore, Candidate } from '../store/voteStore';

interface VotingCardProps {
  position: string;
  candidates: Candidate[];
  hasVoted: boolean;
  onVote: (id: string) => void;
}

export function VotingCard({ position, candidates, hasVoted, onVote }: VotingCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{position}</h3>
      {hasVoted ? (
        <div className="text-green-600 font-medium">
          You have already voted for this position
        </div>
      ) : (
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="border rounded-lg p-4 hover:border-indigo-500 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{candidate.name}</h4>
                  {candidate.department && (
                    <p className="text-sm text-gray-600">Department: {candidate.department}</p>
                  )}
                  {candidate.year && (
                    <p className="text-sm text-gray-600">Year: {candidate.year}</p>
                  )}
                </div>
                <button
                  onClick={() => onVote(candidate.id)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Vote
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}