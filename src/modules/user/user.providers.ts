import { User } from './entity/user.entity';
import { USER_REPOSITORY } from '../../lib/constant';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
