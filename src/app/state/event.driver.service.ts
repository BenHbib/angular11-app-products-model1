import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActionEvent } from './product.state';

// This service is used to manage relations between components
@Injectable({ providedIn: 'root' })
export class EventDriverService {
  // subject used to communicate objects between components
  sourceEventSubject: Subject<ActionEvent> = new Subject<ActionEvent>();
  sourceEventSubjectObservable = this.sourceEventSubject.asObservable();

  // Arranger par example l'écriture et la lecture des opération, (pour qu'on puisse compter les opérations d'ajout par ex.)
  sourceEventSubject2: Subject<ActionEvent> = new Subject<ActionEvent>();
  sourceEventSubjectObservable2 = this.sourceEventSubject.asObservable();

  publishEvent(event: ActionEvent) {
    this.sourceEventSubject.next(event);
  }
}
