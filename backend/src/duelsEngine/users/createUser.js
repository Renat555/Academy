async function createUser(connection, user, response) {
  let createTableSql = `create table if not exists users(
    id int primary key auto_increment,
    name varchar(255) not null,
    password varchar(255) not null
  )`;

  let createUserSql =
    "INSERT INTO users(name, password) VALUES('" +
    user.username +
    "', '" +
    user.password +
    "')";

  connection.query(createTableSql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("table created");
    connection.query(createUserSql, (err, result) => {
      if (err) {
        response.send(JSON.stringify(err));
      }
      response.send("user created");
    });
  });
}

module.exports = createUser;
