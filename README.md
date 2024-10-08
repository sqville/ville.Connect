<!-- ABOUT THE PROJECT -->
# ville.Connect

**ville.Connect** is a [Qooxdoo](https://qooxdoo.org/) control designed to visually connect widgets on a canvas type layout.

## The Big Idea

Create a diagram/workflow/mindmap, tool/widget/capability using 100% Qooxdoo code and objects. No SVG or Canvas HTML tags, if at all possible.

<!-- DEMOS -->
## Demos

[Demo](https://sqville.github.io/ville.Connect/published/)

* Right click any connector to edit it's properties
* Move or resize connected widgets to see the connection dyanmically adjust. Only enabled for first two examples. The third example are static ui widgets.

<!-- Defining a connection -->
## Define a connection object

Example of two ui objects connected by a single connector:

```javascript
"connections" : [
  {
    elementA : widget1,
    elementB : widget2,
    properties : {
      appearance : "connector",
      decorator : "connector-solid"
    },
    options : {
      anchorA: "horizontal",  
      anchorAposition: "center-top",
      anchorB : "horizontal",
      anchorBposition: "center",
      anchorAoffsetTop: 10,
      anchorAoffsetLeft: 10,
      anchorBoffsetTop: 10,
      anchorBoffsetLeft: 10,
      strokeWidth: 8,
      startArrow: "dark-arrow",
      startArrowsize: 32,
      endArrow: "dark-arrow",
      endArrowsize: 32
    }
  }
]
```

<!-- ROADMAP -->
## Roadmap

* Create simple scenarios and common connection types - Completed
* Edit connector properties in the ville.Diagram, demo application - Completed (with limitations, see note below)
* Export changes by right clicking anywhere on the diagram and selecting "generate" (the only option) - Completed (with limitations, see note below)

Note: Limitations are due to object creation (elements, connections and arrows) only occuring during the initial loading of the diagrams. The demo application tool can only edit what has been initially created.

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

## Attribution

Inspired by and learned from this project: [jqSimpleConnect](https://github.com/jfmdev/jqSimpleConnect)
