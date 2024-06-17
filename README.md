# ⏱️ SwaggerUIWatch

this is my all-in-one solution for effortless Swagger specification editing and management, with support for multi-file specs, streamlined bundling, and freedom to use your preferred editor.

## Motivation

The motivation behind creating SwaggerUIWatch stemmed from a desire to simplify and enhance the process of working with Swagger specifications.

Frustrated by the inefficiencies of existing tools, I sought to develop a solution that would streamline editing, support multi-file specs, facilitate faster bundling, and provide the flexibility to use preferred editors — all to empower developers and teams to work more efficiently and effectively on their OpenAPI specs.

## Features

1. **Seamless Integration**: Say goodbye to the hassle of copying and pasting between the online Swagger editor and your spec files. With SwaggerUIWatch, editing your Swagger specifications becomes a breeze.

2. **Support for Multi-file Specs**: Unlike the online editor, SwaggerUIWatch supports multi-file specs using `$ref`, allowing you to organize and manage your specifications more efficiently.

3. **Effortless Bundling**: Enjoy easier and faster bundling of your Swagger specs, streamlining your development process.

4. **Freedom of Choice**: No more being tied to online editors! With SwaggerUIWatch, you have the flexibility to use the editor of your choice, empowering you to work in your preferred environment.

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

_For bundling, provide the optional argument `bundle`:_

```sh
swagger-ui-watch ./main-swagger-file.json --bundle=./bundled.json
```

## License
SwaggerUIWatch is distributed under the terms of the MIT License. Free for both commercial and research use.