const express = require("express")


const app = express()
app.use(express.json())


let notes = [
    { 
      "id": 1,
      "name": "sahand", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get("/api/persons",(req,res)=>{
    res.json(notes)
})


app.get("/info", (req, res)=>{
    const info = `<p>Phonebook has info for ${notes.length} people</p><p>${new Date}</p>`
    res.send(info)
})


app.get("/api/persons/:id", (req, res)=>{
    const id = Number(req.params.id)
    const note = notes.find(n=>n.id===id)
    if(note){
        res.json(note)
    }
    else{
        res.status(404).send('Not Found!')
    }
})


app.delete("/api/persons/:id", (req,res)=>{
    const id = Number(req.params.id)
    notes = notes.filter(n=>n.id!==id)
    res.status(204)  
})


const randomNumber = () => {
    const random = Math.floor(Math.random() * (100000000-1+1) + 1)
    // console.log(random);
    return random
}


app.post("/api/persons",(req,res)=>{
    const body  = req.body
    // console.log(req.body);
    // console.log(body.name);
    // console.log(body.number);
    if(!body.name || !body.number){
        return res.status(400).end("Missing name/number.")
    }
    const note = {
        id : randomNumber(),
        name: body.name,
        number: req.body.number,
    }
    notes = notes.concat(note)
    res.status(200).send(`${body.name} added to phonebook.`)
})


const PORT = 3001
app.listen(PORT)