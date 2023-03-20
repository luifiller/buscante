import { LivroService } from './../../service/livro.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy{

  listaLivros: [];

  campoBusca: string = '';
  subscription: Subscription;

  constructor(private service: LivroService) { }

  buscarLivros() {
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      // O código comentado abaixo está depreciado, portanto, o descomentado está de acordo com as exigências atuais do RxJS.
      // (retornoAPI) => console.log(retornoAPI),
      // (error) => console.log(error),

      next: retornoAPI => console.log(retornoAPI),
      error: erro => console.error(erro),
      complete: () => console.log('Observable completado')
    });
  }

  ngOnDestroy() {
    // Encerra o Observable para liberar recursos e cancelar execuções do Observable
    this.subscription.unsubscribe();
  }
}



