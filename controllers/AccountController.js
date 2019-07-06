var ResponseManager = require('../helper/ResponseManager');
var Models = require('../models/');

/**
 * @name : List
 * @description : to list the records
 * @author : Parshav Shah
 */
exports.List = async (req, res) => {
    try {

        // find the accounts
        let Account = await Models.Account.findAll({
            where: {
                user_id: req.user.id
            },
            attributes: ['name', 'summary', 'id']
        }).catch((error) => {
            throw error;
        })

        if (!Account) {
            throw new Error("Accounts not exist");
        }

        res.data = Account;
        res.message = "Accounts fetched successfully";

        ResponseManager.SendResponse(res);

    } catch (error) {
        res.message = error.message;
        res.data = error;
        ResponseManager.SendResponse(res);
    }
}

/**
 * @name : Create
 * @description : to create the record
 * @author : Parshav Shah
 */
exports.Create = async (req, res) => {
    try {
        // create a copy of the reqest body
        let PreparedData = {
            ...req.body
        }

        PreparedData['user_id'] = req.user.id;

        var Account = {};

        // check that account is exist or not
        Account = await Models.Account.count({
            where: {
                name: PreparedData.name,
                user_id: PreparedData.user_id
            }
        }).catch((error) => {
            throw error;
        })

        // User not exist so create the user
        if (!Account) {
            Account = await Models.Account.create(PreparedData).catch((error) => {
                throw error;
            });
            res['code'] = 201;
            res['data'] = Account;
            res['message'] = "Account created";
        }
        // User exist so throw the error
        else {
            throw new Error("Account Exist");
        }

        // Send the response
        ResponseManager.SendResponse(res);

    } catch (error) {
        res['code'] = 500;
        res['message'] = error.message;
        res['data'] = error;
        ResponseManager.SendResponse(res);
    }
}

/**
 * @name : Update
 * @description : to update the record
 * @author : Parshav Shah
 */
exports.Update = async (req, res) => {
    try {

        var AccountId = req.params.id;

        // create a copy of the reqest body
        let PreparedData = {
            ...req.body
        }

        PreparedData['user_id'] = req.user.id;

        let Account = {};

        // check that account is exist or not
        Account = await Models.Account.findOne({
            where: {
                id: AccountId,
                user_id: PreparedData.user_id
            }
        }).catch((error) => {
            throw error;
        })

        // User not exist so create the user
        if (Account) {
            Account = await Models.Account.update(PreparedData, {
                where: {
                    id: AccountId
                }
            }).catch((error) => {
                throw error;
            });
            PreparedData['id'] = parseInt(AccountId);
            res['data'] = PreparedData;
            res['message'] = "Account created";
        }
        // User exist so throw the error
        else {
            throw new Error("Account Not Exist");
        }

        // Send the response
        ResponseManager.SendResponse(res);

    } catch (error) {
        res['message'] = error.message;
        res['data'] = error;
        ResponseManager.SendResponse(res);
    }
}

/**
 * @name : Read
 * @description : to read the record
 * @author : Parshav Shah
 */
exports.Read = async (req, res) => {
    try {
        var AccountId = req.params.id;

        // find the accounts
        let Account = await Models.Account.findOne({
            where: {
                id: AccountId,
                user_id: req.user.id
            },
            include: [{
                model: Models.User,
                required: false
            }]
        }).catch((error) => {
            throw error;
        })

        if (!Account) {
            throw new Error("Account not exist");
        }

        res.data = Account;
        res.message = "Account fetched successfully";

        ResponseManager.SendResponse(res);

    } catch (error) {
        res.message = error.message;
        res.data = error;
        ResponseManager.SendResponse(res);
    }
}

/**
 * @name : Delete
 * @description : to delete the record
 * @author : Parshav Shah
 */
exports.Delete = async (req, res) => {
    try {

        var AccountId = req.params.id;

        let Account = {};

        // check that account is exist or not
        Account = await Models.Account.findOne({
            where: {
                id: AccountId,
                user_id: req.user.id
            }
        }).catch((error) => {
            throw error;
        })

        // User not exist so create the user
        if (Account) {
            Account = await Models.Account.destroy({
                where: {
                    id: AccountId
                }
            }).catch((error) => {
                throw error;
            });
            res['message'] = "Account deleted";
        }
        // User exist so throw the error
        else {
            throw new Error("Account Not Exist");
        }

        // Send the response
        ResponseManager.SendResponse(res);

    } catch (error) {
        res['message'] = error.message;
        res['data'] = error;
        ResponseManager.SendResponse(res);
    }
}