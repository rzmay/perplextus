import { NextMiddleware, NextResponse } from 'next/server';
import recycleToken from './helpers/recycle-token';

const middleware: NextMiddleware = async function middleware(req) {
  try {
    // Check for the authorization token in the query params
    const token = req.nextUrl.searchParams.get('token');
    if (!token) return NextResponse.next();

    // Set redirect
    const redirect = decodeURIComponent(
      req.nextUrl.searchParams.get('redirect') || '/'
    );

    // Construct the URL
    const url = new URL(`${process.env.DASHBOARD_BASE_URL}${redirect}`);

    // Create the response object
    const res = NextResponse.redirect(url);

    // Recycle the token
    const authorization = await recycleToken(token);

    // Set the authorization token
    if (authorization)
      res.cookies.set('authorization', authorization, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: '/',
      });

    return res;
  } catch (err) {
    return NextResponse.redirect(`${process.env.DASHBOARD_BASE_URL}/login`);
  }
};

export const config = {
  matcher: '/login',
};

export default middleware;
