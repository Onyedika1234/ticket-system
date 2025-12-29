import { signUpdata, loginData, roleData } from "../utils/dtos.js";
export const validateSignUp = (req, res, next) => {
  let { name, email, password, department, programme } = signUpdata(req.body);

  if (!name || !email || !password || !department || !programme) {
    const err = new Error("Input all credentials");
    err.statusCode = 400;
    throw err;
  }
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof department !== "string" ||
    typeof programme !== "string"
  ) {
    const err = new Error("Unprocessable entities");
    err.statusCode = 429;
    throw err;
  }
  name = name.trim();
  email = email.trim();
  password = password.trim();
  department = department.trim().toUpperCase();
  programme = programme.trim().toUpperCase();

  const validDepartments = ["SCIENCE", "COMMERCIAL", "ART"];
  if (!validDepartments.includes(department)) {
    const err = new Error(
      "Department can either be Science, Commercial or Art"
    );
    err.statusCode = 400;
    throw err;
  }

  const validProgrammes = ["WAEC", "NECO", "UTME", "GCE", "POST_UTME", "JUPEB"];
  if (!validProgrammes.includes(programme)) {
    const err = new Error(
      "Program selected is not offered in this institution."
    );
    err.statusCode = 400;
    throw err;
  }

  req.credentials = { name, email, password, department, programme };

  next();
};

export const validateLogin = (req, res, next) => {
  let { email, password } = loginData(req.body);

  if (!email || !password) {
    const err = new Error("All credentials must be provided");
    err.statusCode = 400;
    throw err;
  }
  if (typeof email !== "string" || typeof password !== "string") {
    const err = new Error("Unprocessable entities");
    err.statusCode = 400;
    throw err;
  }
  email = email.trim();
  password = password.trim();

  req.logins = { email, password };

  next();
};

export const validateRole = (req, res, next) => {
  let password = roleData(req.body);

  if (!password) {
    const err = new Error("Admin Password is required");
    err.statusCode = 400;
    throw err;
  }

  if (typeof password !== "string") {
    const err = new Error("Unprocessable entities");
    err.statusCode = 400;
    throw err;
  }

  password = password.trim();

  req.adminPassword = password;
  next();
};
