import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, Subscription} from 'rxjs';

@Component({
  selector: 'app-rxjs-input',
  imports: [ReactiveFormsModule],
  templateUrl: './rxjs-input.component.html',
  styleUrl: './rxjs-input.component.scss',
  standalone: true
})
export class RxjsInputComponent implements OnInit {
  public searchControl = new FormControl('');
  private subscription! : Subscription;
  public isLoading = false;

  ngOnInit() {
    this.subscription = this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(value => (value as string).length > 3),
        map(value => (value as string).toUpperCase())
      )
      .subscribe(value => {
        this.isLoading = true;
        console.log("Поиск по:", value);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
