import { signUpdata } from "../utils/dtos";
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

  if (
    department !== "SCIENCE" ||
    department !== "COMMERCIAL" ||
    department !== "ART"
  ) {
    const err = new Error("Department can eithr be Science, Commercial or Art");
    err.statusCode = 400;
    throw err;
  }

  if (
    programme !== "WAEC" ||
    programme !== "NECO" ||
    programme !== "UTME" ||
    programme !== "GCE" ||
    programme !== "POST_UTME" ||
    programme !== "JUPEB"
  ) {
    const err = new Error(
      "Program selected is not offered in this institution."
    );
    err.statusCode = 400;
    throw err;
  }

  req.credentials = { name, email, password, department, programme };

  next();
};
