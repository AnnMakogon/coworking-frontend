export class Page<T> {
  constructor() {
    this.content = [];
    this.totalElements = 0;
  }
  content: T[];
  totalElements: number;
}
