import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product('1', 'Product 1', 200);

const input = {
    id: product.id,
    name: 'Product Update',
    price: 300
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit Test find customer use case", () => {

    it('should update product', async () => {
        const mockRepository = MockRepository();

        const updateProductUseCase = new UpdateProductUseCase(mockRepository);

        const productUpdated = await updateProductUseCase.execute(input);

        expect(productUpdated).toEqual({
            id: product.id,
            name: input.name,
            price: input.price
        });

    });

});