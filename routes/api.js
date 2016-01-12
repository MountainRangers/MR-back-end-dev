var env = require('dotenv').load();

var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

module.exports = {
  posts: {
    readAll: function(){
      return knex('posts').select();
    },
    readOne: function(response, id){
      knex('posts').select().where({id: id}).then(function(posts){
        return response.send(posts);
      });
    }
  },
  users: {
    read: function(id){
      return knex('users').select().where({id: id}).first();
    },
    readOne: function(id){
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
