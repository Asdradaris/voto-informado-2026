export type {
  Candidate,
  Party,
  Education,
  Proposal,
  ProposalArea,
  LegalRecord,
  PatrimonyRecord,
  ConflictOfInterest,
  RedFlag,
  PollData,
  Source,
} from "./candidate";

export type {
  ScoringConfig,
  ScoringDimension,
  ScoringCriterion,
  UserScore,
  CandidateRanking,
} from "./scoring";

export type {
  BinaryVoteCount,
  BinaryPollState,
  CitizenSuggestion,
  CastVotePayload,
  CastVoteResponse,
  SubmitSuggestionPayload,
  // Legacy (primera vuelta)
  VotingRound,
  VoteCount,
  VotingState,
} from "./voting";
