import {
  createMaintenanceToken,
  hasMaintenanceAccess,
  MAINTENANCE_COOKIE,
  MAINTENANCE_TTL_SECONDS,
} from '@/server/maintenanceAccess';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'private, no-store' };

/** Restores only a server-verified, unexpired 48-hour preview session. */
export const GET = async (request: Request): Promise<Response> =>
  Response.json(
    { unlocked: hasMaintenanceAccess(request.headers.get('cookie')) },
    { headers },
  );

/** Shared test password, deliberately unrelated to account authorization or payment. */
export const POST = async (request: Request): Promise<Response> => {
  let password: unknown;
  try {
    const body = await request.text();
    if (body.length > 256) throw new Error('Invalid request');
    password = JSON.parse(body).password;
  } catch {
    return Response.json({ unlocked: false }, { status: 400, headers });
  }
  if (password !== 'TestAccess')
    return Response.json({ unlocked: false }, { status: 401, headers });
  try {
    const token = createMaintenanceToken();
    const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
    return Response.json(
      { unlocked: true },
      {
        headers: {
          ...headers,
          'Set-Cookie': `${MAINTENANCE_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAINTENANCE_TTL_SECONDS}${secure}`,
        },
      },
    );
  } catch {
    return Response.json({ unlocked: false }, { status: 503, headers });
  }
};
