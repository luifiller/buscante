import { Livro, LivrosResultado, Item, VolumeInfo, ImageLinks } from './../../models/interfaces';
import { LivroService } from './../../service/livro.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy{

  listaLivros: Livro[];

  campoBusca: string = '';
  subscription: Subscription;
  livro: Livro;

  constructor(private service: LivroService) { }

  buscarLivros() {
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      // O código comentado abaixo está depreciado, portanto, o descomentado está de acordo com as exigências atuais do RxJS.
      // (retornoAPI) => console.log(retornoAPI),
      // (error) => console.log(error),

      next: (items) => {
        this.listaLivros = this.livrosResultadoParaLivros(items)
      },
      error: erro => console.error(erro),
    });
  }

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }

  ngOnDestroy() {
    // Encerra o Observable para liberar recursos e cancelar execuções do Observable
    this.subscription.unsubscribe();
  }
}



