import { UserEntity } from 'src/user/interfaces/user.entity';

export class LoginPayload {
  id: number;
  email: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.email = user.email;
  }
}
