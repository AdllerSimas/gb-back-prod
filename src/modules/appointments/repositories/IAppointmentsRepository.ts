import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindByMonthAppointmentsFromProviderDTO from '../dtos/IFindByMonthAppointmentsFromProviderDTO';
import IFindByDayAppointmentsFromProviderDTO from '../dtos/IFindByDayAppointmentsFromProviderDTO';

//defining methods that should exist on repository
export default interface IAppointmentsRepository {

  create(data: ICreateAppointmentDTO): Promise<Appointment | void>;

  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;

  findByMonthAppointmentsFromProvider(data: IFindByMonthAppointmentsFromProviderDTO): Promise<Appointment[]>;

  findByDayAppointmentsFromProvider(data: IFindByDayAppointmentsFromProviderDTO): Promise<Appointment[]>;

}
