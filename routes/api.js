var env = require('dotenv').load();

var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

module.exports = {
  posts: {
    readAll: function() {
      return knex('posts').select(
        'posts.id as post_id',
        'posts.created_at as post_created_at',
        'posts.title as post_title',
        'posts.latitude as lat',
        'posts.longitude as long',
        'posts.body as posts_body',
        'users.photo_url as photo_url',
        'users.username as username',
        'tags.name as tag_name'
      ).innerJoin("users", "posts.user_id", "users.id")
      .innerJoin("posts_tags", "posts.id", "posts_tags.post_id")
      .innerJoin("tags", "tags.id", "posts_tags.tag_id")
      .orderBy('post_created_at', 'desc');
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
        console.log(err);
      });
    },
    deleteOne: function(id){
       return knex('posts').where({'posts.id': id}).del();
    }
  },
  users: {
    getUsersPosts: function(id) {
      return Promise.all([
        knex('users').select().where({
          id: id
        }).first(),
        knex('posts').select().where({
          id: id
        })
      ]).then(function(data){
        return Promise.resolve({
          user: data[0],
          post: data[1]
        })
      }).catch(function(error){
        console.log('alex messed up!')
      })
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
