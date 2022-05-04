import {Component} from '@angular/core';
import { PaisService } from '../../services/pais.service';
import {Country} from "../../interfaces/pais.interface";
import { error } from '@angular/compiler/src/util';

@Component({
    selector: 'app-por-pais',
    templateUrl: './por-pais.component.html',
    styles: [`
        li{
            cursor: pointer;
        }
    `]
})
export class PorPaisComponent{
    termino: string = '';
    hayError: boolean = false;
    paises : Country[] = [];
    paisesSugeridos: Country[] = [];
    mostrarSugerencia: boolean = false;
    constructor( private paisService: PaisService){}
    
    buscar( termino: string ){
        this.hayError = false;
        this.mostrarSugerencia = false;
        this.termino = termino;
        // Para que un observable se dispare tengo que estar suscrito
        this.paisService.buscarPais( this.termino )
            .subscribe( paises => {
                console.log(paises);
                this.paises = paises;
            }, (err) =>{
                this.hayError = true;
                this.paises = [];
            } )
    }
    
    sugerencias( termino : string){
         this.hayError = false;
         this.mostrarSugerencia = true;
         this.termino = termino;
         this.paisService.buscarPais( termino )
             .subscribe(
                 paises => this.paisesSugeridos = paises.splice(0,5),
                 (error) => this.paisesSugeridos = [])
    }
    
    buscarSugerido( termino : string) {
        this.buscar( termino );
    }
    
}
