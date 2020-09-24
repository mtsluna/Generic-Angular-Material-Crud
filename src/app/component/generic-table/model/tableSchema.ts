import {ValidatorFn, Validators} from '@angular/forms';

export interface TableSchema{

  display_name ?: string;
  json_name?: string;
  type?: string;
  initialValue?: string;
  validations?: ValidatorFn[];
  columns?: TableSchema[];

}
