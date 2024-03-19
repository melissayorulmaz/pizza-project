describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173");
  });
});

describe("Pizza Sipariş Formu Testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/order-list");
  });

  it('İsim kısmına en az 3 karakter girilmezse "SİPARİŞ VER" butonu disabled olmalı', () => {
    cy.get(".isim").type("AB"); // İsim kısmına 2 karakter girilirse?
    cy.get(".submit-button").should("be.disabled");
  });

  it("Boyut Seç kısmında sadece 1 tane boyut seçilmeli, 1'den fazla seçilmemeli", () => {
    cy.get('.size-options input[type="radio"]').check("Küçük");
    cy.get('.size-options input[type="radio"]').check("Orta");
    cy.get('.size-options input[type="radio"]:checked').should(
      "have.length",
      1
    );
  });

  it('Boyut Seç kısmında seçim yapılmazsa "SİPARİŞ VER" butonu disabled olmalı', () => {
    // Hiçbir boyut seçilmezse?
    cy.get(".submit-button").should("be.disabled");
  });

  it("Hamur Seç kısmında sadece 1 tane hamur seçilmeli, 1'den fazla seçilmemeli", () => {
    cy.get(".dough-options select").select("İnce");
    cy.get(".dough-options select").select("Standart");
    cy.get(".dough-options select").select("Kalın");
    cy.get(".dough-options select").should("have.value", "Kalın");
  });

  it('Hamur Seç kısmında seçim yapılmazsa "SİPARİŞ VER" butonu disabled olmalı', () => {
    // Hiçbir hamur seçilmezse?
    cy.get(".submit-button").should("be.disabled");
  });

  it('Ek Malzemeler kısmında en az 4 malzeme seçilmezse "SİPARİŞ VER" butonu disabled olmalı', () => {
    // Hiçbir malzeme seçilmezse?
    cy.get(".submit-button").should("be.disabled");
  });

  it('Ek Malzemeler kısmında 10\'dan fazla malzeme seçilirse "SİPARİŞ VER" butonu disabled olmalı', () => {
    // 11 malzeme seçilirse?
    cy.get('.malzeme-grup input[type="checkbox"]').check({ multiple: true });
    cy.get(".submit-button").should("be.disabled");
  });

  it("Ek Malzemelerde seçilen her bir seçenek için, Seçimlerin Toplam Fiyatı noktasında ücreti yazmalı", () => {
    cy.get('.malzeme-grup input[type="checkbox"]').eq(0).check();
    cy.contains("Seçimlerin Toplam Fiyatı: 5₺");
  });

  it("Formu gönderen bir test", () => {
    cy.get(".isim").clear().type("Mel");
    cy.get('.size-options input[type="radio"]').check("Orta");
    cy.get(".dough-options select").select("İnce");
    cy.get('.malzeme-grup input[type="checkbox"]').eq(5).check();
    cy.get('.malzeme-grup input[type="checkbox"]').eq(2).check();
    cy.get('.malzeme-grup input[type="checkbox"]').eq(9).check();
    cy.get('.malzeme-grup input[type="checkbox"]').eq(1).check();
    cy.get(".submit-button").should("not.be.disabled");
  });
});
