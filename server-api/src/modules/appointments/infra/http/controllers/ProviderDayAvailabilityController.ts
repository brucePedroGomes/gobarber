import { Response, Request } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailability';

export default class ProviderDayAvailabilityControll {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.query;

    const listProviderDayAvailabilityService = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const Availability = await listProviderDayAvailabilityService.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
      provider_id,
    });

    return response.json(Availability);
  }
}
