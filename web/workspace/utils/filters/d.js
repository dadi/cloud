const dust = require('dustjs-linkedin')

// Decodes html entities e.g., '%20' > ' '
dust.filters.d = value => {
  return decodeURIComponent(value.replace('+', ' '))
} 