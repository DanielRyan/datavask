export interface Entry<T> {
  info: T;
  value: {
    original: string;
    cleaned: string;
  };
}
