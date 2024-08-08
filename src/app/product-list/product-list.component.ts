import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../shared/product';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  produits: IProduct[] = [];

  @Output() ajouterAuPanier = new EventEmitter<IProduct>();

  constructor(private produitService: ProductService) {}

  ngOnInit(): void {
    this.produits = this.produitService.getProduits();
  }

  ajouter(produit: IProduct): void {
    this.ajouterAuPanier.emit(produit);
  }
}
