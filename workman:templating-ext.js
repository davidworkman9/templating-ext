_.extend(Blaze.TemplateInstance.prototype, {
    findChildTemplate: function (templateName) {
    	var child = this.view.findChildView(templateName);
    	if (child)
        	return child.templateInstance();
        return null;
    },
    findParentTemplate: function (templateName) {
    	if (!templateName)
    		return this._findFirstParentTemplate();
    	var par = this.view.findParentView(templateName);
    	if (par)
    		return par.templateInstance();
    	return null;
    },
    _findFirstParentTemplate: function () {
    	var par = this.view._findFirstParentView();
    	if (par)
    		return par.templateInstance();
    	return null;
    }
});

_.extend(Blaze.View.prototype, {
	_findFirstParentView: function () {
		var view = this;
		do {
			view = view.parentView;
            if (!view)
                return null;
		} while(!view.name || !/^Template\./.test(view.name));
        return view;
	},
	findParentView: function (templateName) {
		if (!templateName)
			return this._findFirstParentView();
        if (!/^Template\./.test(templateName))
            templateName = 'Template.' + templateName;
        var view = this;
        while(view.name !== templateName) {
            view = view.parentView;
            if (!view)
                return null;
        }
        return view;
    },
    findChildView: function (templateName) {
        if (!/^Template\./.test(templateName))
            templateName = 'Template.' + templateName;
        var elements, i, len, view = this;
        while(view.name !== templateName) {
            elements = view._domrange.members;
            view = null;
            for (i = 0, len = elements.length; i < len; ++i) {
                if (elements[i].view) {
                    view = elements[i].view;
                    if (view.name === templateName)
                        break;
                }
            }
            if (!view)
                return null;
        }
        return view;
    }
});


$.fn.templateInstance = function () {
    if (!this[0])
      return null;
    var view = Blaze.getView(this[0]);
    while (view && !view.templateInstance) {
        view = view.parentView;
    }
    if (!view)
        return null;
    return view.templateInstance();
};
