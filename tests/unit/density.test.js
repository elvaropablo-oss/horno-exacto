import test from 'node:test';
import assert from 'node:assert/strict';
import { gramsToMl, mlToGrams } from '../../src/js/math/density.js';
import { ingredientDensities, densityById } from '../../src/js/data/ingredient-densities.js';

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
