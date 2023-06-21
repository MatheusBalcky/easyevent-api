export function conflict(message: string) {
  return { type: 'conflict', message };
}

export function unauthorized(message: string) {
  return { type: 'unauthorized', message };
}

export function badRequest(message: string) {
  return { type: 'bad_request', message };
}
