const db = require("../data/db-config.js");

function find() {
  return db('users');
}

function findById(id) {
  return db('users').where({id}).first();
}

function findPosts(id) {
  return  db('posts as p')
  .join('users as u', 'u.id', 'p.user_id')
  .select('p.id', 'u.username', 'p.contents')
  .where({user_id: id});
}

function add(user) {
  return db('users').insert(user, "id");
}

function update(id, changes) {
  return db("users")
      .where({ id })
      .update(changes);  
}

function remove(id) {
  return  db("users")
    .where({ id })
    .del();
}

module.exports = {
  find,
  findById,
  findPosts,
  add,
  update,
  remove
}