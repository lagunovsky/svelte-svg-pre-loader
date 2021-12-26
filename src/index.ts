import * as svgo from 'svgo'
import type { LoaderDefinitionFunction } from 'webpack'
import { validateAndFixSvgoOptions } from './svgo'


export type SvelteSVGAction = (node: SVGElement) => { update?: () => void, destroy?: () => void } | void

export type Options = {
  svgo?: svgo.OptimizeOptions
  withAction?: boolean
}

const svgRegex = /(<svg.*?)(>.*)/s
const viewBoxRegex = /<svg[^>]+viewBox="\d+\s+\d+\s+(\d+)\s+(\d+)"/s

const index: LoaderDefinitionFunction<Options> = function (source) {
  const options = this.getOptions()
  const cb = this.async()

  Promise.resolve(source)
    .then((content) => {
      return svgo.optimize(content, validateAndFixSvgoOptions(options.svgo)).data
    })
    .then(content => {
      const parts = svgRegex.exec(content)
      if (parts === null) {
        throw new Error('Unable to parse as svg.')
      }

      const [ , svgStart, svgBody ] = parts

      const viewBox = viewBoxRegex.exec(content)
      const height = viewBox === null ? '1em' : viewBox[2]
      const width = viewBox === null ? '1em' : viewBox[1]

      return (
        `<script>\n` +
        `export let height = ${height}\n` +
        `export let width = ${width}\n` +
        `export let fill = 'currentColor'\n` +
        `${options.withAction === true ? 'export let action = () => {}\n' : ''}` +
        `</script>\n` +
        `\n` +
        `${svgStart}` +
        `${options.withAction === true ? 'use:action' : ''} {height} {width} {fill} {...$$restProps}` +
        `${svgBody}\n`
      )
    })
    .then(result => cb(null, result))
    .catch(err => cb(err))
}

export default index
