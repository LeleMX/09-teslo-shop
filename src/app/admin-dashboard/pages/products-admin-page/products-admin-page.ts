import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductTable } from "@products/components/product-table/product-table";
import { ProductsService } from '@products/services/products.service';
import { Pagination } from '@shared/components/pagination/pagination';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTable, Pagination, RouterLink],
  templateUrl: './products-admin-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ProductsAdminPage {
  productService = inject(ProductsService);
  paginationService = inject(PaginationService)
  
  productsPerPage = signal(10);

  productsResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() - 1, limit: this.productsPerPage() }),
    stream: ({ params }) => {
      return this.productService.getProducts({
        offset: (params.page) + 9,
        limit: params.limit
      });
    }
  })

}
