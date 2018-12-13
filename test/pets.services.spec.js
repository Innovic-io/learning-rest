require('jest');
const { PetService } = require(".././services/pet.service");
const pets = require("../data");
const { deepCopy } = require("../helper");

const petService = new PetService();

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
        //console.log(expected);
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
    it('should delete one pet in array ', async()=> {
        const pet = await petService.getOnePet(id);
        const afterDeletion = await petService.deletePet(id);
        expect(afterDeletion).toEqual(pet);
    });
});