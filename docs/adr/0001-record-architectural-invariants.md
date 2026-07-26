# 0001. Record architectural invariants

## Status

Draft

## Context

Some product choices are expensive to reverse once content and teaching flows depend on them. Contributors need those intents written down without turning every coding preference into policy. Authoring how-tos belong elsewhere.

## Decision

We record only hard-to-change architectural invariants as short Nygard ADRs. Authoring guides stay separate and may change freely. An ADR is amended or superseded when an invariant actually changes—not when an implementation detail moves.

## Consequences

Readers can see what we mean to keep stable. Reasonable refactors that preserve an invariant need no ADR. Specifying libraries, paths, schemas, or scripts in an ADR is out of scope for this record set.
