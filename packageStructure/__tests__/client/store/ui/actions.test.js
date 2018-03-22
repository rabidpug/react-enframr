import { TOGGLE_KEY, TOGGLE_SIDEBAR } from 'Store/ui/types';
import { toggleKey, toggleSidebar } from 'Store/ui/actions';

describe('toggleKey', () => {
  it('should create an action to toggle the open keys', () => {
    const key = '1';
    const expectedAction = {
      payload: key,
      type: TOGGLE_KEY,
    };

    expect(toggleKey(key)).toEqual(expectedAction);
  });
});

describe('toggleSidebar', () => {
  it('should create an action to toggle the sidebar', () => {
    const expectedAction = { type: TOGGLE_SIDEBAR };

    expect(toggleSidebar()).toEqual(expectedAction);
  });
});
