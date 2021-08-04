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
    $('[role="alert"]').toggleClass('visible')
});

$("#show-password").on('change', function() {
    if($(this).is(":checked")) {
        $('#password').attr('type', 'text')
    } else if($(this).is(":not(:checked)")) {
        $('#password').attr('type', 'password')
    }
});


$(".interactive").mouseup(function() {
    if ($(this).find('input[type="checkbox"]').is(':checked')) {
        $(this).find('input[type="checkbox"]').prop('checked', false);
        $(this).removeClass('checked');
    } else {
        $(this).find('input[type="checkbox"]').prop('checked', true);
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

$("input[type='number']").change(function(){
    var maxValue = parseInt($(this).attr('max'));
    var minValue = parseInt($(this).attr('min'));
    var enteredValue = parseInt($(this).val());

    if($.isNumeric(enteredValue)) {
        var enteredValue = parseInt($(this).val());
        if (enteredValue > maxValue) {
            $(this).val(maxValue);
        } else if (enteredValue < minValue) {
            $(this).val(minValue);
        }
    } else {
        $(this).val(minValue);
    }
});