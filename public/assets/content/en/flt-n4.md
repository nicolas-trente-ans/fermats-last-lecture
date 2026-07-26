# Proof of FLT for n = 4

It is okay if the algebra feels long on a first pass. Read what you can; skim what is cloudy, and come back as the shape returns in the schema at the end.

The basic argument is: prove a **geometric lemma** by infinite descent, then show that a solution of FLT for n = 4 would produce a triangle **forbidden** by that lemma.

## The claim

**FLT for n = 4**: there are no positive integers x, y, z with x⁴ + y⁴ = z⁴.

**Example (non-solution).** 1⁴ + 2⁴ = 1 + 16 = 17, which is not a fourth power. Casual tries fail; the theorem says **no** positive triple works at all.

In English: no positive integers satisfy the fourth-power equation above.

$$
\nexists\, x, y, z \in \mathbb{Z}^{+}
\ \text{s.t.}\
x^{4} + y^{4} = z^{4}.
$$

To prove this, we need a geometric lemma.

## Part A — The Square-Area Lemma

**Square-area lemma**: there is no right triangle with integer sides whose area is a perfect square.

**Example (ordinary triangle).** The familiar 3–4–5 triangle has area (3·4)/2 = 6, which is **not** a square. The lemma says you never get a square area either — not for this triple, and not for any other positive integer sides.

In other words: there are no positive integers a, b, c, s with

$$
a^{2} + b^{2} = c^{2}
\quad\text{and}\quad
\frac{a \cdot b}{2} = s^{2}.
$$

We prove this by **infinite descent** on the size of the hypotenuse.

### Squares mod 4

**Lemma.** For every integer n, the square n² is congruent to 0 or 1 modulo 4 — never 2 or 3.

**Example.** 6² = 36 ≡ 0 (mod 4); 7² = 49 ≡ 1 (mod 4). You never see ≡ 2 or ≡ 3.

**Why.** Any integer is even or odd.

- If n = 2·k, then n² = 4·k² ≡ 0 (mod 4).
- If n = 2·k + 1, then n² = 4·k·(k + 1) + 1 ≡ 1 (mod 4).

$$
n^{2} \equiv 0 \ \text{or}\ 1 \pmod{4}.
$$

**Consequence for right triangles.** In a² + b² = c², both a and b cannot be odd: otherwise a² ≡ 1 and b² ≡ 1 (mod 4), so a² + b² ≡ 2 (mod 4), which is impossible for a square.

### Primitive reduction

Let d = gcd(a, b, c). Then a = d·a₁, b = d·b₁, c = d·c₁ with gcd(a₁, b₁, c₁) = 1, and

$$
a_{1}^{2} + b_{1}^{2} = c_{1}^{2}.
$$

The area becomes

$$
\frac{a \cdot b}{2} = d^{2} \cdot \frac{a_{1} \cdot b_{1}}{2}.
$$

If the original area is a square, then — because d² is already a square — the primitive triangle’s area is also a square. So it is enough to rule out a **primitive** integer right triangle with square area.

In a primitive Pythagorean triple, exactly one of a, b is even (from the mod-4 obstruction above). Without loss of generality, take **a** even.

### Parametrization of primitive triples

**Lemma.** Every primitive Pythagorean triple with a even can be written

$$
a = 2 \cdot p \cdot q,
\quad
b = p^{2} - q^{2},
\quad
c = p^{2} + q^{2},
$$

where p > q > 0, gcd(p, q) = 1, and p, q have opposite parity (one even, one odd).

**Example.** p = 2, q = 1 gives a = 2·2·1 = 4, b = 4 − 1 = 3, c = 4 + 1 = 5 — the familiar 3–4–5 triple (with the even leg labeled a).

### The area factors

$$
\text{Area}
=
\frac{a \cdot b}{2}
=
p \cdot q \cdot (p - q) \cdot (p + q).
$$

### If the area is a square

Suppose the area is a perfect square. The four factors

$$
p,\quad q,\quad p - q,\quad p + q
$$

are pairwise relatively prime:

- gcd(p, q) = 1 by construction.
- gcd(p, p − q) = gcd(p, q) = 1, and similarly for the other adjacent pairs.
- gcd(p − q, p + q) = 1: both factors are odd (opposite parity of p, q), and any common divisor of p − q and p + q divides their sum 2·p and their difference 2·q; with gcd(p, q) = 1 and both factors odd, the gcd is 1.

A product of pairwise-coprime positive integers is a square if and only if each factor is a square. Hence there exist positive integers r, s, u, v with

$$
p = r^{2},
\quad
q = s^{2},
\quad
p + q = u^{2},
\quad
p - q = v^{2}.
$$

### Descent construction

From those identities,

$$
r^{2} + s^{2} = u^{2},
\quad
r^{2} - s^{2} = v^{2}.
$$

Subtracting gives

$$
u^{2} - v^{2} = 2 \cdot s^{2},
$$

so

$$
(u - v) \cdot (u + v) = 2 \cdot s^{2}.
$$

Set

$$
M = \frac{u + v}{2},
\quad
N = \frac{u - v}{2}.
$$

(These are integers: u and v are both odd, since p + q and p − q are both odd.) Then

$$
M + N = u,
\quad
M - N = v,
\quad
2 \cdot M \cdot N = s^{2}.
$$

