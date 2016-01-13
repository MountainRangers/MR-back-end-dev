var env = require('dotenv').load();

var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

module.exports = {
  posts: {
    readAll: function() {
      return knex('posts').select().innerJoin("users", "posts.user_id", "users.id");
    },
    readOne: function(id) {
      return Promise.all([
        knex('tags').select('tags.id as id', 'tags.name as name')
        .innerJoin('posts_tags', 'posts_tags.tag_id', 'tags.id').where({
          'posts_tags.post_id': id
        }),
        knex('posts').select('posts.*', 'users.photo_url as photo_url')
        .innerJoin('users', 'posts.user_id', 'users.id').where({
          'posts.id': id
        })
      ]).then(function(data) {
        return Promise.resolve({
          posts: data[1],
          tags: data[0]
        });
      }).catch(function(err) {
        console.log('ben fucked up:', err);
      });
    }
  },
  users: {
    getUserPosts: function(id) {
      return knex('users').select().where({
        id: id
      }).first();
    },
    getUser: function(id) {
      return knex('users').select().where({
        id: id
      }).first();
    },
    getUser_GoogleID: function(id) {
      return knex('users').select().where({
        google_id: id
      }).first();
    },
    readAll: function(response) {
      return knex('users').select();
    },
    createUser: function(user) {
      return knex('users').insert(user, 'id');
    }
  }
};
