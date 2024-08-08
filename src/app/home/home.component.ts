import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { IProduct } from '../shared/product';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductListComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  produits: IProduct[] = [];
  panier: IProduct[] = [];
  totalHT: number = 0;
  totalTTC: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.produits = this.productService.getProduits();
    this.panier = this.productService.getPanierDirect();
    this.mettreAJourTotaux();
  }

  ajouterAuPanier(produit: IProduct): void {
    this.productService.ajouterAuPanier(produit);
    this.mettreAJourPanier();
  }

  modifierQuantite(produit: IProduct, quantite: number): void {
    this.productService.modifierQuantite(produit, quantite);
    this.mettreAJourPanier();
  }

  private mettreAJourPanier(): void {
    this.panier = this.productService.getPanierDirect();
    this.mettreAJourTotaux();
  }

  private mettreAJourTotaux(): void {
    this.totalHT = this.productService.calculerTotalHT();
    this.totalTTC = this.productService.calculerTotalTTC();
  }
}
