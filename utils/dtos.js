export const signUpdata = (body) => {
  return {
    name: body.name,
    email: body.email,
    password: body.email,
    department: body.department,
    programme: body.programme,
  };
};
