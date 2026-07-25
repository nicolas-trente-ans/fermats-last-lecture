# Greatest Common Divisor

It is okay if the properties below feel more like tools than fully proved facts for now. Read what you can; you will use them again soon.

## Notation

**gcd(a, b)**: the greatest common divisor of a and b.

**gcd(24, 36) = 12**, **gcd(28, 49) = 7**, **gcd(17, 32) = 1**, **gcd(15, 25) = 5**

The **greatest common divisor** of two integers a and b (not both zero) is the **largest positive integer** that divides both of them. In other words, it is the biggest shared factor under the divisibility relation **|** from the previous section.

Notes:

- We take the gcd to be **positive**, even if a or b is negative: gcd(−24, 36) = gcd(24, 36) = 12.
- gcd(a, 0) = |a| when a ≠ 0, because every nonzero integer divides 0, and the largest positive divisor of a is |a|.
- gcd(0, 0) is left undefined (every integer divides 0, so there is no largest one).

$$
\operatorname{gcd}(a, b)
:=
\text{the largest } d \in \mathbb{N}
\text{ such that }
d \mid a
\text{ and }
d \mid b.
$$

## Coprime pairs

**coprime** (also **relatively prime**): gcd(a, b) = 1.

**gcd(17, 32) = 1**, **gcd(8, 15) = 1**, **gcd(9, 28) = 1**

When **gcd(a, b) = 1**, we say a and b are **coprime** (or relatively prime): they share no common positive divisor bigger than 1. The lecture sometimes calls such a pair **primitive**.

Coprime does **not** mean each of a and b is a prime number. For example 8 and 15 are coprime, but neither is prime.

$$
a \text{ and } b \text{ are coprime}
\quad:\Leftrightarrow\quad
\operatorname{gcd}(a, b) = 1.
$$

## Bridge from divisibility

In the last section we saw a **trap**: **a | (b·c)** does **not** force **a | b** or **a | c** in general (remember **6 | (4·9)** but **6 ∤ 4** and **6 ∤ 9**).

The missing ingredient is often a gcd hypothesis. The rest of this page collects the gcd moves that make that trap safe — and a few companions used constantly in the n = 3 and n = 4 Fermat arguments.

## Useful lemmas about gcd

Treat these as tools. Each one is a short story about shared divisors; the examples show the move in numbers.

### Dropping a coprime factor

**Lemma.** If **gcd(a, c) = 1**, then **gcd(a·b, c) = gcd(b, c)**.

**Why (idea).** Any common divisor of **a·b** and **c** cannot “use” prime factors from **a**, because **a** and **c** share no common prime factors. So the shared part between **a·b** and **c** is exactly the shared part between **b** and **c**.

**Example.** **gcd(4, 9) = 1**, so **gcd(4·15, 9) = gcd(15, 9)**. Indeed gcd(60, 9) = 3 and gcd(15, 9) = 3.

### Subtracting a multiple (Euclidean step)

**Lemma.** For every integer k, **gcd(a, b) = gcd(a, b − k·a)**.

More generally, **gcd(a, b) = gcd(a, b + k·a)** for every integer k — adding or subtracting any multiple of a does not change the gcd.

**Why (idea).** Any common divisor of a and b also divides **b − k·a** (linear combinations from the divisibility lemmas). Conversely, any common divisor of a and **b − k·a** also divides **b = (b − k·a) + k·a**. So the two pairs have exactly the same common divisors — hence the same greatest one.

**Example.** **gcd(48, 18)**. Subtract 2·18 from 48:

$$
\operatorname{gcd}(48, 18) = \operatorname{gcd}(48 - 2 \cdot 18,\ 18) = \operatorname{gcd}(12, 18) = \operatorname{gcd}(12,\ 18 - 12) = \operatorname{gcd}(12, 6) = 6.
$$

This is the engine of the **Euclidean algorithm**: keep replacing the larger number by a remainder until the gcd appears.

### Euclid’s lemma (the safe product rule)

**Lemma.** If **a | (b·c)** and **gcd(a, b) = 1**, then **a | c**.

**Why (idea).** Because a and b share no common factor bigger than 1, every prime factor of a that appears in the product **b·c** must come from **c**. So a divides c.

**Example.** **6 | (4·9)** is true, but **gcd(6, 4) = 2 ≠ 1**, so the lemma does **not** apply — and indeed **6 ∤ 9**. Compare: **5 | (4·15)** and **gcd(5, 4) = 1**, so the lemma guarantees **5 | 15**.

This is exactly the “safe rule” promised at the end of the divisibility section.

### A few quick companions

These show up as one-liners in later write-ups:

- **gcd(a, b) = gcd(b, a)** — order does not matter.
- **gcd(a, b) = gcd(|a|, |b|)** — signs do not matter.
- If **d = gcd(a, b)**, then **gcd(a/d, b/d) = 1** — after dividing out the gcd, the cofactors are coprime.

**Example.** **gcd(24, 36) = 12**, and **gcd(24/12, 36/12) = gcd(2, 3) = 1**.

$$
\text{If } d = \operatorname{gcd}(a, b),\quad\text{then}\quad
\operatorname{gcd}\!\left(\tfrac{a}{d},\tfrac{b}{d}\right) = 1.
$$

## Putting the tools together

A typical later move looks like this:

1. You know **a | (b·c)**.
2. You check or arrange **gcd(a, b) = 1** (sometimes after dividing out a shared factor).
3. Euclid’s lemma hands you **a | c**.

Or:

1. You want **gcd(a, b)**.
2. You replace b by **b − k·a** (or a remainder) until the numbers shrink.
3. The gcd is unchanged at each step, so the last nonzero remainder is the answer.

## Why you might care

The n = 3 and n = 4 arguments spend a lot of time cleaning equations so that two factors are coprime, then pushing a divisor from a product onto one factor alone. **gcd** is the language that makes “no shared factors” precise — and Euclid’s lemma is the payoff for that precision.
