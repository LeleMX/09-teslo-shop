import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductsService } from '@products/services/products.service';
import { Pagination } from '@shared/components/pagination/pagination';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard, Pagination],
  templateUrl: './gender-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class GenderPage {
  paginationService = inject(PaginationService);
  productService = inject(ProductsService);

  route = inject(ActivatedRoute);
  gender = toSignal(this.route.params.pipe(map(({ gender }) => gender)));
  
  productsResource = rxResource({
    params: () => ({ gender: this.gender(), page: this.paginationService.currentPage() - 1 }),
    stream: ({params}) => {
      console.log({params});
      const pageSize = 10;
      return this.productService.getProducts({
        gender: params.gender,
        offset: (params.page) * pageSize,
        limit: pageSize
      });
    },
  });
}
