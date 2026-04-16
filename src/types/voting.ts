// ============================================================
// Tipos activos — Encuesta Binaria Segunda Vuelta
// ============================================================

export interface BinaryVoteCount {
  candidateId: 'keiko-fujimori' | 'rafael-lopez-aliaga';
  candidateName: string;
  partyName: string;
  partyColor: string;
  photo: string;
  totalVotes: number;
  percentage: number;
}

export interface BinaryPollState {
  counts: BinaryVoteCount[];
  hasVoted: boolean;
  votedFor: string | null;
  totalVoters: number;
  isOpen: boolean;        // true si POLL_CLOSE_DATE está en el futuro
  closesAt: Date;
  isLoading: boolean;
}

export interface CitizenSuggestion {
  id: string;
  content: string;
  createdAt: string;
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
  error?: 'rate_limit' | 'closed' | 'already_voted';
  message?: string;
}

export interface SubmitSuggestionPayload {
  content: string;
  fingerprint: string;
}

// ============================================================
// Tipos legacy — Primera vuelta (archivados)
// Ver: citizen_votes_archive_round1, voting_rounds_archive_round1
// ============================================================

/** @deprecated Primera vuelta — ya no aplica */
export interface VotingRound {
  id: number;
  roundNumber: number;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
  winnerCandidateId: string | null;
  totalVotes: number;
}

/** @deprecated Primera vuelta — reemplazado por BinaryVoteCount */
export interface VoteCount {
  candidateId: string;
  candidateName: string;
  partyName: string;
  partyColor: string;
  totalVotes: number;
  percentage: number;
  rank: number;
  trend: 'up' | 'down' | 'stable' | 'new';
}

/** @deprecated Primera vuelta */
export interface VotingState {
  currentRound: VotingRound | null;
  counts: VoteCount[];
  hasVoted: boolean;
  votedFor: string | null;
  isLoading: boolean;
  lastUpdate: string;
  totalVoters: number;
}
