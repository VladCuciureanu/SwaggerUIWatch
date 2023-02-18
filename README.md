# Swagger UI Watch

Swagger UI Watch detects changes in your local Swagger files and hot-reloads. Supports multi-file specs using \$ref.

## Why?

- No more copying and pasting back and forth between the online Swagger editor and your spec files.
- Supports multi-file specs using \$ref. The online editor doesn't.
- Easier and faster bundling.
- No more online editors. Use the editor you like!

## Installation

```sh
npm install swagger-ui-watch -g
```

## Usage

```sh
swagger-ui-watch ./main-swagger-file.json
```

### Additional Options

| Command line argument         | Description                                                                                                                                                                   |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -p --port \<port>             | Defaults to 8000                                                                                                                                                               |
| -h --host <Hostname/IP>       | Defaults to 127.0.0.1                                                                                                                                                         |
| --no-open                     | Prevent automatically opening a browser                                                                                                                              |
| -c --config <JSON_file>       | JSON file containing any of the [Swagger UI options](https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/configuration.md). Example: `{"withCredentials": true}` |
| -b --bundle \<bundleLocation> | Bundles specs to the specified location                                                                                                                                       |

For bundling, provide the optional argument `bundle`:

```sh
swagger-ui-watch ./main-swagger-file.json --bundle=./bundled.json
```
