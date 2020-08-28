import Notification from '../schemas/Notification';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import { getMongoRepository, MongoRepository } from 'typeorm';
import { startOfMonth, endOfMonth } from 'date-fns';

class NotificationsRepository  implements INotificationsRepository {

  //type
  private ormRepository: MongoRepository<Notification>;

  constructor() {

    this.ormRepository = getMongoRepository(Notification, 'mongo');

  }

  public async create({content, recipient_id}: ICreateNotificationDTO): Promise<Notification> {

    const notification = this.ormRepository.create({ content, recipient_id});

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
