export const ingredientDensities = [
  { id: 'water', name: 'Agua', density: 1.0, note: 'FAO/INFOODS publica 1,00 g/ml como referencia para agua.' },
  { id: 'whole-milk', name: 'Leche entera', density: 1.031, note: 'Valor publicado para leche entera; composición y temperatura pueden producir pequeñas variaciones.' },
  { id: 'natural-yogurt', name: 'Yogur natural sin azúcar', density: 1.031, note: 'Valor publicado para yogur natural sin azúcar; cambia según formulación.' },
  { id: 'olive-oil', name: 'Aceite de oliva', density: 0.918, note: 'Valor publicado para aceite vegetal de oliva; otras referencias de la misma base sitúan el aceite de oliva aproximadamente entre 0,91 y 0,92 g/ml.' },
  { id: 'corn-oil', name: 'Aceite de maíz', density: 0.922, note: 'Valor publicado para aceite vegetal de maíz.' },
  { id: 'butter', name: 'Mantequilla', density: 0.911, note: 'Valor de densidad publicado para mantequilla.' },
  { id: 'white-sugar', name: 'Azúcar blanco', density: 0.88, note: 'Densidad aparente publicada para azúcar blanco. El llenado y la compactación pueden modificar el volumen.' },
  { id: 'wheat-flour', name: 'Harina de trigo', density: 0.521, note: 'Densidad aparente publicada para harina de trigo. Es especialmente sensible a la compactación; para precisión, pesa la harina.' },
  { id: 'chocolate-drink-powder', name: 'Chocolate en polvo para bebida', density: 0.525, note: 'Punto medio del rango 0,50–0,55 g/ml publicado por FAO/INFOODS para chocolate en polvo para bebida; no equivale necesariamente a cacao puro.' }
];

export const densitySource = {
  name: 'FAO/INFOODS Density Database v2',
  url: 'https://www.fao.org/4/ap815e/ap815e.pdf'
};

export function densityById(id) {
  return ingredientDensities.find((item) => item.id === id) || null;
}
