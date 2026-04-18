import { test, expect } from '@playwright/test';

const API_URL = 'https://dummy-json.mock.beeceptor.com/posts';

test('GET /posts - validate response structure and log fields', async ({ request }) => {
  const response = await request.get(API_URL);
  expect(response.status()).toBe(200);

  const data = await response.json();
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);

  for (const item of data) {
    // Validate required keys
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('title');
    expect(item).toHaveProperty('body');
    expect(item).toHaveProperty('link');
    expect(item).toHaveProperty('comment_count');

    // Optionally validate data types
    expect(typeof item.id).toBe('number');
    expect(typeof item.title).toBe('string');
    expect(typeof item.body).toBe('string');
    expect(typeof item.link).toBe('string');
    expect(typeof item.comment_count).toBe('number');

    // Log product title and comment_count
    console.log('Title:', item.title);
    console.log('Comment Count:', item.comment_count);
  }
});
