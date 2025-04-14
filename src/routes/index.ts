import { FastifyPluginAsync } from 'fastify';
import { randomUUID } from 'node:crypto';

export const routes: FastifyPluginAsync<{ public: boolean }> = async (
  fastify,
  options,
) => {
  console.log({ options });
  fastify.post('/users/:id', async (request, reply) => {
    reply.code(201).send({
      id: randomUUID(),
    });
  });
};
