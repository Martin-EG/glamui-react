import '@testing-library/jest-dom';

class IntersectionObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

(global as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
  IntersectionObserverMock;
