import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Link } from '../models/links.models';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor(
    private http: HttpClient
  ) { }

  getAllLinks(){
    return this.http.get<Link[]>('../../../assets/data/data.json')
  }
}
