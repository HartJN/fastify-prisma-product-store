import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fjwt, { JWT } from '@fastify/jwt';
import swagger from 'fastify-swagger';
import { withRefResolver } from 'fastify-zod';
import userRoutes from './modules/user/user.route';
import { userSchemas } from './modules/user/user.schema';
import { productSchemas } from './modules/product/product.schema';
import productRoutes from './modules/product/product.route';
import { version } from '../package.json';

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT;
  }

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

function buildServer() {
  const server = Fastify();

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

  server.addHook('preHandler', (request, reply, next) => {
    request.jwt = server.jwt;
    return next();
  });

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

  return server;
}

export default buildServer;
