Templating-ext
==============
Extensions to templates to make it easier to get child and parent templates.

# Install
```
meteor add workman:templating-ext
```

# Docs
## Blaze.TemplateInstance
#### findChildTemplate (templateName)
Finds child template instance by name. Returns null if a matching templating is not found.
#### Example

```
<template name="parent">
	{{> child}}
	<button id="done"></button>
</template>

<template name="child">
	<input>
</template>

Template.child.created = function () {
	this.value = new Blaze.ReactiveVar();
};

Template.child.events({
	'input input': function (e, tmpl) {
		tmpl.value.set($(e.target).val());
	}
});

Template.parent.events({
	'click #done': function (e, tmpl) {
		var child = tmpl.findChildTemplate('child');
		var val = child.value.get();
		Collection.insert({ val: val });
	} 
});
```

#### findParentTemplate (templateName)
Finds parent template instance by name. If the template name supplied matches the current template, it will return itself. Returns null if a matching template is not found. If templateName is not set, ```findParentTemplate``` will return the first parent.

#### Example
```
<template name="parent">
	{{> child}}
</template>

<template name="child">
	{{#if selectedVal}}
		... do something.
	{{/if}}
</template>

Template.parent.created = function () {
	this.selectedVal = new Blaze.ReactiveVar();
};

Template.child.helpers({
	'selectedVal': function (e, tmpl) {
		return tmpl.findParentTemplate('parent').selectedVal.get();
	}
});
```

## Blaze.View
#### findChildView (templateName)
Used internally by findChildTemplate.
#### findParentView (templateName)
Used internally by findParentTemplate.

## jQuery
#### templateInstance
jQuery function that returns a template instance for the first matching element from a jQuery selector, or null if one is not found.
#### Example
```
var tmpl = $('#my-div').templateInstance();
```