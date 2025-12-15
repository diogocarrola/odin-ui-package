module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: ['>0.2%', 'not dead', 'not op_mini all']
      },
      modules: false
    }]
  ]
  ,
  env: {
    test: {
      presets: [
        ['@babel/preset-env', {
          targets: { node: 'current' },
          modules: 'auto'
        }]
      ]
    }
  }
};