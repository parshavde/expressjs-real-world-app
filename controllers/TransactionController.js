var ResponseManager = require('../helper/ResponseManager');
var Models = require('../models/');

/**
 * @name : List
 * @description : to list the records
 * @author : Parshav Shah
 */
exports.List = async (req, res) => {
    try {

        // find the Transaction
        let Transaction = await Models.Transaction.findAll({
            where: {
                user_id: req.user.id
            },
            include: [{
                    model: Models.User,
                    required: false,
                    attributes: ['id', 'name']
                },
                {
                    model: Models.Category,
                    required: false,
                    attributes: ['id', 'name']
                },
                {
                    model: Models.Account,
                    required: false,
                    attributes: ['id', 'name']
                },
            ]
        }).catch((error) => {
            throw error;
        })

        if (!Transaction) {
            throw new Error("Transactions not exist");
        }

        res.data = Transaction;
        res.message = "Transactions fetched successfully";

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

        var Transaction = {};

        Transaction = await Models.Transaction.create(PreparedData).catch((error) => {
            throw error;
        });
        res['code'] = 201;
        res['data'] = Transaction;
        res['message'] = "Transaction created";

        // Send the response
        ResponseManager.SendResponse(res);

    } catch (error) {
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

        var TransactionId = req.params.id;

        // create a copy of the reqest body
        let PreparedData = {
            ...req.body
        }

        PreparedData['user_id'] = req.user.id;

        let Transaction = {};

        // check that Transaction is exist or not
        Transaction = await Models.Transaction.findOne({
            where: {
                id: TransactionId,
                user_id: PreparedData.user_id
            }
        }).catch((error) => {
            throw error;
        })

        // Transaction not exist so create the Transaction
        if (Transaction) {
            Transaction = await Models.Transaction.update(PreparedData, {
                where: {
                    id: TransactionId
                }
            }).catch((error) => {
                throw error;
            });
            PreparedData['id'] = parseInt(TransactionId);
            res['data'] = PreparedData;
            res['message'] = "Transaction created";
        }
        // Transaction exist so throw the error
        else {
            throw new Error("Transaction Not Exist");
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
        var TransactionId = req.params.id;

        // find the Transaction
        let Transaction = await Models.Transaction.findOne({
            where: {
                id: TransactionId,
                user_id: req.user.id
            },
            include: [{
                    model: Models.User,
                    required: false
                },
                {
                    model: Models.Category,
                    required: false
                },
                {
                    model: Models.Account,
                    required: false
                },
            ]
        }).catch((error) => {
            throw error;
        })

        if (!Transaction) {
            throw new Error("Transaction not exist");
        }

        res.data = Transaction;
        res.message = "Transaction fetched successfully";

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

        var TransactionId = req.params.id;

        let Transaction = {};

        // check that Transaction is exist or not
        Transaction = await Models.Transaction.findOne({
            where: {
                id: TransactionId,
                user_id: req.user.id
            }
        }).catch((error) => {
            throw error;
        })

        // Transaction not exist so create the Transaction
        if (Transaction) {
            Transaction = await Models.Transaction.destroy({
                where: {
                    id: TransactionId
                }
            }).catch((error) => {
                throw error;
            });
            res['message'] = "Transaction deleted";
        }
        // Transaction exist so throw the error
        else {
            throw new Error("Transaction Not Exist");
        }

        // Send the response
        ResponseManager.SendResponse(res);

    } catch (error) {
        res['message'] = error.message;
        res['data'] = error;
        ResponseManager.SendResponse(res);
    }
}