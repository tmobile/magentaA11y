// Allow :active styles to work in your CSS on a page in Mobile Safari:
document.addEventListener("touchstart", function(){}, true);


$("#copy").click(function(){
    $("#criteria-area").select();
    document.execCommand('copy');
});

// Expander toggle
$( ".expander-toggle" ).click(function() {
    if( $(this).attr('aria-expanded') == 'false' ) {
        $(this).attr('aria-expanded', 'true').next(".expander-content" ).addClass('visible').attr('aria-hidden', 'false');
    } else if( $(this).attr('aria-expanded') == 'true' ) {
        $(this).attr('aria-expanded', 'false').next(".expander-content" ).removeClass('visible').attr('aria-hidden', 'true');
    }
});

$('input[inputmode="numeric"]').on('input',function(e) {
    this.value=this.value.replace(/[^\d]/,'');
});



// Trigger alert
$("#submit-response").click(function() {
    if($('[role="alert"]').hasClass('visible')) {
        $('[role="alert"]').removeClass('visible').addClass('inert').empty();
    } else {
        $('[role="alert"]').removeClass('inert').addClass('visible');
        setTimeout(function(){ // Allows NVDA to catch up to the alert being back in the DOM
            $('[role="alert"]').append('Your answer has been submitted');
        }, 25);
    }
});

// Trigger alert
$("#show-alert").click(function() {
    if($('[role="alert"]').hasClass('active')) {
        $('[role="alert"]').removeClass('active').addClass('inert');
        $('#favorite-error').empty();
    } else {
        $('[role="alert"]').removeClass('inert').addClass('active');
        setTimeout(function(){ // Allows NVDA to catch up to the alert being back in the DOM
            $('#favorite-error').append('The correct answer is Charlie');
        }, 25);
    }
});

$("#show-password").on('change', function() {
    if($(this).is(":checked")) {
        $('#password').attr('type', 'text')
    } else if($(this).is(":not(:checked)")) {
        $('#password').attr('type', 'password')
    }
});

$(".interactive").mouseup(function() {
    if ($(this).find('input[type="checkbox"]').is(':checked') && !($(this).find('input[type="checkbox"]').is(":focus")) ) {
        $(this).find('input[type="checkbox"]').trigger('click');
        $(this).removeClass('checked');
    } else {
        $(this).find('input[type="checkbox"]').trigger('click');
        $(this).addClass('checked');
    }
});

// Dialog support
var isDialogSupported = true;
if (!window.HTMLDialogElement) {
    document.body.classList.add("no-dialog");
    isDialogSupported = false;
}

if ( $('dialog').length ) {
    showModal.onclick = () => {
        if (isDialogSupported) {
            modal.showModal();
        } else {
            modal.setAttribute("open", "");
        }
        // Focus the dialog itself on open
        modal.focus();
    };

    closeModal.onclick = () => {
        if (isDialogSupported) {
            modal.close();
        } else {
            modal.removeAttribute("open", "");
        }
        setTimeout(function(){
            showModal.focus();
        }, 25);
    };

    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            if (isDialogSupported) {
                modal.close();
            } else {
                modal.removeAttribute("open", "");
            }
            setTimeout(function(){
                showModal.focus();
            }, 25);
        }
    });
}

$("[name='stepper-input']").on('change', function() {
    var val = parseInt($(this).val());
    $(this).attr('data-selected', val);
});

$(".minus").click(function(){
    var inpt = $(this).parents(".stepper").find("[name=stepper-input]");
    var min = $(this).parents(".stepper").find("[name=stepper-input]").attr('min');
    var val = parseInt(inpt.val());
    if ( val < 1 ) inpt.val(val=1);
    if ( val < 1 ) inpt.attr('data-selected', '1');
    if ( val == min ) return;
    inpt.val(val-1);
    inpt.attr('data-selected', val-1);
});

$(".plus").click(function(){
    var inpt = $(this).parents(".stepper").find("[name=stepper-input]");
    var max = $(this).parents(".stepper").find("[name=stepper-input]").attr('max');
    var val = parseInt(inpt.val());
    if ( val == max ) return;
    inpt.val(val+1);
    inpt.attr('data-selected', val+1);
});


$("[name='checkboxRadioGroup']").on('change', function() {
    $("[name='checkboxRadioGroup']").not(this).prop('checked', false);
    $(this).prop('checked', true);
});

// Make inaccessible radio inputs look like they're working
$(".fake-radio").click(function() {
    $(".fake-radio").not(this).removeClass('checked');
    $(this).addClass('checked');
});



