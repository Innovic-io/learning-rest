require('jest');
const { PetService } = require(".././services/pet.service");
const pets = require("../data");
const { deepCopy } = require("../helper");

const petService = new PetService();
describe('Unit test for pets service', () => {
    describe('GET ', () => {
        it('should get single pet if id is right', async () => {
            const id = pets.find((el) => {
                return el
            })
                .id;
            const expected = await petService.getOnePet(id);
            expect(pets
                .find(value => {
                    return value.id === id
                }))
                .toEqual(expected);
        });
        it('should get all pets in data', async () => {
            const excepted = await petService.getAllPets();
            expect(pets).toBe(excepted);
        });

        it('should get single examinations if id right', async () => {
            const petId = pets.find((el) => {
                return el.examinations;
            }).id;
            const examId = pets.find((el) => {
                return el.examinations;
            })
                .examinations
                .find((el) => el.id).id;
            const expected = await petService.getOneExamination(petId, examId);
            expect(pets
                .find((el) => el.examinations)
                .examinations
                .find((el) => el.id === examId))
                .toEqual(expected);
        });

        it('should get all examinations of pets ',async () => {
            const exepted = await petService.getAllExaminations();
            expect(pets
                .filter((el)=> {
                    return el.examinations
                })
                .map((el)=> {
                    return el.examinations
                }))
                .toEqual(exepted);
        });
    });

    describe('DELETE', ()=> {
        it('should delete one pet in array ', async() => {
            const pet = await petService
                .getOnePet(1622147641);
            const afterDeletion = await petService
                .deletePet(1622147641);
            expect(afterDeletion)
                .toEqual(pet);
        });
        it('should delete one examination', async () =>  {
            const examination = await petService
                .getOneExamination(1622147647,4425242564);
            const [afterDeletion] = await petService
                .deleteExamination(1622147647,4425242564);
            expect(afterDeletion)
                .toEqual(examination);
        });
    });
    describe('POST', () => {
        it('should add one pet in database', async () => {
            const obj = {
                name : 'Mouse',
                age : 12
            };
            const addPet = await petService
                .addPet(obj);
            obj.id = addPet.id;
            expect(obj).toEqual(addPet);
        });
        it('should add one examination in pet', async () => {
            const obj = {
                name : 'Mouse',
                age : 12
            };
            const petId = pets.find((el) => {
                return el.examinations;
            }).id;
            const addExam = await  petService
                .addExamination(petId,obj);
            obj.id = addExam.id;
            expect(obj).toEqual(addExam);
        });
    });
    describe('PUT', () => {
        it('should update pet', async () => {
            const obj = {
                name : 'Mouse',
                age : 12
            };
            const pet = pets.find((el) => el);
            const petId = pets.find((el) => el).id;
            const updatePet = Object.assign({}, pet, obj);
            const expected = await petService.updatePet(petId,obj)
            expect(updatePet).toEqual(expected);
        });

        it('should update examination', async () => {
            const obj = {
                scheduled : '2018 - 2 - 10',
                age : 12
            };
            const pet = pets.find((el) => el.examinations);
            const petId = pet.id;
            const examId = pet.examinations.find((el) => el).id;
            const examination = pet.examinations.find((el)=>el.id === +examId);
            const updateExam = Object.assign(examination,obj);

            const expected = await petService.updateExamination(petId, examId, obj);

            expect(updateExam).toEqual(expected);
        });

    })
});
