describe('Pruebas de Autenticación y Redirección', () => {

    
    it('Debería redirigir a /login al acceder a /', () => {
      cy.visit('/');
      cy.url().should('include', '/');
    });
  
    
    it('Debería redirigir a / cuando las credenciales sean correctas', () => {
      cy.visit('/');
      
      cy.get('input[type="text"]').type('admin'); 
      cy.get('input[type="password"]').type('admin'); 
      cy.get('button[type="submit"]').click(); 
      
      cy.url().should('include', '/'); 
      
     
      cy.window()
        .its('localStorage')
        .invoke('getItem', 'user')
        .should('not.be.null');
    });
  
    
    it('Debería quedarse en /login cuando las credenciales sean incorrectas', () => {
      cy.visit('/');
      
      cy.get('input[type="text"]').type('admin');
      cy.get('input[type="password"]').type('incorrecto');
      cy.get('button[type="submit"]').click(); 
      
      cy.url().should('include', '/login'); 
      
    });
  
  });
  