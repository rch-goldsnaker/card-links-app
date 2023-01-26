import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from '../environments/environments';
// import { Database } from 'src/schema'

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  _session: AuthSession | null = null;
  data:any;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    return this.supabase.from('profiles').upsert(update);
  }

    downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }

  getDataSupabase(){
    return this.supabase
      .from('linksCard')
      .select()
      .order('title', { ascending: true });
  }

  sendDataSupabase(title:string,description:string,icon:string,link:string){
    return this.supabase
      .from('linksCard')
      .insert({ title: title, description: description, icon: icon, link: link });
  }

  deleteDataSupabase(id:number){
    return this.supabase.from('linksCard').delete().eq('id', id);
  }

  updateDataSupabase(id:number,title:string,description:string,icon:string,link:string){
    return this.supabase
      .from('linksCard')
      .update({title:title,description:description,icon:icon,link:link})
      .eq('id', id);
  }
}
