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

  public onChange = (priority: number):void => {};

  public onTouched = ():void => {};

  private touched:boolean = false;

  private disabled:boolean = false;

  public onAdd(): void {
    this.markAsTouched();
    if (!this.disabled && this.priority < 5) {
      this.priority+= this.increment;
      this.onChange(this.priority);
    }
  }

  public onRemove(): void {
    this.markAsTouched();
    if (!this.disabled && this.priority > 0) {
      this.priority-= this.increment;
      this.onChange(this.priority);
    }
  }

  public writeValue(quantity: number):void {
    this.priority = quantity;
  }

  public registerOnChange(onChange: any):void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched: any):void {
    this.onTouched = onTouched;
  }

  public markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  public setDisabledState(disabled: boolean):void {
    this.disabled = disabled;
  }
}