// Look at all slides
// If next is clicked, hide current, show next
// If back is clicked, hide current, show previous
$(".next").click(function(){
    if ($('.carousel .slide.visible').next('.slide').length) {
        $('.slide.visible').removeClass('visible').addClass('inert').next('.slide').removeClass('inert').addClass('visible');
        if (! $(this).closest('.carousel-nav').length ) {
            $('.slide.visible').focus();
        }
    }
});
$(".carousel  .previous").click(function(){
    if ($('.slide.visible').prev('.slide').length) {
        $('.slide.visible').removeClass('visible').addClass('inert').prev('.slide').removeClass('inert').addClass('visible');
        if (! $(this).closest('.carousel-nav').length ) {
            $('.slide.visible').focus();
        }
    }
});

$(".simp .next").click(function(){
    if ($('.slide.visible').next('.slide').length) {
        $('.slide.visible').removeClass('visible').addClass('inert').next('.slide').removeClass('inert').addClass('visible');
        $('#dynamic-app-container').focus(); // place focus back to top of app container
    }
});
$(".simp  .previous").click(function(){
    if ($('.slide.visible').prev('.slide').length) {
        $('.slide.visible').removeClass('visible').addClass('inert').prev('.slide').removeClass('inert').addClass('visible');
        $('#dynamic-app-container').focus(); // place focus back to top of app container
    }
});

$("#test-case-wrapper").on('toggle', function() {
    $("body").toggleClass('test-case-open');

    $('img').after('<button tabindex="-1" id="img" class="test-case-flag">Image</button>');

    $("a").after('<button tabindex="-1" id="link" class="test-case-flag">Link</button>');

    $("nav").after('<button tabindex="-1" id="nav" class="test-case-flag">Navigation</button>');
    
    $(".expander-toggle").after('<button tabindex="-1" id="expander" class="test-case-flag">Expander</button>');

    $(".fake-radio").first().after('<button tabindex="-1" id="radio" class="test-case-flag">Radio input</button>');
    
    $(".test-case-flag").click(function() {
        // Close all details
        $(".acceptance-criteria").removeAttr("open");
        // Get the id
    
        var id = $(this).attr('id');
        // Find the corresponding details
        // open the details
        $('#' + id + '-details').prop('open', true);
    
    });
    

});

// Store details state and favorites

var formValues = JSON.parse(localStorage.getItem('formValues')) || {};

var $checkboxes = $(".checkbox-item-controls :checkbox");

var $details = $(".checklist-container details");

var $button = $("#checkbox-container button");

function allOpen(){
    return $details.length === $details.open;
}

function updateStorage(){
  $checkboxes.each(function(){
    formValues[this.id] = this.checked;
  });

  $details.each(function(){
    formValues[this.id] = this.open;
  });

  localStorage.setItem("formValues", JSON.stringify(formValues));

  console.log(formValues);
}

$checkboxes.on("change", function(){
    updateStorage();
});

$details.on("toggle", function() {
    updateStorage();
});


// On page load
$.each(formValues, function(key, value) {
  $("#" + key).prop('checked', value);
  $("#" + key).prop('open', value);
  console.log(key, value);
});

/*!
  * Simple-Jekyll-Search
  * Copyright 2015-2020, Christian Fei
  * Licensed under the MIT License.
  */

