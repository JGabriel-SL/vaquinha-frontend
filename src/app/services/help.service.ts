// src/app/services/help.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

export interface Help {
  id?: string;
  nome: string;
  quantia: string;
  dataEncerramento: string;
  categoria: string;
  descricao: string;
  chavePix: string;
  imagemUrl?: string;
  provasUrls?: string[];
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class HelpService {
  private helpsCollection: AngularFirestoreCollection<Help>;
  helps$: Observable<Help[]>;

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {
    this.helpsCollection = this.firestore.collection<Help>('helps', ref => ref.orderBy('createdAt', 'desc'));
    this.helps$ = this.helpsCollection.valueChanges({ idField: 'id' });
  }

  // Método para criar um novo Help com upload de imagens
  criarHelp(helpData: Help, imagem: File | null, provas: File[]): Promise<void> {
    const id = this.firestore.createId();
    const storagePath = `helps/${id}/imagem_${imagem?.name}`;
    const storageRef = this.storage.ref(storagePath);
    
    const uploadTask = imagem ? this.storage.upload(storagePath, imagem) : null;

    return new Promise((resolve, reject) => {
      if (uploadTask) {
        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            storageRef.getDownloadURL().subscribe(url => {
              helpData.imagemUrl = url;

              // Upload das provas
              const provasUrls: string[] = [];
              const uploadProvasPromises = provas.map(prova => {
                const provaPath = `helps/${id}/provas_${prova.name}`;
                const provaRef = this.storage.ref(provaPath);
                return this.storage.upload(provaPath, prova).snapshotChanges().pipe(
                  finalize(() => {
                    provaRef.getDownloadURL().subscribe(provaUrl => {
                      provasUrls.push(provaUrl);
                      if (provasUrls.length === provas.length) {
                        helpData.provasUrls = provasUrls;
                        helpData.createdAt = new Date();
                        this.helpsCollection.doc(id).set(helpData)
                          .then(() => resolve())
                          .catch(err => reject(err));
                      }
                    });
                  })
                ).toPromise();
              });

              if (uploadProvasPromises.length > 0) {
                Promise.all(uploadProvasPromises).then(() => {
                  resolve();
                }).catch(err => reject(err));
              } else {
                helpData.provasUrls = [];
                this.helpsCollection.doc(id).set(helpData)
                  .then(() => resolve())
                  .catch(err => reject(err));
              }
            });
          })
        ).subscribe();
      } else {
        // Sem imagem principal
        helpData.imagemUrl = '';
        // Upload das provas
        const provasUrls: string[] = [];
        const uploadProvasPromises = provas.map(prova => {
          const provaPath = `helps/${id}/provas_${prova.name}`;
          const provaRef = this.storage.ref(provaPath);
          return this.storage.upload(provaPath, prova).snapshotChanges().pipe(
            finalize(() => {
              provaRef.getDownloadURL().subscribe(provaUrl => {
                provasUrls.push(provaUrl);
                if (provasUrls.length === provas.length) {
                  helpData.provasUrls = provasUrls;
                  helpData.createdAt = new Date();
                  this.helpsCollection.doc(id).set(helpData)
                    .then(() => resolve())
                    .catch(err => reject(err));
                }
              });
            })
          ).toPromise();
        });

        if (uploadProvasPromises.length > 0) {
          Promise.all(uploadProvasPromises).then(() => {
            resolve();
          }).catch(err => reject(err));
        } else {
          helpData.provasUrls = [];
          helpData.createdAt = new Date();
          this.helpsCollection.doc(id).set(helpData)
            .then(() => resolve())
            .catch(err => reject(err));
        }
      }
    });
  }

  // Método para obter todos os Helps
  getHelps(): Observable<Help[]> {
    return this.helps$;
  }
}
