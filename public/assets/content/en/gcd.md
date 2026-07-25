# Greatest Common Divisor

It is okay if the properties below feel more like tools than fully proved facts for now. Read what you can; you will use them again soon.

## Notation

**gcd(a, b)** — sometimes written **(a, b)** — is the largest positive integer that divides both a and b.

Examples: gcd(24, 36) = 12, gcd(28, 49) = 7, gcd(17, 32) = 1.

When gcd(a, b) = 1, a and b are **coprime** (also called primitive as a pair).

## Properties used later

These are used as techniques in the n = 3 and n = 4 arguments; treat them as tools for now.

- If gcd(a, c) = 1, then gcd(a, b, c) = gcd(b, c).
- For any integer k, gcd(a, b) = gcd(a, b + k·a).
- If a | bc and gcd(a, b) = 1, then a | c.
