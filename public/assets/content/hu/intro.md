# Bevezetés

Rendben van, ha eleinte néhány rész homályosnak tűnik. Olvass annyit, amennyit tudsz; a későbbi szakaszok ugyanazokra az ötletekre térnek vissza több részlettel.

## Fermat utolsó tétele

**FLT**: Fermat utolsó tétele (Fermat's Last Theorem).

**aⁿ + bⁿ = cⁿ** — pozitív egész a, b, c és egész n kitevő mellett.

Az n = 1 esetben sok megoldás van (például 3¹ + 4¹ = 7¹). Az n = 2 esetben is vannak (például 3² + 4² = 5²). Az állítás az, hogy ha n egész szám és nagyobb mint 2, akkor **nincs** olyan pozitív egész a, b, c, amely kielégítené az egyenletet.

Köznyelven: egy tökéletes hatványt nem lehet két ugyanolyan kitevőjű hatvány összegére bontani, ha a kitevő három vagy annál nagyobb.

A modern bizonyítás nem marad meg a kizárólag elemi számelméletben. Eszközök láncát építi fel — számrendszerek és jelölés, algebra, elliptikus görbék, moduláris formák és a modularitási tétel —, majd ezeket újra összehozza.

$$
\text{There are no positive integers } a, b, c \text{ and integer } n > 2
\text{ such that } a^{n} + b^{n} = c^{n}.
$$

## Miért érdekelhet

Ha a kitevő **2**, az a² + b² = c² egyenlet a Pitagorasz-tétel: derékszögű háromszög oldalhosszai, vagy két síkbeli pont közötti egyenes távolság. Mérnökök, fizikusok, számítógépes grafikusok és bárki, aki térbeli hosszt mér, folyamatosan erre támaszkodik.

Ha a kitevő **3**, képzeld el a teret apró **egységkockákból** (1×1×1 blokkok), mint játékbeli voxel vagy cukorkocka. Egy c egész oldalhosszú nagy kocka ekkor pontosan c × c × c = c³ egységkockából áll. Két kisebb, a és b egész oldalhosszú kocka a³ és b³ egységkockát használ. Az a³ + b³ = c³ kérdés azt kérdezi: össze lehet-e rakni a nagy kockát kitöltő egységkockákat pontosan két kisebb kockává — továbbra is egész oldalhosszal, anélkül hogy egy egységkockát félbevágunk? A tétel szerint soha. Ez a diszkrét, „számold a blokkokat” szemlélet akkor jelenik meg, amikor pakolunk, burkolunk vagy diszkretizáljuk a világot.

Ez a minta — egészekre vonatkozó egyenletek, távolságok, térfogatok és magasabb hatványok — sok tudományos munka alatt van. Az anyagszerkezet és a kristályrács azzal törődik, hogyan illeszkednek diszkrét darabok a térben. A statisztika és az adattudomány távolságokra, normákra és négyzetes hibákra támaszkodik (az n = 2 eset közeli rokonai). A kriptográfia, a kódelmélet és a fizika egyes részei ugyanazt az algebrai eszköztárat használják, amelyet ez az előadás épít: számrendszerek, moduláris aritmetika, görbék és struktúrák közötti leképezések.

Maga Fermat utolsó tétele tiszta létezési állítás. A bizonyítását azért érdemes tanulni, mert a rendezéséhez szükséges **eszközök** a modern matematika közös nyelvének részévé váltak — és ez a nyelv akkor is eljut a tudományokba, ha magának a tételnek a szövege nem.

## Hogyan használd ezeket a jegyzeteket

Az alkalmazás minden szakasza a videó egy szakaszához igazodik. Nézd meg a klipet, olvasd a jegyzeteket, ha több részletet szeretnél, és próbáld ki a rövid, nyitott jegyzetes ellenőrzést, ha készen állsz. Ha valami nem világos, maradj a jegyzeteknél vagy nézd újra a részt, mielőtt továbblépnél — a zavar itt normális, nem stop tábla.
