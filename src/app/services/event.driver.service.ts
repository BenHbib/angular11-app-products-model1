import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActionEvent } from '../state/product.state';

// This service is used to manage relations between components
@Injectable({ providedIn: 'root' })
export class EventDriverService {
  // subject used to communicate objects between components
  sourceEventSubject: Subject<ActionEvent> = new Subject<ActionEvent>();

  sourceEventSubjectObservable = this.sourceEventSubject.asObservable();

  publishEvent(event: ActionEvent) {
    this.sourceEventSubject.next(event);
  }
}
