module.exports = {
  presets: [
    ['@vue/app', {
      'modules': false,
      'targets': {
        'browsers': [
          '> 1%',
          'last 2 versions',
          'not ie <= 8'
        ]
      }
    }]
  ]
}
