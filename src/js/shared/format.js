export const decimal = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 });

export function formatAmount(value) {
  if (!Number.isFinite(value)) return '—';
  return decimal.format(value);
}

export function readNumber(form, name, label) {
  const input = form.elements.namedItem(name);
  const value = Number(String(input?.value ?? '').replace(',', '.'));
  if (!Number.isFinite(value) || value <= 0) throw new RangeError(`${label} debe ser mayor que 0.`);
  return value;
}

export function announceError(element, error) {
  element.hidden = false;
  element.textContent = error instanceof Error ? error.message : 'No se pudo completar el cálculo.';
  element.focus();
}

export function clearError(element) {
  element.hidden = true;
  element.textContent = '';
}
