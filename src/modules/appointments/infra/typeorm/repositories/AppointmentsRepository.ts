import Appointment from '../entities/Appointment';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindByMonthAppointmentsFromProviderDTO from '@modules/appointments/dtos/IFindByMonthAppointmentsFromProviderDTO';
import IFindByDayAppointmentsFromProviderDTO from '@modules/appointments/dtos/IFindByDayAppointmentsFromProviderDTO';

import { getRepository, Repository, Raw } from 'typeorm';

class AppointmentsRepository  implements IAppointmentsRepository {

  //type
  private ormRepository: Repository<Appointment>;

  constructor() {

    this.ormRepository = getRepository(Appointment);
    console.log('appRepositoryConstructor');
  }

  public async findByDate(date: Date, provider_id: string): Promise <Appointment | undefined> {

    const findAppointment = await this.ormRepository.findOne({where: {date, provider_id}})

    return findAppointment;

  }

  public async findByMonthAppointmentsFromProvider({provider_id, month, year}: IFindByMonthAppointmentsFromProviderDTO): Promise <Appointment[]> {

    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
        ),
      },
    });

    return appointments;

  }

  public async findByDayAppointmentsFromProvider({provider_id, year, month, day}: IFindByDayAppointmentsFromProviderDTO): Promise <Appointment[]> {

    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
          `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      relations:['user'],
    });

    return appointments;

  }

  public async create({date, provider_id, user_id}: ICreateAppointmentDTO): Promise<Appointment | void>{

    const appointment= this.ormRepository.create({ provider_id, user_id, date });
    console.log(appointment);
    await this.ormRepository.save(appointment);

    return appointment;
  }


}

export default AppointmentsRepository;
