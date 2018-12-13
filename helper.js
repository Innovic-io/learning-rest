const uuid = require('uuid/v4');

const deepCopy = (toCopy) => {
    return JSON.parse(JSON.stringify(toCopy));
};


module.exports.deepCopy = deepCopy;

module.exports.addIdPushAndReturn = (obj,object)=>{
    const copy = deepCopy(obj);
    copy.id = uuid;
    object.push(copy);
    return copy;
};