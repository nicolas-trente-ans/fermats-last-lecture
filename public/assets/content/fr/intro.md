# Introduction

Il est normal que certaines parties paraissent floues au début. Lisez ce que vous pouvez ; les sections suivantes reviendront sur les mêmes idées avec plus de détail.

## Dernier théorème de Fermat

**DLF** : le dernier théorème de Fermat (souvent abrégé FLT en anglais).

**aⁿ + bⁿ = cⁿ** — pour des entiers positifs a, b, c et un exposant entier n.

Pour n = 1 il y a de nombreuses solutions (par exemple 3¹ + 4¹ = 7¹). Pour n = 2 il y en a aussi (par exemple 3² + 4² = 5²). L'affirmation est que lorsque n est un entier strictement plus grand que 2, **aucun** triplet d'entiers positifs a, b, c ne vérifie l'équation.

En français courant : on ne peut pas découper une puissance parfaite en somme de deux puissances semblables dès que l'exposant vaut trois ou plus.

La preuve moderne ne reste pas dans la seule théorie élémentaire des nombres. Elle construit une chaîne d'outils — systèmes de nombres et notation, algèbre, courbes elliptiques, formes modulaires et théorème de modularité — puis les rassemble.

$$
\text{There are no positive integers } a, b, c \text{ and integer } n > 2
\text{ such that } a^{n} + b^{n} = c^{n}.
$$

## Pourquoi cela peut vous intéresser

Quand l'exposant vaut **2**, l'équation a² + b² = c² est le théorème de Pythagore : les longueurs des côtés d'un triangle rectangle, ou la distance en ligne droite entre deux points du plan. Ingénieurs, physiciens, infographistes, et quiconque mesure une longueur dans l'espace s'appuient constamment sur ce fait.

Quand l'exposant vaut **3**, imaginez l'espace construit à partir de tout petits **cubes unitaires** (blocs 1×1×1), comme des voxels de jeu ou des cubes de sucre. Un grand cube de côté entier c est alors un assemblage d'exactement c × c × c = c³ cubes unitaires. Deux plus petits cubes de côtés entiers a et b en utilisent a³ et b³. Demander si a³ + b³ = c³, c'est demander : peut-on prendre les cubes unitaires qui remplissent le grand cube et les réempiler en exactement deux plus petits cubes — toujours à côtés entiers, sans couper un cube unitaire en deux ? Le théorème dit que non, jamais. Cette mentalité discrète, « compter les blocs », apparaît dès que l'on empile, pavise ou discrétise le monde.

Ce motif — équations en nombres entiers, distances, volumes et puissances plus élevées — sous-tend une grande part du travail scientifique. La conception des matériaux et la structure des cristaux s'intéressent à la façon dont des pièces discrètes s'emboîtent dans l'espace. La statistique et la science des données s'appuient sur distances, normes et erreurs au carré (proches du cas n = 2). La cryptographie, la théorie des codes et une partie de la physique réutilisent la même boîte à outils algébrique que ce cours construit : systèmes de nombres, arithmétique modulaire, courbes et applications entre structures.

Le dernier théorème de Fermat lui-même est une affirmation d'existence pure. La raison d'étudier sa preuve, c'est que les **outils** nécessaires pour la trancher sont devenus un langage partagé des mathématiques modernes — et que ce langage voyage dans les sciences même lorsque l'énoncé du théorème n'y apparaît pas.

## Comment utiliser ces notes

Chaque section de ce compagnon correspond à un passage de la vidéo. Regardez le clip, lisez les notes pour plus de détail, et tentez le court contrôle à notes ouvertes quand vous êtes prêt. Si quelque chose n'est pas clair, restez dans les notes ou revoyez la vidéo avant de continuer — la confusion ici est normale, pas un panneau stop.
