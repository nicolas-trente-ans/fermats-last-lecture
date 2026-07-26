# Proof of FLT for n = 3

It is okay if Euler’s descent feels long on a first pass. Read what you can; the shape returns in the schema at the end.

The basic argument is: assume a **smallest** solution, force **coprimality** and the **forced** parity, reach **z³ = 2·u·(u² + 3·v²)**, apply the **cubic form lemma**, then demonstrate a **smaller** solution, thereby the existence of a smallest solution must be false.

## The claim

**FLT for n = 3**: there are no nonzero integers x, y, z with

$$
x^{3} + y^{3} + z^{3} = 0.
$$

**Example (non-solution).** 3³ + 4³ = 27 + 64 = 91, while 5³ = 125 — so 3³ + 4³ ≠ 5³. Casual tries fail; the theorem says **no** positive triple works at all.

Equivalently: no positive integers a, b, c satisfy a³ + b³ = c³. (From a³ + b³ = c³ take x = a, y = b, z = −c.)

$$
\nexists\, x, y, z \in \mathbb{Z}
\ \text{s.t.}\
x \cdot y \cdot z \neq 0
\ \text{and}\
x^{3} + y^{3} + z^{3} = 0.
$$

## Assume a smallest solution

**F**: the set of sizes of nonzero integer solutions.

$$
F := \bigl\{\, |x \cdot y \cdot z| :\ x, y, z \in \mathbb{Z},\ x \cdot y \cdot z \neq 0,\ x^{3} + y^{3} + z^{3} = 0 \,\bigr\}.
$$

**For the sake of contradiction**, suppose F is nonempty. Every nonempty set of positive integers has a least element, so pick a solution (x, y, z) that is **smallest** in this sense:

$$
|x \cdot y \cdot z|
\quad\text{is minimal in } F.
$$

If (x₂, y₂, z₂) is any other nonzero integer solution of the same equation, then

$$
|x \cdot y \cdot z| \le |x_{2} \cdot y_{2} \cdot z_{2}|.
$$

The rest of the proof shows that this minimal solution produces **another** nonzero solution (x′, y′, z′) with

$$
|x' \cdot y' \cdot z'| < |x \cdot y \cdot z|,
$$

contradicting minimality. Hence F was empty: no solution existed.

## The variables are coprime

**Lemma.** In a smallest solution (x, y, z), the three integers are **pairwise coprime**:

$$
\operatorname{gcd}(x, y) = \operatorname{gcd}(x, z) = \operatorname{gcd}(y, z) = 1.
$$

**Why.** Suppose a prime p divides two of them, say x and y. Then p³ divides x³ + y³ = −z³, so p | z. Write **x = p·x₁**, **y = p·y₁**, **z = p·z₁**. Then

$$
(p \cdot x_{1})^{3} + (p \cdot y_{1})^{3} + (p \cdot z_{1})^{3} = 0
\quad\Rightarrow\quad
x_{1}^{3} + y_{1}^{3} + z_{1}^{3} = 0,
$$

with **x₁·y₁·z₁ ≠ 0** and

$$
|x_{1} \cdot y_{1} \cdot z_{1}| = \frac{|x \cdot y \cdot z|}{p^{3}} < |x \cdot y \cdot z|.
$$

That is a strictly smaller element of F, contradicting minimality. So no such shared prime exists.

In particular, **gcd(x, y, z) = 1**: if not, dividing out the common factor would again give a smaller solution in F.

## Exactly one variable is even

**Lemma.** In a pairwise-coprime solution of x³ + y³ + z³ = 0, **exactly one** of x, y, z is even.

**Why.**

- **At most one** even: if two were even, they would share the prime 2, contradicting pairwise coprimality.
- **At least one** even: an odd cube is odd, and odd + odd + odd is odd, so three odd cubes cannot sum to 0.

This is a **forced property of every solution**, not a branch of the proof. Without loss of generality, take **x** and **y** odd and **z** even.

## Write the odds as u ± v

Define

$$
u := \frac{x + y}{2},
\qquad
v := \frac{x - y}{2}.
$$

Then **x = u + v** and **y = u − v**, both odd, and **gcd(u, v) = 1** (inherited from pairwise coprimality of x, y, z).

