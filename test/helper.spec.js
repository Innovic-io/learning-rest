require ('jest');
const {deepCopy} = require('../helper');
const {addIdPushAndReturn} = require('../helper');

describe('Unit test for help function', () => {
    describe('Test for copy item',  ()=>{
        it('should make copy of an array', async ()=> {
            const array = [1,2,3,4,5];
            const res = deepCopy(array);
            array.push(6);
            res.push(6);
            expect(array).toEqual(res);
        });
        it('should make copy of an object', async ()=> {
            const object ={
                name : 'Joco',
                age : 24,
                color: 'blue'
            };
            const res = deepCopy(object);
            object.id = 78;
            res.id = 78;
            expect(object).toEqual(res);
        });
        it('should make copy of a string', async ()=> {
            const string = 'Joco';
            const res = deepCopy(string);
            expect(string).toEqual(res);
        });
        it('should make copy of a number', async ()=> {
            const number = 123;
            const res = deepCopy(number);
            expect(number).toEqual(res);
        });
    });
    describe('test for addIdPushAndReturn', ()=> {
        it('should add object to array of an object', async () => {
            const animal = [{ name : 'maa' },{name : 'daa'}];
            const obj = {name : 'saa'};
            const newObject =addIdPushAndReturn(obj,animal);
            obj.id = newObject.id;
            expect(obj).toEqual(newObject);
        });
        it('should add an ID to the object', async ()=> {
            const animal = [{ name : 'maa' },{name : 'daa'}];
            const obj = {name : 'saa'};
            const newObject =addIdPushAndReturn(obj,animal);
            expect(typeof newObject.id).toEqual('string');
        });
    });
    
});
