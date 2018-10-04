const checkIsEmail = (email) => {
  const regexEmail = /^\S+@\S+\.\S{2,}$/;
  return regexEmail.test(email);
};

export default checkIsEmail;
