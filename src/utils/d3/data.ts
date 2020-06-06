type TypeGenerationData = 'array'

interface GenerateDataOptions {
  type?: TypeGenerationData
  min?: number
  max?: number
  sets?: number
  length?: number
}

interface DataItem {
  value: number,
  index: number
}

type GenerationDataType = Array<DataItem> | Array<Array<DataItem>>

export function generateData(options: GenerateDataOptions) {
  let { type, min, max, length, sets } = options;
  [type, min, max, length] = [type || 'array', min || 0, max || 100, length || 10]

  const generateArray = () => {
    return Array.from(Array(length)).map((_, index) => {
      return {
        value: Math.floor(Math.random() * max) + min,
        index
      }
    })
  }

  let data: GenerationDataType = generateArray()

  if (sets) {
    data = Array.from(Array(sets)).map(() => generateArray())
  }

  return data
}
