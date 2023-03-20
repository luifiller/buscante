import { Livro, LivrosResultado, Item, VolumeInfo, ImageLinks } from './../../models/interfaces';
import { LivroService } from './../../service/livro.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription, switchMap, map } from 'rxjs';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy{

  listaLivros: Livro[];
  // FormControl é possível ter acesso a valores, status de validação e interações do usuário e eventos
  campoBusca = new FormControl();
  subscription: Subscription;
  livro: Livro;

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    // O 'switchMap' utiliza apenas o último valor digitado para fazer a requisição, ele desconsidera os valores anteriormente inputados
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    map(items => this.listaLivros = this.livrosResultadoParaLivros(items))
  )

  // buscarLivros() {
  //   this.subscription = this.service.buscar(this.campoBusca).subscribe({
  //     // O código comentado abaixo está depreciado, portanto, o descomentado está de acordo com as exigências atuais do RxJS.
  //     // (retornoAPI) => console.log(retornoAPI),
  //     // (error) => console.log(error),

  //     next: (items) => {
  //       console.log('Requisições ao servidor');
  //       this.listaLivros = this.livrosResultadoParaLivros(items)

  //     },
  //     error: erro => console.error(erro),
  //   });
  // }

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



