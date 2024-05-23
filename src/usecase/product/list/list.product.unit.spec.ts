import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const product1 = new Product('1', 'Product 1', 100);
const product2 = new Product('1', 'Product 1', 100);

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    };
}

describe("Unit test for listing product use case", () => {

    
    it('should list all products', async () => {
        const mockRepository = MockRepository();

        const listProductUseCase = new ListProductUseCase(mockRepository);

        const { products } = await listProductUseCase.execute();

        expect(products[0]).toEqual({
            id: product1.id,
            name: product1.name,
            price: product1.price
        });

        expect(products[1]).toEqual({
            id: product1.id,
            name: product1.name,
            price: product1.price
        })

    });

})