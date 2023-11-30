import { UserEntity } from '../interfaces/user.entity';

export class ReturnUserDto {
  id: number;
  name: string;
  email: string;
  image_url: string;

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.image_url = userEntity.image_url;
  }
}
