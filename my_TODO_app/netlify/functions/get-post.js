import { neon } from '@netlify/neon';

const sql = neon(); // This will use NETLIFY_DATABASE_URL from environment

export async function handler(event) {
  const { id } = event.queryStringParameters;

  try {
    const posts = await sql`SELECT * FROM posts WHERE id = ${id}`;

    if (posts.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Post not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(posts[0]),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
