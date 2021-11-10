import type {PickerItemProps} from '@react-native-picker/picker';
import countries from './countries.json';

type LabelsMap = Readonly<{
  [s: string]: string;
}>;
type SelectOption = PickerItemProps & {
  disabled?: boolean;
};
type SelectItems = Readonly<Array<SelectOption>>;

export const NATIONALITY_LABELS: LabelsMap = countries.reduce(
  (soFar: {[s: string]: string}, country: {code: string; nationality: string}) => {
    soFar[country.code.toLowerCase()] = country.nationality; // eslint-disable-line
    return soFar;
  },
  {}
);

export const NATIONALITY_SELECT_ITEMS: SelectItems = countries.map((country: {code: string; nationality: string}) => ({
  label: country.nationality,
  value: country.code.toLowerCase()
}));
