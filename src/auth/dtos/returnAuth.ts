import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';

export class ReturnAuth {
  user: ReturnUserDto;
  accessToken: string;
}
