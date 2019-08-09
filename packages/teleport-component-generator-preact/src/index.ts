import preactComponentPlugin from '@teleporthq/teleport-plugin-preact-base-component'
import { createPlugin as createCSSModulesPlugin } from '@teleporthq/teleport-plugin-css-modules'
import { createPlugin as createCSSPlugin } from '@teleporthq/teleport-plugin-css'
import jsxInlineStylesPlugin from '@teleporthq/teleport-plugin-react-inline-styles'
import importStatementsPlugin from '@teleporthq/teleport-plugin-import-statements'
import proptypesPlugin from '@teleporthq/teleport-plugin-jsx-proptypes'

import prettierJS from '@teleporthq/teleport-postprocessor-prettier-js'

import { createComponentGenerator } from '@teleporthq/teleport-component-generator'

import preactMapping from './preact-mapping.json'

import { ComponentGenerator, Mapping } from '@teleporthq/teleport-types'

const cssPlugin = createCSSPlugin({
  templateChunkName: 'jsx-component',
  templateStyle: 'jsx',
  declareDependency: 'import',
})

const cssModulesPlugin = createCSSModulesPlugin({
  classAttributeName: 'class',
  moduleExtension: false,
})

const stylePlugins = {
  InlineStyles: jsxInlineStylesPlugin,
  CSSModules: cssModulesPlugin,
  CSS: cssPlugin,
}

export const createPreactComponentGenerator = (
  variation: string = 'CSS',
  mapping: Mapping = {}
): ComponentGenerator => {
  const generator = createComponentGenerator()
  const stylePlugin = stylePlugins[variation] || cssPlugin

  generator.addMapping(preactMapping)
  generator.addMapping(mapping)

  generator.addPlugin(preactComponentPlugin)
  generator.addPlugin(stylePlugin)
  generator.addPlugin(proptypesPlugin)
  generator.addPlugin(importStatementsPlugin)

  generator.addPostProcessor(prettierJS)

  return generator
}

export default createPreactComponentGenerator()
