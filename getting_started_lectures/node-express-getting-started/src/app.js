const express = require('express');
const morgan = require('morgan');

const app = express()

//query parameters
const sayHello = (req, res) => { //request, response, next means going to next function
    console.log(req.query);
    const name = req.query.name;
    const conetent = name ? `Hello, ${name}!` : 'Hello!';
    res.send(conetent); //all these are middleware
}

app.get('/ping', (req, res) => {
    res.send("OK");
});



// route parameters && mixing query params and route params
const saySomething = (req, res) => {
    const greeting = req.params.greeting; //acessing rote params
    const name = req.query.name;
    const content = greeting && name ? `${greeting}, ${name}` : `${greeting}!`;
    res.send(content);
};

const sayGoodbye = (req, res) => {
    res.send('Sorry to see you go!');
}
//cleaner code
// app.get("/say/goodbye", (req, res) => {
//     res.send("Sorry to see you go!");
//   });


app.use(morgan("dev"));
app.get('/hola', sayHello); //still loooks at /hello route
app.get('/hello', sayHello); //now to get hello should go to /hello
app.get("/say/goodbye", sayGoodbye);
app.get("/say/:greeting", saySomething);

app.get('/songs', (req, res)=> {
    const title = req.query.title;
    res.send(title);
})
//router-level middleware
const checkForAbbreviationLength = (req, res, next) => {
  const abbreviation = req.params.abbreviation;
  if (abbreviation.length !== 2) {
    next(`State abbreviation '${abbreviation}' is invalid.`);
  } else {
    next();
  }
};


app.get(
  "/states/:abbreviation", 
  checkForAbbreviationLength, 
  (req, res, next) => {
    const abbreviation = req.params.abbreviation;
      res.send(`${abbreviation} is a nice state, I'd like to visit.`);
    }
);

  app.get(
    "/travel/:abbreviation", 
    checkForAbbreviationLength,
    (req, res, next) => {
      // const abbreviation = req.params.abbreviation;
      res.send(`Enjoy your trip to ${req.params.abbreviation}!`);
    }
    );
// app.use(checkForAbbreviationLength); //dont use app level middleware in abopve case because will fail if abbreviation is not used

    // Not-found handler
app.use((req, res, next) => {
    res.send(`The route ${req.path} does not exist!`);
  });
// Error handler only arised in 2 cases like code error or invoke using next()
app.use((err, req, res, next) => {
    console.error(err);
    res.send(err);
  });



module.exports = app;