const express = require('express');
const app = express();
const PORT = 3000;

playlist = [
    {
        "id": 1,
        "name": "Bohemian Rhapsody",
        "artist": "Queen",
        "album": "A Night at the Opera",
        "genre": "Rock"
    },
    {
        "id": 2,
        "name": "Imagine",
        "artist": "John Lennon",
        "album": "Imagine",
        "genre": "Pop"
    }
];

app.listen(PORT, () => console.log(`API running on port ${PORT}`));

//Route to get specific song or all
app.get('/playlist', (req, res) => {
    console.log(JSON.stringify(req.query), req.query, req.query.id);
    
    if (req.query.all) {
        console.log("success");
        validation(req.params.id)
    }
    else {
        validation(req.params.id, req.query)
    }
    
});

//Route to add new song
app.post('/playlist', (req, res,) => {
    validation(req.params.id, req.query)
});

//Route to update song
app.put('/playlist', (req, res) => {
    validation(req.params.id, req.query)
});

//Route to delete song
app.delete('/playlist', (req, res) => {
    validation(req.params.id, req.query)
   
});


async function validation(id, query){


}