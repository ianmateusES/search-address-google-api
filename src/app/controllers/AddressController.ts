import {
  SearchAddressGoogleUseCase,
  ShowAddressGoogleUseCase,
} from 'app/useCases';
import { Request, Response } from 'express';

class AddressController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { address, language } = req.query;

    const searchAddressGoogleUseCase = new SearchAddressGoogleUseCase();

    const addresses = await searchAddressGoogleUseCase.execute({
      input: String(address),
      language: String(language),
    });

    return res.status(200).json(addresses);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { place_id } = req.params;

    const showAddressGoogleUseCase = new ShowAddressGoogleUseCase();

    const address = await showAddressGoogleUseCase.execute({ place_id });

    return res.status(200).json(address);
  }
}

export { AddressController };
