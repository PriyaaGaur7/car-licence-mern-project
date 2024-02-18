export const host = "http://localhost:5000";
export const signupRoute = `${host}/api/auth/signup`;
export const loginRoute = `${host}/api/auth/login`;
export const userViewProfile = (userId) =>
  `${host}/api/user/user-details/${userId}`;
export const userUpdateProfile = (userId) =>
  `${host}/api/user/update-profile/${userId}`;
export const submitTest = (userId) => `${host}/api/user/score/${userId}`;
export const updateImage = (userId) =>
  `${host}/api/user/upload-image/${userId}`;
