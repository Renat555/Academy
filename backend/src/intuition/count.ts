export function count(postgresClient: any) {
  postgresClient.query(
    "CREATE TABLE IF NOT EXISTS count(id serial PRIMARY KEY, date TIMESTAMP NOT NULL, count INT)"
  );

  let date = new Date();
  console.log(date);

  postgresClient.query("SELECT * FROM users", (err: any, res: any) => {
    postgresClient.end();
  });
}
