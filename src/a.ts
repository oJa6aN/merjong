// function arrangeMpsz(input: string): string[] {
//   const result: string[] = []

//   const tilePatterns = /([0-9]+[a-z\?]|\-|\?)/gi
//   let match

//   while ((match = tilePatterns.exec(input)) !== null) {
//     console.log(match)
//     const sameSuitGroup = match[0]                  // (e.g., "123m")

//     if (sameSuitGroup === '-') {
//       result.push('-')
//     } else if (sameSuitGroup === '?') {
//       result.push('?')
//     } else {
//       const numbers = sameSuitGroup.slice(0, -1)    // (e.g., "123")
//       const suit = sameSuitGroup.slice(-1)          // (e.g., "m")
//       for (const num of numbers) {
//         result.push(`${num}${suit}`)
//       }
//     }
//   }

//   return result
// }

// function generateSvg(input: string) {

//   arrangeMpsz(input)

// }

// console.log(arrangeMpsz("123z-343????"))
