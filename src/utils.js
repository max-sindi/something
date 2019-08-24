export const generateColor = (a = 1, b = 1, c = 1) => {
  const args = [a, b, c]
  return `rgba(${  color()  })`

  function color() {
    return new Array(3)
      .fill(255)
      .map((val, i) =>
      // abs for 2x range increasing
        Math.abs(
          val - (args[i] * 10))
        )
      .join(', ')
  }
}