Since s² is even, s is even: write s = 2·t. Then

$$
M \cdot N = 2 \cdot t^{2}.
$$

Because M and N are coprime (their gcd divides u and v, and gcd(u, v) = 1 in this setup) and their product is twice a square, one of them is a square and the other is twice a square. Up to swapping,

$$
M = \alpha^{2},
\quad
N = 2 \cdot \beta^{2}
$$

for positive integers α, β. (The swap N = α², M = 2·β² is symmetric.)

Then

$$
r^{2}
=
\frac{u^{2} + v^{2}}{2}
=
M^{2} + N^{2}
=
\alpha^{4} + 4 \cdot \beta^{4},
$$

that is

$$
(\alpha^{2})^{2} + (2 \cdot \beta^{2})^{2} = r^{2}.
$$

So α², 2·β², r form a new integer right triangle. Its area is

$$
\frac{\alpha^{2} \cdot (2 \cdot \beta^{2})}{2}
=
(\alpha \cdot \beta)^{2},
$$

a perfect square.

The new hypotenuse is r. The original hypotenuse was

$$
c = p^{2} + q^{2} = r^{4} + s^{4},
$$

so r < c. We have produced a smaller positive-integer right triangle with square area — contradicting minimality of the hypotenuse (or, equivalently: infinite descent).

Therefore **no** positive integer right triangle has square area.

## Part B — Reduce FLT for n = 4 to the lemma

Assume positive integers x, y, z satisfy

$$
x^{4} + y^{4} = z^{4},
$$

and take gcd(x, y, z) = 1.

### Fourth powers mod 8

**Lemma.** For every integer n, the fourth power n⁴ is congruent to 0 or 1 modulo 8, according to parity:

$$
n^{4} \equiv
\begin{cases}
0 \pmod{8} & \text{if } n \text{ is even}, \\
1 \pmod{8} & \text{if } n \text{ is odd}.
\end{cases}
$$

**Example.** 4⁴ = 256 ≡ 0 (mod 8); 3⁴ = 81 ≡ 1 (mod 8). You never see ≡ 2, 3, 4, 5, 6, or 7 from a fourth power.

**Why.**

- If n = 2·k, then n⁴ = 16·k⁴ ≡ 0 (mod 8).
- If n is odd, n = 2·k + 1, then n² ≡ 1 (mod 8), so n⁴ ≡ 1 (mod 8).

**Consequence.** In x⁴ + y⁴ = z⁴, x and y cannot both be odd: otherwise x⁴ + y⁴ ≡ 2 (mod 8), while z⁴ ≡ 0 or 1 (mod 8). So (without loss of generality) **x** is even and **y** is odd; then z is odd.

### Factorization

Rewrite as

$$
x^{4} = z^{4} - y^{4} = (z^{2} - y^{2}) \cdot (z^{2} + y^{2}).
$$

Both factors are even (z and y odd). Their gcd is 2:

$$
\operatorname{gcd}(z^{2} - y^{2},\ z^{2} + y^{2})
=
\operatorname{gcd}(z^{2} - y^{2},\ 2 \cdot y^{2})
=
2,
$$

using gcd(x, y, z) = 1 and y odd.

Moreover,

$$
z^{2} + y^{2} \equiv 1 + 1 = 2 \pmod{8},
$$

while z² − y² is divisible by 8 (difference of two odd squares). Since the product is a fourth power and the factors share only the prime 2, one concludes

$$
z^{2} + y^{2} = 2 \cdot b^{4},
\quad
z^{2} - y^{2} = 8 \cdot a^{4}
$$

for positive integers a, b. Multiplying these two equations gives

$$
x^{4} = (2 \cdot b^{4}) \cdot (8 \cdot a^{4}) = 16 \cdot a^{4} \cdot b^{4},
$$

so

$$
x = 2 \cdot a \cdot b.
$$

### The forbidden triangle

Adding the two factor equations:

$$
2 \cdot z^{2} = 2 \cdot b^{4} + 8 \cdot a^{4},
$$

hence

$$
z^{2} = b^{4} + 4 \cdot a^{4},
$$

that is

$$
(b^{2})^{2} + (2 \cdot a^{2})^{2} = z^{2}.
$$

So b², 2·a², z form an integer right triangle. Its area is

$$
\frac{b^{2} \cdot (2 \cdot a^{2})}{2}
=
(a \cdot b)^{2},
$$

a perfect square — contradicting the Square-Area Lemma.

Therefore there is no positive integer solution of x⁴ + y⁴ = z⁴.

## Proof schema

**Layer 1 — Square-area lemma (Pythagorean descent).**

Primitive param → Area = p·q·(p − q)·(p + q) → four pairwise-coprime factors are squares → smaller triangle α², 2·β², r with square area → infinite descent.

**Layer 2 — Fermat’s reduction for n = 4.**

Fourth powers mod 8 → x even → x⁴ = (z² − y²)·(z² + y²) = (2·b⁴)·(8·a⁴) → triangle b², 2·a², z with area (a·b)² → contradicts Layer 1.

## Why you might care

For n = 4 the obstruction is **geometric**: a solution would force a right triangle whose area is a square, which descent rules out. That is a different path from the n = 3 cubic-form argument — same infinite-descent spirit, different arithmetic shape.
