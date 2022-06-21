interface IAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface IGeometry {
  location: {
    lat: number;
    lng: number;
  };
  location_type: string;
}

interface IResult {
  address_components: IAddressComponent[];
  formatted_address: string;
  geometry: IGeometry;
  place_id: string;
  types: string[];
}

interface IResponsePlace {
  result: IResult;
  status: string;
}

export { IResponsePlace };
