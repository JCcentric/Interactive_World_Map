import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private baseUrl = "https://api.worldbank.org/v2/country/";

  constructor(private http: HttpClient) { }

  // Created the method to gather country data based on country ID in SVG
  getCountryData(countryID: string): Observable<any> {
    const url = `${this.baseUrl}${countryID}?format=json`;
    return this.http.get(url)
  }
}
