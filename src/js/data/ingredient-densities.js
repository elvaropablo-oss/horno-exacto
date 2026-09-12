export const ingredientDensities = [
  { id: 'water', name: 'Agua', density: 1.0, note: 'Referencia culinaria aproximada.' },
  { id: 'whole-milk', name: 'Leche entera', density: 1.031, note: 'Valor de referencia; puede variar ligeramente por composición y temperatura.' },
  { id: 'natural-yogurt', name: 'Yogur natural', density: 1.031, note: 'Valor de referencia para yogur natural; cambia según formulación.' },
  { id: 'olive-oil', name: 'Aceite de oliva', density: 0.91, note: 'Valor orientativo dentro del rango habitual de aceites comestibles.' },
  { id: 'vegetable-oil', name: 'Aceite vegetal', density: 0.92, note: 'Valor culinario orientativo; depende del tipo de aceite.' },
  { id: 'honey', name: 'Miel', density: 1.42, note: 'Valor culinario típico; la humedad de la miel puede modificarlo.' },
  { id: 'granulated-sugar', name: 'Azúcar blanco granulado', density: 0.85, note: 'Densidad aparente: cambia según tamaño de grano y compactación.' },
  { id: 'flour', name: 'Harina de trigo, cucharada sin compactar', density: 0.53, note: 'Densidad aparente muy sensible a cómo se llena el recipiente; para precisión, pesa la harina.' },
  { id: 'cocoa', name: 'Cacao en polvo', density: 0.4, note: 'Densidad aparente orientativa; varía bastante con la compactación.' }
];

export const densitySource = {
  name: 'FAO/INFOODS Density Database v2 y referencias culinarias derivadas de pesos por volumen',
  url: 'https://www.fao.org/4/ap815e/ap815e.pdf'
};

export function densityById(id) {
  return ingredientDensities.find((item) => item.id === id) || null;
}
