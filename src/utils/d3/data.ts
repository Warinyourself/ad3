type TypeGenerationData = 'array'

interface IGenerateData {
  type?: TypeGenerationData
  min?: number
  max?: number
  length?: number
}

export function generateData(options: IGenerateData) {
  let { type, min, max, length } = options;
  [type, min, max, length] = [type || 'array', min || 0, max || 100, length || 10]

  return Array.from(Array(length)).map((_, index) => {
    return {
      value: Math.floor(Math.random() * max) + min,
      index
    }
  })
}
