export const getUserId = (route: string) => {
  return route.split('/')[3];
};
