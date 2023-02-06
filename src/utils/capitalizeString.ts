export function capitalizeString(word: string) {
  const wordCapitalized = word.charAt(0).toUpperCase() + word.slice(1)

  return wordCapitalized
}
