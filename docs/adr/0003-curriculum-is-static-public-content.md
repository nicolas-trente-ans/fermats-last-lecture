# 0003. Curriculum is static public content

## Status

Draft

## Context

Wording, puzzles, and notes will change far more often than application behavior. Running a database or CMS just to publish curriculum would add hosting and process we do not want. Authors need to revise content without a release ceremony for every sentence.

## Decision

Curriculum is packed and published as ordinary public static content that the client loads at runtime. That content is the system of record—there is no separate hosted content database. Optional pieces may be missing without collapsing the whole product.

## Consequences

Authoring stays file-oriented and reload-friendly. The app must tolerate incomplete optional content. Introducing a networked content store or compile-time-only curriculum would reverse this invariant.
