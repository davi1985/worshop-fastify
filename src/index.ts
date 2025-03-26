import Fastify from 'fastify';

const fastify = Fastify();

fastify.route({
  method: 'GET',
  url: '/teste',
  handler: () => ({
    hello: 'rota de test',
  }),
});

fastify.get('/outro-teste', () => ({ hello: 'outro teste' }));

async function main() {
  try {
    const host = await fastify.listen({ port: 3000 });
    console.log(`> Server started at ${host}`);
  } catch (err) {
    console.log({ err });
  }
}

main();
