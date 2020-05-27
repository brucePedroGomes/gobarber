import { Response, Request } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailability';

export default class ProviderDayAvailabilityControll {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.body;
    const { provider_id } = request.params;

    const listProviderDayAvailabilityService = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const Availability = await listProviderDayAvailabilityService.execute({
      day,
      month,
      year,
      provider_id,
    });

    return response.json(Availability);
  }
}
