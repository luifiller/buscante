import { Livro, LivrosResultado, Item, VolumeInfo, ImageLinks } from './../../models/interfaces';
import { LivroService } from './../../service/livro.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

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

  livrosResultadoParaLivros(items): Livro[] {
    const livros: Livro[] = [];

    items.forEach(item => {
      livros.push(this.livro = {
        title: item.volumeInfo?.title,
        authors: item.volumeInfo?.authors,
        publisher: item.volumeInfo?.publisher,
        publishedDate: item.volumeInfo?.publishedDate,
        description: item.volumeInfo?.description,
        previewLink: item.volumeInfo?.previewLink,
        thumbnail: item.volumeInfo?.imageLinks?.thumbnail
      })
    });
    return livros;
  }

  ngOnDestroy() {
    // Encerra o Observable para liberar recursos e cancelar execuções do Observable
    this.subscription.unsubscribe();
  }
}



