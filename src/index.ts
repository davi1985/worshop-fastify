import Fastify from 'fastify';

const fastify = Fastify();

fastify.post('/users/:id', (request) => {
  const { body, headers, query, params } = request;

  return { params, query, body, headers };
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
