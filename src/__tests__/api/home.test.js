import { expect } from 'chai';

describe('Home', () => {
  describe('GET /', () => {
    it('should display "Hi!"', async () => {
      const response = await fetchApi('/');
      expect(response.status).to.equal(200);

      const json = await response.json();
      expect(json).to.eql({ msg: 'Hi!' });
    });
  });

  describe('GET /:name', () => {
    it('should greet on GET', async () => {
      const response = await fetchApi('/lollipop');
      const json = await response.json();

      expect(json).to.eql({ msg: 'Hello lollipop!' });
    });
  });

  describe('POST /', () => {
    it('should greet on POST', async () => {
      const headers = { 'Content-Type': 'application/json' };
      const form = JSON.stringify({ name: '🍭' });
      const response = await fetchApi('/', { headers, method: 'POST', body: form });
      const json = await response.json();

      expect(json).to.eql({ msg: 'Hello 🍭!' });
    });

    it('should not greet if name is missing', async () => {
      const response = await fetchApi('/', { method: 'POST' });
      const json = await response.json();

      expect(response.status).to.equal(400);
      expect(json).to.eql({ error: 'Name can\'t be undefined' });
    });
  });
});