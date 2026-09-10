const MAX_INPUT = 1_000_000;

export function finitePositive(value, label = 'valor') {
  const number = typeof value === 'string' ? Number(value.replace(',', '.')) : Number(value);
  if (!Number.isFinite(number) || number <= 0 || number > MAX_INPUT) {
    throw new RangeError(`${label} debe ser mayor que 0 y menor o igual que ${MAX_INPUT}.`);
  }
  return number;
}

export function panArea(shape, dimensions) {
  if (shape === 'round') {
    const diameter = finitePositive(dimensions.diameter, 'El diámetro');
    return Math.PI * diameter ** 2 / 4;
  }
  if (shape === 'square') {
    const side = finitePositive(dimensions.side, 'El lado');
    return side ** 2;
  }
  if (shape === 'rectangle') {
    return finitePositive(dimensions.width, 'El ancho') * finitePositive(dimensions.length, 'El largo');
  }
  throw new TypeError('Forma de molde no admitida.');
}

export function panFactor(origin, destination) {
  const sourceArea = panArea(origin.shape, origin);
  const targetArea = panArea(destination.shape, destination);
  const sourceHeight = finitePositive(origin.height ?? 1, 'La altura de masa original');
  const targetHeight = finitePositive(destination.height ?? sourceHeight, 'La altura de masa final');
  const sourceCount = finitePositive(origin.count ?? 1, 'El número de moldes originales');
  const targetCount = finitePositive(destination.count ?? 1, 'El número de moldes finales');
  return (targetCount * targetArea * targetHeight) / (sourceCount * sourceArea * sourceHeight);
}

export function scaleIngredients(ingredients, factor) {
  const validFactor = finitePositive(factor, 'El factor');
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    throw new TypeError('Añade al menos un ingrediente.');
  }
  return ingredients.map((item) => ({
    ...item,
    quantity: item.quantity == null ? null : finitePositive(item.quantity, `La cantidad de ${item.name || 'ingrediente'}`) * validFactor
  }));
}

export function bakerFromFlour(flours, ingredients, pieces = 1) {
  const flourRows = validateRows(flours, 'harina');
  const ingredientRows = validateRows(ingredients, 'ingrediente');
  const flourMass = flourRows.reduce((sum, row) => sum + finitePositive(row.mass, `La masa de ${row.name}`), 0);
  const rows = ingredientRows.map((row) => ({
    ...row,
    mass: finitePositive(row.percent, `El porcentaje de ${row.name}`) * flourMass / 100
  }));
  const total = flourMass + rows.reduce((sum, row) => sum + row.mass, 0);
  const pieceCount = finitePositive(pieces, 'El número de piezas');
  const floursWithPercent = flourRows.map((row) => ({ ...row, percent: row.mass / flourMass * 100 }));
  return { flourMass, flours: floursWithPercent, ingredients: rows, total, perPiece: total / pieceCount };
}

export function bakerFromTotal(totalMass, flourShares, ingredientPercents, pieces = 1) {
  const total = finitePositive(totalMass, 'La masa total');
  const shares = validateRows(flourShares, 'harina');
  const ingredients = validateRows(ingredientPercents, 'ingrediente');
  const shareSum = shares.reduce((sum, row) => sum + finitePositive(row.percent, `El porcentaje de ${row.name}`), 0);
  if (Math.abs(shareSum - 100) > 0.01) throw new RangeError('El reparto de harinas debe sumar 100 %.');
  const ingredientSum = ingredients.reduce((sum, row) => sum + finitePositive(row.percent, `El porcentaje de ${row.name}`), 0);
  const flourMass = total / (1 + ingredientSum / 100);
  const flours = shares.map((row) => ({ ...row, mass: flourMass * row.percent / 100 }));
  const rows = ingredients.map((row) => ({ ...row, mass: flourMass * row.percent / 100 }));
  const pieceCount = finitePositive(pieces, 'El número de piezas');
  return { flourMass, flours, ingredients: rows, total, perPiece: total / pieceCount };
}

export function bakerFromWeights(flours, ingredients, pieces = 1) {
  const flourRows = validateRows(flours, 'harina').map((row) => ({
    ...row, mass: finitePositive(row.mass, `La masa de ${row.name}`)
  }));
  const ingredientRows = validateRows(ingredients, 'ingrediente').map((row) => ({
    ...row, mass: finitePositive(row.mass, `La masa de ${row.name}`)
  }));
  const flourMass = flourRows.reduce((sum, row) => sum + row.mass, 0);
  const normalizedFlours = flourRows.map((row) => ({ ...row, percent: row.mass / flourMass * 100 }));
  const normalizedIngredients = ingredientRows.map((row) => ({ ...row, percent: row.mass / flourMass * 100 }));
  const total = flourMass + normalizedIngredients.reduce((sum, row) => sum + row.mass, 0);
  const pieceCount = finitePositive(pieces, 'El número de piezas');
  return { flourMass, flours: normalizedFlours, ingredients: normalizedIngredients, total, perPiece: total / pieceCount };
}

export function parseQuantity(raw) {
  const value = String(raw).trim().replace(',', '.');
  if (/^\d+(?:\.\d+)?$/.test(value)) return finitePositive(value, 'La cantidad');
  if (/^\d+\/\d+$/.test(value)) {
    const [numerator, denominator] = value.split('/').map(Number);
    if (denominator === 0) throw new RangeError('Una fracción no puede dividir entre cero.');
    return finitePositive(numerator / denominator, 'La cantidad');
  }
  if (/^\d+\s+\d+\/\d+$/.test(value)) {
    const [whole, fraction] = value.split(/\s+/);
    const [numerator, denominator] = fraction.split('/').map(Number);
    if (denominator === 0) throw new RangeError('Una fracción no puede dividir entre cero.');
    return finitePositive(Number(whole) + numerator / denominator, 'La cantidad');
  }
  throw new TypeError('Cantidad no reconocida. Usa 250, 1/2 o 1 1/2.');
}

function validateRows(rows, kind) {
  if (!Array.isArray(rows) || rows.length === 0) throw new TypeError(`Añade al menos un ${kind}.`);
  return rows.map((row) => {
    const name = String(row.name ?? '').trim();
    if (!name) throw new TypeError(`Cada ${kind} necesita un nombre.`);
    return { ...row, name };
  });
}
