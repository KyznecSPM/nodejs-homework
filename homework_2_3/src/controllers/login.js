import { LoginService } from '../services/login.service';

const Login = new LoginService();

export const getLoginJwt = async (req, res) => {
  const { login, password } = req.body;

  res.send(Login.getJwt({ login, password }));
};
