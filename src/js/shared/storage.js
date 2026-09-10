const PROJECT_KEY = 'he:v1:project';
const DRAFT_FACTOR_KEY = 'he:v1:draftFactor';

export function saveProject(project) {
  const data = { version: 1, savedAt: new Date().toISOString(), ...project };
  try {
    localStorage.setItem(PROJECT_KEY, JSON.stringify(data));
  } catch {
    Object.defineProperty(data, 'storageWarning', { value: true });
  }
  return data;
}

export function loadProject() {
  try {
    const value = JSON.parse(localStorage.getItem(PROJECT_KEY) || 'null');
    return validateProject(value);
  } catch {
    return null;
  }
}

export function importProject(value) {
  const project = validateProject(value);
  localStorage.setItem(PROJECT_KEY, JSON.stringify(project));
  return project;
}

export function validateProject(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value) || value.version !== 1) {
    throw new TypeError('El archivo no es un proyecto compatible de HornoExacto.');
  }
  if (!['scaled', 'baker'].includes(value.type) || typeof value.title !== 'string' || value.title.length > 100) {
    throw new TypeError('El proyecto contiene un tipo o título no válido.');
  }
  if (!Array.isArray(value.ingredients) || value.ingredients.length < 1 || value.ingredients.length > 200) {
    throw new TypeError('El proyecto debe contener entre 1 y 200 ingredientes.');
  }
  const ingredients = value.ingredients.map((item) => {
    if (!item || typeof item !== 'object' || typeof item.name !== 'string' || typeof item.unit !== 'string') {
      throw new TypeError('Hay un ingrediente incompleto en el archivo.');
    }
    const name = item.name.trim();
    const unit = item.unit.trim();
    const pending = item.quantity == null && item.note === 'al gusto';
    const quantity = pending ? null : Number(item.quantity);
    if (!name || name.length > 120 || unit.length > 30 || (!pending && (!unit || !Number.isFinite(quantity) || quantity <= 0))) {
      throw new TypeError('Hay un ingrediente con datos no válidos en el archivo.');
    }
    const ingredient = { name, unit, quantity };
    if (pending) ingredient.note = 'al gusto';
    const percent = Number(item.percent);
    if (item.percent != null && Number.isFinite(percent) && percent > 0) ingredient.percent = percent;
    return ingredient;
  });
  const project = {
    version: 1,
    type: value.type,
    title: value.title.trim() || (value.type === 'baker' ? 'Fórmula panadera' : 'Receta escalada'),
    savedAt: validDate(value.savedAt) ? value.savedAt : new Date().toISOString(),
    ingredients
  };
  if (value.type === 'scaled') {
    const factor = Number(value.factor);
    if (!Number.isFinite(factor) || factor <= 0 || factor >= 1_000_000) throw new TypeError('El factor guardado no es válido.');
    project.factor = factor;
  }
  if (value.type === 'baker') {
    const total = Number(value.total);
    const perPiece = Number(value.perPiece);
    const pieces = Number(value.pieces);
    if (![total, perPiece, pieces].every((number) => Number.isFinite(number) && number > 0)) {
      throw new TypeError('Los totales de la fórmula no son válidos.');
    }
    project.total = total;
    project.perPiece = perPiece;
    project.pieces = pieces;
  }
  return project;
}

function validDate(value) {
  return typeof value === 'string' && Number.isFinite(Date.parse(value));
}

export function deleteProject() {
  try { localStorage.removeItem(PROJECT_KEY); return true; } catch { return false; }
}

export function saveDraftFactor(factor) {
  try { localStorage.setItem(DRAFT_FACTOR_KEY, String(factor)); return true; } catch { return false; }
}

export function loadDraftFactor() {
  try {
    const value = Number(localStorage.getItem(DRAFT_FACTOR_KEY));
    return Number.isFinite(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
}
