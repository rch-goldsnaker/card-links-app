import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { observable } from 'rxjs';
import { Link } from 'src/app/models/links.models';
import { SupabaseService } from 'src/app/services/supabase.service';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() card: any = '';
  @Output() refreshContent: EventEmitter<boolean>;
  @Output() dataCard: EventEmitter<any>;

  constructor(
    private readonly supabase: SupabaseService,
    public dialog: MatDialog
  ) {
    this.refreshContent = new EventEmitter();
    this.dataCard = new EventEmitter();
  }

  async deleteCard(id: number) {
    const res = await this.supabase.deleteDataSupabase(id);
    await this.refreshContent.emit(true);
  }

  updateCard(
    id: number,
    title: string,
    description: string,
    icon: string,
    link: string
  ) {
    const dataCard = [id,title,description,icon,link]
    this.dataCard.emit(dataCard)
  }
}
