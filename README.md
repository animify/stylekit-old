# Stylekit
#### A progressive component-based design system for the modern web.

---

### Getting Started

Clone the repository.

## The Kit Package

The Kit package is where all the styling magic happens. Think of this package as the brain of your site.

### Variables

Variables are created and edited in `packages/kit/variables`. They follow a camelCase naming convention and are all object orientated variables which are grouped according to their type.

### Adding Behaviors

Behaviors are types of helpers which affect the overall functionality of a layout. To get an idea, these include Colors, Grid, Breakpoints and so forth.

### Styling Components

Components can be styled in the kit under `packages/kit/components`. 

## The Site Package

The Site package is a site that can be started up to show all your components, variables and structures. Every change you make in the Kit package is reflected in real time.

### Editing Content

Components, variables, utilities and layout classes are displayed on the site. Each major section has several minor sections whose content can be edited in packages/site/pages.

### Sorting Content

A `guide.json` file can be found in each major sections' folder. There you can define the title and description of a minor section as well as the folder where the component structure is found.

Each minor section can contain multiple snippets. In each minor section folder there is an editable `snippet.html` file. In there you can define block snippets like so:

```html
<section class="snippet-section" title="Block" subtitle="Force an element to become a block element." />
<span class="square block"></span>
<span class="square block"></span>
```

### Listing Variables

Listing variables differ from other major section. In its `guide.json` you can define which color object you like to pick from the Kit package. There are 3 extra properties that you set here, `startsWith`, `propertyCss` & `displayStyle`.


### Adding another Major section

It's pretty simple. Head over to `packages/site/src/Router.js` where you'll find a `get` method named `stylePages`. Set the title, description, router path, and which guide (folder name) you want that route to follow. Pages can also be activated/deactivated at any time.

## Building for Production

The Site package comes with a ready script to create a production-ready site. Navigate to `packages/site` in your terminal and run `npm run build`

## Issues
Found any issues with Stylekit? Make sure you post an issue!

###### Feel free to post enhancements in the Issues section

---

Licensed under MIT
