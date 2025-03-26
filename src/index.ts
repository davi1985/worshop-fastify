import Fastify, { type FastifyRequest } from 'fastify';

const fastify = Fastify();

type Request = FastifyRequest<{
  Params: { id: string };
  Querystring: { page: string };
  Body: { name: string };
  Headers: { org: string };
}>;

fastify.post('/users/:id', (request: Request, reply) => {
  const { body, headers, query, params } = request;

  if(!body.name) {
    return reply.code(400).send({message: 'body is missing'});
  }

  reply.headers({
    'hearer1': 'header 1 value',
    'hearer2': 'header 2 value',
  });

  console.log(reply.getHeaders());

  reply.code(201).send({
    params: {
      id: params.id,
    },
    query: {
      page: query.page,
    },
    body: {
      name: body.name,
    },
    headers: {
      org: headers.org,
    },
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
