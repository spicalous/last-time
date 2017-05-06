# last-time [![Travis CI](https://travis-ci.org/spicalous/last-time.svg?branch=master)](https://travis-ci.org/spicalous/last-time)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Bower](https://bower.io/)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* `cd last-time`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `ember test`
* `ember test --server`

Note: 
In order to work around acceptance test being affected by browser local storage: The tests attempt to mock out local 
storage `setItem`, `removeItem` functions and also use a separate `ember-localstorage-adapter` namespace for retrieving
`local-storage-events` (see app/adapters/local-storage-event)

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

// TODO

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
