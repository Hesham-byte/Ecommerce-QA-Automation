export const testUsers = {
  registered: {
    name: 'John Doe',
    email: 'testuser@example.com',
    password: 'TestPass123',
  },
};

export function uniqueEmail(prefix = 'qa'): string {
  return `${prefix}.${Date.now()}${Math.floor(Math.random() * 1000)}@test.com`;
}

export const validCard = {
  nameOnCard: 'John Doe',
  cardNumber: '4111111111111111',
  cvc: '311',
  expiryMonth: '12',
  expiryYear: '2030',
};
