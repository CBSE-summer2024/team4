module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset', {
      targets: {
        browsers: ['last 2 versions', 'ie >= 11']
      },
      useBuiltIns: 'usage',
      corejs: 3
    }]
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
}