Expand the cubes:

$$
x^{3} + y^{3}
= (u + v)^{3} + (u - v)^{3}
= 2 \cdot u^{3} + 6 \cdot u \cdot v^{2}
= 2 \cdot u \cdot (u^{2} + 3 \cdot v^{2}).
$$

Since x³ + y³ + z³ = 0, we have x³ + y³ = −z³, so

$$
2 \cdot u \cdot (u^{2} + 3 \cdot v^{2}) = - z^{3}.
$$

Equivalently (replacing u by −u if convenient, which preserves gcd(u, v) = 1),

$$
z^{3} = 2 \cdot u \cdot (u^{2} + 3 \cdot v^{2}).
$$

The second factor has the shape **u² + 3·v²**. Once that factor is known to be a cube, the cubic form lemma (below) will apply.

## The gcd is 1 or 3

Look at

$$
\operatorname{gcd}\bigl(2 \cdot u,\ u^{2} + 3 \cdot v^{2}\bigr).
$$

Because **gcd(u, v) = 1**, any common prime divisor of u and u² + 3·v² must divide 3·v², hence (with Euclid’s lemma and gcd(u, v) = 1) can only involve the prime **3**. The second factor is odd (u and v have opposite parity), so the factor 2 does not enlarge the gcd. The possibilities reduce to:

$$
\operatorname{gcd}\bigl(2 \cdot u,\ u^{2} + 3 \cdot v^{2}\bigr)
\in \{1,\ 3\}.
$$

(Informally: the interesting part is **gcd(u, 3·v²)**, which is 1 or 3.)

## Lemma: coprime factors of a cube

This lemma will be helpful below.

**Lemma.** Because pairwise-coprime integers multiply to a perfect cube, **each** factor must itself be a perfect cube or the negative of a perfect cube.

Formally: if

$$
a \cdot b \cdot c = k^{3}
\quad\text{and}\quad
\operatorname{gcd}(a, b) = \operatorname{gcd}(a, c) = \operatorname{gcd}(b, c) = 1,
$$

then there exist integers U, V, W such that

$$
a = \pm U^{3},
\qquad
b = \pm V^{3},
\qquad
c = \pm W^{3}.
$$

(The same statement holds for two factors: if a · b = k³ and gcd(a, b) = 1, then a = ±U³ and b = ±V³.)

**Why.** Every nonzero integer can be written (up to sign) as a **product of primes raised to powers** — for example 360 = 2³ · 3² · 5, or −12 = −(2² · 3).

Because a, b, c are **pairwise coprime**, no prime appears in more than one of them. So each prime’s full exponent in the product a · b · c lives entirely inside a single factor.

Because a · b · c is a cube, every prime’s exponent in that product is a multiple of 3. That same exponent is the one sitting inside whichever factor owns the prime. Hence in each of a, b, and c separately, every prime power has exponent divisible by 3.

**Visual.** The primes are partitioned among a, b, c, and each exponent is already a multiple of 3 — for example:

$$
\begin{align*}
a &= p_{1}^{3},\\
b &= p_{2}^{3},\\
c &= p_{3}^{3} \cdot p_{4}^{3},\\[6pt]
a \cdot b \cdot c &= p_{1}^{3} \cdot p_{2}^{3} \cdot p_{3}^{3} \cdot p_{4}^{3}
= (p_{1} \cdot p_{2} \cdot p_{3} \cdot p_{4})^{3}.
\end{align*}
$$

No prime is shared, so the product is a cube **and** each of a, b, c is already a cube on its own (here a = p₁³, b = p₂³, c = (p₃ · p₄)³).

Thus the absolute value of each factor is a perfect cube. If a factor is negative, it is the negative of a perfect cube, since (−U)³ = −U³.

## Case gcd = 1: both factors are cubes

Suppose

$$
\operatorname{gcd}\bigl(2 \cdot u,\ u^{2} + 3 \cdot v^{2}\bigr) = 1.
$$

**Recall where we are.** We already have

$$
z^{3} = 2 \cdot u \cdot (u^{2} + 3 \cdot v^{2}),
$$

so the product of the two factors **is** a cube (up to the sign we absorbed when flipping u). Call the factors

