# state

## methods

### `marbles([amount])`

parameter | type | description
--- | --- | ---
amount | number | if positive, adds marbles. if negative and enough marbles, removes marbles

**returns:** `marbles _number_`

## events

name | attributes | description
--- | --- | ---
`notEnoughMarbles` | _none_ | Tried to take marbles, but the amount would get negative.



# loading service

## methods

### `isLoading()`

**returns:** `boolean`

Tells if there are currently unfinished loaders in the line.

### `loadFile(url)`

parameter | type | description
--- | --- | ---
url | string | the url to the file to load.

**events:** `ready<url>, ready`


## events

name | attributes | description
--- | --- | ---
`ready<url>` | file | when loader for this file url is done.
`ready` | _none_ | when all loaders are done.