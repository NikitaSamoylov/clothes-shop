export type TInputsSignup = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type TInputsLogin = Pick<
  TInputsSignup, 'email' | 'password'
>;


