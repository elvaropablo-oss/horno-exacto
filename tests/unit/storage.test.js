import test from 'node:test';
import assert from 'node:assert/strict';
import { saveProject, validateProject } from '../../src/js/shared/storage.js';

test('valida una receta exportada y conserva solo campos admitidos', () => {
  const result = validateProject({
    version: 1,
    type: 'scaled',
    title: 'Bizcocho',
    savedAt: '2026-09-10T10:00:00.000Z',
    factor: 1.44,
    ingredients: [{ name: ' Harina ', quantity: 360, unit: ' g ', ignored: '<script>' }],
    ignored: 'dato ajeno'
  });
  assert.deepEqual(result.ingredients, [{ name: 'Harina', quantity: 360, unit: 'g' }]);
  assert.equal(result.factor, 1.44);
  assert.equal('ignored' in result, false);
});

test('rechaza JSON incompatible o peligroso', () => {
  assert.throws(() => validateProject(null));
  assert.throws(() => validateProject({ version: 2 }));
  assert.throws(() => validateProject({ version: 1, type: 'scaled', title: 'x', factor: 1, ingredients: [] }));
  assert.throws(() => validateProject({ version: 1, type: 'scaled', title: 'x', factor: Infinity, ingredients: [{ name: 'a', unit: 'g', quantity: 1 }] }));
  assert.throws(() => validateProject({ version: 1, type: 'scaled', title: 'x', factor: 1, ingredients: [{ name: '<img>', unit: '', quantity: -2 }] }));
});

test('valida los totales de una fórmula panadera', () => {
  const result = validateProject({
    version: 1,
    type: 'baker',
    title: 'Pan',
    savedAt: 'fecha rota',
    ingredients: [{ name: 'Harina', unit: 'g', quantity: 1000 }],
    total: 1680,
    perPiece: 420,
    pieces: 4
  });
  assert.equal(result.total, 1680);
  assert.ok(Number.isFinite(Date.parse(result.savedAt)));
});

test('un fallo de almacenamiento no bloquea el resultado ni contamina el JSON', () => {
  globalThis.localStorage = { setItem() { throw new Error('quota'); } };
  const project = saveProject({
    type: 'scaled', title: 'Prueba', factor: 2,
    ingredients: [{ name: 'Harina', unit: 'g', quantity: 500 }]
  });
  assert.equal(project.storageWarning, true);
  assert.equal(JSON.stringify(project).includes('storageWarning'), false);
  delete globalThis.localStorage;
});
