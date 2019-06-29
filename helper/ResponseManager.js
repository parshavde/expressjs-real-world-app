/**
 * @name : SendResponse
 * @description : to send the response to the user
 * @author : Parshav Shah
 */
exports.SendResponse = (res) => {
    if (!res.code) {
        res.code = 200;
    }
    res.status(res.code);
    var Response = {
        data: res.data,
        message: res.message,
        status: res.code
    }
    res.send(Response);
}