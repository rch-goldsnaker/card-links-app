import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-tool-card',
  templateUrl: './tool-card.component.html',
  styleUrls: ['./tool-card.component.css'],
})
export class ToolCardComponent implements OnInit {
  form: FormGroup;
  isModifing: boolean = false;
  modiFingData: any = [];
  statusSendButton: string = 'Add';
  search: string = '';

  @Input() dataCard: any = '';
  @Output() refreshContent: EventEmitter<boolean>;
  @Output() filterContent: EventEmitter<any>;
  constructor(
    private readonly supabase: SupabaseService,
    private fb: FormBuilder
  ) {
    this.refreshContent = new EventEmitter();
    this.filterContent = new EventEmitter();

    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      icon: ['', Validators.required],
      link: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.modiFingData = changes['dataCard'].currentValue;
    console.log(this.modiFingData);
    const title = this.modiFingData[1];
    const description = this.modiFingData[2];
    const icon = this.modiFingData[3];
    const link = this.modiFingData[4];
    this.modifyCard(title, description, icon, link);
    this.isModifing = true;
    this.statusSendButton = 'Edit';
  }

  async sendDataSupabase() {
    if (this.isModifing) {
      const res = await this.supabase.updateDataSupabase(
        this.modiFingData[0],
        this.form.value.title,
        this.form.value.description,
        this.form.value.icon,
        this.form.value.link
      );
      this.refreshContent.emit(true);
      this.isModifing = false;
      this.form.reset();
      this.statusSendButton = 'Add';
    } else {
      const res = await this.supabase.sendDataSupabase(
        this.form.value.title,
        this.form.value.description,
        this.form.value.icon,
        this.form.value.link
      );
      this.refreshContent.emit(true);
      this.isModifing = false;
      this.form.reset();
      this.statusSendButton = 'Add';
    }
  }

  modifyCard(title: string, description: string, icon: string, link: string) {
    this.form.patchValue({
      title: title,
      description: description,
      icon: icon,
      link: link,
    });
  }

  onSearchCard(search: any) {
    this.search = search;
    const search2 = search
    this.filterContent.emit(search2);
  }
}
