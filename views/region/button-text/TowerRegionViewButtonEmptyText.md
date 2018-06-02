# TowerRegionViewButtonEmptyText

## Summary
Subclasses the TowerRegionViewButtonEmptyText class in order to override the `draw` implementation.
Represents the empty text displayed on the scroll buttons drawn in a tower region.
That is to say, scroll buttons do not have text so this class does not draw any.

## Diagram
<center>
!["TowerRegionViewButtonEmptyText UML Diagram"](../../../images/views/region/button-text/TowerRegionViewButtonEmptyText.png "TowerRegionViewButtonEmptyText UML Diagram")
</center>

## Constructors
* **TowerRegionViewButtonEmptyText()**: constructs a `TowerRegionViewButtonEmptyText` object.

## Methods
* **draw(model (TowerRegionModelInterface))** (void): overridden to not draw anything.
