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
  VotingRound,
  VoteCount,
  CitizenSuggestion,
  VotingState,
  CastVotePayload,
  CastVoteResponse,
  SubmitSuggestionPayload,
} from "./voting";
