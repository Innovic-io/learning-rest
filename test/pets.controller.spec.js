require('jest');
const app = require('../index');
const pets = require('../data');
const request = require('supertest');

describe("Unit test for pets controller", () => {
    describe("GET testing", () => {
        it("should get all pets", (done) => {
            return request(app)
                .get("/pets")
                .expect(pets)
                .expect(200)
                .then(() => done());
        });
        it('should get one pet', async () => {
            const pet = pets.find((el) => el);
            await request(app)
                .get(`/pets/${pet.id}`)
                .expect(pet)
                .expect(200);

        });

        it('should get all examinations', async () => {
            const examinations = pets.filter((el) => el.examinations).map((el) => (el.examinations));
            await request(app).get("/examinations").expect(examinations).expect(200);
        });
        it('should get one examination', async () => {
            const pet = pets.find((el) => el.examinations);
            const petId = pet.id;
            const examId = pet.examinations.find((el) => el).id;
            await request(app).get(`/pets/${petId}/examinations/${examId}`).expect(pet.examinations.find((el) => el.id === examId));
        });
        it('should get an empty object when ID is wrong', async () => {
            const petId = ;
            const res = await request(app).get(`/pets/${petId}`).expect(400);
            expect(res.body).toEqual({"error": "Pet does not exist"});
        });
    });
    describe("POST testing", () => {
        it('should add one pet', async () => {
            const petToAdd = {
                name: "Ppaaa",
                tags: 3,
                status: "alive",
                breed: "Dalmatian",
                age: 2
            };
            const res = await request(app).post('/pets').send(petToAdd).expect(201);
            petToAdd.id = res.body.id;
            expect(petToAdd).toEqual(res.body);
        });
        it('should add one examination', async () => {
            const petToAdd = {
                name: "Ppaaa",
                tags: 3,
                status: "alive",
                breed: "Dalmatian",
                age: 2
            };
            const pet = pets.find((el) => el.examinations);
            const petId = pet.id;
            const res = await request(app).post(`/pets/${petId}/examinations/`).send(petToAdd).expect(201);
            petToAdd.id = res.body.id;
            expect(petToAdd).toEqual(res.body);
        });
    });
    describe('DELETE testing', () => {
        it('should delete pet', async () => {
            const pet = pets.find((el) => el);
            const petId = pet.id;
            const res = await request(app).delete(`/pets/${petId}`).expect(200);
            expect(pet).toEqual(res.body);
        });
        it('should delete examination', async () => {
            const pet = pets.find((el) => el.examinations);
            const petId = pet.id;
            const exam = pet.examinations.find((el) => el.id);
            const examId = exam.id;
            const res = await request(app).delete(`/pets/${petId}/examinations/${examId}`).expect(200);
            expect([exam]).toEqual(res.body);
        });
    });
    describe('PUT testing', () => {
        it('should update pet', async () => {
            const update = {
                name: "Ppaaa",
                tags: 3,
                status: "alive",
                breed: "Dalmatian",
                age: 2
            };
            const pet = pets.find((el) => el);
            const petId = pet.id;
            const updatePet = Object.assign({}, pet, update);
            const res = await request(app).put(`/pets/${petId}`).send(update).expect(200);
            expect(updatePet).toEqual(res.body);

        });
        it('should update examination', async () => {
            const update = {
                age: 2
            };
            const pet = pets.find((el) => el.examinations);
            const petId = pet.id;
            const exam = pet.examinations.find((el) => el.id);
            const examId = exam.id;
            const updateExam = Object.assign({}, exam, update);
            const res = await request(app).put(`/pets/${petId}/examinations/${examId}`).send(update).expect(200);
            expect(updateExam).toEqual(res.body);

        });
    });
});