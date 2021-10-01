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
$("#show-alert").click(function() {
    $('[role="alert"]').addClass('visible')
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


// Look at all slides
// If next is clicked, hide current, show next
// If back is clicked, hide current, show previous

$(".next").click(function(){
    if ($('.slide.visible').next('.slide').length) {
        $('.slide.visible').removeClass('visible').addClass('inert').next('.slide').removeClass('inert').addClass('visible');
        if (! $(this).closest('.carousel-nav').length ) {
            $('.slide.visible').focus();
        }
    }
});
$(".previous").click(function(){
    if ($('.slide.visible').prev('.slide').length) {
        $('.slide.visible').removeClass('visible').addClass('inert').prev('.slide').removeClass('inert').addClass('visible');
        if (! $(this).closest('.carousel-nav').length ) {
            $('.slide.visible').focus();
        }
    }
});