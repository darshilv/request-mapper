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

        console.log(localStorage.getItem('requestMapper'));

        // Events ////////////////////

        this.$app.on('click', '.new', $.proxy(this.newMapper, this));

    }

    App.prototype.template = function (template, data) {

        for ( item in data ) {

            var re = new RegExp('{{' + item + '}}', 'g');
            template = template.replace(re, data[item]);

        }

        return $.trim(template);

    }

    App.prototype.loadMappers = function () {

        

    }

    App.prototype.saveMapper = function (id) {

        console.log(id);

    }

    App.prototype.removeMapper = function (id) {

        

    }

    App.prototype.newMapper = function (e) {

        e.preventDefault();

        var _this = this,
            template = this.templates['form-row'],
            mapperID = new Date().getTime();

        // Mapper UI ////////////////////

        var $mapper = $(this.template(template, {
            id: 'mapper' + mapperID
        }));

        this.$form.append($mapper);

        // Events ////////////////////

        $mapper.on('click', '.btn.save', function (e) {

            e.preventDefault();

            _this.saveMapper(mapperID);

        });

        // Mapper ////////////////////

        this.mappers[mapperID] = {
            id: mapperID
        };

        //console.log(this.mappers);

    }

    var app = new App();
    app.initialize();

});