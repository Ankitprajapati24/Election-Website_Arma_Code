import { create } from 'zustand';

export interface Candidate {
  id: string;
  name: string;
  position: string;
  department?: string;
  year?: string;
  votes: number;
}

interface VoteState {
  candidates: Candidate[];
  votedPositions: string[];
  addVote: (candidateId: string) => void;
  hasVoted: (position: string) => boolean;
  addCandidate: (candidate: Omit<Candidate, 'id' | 'votes'>) => void;
  removeCandidate: (id: string) => void;
}

const MOCK_CANDIDATES: Candidate[] = [
  { id: '1', name: 'John Doe', position: 'Mess Representative', votes: 0 },
  { id: '2', name: 'Jane Smith', position: 'Mess Representative', votes: 0 },
  { id: '3', name: 'Mike Johnson', position: 'Boys Hostel Representative', votes: 0 },
  { id: '4', name: 'Tom Wilson', position: 'Boys Hostel Representative', votes: 0 },
  { id: '5', name: 'Sarah Brown', position: 'Girls Hostel Representative', votes: 0 },
  { id: '6', name: 'Emma Davis', position: 'Girls Hostel Representative', votes: 0 },
  { id: '7', name: 'Alex Turner', position: 'Department Representative', department: 'Computer Science', votes: 0 },
  { id: '8', name: 'Lisa Anderson', position: 'Department Representative', department: 'Computer Science', votes: 0 },
  { id: '9', name: 'Chris Martin', position: 'Class Representative', year: '3rd Year', votes: 0 },
  { id: '10', name: 'David Wilson', position: 'Class Representative', year: '3rd Year', votes: 0 },
];

export const useVoteStore = create<VoteState>((set, get) => ({
  candidates: MOCK_CANDIDATES,
  votedPositions: [],
  addVote: (candidateId: string) => {
    const { candidates, votedPositions } = get();
    const candidate = candidates.find(c => c.id === candidateId);
    if (!candidate || votedPositions.includes(candidate.position)) return;

    set({
      candidates: candidates.map(c =>
        c.id === candidateId ? { ...c, votes: c.votes + 1 } : c
      ),
      votedPositions: [...votedPositions, candidate.position]
    });
  },
  hasVoted: (position: string) => get().votedPositions.includes(position),
  addCandidate: (candidate) => {
    const { candidates } = get();
    const newCandidate = {
      ...candidate,
      id: Math.random().toString(36).substr(2, 9),
      votes: 0
    };
    set({ candidates: [...candidates, newCandidate] });
  },
  removeCandidate: (id: string) => {
    const { candidates } = get();
    set({ candidates: candidates.filter(c => c.id !== id) });
  }
}));