## Clean Code JS

Clean Code to rescue! CLI tool for helping to keep clean design of javascript applications .

## Note

This project is new, therefore some minor bugs could show up.

## Prerequisites
 
CLI have dependencies that require Node 6.9.0 or higher.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Configuration](#configuration)
* [Design implementation](#design)
* [Documentation](#documentation)
* [License](#license)

## Installation

```bash
npm install -g cleancode 
```

## Configuration 

You can put JSON file as second argument with this setup.

```
{
    "include": [".ts"],  // check design in this files
    "exclude": [".spec.ts", ".d.ts"] // do not check design in this files
}
```

## Design

This tool can provide protection from these "clean code" rules and common javascript problems.

- Callback hell (nesting problem)
- Method arguments violation
- Method lines violation (keep it small)
- Class name violation
- Class length violation (keep it even smaller)
- Class methods count violation
- Boolean as argument violation
- ...

## Usage

```bash

cleancode ${DIR or FILE path} ${CONFIG FILE - optional}
```

## Documentation

The documentation is in progress. 

## License

MIT

