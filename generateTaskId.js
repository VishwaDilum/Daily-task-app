const {lastInsert} = require('./sequalize/sequalize');
function genarateId(lastOrderId) {
    console.log("Generate Order ID FROM js Class "+ lastOrderId)
}
module.exports = {genarateId}