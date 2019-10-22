//index, show, update e destroy
const User = require('../models/User');

module.exports = {
    async store(req, res) {
        //const email = req.body.email;
        //recurso de desestruturação do javascript
        const { email } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ email });
        }

        return res.json(user);
    }
};