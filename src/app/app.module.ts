// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Importações do AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// Importe outros módulos do Firebase conforme necessário

import { environment } from '../environments/environment'; // Certifique-se de que está correto

@NgModule({
  declarations: [AppComponent],
  // Remova a propriedade 'entryComponents' se ela existir 
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // Inicialização do AngularFire com as configurações do Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    // Importe outros módulos do Firebase conforme necessário
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // ... outros providers
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
