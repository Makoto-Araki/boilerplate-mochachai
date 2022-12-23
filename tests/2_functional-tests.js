const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .get('/hello?name=MakotoAraki')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello MakotoAraki');
          done();
        });
    });
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({ 'surname': 'Colombo' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, 'Cristoforo');
          assert.equal(res.body.surname, 'Colombo');
          done();
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({ 'surname': 'da Verrazzano' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, 'Giovanni');
          assert.equal(res.body.surname, 'da Verrazzano');
          done();
      });
    });
  });
});

const Browser = require('zombie');
Browser.site = 'https://boilerplate-mochachai.makotoaraki.repl.co';

suite('Functional Tests with Zombie.js', function () {
  this.timeout(10000); // 5000
  const browser = new Browser();

  // Web-API Root
  before((done) => browser.visit('/', done));

  describe('Headless browser', function () {
    it('should have a working "site" property', function () {
      assert.isNotNull(browser.site);
    });
  });

  // #5
  test('Submit the surname "Polo" in the HTML form', function (done) {
    browser.fill('surname', 'Polo').then(() => {
      browser.pressButton('submit', () => {
        browser.assert.success();
        browser.assert.text('span#name', 'Marco');
        browser.assert.text('span#surname', 'Polo');
        browser.assert.elements('span#dates', 1);
        done();
      });
    });
  });

  // #6
  test('Submit the surname "Vespucci" in the HTML form', function (done) {
    browser.fill('surname', 'Vespucci').then(() => {
      browser.pressButton('submit', () => {
        browser.assert.success();
        browser.assert.text('span#name', 'Amerigo');
        browser.assert.text('span#surname', 'Vespucci');
        browser.assert.elements('span#dates', 1);
        done();
      });
    });
  });
  
});
