import factory from 'factory-girl';
import faker from 'faker';
import { UserModel } from '@messaging/model';

factory.define('user', UserModel, {
  email: () => faker.internet.email(),
  username: () => faker.internet.userName(),
  name: () => faker.name.findName(),
  password: () => faker.internet.password(),
});
