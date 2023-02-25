import Fastify, { fastify, FastifyReply, FastifyRequest } from 'fastify';
import fjwt from '@fastify/jwt';
import swagger from 'fastify-swagger';
import { withRefResolver } from 'fastify-zod';
import userRoutes from './modules/user/user.route';
import { userSchemas } from './modules/user/user.schema';
import { productSchemas } from './modules/product/product.schema';
import productRoutes from './modules/product/product.route';
import { version } from '../package.json';

export const server = Fastify();

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

server.register(fjwt, {
  secret: 'as;lkasas;lkasflk4;l6kwe;4lr6ksd9gsdgsdgsdg98sed6tskjlsdfgsdf',
});

server.decorate(
  'authenticate',
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (error: any) {
      console.error(error);
      return reply.send(`Error: ${error.message}`);
    }
  }
);

server.get('/healthcheck', async () => {
  return { status: 'OK' };
});

async function main() {
  for (const schema of [...userSchemas, ...productSchemas]) {
    server.addSchema(schema);
  }

  server.register(
    swagger,
    withRefResolver({
      routePrefix: '/docs',
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: 'Fastify API',
          description: 'Product store API',
          version,
        },
      },
    })
  );

  server.register(userRoutes, { prefix: '/api/users' });
  server.register(productRoutes, { prefix: '/api/products' });

  try {
    await server.listen(3000, '0.0.0.0');
    console.log(`Server listening on http://localhost:3000`);
  } catch (error) {
    console.error(`Error starting server: ${error}`);
    process.exit(1);
  }
}

main();
