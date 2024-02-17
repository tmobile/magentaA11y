// Allow :active styles to work in your CSS on a page in Mobile Safari:
document.addEventListener("touchstart", function(){}, true);

$("#copy").click(function(){
    $("#criteria-area").select();
    document.execCommand('copy');
});

// Expander toggle
$( ".expander-toggle").click(function() {
    if( $(this).attr('aria-expanded') == 'false' ) {
        $(this).attr('aria-expanded', 'true').next(".expander-content" ).addClass('visible').attr('aria-hidden', 'false');
    } else if( $(this).attr('aria-expanded') == 'true' ) {
        $(this).attr('aria-expanded', 'false').next(".expander-content" ).removeClass('visible').attr('aria-hidden', 'true');
    }
});

// Expander toggle fail example from How to Test Links & Buttons
$(".expander-toggle-fail").click(function() {
    if( $(this).hasClass('expanded') ) {
        $(this).removeClass('expanded').next(".expander-content" ).removeClass('visible');
    } else if( !$(this).hasClass('expanded') ) {
        $(this).addClass('expanded').next(".expander-content" ).addClass('visible');
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
            $('#favorite-nato-error').append('Warning: The correct answer is Charlie');
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
            $('#alert-notification').append('Success: Your account has been updated');
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
    $('#showModal').click(function(){
        if (isDialogSupported) {
            modal.showModal();
            // document.body.classList.add("dialog-open");
        } else {
            modal.setAttribute("open", "");
        }
        // Focus the dialog itself on open
        modal.focus();
        if ( $('dialog').hasClass("takeover") ) {
            $('#really-slow-app').attr('aria-busy', "true")
            setTimeout(function(){
                modal.close();
                $('#really-slow-app').attr('aria-busy', "false")

            }, 10000);
        }
    });

    if ( $('#closeModal').length ) {
        $('#closeModal').click(function(){
            if (isDialogSupported) {
                modal.close();
            } else {
                modal.removeAttribute("open", "");
            }
            setTimeout(function(){
                showModal.focus();
            }, 25);
        });
    }       

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

// Stepper
const 
    $stepper = $(".stepper"),
    stepperLabel = $stepper.find("label").text(),
    $stepperStatusTarget = $stepper.find("#stepper-status-target"),
    $stepperMinButton = $(".minus"),
    $stepperMaxButton = $(".plus");

    function removeStepperLiveMessage(delay){
        if(!delay){ delay = 2000; }
        setTimeout(() => {
            $stepperStatusTarget.html("");
        }, delay);
    }

    $("#stepper").on("change", function() {
        // get the value of the select element
        const value = parseInt($(this).val()),
            min = parseInt($(this).attr("min")),
            max = parseInt($(this).attr("max"));
        if(value > min || value < max){
            $stepperMaxButton.removeAttr("aria-disabled");
            $stepperMinButton.removeAttr("aria-disabled");
        }
        if(value === min){
            $stepperMinButton.attr("aria-disabled","true");
            $stepperMaxButton.removeAttr("aria-disabled");
        }
        if(value === max){
            $stepperMaxButton.attr("aria-disabled","true");
            $stepperMinButton.removeAttr("aria-disabled");
        }
      });

$stepperMinButton.click(function(){
    var overlay = $(this).parents(".stepper").find("#stepper-overlay");
    var inpt = $(this).parents(".stepper").find("[name=stepper-input]");
    var min = $(this).parents(".stepper").find("[name=stepper-input]").attr('min');
    var max = $(this).parents(".stepper").find("[name=stepper-input]").attr('max');
    var val = parseInt(inpt.val());
    if ( val < 1 ) inpt.val(val=1);
    if ( val < 1 ) inpt.attr('data-selected', '1');
    if ( val-1 == min ){
        $stepperMinButton.attr("aria-disabled","true");
    };
    if( val-1 < max){
        $stepperMaxButton.removeAttr("aria-disabled");
    }
    if ( val == min ){
        return;
    };
    inpt.val(val-1);
    inpt.attr('data-selected', val-1);
    overlay.attr('data-selected', val-1);
    $stepperStatusTarget.html(stepperLabel + "updated, " + parseInt(val - 1));
    removeStepperLiveMessage(2000);
});

$stepperMaxButton.click(function(){
    var overlay = $(this).parents(".stepper").find("#stepper-overlay");
    var inpt = $(this).parents(".stepper").find("[name=stepper-input]");
    var max = $(this).parents(".stepper").find("[name=stepper-input]").attr('max');
    var val = parseInt(inpt.val());
    if(val+1 > 1){
        $stepperMinButton.removeAttr("aria-disabled");
    }
    if(parseInt(val) === parseInt(max -1)){
        $stepperMaxButton.attr("aria-disabled","true");
    }
    if ( val == max ) return;
    inpt.val(val+1);
    inpt.attr('data-selected', val+1);
    overlay.attr('data-selected', val+1);
    $stepperStatusTarget.html(stepperLabel + "updated, " + parseInt(val + 1));
    removeStepperLiveMessage(2000);
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

var $tabs = $(".tabs :radio");

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

// On page load set the values stored
$.each(formValues, function(key, value) {
    if(key) { // Check to see if key is populated
        $("#" + key).prop('open', value); 
        $("#" + key).prop('checked', value);
        // console.log(key, value);
    }
});

// Tab panels are open by default in case of JS can't run
// Hide all panels on load
$(".tab-panel").addClass('inert');
$(".tab").each(function() {
    // Check for checked radio tabs
    if($(this).is(":checked")) {
        // Get the ID from aria-controls
        $panelId = $(this).attr('aria-controls');
        // Remove the class
        $("#" + $panelId).removeClass('inert');
    }
});

// Watch for changes
$(".tab").on("change", function(){
    // Get the ID from aria-controls
    $panelId = $(this).attr('aria-controls');
    // Hide all panels
    $(".tab-panel").addClass('inert');
    // Show the checked panel
    $("#" + $panelId).removeClass('inert');
});

// If no tab is selected on load
if ( ! $(".tab").is(':checked') ) {
    // Re-check the first radio input
    $("#gherkin").prop("checked", true);
    // Activate the first panel
    $(".tab-panel").first().removeClass('inert');
}

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

$(".radio-filter-label").click(function(event){
    $for = $(this).attr("for");
    if( ! $('#' + $for).is(":checked")) {
        setTimeout(function() {
            $('#radio-filter-group').focus();
        }, 25);
    }
});
 
$(document).on('input', '#cowbell-range', function() {
    $('#cowbell-range-value').val( $(this).val() );
});

$(document).on('change', '#cowbell-range-value', function() {
    $('#cowbell-range').val( $(this).val() );
});


const textarea = document.getElementById('message');
if(textarea) {
    const chars = document.getElementById('currentChars');
    const srOutputTarget = document.getElementById('sr-counter-target');
    textarea.addEventListener("input", event => {
        const target = event.currentTarget;
        const maxLength = target.getAttribute("maxlength");
        // const currentLength = target.value.replace(/\r(?!\n)|\n(?!\r)/g, "\r\n").length;
        const currentLength = target.value.length;
        chars.innerHTML = maxLength - currentLength;
        setTimeout(function() {
            srOutputTarget.innerHTML = maxLength - currentLength;
        },1000);
    });
}

function closeToast() {
    $('#toast').removeClass('enabled').addClass('inert');
    $('#toast-message').empty();
  }
// Close the toast
$("#toast").click(function(){
    closeToast();
});
// Trigger toast
$("#marketingCookies").on('change', function() {
    closeToast();
    setTimeout(function(){ // Allows NVDA to catch up to the alert being back in the DOM
        $('#toast').removeClass('inert').addClass('enabled');
        $('#toast-message').append('Marketing cookie changes saved');
    }, 800);
});

function closeUpdate() {
    $('#hint-spam').removeClass('enabled').addClass('inert');
    $('#hint-spam-message').empty();
}
// Close the toast
$("#spam").on('change', function() {
    closeUpdate();
});
// Trigger toast
$("#spam").on('change', function() {
    closeUpdate();
    setTimeout(function(){ // Allows NVDA to catch up to the alert being back in the DOM
        $('#hint-spam').removeClass('inert').addClass('enabled');
        $('#hint-spam-message').append('Spam preferences saved');
    }, 1000);
});

//Handling jump links from How to Test Links & Buttons
function scrollToTop() {
    // Programmatically set the focus on the link target element
    const targetElement = $('#top-text');
    targetElement.focus();
  }

  // Add a click event listener to the link using jQuery
 $('#return-to-top-link').on('click', scrollToTop);

// Handling modal dialogs from How to Test Links & Buttons
var passModal = $("#passModal");
var linkButtonPass = $("#modalFromLinkPass");
var closeButtonPass = $("#closePassModal");
var failModal = $("#failModal");
var linkButtonFail = $("#modalFromLinkFail");
var closeButtonFail = $("#closeFailModal");
var isModalOpen = false;

// Open passModal when the link is clicked
linkButtonPass.click(function (e) {
  e.preventDefault();
  openModal(passModal, closeButtonPass);
});

// Open failModal when the link is clicked
linkButtonFail.click(function (e) {
  e.preventDefault();
  openModal(failModal, closeButtonFail);
});

// Close the modal when the close button is clicked
closeButtonPass.click(function () {
  closeModal(passModal, linkButtonPass);
});

// Close the failModal when the close button is clicked
closeButtonFail.click(function () {
  closeModal(failModal, linkButtonFail);
});

// Close the modal when clicking outside the modal content
$(window).click(function (e) {
  if ((e.target === passModal[0] || e.target === failModal[0]) && isModalOpen) {
    closeModal(passModal, linkButtonPass);
    closeModal(failModal, linkButtonFail);
  }
});

// Prevent modal from closing when clicking inside the modal-content
$(".modal-content").click(function (e) {
  e.stopPropagation();
});

// Close modal when pressing the Escape key
$(document).keyup(function (e) {
  if (e.key === "Escape" && isModalOpen) {
    closeModal(passModal, linkButtonPass);
    closeModal(failModal, linkButtonFail);
  }
});

function openModal(targetModal, closeButton) {
  targetModal.css("display", "block");
  targetModal.attr("aria-hidden", "false");
  //closeButton.focus();
  targetModal.on("keydown", trapFocus);
  isModalOpen = true;
  setTimeout(function() {
    // Set focus after a delay of 1000 milliseconds
    targetModal.focus();
  }, 100);
}

function closeModal(targetModal, linkButton) {
  targetModal.css("display", "none");
  targetModal.attr("aria-hidden", "true");
  linkButton.focus();
  targetModal.off("keydown", trapFocus);
  isModalOpen = false;
}

function trapFocus(e) {
  var targetModal = $(e.target).closest(".modal");
  var focusableElements = targetModal.find('a[href], button, textarea, input, select').filter(':visible');
  var firstFocusable = focusableElements.first();
  var lastFocusable = focusableElements.last();

  if (e.key === "Tab") {
    if (e.shiftKey && document.activeElement === firstFocusable[0]) {
      e.preventDefault();
      lastFocusable.focus();
    } else if (!e.shiftKey && document.activeElement === lastFocusable[0]) {
      e.preventDefault();
      firstFocusable.focus();
    }
  }
}

//How to test Forms change of context examples

$('#selectPass').change(function() {
    $('#submitSelectPassSelection').attr('aria-disabled', 'false');
});

$('#submitSelectPassSelection').click(function(e) {
    e.preventDefault();
    if ($(this).attr('aria-disabled') === 'true') {
        return;  // Ignore click if button is disabled
    }
    $('#selectPass').hide();
    $(this).hide();
    $('#messagePass').show();
});

$('#selectFail').change(function() {
    $(this).hide();
    $('#messageFail').show();
});

//How to test Forms error message example
$('#goodErrorInputSubmit').click(function(e) {
    e.preventDefault();
    $('#goodErrorInputError').show();
    $('#goodErrorInput').focus();
    $('#goodErrorInput').attr('aria-invalid', 'true');
});

$('#badErrorInputSubmit').click(function(e) {
    e.preventDefault();
    $('#badErrorInputError').show();
});

// form validation demo 
var $loginForm = $("#demo-form-validation");

if ($loginForm.length > 0) {
    formValidationDemo();
}

function formValidationDemo() {

    const $svgErrorIcon = "<svg class=\"error-icon\" role=\"img\" aria-label=\"Error\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z\"/></svg>";
    const cleanupErrors = true;

    $loginForm.validate({
        errorElement: "span", // define the error wrapper - no double label
        onfocusout: false, // Disable validation on blur
        onkeyup: false, // Disable validation while typing
        focusInvalid: true, // Focus on the first invalid field
        rules: {
            "first-name": "required",
            "last-name": "required",
            "email-address": {
                required: true,
                email: true
            }
        },
        messages: {
            "first-name": $svgErrorIcon + "First name is a required field",
            "last-name": $svgErrorIcon + "Last name is a required field",
            "email-address": {
                required: $svgErrorIcon + "Email address is a required field",
                email: $svgErrorIcon + "Please enter a valid email address"
            }
        },
        highlight: function(element) {
            $(element).attr("aria-invalid", "true");
        },
        unhighlight: function(element) {
            $(element).removeAttr("aria-invalid");
        }
    });

    // Manually validate and remove errors on focusout if fixed
    if(cleanupErrors){
        $("input, textarea", $loginForm).on("focusout", function() {
            var validator = $loginForm.validate();
            var element = $(this);

            if (element.val()) { // Only validate if there's a value
                validator.element(element); // Validate the specific element

                if (!element.hasClass("error")) { // If no error, remove previous errors
                    var $errorSpan = element.next("span"); // Find the next sibling span.error element
                    if ($errorSpan.length) { // Check if the error span exists
                        $errorSpan.remove(); // Remove the error span
                    }
                    element.removeAttr("aria-invalid"); // Remove aria-invalid
                    element.removeAttr("aria-describedby"); // Remove aria-describedby
                }
            } 
        });
    }

    // Add submit event listener
    $loginForm.on("submit", function(event) {
        // Check if the form is valid
        if ($loginForm.valid()) {
            // If form is valid, show alert
            alert("Form is valid. Submitting...");
            event.preventDefault();
        }
        else {
            // If form is not valid, prevent default form submission
            event.preventDefault();
        }
    });

}