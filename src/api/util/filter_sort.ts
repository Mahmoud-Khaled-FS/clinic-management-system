import { QueryOptions } from 'mongoose';

class FilterQuery {
  private _options: QueryOptions = {};
  private _filter: any = {};
  constructor() {}
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
  get options() {
    return this._options;
  }
  get filter() {
    return this._filter;
  }
}

export default FilterQuery;
