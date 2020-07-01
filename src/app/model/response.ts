export class Response <S> {
  content: S;
  pageable:         Pageable;
  totalPages:       number;
  totalElements:    number;
  last:             boolean;
  size:             number;
  number:           number;
  sort:             Sort;
  numberOfElements: number;
  first:            boolean;
  empty:            boolean;
}

export interface Pageable {
  sort:       Sort;
  offset:     number;
  pageNumber: number;
  pageSize:   number;
  paged:      boolean;
  unpaged:    boolean;
}

export interface Sort {
  sorted:   boolean;
  unsorted: boolean;
  empty:    boolean;
}