$$
A := 2 \cdot u,
\qquad
B := u^{2} + 3 \cdot v^{2},
$$

so **A · B = z³** (after that sign cleanup) and **gcd(A, B) = 1**.

**Why each factor is ± a cube.** Apply the two-factor case of the lemma above: A · B is a cube and gcd(A, B) = 1, so

$$
A = \pm r^{3},
\qquad
B = \pm s^{3}
$$

for nonzero integers r, s. Since A and B are coprime, we also get **gcd(r, s) = 1**.

Writing that out:

$$
2 \cdot u = \pm r^{3},
\qquad
u^{2} + 3 \cdot v^{2} = \pm s^{3},
\qquad
\operatorname{gcd}(r, s) = 1.
$$

**Absorbing signs.** Replacing r by −r flips the sign of r³; same for s. So we may choose the signs of r and s to obtain the clean equations

$$
2 \cdot u = r^{3},
\qquad
u^{2} + 3 \cdot v^{2} = s^{3}.
$$

## The cubic form lemma

Now B = u² + 3·v² is a cube, so the following tool applies.

**Cubic form lemma.** Let **p** and **q** be **coprime** integers such that

$$
p^{2} + 3 \cdot q^{2} = s^{3}
$$

for some integer **s**. Then there exist **coprime** integers **e** and **f** with

$$
p = e \cdot (e^{2} - 9 \cdot f^{2}),
\qquad
q = 3 \cdot f \cdot (e^{2} - f^{2}).
$$

**Check one direction.** If p and q have that shape, then

$$
\bigl(e \cdot (e^{2} - 9 \cdot f^{2})\bigr)^{2} + 3 \cdot \bigl(3 \cdot f \cdot (e^{2} - f^{2})\bigr)^{2}
= \bigl(e^{2} + 3 \cdot f^{2}\bigr)^{3},
$$

so **s = e² + 3·f²** works. The lemma is the converse: every coprime solution of **p² + 3·q² = s³** arises this way.

Notes:

- Coprimality of p and q is required.
- The form forces **3 | q**.
- A complete proof of the lemma uses unique factorization related to **ℤ[√−3]**; treat it as a named tool here (as with Euclid’s lemma in the gcd section).

$$
\begin{align*}
&\operatorname{gcd}(p, q) = 1
\ \text{and}\
p^{2} + 3 \cdot q^{2} = s^{3}\\
&\quad\Rightarrow\quad
\exists\, e, f,\ \operatorname{gcd}(e, f) = 1,\\
&\qquad p = e \cdot (e^{2} - 9 \cdot f^{2}),\quad
q = 3 \cdot f \cdot (e^{2} - f^{2}).
\end{align*}
$$

**Apply it.** Take **p = u** and **q = v** (we already have **gcd(u, v) = 1** and **u² + 3·v² = s³**). Then there are coprime integers e, f with

$$
u = e \cdot (e^{2} - 9 \cdot f^{2}),
\qquad
v = 3 \cdot f \cdot (e^{2} - f^{2}).
$$

Substitute into 2·u = r³:

$$
r^{3} = 2 \cdot u = 2 \cdot e \cdot (e^{2} - 9 \cdot f^{2}) = 2 \cdot e \cdot (e + 3 \cdot f) \cdot (e - 3 \cdot f).
$$

## Pairwise coprime cubic factors

**Claim.** The three factors **2·e**, **e + 3·f**, and **e − 3·f** are **pairwise coprime**.

**Why (idea).** This follows from **gcd(u, v) = 1** together with the shapes u = e·(e² − 9·f²) and v = 3·f·(e² − f²). A shared prime between any two of those three factors would force a common prime into u and v (spoiling the earlier coprimality), which is forbidden.

Apply the coprime-factors lemma with a = 2·e, b = e + 3·f, c = e − 3·f, and k = r. Each factor is ± a cube. In particular one can arrange signs so that

$$
-2 \cdot e,
\qquad
e + 3 \cdot f,
\qquad
e - 3 \cdot f
$$

are themselves perfect cubes. (The identity (−2·e) + (e + 3·f) + (e − 3·f) = 0 is what makes this sign pattern the useful one: three cubes that sum to zero, rather than 2·e + (e ± 3·f) which would sum to 4·e.)

