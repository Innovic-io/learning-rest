const uuid = require('uuid/v4');
const pets = require('../data');
const { deepCopy, addIdPushAndReturn }=require('../helper');

class PetService{
    constructor(sentPets) {
        this.pets = sentPets || pets;
    }
    async getAllPets () {
        return this.pets;
    };
    async getOnePet (petsId)  {
        return this.pets.find((el) => el.id === +petsId);
    };
    async deletePet (petsId){
        const index = this.pets.findIndex((el)=> el.id === +petsId);

        console.log(index);

        if (index > -1){
            const [deleted] = this.pets.splice(index, 1);
            return deleted
        }
    };
    async addPet (element) {
        return addIdPushAndReturn(element, this.pets);
    };
    async updatePet (petsId, body)  {
        const element = this.pets.find((el) => el.id === +petsId);
        return Object.assign(element, body);
    };
    async getAllExaminations () {
        return this.pets.filter((el)=> el.examinations).map((el) => ( el.examinations));

    };
    async getOneExamination  (petId, examId)  {
        const pet = this.pets.find((el) => el.id === +petId).examinations;
        return pet.find((el) => el.id === +examId);
    };
    async deleteExamination (petId, examId){
        const pet = this.pets.find((el)=> el.id === +petId);
        const examination =pet.examinations;
        const index = examination.findIndex((el)=> el.id === +examId);
        if (index > -1){
            return examination.splice(index, 1);
        }
    };
    async addExamination  (petId, element) {
        const pet = this.pets.find((el)=> el.id === +petId);
        const examination = pet.examinations;
        if (element){
            examination.push(element);
            return element;
        }
    };
    async updateExamination  (petId, body)  {
        const pet = this.pets.find((el)=> el.id === +petId);
        const examination = pet.examinations.find((el) => el.id === +examId);
        return Object.assign(examination, body);
    };
}
module.exports = {
    PetService
};