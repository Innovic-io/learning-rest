const { PetService } = require('../services/pet.service');
let petService;
class PetController {
    constructor() {
        petService = new PetService();
    }
    async getOnePet(req,res){

        const petsId =  req.params.id;
        const element = await petService.getOnePet(petsId);
        if (!element){
            res.status(400).json({"error" : 'Pet does not exist'})
        }
        else {
            res.status(200).json({response: element});
        }
    };
    async getAllPets (req,res) {
        const pets = await petService.getAllPets();
        res.status(200).json(pets);
    };
    async deletePet (req, res){
        const petsId = req.params.id;
        const nesto = await petService.deletePet(petsId);
        if (!nesto){
            res.status(400).json({"error" : 'Pet does not exist'})
        }
        else {
            res.status(200).json(nesto);
        }
    };
    async addPet  (req,res) {
        const element = req.body;
        const nesto = await this
            .petService
            .addPet(element);
        if(!nesto){
            res.status(400).json("Err")
        }
        else {
            res.status(201).json(nesto);
        }
    };
    async updatePet (req, res)  {
        try {
            const petsId = req.params.id;
            const nesto = await petService.updatePet(petsId,req.body);
            res.status(200).json(nesto);

        }
        catch (e) {
            res.status(400).json("error", e.message);
        }
    };
    async getAllExaminations (req, res)  {
        const  nesto = await petService.getAllExaminations();
        res.status(200).json(nesto);
    };
    async getOneExamination  (req, res)  {
        const petId = req.params.petId;
        const examId = req.params.eid;
        const nesto = await petService.getOneExamination(petId,examId);
        res.status(200).json(nesto);
    };
    async deleteExamination  (req, res) {
        const  petId = req.params.petId;
        const examId = req.params.eid;
        const nesto = await petService.deleteExamination(petId,examId);
        if (nesto){
            res.status(200).json(nesto)
        }
        else
            res.status(400).json('Err');
    };
    async addExamination (req, res)  {
        const petId = req.params.petId;
        const element = req.body;
        const nesto = await petService.addExamination(petId,element);
        if (nesto){
            res.status(201).json(nesto);
        }
        else{
            res.status(400).json('Err');
        }
    };
    async updateExamination  (req, res)  {
        const petId = req.params.petId;
        const examId = req.params.eid;
        const element = req.body;
        const nesto  = await petService.updateExamination(petId, examId, element);
        res.status(200).json(nesto);
    };
}
module.exports = {
    PetController
};