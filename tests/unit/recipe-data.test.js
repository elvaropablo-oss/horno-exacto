import test from 'node:test';
import assert from 'node:assert/strict';
import { recipes, recipeById } from '../../src/js/data/recipes.js';

test('recipe catalog has stable unique ids and enough variety', () => {
  assert.ok(recipes.length >= 12);
  const ids = recipes.map((recipe) => recipe.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(new Set(recipes.map((recipe) => recipe.category)).size >= 3);
});

test('every recipe is scalable and has complete base data', () => {
  for (const recipe of recipes) {
    assert.match(recipe.id, /^[a-z0-9-]+$/);
    assert.ok(recipe.title.length > 0);
    assert.ok(Number.isInteger(recipe.servings) && recipe.servings > 0);
    assert.ok(Number.isFinite(recipe.minutes) && recipe.minutes > 0);
    assert.ok(Number.isFinite(recipe.temperature) && recipe.temperature > 0);
    assert.ok(recipe.ingredients.length >= 4);
    assert.ok(recipe.steps.length >= 3);
    assert.ok(recipe.equipment.length >= 1);
    for (const ingredient of recipe.ingredients) {
      assert.equal(ingredient.length, 3);
      assert.ok(Number.isFinite(ingredient[0]) && ingredient[0] > 0);
      assert.ok(String(ingredient[1]).length > 0);
      assert.ok(String(ingredient[2]).length > 0);
    }
  }
});

test('recipeById resolves known recipes and rejects unknown ids', () => {
  assert.equal(recipeById('bizcocho-yogur')?.title, 'Bizcocho de yogur');
  assert.equal(recipeById('does-not-exist'), null);
});
