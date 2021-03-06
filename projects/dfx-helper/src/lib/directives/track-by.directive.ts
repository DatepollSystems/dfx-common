import {Directive, Host, Input, NgIterable, NgModule} from '@angular/core';
import {NgForOf} from '@angular/common';

import {StringOrNumber} from '../types';
import {IEntity} from '../entities/entity.interface';

@Directive({
  selector: '[ngForTrackByProperty]',
})
export class TrackByPropertyDirective<T, U extends NgIterable<T> = NgIterable<T>> {
  @Input('ngForTrackByProperty') propertyName: keyof T | undefined;

  // We don't use this, we just need it so Ivy will give us a type for T
  @Input() ngForOf: (U & NgIterable<T>) | undefined | null;

  public constructor(@Host() private readonly ngFor: NgForOf<T, U>) {
    this.ngFor.ngForTrackBy = (index: number, item: T) => (this.propertyName ? item[this.propertyName] : item);
  }
}

@Directive({
  selector: '[ngForTrackById]',
})
export class TrackByIdDirective<T extends IEntity<StringOrNumber>> {
  constructor(@Host() private readonly ngFor: NgForOf<T>) {
    this.ngFor.ngForTrackBy = (index: number, item: T) => item.id;
  }
}

@NgModule({
  imports: [],
  declarations: [TrackByIdDirective, TrackByPropertyDirective],
  exports: [TrackByIdDirective, TrackByPropertyDirective],
})
export class DfxTrackByModule {}
