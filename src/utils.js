export const generateColor = (a = 1, b = 1, c = 1) => {
  // const args = [a, b, c]
  // console.log(['#0E292A', '#29547A', '#1D584F', '#172845', '#7A292A', '#541C34', '#1B504F'][a])
  return ['#0E292A', '#29547A', '#1D584F', '#172845', '#7A292A', '#541C34', '#1B504F', '#BF75D1', '#C75798',
    '#A1365F', '#7A2941', '#4D192C'
  ][a]
  // return `rgba(${  color()  })`

  // function color() {
  //   return new Array(3)
  //     .fill(255)
  //     .map((val, i) =>
  //     // abs for 2x range increasing
  //       Math.abs(
  //         val - (args[i] * 20))
  //       )
  //     .join(', ')
  // }
}