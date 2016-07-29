import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TextItemActions } from '../actions';
import { TextItem } from '../models';

export interface CollectionState {
  loaded: boolean;
  loading: boolean;
  textItems: TextItem[];
};

const initialState: CollectionState = {
  loaded: false,
  loading: false,
  textItems: []
};

export default function(state = initialState, action: Action): CollectionState {
  switch (action.type) {
    case TextItemActions.LOAD_COLLECTION: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case TextItemActions.LOAD_COLLECTION_SUCCESS: {
      const books: TextItem[] = action.payload;

      return {
        loaded: true,
        loading: false,
        textItems: books.map(book => book)
      };
    }

    default: {
      return state;
    }
  }
}

export function getLoaded() {
  return (state$: Observable<CollectionState>) => state$
    .select(s => s.loaded);
}

export function getLoading() {
  return (state$: Observable<CollectionState>) => state$
    .select(s => s.loading);
}

export function getTextItems() {
  return (state$: Observable<CollectionState>) => state$
    .select(s => s.textItems);
}

/*
export function getBookIds() {
  return (state$: Observable<CollectionState>) => state$
    .select(s => s.ids);
}

export function isBookInCollection(id: string) {
  return (state$: Observable<CollectionState>) => state$
    .let(getBookIds())
    .map(ids => ids.includes(id));
}
*/