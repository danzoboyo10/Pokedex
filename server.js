// require dependencies
const express = require('express');
const methodOverride = require("method-override");
const pokedex = require('./models/pokemon');

// initialize express application
const app = express();

// configure application settings
const port = 3000;

// this adds data to req.body so we can access it in the create action
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))

//Index
app.get('/pokedex/', (req, res) => {
    res.render('index.ejs', { allPokemon: pokedex });
    // ^-- this is just a descriptive way of referencing our pokedex array inside index.ejs
});
// New

app.get("/pokedex/new", (req, res) => {
    res.render('new.ejs')
});

//Destroy
app.delete("/pokedex/:indexOfPokedexArray", (req, res) => {
    pokedex.splice(req.params.indexOfPokedexArray, 1) //remove the item from the array
    res.redirect("/pokedex") //redirect back to index route
  });

//Update
app.put("/pokedex/:indexOfPokedexArray", (req, res) => {
    //:indexOfFruitsArray is the index of our fruits array that we want to change
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false
    }
    pokedex[req.params.indexOfPokedexArray] = req.body //in our fruits array, find the index that is specified in the url (:indexOfFruitsArray).  Set that element to the value of req.body (the input data)
    res.redirect("/pokedex") //redirect to the index page
  })

//Create 
app.post("/fruits", (req, res) => {
    if (req.body.readyToEat === "on") {
        //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true //do some data correction
    } else {
        //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false //do some data correction
    }
    pokedex.push(req.body)
    console.log(pokedex)
    res.redirect("/pokedex")
})

//Edit 
app.get("/pokedex/:indexOfPokedexArray/edit", (req, res) => {
    res.render(
      "edit.ejs", //render views/edit.ejs
      {
        //pass in an object that contains
        pokedexKey: pokedex[req.params.indexOfPokedexArray], //the fruit object
        index: req.params.indexOfPokedexArray, //... and its index in the array
      }
    )
  })

//Show

app.get('/pokedex/:indexOfPokedexArray', (req, res) => {
    // render is a special method that
    // informs the template engine to render a template
    // we just provide the name as a string
    res.render('show.ejs', {
        allPokemon: pokedex[req.params.indexOfPokedexArray] // this references a single fruit
        // and passes it to the template so we can access it there
    });
});



// tell the app to listen
app.listen(port, () => {
    console.log(`Listening on port`, port)
});
