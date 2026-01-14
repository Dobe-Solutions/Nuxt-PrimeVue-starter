import { defineEventHandler, readBody } from 'h3';

type ContactBody = {
  name: string;
  email: string;
  message: string;
};

export default defineEventHandler(async (event) => {
  const body = (await readBody<ContactBody>(event)) || {};

  console.info('Contact submission', { body });

  return { success: true };
});
