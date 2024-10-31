import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Help } from '../models/help.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class HelpService {
  private apiUrl = 'https://reqres.in/api/users'; // URL da API (verifique se é o correto para seu uso)

  private helps: Help[] = [];
  private helpsSalvos: Help[] = [];

  private helpsSubject = new BehaviorSubject<Help[]>(this.helps);
  private helpsSalvosSubject = new BehaviorSubject<Help[]>(this.helpsSalvos);

  private helpDetailsSubject = new BehaviorSubject<Help | null>(null);
  helpDetails$ = this.helpDetailsSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  setHelpDetails(help: Help): void {
    this.helpDetailsSubject.next(help);
  }

  getHelps(): Observable<Help[]> {
    return this.helpsSubject.asObservable();
  }

  getHelpsSalvos(): Observable<Help[]> {
    return this.helpsSalvosSubject.asObservable();
  }

  addHelp(help: Help): void {
    const newHelp: Help = {
      ...help,
      id: uuidv4(),
      salvo: false,
      valorArrecadado: 0,
      dataInicio: new Date().toISOString(),
      dataEncerramento: help.dataEncerramento
        ? new Date(help.dataEncerramento).toISOString()
        : '',
      encerradoEm: null,
    };

    this.helps.push(newHelp);
    this.helpsSubject.next(this.helps);

    // Simulação de criação de help, deve ser adaptada conforme sua API
    this.http
      .post<Help>(this.apiUrl, newHelp)
      .pipe(
        tap((response) => console.log('Help criado com sucesso:', response)),
        catchError(this.handleError('addHelp'))
      )
      .subscribe();
  }

  salvarHelp(help: Help): void {
    const index = this.helpsSalvos.findIndex((h) => h.id === help.id);

    if (index > -1) {
      this.helpsSalvos.splice(index, 1);
      help.salvo = false;
    } else {
      this.helpsSalvos.push(help);
      help.salvo = true;
    }
    this.helpsSalvosSubject.next(this.helpsSalvos);
    this.helpsSubject.next(this.helps);
  }

  getHelpById(helpId: string): Observable<Help | undefined> {
    if (!helpId || typeof helpId !== 'string') {
      return throwError(() => new Error('ID de help inválido'));
    }

    const help = this.helps.find((h) => h.id === helpId);
    return help ? of(help) : throwError(() => new Error('Help não encontrado'));
  }

  updateHelp(helpId: string, updatedHelp: Help): Observable<Help> {
    const index = this.helps.findIndex((h) => h.id === helpId);
    if (index === -1) {
      return throwError(() => new Error('Help não encontrado'));
    }

    this.helps[index] = { ...this.helps[index], ...updatedHelp };
    this.helpsSubject.next(this.helps);

    return this.http
      .put<Help>(`${this.apiUrl}/${helpId}`, this.helps[index])
      .pipe(
        tap(() => console.log('Help atualizado com sucesso')),
        catchError(this.handleError('updateHelp'))
      );
  }

  endHelp(helpId: string): Observable<void> {
    const index = this.helps.findIndex((h) => h.id === helpId);
    if (index === -1) {
      return throwError(() => new Error('Help não encontrado'));
    }

    const help = this.helps[index];
    help.encerradoEm = new Date(); // Marca o momento em que o help foi encerrado

    return this.http
      .put<void>(`${this.apiUrl}/${helpId}`, help)
      .pipe(
        tap(() => {
          this.helpsSubject.next(this.helps);
          console.log(`Help com ID ${helpId} encerrado com sucesso.`);
        }),
        catchError(this.handleError('endHelp'))
      );
  }

  sacarHelp(helpId: string): void {
    const help = this.helps.find((h) => h.id === helpId);
    if (help && help.encerradoEm) {
      // Define o help nos detalhes para ser acessado pela página 'meu-saldo'
      this.setHelpDetails(help); // Usando o método setHelpDetails
      
      // Redireciona para a página 'meu-saldo'
      this.router.navigate(['/meu-saldo'], {
        queryParams: {  
          helpId: help.id, 
          valorArrecadado: help.valorArrecadado, 
          dataInicio: help.dataInicio, 
          dataEncerramento: help.dataEncerramento, 
          imagemUrl: help.imagemUrl, 
          nome: help.nome,
          isEncerrado: help.encerradoEm !== undefined // Passa a informação de encerramento
        } 
      });
    } else {
      console.error('Help não encontrado ou não encerrado');
    }
  }

  getTotalArrecadado(): number {
    return this.helps.reduce((total, h) => total + (h.valorArrecadado || 0), 0);
  }

  getTotalArrecadadoEncerrados(): number {
    return this.helps
      .filter((help) => help.encerradoEm !== null)
      .reduce((total, help) => total + (help.valorArrecadado || 0), 0);
  }

  private handleError(operation: string) {
    return (error: any) => {
      console.error(`${operation} falhou: ${error.message}`);
      return throwError(() => error);
    };
  }
}
