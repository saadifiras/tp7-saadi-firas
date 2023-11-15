import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/ProduitService';
import { Router } from '@angular/router';
import { Categorie } from '../model/categorie.model';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css'],
})
export class AddProduitComponent implements OnInit {
  newProduit = new Produit();

  categories!: Categorie[];
  newIdCat!: number;
  newCategorie!: Categorie;
  message: string;
  constructor(private produitService: ProduitService, private router: Router) {
    this.newProduit = {};
    this.message = '';
  }
  ngOnInit(): void {
    this.produitService.listeCategories().subscribe((cats) => {
      this.categories = cats;
      console.log(cats);
    });
  }
  addProduit() {
    this.newProduit.categorie = this.categories.find(
      (cat) => cat.idCat == this.newIdCat
    )!;
    this.produitService.ajouterProduit(this.newProduit).subscribe((prod) => {
      console.log(prod);
      this.router.navigate(['produits']);
    });
  }
}
