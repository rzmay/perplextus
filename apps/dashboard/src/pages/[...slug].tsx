import { NextPage } from 'next';

const NotFound: NextPage = function NotFound() {
  return null;
};

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/',
    },
  };
}

export default NotFound;
