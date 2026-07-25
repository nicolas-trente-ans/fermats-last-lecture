# Szokásos számhalmazok

A tananyag során a következő standard számrendszereket használjuk.

Ne aggodj, ha egyes jelöléseket még nem értesz.

## Természetes számok

**ℕ**: A természetes számok halmaza.

**ℕ** = {1, 2, 3, …}

Az 1-től indulva minden következő egész egy természetes szám: a következőt mindig 1 hozzáadásával kapjuk. Ezek a számláló számok — azok, amelyekkel diszkrét tárgyakat számolunk (egy alma, két alma, három alma, …).

Egyes szerzők a 0-t is beleveszik ℕ-be. Ebben a kurzusban ℕ az 1-től indul.

$$
\mathbb{N} =
\begin{cases}
1 \in \mathbb{N},\\[6pt]
\text{Ha } n \in \mathbb{N}, \text{ akkor } S(n) \in \mathbb{N},
\end{cases}
$$

$$
\text{ahol } S(n)=n+1.
$$

## Egészek

**ℤ**: Az egészek halmaza.

**ℤ** = {…, −2, −1, 0, 1, 2, …}

Az egészek kiterjesztik a természetes számokat a nullával és a negatívokkal. Minden egész vagy természetes szám, vagy nulla, vagy egy természetes szám ellentettje.

$$
\text{Minden } z \in \mathbb{Z} \text{ esetén} \quad
z =
\begin{cases}
n,  & \text{valamely } n \in \mathbb{N} \text{ mellett},\\
0,  & \\
-n, & \text{valamely } n \in \mathbb{N} \text{ mellett}.
\end{cases}
$$

## Racionális számok

**ℚ**: A racionális számok halmaza.

**ℚ** = {…, −2, −1, −1/2, 0, 1/2, 1, 3/2, 2, …}

A racionális szám két egész hányadosa (aránya) — például 1/2, −3/4, vagy 7 (= 7/1). Minden egész racionális, mivel nevezőként 1-gyel írható.

A nevező nem lehet nulla: a nullával való osztás nincs értelmezve.

$$
\mathbb{Q} = \left\{ \frac{p}{q} : p \in \mathbb{Z},\ q \in \mathbb{N} \right\}.
$$

## Valós számok

**ℝ**: A valós számok halmaza.

**ℝ** = {…, −2, −√2, −1, 0, 1/2, 1, √2, e, π, …}

A valós számok alkotják a teljes számegyenest. Tartalmazzák az összes racionálist, és irracionálisokat is, mint √2 és π, amelyek nem írhatók fel egészek arányaként.

ℕ-nel, ℤ-vel, ℚ-val vagy ℂ-vel ellentétben a valósakat nem egyszerűbb darabok képletté kombinálásával építjük. Inkább közös tulajdonságaik vannak: valósakat összeadhatunk, kivonhatunk, szorozhatunk és oszthatunk (nullával nem), és az eredmény ismét valós. Bármely két valós között végtelen sok másik van; nincs egyszerű „lista” az összesről.

$$
\begin{align*}
&\text{Minden } a, b \in \mathbb{R} \text{ esetén}:\\
&a + b,\ a - b,\ a \cdot b \in \mathbb{R},\\
&\text{és ha } b \neq 0, \text{ akkor } \tfrac{a}{b} \in \mathbb{R}.
\end{align*}
$$

## Komplex számok

**ℂ**: A komplex számok halmaza.

**ℂ** = {…, −1, 0, 1, i, 1+i, 2−3i, …}

Egy komplex számnak van valós és képzetes része. Itt i a képzetes egység, amelyet i² = −1 definiál. Minden valós x egy komplex szám nulla képzetes résszel: x = x + 0i.

Az a + bi írásmód egyelőre nem jelenti a hétköznapi értelemben vett „a és bi összeadását”, amíg ℂ aritmetikáját nem vezetjük be; most kezeljük az a + bi-t két valós számból összerakott párként.

$$
\mathbb{C} = \{ a + bi : a, b \in \mathbb{R} \},
\quad\text{ahol } i^{2} = -1.
$$

## Tagság

**∈** / **∉**: Eleme / nem eleme egy halmaznak.

−3 ∉ ℕ, 1/2 ∉ ℤ, √2 ∉ ℚ, i ∉ ℝ, 1 + i ∈ ℂ.

Azt írjuk, hogy x ∈ A, ha x eleme az A halmaznak, és x ∉ A, ha nem. A tagság igen/nem kérdés: benne van-e ez a dolog abban a halmazban?

- −3 ∉ ℕ — itt a természetesek 1-től indulnak, tehát a negatívok ki vannak zárva.
- 1/2 ∉ ℤ — a fél nem egész szám.
- √2 ∉ ℚ — irracionális.
- i ∉ ℝ — tisztán képzetes.
- 1 + i ∈ ℂ — a + bi alakú, ahol a = 1, b = 1.

$$
x \in A \iff x \text{ eleme } A\text{-nak};
\qquad
x \notin A \iff x \text{ nem eleme } A\text{-nak}.
$$

## Tartalmazás

**⊂**: Részhalmaza (benne van).

**ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ**

Ezek a számrendszerek egymásba ágyazódnak: minden természetes egész; minden egész racionális; minden racionális valós; minden valós komplex szám nulla képzetes résszel.

Azt írjuk, hogy A ⊂ B, ha A minden eleme B-nek is eleme. A tartalmazás két halmazt hasonlít össze; a tagság egy elemet egy halmazzal.

$$
A \subset B \iff \text{minden } x \in A \text{ egyben } B\text{-ben is van}.
$$

## Descartes-szorzatok

**×**: Halmazok Descartes-szorzata.

**ℕ × ℕ** = {(1,1), (1,2), (2,1), (3,5), …}

**ℝ² = ℝ × ℝ** = {(0,0), (1,2), (−3, 1/2), (π, √2), …}

Egy A halmazra az A × A Descartes-szorzat azoknak a (x, y) rendezett pároknak a halmaza, amelyek mindkét koordinátája A-ból való. Speciálisan ℝ² a valós rendezett párok halmaza — az euklideszi sík.

A sorrend számít: (1, 2) és (2, 1) különböző párok.

Mivel ℕ ⊂ ℝ, minden természetes pár egyben valós pár is, tehát ℕ × ℕ ⊂ ℝ × ℝ. Ugyanez az ötlet adja: ℤ × ℤ ⊂ ℚ × ℚ ⊂ ℝ × ℝ.

Párok halmazaként ℂ és ℝ × ℝ hasonlít: az a + bi megfelel az (a, b) párnak. A finom különbség a kezelésükben van — ℝ × ℝ csak rendezett párok a síkon, míg ℂ ugyanezeket a párokat számokként használja, amelyeket az i² = −1 szabállyal lehet szorozni.

$$
A \times A = \{ (x, y) : x \in A,\ y \in A \},
\qquad
\mathbb{R}^{2} = \mathbb{R} \times \mathbb{R}.
$$
