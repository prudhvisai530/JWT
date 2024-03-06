const routes = require('express');
const router = routes.Router();
const authController = require('../controller/authController')

router.get('/signup',authController.signUp_get);
router.post('/signup',authController.signUp_post);
router.post('/logout',authController.logout);
router.post('/login',authController.login_post);

module.exports = router;