export const mapPatternToBooleans = (patternString) => {
  return patternString.split('').map(char => char === 'x')
}

export const useCommonSynthActions = () => ({
  // e.g. x...x...x...x...
  setPattern (patternString) {
    const pattern = mapPatternToBooleans(patternString)
    this.pattern = pattern
  },

  togglePatternStep (index) {
    const pattern = [...this.pattern]
    pattern[index] = !pattern[index]
    this.pattern = pattern
  },
})

export default useCommonSynthActions
