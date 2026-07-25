# Common Number Sets

It is okay if you do not understand every line yet. Read what you can; symbols and ideas will show up again with more practice.

We will use the following standard number systems throughout this material.

## Natural Numbers

**ℕ**: The set of natural numbers.

**ℕ** = {1, 2, 3, …}

Starting from 1, every subsequent whole number is a natural number: the next one is always obtained by adding 1. These are the counting numbers — the numbers we use to count discrete objects (one apple, two apples, three apples, …).

Some authors include 0 in ℕ. In this course we take ℕ to start at 1.

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

## Integers

**ℤ**: The set of integers.

**ℤ** = {…, −2, −1, 0, 1, 2, …}

The integers extend the natural numbers by including zero and the negatives. Every integer is either a natural number, zero, or the negative of a natural number.

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

**ℚ**: The set of rational numbers.

**ℚ** = {…, −2, −1, −1/2, 0, 1/2, 1, 3/2, 2, …}

A rational number is a quotient (ratio) of two integers — for example 1/2, −3/4, or 7 (= 7/1). Every integer is rational, since it can be written with denominator 1.

The denominator cannot be zero: division by zero is undefined.

$$
\mathbb{Q} = \left\{ \frac{p}{q} : p \in \mathbb{Z},\ q \in \mathbb{N} \right\}.
$$

## Real Numbers

**ℝ**: The set of real numbers.

**ℝ** = {…, −2, −√2, −1, 0, 1/2, 1, √2, e, π, …}

The real numbers form the entire number line. They include all rationals, and also irrationals such as √2 and π, which cannot be written as a ratio of integers.

Unlike ℕ, ℤ, ℚ, or ℂ, the reals are not built by combining simpler pieces into a formula. Instead they share properties: you can add, subtract, multiply, and divide real numbers (except by zero) and the result is again a real number. Between any two reals there are infinitely many others; there is no simple “list” of all of them.

$$
\begin{align*}
&\text{For all } a, b \in \mathbb{R}:\\
&a + b,\ a - b,\ a \cdot b \in \mathbb{R},\\
&\text{and if } b \neq 0, \text{ then } \tfrac{a}{b} \in \mathbb{R}.
\end{align*}
$$

## Complex Numbers

**ℂ**: The set of complex numbers.

**ℂ** = {…, −1, 0, 1, i, 1+i, 2−3i, …}

A complex number has a real part and an imaginary part. Here i is the imaginary unit, defined by i² = −1. Every real number x is a complex number with imaginary part zero: x = x + 0i.

Writing a + bi does not mean “add a and bi” in the everyday sense until we define arithmetic on ℂ; for now, treat a + bi as a pair of real numbers packaged together.

$$
\mathbb{C} = \{ a + bi : a, b \in \mathbb{R} \},
\quad\text{where } i^{2} = -1.
$$

## Membership

**∈** / **∉**: Belongs to / does not belong to a set.

−3 ∉ ℕ, 1/2 ∉ ℤ, √2 ∉ ℚ, i ∉ ℝ, 1 + i ∈ ℂ.

We write x ∈ A when x is an element of the set A, and x ∉ A when it is not. Membership asks a yes-or-no question: is this object in that set?

- −3 ∉ ℕ — naturals here start at 1, so negatives are excluded.
- 1/2 ∉ ℤ — half is not a whole number.
- √2 ∉ ℚ — it is irrational.
- i ∉ ℝ — it is purely imaginary.
- 1 + i ∈ ℂ — it has the form a + bi with a = 1, b = 1.

$$
x \in A \iff x \text{ is an element of } A;
\qquad
x \notin A \iff x \text{ is not an element of } A.
$$

## Inclusion

**⊂**: Is a subset of (sits inside).

**ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ**

These number systems sit inside one another: every natural is an integer; every integer is rational; every rational is real; every real is a complex number with imaginary part zero.

We write A ⊂ B when every element of A is also an element of B. Inclusion compares two sets; membership compares an element to a set.

$$
A \subset B \iff \text{every } x \in A \text{ is also in } B.
$$

## Cartesian Products

**×**: The Cartesian product of sets.

**ℕ × ℕ** = {(1,1), (1,2), (2,1), (3,5), …}

**ℝ² = ℝ × ℝ** = {(0,0), (1,2), (−3, 1/2), (π, √2), …}

For a set A, the Cartesian product A × A is the set of ordered pairs (x, y) with both coordinates taken from A. In particular, ℝ² is the set of ordered pairs of real numbers — the Euclidean plane.

Order matters: (1, 2) and (2, 1) are different pairs.

Because ℕ ⊂ ℝ, every pair of naturals is also a pair of reals, so ℕ × ℕ ⊂ ℝ × ℝ. The same idea gives ℤ × ℤ ⊂ ℚ × ℚ ⊂ ℝ × ℝ.

As sets of pairs, ℂ and ℝ × ℝ look alike: a + bi matches the pair (a, b). The subtle difference is how we treat them — ℝ × ℝ is just ordered pairs in the plane, while ℂ uses the same pairs as numbers you can multiply with the rule i² = −1.

$$
A \times A = \{ (x, y) : x \in A,\ y \in A \},
\qquad
\mathbb{R}^{2} = \mathbb{R} \times \mathbb{R}.
$$
