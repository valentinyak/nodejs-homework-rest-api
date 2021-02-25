const app = require("../app");
const db = require("../model/db");

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, () => {
    console.log(
      `Database connection successful.\n Server running on port: ${PORT}`
    );
  });
}).catch((error) => {
  console.log(
    `Database connection failed.\n Server not running. Error message: ${error.message}`
  );
  process.exit(1);
});
