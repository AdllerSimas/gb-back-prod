import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import { injectable, inject } from 'tsyringe';

import { startOfHour, isBefore, getHours, format } from 'date-fns';


import AppError from '@shared/errors/AppError';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {

  constructor(

    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository, //from typescript -> using private, i don't need to do -> this.appointmensRepository = appointmentsRepository

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

  ) {}

  // async function -> return Promise
  public async execute({ date, provider_id, user_id } : IRequest): Promise<Appointment | void> {

    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date");
    }

    if (user_id === provider_id) {
      throw new AppError('You can not create an appointment with yourself');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only create appointments between 8an and 5pm'
      );
    }

    const findAppointmentsInSameDate = await this.appointmentsRepository.findByDate(appointmentDate, provider_id);

    if (findAppointmentsInSameDate) {

      throw new AppError('This appointment is already booked!');

    } else {

      const appointment = await this.appointmentsRepository.create({

        provider_id: provider_id,

        user_id: user_id,

        date: appointmentDate

      }).catch(err => console.log(err));

      const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'" );
      console.log(dateFormatted);

      await this.notificationsRepository.create({
        recipient_id: provider_id,
        content: `Novo agendamento para ${dateFormatted}`,
      })

      await this.cacheProvider.invalidate(`provider-appointments:${provider_id}:${format(appointmentDate, 'yyyy-M-d')}`);

      return appointment;
    }

  };

}

export default CreateAppointmentService;
