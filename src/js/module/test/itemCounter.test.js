import itemCounter from '../homePage/itemCounter.js';

describe('itemCounter', () => {
  beforeEach(() => {
    // Set up the DOM element for counter item
    document.body.innerHTML = '<div id="counter-item"></div>';
  });

  afterEach(() => {
    // Clean up the DOM after each test
    document.body.innerHTML = '';
  });

  it('fetches data and updates the counter item text content', async () => {
    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ id: 123 }),
    });

    // Call the itemCounter function
    await itemCounter(5);

    // Verify fetch function calls
    expect(fetch).toHaveBeenCalledTimes(5);
    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/people/1');
    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/people/2');
    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/people/3');
    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/people/4');
    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/people/5');

    // Verify counter item text content
    const counterItem = document.getElementById('counter-item');
    expect(counterItem.textContent).toBe('(123)');
  });
});
