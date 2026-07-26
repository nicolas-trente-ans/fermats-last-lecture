# 0005. Localization ships with curriculum content

## Status

Draft

## Context

The companion must support more than one language without standing up a separate translation platform. Splitting locale data from curriculum publishing would create two sources of truth. Long-form notes need richer structure than short UI strings.

## Decision

Locale-facing curriculum and chrome ship in the same static content pipeline as the rest of the teaching material. One source locale remains the fallback when a translation is missing. Long-form notes may use a different document shape than short strings, still published as static content.

## Consequences

Authors and translators share one publishing story. Missing translations degrade to the source locale rather than failing closed. A standalone i18n service or locale data outside the content pipeline would reverse this invariant.
