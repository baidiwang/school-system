const express = require('express');
const app = express();
const path = require('path');
const db = require('../db');
const { faker } = require('@faker-js/faker');
const { Student, Campus } = db;

app.use(express.json());
// static middleware
app.use('/dist', express.static(path.join(__dirname, '../dist')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});


app.get('/students', async(req, res, next)=> {
    try{
        res.send(await Student.findAll({ include: Campus }));
    }
    catch(ex){
        next(ex);
    }
});

app.post('/students',async(req, res, next)=> {
    try{
        res.send(await Student.create(req.body));
    }
    catch(ex){
        next(ex);
    }
})

app.get('/students/:id', async(req, res, next)=> {
    try{
        res.send(await Student.findByPk(req.params.id, { include: Campus }));
    }
    catch(ex){
        next(ex);
    }
});

app.put('/students/:id', async(req, res, next)=> {
    try{
        const { firstName, lastName, email, imageUrl, gpa, campusId } = req.body;
        const student = await Student.findByPk(req.params.id);
        if (student) {
            student.firstName = firstName;
            student.lastName = lastName;
            student.email = email;
            student.imageUrl = imageUrl;
            student.gpa = gpa;
            student.campusId = campusId;
            res.send(await student.save());
        } else {
            res.status(404).send();
        }
    }
    catch(ex){
        next(ex);
    }
});

app.delete('/students/:id', async(req, res, next)=> {
    try{
        // is there any other way to use without using where?
        await Student.destroy({ where: { id: req.params.id } })
        res.send();
    }
    catch(ex){
        next(ex);
    }
});

app.get('/campuses', async(req, res, next)=> {
    try{
        res.send(await Campus.findAll({ include: Student }));
    }
    catch(ex){
        next(ex);
    }
});

app.post('/campuses',async(req, res, next)=> {
    try{
        res.send(await Campus.create(req.body));
    }
    catch(ex){
        next(ex);
    }
})


app.get('/campuses/:id', async(req, res, next)=> {
    try{
        res.send(await Campus.findByPk(req.params.id, { include: Student }));
    }
    catch(ex){
        next(ex);
    }
});

app.put('/campuses/:id', async(req, res, next)=> {
    try{
        const { name, address, description, imageUrl } = req.body;
        const campus = await Campus.findByPk(req.params.id);
        if (campus) {
            campus.name = name;
            campus.address = address;
            campus.description = description;
            campus.imageUrl = imageUrl;
            res.send(await campus.save());
        } else {
            res.status(404).send();
        }
    }
    catch(ex){
        next(ex);
    }
});

app.delete('/campuses/:id', async(req, res, next)=> {
    try{
        await Campus.destroy({ where: { id: req.params.id } })
        res.send();
    }
    catch(ex){
        next(ex);
    }
});


app.use((err, req, res, next)=> {
    console.log(err);
    res.status(err.status || 500).send({err});
});


const init = async() => {
    try{
        await db.conn.sync({ force: true });
        const campuses = [];
         //why i < 2?
        for(let i = 0; i < 100; i++) {
            const campus = await Campus.create({
                name: faker.name.findName(),
                imageUrl: faker.image.business(),
                address: faker.address.streetAddress(),
                // why words(5)
                description: faker.random.words(5)

            });
            campuses.push(campus);
        }

        for (let i = 0; i < 100; i++) {
            await Student.create({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                imageUrl: faker.image.avatar(),
                // avatar how to use?
                gpa: faker.finance.amount(0, 4, 2),
                campusId: campuses[i % campuses.length].id,
            });
        }
}
catch(ex){
    console.log(ex);
  }
}

init();

module.exports = app;
