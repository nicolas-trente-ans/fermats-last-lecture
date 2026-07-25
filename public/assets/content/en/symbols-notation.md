# Symbols and Notation

It is okay if some of these shortcuts feel opaque at first. Read what you can; you will see them reused until they feel ordinary.

These are abbreviations mathematicians use constantly to keep statements short and clear. You already know the number sets and ∈, ∉, ⊂ from the previous section; here we add a few more tools for writing claims and proof outlines.

## For All

**∀**: For all / for every.

**∀ x ∈ ℝ** — “for every real number x …”

This upside-down A means we are talking about **every** object of a given kind. If a claim starts with ∀, it must hold for each choice in the set — not just for a few examples.

You will also hear “for every” or “for any” in spoken English; they play the same role.

$$
\forall x \in \mathbb{R},\quad x^{2} \ge 0.
$$

## There Exists

**∃**: There exists / there is at least one.

**∃ n ∈ ℕ** — “there is at least one natural number n …”

This backwards E means we claim **some** object of that kind works. We do not have to name every possibility — only that at least one does.

**∃!** is sometimes used for “there exists a unique …,” but this lecture mostly needs the plain ∃.

$$
\exists n \in \mathbb{N}\ \text{such that}\ n > 100.
$$

## Defined As

**:=**: Is defined to be / means by definition.

**f(n) := n + 1** — “f(n) is defined to be n + 1.”

Use := when you are **introducing** a name or abbreviation, not when you are claiming two already-known things are equal. Ordinary **=** compares; **:=** states.

Some authors write **≝** or just say “define …” in words. Many mathematicians, however, prefer := for definitions owing to its simplicity.

$$
S(n) := n + 1.
$$

It is sometimes called the "Walrus Operator" because it looks like a Walrus.

## Such That

**S.T.** (or **s.t.**): Such that.

**∃ k ∈ ℤ s.t. b = a·k** — “there exists an integer k such that b equals a times k.”

“Such that” stitches a condition onto an existence (or for-all) claim. It answers: _which_ objects are we talking about?

In prose you can always write the words out; S.T. is only a speed shortcut.

$$
\exists\, k \in \mathbb{Z}\ \text{s.t.}\ b = ak.
$$

## Want to Show and Enough to Show

**WTS**: Want to show.

**ETS**: Enough to show.

These mark **goals** in a proof sketch, not finished facts.

- **WTS** names the claim you are aiming at.
- **ETS** names a simpler claim that would finish the job if proved.

Example: n is an integer and you WTS that n² is even. Because the square of an odd integer is odd, it is ETS that n itself is even — then n² is automatically even.

They keep the “what are we doing?” line visible while details fill in below.

$$
\text{WTS: } n^{2}\ \text{is even.}\qquad
\text{ETS: } n\ \text{is even.}
$$

## Without Loss of Generality

**w.l.o.g.**: Without loss of generality.

“We may assume w.l.o.g. that a ≤ b” means: the other case is the same after renaming or symmetry, so we only write one case.

Use this only when the missing cases really are covered by the same argument. It is a license to shorten writing — not a license to skip a genuinely different case.

## Putting It Together

With these shortcuts, Fermat’s Last Theorem can be written densely. In words from the introduction: for every integer n ≥ 3, there do not exist nonzero integers x, y, z such that xⁿ + yⁿ = zⁿ.

$$
\forall\, n \ge 3,\quad
\nexists\, x,y,z \in \mathbb{Z}
\ \text{s.t.}\
x,y,z \neq 0
\ \text{and}\
x^{n} + y^{n} = z^{n}.
$$

Here **∄** means “there does not exist,” the negation of ∃. You can always unpack this back into English; the symbols are a packing format, not a different claim.

## Why you might care

Proofs in later sections (and in papers) lean on this shorthand so the **logic** stays visible: what is assumed, what is sought, and what would be enough. Learning to read ∀, ∃, s.t., WTS, and ETS is less about memorizing glyphs and more about recognizing the shape of an argument when it is compressed.
