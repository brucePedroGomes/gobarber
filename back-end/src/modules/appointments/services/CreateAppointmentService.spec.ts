import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentsService(
      fakeAppointmentsRepository,
    );

    const appointments = await createAppointment.execute({
      date: new Date(),
      provider_id: '1234567',
    });

    expect(appointments).toHaveProperty('id');
    expect(appointments.provider_id).toBe('1234567');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentsService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1234567',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
