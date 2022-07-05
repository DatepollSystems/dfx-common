import {Component, OnDestroy} from '@angular/core';

import {Subscription} from 'rxjs';

@Component({
  template: '',
})
export abstract class AComponent implements OnDestroy {
  protected subscriptions: Subscription[] = [];

  public autoUnsubscribe(...subscription: Subscription[]): this {
    this.subscriptions.push(...subscription);
    return this;
  }

  public ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
