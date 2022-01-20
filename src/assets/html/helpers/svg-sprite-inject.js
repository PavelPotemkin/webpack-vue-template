const Handlebars = require('handlebars/runtime')

module.exports = function (compilation) {
  const foundSpiteName = Object.keys(compilation.assets).find(item => item.match(/sprite\.[a-zA-Z0-9]*\.?svg/ig))

  if (!foundSpiteName) { return }
  const sprite = compilation.assets[foundSpiteName].source()
  return new Handlebars.SafeString(sprite)
}
