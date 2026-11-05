import { getEbookDownload } from '@/config/ebooks';
import { authorizeEbookDownload, EbookAccessError } from '@/server/ebookAccess';
import { readPrivateEbook } from '@/server/ebookFiles';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const headers = {
  'Cache-Control': 'private, no-store, max-age=0',
  Vary: 'Authorization',
  'X-Content-Type-Options': 'nosniff',
};

/** Validates the session and plan before reading any private deployment asset. */
export const GET = async (
  request: Request,
  context: {
    params: Promise<{ fableId: string; locale: string; format: string }>;
  },
): Promise<Response> => {
  const { fableId, locale, format } = await context.params;
  const ebook = getEbookDownload(fableId, locale, format);
  if (!ebook)
    return Response.json({ error: 'not-found' }, { status: 404, headers });
  if (!request.headers.get('authorization'))
    return Response.json(
      { error: 'unauthenticated' },
      { status: 401, headers },
    );
  // Enable after publishing the current rules; plans remain freely switchable during tests.
  if (process.env.EBOOK_DOWNLOADS_ENABLED !== 'true')
    return Response.json({ error: 'unavailable' }, { status: 503, headers });
  try {
    await authorizeEbookDownload(request.headers.get('authorization'));
    const file = await readPrivateEbook(ebook);
    return new Response(new Uint8Array(file), {
      headers: {
        ...headers,
        'Content-Type': ebook.contentType,
        'Content-Disposition': `attachment; filename="${ebook.filename}"`,
        'Content-Length': String(file.length),
      },
    });
  } catch (error) {
    const status = error instanceof EbookAccessError ? error.status : 503;
    return Response.json(
      {
        error:
          status === 401
            ? 'unauthenticated'
            : status === 403
            ? 'forbidden'
            : 'unavailable',
      },
      { status, headers },
    );
  }
};
