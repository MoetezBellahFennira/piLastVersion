import { Component,OnInit  } from '@angular/core';
import { PredictionService } from './prediction.service';


@Component({
  selector: 'app-ml-directeur',
  templateUrl: './ml-directeur.component.html',
  styleUrls: ['./ml-directeur.component.css']
})
export class MlDirecteurComponent  {

  nomJoueur: string="";
  predictedValue?: number;
  error: string="";

  constructor(private apiService: PredictionService) { }

  predictValue(): void {
    this.apiService.predictValue(this.nomJoueur)
      .subscribe(
        data => {
          this.predictedValue = data.predicted_value/ 1000000;
          this.error = "";
        },
        error => {
          this.error = error.error.error;
          this.predictedValue = 0;
        }
      );
  }
}
