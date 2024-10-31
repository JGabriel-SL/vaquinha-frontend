import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Router } from '@angular/router'; // Importe o Router
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HelpService } from './services/help.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    RouterModule.forRoot([]),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HelpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
/*


import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Importações do Firebase
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { getAuth } from 'firebase/auth';
import { provideAuth } from '@angular/fire/auth';
import { getFirestore } from 'firebase/firestore';
import { provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';  // Corrigido para singular

// Importação dos Componentes
import { HomePage } from './home/home.page';
import { CadastroPage } from './cadastro/cadastro.page';
import { FeedPage } from './feed/feed.page';
import { CriarHelpPage } from './criar-help/criar-help.page';
import { TermosUsoPage } from './termos-uso/termos-uso.page';
import { MeusHelpsPage } from './meus-helps/meus-helps.page';
import { EditarHelpPage } from './editar-help/editar-help.page';
import { VerDetalhesHelpPage } from './ver-detalhes-help/ver-detalhes-help.page';
import { EditarContaPage } from './editar-conta/editar-conta.page';
import { HelpsSalvosPage } from './helps-salvos/helps-salvos.page';
import { MeuSaldoPage } from './meu-saldo/meu-saldo.page';
import { ContaPage } from './conta/conta.page';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    CadastroPage,
    FeedPage,
    CriarHelpPage,
    TermosUsoPage,
    MeusHelpsPage,
    EditarHelpPage,
    VerDetalhesHelpPage,
    EditarContaPage,
    HelpsSalvosPage,
    MeuSaldoPage,
    ContaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),  // Corrigido para singular
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}



*/