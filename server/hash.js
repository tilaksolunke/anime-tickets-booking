const bcrypt = require("bcryptjs");

const newPassword = "Uday1234#"; // ← new password for admin
bcrypt.hash(newPassword, 10, (err, hash) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Hashed password:", hash);
  }
});
