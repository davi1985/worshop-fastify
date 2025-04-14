import { FastifyReply, FastifyRequest } from 'fastify';
import { randomUUID } from 'node:crypto';

export const createUserController = (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  request.server.sendAnalytics(request);
  console.log(request.server.serverVersion);

  reply.code(201).send({
    id: randomUUID(),
  });
};
