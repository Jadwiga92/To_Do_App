const bcrypt= require('bcryptjs');

module.exports = async (data) => {

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(data, salt);
    return hashed
};
