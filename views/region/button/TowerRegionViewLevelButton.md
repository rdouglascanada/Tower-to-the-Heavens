# TowerRegionViewLevelButton

## Summary
Subclasses the TowerRegionViewButton class in order to override `drawLocked()` and `drawUnlocked()` implementations.
Represents a button drawn in a tower region that corresponds to selecting a level.

## Diagram
<center>
!["TowerRegionViewLevelButton UML Diagram"](../../../images/views/region/button/TowerRegionViewLevelButton.png "TowerRegionViewLevelButton UML Diagram")
</center>

## Constructors
* **TowerRegionViewLevelButton()**: constructs a `TowerRegionViewLevelButton` object.

## Methods
* **drawLocked()** (void): overridden to draw a rectangular shaded button.
* **drawUnlocked()** (void): overridden to draw a rectangular unshaded button.
