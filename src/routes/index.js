import user from './auth'
import product from './product'
const routes = (app) => {
    app.use('/api/user', user)
    app.use('/api/product',product)
}
module.exports = routes