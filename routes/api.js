var env = require('dotenv').load();

var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

module.exports = {
  posts: {
    readAll: function(){
      return knex('posts').select().innerJoin("users", "posts.user_id", "users.id");
    },
    readOne: function(response, id){
      knex('posts').select().where({id: id});
    }
  },
  users: {
    getUser: function(id){
      return knex('users').select().where({id: id}).first();
    },
    getUser_googleid: function(id){
      return knex('users').select().where({google_id: id}).first();
    },
    readAll: function(response){
      return knex('users').select();
    },
    createUser: function(user) {
      return knex('users').insert(user, 'id');
    }
  }
};
