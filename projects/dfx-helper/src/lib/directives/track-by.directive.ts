import {Directive, Host, Input, NgIterable, NgModule} from '@angular/core';
import {NgForOf} from '@angular/common';
import {StringOrNumber} from '../types';

@Directive({
  selector: '[ngForTrackByProperty]',
})
export class TrackByPropertyDirective<T, U extends NgIterable<T> = NgIterable<T>> {
  @Input('ngForTrackByProperty') propertyName!: keyof T;

  // We don't use this, we just need it so Ivy will give us a type for T
  @Input() ngForOf!: U & NgIterable<T>;

  public constructor(@Host() ngFor: NgForOf<T, U>) {
    ngFor.ngForTrackBy = (index: number, item: T) => item[this.propertyName];
  }
}

@Directive({
  selector: '[ngForTrackById]',
})
export class TrackByIdDirective<T extends {id: StringOrNumber}> {
  constructor(@Host() ngFor: NgForOf<T>) {
    ngFor.ngForTrackBy = (_: number, item: T) => item.id;
  }
}

@Directive({
  selector: '[ngForTrackByIndex]',
})
export class TrackByIndexDirective {
  constructor(@Host() ngFor: NgForOf<any>) {
    ngFor.ngForTrackBy = (index: number) => index;
  }
}

@NgModule({
  imports: [],
  declarations: [TrackByIdDirective, TrackByPropertyDirective, TrackByIndexDirective],
  exports: [TrackByIdDirective, TrackByPropertyDirective, TrackByIndexDirective],
})
export class DfxTrackByModule {}
