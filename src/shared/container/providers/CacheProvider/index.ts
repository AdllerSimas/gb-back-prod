import { container } from 'tsyringe';

import ICacheProvider from './models/ICacheProvider';

import RedisCacheProvider from './implementations/RedisCacheProvider';

const providers = {
  redis: RedisCacheProvider,
};

//a kind of singleton
container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  providers.redis,
);
