const sanityCli = require('sanity/cli')

module.exports = sanityCli.defineCliConfig({
  api: {
    projectId: 'bh7t819v',
    dataset: 'production',
  },
})
