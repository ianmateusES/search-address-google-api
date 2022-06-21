import { apiGoogle } from 'services/apiGoogle';
import { IResponsePlace } from 'services/dtos';

interface IRequest {
  place_id: string;
}

interface IResponse {
  city: string;
  state: string;
  country: string;
}

class ShowAddressGoogleUseCase {
  public async execute({ place_id }: IRequest): Promise<IResponse> {
    let data: IResponsePlace;

    try {
      const response = await apiGoogle.get('/place/details/json', {
        params: { place_id, language: 'en' },
      });

      data = response.data;
    } catch (err) {
      console.log(err);
      throw new Error('Error api google');
    }
    // console.table(data.result.address_components);

    const address = {} as IResponse;
    if (data.status === 'OK') {
      data.result.address_components.reduce((acc, component) => {
        if (
          component.types.findIndex(
            type =>
              type === 'administrative_area_level_2' || type === 'locality',
          ) !== -1
        ) {
          Object.assign(acc, {
            city:
              acc.city &&
              acc.city.normalize('NFD').replace(/[\u0300-\u036f]/g, '') !==
                component.long_name
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                ? `${acc.city} - ${component.long_name}`
                : component.long_name,
          });
        }

        if (
          component.types.findIndex(
            type => type === 'administrative_area_level_1',
          ) !== -1
        ) {
          Object.assign(acc, { state: component.short_name });
        }

        if (component.types.findIndex(type => type === 'country') !== -1) {
          Object.assign(acc, { country: component.long_name });
        }

        return acc;
      }, address);
    }

    return address;
  }
}

export { ShowAddressGoogleUseCase };
