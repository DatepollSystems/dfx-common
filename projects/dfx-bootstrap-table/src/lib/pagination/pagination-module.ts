import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  DfxNgbPagination,
  DfxNgbPaginationEllipsis,
  DfxNgbPaginationFirst,
  DfxNgbPaginationLast,
  DfxNgbPaginationNext,
  DfxNgbPaginationNumber,
  DfxNgbPaginationPrevious,
  DfxNgbPaginationPages,
} from './pagination';

export {
  DfxNgbPagination,
  DfxNgbPaginationEllipsis,
  DfxNgbPaginationFirst,
  DfxNgbPaginationLast,
  DfxNgbPaginationNext,
  DfxNgbPaginationNumber,
  DfxNgbPaginationPrevious,
  DfxNgbPaginationPages,
} from './pagination';

const DIRECTIVES = [
  DfxNgbPagination,
  DfxNgbPaginationEllipsis,
  DfxNgbPaginationFirst,
  DfxNgbPaginationLast,
  DfxNgbPaginationNext,
  DfxNgbPaginationNumber,
  DfxNgbPaginationPrevious,
  DfxNgbPaginationPages,
];

@NgModule({declarations: DIRECTIVES, exports: DIRECTIVES, imports: [CommonModule]})
export class DfxNgbPaginationModule {}
