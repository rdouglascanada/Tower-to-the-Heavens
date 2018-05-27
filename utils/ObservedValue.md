# ObservedValue

## Summary
Helper class to help `Model` classes determine when an attribute's value has been changed
in order to notify view classes at the appropriate time.

## Constructors
* **ObservedValue(value (any))**: constructs an `ObservedValue` object with `currentValue` and `oldValue` set to the passed in `value`.

## Attributes
* *currentValue* (any): the value that the attribute currently has.
* *oldValue* (any): a copy of `currentValue` that becomes out of sync when `setValue()` is called and in sync when `updateOldValue()` is called.

## Methods
* **getOldValue()** (any): returns `oldValue`.
* **getValue()** (any): returns `currentValue`.
* **isDirty()** (boolean): returns `true` if `currentValue` differs from `oldValue`; `false` otherwise.
* **setValue(value (any))** (void): changes `currentValue`.
* **updateOldValue()** (void): sets `oldValue` equal to `currentValue`.
