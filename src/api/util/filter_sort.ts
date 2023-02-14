import { QueryOptions } from 'mongoose';

class FilterQuery {
  private _options: QueryOptions = {};
  private _filter: any = {};
  private _numberOfElement = 10;
  constructor(n?: number) {
    if (n) {
      this._numberOfElement = n;
    }
  }
  sort(key: string, value: string | undefined) {
    if (value === 'asc') {
      this._options.sort = {};
      this._options.sort[key] = 1;
    } else if (value === 'desc') {
      this._options.sort = {};
      this._options.sort[key] = -1;
    } else {
      return;
    }
  }
  startWith(key: string, value: string | undefined) {
    if (!value) return;
    this._filter[key] = { $regex: '^' + value };
  }
  where(key: string, value: any) {
    if (!value) return;
    this._filter[key] = value;
  }
  pagination(p: number) {
    return { skip: (p - 1) * this._numberOfElement, limit: this._numberOfElement };
  }
  gt(key: string, value: any) {
    this.filter[key] = { ...this.filter[key], $gt: value };
  }
  lt(key: string, value: any) {
    this.filter[key] = { ...this.filter[key], $lt: value };
  }
  get options() {
    return this._options;
  }
  get filter() {
    return this._filter;
  }
}

export default FilterQuery;
