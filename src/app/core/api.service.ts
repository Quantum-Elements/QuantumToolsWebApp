import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private serverIP = "http://34.220.175.169:4000/"

  public gate_fidelity: number;
  private jobStatusSubject = new Subject<any>();

  constructor(public http: HttpClient, public configService: ConfigService) { }

  url(endpoint: string) {
    return this.serverIP + endpoint
  }
  simulate() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const options = {
      headers,
      observe: 'response' as 'response',
      responseType: 'json' as 'json',
      // NOTE: The following line disables SSL verification
      // Only use this for testing or development purposes
      httpsAgent: { rejectUnauthorized: false },
    };
    let param = this.getSimulationParam();
    this.http.post<any>(this.url('run_simulation'), param, options).subscribe(response => {
      let job_id = response.body.job_id
      this.checkJobResult(job_id)
    })
  }
  getJobStatusSubject() {
    return this.jobStatusSubject.asObservable();
  }
  checkJobResult(job_id) {
    const checkInterval = 5000;
    const subscription = interval(checkInterval).subscribe(() => {
      this.http.get(this.url(`simulation_data/${job_id}`)).subscribe(
        (response: any) => {
          // Check if the job is done
          if (response.message) {
            console.log(response.message);
          } else {
            subscription.unsubscribe(); // Stop the interval
            this.gate_fidelity = response.task_results[0].fidelity
            console.log(this.gate_fidelity)
            this.jobStatusSubject.next({ done: true, result: this.gate_fidelity })
          }
        },
        (error) => {
          console.error('Error occurred while checking job status:', error);
          subscription.unsubscribe(); // Stop the interval in case of an error
        }
      );
    });
  }
  getSimulationParam() {
    let param = {
      "qudits": this.configService.qudits.map(q => q.id + 1),
      //"coupling_map": this.configService.couplings.map(c => [c.qudit1.id + 1, c.qudit2.id + 1]),
      "tf": 200,
      "qudits_config": this.configService.qudits.reduce((result, qudit) => { return { ...result, ...qudit.toJSON() } }, {}),
      "coupling_config": this.configService.couplings.map(c => c.toJSON()),
      "pulse_schedule": this.configService.qudits.reduce((result, qudit) => { return { ...result, ...qudit.pulseScheduleToJSON() } }, {}),
      "solver_opt": this.configService.solver_opt.toJson(),
      "tasks": [
        {
          "type": "gate_fidelity",
          "target": {
            "qudit": 1,
            "gate": "XGate"
          },
          "initial_state": this.configService.qudits.reduce((result, qudit) => { return { ...result, ...qudit.initialStateToJson() } }, [])
        }
      ]
    }
    // param["qudits_config"]["qudit_1"]["drive_freq"] = 0.8011043099426882
    // param["qudits_config"]["qudit_1"]["x_drive"] = {
    //   "type": "gaussian",
    //   "scale": 0.003361971298528725,
    //   "mu": 100,
    //   "sigma": 30,
    //   "v_shift": 8.166326661816133e-5,
    //   "tspan": [
    //     0,
    //     200
    //   ]
    // }
    console.log(param)
    return param
  }
}
