const apiUrl = `${process.env.REACT_APP_API_BASE_URL}`

const config = {
  env: process.env.REACT_APP_ENV,
  api: {
    node: process.env.REACT_APP_NODE_API,
    url: `${apiUrl}`,
  },
  app: {
    domain: process.env.REACT_APP_BASE_URL,
    url: process.env.REACT_APP_URL,
  },
}

export default config
