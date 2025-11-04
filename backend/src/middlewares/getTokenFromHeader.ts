export const getTokenFromHeader = (headerValue?: string | string[] | undefined): string | null => {
  if (!headerValue) {
    console.log('⚠️ Header vacío o undefined');
    return null;
  }

  const header = Array.isArray(headerValue) ? headerValue[0] : String(headerValue).trim();

  // Si el header comienza con "Bearer ", lo cortamos
  if (header.toLowerCase().startsWith('bearer ')) {
    const token = header.slice(7).trim();
    return token;
  }

  return header;
};
