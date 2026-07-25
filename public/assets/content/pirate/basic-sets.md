# Common Number Sets (Arrr Edition)

Ahoy, distracted landlubbers! We'll be plunderin' these standard number systems throughout this material. If yer attention span be shorter than a cannon fuse, these jokes are fer ye.

Don't fret if some o' the notation still looks like a cursed treasure map. We'll chart it.

## Natural Numbers

**ℕ**: The set o' natural numbers (also known as "countin' like ye still got both hands").

**ℕ** = {1, 2, 3, …}

Startin' from 1, every subsequent whole number is a natural number: the next one is always got by addin' 1. These be the countin' numbers — fer tallyin' booty (one doubloon, two doubloons, three doubloons, …). Arrrithmetic, if ye will. (Ye won't. That's fine.)

Some authors stow 0 in ℕ like a spare biscuit. In this course we take ℕ to start at 1 — zero can swim alongside the ship, but it ain't aboard the naturals.

$$
\mathbb{N} =
\begin{cases}
1 \in \mathbb{N},\\[6pt]
\text{If } n \in \mathbb{N}, \text{ then } S(n) \in \mathbb{N},
\end{cases}
$$

$$
\text{where } S(n)=n+1.
$$

(That's the "successor" — fancy word fer "add one more parrot.")

## Integers

**ℤ**: The set o' integers (from the German "Zahlen," which is German fer "numbers," which is English fer "arrr").

**ℤ** = {…, −2, −1, 0, 1, 2, …}

The integers extend the naturals by bringin' aboard zero and the negatives — the debt side o' the ledger, the "I owe the crew" numbers. Every integer is either a natural number, zero, or the negative of a natural number. Positive booty, empty pockets, or… owing booty. Brutal.

$$
\text{For every } z \in \mathbb{Z}, \quad
z =
\begin{cases}
n,  & \text{for some } n \in \mathbb{N},\\
0,  & \\
-n, & \text{for some } n \in \mathbb{N}.
\end{cases}
$$

## Rational Numbers

**ℚ**: The set o' rational numbers (from "quotient," not "rational like a sensible pirate," which none of us are).

**ℚ** = {…, −2, −1, −1/2, 0, 1/2, 1, 3/2, 2, …}

A rational number is a quotient (ratio) of two integers — for example 1/2 (half a biscuit), −3/4 (negative three-quarters of a biscuit; tragic), or 7 (= 7/1, a whole stack o' biscuits with a fancy hat). Every integer is rational, since it can be written with denominator 1. Split the loot fairly… or unfairly… just write it as a fraction.

The denominator cannot be zero: division by zero be undefined, cursed, and will summon the Kraken of Undefined Behavior. Don't feed the Kraken.

$$
\mathbb{Q} = \left\{ \frac{p}{q} : p \in \mathbb{Z},\ q \in \mathbb{N} \right\}.
$$

## Real Numbers

**ℝ**: The set o' real numbers (as opposed to imaginary ones, which show up later wearin' eye patches made of √−1).

**ℝ** = {…, −2, −√2, −1, 0, 1/2, 1, √2, e, π, …}

The real numbers form the entire number line — the endless dock where every point gets a number. They include all rationals, and also irrationals such as √2 and π, which cannot be written as a ratio of integers. π be round like a cannonball and refuses to terminate its decimal; rude, but iconic.

Unlike ℕ, ℤ, ℚ, or ℂ, the reals ain't built by combinin' simpler pieces into a cute formula. Instead they share properties like a crew shares grog: ye can add, subtract, multiply, and divide reals (except by zero — still cursed) and the result is again a real number. Between any two reals there be infinitely many others; there is no simple "list" of all of them. If ye try to list 'em, ye'll still be scribblin' when the ship sinks.

$$
\begin{align*}
&\text{For all } a, b \in \mathbb{R}:\\
&a + b,\ a - b,\ a \cdot b \in \mathbb{R},\\
&\text{and if } b \neq 0, \text{ then } \tfrac{a}{b} \in \mathbb{R}.
\end{align*}
$$

## Complex Numbers

**ℂ**: The set o' complex numbers (complex like yer feelings about Monday; also math).

**ℂ** = {…, −1, 0, 1, i, 1+i, 2−3i, …}

A complex number has a real part and an imaginary part — like a pirate with a day job. Here i is the imaginary unit, defined by i² = −1. (Aye: multiply i by itself and ye get minus one. Math said "hold me grog.") Every real number x is a complex number with imaginary part zero: x = x + 0i. Real as rain, imaginary as zero sea monsters.

Writin' a + bi don't mean "add a and bi" in the everyday sense until we define arithmetic on ℂ; for now, treat a + bi as a pair of real numbers packaged together — two coordinates in a fancy coat.

$$
\mathbb{C} = \{ a + bi : a, b \in \mathbb{R} \},
\quad\text{where } i^{2} = -1.
$$

## Membership

**∈** / **∉**: Belongs to / does not belong to a set. (Crew roster check. Are ye on the ship or swimmin'?)

−3 ∉ ℕ, 1/2 ∉ ℤ, √2 ∉ ℚ, i ∉ ℝ, 1 + i ∈ ℂ.

We write x ∈ A when x is an element of the set A, and x ∉ A when it is not. Membership asks a yes-or-no question: is this object in that set? No maybes. No "kinda aboard." Either ye signed the articles or ye didn't.

- −3 ∉ ℕ — naturals here start at 1, so negatives are left ashore (debtors' island).
- 1/2 ∉ ℤ — half a biscuit ain't a whole biscuit, mate.
- √2 ∉ ℚ — it is irrational (and won't listen to reason, nor to sea shanties).
- i ∉ ℝ — it is purely imaginary (like the sea monster yer first mate "definitely saw").
- 1 + i ∈ ℂ — it has the form a + bi with a = 1, b = 1. Welcome aboard, fancy pair.

$$
x \in A \iff x \text{ is an element of } A;
\qquad
x \notin A \iff x \text{ is not an element of } A.
$$

## Inclusion

**⊂**: Is a subset of (sits inside) (nests like matryoshka dolls, but make it nautical: ships in bottles in chests).

**ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ**

These number systems nest inside one another like Russian dolls wearin' eyepatches: every natural is an integer; every integer is rational; every rational is real; every real is a complex number with imaginary part zero. Bigger sets swallow smaller sets. Arrr, the food chain of math.

We write A ⊂ B when every element of A is also an element of B. Inclusion compares two sets; membership compares an element to a set. One is "crew vs crew," the other is "is *this* bilge rat on *that* roster?"

$$
A \subset B \iff \text{every } x \in A \text{ is also in } B.
$$

## Cartesian Products

**×**: The Cartesian product of sets (named after Descartes, who thought hard and therefore was — we mostly just multiply sets and say "X marks the spot").

**ℕ × ℕ** = {(1,1), (1,2), (2,1), (3,5), …}

**ℝ² = ℝ × ℝ** = {(0,0), (1,2), (−3, 1/2), (π, √2), …}

For a set A, the Cartesian product A × A is the set of ordered pairs (x, y) with both coordinates taken from A. In particular, ℝ² is the set of ordered pairs of real numbers — the Euclidean plane, aka the flat ocean chart where X marks… well, every point, actually. Crowded map.

Order matters: (1, 2) and (2, 1) are different pairs. Sail east-then-north is not the same as north-then-east unless ye enjoy crashin' into reefs for sport.

Because ℕ ⊂ ℝ, every pair of naturals is also a pair of reals, so ℕ × ℕ ⊂ ℝ × ℝ. The same idea gives ℤ × ℤ ⊂ ℚ × ℚ ⊂ ℝ × ℝ. Little grids inside bigger grids. Treasure maps all the way down.

As sets of pairs, ℂ and ℝ × ℝ look alike: a + bi matches the pair (a, b) — twins separated at birth. The subtle difference is how we treat them — ℝ × ℝ is just ordered pairs in the plane (dots on a chart), while ℂ uses the same pairs as numbers ye can multiply with the rule i² = −1 (dots that do algebra and have opinions). Same coordinates, different vibes. One's a map; the other's a map that can punch.

$$
A \times A = \{ (x, y) : x \in A,\ y \in A \},
\qquad
\mathbb{R}^{2} = \mathbb{R} \times \mathbb{R}.
$$

Fair winds, and may yer sets be closed under whatever operation ye attempt (except division by zero — still: don't).
