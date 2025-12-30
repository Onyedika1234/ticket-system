// signUpdata extracts and returns relevant fields for user sign-up
export const signUpdata = (body) => {
  return {
    name: body.name,
    email: body.email,
    password: body.password,
    department: body.department,
    programme: body.programme,
  };
};

// loginData extracts and returns relevant fields for user login
export const loginData = (body) => {
  return {
    email: body.email,
    password: body.password,
  };
};

export const roleData = (body) => body.password;
