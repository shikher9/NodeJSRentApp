/**
 * Created by Shikher on 15-Sep-16.
 */

/**
 * used to create, sign, and verify tokens
 */
var jwt = require('jsonwebtoken');


/**
 * Config file which contains secret and logic for checking tokens
 * @type {{secret: string, checkToken: module.exports.checkToken}}
 */

module.exports = {
    secret: 'ilovejavascript',
    checkToken: function (request,response) {
        var token = request.headers['x-access-token'];

        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, this.secret, function (error) {
                if (error) {
                    return response.json({success: false, message: 'Failed to authenticate token.'});
                } else {
                    return;
                }
            });

        } else {
            return response.status(403).send({
                success: false,
                message: 'Please provide token.'
            });

        }
    }
};