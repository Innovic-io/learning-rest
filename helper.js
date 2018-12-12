const uuid = require('uuid/v4');
const deepCopy = toCopy => JSON.parse(JSON.stringify(toCopy));

module.exports.deeepCopy = deepCopy;

module.exports.addIdPushAndReturn = (obj,object)=>{
    const copy = deepCopy(obj);
    copy.id = uuid;
    object.push(copy);
    return copy;
};