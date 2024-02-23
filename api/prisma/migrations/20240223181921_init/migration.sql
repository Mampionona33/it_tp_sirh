-- CreateTable
CREATE TABLE "Cotisations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "libelle" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "employeur" REAL NOT NULL,
    "salarie" REAL NOT NULL,
    "modeDePayement" TEXT NOT NULL
);
