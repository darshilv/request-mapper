$(function () {

    var App = function () {};

    App.prototype.initialize = function () {

        var _this = this;

        this.$app = $('#app');
        this.$form = $('#form');

        this.mappers = [];

        // Templates ////////////////////

        this.templates = [];

        this.$app.find('script[data-template-id]').each(function (index, el) {

            var $target = $(el);

            _this.templates[$target.attr('data-template-id')] = $target.html();

            $target.remove();

        });

        // Local Storage ////////////////////


        // Events ////////////////////

        this.$app.on('click', '.new', $.proxy(this.newMapper, this));

    }

    App.prototype.template = function (template, data) {

        for ( item in data ) {

            var re = new RegExp('{{' + item + '}}', 'g');
            template = template.replace(re, data[item]);

        }

        return template;

    }

    App.prototype.newMapper = function (e) {

        e.preventDefault();

        var template = this.templates['form-row'],
            mapperID = new Date().getTime();

        this.$form.append(this.template(template, {
            id: 'mapper' + mapperID
        }));

        this.mappers.push(mapperID);

    }

    var app = new App();
    app.initialize();

});