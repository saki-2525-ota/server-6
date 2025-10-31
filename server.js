import { Hono } from 'jsr:@hono/hono';
import { serveStatic } from 'jsr:@hono/hono/deno';
const app = new Hono();

app.use('/*', serveStatic({ root: './public' }));

// GETリクエストに対する処理
app.get('/api/:a/:b/:c', async (c) => {
  const a = c.req.param('a');
  const b = c.req.param('b');
  const c = c.req.param('c');

  return c.json({ message: 'GET', param: { a, b } });
});

// POSTリクエストに対する処理
app.get('/api', async (c) => {
  const body = await c.req.parseBody();
  const name = body['name'];
  const rank = body['rank'];

  return c.json({ message: 'POST', form: { name, rank } });
});

// PUTリクエストに対する処理
app.get('/api', async (c) => {
  const body = await c.req.json();
  const name = body['name'];
  const rank = body['rank'];

  return c.json({ message: 'PUT', json: { name, rank } });
});

// DELETEリクエストに対する処理
app.get('/api', async (c) => {
  return c.json({ message: 'DELETE' });
});

Deno.serve(app.fetch);
