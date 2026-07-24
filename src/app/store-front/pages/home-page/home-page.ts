import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductsResponse } from '@products/interfaces/product.interface';
import { ProductsService } from '@products/services/products.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class HomePage {

  productos = signal<ProductsResponse[]>([]);

  productService = inject(ProductsService);

  productsResource = rxResource({
    params: () => ({}),
    stream: () => {
      return this.productService.getProducts({
        limit: 5,
        gender: 'kid',        
      });
    }
  })

}
