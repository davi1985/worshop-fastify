import Fastify from 'fastify';
import { routes } from './routes';

const fastify = Fastify();

fastify.register(routes, {
  prefix: '/admin',
  public: true,
});

const hello = () => Math.random();
console.log(hello());
fastify.setErrorHandler((_, __, reply) => {
  reply.code(500).send({ error: 'Internal Server error' });
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
