import Fastify, { type FastifyRequest } from 'fastify';
import { randomUUID } from 'node:crypto';

const fastify = Fastify();

fastify.setErrorHandler((error, request, reply) => {
  console.log({ error });
  reply.code(500).send({ error: 'Internal Server error' });
});

type Request = FastifyRequest<{
  Params: { id: string };
  Querystring: { page: string };
  Body: { name: string };
  Headers: { org: string };
  Reply: {
    201: {
      id: string;
    };
    '4xx': {
      code: string;
      message: string;
    };
  };
}>;

fastify.post('/users/:id', async (request: Request, reply) => {
  const { body } = request;

  if (!body.name) {
    throw new Error('name is required');
  }

  reply.headers({
    hearer1: 'header 1 value',
    hearer2: 'header 2 value',
  });

  reply.code(201).send({
    id: randomUUID(),
  });
});

async function main() {
  try {
    const host = await fastify.listen({ port: 3000 });
    console.log(`> Server started at ${host}`);
  } catch (err) {
    console.log({ err });
  }
}

main();
