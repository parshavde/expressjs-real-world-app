var ResponseManager = require('../helper/ResponseManager');
var Models = require('../models/');

/**
 * @name : List
 * @description : to list the records
 * @author : Parshav Shah
 */
exports.List = async (req, res) => {
    try {

        // find the category
        let Category = await Models.Category.findAll({
            where: {
                user_id: req.user.id
            },
            attributes: ['name', 'id']
        }).catch((error) => {
            throw error;
        })

        if (!Category) {
            throw new Error("Categories not exist");
        }

        res.data = Category;
        res.message = "Categories fetched successfully";

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

        var Category = {};

        // check that category is exist or not
        Category = await Models.Category.count({
            where: {
                name: PreparedData.name,
                user_id: PreparedData.user_id
            }
        }).catch((error) => {
            throw error;
        })

        // Category not exist so create the category
        if (!Category) {
            Category = await Models.Category.create(PreparedData).catch((error) => {
                throw error;
            });
            res['code'] = 201;
            res['data'] = Category;
            res['message'] = "Category created";
        }
        // Category exist so throw the error
        else {
            throw new Error("Category Exist");
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
 * @name : Update
 * @description : to update the record
 * @author : Parshav Shah
 */
exports.Update = async (req, res) => {
    try {

        var CategoryId = req.params.id;

        // create a copy of the reqest body
        let PreparedData = {
            ...req.body
        }

        PreparedData['user_id'] = req.user.id;

        let Category = {};

        // check that Category is exist or not
        Category = await Models.Category.findOne({
            where: {
                id: CategoryId,
                user_id: PreparedData.user_id
            }
        }).catch((error) => {
            throw error;
        })

        // Category not exist so create the Category
        if (Category) {
            Category = await Models.Category.update(PreparedData, {
                where: {
                    id: CategoryId
                }
            }).catch((error) => {
                throw error;
            });
            PreparedData['id'] = parseInt(CategoryId);
            res['data'] = PreparedData;
            res['message'] = "Category created";
        }
        // Category exist so throw the error
        else {
            throw new Error("Category Not Exist");
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
 * @name : Read
 * @description : to read the record
 * @author : Parshav Shah
 */
exports.Read = async (req, res) => {
    try {
        var CategoryId = req.params.id;

        // find the Category
        let Category = await Models.Category.findOne({
            where: {
                id: CategoryId,
                user_id: req.user.id
            },
            include: [{
                model: Models.User,
                required: false
            }]
        }).catch((error) => {
            throw error;
        })

        if (!Category) {
            throw new Error("Category not exist");
        }

        res.data = Category;
        res.message = "Category fetched successfully";

        ResponseManager.SendResponse(res);

    } catch (error) {
        res['message'] = error.message;
        res['data'] = error;
        res['code'] = 500;
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

        var CategoryId = req.params.id;

        let Category = {};

        // check that Category is exist or not
        Category = await Models.Category.findOne({
            where: {
                id: CategoryId,
                user_id: req.user.id
            }
        }).catch((error) => {
            throw error;
        })

        // Category not exist so create the Category
        if (Category) {
            Category = await Models.Category.destroy({
                where: {
                    id: CategoryId
                }
            }).catch((error) => {
                throw error;
            });
            res['message'] = "Category deleted";
        }
        // Category exist so throw the error
        else {
            throw new Error("Category Not Exist");
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