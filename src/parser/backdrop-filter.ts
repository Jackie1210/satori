import { lengthToNumber } from '../utils.js'

const FILTER_FN = [
  'blur',
  'brightness',
  'contrast',
  'drop-shadow',
  'grayscale',
  'hue-rotate',
  'invert',
  'opacity',
  'sepia',
  'saturate'
] as const

type TurpleKeys<T extends readonly any[]> = T[number]

const regexMap = Object.fromEntries(FILTER_FN.map(k => [
  k,
  new RegExp(`/${k}\((.+)\)/`)
])) as { [p in TurpleKeys<typeof FILTER_FN>]: RegExp }

export function createBackdropFilterParser(
  {
    width,
    height,
  }: {
    width: number
    height: number
  },
  style: Record<string, string | number>,
  inheritedStyle: Record<string, string | number>
) {
  function parseBlur(str: string) {
    const v = str.match(regexMap['blur'])

    if (!v) return null

    const [, value] = v

    return {
      type: 'blur',
      radius: lengthToNumber(
        value,
        inheritedStyle.fontSize as number,
        width,
        inheritedStyle,
        true
      )
    }
  }

  function parseBrightness(str: string) {
    return {
      type: 'brightness',
      amount: '20%'
    }
  }

  function parse(input: string, type: 'brightness'): ReturnType<typeof parseBrightness>
  function parse(input: string, type: 'blur'): ReturnType<typeof parseBlur>
  function parse(input: string, type: 'blur' | 'brightness'): ReturnType<typeof parseBlur> | ReturnType<typeof parseBrightness> {
    if (type === 'blur') {
      return parseBlur(input)
    }

    return null
  }

  return { parse }
}

