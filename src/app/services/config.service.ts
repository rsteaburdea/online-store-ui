import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'src/app/models/config.model';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private configUrl: string = 'assets/config.json';
    constructor(private http: HttpClient) { }
    public getConfig(): Observable<Config> {
        return this.http.get<Config>(this.configUrl);
    }
}