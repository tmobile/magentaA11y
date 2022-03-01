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

// For required radio input fields
$("[name='natoReq']").on('change', function() {
    if($(this).closest("fieldset").attr('aria-invalid', "true")) {
        $(this).closest("fieldset").attr('aria-invalid', "false");
    }
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

var $tabs = $(".tab-group :radio");

var $details = $(".checklist-container details");

var $button = $("#checkbox-container button");

function allOpen(){
    return $details.length === $details.open;
}

function updateStorage(){
  $checkboxes.each(function(){
    formValues[this.id] = this.checked;
  });

  $tabs.each(function(){
    formValues[this.id] = this.checked;
  });

  $details.each(function(){
    formValues[this.id] = this.open;
  });

  localStorage.setItem("formValues", JSON.stringify(formValues));

//   console.log($tabs);
}

$checkboxes.on("change", function(){
    updateStorage();
});

$tabs.on("change", function(){
    updateStorage();
});

$details.on("toggle", function() {
    updateStorage();
});

// On page load
$.each(formValues, function(key, value) {
  $('#' + key).prop('checked', value);
  $('#' + key).prop('open', value);
  console.log(key, value);
});