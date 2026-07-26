# 0002. Client-only static web app

## Status

Draft

## Context

The companion should be free to host and simple to run. There is no product need for accounts, server rendering, or a custom backend. Learners must still open deep links into sections and practice surfaces.

## Decision

The product is a client-only web application delivered as static files. It does not depend on an application server or user accounts to function. Any framework or bundler that preserves that shape is an implementation choice.

## Consequences

Operations stay limited to publishing static assets. Features that need a backend, identity, or server-side session would break this invariant and require a new ADR. Host-specific deploy quirks are not part of the decision.
