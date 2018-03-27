// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 7, task: 'Laundry', description: 'Wash clothes' },
  { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 44, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

// app.get('/api/todos/search', function search(req, res) {
//    This endpoint responds with the search results from the
//    * query in the request. COMPLETE THIS ENDPOINT LAST.
   
// });

app.get('/api/todos', function index(req, res) {
   // This endpoint responds with all of the todos
   res.json(todos)
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
    // var newToDo =
    //   { _id: 88, task: 'Pay bills', description: 'Rent, internet and PG&E for upcoming month' };
    var number = req.body._id;
    var duty = req.body.task;
    var info = req.body.description;
    var newToDo = {_id: number, task: duty, description: info};
    todos.push(newToDo);
    res.jsonp(newToDo);
});


app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   var todosId =.params._id;
   var appropriateId = todos.filter(function(todosObj){
      return todosObj.id == todosId;
   });
   response.send(appropriateId);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
     var id = req._id;

     var id = _.extend(id, req.body._id);

     id.save(function(err){
     if (err){
        return res.send('/id',{
        errors: err.errors,
        id: id
     });
   } else {
    res.jsonp(id);
   }

});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
    var todosId = params._id;
    res.json(msg: "id deleted")
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