Write

$$
-2 \cdot e = \alpha^{3},
\qquad
e + 3 \cdot f = \beta^{3},
\qquad
e - 3 \cdot f = \gamma^{3}.
$$

Then

$$
\alpha^{3} + \beta^{3} + \gamma^{3} = 0
$$

with α·β·γ ≠ 0. This is another element of F.

## The new solution is smaller

From the factorizations, **|α·β·γ| = |r|** and **|z| = |r·s|**. In a nontrivial solution one has **|s| > 1** (if |s| = 1 then u² + 3·v² = 1 forces v = 0, hence x = y, which collapses or contradicts pairwise-coprime nontriviality in this setup). Thus

$$
|\alpha \cdot \beta \cdot \gamma| = |r| < |r \cdot s| = |z| \le |x \cdot y \cdot z|,
$$

contradicting minimality of |x·y·z| in F.

## The other branch: gcd = 3

If instead

$$
\operatorname{gcd}\bigl(2 \cdot u,\ u^{2} + 3 \cdot v^{2}\bigr) = 3,
$$

divide out the shared factor of 3 and renormalize to a new equation of cubic-form type (again with a coprime pair playing the roles of u and v). The same two tools — the **cubic form lemma** and the **coprime-factors lemma** — produce a nonzero triple (α, β, γ) with α³ + β³ + γ³ = 0 and

$$
|\alpha \cdot \beta \cdot \gamma| < |x \cdot y \cdot z|.
$$

(The arithmetic is longer than the gcd = 1 branch, but the organizer is the same: clean, parametrize, split into pairwise-coprime cubes, descend.)

Same contradiction. So **both** values of the gcd yield a smaller element of F.

## The argument in one picture

**Graphic schema (Euler descent).**

1. Assume F ≠ ∅; pick (x, y, z) with **minimal |x·y·z|**.
2. **Coprimality**; **exactly one even** (forced, not a branch) — take x, y odd and z even.
3. Set **x = u + v**, **y = u − v** with **gcd(u, v) = 1**; obtain **z³ = 2·u·(u² + 3·v²)**.
4. **gcd(2·u, u² + 3·v²) ∈ {1, 3}** — the case split.
5. If the gcd is **1**: both factors are ± cubes → **u² + 3·v² = s³** → **cubic form lemma** → **u = e·(e² − 9·f²)**.
6. Factor **r³ = 2·e·(e + 3·f)·(e − 3·f)**; **coprime-factors lemma** → each is ± a cube.
7. **(−2·e) + (e + 3·f) + (e − 3·f) = 0** gives α³ + β³ + γ³ = 0 with **|α·β·γ| < |x·y·z|**.
8. The gcd-**3** branch likewise yields a smaller product. Contradiction → F = ∅.

$$
\begin{align*}
&|x \cdot y \cdot z|\text{ minimal}
\;\longrightarrow\;
\text{exactly one even (forced)}\\
&\longrightarrow\;
x = u + v,\ y = u - v
\;\longrightarrow\;
z^{3} = 2 \cdot u \cdot (u^{2} + 3 \cdot v^{2})\\
&\longrightarrow\;
\text{gcd }1\text{ or }3
\;\longrightarrow\;
\text{cubic form + coprime-factors lemmas}
\;\longrightarrow\;
\text{smaller }|\alpha \cdot \beta \cdot \gamma|
\;\longrightarrow\;
\bot
\end{align*}
$$

## Why you might care

Euler’s proof measures descent by **|x·y·z|**. Parity is settled before any casework: every solution has **exactly one** even variable. The two odds become **u ± v**, forcing **z³ = 2·u·(u² + 3·v²)**; the actual split is whether that gcd is 1 or 3. When the gcd is 1, the **cubic form lemma** parametrizes **u**, and the **coprime-factors lemma** splits **2·e·(e ± 3·f)** into pairwise-coprime ± cubes; **−2·e**, **e + 3·f**, **e − 3·f** then sum to zero as cubes — a strictly smaller solution. The n = 4 argument is a different descent. The modern proof for general n replaces this classical engine with elliptic curves and modular forms, but the **logic** — a solution begets a smaller one — is the same spirit.
