const loguer = (req, res, next) => {
  console.log('Request URL:', req.url)
  console.log('Request Type:', req.method)
  console.log('Request Path:', req.path)
  console.log('Request Body:', req.body)
  console.log('Request Query:', req.query)
  console.log('Request Params:', req.params)
  console.log('Request Headers:', req.headers)
  console.log('Request IP:', req.ip)
  console.log('Request Host:', req.hostname)
  console.log('-----------------------------------------------------')
  next()
}

module.exports = loguer
