import { sp } from "@pnp/sp/presets/all";
import { LookupValue } from "../infrastructure";
import { ClientProduct } from "../model/Common";
import { Channel } from "../model/Common/Channel";

export class ClientProductRepository {
    private static LIST_NAME: string = "Productos por cliente";

    /*public static GetById(id: number): Promise<ClientProduct> {
        const entity = sp.web.lists.getByTitle(ClientProductRepository.LIST_NAME)
          .items.getById(id).select("ID", "Price", "COGS").get().then((item) => {
            return ClientProductRepository.BuildEntity(item);
          });
  
        return entity;
    }*/

    public static GetById(id: number): Promise<ClientProduct> {
        const entity = sp.web.lists.getByTitle(ClientProductRepository.LIST_NAME)
          .items.getById(id).select(
              "ID",
              "Title",
              "SKUDescription",
              "Client/ID",
              "Client/Title",
              "Product/ID",
              "Product/Title",
              "Price",
              "COGS",
              "EAN",
              "BusinessUnit/ID",
              "BusinessUnit/Title",
              "Brand/ID",
              "Brand/Title",
              "ProductCategory/ID",
              "ProductCategory/Title").expand("Client", "Product", "BusinessUnit", "Brand", "ProductCategory" ).get().then((item) => {
            return ClientProductRepository.BuildEntity(item);
          });
  
        return entity;
    }

    /*public static async GetByClientAndProduct(clientId: number, productId: number):Promise<ClientProduct>
    {   console.log(clientId, productId);
        const collection = sp.web.lists.getByTitle(ClientProductRepository.LIST_NAME)
            .items.select("ID", "Price", "COGS").filter(`ClientId eq ${clientId} and ProductId eq ${productId}`).get().then((items) => { 
                if(items.length > 0)
                    return ClientProductRepository.BuildEntity(items[0]);
                else
                    return null;
            });

        return collection;
    }*/

    public static async GetByClientAndProduct(clientId: number, skuNumber: string):Promise<ClientProduct>
    {   //console.log(skuNumber, clientId, productId);
        const collection = sp.web.lists.getByTitle(ClientProductRepository.LIST_NAME)
            .items.select("ID", "Title", "Price", "COGS").filter(`Title eq ${skuNumber} and ClientId eq ${clientId}`).get().then((items) => { 
                if(items.length > 0)
                    return ClientProductRepository.BuildEntity(items[0]);
                else
                    return null;
            });

        return collection;
    }


    public static async GetAll():Promise<ClientProduct[]>
    {
        const collection = sp.web.lists.getByTitle(ClientProductRepository.LIST_NAME)
            .items.select(
                "ID", 
                "Title",
                "SKUDescription",
                "Client/ID",
                "Client/Title",
                "Product/ID",
                "Product/Title",
                "Price",
                "COGS",
                "EAN",
                "BusinessUnit/ID",
                "BusinessUnit/Title", 
                "Brand/ID",
                "Brand/Title",
                "ProductCategory/ID",
                "ProductCategory/Title").expand("Client", "Product", "BusinessUnit", "Brand", "ProductCategory" ).getAll().then((items) => { 
                let result: ClientProduct[] = [];
                items.map((item) => {
                    if(item.Client && item.Client.ID && item.Client.Title &&
                        item.Product && item.Product.ID && item.Product.Title &&
                        item.BusinessUnit && item.BusinessUnit.ID && item.BusinessUnit.Title && 
                       item.Brand && item.Brand.ID && item.Brand.Title &&
                       item.ProductCategory && item.ProductCategory.ID && item.ProductCategory.Title)
                        result.push(ClientProductRepository.BuildEntity(item));
                });
                return result;
            });

        return collection;
    }

    private static BuildEntity(item: any): ClientProduct {
        let entity = new ClientProduct();

        entity.ItemId = item.ID;
        entity.SKUNumber = item.Title;
        entity.SKUDescription = item.SKUDescription;
        entity.Price = item.Price;
        entity.COGS = item.COGS;
        entity.BusinessUnit = item.BusinessUnit ? { ItemId: item.BusinessUnit.ID, Value: item.BusinessUnit.Title } : null;
        entity.Brand = item.Brand ? { ItemId: item.Brand.ID, Value: item.Brand.Title } : null;
        entity.Category = item.ProductCategory ? { ItemId: item.ProductCategory.ID, Value: item.ProductCategory.Title } : null;
        entity.Client = item.Client ? { ItemId: item.Client.ID, Value: item.Client.Title } : null;
        //entity.Product = item.Product ? { ItemId: item.Product.ID, Value: item.Product.Title } : null;
    

        return entity;
    }
    


}