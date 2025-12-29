export const signUpdata = (body) => {
  return {
    name: body.name,
    email: body.email,
    password: body.password,
    department: body.department,
    programme: body.programme,
  };
};

export const loginData = (body) => {
  return {
    email: body.email,
    password: body.password,
  };
};
