# TowerRegionViewScrollUpButton

## Summary
Subclasses the TowerRegionViewButton class in order to override `drawLocked()` and `drawUnlocked()` implementations.
Represents a button drawn in a tower region that corresponds to scrolling up in the level selection menu.

## Diagram
<center>
!["TowerRegionViewScrollUpButton UML Diagram"](../../../images/views/region/button/TowerRegionViewScrollUpButton.png "TowerRegionViewScrollUpButton UML Diagram")
</center>

## Constructors
* **TowerRegionViewScrollUpButton()**: constructs a `TowerRegionViewScrollUpButton` object.

## Methods
* **drawLocked()** (void): overridden to draw a shaded up arrow button.
* **drawUnlocked()** (void): overridden to draw an unshaded up arrow button.
