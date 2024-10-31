// src/app/models/help.model.ts
import { User } from './user.model';

export interface Help {
  id: string;
  nome: string;
  valorArrecadado: number;
  valorMeta: number;
  status: string;
  quantia: number;
  dataInicio: string; // ou Date, conforme a necessidade
  dataEncerramento: string;
  categoria: string;
  descricao: string;
  chavePix: string;
  imagemUrl: string;
  criador: User; // Certifique-se de que a interface User está definida
  comprovantes: string[];
  createdAt: Date;
  encerradoEm: Date | null; // Usando encerradoEm para indicar encerramento
  salvo?: boolean; // Adicionando a propriedade 'salvo'
}

