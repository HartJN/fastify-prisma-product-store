import { faker } from '@faker-js/faker';
import { test } from 'tap';
import { ImportMock } from 'ts-mock-imports';
import buildServer from '../../../server';
import * as userService from '../user.service';

test('POST `/api/users` - create user successfully with mock createUser', async (t) => {
  const name = faker.name.findName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const id = Math.floor(Math.random() * 1000);

  const fastify = buildServer();

  const stub = ImportMock.mockFunction(userService, 'createUser', {
    name,
    email,
    id,
  });

  t.teardown(() => {
    fastify.close();
    stub.restore();
  });

  const response = await fastify.inject({
    method: 'POST',
    url: '/api/users',
    payload: {
      email,
      password,
      name,
    },
  });

  t.equal(response.statusCode, 201);
  t.equal(response.headers['content-type'], 'application/json; charset=utf-8');

  const json = response.json();

  t.equal(json.name, name);
  t.equal(json.email, email);
  t.equal(json.id, id);
});

test('POST `/api/users` - create user successfully with test database', async (t) => {});

test('POST `/api/users` - fails to create a user', async (t) => {});
