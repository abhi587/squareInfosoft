const UserModel = require('../models/userModel')
const moment = require("moment");
const { default: mongoose } = require('mongoose');
const jwt = require("jsonwebtoken")

//**************************************VALIDATION FUNCTIONS****************************** */

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length > 0) return true;
    return false;
};

const isValidRequest = function (object) {
    return Object.keys(object).length > 0
}

const isValidEmail = function (value) {
    const regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regexForEmail.test(value)
}

const regixValidator = function (value) {
    let regex = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/
    return regex.test(value)
}


//****************************************REGISTER NEW AUTHOR********************************* */

const createUser = async function (req, res) {
    try {

        let requestBody = req.body

        if (!isValidRequest(requestBody)) {
            return res
                .status(400)
                .send({ status: false, message: "User data is required" });
        }

        //using desturcturing
        const { email, password, name, dob } = requestBody;

        //requestBody should not have more than 5keys as per outhorSchema
        if (Object.keys(requestBody).length > 4) {
            return res.status(400).send({ status: false, message: "invalid data entry inside request body" })
        }


        if (!isValid(email)) {
            return res
                .status(400)
                .send({ status: false, message: "email is required" })
        }

        if (!isValidEmail(email)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter a valid email address" })
        }


        if (!isValid(password)) {
            return res
                .status(400)
                .send({ status: false, message: "password is required" })
        }

        if (!isValid(name) || !regixValidator(name)) {
            return res
                .status(400)
                .send({ status: false, message: "name is required or its should contain character" })
        }

        if (!isValid(dob)) {
            return res
                .status(400)
                .send({ status: false, message: `dob is required` });
        }

        // checking date format
        if (!/^[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}/.test(dob)) {
            return res
                .status(400)
                .send({ status: false, message: `dob format should be YYYY-MM-DD` });
        }

        // validating the date
        if (moment(dob).isValid() == false) {
            return res
                .status(400)
                .send({ status: false, message: "enter a valid dob" });
        }

        const userData = {

            email: email.trim(),
            password: password.trim(),
            name: name.trim(),
            dob: dob.trim(),
            isDeleted: false
        };

        const newAuthor = await UserModel.create(userData);

        const userID = newAuthor._id;
        const payLoad = { userId: userID };
        const secretKey = "squareInfosoft";

        // creating JWT
        const token = jwt.sign(payLoad, secretKey);

        res.header("x-api-key", token);

        res
            .status(201)
            .send({ status: true, message: "user registered successfully", data: token });



    } catch (err) {
        res.status(500).send({ err: err.message })

    }
}

//*******************************************INDIVIDUAL USER DETAILS***************************************** */

const getUserDetails = async function (req, res) {

    try {

        const decodedToken = req.decodedToken;
        userId = decodedToken.userId
        // console.log(userId)
        const queryParam = req.query;
        const requestBody = req.body;

        if (isValidRequest(requestBody)) {
            return res
                .status(400)
                .send({ status: false, message: "data is not required in body" });
        }

        if (isValidRequest(queryParam)) {
            return res
                .status(400)
                .send({ status: false, message: "invalid request" });
        }


        const userByUserId = await UserModel.findOne({
            _id: userId,
            isDeleted: false
        })

        if (!userByUserId) {
            return res
                .status(404)
                .send({ status: false, message: `no user found by ${userId}` });
        }

        res
            .status(200)
            .send({ status: true, message: "User details", data: userByUserId });

    } catch (err) {

        res.status(500).send({ error: err.message });

    }
};

//************************************** USER LIST BY ID************************************ */

const userList = async function (req, res) {

    try {

        const requestBody = req.body;
        const queryParam = req.query;
        const userId = req.query.userId;

        if (isValidRequest(requestBody)) {
            return res
                .status(400)
                .send({ status: false, message: "data is not required in body" });
        }

        if(!isValidRequest(queryParam)){
            return res
                .status(400)
                .send({status:false, message: "id is required to get data"})
        }

        if (mongoose.Types.ObjectId.isValid(userId) == false) {
            return res
                .status(400)
                .send({ status: false, message: "userId is not valid" });
        }

        const userList = await UserModel.find({_id: userId, isDeleted: false})

        if (userList.length == 0) {
            return res
                .status(404)
                .send({ status: false, message: "no user found" });
        }

        res
            .status(200)
            .send({ status: true, message: `user by userId`,  userList: userList, });

            
    } catch (err) {
    res.status(500).send({ error: err.message });
}
};

//************************************** All USER LIST************************************ */

const allUserList = async function (req, res) {

    try {

        const requestBody = req.body;
        const queryParam = req.query;

        if (isValidRequest(requestBody)) {
            return res
                .status(400)
                .send({ status: false, message: "data is not required in body" });
        }

        if(isValidRequest(queryParam)){
            return res
                .status(400)
                .send({status:false, message: "queryParm is not required "})
        }

        const allUserList = await UserModel.find({isDeleted: false})


        if (allUserList.length == 0) {
            return res
                .status(404)
                .send({ status: false, message: "no user found" });
        }

        res
            .status(200)
            .send({ status: true, message: `all users`,  allUserList: allUserList, });

            
    } catch (err) {
    res.status(500).send({ error: err.message });
}
};

//******************************************DELETING A USER BY ID***************************************************** */

const deleteUser = async function (req, res) {

    try {

        const queryParam = req.query;
        const requestBody = req.body;
        const userId = req.query.userId;

        // query params should be empty
        if (!isValidRequest(queryParam)) {
            return res
                .status(400)
                .send({ status: false, message: "userid is required to delete user" });
        }

        if (isValidRequest(requestBody)) {
            return res
                .status(400)
                .send({ status: false, message: "input data is not required in request body" });
        }

        if (mongoose.Types.ObjectId.isValid(userId) == false) {
            return res
                .status(400)
                .send({ status: false, message: "userId is not valid" });
        }

        let userData = await UserModel.findOne({ _id: userId , isDeleted: false})

        if (!userData) {
            return res
                .status(404)
                .send({ status: false, message: `No user found by this ${userId}` })
        }

        await UserModel.findByIdAndUpdate(
            userId,
            { $set: { isDeleted: true } },
            { new: true }
        );

        res
            .status(200)
            .send({ status: true, message: "User Detail deleted successfully" });

    } catch (err) {

        res.status(500).send({ error: err.message });

    }
};

//**********************EXPORTING FUNCTIONS**************** */

module.exports.createUser = createUser;
module.exports.getUserDetails = getUserDetails;
module.exports.userList = userList;
module.exports.allUserList = allUserList;
module.exports.deleteUser = deleteUser