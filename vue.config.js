process.env.VUE_APP_VERSION = require ('/package.json').version


module.exports = {


 index: {
  // the source template
  template: 'public/index.html',

  // output as dist/index.html
  // when using title option,
  // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
  title: 'A Bootiful Podcast Studio',
  // chunks to include on this page, by default includes
  // extracted common chunks and vendor chunks.
  chunks: ['chunk-vendors', 'chunk-common', 'index']
 },
}
