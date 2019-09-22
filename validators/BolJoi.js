const Joi = require('@hapi/joi');
var ResponseManager = require('../helper/ResponseManager');

const RequestSchema = Joi.object({
    id: Joi.number().required().allow(null),
    carrier_name: Joi.string().required().allow(null),
    carrier_duns: Joi.string().required().allow(null),
    carrier_phone: Joi.string().required().allow(null),
    carrier_address: Joi.string().required().allow(null),
    carrier_date: Joi.date().required().allow(null),
    consignee: Joi.string().required().allow(null),
    consignee_address: Joi.string().required().allow(null),
    consignee_phone: Joi.string().required().allow(null),
    third_party_billing: Joi.string().required().allow(null),
    address: Joi.string().required().allow(null),
    phone: Joi.string().required().allow(null),
    bol_number: Joi.string().required().allow(null),
    sid_number: Joi.string().required().allow(null),
    sac: Joi.string().required().allow(null),
    freight_bill_pro_number: Joi.string().required().allow(null),
    load_number: Joi.string().required().allow(null),
    trailer_number: Joi.string().required().allow(null),
    trailer_type: Joi.string().required().allow(null),
    special_instructions1: Joi.string().required().allow(null),
    shipper_internal_date: Joi.string().required().allow(null),
    special_instructions2: Joi.string().required().allow(null),
    cod_amount: Joi.number().required().allow(null),
    cod_fee: Joi.number().required().allow(null),
    total_amount_collected: Joi.number().required().allow(null),
    carrier_signature: Joi.string().required().allow(null),
    status: Joi.number().required().allow(null),
    bol_item_detail: Joi.array().items({
        id: Joi.number().required().allow(null),
        name: Joi.string().required().allow(null),
        summary: Joi.string().required().allow(null),
        item_code: Joi.string().required().allow(null),
        quantity: Joi.string().required().allow(null),
        description: Joi.string().required().allow(null),
        packging: Joi.string().required().allow(null),
        class: Joi.string().required().allow(null),
        hm: Joi.string().required().allow(null),
        weight: Joi.string().required().allow(null),
    })
})

exports.Validate = async (req, res, next) => {
    try {

        let Result = Joi.validate(req.body, RequestSchema).catch((error) => {
            throw error;
        })

        if (Result) {
            next();
        } else {
            throw new Error("Something went wrong");
        }

    } catch (error) {
        res.code = 500;
        res.message = error.message;
        res.data = error;
        ResponseManager.SendResponse(res);
    }
}