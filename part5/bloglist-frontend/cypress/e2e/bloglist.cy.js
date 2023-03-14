describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/test/reset')
    const user = {
      username: 'sahandsn',
      password: '1234',
      name:'sahand',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login to Application')
    cy.contains('username')
    cy.contains('password')
    cy.get('button').should('contain', 'Login')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'sahandsn', password:'1234' })
      cy.get('.success')
        .should('contain','welcome sahand')
        .and('have.css', 'background-color', 'rgb(144, 238, 144)')
    })

    it('fails with wrong credentials', function() {
      cy.contains('username').find('input').type('sahandsn')
      cy.contains('password').find('input').type('12345')
      cy.get('button').click()
      cy.get('.error')
        .should('contain','invalid username/password')
        .and('have.css', 'background-color', 'rgb(240, 128, 128)')
    })
  })
  describe('When logged in, a blog can be', function() {
    beforeEach(function() {
      cy.login({ username: 'sahandsn', password:'1234' })
    })

    it('created', function() {
      cy.createBlog({ title: 'title', author: 'author', url: 'https://fullstackopen.com/' })
      cy.get('html').contains('title author').find('button').click()
      cy.get('html')
        .should('contain', 'title by author')
        .and('contain', 'Hide')
        .and('contain', 'https://fullstackopen.com/')
        .and('contain', 'Likes:')
        .and('contain', 'Like')
        .and('contain', 'sahandsn')
        .and('contain', 'Remove')
    })
    it('liked', function() {
      cy.createBlog({ title: 'title', author: 'author', url: 'https://fullstackopen.com/' })
      cy.contains('title author').find('button').click()
      cy.get('html').should('contain', 'Likes: 0')
      cy.contains('Likes: 0').find('button').click()
      cy.get('html').should('contain', 'Likes: 1')
    })
  })
})
