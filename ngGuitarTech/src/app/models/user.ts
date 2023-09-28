export class User {
  id: number;
  username: string;
  password: string;
  role: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  email: string;

  constructor(
    id: number = 0,
    username: string = "",
    password: string = "",
    role: string = "",
    active: boolean = false,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    lastLogin: Date = new Date(),
    email: string = ""
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
    this.active = active;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.lastLogin = lastLogin;
    this.email = email;
  }
}
