import { Login } from '../models/login';

export class LoginService {
  getJwt({ username, password }) {
    return Login(username, password);
  }
}
