const {
  stringify,
  generateExport
} = require('svg-sprite-loader/lib/utils')

function runtimeGenerator (params) {
  const { symbol, config } = params
  const { extract, esModule } = config
  let runtime

  if (extract) {
    const data = `{
      id: ${stringify(symbol.useId)},
      viewBox: ${stringify(symbol.viewBox)},
      url: '#' + ${stringify(symbol.id)},
      toString: function () {
        return this.url;
      }
    }`
    runtime = generateExport(data, esModule)
  }

  return runtime
}

module.exports = runtimeGenerator
