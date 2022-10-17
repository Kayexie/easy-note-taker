let express = require ('express');
let path = require ('path');
const api = require('./routes/index');

let PORT = 3001;
let app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/api', api);

//get route for the homepage
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
)

//get route for the notes page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)

//launch the page
app.listen(PORT, () =>
   console.log(`Server listening at http://localhost:${PORT}`)
)