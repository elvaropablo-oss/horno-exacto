---
name: HornoExacto
description: Un cuaderno de obrador cálido y preciso para recalcular recetas.
colors:
  tomato-measure: "#d74724"
  tomato-deep: "#a92d15"
  plum-ink: "#241719"
  recipe-paper: "#f2e9dc"
  clean-paper: "#fffaf2"
  flour-shadow: "#e5d7c5"
  pencil-muted: "#6f5b57"
  rule-line: "#c8b7a4"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(3.15rem, 7.8vw, 6rem)"
    fontWeight: 750
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2rem, 4.5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  body:
    fontFamily: "DM Sans, ui-sans-serif, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "DM Sans, ui-sans-serif, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 700
rounded:
  control: "0.4rem"
  action: "0.55rem"
  result: "1rem"
spacing:
  compact: "0.75rem"
  field: "1rem"
  section: "clamp(5rem, 11vw, 9rem)"
components:
  button-primary:
    backgroundColor: "{colors.plum-ink}"
    textColor: "{colors.clean-paper}"
    rounded: "{rounded.action}"
    padding: "0.72rem 1.1rem"
  input:
    backgroundColor: "{colors.clean-paper}"
    textColor: "{colors.plum-ink}"
    rounded: "{rounded.control}"
    padding: "0.72rem 0.8rem"
---

# Design System: HornoExacto

## Overview

**Creative North Star: "El cuaderno de obrador de precisión"**

HornoExacto se siente como una mesa de formulación culinaria: cálida, tangible y exacta. La jerarquía editorial, las marcas de medición y la geometría de los moldes hacen reconocible la herramienta sin competir con el cálculo.

La interfaz evita el aspecto de una plantilla genérica. Usa composición asimétrica, titulares con carácter y superficies que recuerdan al papel de trabajo, con controles claros para usarlos en móvil mientras se cocina.

**Key Characteristics:**

- Papel cálido, tinta oscura y un único acento tomate.
- Titulares editoriales y números tabulares.
- Geometría de moldes como firma visual funcional.
- Formularios sobrios y resultados de alto contraste.

## Colors

La paleta mantiene la temperatura del papel de receta y reserva el color para mediciones y acciones.

### Primary

- **Tomate de medición:** señala acciones, foco y marcas geométricas.
- **Tomate profundo:** refuerza enlaces y estados activos.

### Neutral

- **Tinta ciruela:** texto principal, botones y paneles de resultados.
- **Papel de receta:** fondo general cálido.
- **Papel limpio:** campos y superficies de lectura.
- **Sombra de harina:** separación tonal de bloques.
- **Lápiz apagado:** texto secundario.
- **Línea de regla:** divisores y bordes de campos.

**The One Accent Rule.** El tomate es el único acento cromático; su escasez hace visibles los controles importantes.

## Typography

**Display Font:** Fraunces (con Georgia como respaldo)

**Body Font:** DM Sans (con sans-serif como respaldo)

**Character:** Fraunces aporta el carácter de un recetario editorial; DM Sans mantiene nítidos los formularios y las explicaciones. Ambas familias se alojan en el propio sitio.

### Hierarchy

- **Display:** peso 750, escala fluida y línea compacta para la tesis de cada página.
- **Headline:** peso 700 para secciones y resultados principales.
- **Body:** peso 400, línea 1.6 y lectura limitada a unas 73 letras.
- **Label:** peso 700 para acciones, campos y unidades.

**The Measured Number Rule.** Los factores, cantidades y tablas usan cifras tabulares y una jerarquía mayor que sus etiquetas.

## Layout

El contenido usa un contenedor máximo de 1240 px. La cabecera de página se divide entre una nota lateral y un cuerpo editorial; las herramientas se organizan en formulario y resultado. Las tarjetas de acceso ocupan anchos distintos y pasan a una sola columna por debajo de 620 px. El espacio entre secciones es amplio para separar decisiones de cálculo.

## Elevation & Depth

La profundidad combina capas tonales con dos sombras ambientales teñidas de ciruela. Los formularios permanecen planos; tarjetas de acceso, resultados y la ficha numérica reciben elevación cuando necesitan separarse del papel.

**The Work Surface Rule.** Un borde define una superficie de entrada y una sombra define una pieza elevada; no se usan ambos para decorar la misma tarjeta.

## Shapes

Los campos usan esquinas contenidas, los botones un radio ligeramente mayor y los resultados un radio de 1 rem. Círculos, cuadrados y ejes aparecen únicamente como referencias a moldes y medición. El símbolo de marca emplea el mismo trazo geométrico.

## Components

### Buttons

- **Primary:** tinta ciruela sobre papel claro, con desplazamiento vertical breve al pasar el cursor.
- **Quiet:** fondo transparente y borde de tinta; adopta el acento profundo al activarse.
- **Focus:** contorno tomate visible y separado del borde.

### Cards / Containers

- **Access cards:** anchos y tonos distintos según prioridad; la acción queda alineada al final.
- **Result card:** tinta ciruela, texto claro y cantidades grandes.
- **Work surface:** papel limpio translúcido con una sola línea de contorno.

### Inputs / Fields

- Fondo de papel limpio, borde de regla y radio compacto.
- En foco, borde tomate y halo translúcido; el cursor de texto usa el mismo acento.

### Navigation

La navegación usa texto compacto y una línea tomate animada para hover y página actual. En móvil ocupa todo el ancho y mantiene tres destinos visibles.

## Do's and Don'ts

### Do:

- **Do** usar la geometría cuando explique una forma, medida o resultado.
- **Do** mantener el cálculo y su unidad juntos y con cifras tabulares.
- **Do** reservar espacio amplio entre la explicación y la tarea.

### Don't:

- **Don't** repetir tres tarjetas idénticas ni centrar todos los bloques.
- **Don't** añadir nuevos colores de acento, degradados tecnológicos o iconos decorativos.
- **Don't** ocultar límites de cálculo ni reducir el contraste de los resultados.
