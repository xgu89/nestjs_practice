import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Cat } from './entities/cat.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<Cat> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Cat;
  }

  beforeInsert(event: InsertEvent<Cat>) {
    console.log(`BEFORE USER INSERTED: `, event.entity);
  }
}