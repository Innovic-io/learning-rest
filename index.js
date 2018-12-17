const app = require('express')();
const bodyParser = require('body-parser');

//const petService = require('./pet.service');
const { PetController } = require('./controllers/pets.controller');

const petController = new PetController();
app.use(bodyParser.json());

app.get('/pets', petController.getAllPets);
app.get('/pets/:id', petController.getOnePet);
app.delete('/pets/:id',petController.deletePet);
app.post('/pets', petController.addPet);
app.put('/pets/:id', petController.updatePet);
app.get('/examinations',petController.getAllExaminations);
app.get('/pets/:petId/examinations/:eid',petController.getOneExamination);
app.delete('/pets/:petId/examinations/:eid',petController.deleteExamination);
app.post('/pets/:petId/examinations',petController.addExamination);
app.put('/pets/:petId/examinations/:eid', petController.updateExamination);


if (process.env.NODE_ENV !== 'test') {
    app.listen(3000, () => console.log('server started on 3000'));
}

module.exports = app;
