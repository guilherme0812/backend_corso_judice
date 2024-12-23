export function createResponse(message: string, status?: number, data?: any) {
  return { message, status, data };
}
