/**
 * @license
 * Original work Copyright Google LLC All Rights Reserved.
 * Modified work Copyright DatePoll-Systems
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';
import {Directive, EventEmitter, Inject, InjectionToken, Input, OnChanges, OnDestroy, OnInit, Optional, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {SortDirection} from './sort-direction';
import {HasInitialized, mixinInitialized} from '../core/initialized';
import {CanDisable, mixinDisabled} from '../core/disabled';

/** Interface for a directive that holds sorting state consumed by `MatSortHeader`. */
export interface NgbSortable {
  /** The id of the column being sorted. */
  id: string;

  /** Starting sort direction. */
  start: 'asc' | 'desc';

  /** Whether to disable clearing the sorting state. */
  disableClear: boolean;
}

/** The current sort state. */
export interface Sort {
  /** The id of the column being sorted. */
  active: string;

  /** The sort direction. */
  direction: SortDirection;
}

/** Default options for `mat-sort`.  */
export interface MatSortDefaultOptions {
  /** Whether to disable clearing the sorting state. */
  disableClear?: boolean;
}

/** Injection token to be used to override the default options for `mat-sort`. */
export const MAT_SORT_DEFAULT_OPTIONS = new InjectionToken<MatSortDefaultOptions>('MAT_SORT_DEFAULT_OPTIONS');

// Boilerplate for applying mixins to MatSort.
/** @docs-private */
const _NgbSortBase = mixinInitialized(mixinDisabled(class {}));

/** Container for MatSortables to manage the sort state and provide default sort parameters. */
@Directive({
  selector: '[ngb-sort]',
  exportAs: 'ngbSort',
  host: {class: 'ngb--sort'},
  inputs: ['disabled: ngbSortDisabled'],
})
export class NgbSort extends _NgbSortBase implements CanDisable, HasInitialized, OnChanges, OnDestroy, OnInit {
  /** Collection of all registered sortables that this directive manages. */
  sortables = new Map<string, NgbSortable>();

  /** Used to notify any child components listening to state changes. */
  readonly _stateChanges = new Subject<void>();

  /** The id of the most recently sorted MatSortable. */
  @Input('matSortActive') active = '';

  /**
   * The direction to set when an MatSortable is initially sorted.
   * May be overriden by the MatSortable's sort start.
   */
  @Input('matSortStart') start: 'asc' | 'desc' = 'asc';

  /** The sort direction of the currently active MatSortable. */
  @Input('matSortDirection')
  get direction(): SortDirection {
    return this._direction;
  }
  set direction(direction: SortDirection) {
    this._direction = direction;
  }
  private _direction: SortDirection = '';

  /**
   * Whether to disable the user from clearing the sort by finishing the sort direction cycle.
   * May be overriden by the MatSortable's disable clear input.
   */
  @Input('matSortDisableClear')
  get disableClear(): boolean {
    return this._disableClear;
  }
  set disableClear(v: boolean) {
    this._disableClear = coerceBooleanProperty(v);
  }
  private _disableClear = false;

  /** Event emitted when the user changes either the active sort or sort direction. */
  @Output('matSortChange') readonly sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();

  constructor(
    @Optional()
    @Inject(MAT_SORT_DEFAULT_OPTIONS)
    private _defaultOptions?: MatSortDefaultOptions
  ) {
    super();
  }

  /**
   * Register function to be used by the contained MatSortables. Adds the MatSortable to the
   * collection of MatSortables.
   */
  register(sortable: NgbSortable): void {
    this.sortables.set(sortable.id, sortable);
  }

  /**
   * Unregister function to be used by the contained MatSortables. Removes the MatSortable from the
   * collection of contained MatSortables.
   */
  deregister(sortable: NgbSortable): void {
    this.sortables.delete(sortable.id);
  }

  /** Sets the active sort id and determines the new sort direction. */
  sort(sortable: NgbSortable): void {
    if (this.active != sortable.id) {
      this.active = sortable.id;
      this.direction = sortable.start ? sortable.start : this.start;
    } else {
      this.direction = this.getNextSortDirection(sortable);
    }

    this.sortChange.emit({active: this.active, direction: this.direction});
  }

  /** Returns the next sort direction of the active sortable, checking for potential overrides. */
  getNextSortDirection(sortable: NgbSortable): SortDirection {
    if (!sortable) {
      return '';
    }

    // Get the sort direction cycle with the potential sortable overrides.
    const disableClear = sortable?.disableClear ?? this.disableClear ?? !!this._defaultOptions?.disableClear;
    const sortDirectionCycle = getSortDirectionCycle(sortable.start || this.start, disableClear);

    // Get and return the next direction in the cycle
    let nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
    if (nextDirectionIndex >= sortDirectionCycle.length) {
      nextDirectionIndex = 0;
    }
    return sortDirectionCycle[nextDirectionIndex];
  }

  ngOnInit() {
    this._markInitialized();
  }

  ngOnChanges() {
    this._stateChanges.next();
  }

  ngOnDestroy() {
    this._stateChanges.complete();
  }

  static ngAcceptInputType_disableClear: BooleanInput;
  static ngAcceptInputType_disabled: BooleanInput;
}

/** Returns the sort direction cycle to use given the provided parameters of order and clear. */
function getSortDirectionCycle(start: 'asc' | 'desc', disableClear: boolean): SortDirection[] {
  const sortOrder: SortDirection[] = ['asc', 'desc'];
  if (start == 'desc') {
    sortOrder.reverse();
  }
  if (!disableClear) {
    sortOrder.push('');
  }

  return sortOrder;
}
