import {Address} from './address';
import {Skill} from './skill';

export class People {
  id:      string;
  name:    string;
  surname: string;
  dni:     number;
  address: Address;
  skills: Skill[];
}
