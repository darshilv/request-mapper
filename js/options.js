$(function () {

    var App = function () {};

    App.prototype.initialize = function () {

        var _this = this;

        this.$app = $('#app');
        this.$form = $('#form');

        this.mappers = {};

        // Templates ////////////////////

        this.templates = [];

        this.$app.find('script[data-template-id]').each(function (index, el) {

            var $target = $(el);

            _this.templates[$target.attr('data-template-id')] = $target.html();

            $target.remove();

        });

        // Local Storage ////////////////////

        this.loadMappers();

        // Events ////////////////////

        this.$app.on('click', '.new', $.proxy(this.newMapperAction, this));

    }

    App.prototype.template = function (template, data) {

        for ( item in data ) {

            var re = new RegExp('{{' + item + '}}', 'g');
            template = template.replace(re, data[item]);

        }

        return $.trim(template);

    }

    App.prototype.loadMappers = function () {

        //window.localStorage.setItem('requestMapper', null);

        var storedMappers = window.localStorage.getItem('requestMapper');

        // If there are saved mappers, load them
        if ( storedMappers !== null && storedMappers !== 'null' ) {

            this.mappers = JSON.parse(storedMappers);

        }

        // Create the UI for the loaded mappers
        for ( mapper in this.mappers ) {

            this.newMapper(mapper);

        }

    }

    App.prototype.saveMappers = function () {

        window.localStorage.setItem('requestMapper', JSON.stringify(this.mappers));

    }

    App.prototype.saveMapper = function (id) {

        // Find the DOM element for this mapper
        $mapper = $('#' + id);

        // Create a new record in the mapper object
        this.mappers[id] = {
            id: id
        };

        // Updated the find/replace fields
        $.extend(this.mappers[id], {
            find: $mapper.find('.find').val(),
            replace: $mapper.find('.replace').val()
        });

        // Save the mappers
        this.saveMappers();

    }

    App.prototype.removeMapper = function (id) {

        // Find the DOM element for this mapper and remove it
        $mapper = $('#' + id).remove();

        // Delte the mapper
        delete this.mappers[id];

        // Save the mappers
        this.saveMappers();

    }

    App.prototype.newMapperAction = function (e) {

        e.preventDefault();

        var id = new Date().getTime();

        this.newMapper(id);

    }

    App.prototype.newMapper = function (id) {

        var _this, template, defaults, mapper, $mapper;

        _this = this;
        template = this.templates['form-row'];

        defaults = {
            id: id,
            find: '',
            replace: ''
        };

        mapper = this.mappers[id] === undefined ? {} : this.mappers[id];
        mapper = $.extend(defaults, mapper);

        // Mapper UI ////////////////////

        $mapper = $(this.template(template, mapper));

        $mapper.find('.find').val(mapper.find);
        $mapper.find('.replace').val(mapper.replace);

        this.$form.append($mapper);

        // Events ////////////////////

        $mapper.on('click', '.btn.save', function (e) {

            e.preventDefault();

            _this.saveMapper(id);

        });

        $mapper.on('click', '.btn.remove', function (e) {

            e.preventDefault();

            _this.removeMapper(id);

        });

    }

    var app = new App();
    app.initialize();

});