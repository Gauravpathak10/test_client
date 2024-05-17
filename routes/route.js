const routes = require("next-routes-extended");
const clientRoutes = routes();


clientRoutes.add({
  name: 'Home',
  pattern: '/clsId/:id',
  page: 'dashHome/index'
})
clientRoutes.add({
  name: 'List',
  pattern: '/class/:id',
  page: 'api/index'
})




module.exports = clientRoutes;
