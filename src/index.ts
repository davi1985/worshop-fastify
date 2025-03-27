import Fastify, { type FastifyRequest } from 'fastify';
import { randomUUID } from 'node:crypto';

const fastify = Fastify();

type Request = FastifyRequest<{
  Params: { id: string };
  Querystring: { page: string };
  Body: { name: string };
  Headers: { org: string };
  Reply: {
    201: {
      id: string
    },
    '4xx': {
      code:string,
      message: string
    }
  }
}>;

fastify.post('/users/:id', async(request: Request, reply) => {
  const { body   } = request;

  if(!body.name) {
    return reply.code(400).send({
      code: 'VALIDATION_ERROR',
      message: 'any error message'
    });
  }

  reply.headers({
    'hearer1': 'header 1 value',
    'hearer2': 'header 2 value',
  });

  console.log(reply.getHeaders());

  reply.code(201).send({
    id: randomUUID()
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
