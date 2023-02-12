const jwt = require("jsonwebtoken")
const UserModel = require("../models/userModel");
const { default: mongoose } = require('mongoose');

//************************************AUTHENTICATION*********************** */


const authentication = async function (req, res, next) {
    const token = req.headers["x-api-key"];
    const secretKey = "squareInfosoft";

    if (!token) {
        return res
            .status(401)
            .send({ status: false, message: "Please provide token" });
    }

    try {

        const decodedToken = jwt.verify(token, secretKey, {
            ignoreExpiration: true
        });

        req.decodedToken = decodedToken;

        next()

    } catch (error) {

        res
            .status(500)
            .send({ error: "authentication failed" })

    }
}

//**********************************EXPORTING MIDDLEWARE FUNCTIONS************************************* */

module.exports.authentication = authentication;

