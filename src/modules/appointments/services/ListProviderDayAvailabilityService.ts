import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';


import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {

  constructor(

    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

  ) {}

  public async execute({ provider_id, day, month, year }: IRequest): Promise<IResponse> {

    const appointments = await this.appointmentsRepository.findByDayAppointmentsFromProvider({ provider_id, year, month, day });
    console.log('teste');
    console.log(appointments);

    const hourStart = 8;

    const eachHourArray = Array.from( { length: 10 }, (_, index) => index + hourStart);

    console.log(eachHourArray);

    const currentDate = new Date(Date.now());

    console.log(currentDate);

    const availability = eachHourArray.map(hour => {

      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) == hour,
      );

      const compareDate = new Date(year, month - 1, day, hour );

      //2020-05-20 08:00

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };

    });
    console.log(availability);

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
