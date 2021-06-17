import { Sequelize } from 'sequelize-typescript';
import { User } from '../../modules/user/entity/user.entity';
import { ConfigService } from '@nestjs/config';
import { SEQUELIZE } from '../../lib/constant';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async (configService: ConfigService) => {
      const host = configService.get('DATABASE_HOST');
      const port = configService.get('DATABASE_PORT');
      const database = configService.get('DATABASE_NAME');
      const dialect = configService.get('DATABASE_DIALECT');
      const username = configService.get('DATABASE_USER');
      const password = configService.get('DATABASE_PASSWORD');
      const sequelize = new Sequelize({
        dialect,
        host,
        port,
        username,
        password,
        database,
      });
      try {
        await sequelize.authenticate();
        console.log('数据库链接成功:', host, port);
      } catch (error) {
        console.error('数据库连接失败:', host, port, error);
      }
      sequelize.addModels([User]);
      return sequelize;
    },
    inject: [ConfigService],
  },
];
