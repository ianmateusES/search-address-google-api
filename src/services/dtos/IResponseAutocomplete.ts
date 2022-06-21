interface ITerm {
  offset: number;
  value: string;
}

interface IPrediction {
  description: string;
  place_id: string;
  terms: ITerm[];
  types: string[];
}

interface IResponseAutocomplete {
  predictions: IPrediction[];
  status: string;
}

export { IResponseAutocomplete };
