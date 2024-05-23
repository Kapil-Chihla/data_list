import express from "express";
import DataModel from "./Models/models.js";
import cors from "cors";
const app = express();
import connect from "./database/db.js";
const PORT = 5001;
app.use(express.json());
app.use(cors());


app.get('/get', async (req, res) => {
    try {
       const data = await DataModel.find();
       res.json(data);
    } catch (error) {
       res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post("/add" , (req,res) => {
    const firstName = req.body.data.firstName;
    const lastName = req.body.data.lastName;
    const phoneNumber = req.body.data.phoneNumber;
    const email = req.body.data.email;
    const dob = req.body.data.dob;
    DataModel.create({
        firstName : firstName,
        lastName : lastName,
        phoneNumber:phoneNumber,
        email:email,
        dob:dob
    }).then(result => res.json(result))
    .catch(e => res.json(e));
})

app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    try {
       const updatedData = await DataModel.findByIdAndUpdate(id, data, { new: true });
       res.json(updatedData);
    } catch (error) {
       res.status(500).json({ error: 'Internal Server Error' });
    }
 });

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
       await DataModel.findByIdAndDelete(id);
       res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
       res.status(500).json({ error: 'Internal Server Error' });
    }
});

connect().then(() => {
     app.listen(PORT , () => {
        console.log("working server");
     })
})
