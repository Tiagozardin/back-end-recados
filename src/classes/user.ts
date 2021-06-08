import { v4 as uuidv4 } from 'uuid';

class User {
    public username: string;
    public password: string;

    constructor(username: string, password: string) {
      this.username= username;
      this.password = password;
    }
};

export default User;