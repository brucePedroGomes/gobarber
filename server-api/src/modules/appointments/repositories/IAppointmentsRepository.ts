import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthProviderDTO from '../dtos/IFindAllInMonthProviderDTO';
import IFindAllInDayProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointDTO): Promise<Appointment>;

  findByDate(date: Date): Promise<Appointment | undefined>;

  findAllInMonthProvider(
    data: IFindAllInMonthProviderDTO,
  ): Promise<Appointment[]>;

  findAllInDayFromProvider(
    data: IFindAllInDayProviderDTO,
  ): Promise<Appointment[]>;
}
