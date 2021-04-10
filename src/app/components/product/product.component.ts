import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  dataLoaded = false;
  filterText="";
  

 constructor(private productService:ProductService, 
  private activatedRoute:ActivatedRoute,
  private toastrService:ToastrService,
  private cartService:CartService){} //httpClient türünde nesne istiyorum.

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["categoryId"]){
        this.getProductsByCategory(params["categoryId"])
      }else{
        this.getProducts() //parametre varsa yukarıdakini yok ise hepsini çalıştırıyor.
      }
    })
    
  }
getProducts(){
  this.productService.getProducts().subscribe(response=>{
    this.products=response.data
    this.dataLoaded= true; //senkron hale getirdi.yüklendiği anda true hale getiriyoruz.
  })

  }

  getProductsByCategory(categoryId:number){
    this.productService.getProductsByCategory(categoryId).subscribe(response=>{
      this.products=response.data
      this.dataLoaded= true; //senkron hale getirdi.yüklendiği anda true hale getiriyoruz.
    })
  
    }

  addToCart(product:Product){
    if(product.productId===1){
      this.toastrService.error("Hata","Bu ürün sepete eklenemez.")
    }else{
      this.toastrService.success("Sepete eklendi",product.productName)
      this.cartService.addToCart(product);
    }
      
  }
}


