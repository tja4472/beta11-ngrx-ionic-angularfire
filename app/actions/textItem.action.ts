import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { TextItem } from '../models';

/**
 * Instead of passing around action string constants and manually recreating
 * action objects at the point of dispatch, we create services encapsulating
 * each appropriate action group. Action types are included as static
 * members and kept next to their action creator. This promotes a
 * uniform interface and single import for appropriate actions
 * within your application components.
 */
@Injectable()
export class TextItemActions {
  static LOAD_COLLECTION = '[TextItem] Load Collection';
  loadCollection(): Action {
    return {
      type: TextItemActions.LOAD_COLLECTION
    };
  }

  static LOAD_COLLECTION_SUCCESS = '[TextItem] Load Collection Success';
  loadCollectionSuccess(textItems: TextItem[]): Action {
    return {
      type: TextItemActions.LOAD_COLLECTION_SUCCESS,
      payload: textItems
    };
  }    
} 
