import { createBackdropFilterParser } from "../parser/backdrop-filter"
import { buildXMLString } from "../utils"

export default function buildBackdropFilter(
  v: {
    left: number
    top: number
    width: number
    height: number
    id: string
  },
  style: Record<string, string | number>,
  inheritedStyle: Record<string, string | number>
) {
  const parser = createBackdropFilterParser(v, style, inheritedStyle)
  const value = style.backdropFilter as unknown as string[]

  for (const input of value) {
    const res = parser.parse(input, 'blur')
    if (res?.type === 'blur') {
      res.
    }
  }

  
}

function buildBackdropFilterXML(id: string, props: {
  src: string
  x: number
  y: number
  width: number
  height: number
}, children) {
  return buildXMLString(
    'filter',
    {
      id: `satori_bf_${id}`
    },
    buildXMLString(
      'feImage',
      props
    )
    + children 
    + buildXMLString(
      'feComposite',
      {
        in2: 'SourceGraphic',
        operator: 'in'
      }
    )
  )
}

function buildBlurXML(radius: number) {
  return buildXMLString(
    'feGaussianBlur',
    {
      stdDeviation: radius,
      edgeMode: 'duplicate'
    }
  )
}