# Divisibility and Congruence

It is okay if the notation takes a pass or two to settle. Read what you can; these ideas return constantly in later arguments.

## Divisibility

**a | b**: a divides b.

**3 | 6**, **17 | 68**, **4 ∤ 9**, **5 | 0**, **(−3) | 12**

We say an integer **a** divides an integer **b** when **b** is an integer multiple of **a** — that is, there is some integer **k** with **b = a·k**.

Alternatively, **a | b** can be understood as saying that **b / a** has no remainder: there is no **c** with **0 < c < |a|** such that **b = a·k + c** for some integer **k**.

**a ∤ b** means a does **not** divide b.

Notes:

- Division here is about integers only: we ask whether the quotient is an integer, not a fraction.
- Every nonzero integer divides 0, because 0 = a·0.
- Signs do not break divisibility: if a | b, then (−a) | b and a | (−b) as well.
- 0 | b only when b = 0 (and even that case is usually avoided in casual talk).
- The remainder view needs a ≠ 0 so that |a| makes sense as a positive bound on c.

$$
a \mid b
\quad:\Leftrightarrow\quad
\exists\, k \in \mathbb{Z}\ \text{s.t.}\ b = a \cdot k.
$$

$$
a \mid b
\quad:\Leftrightarrow\quad
\nexists\, c \in \mathbb{Z}\ \text{s.t.}\
0 < c < |a|
\ \text{and}\
\exists\, k \in \mathbb{Z}\ \text{with}\ b = a \cdot k + c.
$$

## Useful lemmas about divisibility

These are the “move pieces around” facts you will reuse constantly. Each one is just the definition of | unpacked once.

### Multiplying both sides

**Lemma.** If **a | b**, then for every integer m we have **a | (b·m)**.

**Why.** Assume **a | b**. Then there is an integer k with **b = a·k**. Multiply both sides by m:

$$
b \cdot m = (a \cdot k) \cdot m = a \cdot (k \cdot m).
$$

Here **k·m** is again an integer, so **a | (b·m)**.

**Example.** **4 | 12**, so **4 | (12·5)** — that is, **4 | 60**. Indeed 60 = 4·15.

### Adding (and subtracting) when a divides both

**Lemma.** If **a | b** and **a | c**, then **a | (b + c)** and **a | (b − c)**.

**Why.** Write **b = a·k** and **c = a·ℓ** for integers k, ℓ. Then

$$
b + c = a \cdot k + a \cdot ℓ = a \cdot (k + ℓ),
\qquad
b - c = a \cdot k - a \cdot ℓ = a \cdot (k - ℓ).
$$

So **a** divides both the sum and the difference.

**Example.** **5 | 20** and **5 | 35**, so **5 | 55** and **5 | 15**.

### Combining: linear combinations

**Lemma.** If **a | b** and **a | c**, then for every pair of integers m, n we have **a | (m·b + n·c)**.

**Why.** From the previous two ideas: **a | b** implies **a | (m·b)**, and **a | c** implies **a | (n·c)**; then **a** divides the sum.

This is the clean packing of “you may multiply either side and then add.” Many later arguments are just this lemma in disguise.

**Example.** **6 | 18** and **6 | 30**, so **6 | (2·18 − 1·30)** — that is, **6 | 6**. Indeed 6 = 6·1.

### Transitivity

**Lemma.** If **a | b** and **b | c**, then **a | c**.

**Why.** Write **b = a·k** and **c = b·ℓ**. Substitute:

$$
c = b \cdot ℓ = (a \cdot k) \cdot ℓ = a \cdot (k \cdot ℓ).
$$

So **a | c**.

**Example.** **3 | 6** and **6 | 24**, so **3 | 24**.

### A non-example worth remembering

**Warning.** **a | (b·c)** does **not** force **a | b** or **a | c** in general.

**Counterexample.** **6 | (4·9)** because 36 = 6·6, but **6 ∤ 4** and **6 ∤ 9**.

(You get a safe rule only after gcd enters the story: if **a | (b·c)** and **gcd(a, b) = 1**, then **a | c**. That lives in the next section.)

## Congruence

**a ≡ b (mod n)**: a is congruent to b modulo n.

