export const recipes = [
  {
    id: 'bizcocho-yogur', title: 'Bizcocho de yogur', category: 'dulce', difficulty: 'fácil', minutes: 50, temperature: 180, servings: 8,
    description: 'Un bizcocho sencillo y neutro para desayunos o meriendas.',
    ingredients: [
      [125, 'g', 'yogur natural'], [210, 'g', 'harina de trigo'], [160, 'g', 'azúcar'], [100, 'ml', 'aceite suave'], [3, 'unidades', 'huevos'], [10, 'g', 'levadura química'], [1, 'g', 'sal']
    ],
    steps: ['Mezcla los ingredientes húmedos.', 'Incorpora los ingredientes secos sin batir en exceso.', 'Pasa la mezcla a un molde preparado.', 'Hornea hasta que el centro esté cocido y deja templar antes de desmoldar.'],
    equipment: ['Molde para bizcocho', 'Báscula de cocina', 'Espátula o lengua de silicona']
  },
  {
    id: 'brownie-chocolate', title: 'Brownie de chocolate', category: 'dulce', difficulty: 'fácil', minutes: 40, temperature: 175, servings: 9,
    description: 'Chocolate intenso y textura densa; ideal si tienes cacao o chocolate para fundir.',
    ingredients: [
      [170, 'g', 'chocolate negro'], [120, 'g', 'mantequilla'], [160, 'g', 'azúcar'], [2, 'unidades', 'huevos'], [75, 'g', 'harina de trigo'], [20, 'g', 'cacao en polvo'], [1, 'g', 'sal']
    ],
    steps: ['Funde chocolate y mantequilla.', 'Mézclalos con el azúcar y los huevos.', 'Añade harina, cacao y sal.', 'Hornea sin secar en exceso el centro y deja enfriar antes de cortar.'],
    equipment: ['Molde cuadrado', 'Báscula de cocina', 'Espátula']
  },
  {
    id: 'cookies-chocolate', title: 'Cookies con chocolate', category: 'dulce', difficulty: 'fácil', minutes: 30, temperature: 180, servings: 12,
    description: 'Galletas rápidas con bordes dorados y centro más tierno.',
    ingredients: [
      [120, 'g', 'mantequilla'], [130, 'g', 'azúcar moreno'], [1, 'unidad', 'huevo'], [190, 'g', 'harina de trigo'], [120, 'g', 'chocolate troceado'], [3, 'g', 'bicarbonato'], [2, 'g', 'sal']
    ],
    steps: ['Mezcla mantequilla y azúcar.', 'Añade el huevo.', 'Incorpora los secos y el chocolate.', 'Forma porciones y hornea hasta que los bordes se doren.'],
    equipment: ['Bandeja de horno', 'Papel de horno o tapete', 'Báscula de cocina']
  },
  {
    id: 'banana-bread', title: 'Banana bread', category: 'dulce', difficulty: 'fácil', minutes: 65, temperature: 175, servings: 8,
    description: 'Una forma práctica de aprovechar plátanos muy maduros.',
    ingredients: [
      [300, 'g', 'plátano maduro'], [200, 'g', 'harina de trigo'], [100, 'g', 'azúcar'], [80, 'g', 'mantequilla'], [2, 'unidades', 'huevos'], [6, 'g', 'levadura química'], [2, 'g', 'canela']
    ],
    steps: ['Tritura el plátano.', 'Mézclalo con huevos y mantequilla.', 'Incorpora los ingredientes secos.', 'Hornea en un molde alargado hasta que el centro esté hecho.'],
    equipment: ['Molde alargado', 'Báscula de cocina', 'Espátula']
  },
  {
    id: 'crumble-manzana', title: 'Crumble de manzana', category: 'dulce', difficulty: 'fácil', minutes: 45, temperature: 190, servings: 6,
    description: 'Manzana horneada con cubierta crujiente; admite pera o frutos rojos.',
    ingredients: [
      [600, 'g', 'manzana'], [100, 'g', 'harina de trigo'], [80, 'g', 'mantequilla'], [80, 'g', 'azúcar'], [40, 'g', 'copos de avena'], [2, 'g', 'canela']
    ],
    steps: ['Corta la fruta y colócala en la fuente.', 'Mezcla harina, avena, azúcar y mantequilla hasta formar migas.', 'Reparte la cobertura.', 'Hornea hasta que la fruta burbujee y la superficie se dore.'],
    equipment: ['Fuente de horno', 'Báscula de cocina']
  },
  {
    id: 'magdalenas-limon', title: 'Magdalenas de limón', category: 'dulce', difficulty: 'fácil', minutes: 35, temperature: 200, servings: 12,
    description: 'Magdalenas cítricas de preparación corta para una hornada rápida.',
    ingredients: [
      [200, 'g', 'harina de trigo'], [150, 'g', 'azúcar'], [3, 'unidades', 'huevos'], [120, 'ml', 'aceite suave'], [80, 'ml', 'leche'], [10, 'g', 'levadura química'], [1, 'unidad', 'limón']
    ],
    steps: ['Bate huevos y azúcar.', 'Añade líquidos y ralladura.', 'Incorpora harina y levadura.', 'Reparte en cápsulas y hornea hasta que se doren.'],
    equipment: ['Molde para magdalenas', 'Cápsulas de papel', 'Báscula de cocina']
  },
  {
    id: 'granola-horno', title: 'Granola al horno', category: 'dulce', difficulty: 'fácil', minutes: 35, temperature: 160, servings: 8,
    description: 'Avena tostada que puedes adaptar con frutos secos y semillas.',
    ingredients: [
      [300, 'g', 'copos de avena'], [80, 'g', 'frutos secos'], [50, 'g', 'semillas'], [60, 'g', 'miel'], [35, 'ml', 'aceite'], [2, 'g', 'canela'], [1, 'g', 'sal']
    ],
    steps: ['Mezcla todos los ingredientes.', 'Extiende la mezcla en una bandeja.', 'Hornea removiendo a mitad de cocción.', 'Deja enfriar por completo antes de guardar.'],
    equipment: ['Bandeja de horno', 'Papel de horno', 'Báscula de cocina']
  },
  {
    id: 'focaccia', title: 'Focaccia básica', category: 'pan', difficulty: 'media', minutes: 90, temperature: 220, servings: 8,
    description: 'Masa hidratada con aceite de oliva, útil para practicar fermentación y horneado.',
    ingredients: [
      [500, 'g', 'harina de trigo'], [375, 'ml', 'agua'], [10, 'g', 'sal'], [5, 'g', 'levadura seca'], [35, 'ml', 'aceite de oliva']
    ],
    steps: ['Mezcla y desarrolla la masa.', 'Deja fermentar hasta que gane volumen.', 'Extiende con aceite y marca la superficie.', 'Hornea a temperatura alta hasta que se dore.'],
    equipment: ['Bandeja o fuente para focaccia', 'Báscula de cocina', 'Rasqueta de masa']
  },
  {
    id: 'panecillos', title: 'Panecillos caseros', category: 'pan', difficulty: 'media', minutes: 90, temperature: 210, servings: 8,
    description: 'Panecillos sencillos para dividir una masa y practicar piezas iguales.',
    ingredients: [
      [500, 'g', 'harina de trigo'], [320, 'ml', 'agua'], [10, 'g', 'sal'], [6, 'g', 'levadura seca'], [15, 'ml', 'aceite de oliva']
    ],
    steps: ['Amasa hasta obtener una masa uniforme.', 'Deja fermentar.', 'Divide en piezas y bolea.', 'Haz una segunda fermentación corta y hornea.'],
    equipment: ['Bandeja de horno', 'Báscula de cocina', 'Rasqueta de masa']
  },
  {
    id: 'pizza-bandeja', title: 'Pizza de bandeja', category: 'pan', difficulty: 'media', minutes: 90, temperature: 240, servings: 4,
    description: 'Masa casera para una bandeja, con cobertura a tu gusto.',
    ingredients: [
      [350, 'g', 'harina de trigo'], [230, 'ml', 'agua'], [7, 'g', 'sal'], [4, 'g', 'levadura seca'], [15, 'ml', 'aceite de oliva'], [180, 'g', 'tomate triturado'], [180, 'g', 'mozzarella']
    ],
    steps: ['Mezcla y fermenta la masa.', 'Estírala en la bandeja.', 'Añade tomate y cobertura.', 'Hornea fuerte hasta que la base y los bordes estén hechos.'],
    equipment: ['Bandeja para pizza', 'Báscula de cocina', 'Rasqueta o espátula']
  },
  {
    id: 'verduras-asadas', title: 'Verduras asadas', category: 'salado', difficulty: 'fácil', minutes: 45, temperature: 210, servings: 4,
    description: 'Una bandeja flexible para aprovechar calabacín, pimiento, cebolla o calabaza.',
    ingredients: [
      [300, 'g', 'calabacín'], [250, 'g', 'pimiento'], [200, 'g', 'cebolla'], [300, 'g', 'calabaza'], [30, 'ml', 'aceite de oliva'], [5, 'g', 'sal']
    ],
    steps: ['Corta las verduras con tamaño parecido.', 'Mézclalas con aceite y sal.', 'Extiéndelas sin amontonar.', 'Hornea y remueve una vez para dorar de forma uniforme.'],
    equipment: ['Bandeja de horno', 'Báscula de cocina']
  },
  {
    id: 'patatas-gajos', title: 'Patatas en gajos', category: 'salado', difficulty: 'fácil', minutes: 50, temperature: 220, servings: 4,
    description: 'Guarnición sencilla con exterior dorado y especias al gusto.',
    ingredients: [
      [800, 'g', 'patata'], [25, 'ml', 'aceite de oliva'], [5, 'g', 'sal'], [3, 'g', 'pimentón'], [2, 'g', 'ajo en polvo']
    ],
    steps: ['Corta las patatas en gajos regulares.', 'Sécalas y mezcla con aceite y especias.', 'Distribuye en una sola capa.', 'Hornea hasta que estén tiernas y doradas.'],
    equipment: ['Bandeja de horno', 'Papel de horno']
  },
  {
    id: 'quiche-verduras', title: 'Quiche de verduras', category: 'salado', difficulty: 'media', minutes: 60, temperature: 185, servings: 6,
    description: 'Tarta salada adaptable a las verduras que tengas en la nevera.',
    ingredients: [
      [1, 'unidad', 'masa quebrada'], [3, 'unidades', 'huevos'], [200, 'ml', 'nata para cocinar'], [150, 'g', 'calabacín'], [120, 'g', 'cebolla'], [100, 'g', 'queso rallado'], [4, 'g', 'sal']
    ],
    steps: ['Prepara la base en el molde.', 'Saltea o escurre bien las verduras húmedas.', 'Mezcla huevos, nata y queso.', 'Rellena y hornea hasta que el centro esté cuajado.'],
    equipment: ['Molde para quiche', 'Báscula de cocina', 'Batidor']
  },
  {
    id: 'tomates-rellenos', title: 'Tomates rellenos al horno', category: 'salado', difficulty: 'fácil', minutes: 40, temperature: 200, servings: 4,
    description: 'Una idea rápida para combinar tomate, arroz cocido y queso.',
    ingredients: [
      [4, 'unidades', 'tomates'], [250, 'g', 'arroz cocido'], [100, 'g', 'queso rallado'], [60, 'g', 'cebolla'], [15, 'ml', 'aceite de oliva'], [4, 'g', 'sal']
    ],
    steps: ['Vacía los tomates.', 'Mezcla el relleno.', 'Rellena y cubre con queso.', 'Hornea hasta que el tomate esté tierno y la superficie se dore.'],
    equipment: ['Fuente de horno', 'Báscula de cocina']
  }
];

export function recipeById(id) {
  return recipes.find((recipe) => recipe.id === id) || null;
}

export function categoryLabel(category) {
  return category === 'pan' ? 'Pan y masas' : category === 'salado' ? 'Salado' : 'Dulce';
}
