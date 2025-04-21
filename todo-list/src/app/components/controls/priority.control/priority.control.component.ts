import { Component, Input} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'choose-priority',
  templateUrl: "priority.control.component.html",
  styleUrls: ["priority.control.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: ChoosePriorityComponent
    }
  ]
})
export class ChoosePriorityComponent implements ControlValueAccessor {

  private increment = 1;

  @Input() priority: number = 0;

  onChange = (priority: number) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  onAdd() {
    this.markAsTouched();
    if (!this.disabled && this.priority < 5) {
      this.priority+= this.increment;
      this.onChange(this.priority);
    }
  }

  onRemove() {
    this.markAsTouched();
    if (!this.disabled && this.priority > 0) {
      this.priority-= this.increment;
      this.onChange(this.priority);
    }
  }

  writeValue(quantity: number) {
    this.priority = quantity;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}