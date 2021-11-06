import { AccountUnit } from './account';

describe('Account', () => {
  it('should create an instance', () => {
    expect(new AccountUnit('ken', 'ken')).toBeTruthy();
  });
});
