import {Component, OnInit} from '@angular/core';
import { PaisService } from '../../services/pais.service';
import {Country} from "../../interfaces/pais.interface";

@Component({
    selector: 'app-por-continente',
    templateUrl: './por-continente.component.html',
    styles: [`
        button{
            margin-right: 5px;
        }
    `]
})
export class PorContinenteComponent {
    regiones: string[] = [ 'africa', 'americas', 'asia', 'europe', 'oceania'];
    paises : Country[] = []
    hayError: boolean = false;
    regionesObj = {
        africa : 'Africa',
        americas : 'America',
        asia : 'Asia',
        europe : 'Europa',
        oceania : 'Oceania'
    }
    
    regionActiva: string= '';
    
    getClase( region : string )  : string {
        return (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary'
    }
    
    constructor(private paisService : PaisService) {
    }
    
    activarRegion(region : string, codigo : string) : void {
        if (this.regionActiva === region) return;
        this.regionActiva = region;
        this.paises = [];
        this.paisService.buscarPaisesDeUnContinente(codigo)
            .subscribe( paises =>  this.paises = paises)
    }
    
}
