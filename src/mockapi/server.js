import express from 'express';
// import { users } from './mockData.js';
import cors from 'cors';
import bodyParser from 'body-parser'





const app = express();
app.use(cors());

app.use(bodyParser.json());

let users = [
  {
      id:1,
      name:"Raju",
      mobile:"9743641208",
      email:"example@bz.com"
  },
  {
      id:2,
      name:"Raju King",
      mobile:"9743641208",
      email:"example@bz.com"
  },
  {
      id:3,
      name:"Raju Navi",
      mobile:"9743641208",
      email:"example@bz.com"
  },
]


app.post('/api/adduser', (req, res) => {
  const data = req.body;
  let { id } = users.slice(-1)[0];
  if(data) {
    data.id = id + 1;
    users.push(data);
  }
  res.status(200).json(users);
});

app.delete('/api/delete/:id', (req, res) => {
  const id = req.params.id;
  users = users.filter(user => user.id !== parseInt(id));
  res.status(200).json(users);
})

app.put('/api/update/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  users = users.map(user => {
    if(user.id === parseInt(id)) {
      return { ...user, ...data };
    }
    return user
  });
res.status(200).json(users);
})


// Define routes
app.get('/api/users', (req, res) => {
    res.json(users);
  });
  
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});


  
// Error handling middleware for invalid routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Invalid route' });
});

// Error handling middleware for internal server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});
  
  // Start the server
  const port = 3001; 
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });