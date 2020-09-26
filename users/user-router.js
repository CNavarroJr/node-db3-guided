const express = require("express");

const db = require("../data/db-config.js");
const Users =  require('./users-model.js');

const router = express.Router();

router.get("/", (req, res) => {
  Users.find()                  // This is used insted of db("users") which is now in our users-model file
    .then(users => {
      res.json(users); 
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get users" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Users.findById(id)             // This is used insted of  db("users").where({ id }) which is now in the models folder 

    .then(users => {
      const user = users[0];

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Could not find user with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get user" });
    });
});


// --------------------------------------------------- //
// GET - /:ID/ POSTS
router.get('/:id/posts', (req, res) => {
  const {id} = req.params;

  // const sql = db('posts as p')
  // .join('users as u', 'u.id', 'p.user_id')
  // .select('p.id', 'u.username', 'p.contents')            This is to get the SQL text that you can use in SQlite Studio
  // .where({user_id: id}).toString();

  console.log(sql)

  Users.findPosts(id)

  .then(posts => {
    res.json(posts)
  })
  .catch(err => {
    res.status(500).json({message: 'error getting posts'})
  })
})


router.post("/", (req, res) => {
  const userData = req.body;

  Users.add(userData)

    .then(ids => {
      res.status(201).json({ created: ids[0] });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new user" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

    Users.update(changes)

    .then(count => {
      if (count) {
        res.json({ update: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update user" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

    Users.remove(id)

    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete user" });
    });
});

module.exports = router;
