const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const MiddleWares = require('../middlewares/auth')


//test-api
router.get('/test-me',  function(req, res){
    res.send({status:true, message : "test-api working fine"})
})

//************************************USER****************************************** */    

//create user
router.post('/createUser', UserController.createUser)

// user detail
router.get('/detail', MiddleWares.authentication ,  UserController.getUserDetails )

//user by userid
router.get('/userDetail', MiddleWares.authentication ,  UserController.userList)

//all user list
router.get('/allUserDetail', MiddleWares.authentication ,  UserController.allUserList)

//delete user by id
router.delete('/deleteUser', MiddleWares.authentication ,  UserController.deleteUser)


//***************** INVALID REQUEST*************** */
router.all("/*", function (req, res) {
    res
        .status(400)
        .send({ status: false, message: "invalid http request" });
});


module.exports = router