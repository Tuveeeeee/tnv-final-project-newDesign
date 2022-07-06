export interface User {
  name: string;
  surname: string;
  username: string;
  id: number;
  faction: string;
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  surname: string;
  username: string;
  password: string;
  faction: string;
}


