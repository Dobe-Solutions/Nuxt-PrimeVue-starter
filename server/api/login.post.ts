import { defineEventHandler, readBody } from 'h3';

type LoginBody = {
  email?: unknown;
  password?: unknown;
};

export default defineEventHandler(async (event) => {
  const body = (await readBody<LoginBody>(event)) || {};

  if (body.email !== 'info@dobe-solutions.vn') return { success: false };

  return { success: true };
});
