import test from 'node:test';
import assert from 'node:assert/strict';
import { gramsToMl, mlToGrams, formatDensity } from '../../src/js/math/density.js';
import { ingredientDensities, densityById } from '../../src/js/data/ingredient-densities.js';

test('the displayed density preserves the value used, rather than rounding to 0.92 or zero', () => {
  assert.equal(formatDensity(densityById('olive-oil').density), '0,918');
  assert.equal(formatDensity(0.004), '0,004');
  assert.equal(formatDensity(1.234567), '1,234567');
  assert.equal(formatDensity(1), '1');
});

test('water converts 100 g to 100 ml', () => {
  assert.equal(gramsToMl(100, densityById('water').density), 100);
});

test('oil uses its own density instead of assuming 1 g = 1 ml', () => {
  const density = densityById('olive-oil').density;
  assert.ok(Math.abs(gramsToMl(91.8, density) - 100) < 1e-9);
  assert.ok(Math.abs(mlToGrams(100, density) - 91.8) < 1e-9);
});

test('invalid densities and negative amounts are rejected', () => {
  assert.equal(gramsToMl(100, 0), null);
  assert.equal(mlToGrams(-1, 1), null);
  assert.equal(gramsToMl('x', 1), null);
});

test('density catalog has unique ids and positive values', () => {
  const ids = ingredientDensities.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ingredientDensities.length >= 8);
  for (const item of ingredientDensities) {
    assert.ok(item.name.length > 0);
    assert.ok(Number.isFinite(item.density) && item.density > 0);
    assert.ok(item.note.length > 0);
  }
});
