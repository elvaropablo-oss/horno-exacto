import test from 'node:test';
import assert from 'node:assert/strict';
import { bakerFromFlour, bakerFromTotal, bakerFromWeights, panArea, panFactor, parseQuantity, scaleIngredients } from '../../src/js/math/oven-math.js';

test('calcula áreas de las tres formas permitidas', () => {
  assert.ok(Math.abs(panArea('round', { diameter: 20 }) - Math.PI * 100) < 1e-10);
  assert.equal(panArea('square', { side: 20 }), 400);
  assert.equal(panArea('rectangle', { width: 20, length: 30 }), 600);
});

test('adapta un molde circular de 20 a 24 cm', () => {
  assert.ok(Math.abs(panFactor({ shape: 'round', diameter: 20 }, { shape: 'round', diameter: 24 }) - 1.44) < 1e-10);
});

test('incluye altura y número de moldes', () => {
  assert.equal(panFactor(
    { shape: 'rectangle', width: 20, length: 30, height: 4, count: 1 },
    { shape: 'rectangle', width: 30, length: 40, height: 4, count: 1 }
  ), 2);
});

test('escala ingredientes sin mutar la base', () => {
  const base = [{ name: 'Harina', quantity: 250, unit: 'g' }];
  const result = scaleIngredients(base, 1.44);
  assert.equal(result[0].quantity, 360);
  assert.equal(base[0].quantity, 250);
});

test('acepta fracciones deterministas', () => {
  assert.equal(parseQuantity('1/2'), 0.5);
  assert.equal(parseQuantity('1 1/2'), 1.5);
  assert.equal(parseQuantity('2,5'), 2.5);
  assert.throws(() => parseQuantity('un poco'));
});

test('porcentaje panadero desde harina', () => {
  const result = bakerFromFlour(
    [{ name: 'Harina', mass: 1000 }],
    [{ name: 'Agua', percent: 65 }, { name: 'Sal', percent: 2 }, { name: 'Levadura', percent: 1 }],
    4
  );
  assert.equal(result.total, 1680);
  assert.equal(result.perPiece, 420);
});

test('porcentaje panadero desde masa total recupera la harina', () => {
  const result = bakerFromTotal(
    1680,
    [{ name: 'Harina', percent: 100 }],
    [{ name: 'Agua', percent: 65 }, { name: 'Sal', percent: 2 }, { name: 'Levadura', percent: 1 }],
    4
  );
  assert.ok(Math.abs(result.flourMass - 1000) < 1e-10);
});

test('calcula porcentajes panaderos desde pesos conocidos', () => {
  const result = bakerFromWeights(
    [{ name: 'Harina', mass: 1000 }],
    [{ name: 'Agua', mass: 650 }, { name: 'Sal', mass: 20 }],
    2
  );
  assert.equal(result.ingredients[0].percent, 65);
  assert.equal(result.ingredients[1].percent, 2);
  assert.equal(result.total, 1670);
  assert.equal(result.perPiece, 835);
});

test('conserva ingredientes al gusto sin multiplicarlos', () => {
  const result = scaleIngredients([{ name: 'Canela', quantity: null, unit: '', note: 'al gusto' }], 2);
  assert.equal(result[0].quantity, null);
  assert.equal(result[0].note, 'al gusto');
});

test('rechaza límites e incoherencias', () => {
  assert.throws(() => panArea('round', { diameter: 0 }));
  assert.throws(() => panArea('heart', { width: 20 }));
  assert.throws(() => bakerFromTotal(1000, [{ name: 'Trigo', percent: 60 }], [{ name: 'Agua', percent: 65 }]));
  assert.throws(() => scaleIngredients([], 1));
});
