const {
  normalizeRecipePayload,
} = require('../controllers/recipe.controller')

describe('recipe controller validation', () => {
  test('normalizeRecipePayload accepts a valid menu item', () => {
    expect(normalizeRecipePayload({
      itemCode: 'A1',
      displayName: 'Satay Beef',
      price: 42,
      category: 'Rice',
      imgSrcUrl: '',
      additionalCost: [],
      options: [],
    })).toEqual(expect.objectContaining({
      itemCode: 'A1',
      displayName: 'Satay Beef',
      price: 42,
      category: 'Rice',
    }))
  })

  test('normalizeRecipePayload rejects missing displayName', () => {
    expect(() => normalizeRecipePayload({
      itemCode: 'A1',
      price: 42,
      category: 'Rice',
    })).toThrow('displayName is required')
  })

  test('normalizeRecipePayload rejects invalid price', () => {
    expect(() => normalizeRecipePayload({
      itemCode: 'A1',
      displayName: 'Satay Beef',
      price: -1,
      category: 'Rice',
    })).toThrow('price must be a non-negative number')
  })

  test('normalizeRecipePayload rejects unknown fields', () => {
    expect(() => normalizeRecipePayload({
      itemCode: 'A1',
      displayName: 'Satay Beef',
      price: 42,
      category: 'Rice',
      admin: true,
    })).toThrow('The key (admin) is not allowed')
  })
})
