// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// /************
//  * DATABASE *
//  ************/

// // our database is an array for now with some hardcoded values
var todos = [
  { _id: 7, task: 'Laundry', description: 'Wash clothes' },
  { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 44, task: 'Homework', description: 'Make this app super awesome!' }
];

// /**********
//  * ROUTES *
//  **********/

// /*
//  * HTML Endpoints
//  */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// /*
//  * JSON API Endpoints
//  *
//  * The comments below give you an idea of the expected functionality
//  * that you need to build. These are basic descriptions, for more
//  * specifications, see the todosTest.js file and the outputs of running
//  * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
//  * ORDER THAT THE TESTS DICTATE.
//  */

// app.get('/api/todos/search', function search(req, res) {
//    // This endpoint responds with the search results from the
//    // * query in the request. COMPLETE THIS ENDPOINT LAST.
   
// });

app.get('/api/todos', function index(req, res) {
   // This endpoint responds with all of the todos
   res.json({data: todos})
});

app.post('/api/todos', function create(req, res) {
   // This endpoint will add a todo to our "database"
   // * and respond with the newly created todo.
  
   
    var lastToDo = todos[todos.length-1];
    var nextId = lastToDo._id+1;
   
   var newToDo = {
    _id: nextId,
    task: req.body.task,
    description: req.body.description
   }
   todos.push(newToDo)

   res.json(newToDo)
});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   
   var todosToFind = req.params.id;
   var appropriateId = todos.find(function(todosObj){
      return todosObj._id == todosToFind
   });
   res.send(appropriateId);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
//    */
     var idToFind = req.params.id;
     todos.forEach(function(foundToDo){
      if (eachTodo._id === todoIdToUpdate){
       foundToDo.task = req.body.task
       foundToDo.description = req.body.description
      } 
      return foundToDo
     });
     res.json(foundToDo)
 });

// //     

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
//    */
  var idInRoute = req.params.id; 
  todos = todos.filter(function(deletedTodo){
    if (idInRoute != deletedTodo._id){
      return todos 
    }
  });
  res.send("success");
// //     var todosId = params._id;
// //     res.json(msg: "id deleted")
});

// /**********
//  * SERVER *
//  **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
