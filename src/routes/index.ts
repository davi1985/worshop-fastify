import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { randomUUID } from 'node:crypto';
import { createUserController } from '../controllers/create-user-controller';

export const routes: FastifyPluginAsync<{ public: boolean }> = async (
  fastify,
) => {
  fastify.setGenReqId(() => randomUUID());
  fastify.decorate('serverVersion', '0.0.1');
  fastify.decorate('sendAnalytics', (request: FastifyRequest) => {
    console.log(`> Saving data for request ${request.id}`);
  });

  fastify.post('/users/:id', createUserController);
};
