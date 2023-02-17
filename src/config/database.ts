import mongoose from 'mongoose';

export class Database {
  private uri = process.env.DATABASE_URI || '';
  async connect() {
    mongoose.connect(this.uri, {}, (err) => {
      if (err) {
        console.log('Can not connect to the database');
        return process.exit(1);
      }
      return;
    });
  }
}
