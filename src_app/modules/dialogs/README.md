# app-dialog.tag

## example with default _eventEmitter_ `appDialog` and _eventName_ `showDialog`
```html
<app-dialogs-div></app-dialogs-div>
```

```javascript
tag.use = function (itemId) {
  var item = itemsService.getItem(itemId);
  var message = '(Preview) Use ' + item.name + '?\n' + item.action;
  var callback = function () {
    inventory.trigger('use', itemId);
  };
  appDialog.trigger('showDialog', {
    message: message,
    primaryAction: callback
  });
};
```


## dialog-div api

attribute       | type      | description
event-emitter   | string    | (optional. default = `appDialog`) Global object that emits the event with the dialog object
event-name      | string    | name of the event with the dialog object

## dialog object api

To trigger a dialog, use `appDialog.trigger('showDialog', **<dialogObject>**)`, where **dialogObject** is a regular JS-object with following attributes:

attribute       | type      | description
message         | string    | (optional; default = '…') message to display.
primaryLabel    | string    | (optional; default = 'ok') label for primary button.
primaryAction   | function  | (optional) callback function
secondaryLabel  | string    | (optional; default = 'close') label for the secondary button. Shows the secondary button if used.
secondaryAction | function  | (optional) callback function. Shows the secondary button if used.
typeClass       | string    | (optional) custom style classes for e.g. `warning` dialogs. Selector: `app-dialog .<your-class-name>`

## notes

- When clicking the background and no secondary button (label and/or action) is defined, the primary action gets triggered if possible
- When clicking the background and the secondary button is defined (label and/or action), the secondary action gets triggered if possible