// small helper for input validation
function validateRegister({ name, email, password }) {
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = "Name must be at least 2 characters";
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.email = "Valid email required";
  if (!password || password.length < 6) errors.password = "Password must be at least 6 characters";
  return { valid: Object.keys(errors).length === 0, errors };
}

module.exports = { validateRegister };
