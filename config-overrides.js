const {
  override,
  fixBabelImports,
  addLessLoader
} = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),

  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@primary-color': '#008EFE',
        '@success-color': '#27AE60',
        '@error-color': '#EB5757',
        '@highlight-color': '#EB5757',
        '@warning-color': '#E69900',
        '@black': '#333',
        '@body-background': '#F2F5F7',

        '@font-family': 'Roboto, sans-serif',
        '@text-color': '#333',
        '@text-color-secondary': '#5A5A5A',
        '@heading-color': '#333',

        '@border-radius-base': '4px',
        '@border-radius-sm': '4px',

        '@layout-header-background': '#F2F5F7',
        '@layout-header-height': '82px',
        '@layout-header-padding': '0 12px',

        '@btn-height-base': '42px',
        '@btn-height-lg': '42px',
        '@btn-padding-base': '0 28px',

        '@menu-inline-toplevel-item-height': '44px',
        '@menu-item-height': '44px',
        '@menu-item-active-bg': 'rgba(0, 142, 254, 0.2)',
        '@menu-item-active-border-width': 0,
        '@menu-icon-size': '18px',
        '@menu-item-color': '#595A5A',
        '@menu-item-vertical-margin': 0,

        '@control-padding-horizontal': '16px',
        '@input-height-base': '42px',
        '@input-placeholder-color': '#999',

        '@typography-title-font-weight': 400,
        '@typography-title-margin-bottom': '16px'
      }
    }
  })
)