(function(){
    'use strict'
    
    var _$Templater_7 = {
      compile: compile,
      setOptions: setOptions
    }
    
    const options = {}
    options.pattern = /\{(.*?)\}/g
    options.template = ''
    options.middleware = function () {}
    
    function setOptions (_options) {
      options.pattern = _options.pattern || options.pattern
      options.template = _options.template || options.template
      if (typeof _options.middleware === 'function') {
        options.middleware = _options.middleware
      }
    }
    
    function compile (data) {
      return options.template.replace(options.pattern, function (match, prop) {
        const value = options.middleware(prop, data[prop], options.template)
        if (typeof value !== 'undefined') {
          return value
        }
        return data[prop] || match
      })
    }
    
    'use strict';
    
    function fuzzysearch (needle, haystack) {
      var tlen = haystack.length;
      var qlen = needle.length;
      if (qlen > tlen) {
        return false;
      }
      if (qlen === tlen) {
        return needle === haystack;
      }
      outer: for (var i = 0, j = 0; i < qlen; i++) {
        var nch = needle.charCodeAt(i);
        while (j < tlen) {
          if (haystack.charCodeAt(j++) === nch) {
            continue outer;
          }
        }
        return false;
      }
      return true;
    }
    
    var _$fuzzysearch_1 = fuzzysearch;
    
    'use strict'
    
    /* removed: const _$fuzzysearch_1 = require('fuzzysearch') */;
    
    var _$FuzzySearchStrategy_5 = new FuzzySearchStrategy()
    
    function FuzzySearchStrategy () {
      this.matches = function (string, crit) {
        return _$fuzzysearch_1(crit.toLowerCase(), string.toLowerCase())
      }
    }
    
    'use strict'
    
    var _$LiteralSearchStrategy_6 = new LiteralSearchStrategy()
    
    function LiteralSearchStrategy () {
      this.matches = function (str, crit) {
        if (!str) return false
    
        str = str.trim().toLowerCase()
        crit = crit.trim().toLowerCase()
    
        return crit.split(' ').filter(function (word) {
          return str.indexOf(word) >= 0
        }).length === crit.split(' ').length
      }
    }
    
    'use strict'
    
    var _$Repository_4 = {
      put: put,
      clear: clear,
      search: search,
      setOptions: __setOptions_4
    }
    
    /* removed: const _$FuzzySearchStrategy_5 = require('./SearchStrategies/FuzzySearchStrategy') */;
    /* removed: const _$LiteralSearchStrategy_6 = require('./SearchStrategies/LiteralSearchStrategy') */;
    
    function NoSort () {
      return 0
    }
    
    const data = []
    let opt = {}
    
    opt.fuzzy = false
    opt.limit = 10
    opt.searchStrategy = opt.fuzzy ? _$FuzzySearchStrategy_5 : _$LiteralSearchStrategy_6
    opt.sort = NoSort
    opt.exclude = []
    
    function put (data) {
      if (isObject(data)) {
        return addObject(data)
      }
      if (isArray(data)) {
        return addArray(data)
      }
      return undefined
    }
    function clear () {
      data.length = 0
      return data
    }
    
    function isObject (obj) {
      return Boolean(obj) && Object.prototype.toString.call(obj) === '[object Object]'
    }
    
    function isArray (obj) {
      return Boolean(obj) && Object.prototype.toString.call(obj) === '[object Array]'
    }
    
    function addObject (_data) {
      data.push(_data)
      return data
    }
    
    function addArray (_data) {
      const added = []
      clear()
      for (let i = 0, len = _data.length; i < len; i++) {
        if (isObject(_data[i])) {
          added.push(addObject(_data[i]))
        }
      }
      return added
    }
    
    function search (crit) {
      if (!crit) {
        return []
      }
      return findMatches(data, crit, opt.searchStrategy, opt).sort(opt.sort)
    }
    
    function __setOptions_4 (_opt) {
      opt = _opt || {}
    
      opt.fuzzy = _opt.fuzzy || false
      opt.limit = _opt.limit || 10
      opt.searchStrategy = _opt.fuzzy ? _$FuzzySearchStrategy_5 : _$LiteralSearchStrategy_6
      opt.sort = _opt.sort || NoSort
      opt.exclude = _opt.exclude || []
    }
    
    function findMatches (data, crit, strategy, opt) {
      const matches = []
      for (let i = 0; i < data.length && matches.length < opt.limit; i++) {
        const match = findMatchesInObject(data[i], crit, strategy, opt)
        if (match) {
          matches.push(match)
        }
      }
      return matches
    }
    
    function findMatchesInObject (obj, crit, strategy, opt) {
      for (const key in obj) {
        if (!isExcluded(obj[key], opt.exclude) && strategy.matches(obj[key], crit)) {
          return obj
        }
      }
    }
    
    function isExcluded (term, excludedTerms) {
      for (let i = 0, len = excludedTerms.length; i < len; i++) {
        const excludedTerm = excludedTerms[i]
        if (new RegExp(excludedTerm).test(term)) {
          return true
        }
      }
      return false
    }
    
    /* globals ActiveXObject:false */
    
    'use strict'
    
    var _$JSONLoader_2 = {
      load: load
    }
    
    function load (location, callback) {
      const xhr = getXHR()
      xhr.open('GET', location, true)
      xhr.onreadystatechange = createStateChangeListener(xhr, callback)
      xhr.send()
    }
    
    function createStateChangeListener (xhr, callback) {
      return function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          try {
            callback(null, JSON.parse(xhr.responseText))
          } catch (err) {
            callback(err, null)
          }
        }
      }
    }
    
    function getXHR () {
      return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
    }
    
    'use strict'
    
    var _$OptionsValidator_3 = function OptionsValidator (params) {
      if (!validateParams(params)) {
        throw new Error('-- OptionsValidator: required options missing')
      }
    
      if (!(this instanceof OptionsValidator)) {
        return new OptionsValidator(params)
      }
    
      const requiredOptions = params.required
    
      this.getRequiredOptions = function () {
        return requiredOptions
      }
    
      this.validate = function (parameters) {
        const errors = []
        requiredOptions.forEach(function (requiredOptionName) {
          if (typeof parameters[requiredOptionName] === 'undefined') {
            errors.push(requiredOptionName)
          }
        })
        return errors
      }
    
      function validateParams (params) {
        if (!params) {
          return false
        }
        return typeof params.required !== 'undefined' && params.required instanceof Array
      }
    }
    
    'use strict'
    
    var _$utils_9 = {
      merge: merge,
      isJSON: isJSON
    }
    
    function merge (defaultParams, mergeParams) {
      const mergedOptions = {}
      for (const option in defaultParams) {
        mergedOptions[option] = defaultParams[option]
        if (typeof mergeParams[option] !== 'undefined') {
          mergedOptions[option] = mergeParams[option]
        }
      }
      return mergedOptions
    }
    
    function isJSON (json) {
      try {
        if (json instanceof Object && JSON.parse(JSON.stringify(json))) {
          return true
        }
        return false
      } catch (err) {
        return false
      }
    }
    
    var _$src_8 = {};
    (function (window) {
      'use strict'
    
      let options = {
        searchInput: null,
        resultsContainer: null,
        json: [],
        success: Function.prototype,
        searchResultTemplate: '<li><a href="{url}" title="{desc}">{title}</a></li>',
        templateMiddleware: Function.prototype,
        sortMiddleware: function () {
          return 0
        },
        noResultsText: '<li><a role="alert">No results found</a></li>',
        limit: 10,
        fuzzy: false,
        debounceTime: null,
        exclude: []
      }
    
      let debounceTimerHandle
      const debounce = function (func, delayMillis) {
        if (delayMillis) {
          clearTimeout(debounceTimerHandle)
          debounceTimerHandle = setTimeout(func, delayMillis)
        } else {
          func.call()
        }
      }
    
      const requiredOptions = ['searchInput', 'resultsContainer', 'json']
    
      /* removed: const _$Templater_7 = require('./Templater') */;
      /* removed: const _$Repository_4 = require('./Repository') */;
      /* removed: const _$JSONLoader_2 = require('./JSONLoader') */;
      const optionsValidator = _$OptionsValidator_3({
        required: requiredOptions
      })
      /* removed: const _$utils_9 = require('./utils') */;
    
      window.SimpleJekyllSearch = function (_options) {
        const errors = optionsValidator.validate(_options)
        if (errors.length > 0) {
          throwError('You must specify the following required options: ' + requiredOptions)
        }
    
        options = _$utils_9.merge(options, _options)
    
        _$Templater_7.setOptions({
          template: options.searchResultTemplate,
          middleware: options.templateMiddleware
        })
    
        _$Repository_4.setOptions({
          fuzzy: options.fuzzy,
          limit: options.limit,
          sort: options.sortMiddleware,
          exclude: options.exclude
        })
    
        if (_$utils_9.isJSON(options.json)) {
          initWithJSON(options.json)
        } else {
          initWithURL(options.json)
        }
    
        const rv = {
          search: search
        }
    
        typeof options.success === 'function' && options.success.call(rv)
        return rv
      }
    
      function initWithJSON (json) {
        _$Repository_4.put(json)
        registerInput()
      }
    
      function initWithURL (url) {
        _$JSONLoader_2.load(url, function (err, json) {
          if (err) {
            throwError('failed to get JSON (' + url + ')')
          }
          initWithJSON(json)
        })
      }
    
      function emptyResultsContainer () {
        options.resultsContainer.innerHTML = ''
      }
    
      function appendToResultsContainer (text) {
        options.resultsContainer.innerHTML += text
      }
    
      function registerInput () {
        options.searchInput.addEventListener('input', function (e) {
          if (isWhitelistedKey(e.which)) {
            emptyResultsContainer()
            debounce(function () { search(e.target.value) }, options.debounceTime)
          }
        })
      }
    
      function search (query) {
        if (isValidQuery(query)) {
          emptyResultsContainer()
          render(_$Repository_4.search(query), query)
        }
      }
    
      function render (results, query) {
        const len = results.length
        if (len === 0) {
          return appendToResultsContainer(options.noResultsText)
        }
        for (let i = 0; i < len; i++) {
          results[i].query = query
          appendToResultsContainer(_$Templater_7.compile(results[i]))
        }
      }
    
      function isValidQuery (query) {
        return query && query.length > 0
      }
    
      function isWhitelistedKey (key) {
        return [13, 16, 20, 37, 38, 39, 40, 91].indexOf(key) === -1
      }
    
      function throwError (message) {
        throw new Error('SimpleJekyllSearch --- ' + message)
      }
    })(window)
    
    }());