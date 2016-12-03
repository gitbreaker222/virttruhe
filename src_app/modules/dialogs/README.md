# dialog-div api

attribute       | type      | description
event-emitter   | string    | (optional. default = `app`) Global object that emitts the event with the dialog object
event-name      | string    | name of the event with the dialog object

## dialog object api

attribute       | type      | description
message         | string    | (optional; default = '…') message to display.
primaryLabel    | string    | (optional; default = 'ok') label for primary button.
primaryAction   | function    | (optional) callback function
secondaryLabel  | string    | (optional; default = 'close') label for the secondary button. This button is only visible, if the primary button has an action defined.
secondaryAction | function    | (optional) callback function
typeClass       | string    | (optional) custom style classes for e.g. `warning` dialogs. Selector: `app-dialog .<your-class-name>`

## notes

- When clicking the background, the dialog closes without triggering any callback function.
- The second button shows only when the primary button has an action defined, because otherwise the dialog-tag can assume, that a dialog with no actions is only for notification, not for decision. As soon the user should decide, wether to trigger an action or not, the second button shows up as cancel button, without the need to explicitly defining it.