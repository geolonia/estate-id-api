#  不動産 ID API

## development

```shell
$ git clone geolonia/estate-id-api
$ cd estate-id-api
$ cp .envrc.sample .envrc
$ vim .envrc # fill the values
$ yarn # or `npm install`
$ npm test
```

### update Snapshot test

```shell
$ npm test -- -u
```

## deploy

```shell
# Deploy CDN
$ npm run deploy:cdn:dev
```

```shell
# Deploy API
$ npm run deploy:dev
```

## Utilities

### API Key

#### create and update

Create or update an access token with an API key.

```shell
# put an api key with a access token.
$ node ./src/bin/put-api-key.mjs <description>
```

#### List

List api keys

```shell
$ node ./src/bin/list-api-keys.mjs
```
