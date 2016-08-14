import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';

import { AppState, CollectionState } from '../reducers';

export function getCollectionState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.collection);
}

export function getCollectionLoaded() {
  return compose(_getLoaded(), getCollectionState());
}

export function getCollectionLoading() {
  return compose(_getLoading(), getCollectionState());
}

export function getCollectionTextItems() {
  return compose(_getTextItems(), getCollectionState());
}

function _getLoaded() {
  return (state$: Observable<CollectionState>) => state$
    .select(s => s.loaded);
}

function _getLoading() {
  return (state$: Observable<CollectionState>) => state$
    .select(s => s.loading);
}

function _getTextItems() {
  return (state$: Observable<CollectionState>) => state$
    .select(s => s.textItems);
}