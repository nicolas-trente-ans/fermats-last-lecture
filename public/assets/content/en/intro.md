# Introduction

It is okay if parts of this feel fuzzy at first. Read what you can; later sections will return to the same ideas with more detail.

## Fermat's Last Theorem

**FLT**: Fermat's Last Theorem.

**aⁿ + bⁿ = cⁿ** — for positive integers a, b, c and an integer exponent n.

For n = 1 there are many solutions (for example 3¹ + 4¹ = 7¹). For n = 2 there are solutions too (for example 3² + 4² = 5²). The claim is that when n is an integer greater than 2, **no** positive integers a, b, c satisfy the equation.

In plain English: you cannot split a perfect power into a sum of two like powers once the exponent is three or more.

The modern proof does not stay inside elementary number theory alone. It builds a chain of tools — number systems and notation, algebra, elliptic curves, modular forms, and the modularity theorem — and then brings those tools back together.

$$
\text{There are no positive integers } a, b, c \text{ and integer } n > 2
\text{ such that } a^{n} + b^{n} = c^{n}.
$$

## Why you might care

When the exponent is **2**, the equation a² + b² = c² is Pythagoras’ theorem: the side lengths of a right triangle, or the straight-line distance between two points in the plane. Engineers, physicists, computer graphics, and anyone measuring length in space lean on that fact constantly.

When the exponent is **3**, picture space built from tiny **unit cubes** (1×1×1 blocks), like game voxels or sugar cubes. A large cube with whole-number side length c is then a block of exactly c × c × c = c³ unit cubes. Two smaller cubes with whole-number side lengths a and b use a³ and b³ unit cubes. Asking whether a³ + b³ = c³ is asking: can you take the unit cubes that fill the big cube and restack them into exactly two smaller cubes — still with whole-number sides, no cutting a unit cube in half? The theorem says you never can. That discrete, “count the blocks” mindset shows up whenever we pack, tile, or discretize the world.

That pattern — equations in whole numbers, distances, volumes, and higher powers — sits underneath a lot of scientific work. Material design and crystal structure care about how discrete pieces fit in space. Statistics and data science lean on distances, norms, and squared errors (close cousins of the n = 2 case). Cryptography, coding theory, and parts of physics reuse the same algebraic toolkit this lecture builds toward: number systems, modular arithmetic, curves, and maps between structures.

Fermat’s Last Theorem itself is a pure existence claim. The reason to study its proof is that the **tools** required to settle it became part of the shared language of modern mathematics — and that language travels into the sciences even when the theorem’s statement does not.

## How to use these notes

Each section of this companion lines up with a stretch of the video. Watch the clip, read the notes when you want more detail, and try the short open-note check when you are ready. If something is unclear, stay with the notes or rewatch before moving on — confusion here is normal, not a stop sign.
