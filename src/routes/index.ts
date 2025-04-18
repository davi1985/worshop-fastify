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

  fastify.decorateRequest('user', null);
  fastify.decorateReply('hbs', function (template, variables) {
    console.log(this);

    this.code(2001).send({
      template,
      variables,
    });
  });

  fastify.post('/users/:id', createUserController);
};
