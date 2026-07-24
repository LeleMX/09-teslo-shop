import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from "@angular/router";
import { ProductsService } from '@products/services/products.service';

@Component({
  selector: 'product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ProductCard implements OnInit{
  productService = inject(ProductsService);
  title = input.required<string>();
  description = input.required<string>();
  imageTitle = input.required<string>();
  /*   imageAlt = input.required<string>();
   */

  image = rxResource({
    params: () => ({}),
    stream: () => {
      return this.productService.getImageByImageName(this.imageTitle());
    }
  })

  ngOnInit() {
    console.log('Imagen Titulo ', this.image);
    
  }
}
