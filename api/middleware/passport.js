const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const dbConnect = require('../services/dbConnect');
const User = require('../app_modules/users/users_model')
const errorHandler = require('../utils/errorHandler')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEYS
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                await dbConnect();
                const user = await User.findById(payload.userId).select('email id role_id')

                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (e) {
                //Обработать ошибку
                errorHandler(res, e)
            }
        })
    )
}