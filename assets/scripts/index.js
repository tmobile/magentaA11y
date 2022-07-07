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

// Submit vote
$("#submit-response").click(function() {
    if($('.alert').hasClass('enabled')) {
        $('.alert').removeClass('enabled').addClass('inert');
        $('#response-message').empty();
    } else {
        $('.alert').removeClass('inert').addClass('enabled');
        setTimeout(function(){ // Allows NVDA to catch up to the alert being back in the DOM
            $('#response-message').append('Your response has been recorded');
        }, 25);
    }
});

// Trigger error
$("#show-error").click(function() {
    if($('#favorite-nato-alert').hasClass('enabled')) {
        $('#favorite-nato-alert').removeClass('enabled').addClass('inert');
        $('#favorite-nato-error').empty();
    } else {
        $('#favorite-nato-alert').removeClass('inert').addClass('enabled');
        setTimeout(function(){ // Allows NVDA to catch up to the alert being back in the DOM
            $('#favorite-nato-error').append('The correct answer is Charlie');
        }, 25);
    }
});

// Trigger alert
$("#show-alert").click(function() {
    if($('[role="alert"]').hasClass('enabled')) {
        $('[role="alert"]').removeClass('enabled').addClass('inert');
        $('#favorite-error').empty();
    } else {
        $('[role="alert"]').removeClass('inert').addClass('enabled');
        setTimeout(function(){ // Allows NVDA to catch up to the alert being back in the DOM
            $('#favorite-error').append('Hello world');
        }, 25);
    }
});

// Trigger alert notification
$('#show-alert-notification').click(function() {
    if($('#alert-notification').hasClass('enabled')) {
        $('#alert-notification').removeClass('enabled').addClass('inert').empty();
    } else {
        $('#alert-notification').removeClass('inert').addClass('enabled');
        setTimeout(function(){ // Allows NVDA to catch up to the alert being back in the DOM
            $('#alert-notification').append('Your account has been updated');
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

// $(".interactive").mouseup(function() {
//     if ($(this).find('input[type="checkbox"]').is(':checked') && !($(this).find('input[type="checkbox"]').is(":focus")) ) {
//         $(this).find('input[type="checkbox"]').trigger('click');
//         $(this).removeClass('checked');
//     } else {
//         $(this).find('input[type="checkbox"]').trigger('click');
//         $(this).addClass('checked');
//     }
// });

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
            // document.body.classList.add("dialog-open");
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
  $("#" + key).prop('checked', value);
  $("#" + key).prop('open', value);
//   console.log(key, value);
});

// Transfer range value to text input

$(document).on('input', '#cowbell', function() {
    $('#cowbellValue').val( $(this).val() );
});

$("#trigger-progressbar").click(function(event) {
    $(this).attr("aria-disabled", "true");
    $("#progress-busy").append("0%");
    $(".progress-busy").removeClass('inert').addClass('heartbeat');
    
    setTimeout(function() {
        $("#progress-busy").text($("#progress-busy").text().replace("0%", "51%"));
    }, 3000);
    setTimeout(function() {
        $("#progress-busy").text($("#progress-busy").text().replace("51%", "78%"));
    }, 5000);
    setTimeout(function() {
        $("#progress-busy").text($("#progress-busy").text().replace("78%", "99%"));
    }, 8000);
    setTimeout(function() {
        $("#progress-busy").text($("#progress-busy").text().replace("99%", "Done"));
    }, 9000);

    setTimeout(function() {
        $("#progress-busy").empty();
        $(".progress-busy").addClass('inert').removeClass('heartbeat');
        $("#trigger-progressbar").attr("aria-disabled", "false");
    }, 10000);
});

$('input[inputmode="numeric"]').not('#card-number').on('input',function(e) {
    this.value=this.value.replace(/[^\d]/,'');
});

$('#card-number').on('keypress change', function () {
    $(this).val(function (index, value) {
        return value.replace(/[^0-9]/g, "").replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
    });
});

$('[aria-disabled="true"]').click(function(event){
    event.preventDefault();
});