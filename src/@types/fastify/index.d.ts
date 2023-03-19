import fastify from 'fastify';

declare module 'fastify' {
  export interface FastifyInstance<
    HttpServer = Server,
    HttpRequest = IncomingMessage,
    HttpResponse = ServerResponse,
  > {
    asyncVerifyJWT: () => void;
    asyncVerifyEmailAndPassword: () => void;
  }
  export interface FastifyRequest {
    user_id: string
  }
}