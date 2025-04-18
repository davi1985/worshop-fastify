import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    sendAnalytics: (request: FastifyRequest) => void;
    serverVersion: string;
  }

  interface FastifyRequest {
    user: null | { id: string };
  }

  interface FastifyReply {
    hbs(template: string, variables: Record<string, unknown>): void;
  }
}
