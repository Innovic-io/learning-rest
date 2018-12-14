const uuid = require('uuid/v4');

const deepCopy = (toCopy) => {
    return JSON.parse(JSON.stringify(toCopy));
};


module.exports.deepCopy = deepCopy;

module.exports.addIdPushAndReturn = (obj,pets)=>{
    const copy = deepCopy(obj);
    copy.id = uuid;
    pets.push(copy);
    return copy;
};