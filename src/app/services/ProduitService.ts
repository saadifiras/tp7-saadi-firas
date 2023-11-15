import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Categorie } from '../model/categorie.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  // par injectable le produitService  peut etre injecter dans autre classe
  providedIn: 'root',
})
export class ProduitService {
  produits!: Produit[]; // un tableau du produits
  categories!: Categorie[];

  constructor(private http: HttpClient) {
    // this.categories = [
    //   { idCat: 1, nomCat: 'PC' },
    //   { idCat: 2, nomCat: 'Imprimante' },
    // ];
    // this.produits = [
    //   {
    //     idProduit: 1,
    //     nomProduit: 'PC Asus',
    //     prixProduit: 3000.6,
    //     dateCreation: new Date('01/14/2011'),
    //     categorie: { idCat: 1, nomCat: 'PC' },
    //   },
    //   {
    //     idProduit: 2,
    //     nomProduit: 'Imprimante Epson',
    //     prixProduit: 450,
    //     dateCreation: new Date('12/17/2010'),
    //     categorie: { idCat: 2, nomCat: 'Imprimante' },
    //   },
    //   {
    //     idProduit: 3,
    //     nomProduit: 'Tablette Samsung',
    //     prixProduit: 900.123,
    //     dateCreation: new Date('02/20/2020'),
    //     categorie: { idCat: 1, nomCat: 'PC' },
    //   },
    // ];
  }

  listeProduit(): Observable<Produit[]> {
    return this.http.get<Produit[]>(apiURL);
  }

  ajouterProduit(prod: Produit): Observable<Produit> {
    return this.http.post<Produit>(apiURL, prod, httpOptions);
  }
  supprimerProduit(id: number) {
    const url = `${apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }
  consulterProduit(id: number): Observable<Produit> {
    const url = `${apiURL}/${id}`;
    return this.http.get<Produit>(url);
  }

  updateProduit(prod: Produit): Observable<Produit> {
    return this.http.put<Produit>(apiURL, prod, httpOptions);
  }
  listeCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(apiURL + '/cat');
  }
}