**17 ≡ 32 (mod 5)**, **15 ≡ 29 (mod 7)**, **10 ≡ 0 (mod 5)**, **8 ≢ 3 (mod 4)**

For integers a, b and a natural number n, we say **a is congruent to b modulo n** when n divides the difference a − b. Equivalently: a and b leave the **same remainder** when divided by n.

In this lecture this is often read “a equals b modulo n.”

Notes:

- The modulus n is positive here (a natural number).
- a ≡ 0 (mod n) means exactly n | a — congruence with 0 is divisibility in disguise.
- Congruence is an equivalence relation on ℤ: reflexive, symmetric, and transitive (see below).

$$
a \equiv b \pmod{n}
\quad:\Leftrightarrow\quad
n \mid (a - b).
$$

## Useful lemmas about congruence

Because congruence is defined by divisibility of **a − b**, the divisibility lemmas above translate almost for free.

### You may add the same integer to both sides

**Lemma.** If **a ≡ b (mod n)**, then for every integer c we have **a + c ≡ b + c (mod n)**.

**Why.** **a ≡ b (mod n)** means **n | (a − b)**. But

$$
(a + c) - (b + c) = a - b,
$$

so **n** also divides **(a + c) − (b + c)**. That is exactly **a + c ≡ b + c (mod n)**.

**Example.** **17 ≡ 32 (mod 5)**, so **17 + 3 ≡ 32 + 3 (mod 5)** — that is, **20 ≡ 35 (mod 5)**. Both are multiples of 5.

### You may multiply both sides by the same integer

**Lemma.** If **a ≡ b (mod n)**, then for every integer m we have **a·m ≡ b·m (mod n)**.

**Why.** Write **a − b = n·k** for some integer k. Then

$$
a \cdot m - b \cdot m = (a - b) \cdot m = (n \cdot k) \cdot m = n \cdot (k \cdot m).
$$

Hence **n | (a·m − b·m)**, i.e. **a·m ≡ b·m (mod n)**.

**Example.** **4 ≡ 9 (mod 5)**, so **4·3 ≡ 9·3 (mod 5)** — that is, **12 ≡ 27 (mod 5)**. Both leave remainder 2.

### Congruences add and multiply

**Lemma.** If **a ≡ b (mod n)** and **c ≡ d (mod n)**, then

$$
a + c \equiv b + d \pmod{n}
\qquad\text{and}\qquad
a \cdot c \equiv b \cdot d \pmod{n}.
$$

**Why (sum).**

$$
(a + c) - (b + d) = (a - b) + (c - d).
$$

Each of **a − b** and **c − d** is divisible by **n**, so their sum is too.

**Why (product).** Write **a = b + n·k** and **c = d + n·ℓ**. Then

$$
a \cdot c = (b + n \cdot k) \cdot (d + n \cdot ℓ) = b \cdot d + n \cdot (b \cdot ℓ + d \cdot k + n \cdot k \cdot ℓ),
$$

so **a·c − b·d** is a multiple of **n**.

**Example.** **7 ≡ 2 (mod 5)** and **8 ≡ 3 (mod 5)**, so

- **7 + 8 ≡ 2 + 3 (mod 5)** — that is, **15 ≡ 5 (mod 5)**
- **7·8 ≡ 2·3 (mod 5)** — that is, **56 ≡ 6 (mod 5)**

### Reflexive, symmetric, transitive

**Lemma.** For a fixed modulus **n**:

- **Reflexive:** **a ≡ a (mod n)** always, because **n | (a − a) = 0**.
- **Symmetric:** if **a ≡ b (mod n)**, then **b ≡ a (mod n)**, because **n | (a − b)** implies **n | (b − a) = −(a − b)**.
- **Transitive:** if **a ≡ b (mod n)** and **b ≡ c (mod n)**, then **a ≡ c (mod n)**, because **n** divides both **a − b** and **b − c**, hence their sum **a − c**.

So **≡ (mod n)** behaves like a tempered version of **=** that only cares about remainders after dividing by **n**.

## Why you might care

Later proofs (gcd tricks, the n = 3 and n = 4 cases of Fermat) spend a lot of time rewriting statements as “something divides something else” or “two integers agree modulo n.” Being able to multiply both sides, add congruent quantities, and chase differences through | is the mechanical skill those arguments assume.
