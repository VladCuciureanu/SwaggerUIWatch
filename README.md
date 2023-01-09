# Swagger UI Watch

Swagger UI Watch detects changes in your local Swagger files and reload Swagger UI in your browser to give you fluid workflow. It is primarily developed to work with multiple Swagger files using \$ref.

## Why?

- Using online Swagger Editor is annoying. You have to copy and paste your Swagger files back and forth.
- Relative and local system \$ref do not work with online Swagger Editor v3
- Manually creating bundle from multiple Swagger files after each update is impractical and tiresome.
- Using my editor/ide of choice is awesome.

## Installation

| Version | Swagger Version |
| ------- | --------------- |
| 1.0.10  | 2               |
| >=2.0   | 3               |

```sh
npm install swagger-ui-watch -g
```

## Usage

For watching the changes in target directory, following command is used

```sh
swagger-ui-watch ./main-swagger-file.json
```

### Additional Options

| Command line argument         | Description                                                                                                                                                                   |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -p --port \<port>             | Default is 8000                                                                                                                                                               |
| -h --host <Hostname/IP>       | Defaults to 127.0.0.1                                                                                                                                                         |
| --no-open                     | Do not open the view page in the default browser                                                                                                                              |
| -c --config <JSON_file>       | JSON file containing any of the [Swagger UI options](https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/configuration.md). Example: `{"withCredentials": true}` |
| -b --bundle \<bundleLocation> | Create bundle at the specified location                                                                                                                                       |

For creating the bundled file, provide the optional argument `bundle`

```sh
swagger-ui-watch ./main-swagger-file.json --bundle=./bundled.json
```
