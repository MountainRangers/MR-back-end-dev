var env = require('dotenv').load();
var knex = require('knex')({
  client: 'pg',
  connection: process.env.LOCAL_CONNECT 
});

module.exports = {
  posts: {
    readAll: function(response){
      knex('posts').select().then(function(posts){
        return response.send(posts);
      })
    },
    readOne: function(response, id){
      knex('posts').select().where({id: id}).then(function(posts){
        return response.send(posts);
      })
    }
  },
  users: {
    readOne: function(response, id){
      knex('users').select().where({id: id}).then(function(posts){
        return response.send(posts);
      })
    },
    readAll: function(response){
      knex('users').select().then(function(posts){
        return response.send(posts);
      })
    }
  }
}

