import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    sendAnalytics: (request: FastifyRequest) => void;
    serverVersion: string;
  }
}
