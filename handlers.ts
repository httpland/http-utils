/** HTTP request handler. */
export type Handler = (req: Request) => Promise<Response> | Response;
