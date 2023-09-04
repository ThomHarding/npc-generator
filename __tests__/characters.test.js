const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('characters routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return bill from the pub', async () => {
    const res = await request(app).get('/characters');
    const bill = res.body.find((char) => char.id === '1');
    expect(bill).toHaveProperty('name', 'bill down tpub');
    expect(bill).toHaveProperty('species', 'shifter');
    expect(bill).toHaveProperty('background', 1);
    expect(bill).toHaveProperty('technophobia');
  });

  afterAll(() => {
    pool.end();
  });
});
