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
app.put("/pokedex/:id", (req, res) => {
   
   
    pokedex[req.params.id] = {
        name: req.body.name,
        img: req.body.img,

        stats:  {
        hp: req.body.hp,
        attack: req.body.attack,
        defense: req.body.defense,
        spattack: req.body.spattack,
        spdefense: req.body.spdefense,
        speed: req.body.speed,
      },



    }
    res.redirect("/pokedex") 
  })

//Create 
app.post("/pokedex", (req, res) => {
   
    pokedex.unshift(

       {
        name: req.body.name,
        img: req.body.img,
        
  
        stats:  {
        hp: req.body.hp,
        attack: req.body.attack,
        defense: req.body.defense,
        spattack: req.body.spattack,
        spdefense: req.body.spdefense,
        speed: req.body.speed,
        
      },
        type: [
            req.body.type
        ],
        type: [
            req.body.type
        ]
          
        
    }),
  



    
    console.log(pokedex)
    res.redirect("/pokedex")
})

   

//Edit 
app.get("/pokedex/:id/edit", (req, res) => {
    res.render(
      "edit.ejs", //render views/edit.ejs
      {
        //pass in an object that contains
        allPokemon: pokedex[req.params.id], //the fruit object
        index: req.params.id, //... and its index in the array
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
