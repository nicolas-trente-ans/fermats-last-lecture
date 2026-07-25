# Introduction

Aye, 'tis fine if parts o' this feel foggy at first. Read what ye can; later stretches sail back to the same ideas with more detail.

## Fermat's Last Theorem

**FLT**: Fermat's Last Theorem — the cursed margin note that launched a thousand proofs.

**aⁿ + bⁿ = cⁿ** — for positive integers a, b, c and an integer exponent n.

For n = 1 there be plenty o' solutions (say 3¹ + 4¹ = 7¹). For n = 2 there be solutions too (3² + 4² = 5², the classic right-triangle booty). The claim is that when n be an integer greater than 2, **no** positive integers a, b, c satisfy the equation.

In plain pirate: ye cannot split a perfect power into a sum of two like powers once the exponent be three or more. The treasure chest does not open that way.

The modern proof does not stay in elementary number theory alone, mate. It builds a whole armada of tools — number systems and notation, algebra, elliptic curves, modular forms, and the modularity theorem — then brings every ship back for the endgame.

$$
\text{There are no positive integers } a, b, c \text{ and integer } n > 2
\text{ such that } a^{n} + b^{n} = c^{n}.
$$

## Why ye might care (even if ye came for the memes)

When the exponent be **2**, a² + b² = c² is Pythagoras’ theorem: side lengths of a right triangle, or the straight-line distance betwixt two points on the plane. Engineers, physicists, computer-graphics wizards, and anyone measurin' length in space lean on that fact constantly — like a mast leanin' on the keel.

When the exponent be **3**, picture space built from tiny **unit cubes** (1×1×1 blocks), like game voxels or sugar cubes in the galley. A large cube with whole-number side length c is then a block of exactly c × c × c = c³ unit cubes. Two smaller cubes with whole-number sides a and b use a³ and b³ unit cubes. Askin' whether a³ + b³ = c³ is askin': can ye take the unit cubes that fill the big cube and restack 'em into exactly two smaller cubes — still with whole-number sides, no sawin' a unit cube in half? The theorem says ye never can. That discrete, “count the blocks” mindset shows up whenever we pack, tile, or discretize the world — cargo holds, crystal lattices, the lot.

That pattern — equations in whole numbers, distances, volumes, and higher powers — sits under a lot o' scientific work. Material design and crystal structure care how discrete pieces fit in space. Statistics and data science lean on distances, norms, and squared errors (close cousins o' the n = 2 case). Cryptography, coding theory, and parts o' physics reuse the same algebraic toolkit this lecture builds toward: number systems, modular arithmetic, curves, and maps between structures.

Fermat’s Last Theorem itself is a pure existence claim — no gold coins fall out when ye prove it. The reason to study the proof is that the **tools** required to settle it became part o' the shared language of modern mathematics — and that language sails into the sciences even when the theorem’s statement does not.

## How to use these notes

Each stretch o' this companion lines up with a stretch o' the video. Watch the clip, read the notes when ye want more detail, and try the short open-note check when ye be ready. If somethin' be unclear, stay with the notes or rewatch before movin' on — confusion here is normal, not a kraken.
