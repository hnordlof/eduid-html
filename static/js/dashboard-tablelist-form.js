/*jslint vars: false, nomen: true, browser: true */
/*global $, console, alert, tabbedform */


(function () {
    "use strict";

    var sendInfo = function(container, cls, msg) {
            if (cls === 'out_of_sync' || cls === 'error') { cls = 'danger' }
            var messageHTML = '<div class="alert alert-' + cls +
    '"><button type="button" class="close" data-dismiss="alert">&times;</button>' +
            msg + '</div>';
            container.find('.info-container').prepend(messageHTML);
        },

        askCode = function(actions_url, action, container, value, title, placeholder) {
            askDialog(value, actions_url, title, '', placeholder, function(code) {
                $('#askDialog .ok-button.has-spinner').addClass('loading').attr('disabled', 'disabled');
                $.post(actions_url, {
                    action: action,
                    identifier: value,
                    code: code
                },
                function(data, statusText, xhr) {
                    $('#askDialog .ok-button.has-spinner').removeClass('loading').removeAttr('disabled');
                    var dialog = $('#askDialog');
                    sendInfo(dialog, data.result, data.message);
                    if (data.result === 'out_of_sync') {
                        dialog.find('.cancel-button').click();
                    } else if (data.result == 'success') {
                        dialog.find('.btn').hide();
                        dialog.find('.divDialogElements').hide();
                        dialog.find('.finish-button').show();
                    }
                },
                'json')});
        },

        getLetterState = function (action, nin) {
            var actions_url = $('.actions-url').data('url');
            $.post(actions_url, {
                action: action,
                identifier: nin
            },
            function (data, statusText, xhr) {
                if (data.sent) {
                    $('#proofingLetterSent').modal();
                } else {
                    $('#sendProofingLetter').modal();
                    $('#doSendProofingLetter').click(function () {

                    });
                }
            },
            'json');
        },

        sendProofingLetter = function () {
        },

        initialize = function (container, url) {
            if (container.find('.form-content .alert-danger').length > 0){
                container.find('.form-content').show();
            }

            container.find('.add-new').click(function (e) {
                container.find('.form-content').toggleClass('hide');
                container.find('.add-new').toggleClass('active');
            });

            $('.resend-code').unbind('click');

            $('.resend-code').click(function(e) {
                var actions_url = $(this).attr('href'),
                    value = $(this).attr('data-identifier'),
                    dialog = $(this).parents('#askDialog');

                e.preventDefault();

                $.post(actions_url, {
                    action: 'resend_code',
                    identifier: value
                },
                function(data, statusText, xhr) {
                    sendInfo(dialog, data.result, data.message);
                },
                'json');
            });

            container.find('a.verifycode').click(function (e) {
                var identifier = $(e.target).data('identifier');
                e.preventDefault();
                container.find('table.table tr[data-identifier=' + identifier + '] input[name=verify]').click();
            });

            container.find('table.table-form input[type=button]').unbind('click').
              click(function (e) {
                var action = $(e.target).attr('name'),
                    value = $(e.target).data('index'),
                    actions_url = $('.actions-url').data('url');

                $.post(actions_url, {
                    action: action,
                    identifier: value
                },
                function(data, statusText, xhr) {
                    if (data.result == 'getcode') {
                        askCode(actions_url, action, container, value, data.message, data.placeholder);
                    } else {
                        sendInfo(container, data.result, data.message);
                        $('body').trigger('action-executed');
                    }
                },
                'json');
            });
            container.find('input#letter-proofing').unbind('click').
                click(function (e) {
                    var nin_value = $(e.target).data('index'),
                        action = $(e.target).attr('name');
                    getLetterState(action, nin_value);
                });
    };
    tabbedform.changetabs_calls.push(initialize);
}());
