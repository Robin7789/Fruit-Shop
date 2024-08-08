import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../shared/product';
import { mockProducts } from '../shared/mockProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private produits: IProduct[] = mockProducts;
  private panier: IProduct[] = [];
  private panierSubject = new BehaviorSubject<IProduct[]>(this.panier);

  getProduits(): IProduct[] {
    return this.produits;
  }

  getPanier(): Observable<IProduct[]> {
    return this.panierSubject.asObservable();
  }

  ajouterAuPanier(produit: IProduct): void {
    const produitExistant = this.panier.find((p) => p.nom === produit.nom);
    if (produitExistant) {
      produitExistant.quantite += 1;
    } else {
      this.panier.push({ ...produit, quantite: 1 });
    }
    this.panierSubject.next(this.panier);
  }

  modifierQuantite(produit: IProduct, quantite: number): void {
    const produitExistant = this.panier.find((p) => p.nom === produit.nom);
    if (produitExistant) {
      produitExistant.quantite = quantite;
      if (produitExistant.quantite <= 0) {
        this.panier = this.panier.filter((p) => p.nom !== produit.nom);
      }
    }
    this.panierSubject.next(this.panier);
  }

  calculerTotalHT(): number {
    return this.panier.reduce(
      (acc, produit) => acc + produit.prixHT * produit.quantite,
      0
    );
  }

  // TVA 20%
  calculerTotalTTC(): number {
    return this.calculerTotalHT() * 1.2;
  }

  getPanierDirect(): IProduct[] {
    return this.panier;
  }
}
