const UserController = require('../controllers/user.controller')

module.exports = (app) => {
    app.get('/api/users/', UserController.getUsers)
    app.get('/api/user/:id', UserController.getOneUser)
    app.post('/api/register', UserController.register)
    app.post("/api/login", UserController.login);
    app.post("/api/logout", UserController.logout);
    app.patch('/api/editUser/:id', UserController.editUser)
}