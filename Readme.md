
## POS backend


```js
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)
```

## Installation

```console
$ yarn 
```
### Run the code
```
$ yarn start
```

### Running Tests

To run the test suite, first install the dependencies, then run `npm test`:

```console
$ yarn
$ yarn test
```

## TODO
- [ ] Add a better logging middleware
- [ ] Extract sensitive information from the code and put it into a config file
- [ ] re-design the mongodb schema
- [ ] Prevent Ddos attack
- [ ] CICD pipeline via gitlab
- [ ] Code revamp
- [ ] data migration script
