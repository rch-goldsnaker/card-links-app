import { Component, OnInit } from '@angular/core';
import { Link } from 'src/app/models/links.models';
import { SupabaseService } from 'src/app/services/supabase.service';

import {LinksService} from '../../services/links.service'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  links: Link[] = [];
  searchFilter: any = '';

  dataCardPadre: string = '';

  constructor(
    private linkService: LinksService,
    private readonly supabase: SupabaseService
  ) {}

  ngOnInit(): void {
    this.getDataSupabase();
  }

  async getDataSupabase() {
    try {
      const res: any = await this.supabase.getDataSupabase();
      this.links = res.data;
    } catch {
      console.log('error');
    }
  }

  refreshDataSupabase() {
    this.getDataSupabase();
  }

  dataCardModify(title: string) {
    this.dataCardPadre = title;
  }

  searchData(data:any){
    this.searchFilter = data
  }
}
