var jwt = require('jsonwebtoken');
var ResponseManager = require('../helper/ResponseManager');
var Models = require('../models/');
var PasswordHash = require('password-hash');
var Key = require('../config/config').development.key;

/**
 * @name : Register
 * @description : to register the user
 * @author : Parshav Shah
 */
exports.Register = async (req, res) => {
    try {
        let PreparedData = {
            ...req.body
        };

        let User = {};

        // check that user is exist or not
        User = await Models.User.count({
            where: {
                email: PreparedData.email
            }
        }).catch((error) => {
            throw error;
        })

        // User not exist so create the user
        if (!User) {
            User = await Models.User.create(PreparedData).catch((error) => {
                throw error;
            });
            res['data'] = User;
            res['message'] = "User created";
        }
        // User exist so throw the error
        else {
            throw new Error("User Exist");
        }

        // Send the response
        ResponseManager.SendResponse(res);

    } catch (error) {
        res['message'] = error.message;
        res['data'] = error;
        res['code'] = 500;
        ResponseManager.SendResponse(res);
    }
}

/**
 * @name : Login
 * @description : to register the user
 * @author : Parshav Shah
 */
exports.Login = async (req, res) => {
    try {

        let PreparedData = {
            ...req.body
        };

        // check that user is exist or not
        let User = await Models.User.findOne({
            where: {
                email: PreparedData.email
            },
            attributes: ['id', 'name', 'email', 'password'],
            raw: true
        }).catch((error) => {
            throw error;
        })

        // User not exist so create the user
        if (User) {

            // verify password
            let VerifyResult = PasswordHash.verify(PreparedData.password, User.password);

            if (VerifyResult) {

                delete User['password'];

                let Token = jwt.sign(User, Key, {
                    expiresIn: '10h'
                });

                User['token'] = Token;

                res.data = User;
                res.message = "Login Success";
                res.code = 200;

                // Send the response
                ResponseManager.SendResponse(res);
            } else {
                throw new Error("Wrong password inserted");
            }
        }
        // User exist so throw the error
        else {
            throw new Error("User not exist");
        }

    } catch (error) {
        res.message = error.message;
        res.data = error;
        ResponseManager.SendResponse(res);
    }
}

exports.Authnticate = (req, res) => {
    try {
        let CurruntTime = +new Date();
        jwt.verify(req.body.token, Key, (error, Decoded) => {
            if (error) {
                throw error;
            }
            if (Decoded.exp <= CurruntTime) {
                res['message'] = "Success";
                res['data'] = true;
                res['code'] = 200;
                ResponseManager.SendResponse(res);
            } else {
                throw new Error("Something went wrong, Please login again.");
            }
        });
    } catch (error) {
        res['message'] = error.message;
        res['data'] = error;
        res['code'] = 401;
        ResponseManager.SendResponse(res);
    }
}

/**
 * @name : GetUser
 * @description : to register the user
 * @author : Parshav Shah
 */
exports.GetUser = async (req, res) => {
    try {
        var UserId = req.params.id;

        // user is trying to access other user
        if (UserId != req.user.id) {
            res.code = 401;
            throw new Error("Unauthorized access");
        }

        // find the user
        let User = await Models.User.findOne({
            where: {
                id: UserId
            },
            attributes: ['id', 'name', 'email'],
            include: [{
                    model: Models.Account,
                    required: false
                },
                {
                    model: Models.Category,
                    required: false
                },
                {
                    model: Models.Transaction,
                    required: false
                }
            ]
        }).catch((error) => {
            throw error;
        })

        res.data = User;
        res.message = "User fetched successfully";

        ResponseManager.SendResponse(res);

    } catch (error) {
        res.message = error.message;
        res.data = error;
        ResponseManager.SendResponse(res);
    }
}