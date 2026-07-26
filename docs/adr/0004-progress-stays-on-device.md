# 0004. Progress stays on the learner’s device

## Status

Draft

## Context

Learners need progress and preferences to survive revisits on one machine. Accounts and cloud sync would force identity and server storage we have already rejected. Some practice state is more ephemeral than course progress.

## Decision

Learning progress and preferences persist only on the learner’s device. The product does not sync that state across devices or users. Ephemeral practice state may clear with the browsing session without violating this invariant.

## Consequences

There is no progress backend to operate or secure. Clearing site data loses progress; that is accepted. Cross-device continuity would require a new ADR and a different trust model.
