import { apiGoogle } from 'services/apiGoogle';
import { IResponseAutocomplete } from 'services/dtos';

interface IRequest {
  input: string;
  language: string;
}

interface IResponse {
  place_id: string;
  description: string;
}

class SearchAddressGoogleUseCase {
  public async execute({ input, language }: IRequest): Promise<IResponse[]> {
    let data: IResponseAutocomplete;

    try {
      const response = await apiGoogle.get('/place/autocomplete/json', {
        params: { input, language, types: 'locality' },
      });

      data = response.data;
    } catch (err) {
      console.log(err);
      throw new Error('Error api google');
    }

    let addresses: IResponse[];
    if (data.status === 'OK') {
      addresses = data.predictions.map(prediction => ({
        place_id: prediction.place_id,
        description: prediction.description,
      }));
    }

    return addresses;
  }
}

export { SearchAddressGoogleUseCase };
