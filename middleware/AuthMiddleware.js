var Models = require('../models/');
var jwt = require('jsonwebtoken');
var Key = require('../config/config').development.key;
var ResponseManager = require('../helper/ResponseManager');

/**
 * @name : Authnticate
 * @description : Authnticate user
 * @author : Parshav Shah 
 **/
exports.Authnticate = async (req, res, next) => {
    try {
        let CurruntTime = +new Date();
        jwt.verify(req.headers.authorization, Key, (error, Decoded) => {
            if (error) {
                throw error;
            }
            if (Decoded.exp <= CurruntTime) {
                req.user = Decoded;
                next();
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