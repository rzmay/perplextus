export default async function redirect(destination: string, permanent = false) {
  return {
    redirect: {
      destination,
      permanent,
    },
  };
}
