import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldsComponent),
  multi: true
};

@Component({
  selector: 'input-fields',
  templateUrl: './input-fields.component.html',
  styleUrls: ['./input-fields.component.scss'],
  providers: [INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputFieldsComponent implements OnInit {
  @Input() data: any = {}
  @Input() FieldValue: any
  @Input() isLabel: boolean
  constructor() { }

  ngOnInit(): void {
  }

}
