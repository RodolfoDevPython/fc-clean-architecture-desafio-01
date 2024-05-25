import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        id: '1',
        name: "Product test 1",
        price: 300
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBe("1");
    expect(response.body.name).toBe("Product test 1");
    expect(response.body.price).toBe(300);
    
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/product").send({
      name: "Product test error",
    });
    expect(response.status).toBe(500);
  });

  it("should list all customer", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        id: '1',
        name: "Product test 1",
        price: 400
    });

    expect(response.status).toBe(200);

    const response2 = await request(app)
      .post("/product")
      .send({
        id: '2',
        name: "Product test 2",
        price: 500
    });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product1 = listResponse.body.products[0];
    expect(product1.name).toBe("Product test 1");
    expect(product1.price).toBe(400);
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Product test 2");
    expect(product2.price).toBe(500);

    const listResponseXML = await request(app)
    .get("/product")
    .set("Accept", "application/xml")
    .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<id>1</id>`);
    expect(listResponseXML.text).toContain(`<name>Product test 1</name>`);
    expect(listResponseXML.text).toContain("<price>400</price>");
    expect(listResponseXML.text).toContain(`<id>2</id>`);
    expect(listResponseXML.text).toContain(`<name>Product test 2</name>`);
    expect(listResponseXML.text).toContain("<price>500</price>");
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`</products>`);
    

    
  });
});
