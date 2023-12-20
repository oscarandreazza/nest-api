import { UserType } from 'src/user/enum/user-type.enum';
import { UserEntity } from 'src/user/interfaces/user.entity';

export class LoginPayload {
  id: number;
  type_user: UserType;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.type_user = user.type_user;
  }
}
