import { getMarkdownFunctionMap } from './markdownFunctions';

const noop = () => {};
const functionMap = getMarkdownFunctionMap(noop as any);

describe('charCounter', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <textarea id="message" maxlength="50"></textarea>
      <span id="currentChars">50</span>
      <div id="sr-counter-target"></div>
    `;
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('updates visible counter with remaining characters on input', () => {
    const textarea = document.getElementById('message') as HTMLTextAreaElement;
    textarea.value = 'hello';

    functionMap.charCounter({ currentTarget: textarea } as any);

    expect(document.getElementById('currentChars')!.innerHTML).toBe('45');
  });

  test('debounces sr-counter-target — only announces after typing stops', () => {
    const textarea = document.getElementById('message') as HTMLTextAreaElement;

    textarea.value = 'hi';
    functionMap.charCounter({ currentTarget: textarea } as any);

    textarea.value = 'hel';
    functionMap.charCounter({ currentTarget: textarea } as any);

    textarea.value = 'hello';
    functionMap.charCounter({ currentTarget: textarea } as any);

    jest.advanceTimersByTime(999);
    expect(document.getElementById('sr-counter-target')!.innerHTML).toBe('');

    jest.advanceTimersByTime(1);
    expect(document.getElementById('sr-counter-target')!.innerHTML).toBe('45 of 50 characters remaining');
  });

  test('updates sr-counter-target after 1000ms delay', () => {
    const textarea = document.getElementById('message') as HTMLTextAreaElement;
    textarea.value = 'hello world';

    functionMap.charCounter({ currentTarget: textarea } as any);

    expect(document.getElementById('sr-counter-target')!.innerHTML).toBe('');

    jest.advanceTimersByTime(1000);

    expect(document.getElementById('sr-counter-target')!.innerHTML).toBe('39 of 50 characters remaining');
  });
});
