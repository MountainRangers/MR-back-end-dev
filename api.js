var env = require('dotenv').load();
var knex = require('knex')({
  client: 'pg',
  connection: process.env.LOCAL_CONNECT 
});
//function runQuery(query, parameters) {
//  return new Promise(function (resolve, reject) {
//    pg.connect(connectionString, function (err, client, done) {
//      if (err) {
//        console.error(err)
//        reject(err)
//        done()
//        return
//      }
//      client.query(query, parameters, function (err, results) {
//        done()
//        if (err) {
//          console.error(err)
//          reject(err)
//          return
//        }
//        resolve(results)
//      })
//    })
//  })
//}

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
  city: {
    create: function (name) {
      return runQuery('INSERT INTO cities VALUES (default, $1);', [name])
    },
    read: function (id) {
      return runQuery('SELECT * FROM cities WHERE cities.id=$1;', [id])
    },
    update: function (id, name) {
      return runQuery('UPDATE cities SET city=$2 WHERE id=$1;', [id, name])
    },
    'delete': function (id) {
      return runQuery('DELETE FROM cities WHERE cities.id=$1;', [id])
    }
  }
}

