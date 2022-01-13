# dfx-helper
Web-development / Typescript / Angular Library with tons of utility tools helping in all projects.

[![NPM](https://nodei.co/npm/dfx-helper.png)](https://npmjs.org/package/dfx-helper)

### Information
- [NPM package link](https://www.npmjs.com/package/dfx-helper)
- [Development notes](#development)
- [Deployment notes](#deployment-notes)
- [Project website](https://datepoll.org)

### Useful classes:
* **Components**
  * `AComponent`
* **Decorator**/**Annotations**
  * `Confirmable()`
  * `Delay()`
  * `MeasureTime()`
  * `RememberResult`
  * `RunOutesideChangeDetection`
* **Helper**
  * `ArrayHelper`
  * `BrowserHelper`
  * `ClipboradHelper`
  * `Converter`
  * `DateHelper`
  * `Generator`
  * `Logger` / `LoggerFactory`
  * `Stopwatch`
  * `StorageHelper`
  * `StringHelper`
  * `Thread`
  * `TypeHelper`
  * `UIHelper`
* **Entities**
  * `HasID` & `HasName`
  * `IEntity` & `IEntityWithName`
  * `AEntity` & `AEntityWithName`
  * **EntityServices**
    * `AEntityService`
    * `ASelectableEntityService`
* **Services** 
  * `AHttpService`
  * `IsMobileService`
* **Collections**
  * `List`
  * `EntityList`
  * `IList`

## Development
Everything important in this library is located in `projects/dfx-helper`, that's the "real" library. (following
commands still have to be executed at the root level)

#### Dependency installation
```bash
npm install
```

#### Building a production version
```bash
npm run-script build
```

#### Starting development environment (with automatic tests)
```bash
npm test
```

#### Generating a coverage report
```bash
npm run test:coverage
```

#### Starting the development environment (for direct use in another project)
```bash
npm run-script watch
```

### Deployment notes
dfx-helper deployments are managed
via [.gitlab-ci](https://gitlab.com/DatePoll/common/dfx-helper/-/blob/development/.gitlab-ci.yml)

All builds are uploaded
to [releases.datepoll.org/common/dfx-helper](https://releases.datepoll.org/common/dfx-helper)

#### Development builds
Commits to the [development](https://gitlab.com/DatePoll/common/dfx-helper/-/tree/development) branch create a dev
build downloadable via [this link](https://releases.datepoll.org/common/dfx-helper/dfx-helper-dev.zip).

#### Production builds
Tags create a release build downloadable
via [this link](https://releases.datepoll.org/common/dfx-helper/dfx-helper-latest.zip). Additionally, a versioned
zip is uploaded and the package is published to [npm](https://www.npmjs.com/package/dfx-helper).
