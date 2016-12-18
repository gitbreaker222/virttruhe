# app-dialogs.tag

## example

_in the html template:_

```html
<app-dialogs></app-dialogs>
```

_In any script:_

```javascript
  var callback = function () {
    console.log('callback function has been called');
  };
  var dialogObject = {
    message: 'Execute this action?',
    primaryAction: callback
    secondaryLabel: 'cancel'
  }
  app.trigger('showDialog', dialogObject);
```

This will show a dialog with the _message_ in a `<p>` and two buttons **"ok"** and **"cancel"**. Clicking on **"ok"** will trigger the callback function.


## `<app-dialogs>` tag parameter

attribute       | type      | description
---             | ---       | ---
event-emitter   | string    | [optional], defaults to `app`; Global object that emits the event with the dialog object.
event-name      | string    | [optional], defaults to `showDialog`; Name of the event with the dialog object.

## riot event syntax

`<eventEmitter>.trigger(<eventName>, <dialogObject>)`

## `{dialog object}` parameter

To trigger a dialog (with default tag parameter), use `app.trigger('showDialog', <dialogObject>)`, where **dialogObject** is a regular JS-object with following attributes:
```javascript
var dialogObject = {
    message: string,
    [primaryLabel: string],
    [primaryAction: function],
    [secondaryLabel: string],
    [secondaryAction: function],
    [styleType: string]
}
```

attribute       | description
---             | ---
message         |  message to display.
primaryLabel    | [optional], defaults to 'ok'; Label for primary button.
primaryAction   | [optional]; Callback function
secondaryLabel  | [optional], defaults to 'MISSING "secondaryLabel"'; Label for the secondary button. Shows the secondary button if used.
secondaryAction | [optional]; Callback function. Shows the secondary button if used.
styleType       | [optional]; Custom style classes for e.g. `warning` dialogs. Selector: `app-dialog .<your-class-name>`

## custom html

If the `<p>` with the message is not enough, you can use your own html and _yield_ it into the dialog window like this:

```html
<app-dialogs event-name="showSuccessDialog">
    <img src='img/success.svg'/>
    <h3>Success!</h3>
</app-dialogs>
```

## notes

- The background is clickable.
- When clicking the background the dialog tries to trigger the _secondary action_, else tries to trigger the _primary action_.
- The dialog closes when either clicking the
    - primary button
    - secondary button
    - or background
- When no _secondaryLabel_ or no _secondaryAction_ is defined, the secondary button is not rendered.
- If you want a simple secondary **"close"** button besides a primary action button, just give the _dialogObject_ the argument `secondaryLabel: 'close'`.
- If you use more than one `<app-dialogs>` tags, use different `eventNames`, or else on dialog trigger will show a dialog for each tag.

## more examples

_in the html template:_

```html
<app-dialogs></app-dialogs>
```

_In any script:_

```javascript
tag.foundPokemon = function (pokemon) {
  // controller stuff
  […]
  // notify user
  var dialogObject = {
    message: 'You have found: ' + pokemon.name
  }
  app.trigger('showDialog', dialogObject);
}
```

This will show a simple notification dialog with an **"ok"** button to close the window.