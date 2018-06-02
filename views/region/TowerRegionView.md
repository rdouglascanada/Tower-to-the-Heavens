# TowerRegionView

## Summary
Represents one of the seven parts of the tower to draw.

## Diagram
<center>
!["TowerRegionView UML Diagram"](../../images/views/region/TowerRegionView.png "TowerRegionView UML Diagram")
</center>

## Attributes
* **model** (TowerRegionModelInterface): the model object to use for determining what the view displays and how it displays things.
* **background** (TowerRegionViewBackground): the background sprite upon which the button will be drawn.
* **button** (TowerRegionViewButton): the button associated with selecting a level or scrolling up / down.
* **buttonText** (TowerRegionViewButtonText): the text to display on the button.

## Constructors
* **TowerRegionView(model (TowerRegionModelInterface), backgroundValue (TowerRegionViewBackground), buttonValue (TowerRegionViewButton), buttonTextValue (TowerRegionViewButtonText))**: constructs a **TowerRegionView** object with the `model` attribute set to `modelValue`, the `background` attribute set to `backgroundValue`, the `button` attribute set to `buttonValue`, and the `buttonText` attribute set to `buttonTextValue`.

## Methods
* **draw()** (void): draws the background, then draws the button, then draws the button text.
