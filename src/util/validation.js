export const required = value => (value ? undefined : 'Required');
export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined
export const email = (value) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]? w+)*(\.\w{2,3})+$/;
  return !emailRegex.test(value) ? 'Invalid email' : undefined;
};
