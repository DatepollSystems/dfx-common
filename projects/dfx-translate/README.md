# dfx-translate

A simple translation package for Angular 4 - 12.

[![NPM](https://nodei.co/npm/dfx-translate.png)](https://npmjs.org/package/dfx-translate)

### Features

- inline html translations with pipelines
- in-code translation with services
- an easy-to-use json structure
- auto-translation feature via [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate) API integration

### Information

- [Supported languages for auto-translation](#supported-languages)
- [Development notes](#development)
- [Deployment notes](#deployment-notes)
- [Project website](https://datepoll.org)
- created with [Angular](https://angular.io)
  , [used libraries](https://gitlab.com/DatePoll/common/dfx-translate/-/blob/master/package.json)

## Setup

### Installation

```bash
npm install dfx-translate@latest
```

### Language file setup

Language files **must** be saved in `src/assets/i18n/LANGUAGE_CODE.json`; Create the directory if it does not exist.

```bash
mkdir -p ./src/assets/i18n
```

Choose a primary language, lets say you've picked **english**. Create an `en.json` file with following content:

```json
{
  "WELCOME": "Welcome",
  "WELCOME_SUBTEXT": "stranger."
}
```

Note: The json structure must always consist of a key and value pair.

#### Manual translation

Choose an additional language, lets say you've picked **german**. Create an `de.json` file

```json
{
  "WELCOME": "Willkomen",
  "WELCOME_SUBTEXT": "Fremder."
}
```

Note: You **do not** have to translate all strings if you are using
the [auto-translate feature](#auto-deep-learning-translation).

#### Auto translation

dfx-translate can translate the primary language into a whole new language and will take partially manual translated
languages into account, meaning it will only translate strings which are not occurring in the manual created files
located at `src/assets/i18n/LANGUAGE_CODE.json`.

[Read more](#auto-deep-learning-translation)

### Registration in root (app) module

This has to be done only once in the project. Ideal in `app.module.ts`

```typescript
import {DfxTranslateModule} from "dfx-translate";

@NgModule({
  declarations: [...],
  imports: [
    ...
      DfxTranslateModule.setup({
        configuration: {
          defaultLanguage: 'de',
          useLocalStorage: false
        }
      })
  ],
  bootstrap: [...]
})
export class AppModule {
}
```

| property        | description                                                       | default value |
| --------------- | ----------------------------------------------------------------- | ------------- |
| defaultLanguage | Short code of the primary language (identically to the file name) | `en`          |
| useLocalStorage | Saves selected languages as the preference into local storage     | `true`        |

### Registration in feature module

```typescript
import {DfxTranslateModule} from "dfx-translate";

@NgModule({
  declarations: [...],
  imports: [
    ...
      DfxTranslateModule,
  ],
})
export class FeatureModule {
}
```

## Usage

### Switching languages

Language switching is as easy as one function call.

Note: The language code used has to exist as `src/assets/i18n/LANGUAGE_CODE.json`

```typescript
import {TranslateService} from "dfx-translate";

@Component({
  selector: 'app-example',
  templateUrl: ...,
  styleUrls: [...],
})
export class ExampleComponent {
  constructor(private translator: TranslateService) {
  }

  setLang(lang: string) {
    this.translator.use(lang);
  }
}
```

### Pipeline usage

Import `DfxTranslateModule` into the module requiring the translation pipe.

```typescript
import {DfxTranslateModule} from "dfx-translate";

@NgModule({
  declarations: [...],
  imports: [
    ...
      DfxTranslateModule,
    ...
  ],
  exports: [...]
})
export class ExampleModule {
}
```

Now you can use it with `tr` in html

```angular2html
<h1>{{'WELCOME' | tr}}</h1>
<span>{{'WELCOME_SUBTEXT' | tr}}</span>
```

### Service usage

Access translations via code with `TranslateService`

```typescript
import {TranslateService} from "dfx-translate";

@Component({
  selector: 'app-example',
  templateUrl: ...,
  styleUrls: [...],
})
export class ExampleComponent {
  constructor(private translator: TranslateService) {
  }

  save() {
    window.alert(this.translator.translate('WELCOME'));
  }
}
```

## Auto deep learning translation

It's possible to translate not manual translated strings via
[LibreTranslate](https://github.com/LibreTranslate/LibreTranslate) API. LibreTranslate is an open-source, self-hostable
machine-translation service.

dfx-translate can translate the primary language into a whole new language and will take partially manual translated
languages into account, meaning it will only translate strings which are not occurring in the manual created files
located at src/assets/i18n/LANGUAGE_CODE.json.

Command syntax:

```bash
node ./node_modules/dfx-translate/translation/generateTranslation.js {API_URL} {SOURCE_LANGUAGE_CODE} {TARGET_LANGUAGE_CODE}
```

Note: You **never** have to auto-translate fully manual translated files

### Supported languages

| LANGUAGE_CODE | name       |
| ------------- | ---------- |
| en            | English    |
| ar            | Arabic     |
| zh            | Chinese    |
| fr            | French     |
| de            | German     |
| hi            | Hindi      |
| ga            | Irish      |
| it            | Italian    |
| ja            | Japanese   |
| ko            | Korean     |
| pt            | Portuguese |
| ru            | Russian    |
| es            | Spanish    |

Note: Keep in mind that at least one of the fully manual translated files has to be in such a language for this feature
to work.

### Example

- **Primary language: en**; **Fully translated language: de**; **Partially translated language: es**; **Not translated
  language: fr**
  ```bash
  node ./node_modules/dfx-translate/translation/generateTranslation.js https://translate.abc.abc/translate en es
  node ./node_modules/dfx-translate/translation/generateTranslation.js https://translate.abc.abc/translate en fr
  ```
  Following files should be in `src/assets/i18n/` folder.
  - `en.json` - the primary language
  - `de.json` - additional language, fully manual translated
  - `es.json` - additional language, partially manual translated
  - `es_auto.json` - additional language, auto-translated missing strings of `es.json` compared to the primary language
  - `fr_auto.json` - additional language, completely auto-translated containing all translations

### Simplifying

For simplicity purposes I wrote a little shell script. Put this at the top / root level of the project

```bash
#!/usr/bin/env bash
main () {
 node ./node_modules/dfx-translate/translation/generateTranslation.js https://translate.abc.abc/translate en de
 node ./node_modules/dfx-translate/translation/generateTranslation.js https://translate.abc.abc/translate en fr
 node ./node_modules/dfx-translate/translation/generateTranslation.js https://translate.abc.abc/translate en es
 node ./node_modules/dfx-translate/translation/generateTranslation.js https://translate.abc.abc/translate en it
 node ./node_modules/dfx-translate/translation/generateTranslation.js https://translate.abc.abc/translate en pt

 # If you have any prettier library intstalled, execute it here
 # prettier --config ./.prettierrc --write ./src/assets/i18n

 printf "\nFinished!"
}
time main
```

Now you only have to run this script.

## Development

Everything important in this library is located in `projects/dfx-translate`, that's the "real" library. (following
commands still have to be executed at the root level)

### Dependency installation

```bash
npm install
```

### Starting in development environment

```bash
npm run-script watch
```

### Building a production version

```bash
npm run-script build
```

## Deployment notes

dfx-translate deployments are managed
via [.gitlab-ci](https://gitlab.com/DatePoll/common/dfx-common/-/blob/development/.gitlab-ci.yml)

All builds are uploaded
to [releases.datepoll.org/common/dfx-translate](https://releases.datepoll.org/common/dfx-translate)

### Development builds

Commits to the [development](https://gitlab.com/DatePoll/common/dfx-translate/-/tree/development) branch create a dev
build downloadable via [this link](https://releases.datepoll.org/common/dfx-translate/dfx-translate-dev.zip).

### Production builds

Tags create a release build downloadable
via [this link](https://releases.datepoll.org/common/dfx-translate/dfx-translate-latest.zip). Additionally, a versioned
zip is uploaded and the package is published to [npm](https://www.npmjs.com/package/dfx-translate).
