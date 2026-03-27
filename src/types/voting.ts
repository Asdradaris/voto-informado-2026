export interface VotingRound {
  id: number;
  roundNumber: number;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
  winnerCandidateId: string | null;
  totalVotes: number;
}

export interface VoteCount {
  candidateId: string;
  candidateName: string;
  partyName: string;
  partyColor: string;
  totalVotes: number;
  percentage: number;
  rank: number;
  trend: "up" | "down" | "stable" | "new";
}

export interface CitizenSuggestion {
  id: string;
  content: string;
  createdAt: string;
  roundNumber: number;
}

export interface VotingState {
  currentRound: VotingRound | null;
  counts: VoteCount[];
  hasVoted: boolean;
  votedFor: string | null;
  isLoading: boolean;
  lastUpdate: string;
  totalVoters: number;
}

export interface CastVotePayload {
  candidateId: string;
  fingerprint: string;
  honeypot: string;
  loadTime: number;
}

export interface CastVoteResponse {
  ok?: boolean;
  voteNumber?: number;
  error?: "rate_limit" | "closed" | "already_voted";
  message?: string;
}

export interface SubmitSuggestionPayload {
  content: string;
  fingerprint: string;
  roundNumber: number;
}
