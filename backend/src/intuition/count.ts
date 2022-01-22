function createTable(postgresClient: any) {
  return new Promise((resolve, reject) => {
    postgresClient.query(
      "CREATE TABLE IF NOT EXISTS count(id serial PRIMARY KEY, date TIMESTAMPTZ NOT NULL, count INT)",
      (err: any, res: any) => {
        resolve("");
      }
    );
  });
}

function selectLastCount(postgresClient: any) {
  return new Promise((resolve, reject) => {
    postgresClient.query(
      "SELECT * FROM count ORDER BY id DESC LIMIT 1",
      (err: any, res: any) => {
        resolve(res);
      }
    );
  });
}

export async function count(postgresClient: any) {
  createTable(postgresClient)
    .then(() => selectLastCount(postgresClient))
    .then((res: any) => {
      if (res.rows.length === 0) {
        postgresClient.query("INSERT INTO count (date, count) VALUES($1, 1)", [
          new Date(),
        ]);
      } else {
        let lastActivity = res.rows[0].date;
        let today = new Date();
        if (
          lastActivity.getDate() == today.getDate() &&
          lastActivity.getMonth() == today.getMonth() &&
          lastActivity.getFullYear() == today.getFullYear()
        ) {
          postgresClient.query("UPDATE count SET count = $1 WHERE date = $2", [
            res.rows[0].count + 1,
            res.rows[0].date,
          ]);
        } else {
          postgresClient.query(
            "INSERT INTO count (date, count) VALUES($1, 1)",
            [new Date()]
          );
        }
      }
    });
}
