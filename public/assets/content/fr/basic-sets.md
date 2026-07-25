# Ensembles de nombres usuels

Nous utiliserons les systèmes de nombres standards suivants tout au long de ce matériel.

Ne vous inquiétez pas si vous ne comprenez pas encore certaines notations.

## Nombres naturels

**ℕ** : L'ensemble des nombres naturels.

**ℕ** = {1, 2, 3, …}

En partant de 1, chaque entier suivant est un nombre naturel : le suivant s'obtient toujours en ajoutant 1. Ce sont les nombres pour compter — ceux que l'on utilise pour dénombrer des objets discrets (une pomme, deux pommes, trois pommes, …).

Certains auteurs incluent 0 dans ℕ. Dans ce cours, nous prenons ℕ à partir de 1.

$$
\mathbb{N} =
\begin{cases}
1 \in \mathbb{N},\\[6pt]
\text{Si } n \in \mathbb{N}, \text{ alors } S(n) \in \mathbb{N},
\end{cases}
$$

$$
\text{où } S(n)=n+1.
$$

## Entiers

**ℤ** : L'ensemble des entiers.

**ℤ** = {…, −2, −1, 0, 1, 2, …}

Les entiers prolongent les naturels en y ajoutant zéro et les négatifs. Tout entier est un naturel, zéro, ou l'opposé d'un naturel.

$$
\text{Pour tout } z \in \mathbb{Z}, \quad
z =
\begin{cases}
n,  & \text{pour un certain } n \in \mathbb{N},\\
0,  & \\
-n, & \text{pour un certain } n \in \mathbb{N}.
\end{cases}
$$

## Nombres rationnels

**ℚ** : L'ensemble des nombres rationnels.

**ℚ** = {…, −2, −1, −1/2, 0, 1/2, 1, 3/2, 2, …}

Un nombre rationnel est un quotient (un rapport) de deux entiers — par exemple 1/2, −3/4, ou 7 (= 7/1). Tout entier est rationnel, car on peut l'écrire avec le dénominateur 1.

Le dénominateur ne peut pas être zéro : la division par zéro n'est pas définie.

$$
\mathbb{Q} = \left\{ \frac{p}{q} : p \in \mathbb{Z},\ q \in \mathbb{N} \right\}.
$$

## Nombres réels

**ℝ** : L'ensemble des nombres réels.

**ℝ** = {…, −2, −√2, −1, 0, 1/2, 1, √2, e, π, …}

Les réels forment toute la droite numérique. Ils contiennent tous les rationnels, et aussi des irrationnels comme √2 et π, qui ne s'écrivent pas comme un rapport d'entiers.

Contrairement à ℕ, ℤ, ℚ ou ℂ, les réels ne sont pas construits en combinant des morceaux plus simples dans une formule. Ils partagent plutôt des propriétés : on peut additionner, soustraire, multiplier et diviser des réels (sauf par zéro) et le résultat est encore un réel. Entre deux réels quelconques, il y en a une infinité d'autres ; il n'existe pas de « liste » simple de tous les réels.

$$
\begin{align*}
&\text{Pour tous } a, b \in \mathbb{R}:\\
&a + b,\ a - b,\ a \cdot b \in \mathbb{R},\\
&\text{et si } b \neq 0, \text{ alors } \tfrac{a}{b} \in \mathbb{R}.
\end{align*}
$$

## Nombres complexes

**ℂ** : L'ensemble des nombres complexes.

**ℂ** = {…, −1, 0, 1, i, 1+i, 2−3i, …}

Un nombre complexe a une partie réelle et une partie imaginaire. Ici i est l'unité imaginaire, définie par i² = −1. Tout réel x est un complexe de partie imaginaire nulle : x = x + 0i.

Écrire a + bi ne signifie pas encore « additionner a et bi » au sens usuel tant que l'arithmétique sur ℂ n'est pas définie ; pour l'instant, traitez a + bi comme une paire de réels emballée ensemble.

$$
\mathbb{C} = \{ a + bi : a, b \in \mathbb{R} \},
\quad\text{où } i^{2} = -1.
$$

## Appartenance

**∈** / **∉** : Appartient à / n'appartient pas à un ensemble.

−3 ∉ ℕ, 1/2 ∉ ℤ, √2 ∉ ℚ, i ∉ ℝ, 1 + i ∈ ℂ.

On écrit x ∈ A lorsque x est un élément de l'ensemble A, et x ∉ A lorsqu'il ne l'est pas. L'appartenance pose une question oui/non : cet objet est-il dans cet ensemble ?

- −3 ∉ ℕ — ici les naturels commencent à 1, donc les négatifs sont exclus.
- 1/2 ∉ ℤ — la moitié n'est pas un entier.
- √2 ∉ ℚ — c'est un irrationnel.
- i ∉ ℝ — c'est purement imaginaire.
- 1 + i ∈ ℂ — c'est de la forme a + bi avec a = 1, b = 1.

$$
x \in A \iff x \text{ est un élément de } A;
\qquad
x \notin A \iff x \text{ n'est pas un élément de } A.
$$

## Inclusion

**⊂** : Est un sous-ensemble de (est contenu dans).

**ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ**

Ces systèmes de nombres s'emboîtent : tout naturel est un entier ; tout entier est rationnel ; tout rationnel est réel ; tout réel est un complexe de partie imaginaire nulle.

On écrit A ⊂ B lorsque tout élément de A est aussi élément de B. L'inclusion compare deux ensembles ; l'appartenance compare un élément à un ensemble.

$$
A \subset B \iff \text{tout } x \in A \text{ est aussi dans } B.
$$

## Produits cartésiens

**×** : Le produit cartésien d'ensembles.

**ℕ × ℕ** = {(1,1), (1,2), (2,1), (3,5), …}

**ℝ² = ℝ × ℝ** = {(0,0), (1,2), (−3, 1/2), (π, √2), …}

Pour un ensemble A, le produit cartésien A × A est l'ensemble des paires ordonnées (x, y) dont les deux coordonnées sont prises dans A. En particulier, ℝ² est l'ensemble des paires ordonnées de réels — le plan euclidien.

L'ordre compte : (1, 2) et (2, 1) sont des paires différentes.

Comme ℕ ⊂ ℝ, toute paire de naturels est aussi une paire de réels, donc ℕ × ℕ ⊂ ℝ × ℝ. La même idée donne ℤ × ℤ ⊂ ℚ × ℚ ⊂ ℝ × ℝ.

En tant qu'ensembles de paires, ℂ et ℝ × ℝ se ressemblent : a + bi correspond à la paire (a, b). La différence subtile est le traitement — ℝ × ℝ n'est que des paires ordonnées dans le plan, tandis que ℂ utilise les mêmes paires comme des nombres que l'on peut multiplier avec la règle i² = −1.

$$
A \times A = \{ (x, y) : x \in A,\ y \in A \},
\qquad
\mathbb{R}^{2} = \mathbb{R} \times \mathbb{R}.
$$
