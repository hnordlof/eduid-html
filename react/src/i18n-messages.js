
// Inspired by react-intl's `injectIntl()` HOC factory function implementation:
// https://github.com/yahoo/react-intl

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import invariant from 'invariant';
import { intlShape, defineMessages, injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl';

function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component';
}

function invariantIntlContext({intl} = {}) {
    invariant(intl,
        '[React Intl] Could not find required `intl` object. ' +
        '<IntlProvider> needs to exist in the component ancestry.'
    );
}

export default function i18n(WrappedComponent, options = {}) {
    const {
        intlPropName = 'intl',
        l10nPropName = 'l10n',
        withRef      = false,
    } = options;

    WrappedComponent.propTypes['l10n'] = PropTypes.func;

    class InjectIntl extends Component {
        constructor(props, context) {
            super(props, context);
            invariantIntlContext(context);
        }

        getWrappedInstance() {
            invariant(withRef,
                '[React Intl] To access the wrapped instance, ' +
                'the `{withRef: true}` option must be set when calling: ' +
                '`injectIntl()`'
            );

            return this.refs.wrappedInstance;
        }

        render() {

            const l10n = (msgid, values) => {
                if (msgs[msgid] !== undefined) {
                    if (values !== undefined) {
                        return msgs[msgid](values);
                    } else {
                        return msgs[msgid];
                    }
                } else if (unformatted[msgid] !== undefined) {
                    return this.context.intl.formatMessage(unformatted[msgid], values);
                } else {
                    return 'UNKNOWN MESSAGE ID (' + msgid + ')';
                }
            };

            return (
                <WrappedComponent
                    {...this.props}
                    {...{[intlPropName]: this.context.intl}}
                    {...{[l10nPropName]: l10n}}
                    ref={withRef ? 'wrappedInstance' : null}
                />
            );
        }
    }

    InjectIntl.displayName = `InjectIntl(${getDisplayName(WrappedComponent)})`;

    InjectIntl.contextTypes = {
        intl: intlShape,
        l10n: PropTypes.func
    };

    InjectIntl.WrappedComponent = WrappedComponent;

    return InjectIntl;
}


const msgs = {
    /************************/
    /* Generic Messages *****/
    /************************/

    'Not a valid email address.': (
        <FormattedMessage
            id="Not a valid email address."
            defaultMessage={`Not a valid email address.`} />),

    'out_of_sync': (
        <FormattedMessage
            id="out_of_sync"
            defaultMessage={`User data is out of sync. Reload page to re-sync.`} />),

    "button_save": (
        <FormattedMessage
          id="button_save"
          defaultMessage={`Save`} />),

    'faq_link': (
        <FormattedMessage
            id="faq_link"
            defaultMessage={`For more information see the `} />),

    'Missing error message': (
        <FormattedMessage
            id="Missing error message"
            defaultMessage={`Missing error message`} />),

    'nin needs to be formatted as 18|19|20yymmddxxxx': (
        <FormattedMessage
            id="nin needs to be formatted as 18|19|20yymmddxxxx"
            defaultMessage={`National identity number needs to be in the form of yyyymmddxxxx`} />),

    'Temporary technical problems': (
        <FormattedMessage
            id="Temporary technical problems"
            defaultMessage={`Temporary technical problems, please try again later`} />),

    'No connection to authorization endpoint': (
        <FormattedMessage
            id="No connection to authorization endpoint"
            defaultMessage={`No connection to authorization endpoint, please try again later`} />),

    'CSRF failed to validate': (
        <FormattedMessage
            id="CSRF failed to validate"
            defaultMessage={`CSRF failed to validate, please reload the page`} />),

    /************************/
    /* ConfirmModal *********/
    /************************/

    'cm.ok': (
        <FormattedMessage
            id="cm.ok"
            defaultMessage={`OK`} />),

    'cm.finish': (
        <FormattedMessage
            id="cm.finish"
            defaultMessage={`FINISH`} />),

    'cm.cancel': (
        <FormattedMessage
            id="cm.cancel"
            defaultMessage={`CANCEL`} />),

    'cm.accept': (
        <FormattedMessage
          id="cm.accept"
          defaultMessage={`ACCEPT`} />),

    'cm.close': (
        <FormattedMessage
          id="cm.close"
          defaultMessage={`CLOSE`} />),

    /************************/
    /* TABLE LIST ***********/
    /************************/
    'phone.phone_duplicated': (
        <FormattedMessage
            id="phone_duplicated"
            defaultMessage={`Added number is duplicated`} />),

    'phone.phone_format': (
        <FormattedMessage
            id="phone_format"
            defaultMessage={`Invalid telephone number. It must be a valid Swedish number, or written
                            using international notation, starting with '+' and followed by 10-20 digits.`} />),

    'mail_duplicated': (
        <FormattedMessage
            id="mail_duplicated"
            defaultMessage={`Added email is duplicated`} />),

    'phones.cannot_remove_unique': (
    <FormattedMessage
            id="phone_cannot_remove_unique"
            defaultMessage={`You can not delete the unique phone`} />),

    'emails.cannot_remove_unique': (
    <FormattedMessage
            id="emails_cannot_remove_unique"
            defaultMessage={`You can not delete the unique email`} />),

    'emails.cannot_remove_primary': (
    <FormattedMessage
            id="emails.cannot_remove_primary"
            defaultMessage={`You can not delete the primary email`} />),

    "tl.primary": (
        <FormattedMessage
          id="tl.primary"
          defaultMessage={`PRIMARY`} />),

    "tl.make_primary": (
        <FormattedMessage
          id="tl.make_primary"
          defaultMessage={`MAKE PRIMARY`} />),

    "tl.remove": (
        <FormattedMessage
          id="tl.remove"
          defaultMessage={`REMOVE`} />),

    "tl.pending": (
        <FormattedMessage
          id="tl.pending"
          defaultMessage={`PENDING CONFIRMATION`} />),


    /************************/
    /* Emails ***************/
    /************************/

    'emails.resend_success': (values) => (
        <FormattedMessage
            id="emails.resend_success"
            defaultMessage={`New code successfully sent to {email}`}
            values={values} />),

    'emails.email_label': (
        <FormattedMessage
            id="emails.email"
            defaultMessage={`Email`} />),

    'emails.code_invalid': (
        <FormattedMessage
          id="emails.code_invalid"
          defaultMessage={`The confirmation code is invalid, please try again or request a new code`} />),

    'emails.button_add': (
        <FormattedMessage
          id="emails.button_add"
          defaultMessage={`Add`} />),

    'emails.confirm_title': (values) => (
        <FormattedMessage
          id="emails.confirm_title"
          defaultMessage={`Check your email inbox for {email} for further instructions`}
          values={values} />),

    'emails.long_description': (
        <FormattedMessage
          id="emails.long_description"
          defaultMessage={`You can connect one or more email addresses with your eduID 
          account and select one to be your primary email address.`} />),

    'emails.main_title': (
        <FormattedMessage
          id="emails.main_title"
          defaultMessage={`Email addresses`} />),

    /************************/
    /* OIDC *****************/
    /************************/

    'oc.get_qrcode': (
        <FormattedMessage
          id="oc.get_qrcode"
          defaultMessage={`SE-LEG`} />),

    /************************/
    /* OIDC FREJA ***********/
    /************************/

    'ocf.initialize_proofing': (
        <FormattedMessage
          id="ocf.initialize_proofing"
          defaultMessage={`FREJA EID`} />),

    'ocf.initialize_proofing_help_text': (
        <FormattedHTMLMessage
          id="ocf.initialize_proofing_help_text"
          defaultMessage={`To use this option you need to have the <a href="https://frejaeid.com/skaffa-freja-eid/" target="_blank">Freja eID app</a> installed on your device.`} />),

    'ocf.modal_title': (
        <FormattedMessage
          id="ocf.modal_title"
          defaultMessage={`Confirm using Freja eID`} />),

    'ocf.freja_instructions_title': (
        <FormattedMessage
          id="ocf.freja_instructions_title"
          defaultMessage={`How to confirm your account using Freja eID`} />),

    'ocf.freja_instructions_step_1': (
        <FormattedMessage
          id="ocf.freja_instructions_step_1"
          defaultMessage={`Install the Freja eID app on your mobile device.`} />),

    'ocf.freja_instructions_step_2': (
        <FormattedMessage
          id="ocf.freja_instructions_step_2"
          defaultMessage={`Open the app and follow the instructions to reach Freja eID+ status.`} />),

    'ocf.freja_instructions_step_3': (
        <FormattedMessage
          id="ocf.freja_instructions_step_3"
          defaultMessage={`Return here and click the link at the bottom of the page. The app will open.`} />),

    'ocf.freja_instructions_step_4': (
        <FormattedMessage
          id="ocf.freja_instructions_step_4"
          defaultMessage={`Approve that Freja eID sends your identity to eduID. Done.`} />),

    'ocf.freja_instructions_install_link': (
        <FormattedMessage
          id="ocf.freja_instructions_install_link"
          defaultMessage={`I need to install Freja eID`} />),

    'ocf.open_app': (
        <FormattedMessage
          id="ocf.open_app"
          defaultMessage={`I have Freja eID installed`} />),

    'ocf.not_on_mobile_title': (
        <FormattedMessage
          id="ocf.not_on_mobile_title"
          defaultMessage={`Not using your phone?`} />),

    'ocf.not_on_mobile_message': (
        <FormattedHTMLMessage
          id="ocf.not_on_mobile_message"
          defaultMessage={`You need to switch to a mobile device (iOS or Android) with <a href="https://frejaeid.com/skaffa-freja-eid/" target="_blank">Freja eID</a> installed before you will be able to confirm your account using Freja eID.`} />),

    'ocf.error_missing_nin': (
        <FormattedMessage
          id="ocf.error_missing_nin"
          defaultMessage={`Please add a national identity number and try again`} />),

    'ocf.error_unknown_error': (
        <FormattedMessage
          id="ocf.error_unknown_error"
          defaultMessage={`Temporary technical difficulties, please try again later`} />),

    /************************/
    /* PERSONAL DATA ********/
    /************************/

    "pd.given_name": (
        <FormattedMessage
          id="pd.given_name"
          defaultMessage={`Given Name`} />),

    "pd.surname": (
        <FormattedMessage
          id="pd.surname"
          defaultMessage={`Surname`} />),

    "pd.display_name": (
        <FormattedMessage
          id="pd.display_name"
          defaultMessage={`Display Name`} />),

    "pd.language": (
        <FormattedMessage
          id="pd.language"
          defaultMessage={`Language`} />),

    'pd.long_description': (
        <FormattedMessage
          id="pd.long_description"
          defaultMessage={`This information is sent to service providers
           when you log in using eduID in order to personalize those services for you.`} />),

    'pd.main_title': (
        <FormattedMessage
          id="pd.main_title"
          defaultMessage={`Personal information`} />),

    /************************/
    /* Mobile ***************/
    /************************/

    'mobile.resend_success': (values) => (
        <FormattedMessage
            id="mobile.resend_success"
            defaultMessage={`New code successfully sent to {email}`}
            values={values} />),

    'mobile.email_label': (
        <FormattedMessage
            id="mobile.mobile"
            defaultMessage={`mobile`} />),

    'mobile.button_add': (
        <FormattedMessage
          id="mobile.button_add"
          defaultMessage={`Add`} />),

    'mobile.confirm_title': (values) => (
        <FormattedMessage
          id="mobile.confirm_title"
          defaultMessage={`Check your mobile inbox for {phone} for further instructions`}
          values={values} />),

    'phones.long_description': (
        <FormattedMessage
          id="phones.long_description"
          defaultMessage={`You can connect one or more mobile phone numbers with
           your eduID account, and select which one is the primary one.`} />),

    'phones.main_title': (
        <FormattedMessage
          id="phones.main_title"
          defaultMessage={`Mobile phone numbers`} />),

    /***********************/
    /* Security ************/
    /***********************/

    'security.long_description': (
        <FormattedMessage
          id="security.long_description"
          defaultMessage={`Your eduID account password can be changed below.`} />),

    'security.main_title': (
        <FormattedMessage
          id="security.main_title"
          defaultMessage={`Security`} />),

    'security.credential': (
        <FormattedMessage
          id="security.credential"
          defaultMessage={`Credential`} />),

    'security.creation_date': (
        <FormattedMessage
          id="security.creation_date"
          defaultMessage={`Creation date`} />),

    'security.last_used': (
        <FormattedMessage
          id="security.last_used"
          defaultMessage={`Last used`} />),

    'security.change_password': (
        <FormattedMessage
          id="security.change_password"
          defaultMessage={`Change password`} />),

    'security.account_description': (
        <FormattedMessage
          id="security.account_description"
          defaultMessage={`Use the button below to permanently delete your eduID account.`} />),

    'security.account_title': (
        <FormattedMessage
          id="security.account_title"
          defaultMessage={`Account deletion`} />),

    'security.delete_account': (
        <FormattedMessage
          id="security.delete_account"
          defaultMessage={`Delete eduID account`} />),

    'security.delete_account': (
        <FormattedMessage
          id="security.delete_account"
          defaultMessage={`Delete eduID account`} />),

    'security.confirm_title': (
        <FormattedMessage
          id="security.confirm_title"
          defaultMessage={`Delete account`} />),

    'security.modal_info': (
        <FormattedMessage
          id="security.modal_info"
          defaultMessage={`Are you sure that you wish to delete your eduID account? This action will
                           permanently remove all the data associated with the account from our database. `} />),

    'security.modal_notes': (
        <FormattedMessage
          id="security.modal_notes"
          defaultMessage={`Note that for security reasons if you choose to delete your account,
                           you will be asked to log in again.`} />),

    'security.change_info': (
        <FormattedMessage
          id="security.change_info"
          defaultMessage={`For security reasons we will ask you to log in again before changing your password.`} />),

    'security.confirm_button': (
        <FormattedMessage
          id="security.confirm_button"
          defaultMessage={`Confirm deletion of eduID account`} />),

    'security.password_credential_type': (
        <FormattedMessage
          id="security.password_credential_type"
          defaultMessage={`Password`} />),

    'security.confirm_title_chpass': (
        <FormattedMessage
          id="security.confirm_title_chpass"
          defaultMessage={`Secure password change`} />),

    'security.confirm_title_deletion': (
        <FormattedMessage
          id="security.confirm_title_deletion"
          defaultMessage={`Account deletion`} />),

    'chpass.suggested_password': (
        <FormattedMessage
          id="chpass.suggested_password"
          defaultMessage={`Suggested password`} />),

   'chpass.custom_password': (
        <FormattedMessage
          id="chpass.custom_password"
          defaultMessage={`Custom password`} />),

   'chpass.repeat_password': (
        <FormattedMessage
          id="chpass.repeat_password"
          defaultMessage={`Repeat your custom password`} />),

   'chpass.help-text-general': (
        <FormattedMessage
          id="chpass.help-text-general"
          defaultMessage={`You can change your current password using this form. A strong password has been generated for you. You can accept the generated password by clicking "Change password" or you can opt to choose your own password using the checkbox.`} />),

   'chpass.old_password': (
        <FormattedMessage
          id="chpass.old_password"
          defaultMessage={`Current password`} />),

   'chpass.use-custom-label': (
        <FormattedMessage
          id="chpass.use-custom-label"
          defaultMessage={`Use my own password`} />),

   'chpass.title-general': (
        <FormattedMessage
          id="chpass.title-general"
          defaultMessage={`Change your password`} />),

   'chpass.change-password': (
        <FormattedMessage
          id="chpass.change-password"
          defaultMessage={`Change password`} />),

   'chpass.no_old_pw': (
        <FormattedMessage
          id="chpass.no_old_pw"
          defaultMessage={`Please enter the old password`} />),

   'pwfield.enter_password': (
        <FormattedMessage
          id="pwfield.enter_password"
          defaultMessage={`Enter password`} />),

   'pwfield.repeat_password': (
        <FormattedMessage
          id="pwfield.repeat_password"
          defaultMessage={`Repeat password`} />),

   'pwfield.terrible': (
        <FormattedMessage
          id="pwfield.terrible"
          defaultMessage={`Very weak password`} />),

   'pwfield.weak': (
        <FormattedMessage
          id="pwfield.weak"
          defaultMessage={`Weak password`} />),

   'pwfield.good': (
        <FormattedMessage
          id="pwfield.good"
          defaultMessage={`Fairly strong password`} />),

   'pwfield.strong': (
        <FormattedMessage
          id="pwfield.strong"
          defaultMessage={`Strong password`} />),

   'pwfield.repeat_different': (
        <FormattedMessage
          id="pwfield.repeat_different"
          defaultMessage={`Repeated pasword is different`} />),

    /************************/
    /* Nins *****************/
    /************************/

   'nins.main_title': (
        <FormattedMessage
          id="nins.main_title"
          defaultMessage={`National identity number`} />),

   'nins.justification': (
        <FormattedMessage
          id="nins.justification"
          defaultMessage={`Some service providers (e.g. Antagning.se) require a confirmed identity.`} />),

   'nins.nin': (
        <FormattedMessage
          id="nins.nin"
          defaultMessage={"Number"} />),

   'nins.verified': (
        <FormattedMessage
          id="nins.verified"
          defaultMessage={`Verified`} />),

   'nins.primary': (
        <FormattedMessage
          id="nins.primary"
          defaultMessage={`Primary`} />),

   'nins.help_text': (
        <FormattedMessage
          id="nins.help_text"
          defaultMessage={`Add your Swedish national identity number and initiate the confirmation process using one of the buttons below.`} />),

   'nins.invalid_nin': (
        <FormattedMessage
          id="nins.invalid_nin"
          defaultMessage={`Invalid NIN`} />),

   'nins.valid_nin': (
        <FormattedMessage
          id="nins.valid_nin"
          defaultMessage={`Valid NIN`} />),

   'nins.confirmed_nin': (
        <FormattedMessage
          id="nins.confirmed_nin"
          defaultMessage={`NIN (Confirmed)`} />),

   'nins.unconfirmed_nin': (
        <FormattedMessage
          id="nins.unconfirmed_nin"
          defaultMessage={`Unconfirmed NIN`} />),

   'nins.button_delete': (
        <FormattedMessage
          id="nins.button_delete"
          defaultMessage={`Remove`} />),

   'nins.only_one_to_verify': (
        <FormattedMessage
          id="nins.only_one_to_verify"
          defaultMessage={`You can only have one unverified NIN to verify it. Please remove the unwanted ones.`} />),

    /************************/
    /* Letter proofing ******/
    /************************/

   'letter.letter_button_text': (
        <FormattedMessage
          id="letter.letter_button_text"
          defaultMessage={`Confirm using letter`} />),
};

const unformatted = defineMessages({
    'emails.placeholder': {
        id: "emails.confirm_email_placeholder",
        defaultMessage: `Email confirmation code`,
        description: "Placeholder for email text input"
    },
    'mobile.placeholder': {
        id: "mobile.confirm_mobile_placeholder",
        defaultMessage: `Phone confirmation code`,
        description: "Placeholder for phone text input"
    },
    'chpass.help-text-newpass': {
        id: "chpass.help-text-newpass",
        defaultMessage: `<p>Choose a strong password. Some tips:</p>
            <ul>
	            <li>Use upper- and lowercase characters (preferably not in the beginning or end)</li>
	            <li>Add digits somewhere else than at the end of the password</li>
                <li>Add special characters, such as &#64; &#36; &#92; &#43; &#95; &#37;</li>
	            <li>Spaces are ignored</li>
            </ul>`,
        description: "help text for custom password"
    },
    'cm.lost_code': {
        id: "cm.lost_code",
        defaultMessage: `Lost your confirmation code?`,
        description: "Lost code problem description"
    },
    'cm.resend_code': {
        id: "cm.resend_code",
        defaultMessage: `Resend confirmation code`,
        description: "Lost code problem solution"
    },
    'letter.confirm_title': {
        id: "letter.confirm_title",
        defaultMessage: `Confirm identity with code sent by letter`,
        description: "Title for letter proofing confirm dialog"
    },
    'letter.lost_code': {
        id: "letter.lost_code",
        defaultMessage: `When you click on the "Send code" link a letter with a verification code will be sent to your official postal address.`,
        description: "Text for letter proofing confirm dialog"
    },
    'letter.resend_code': {
        id: "letter.resend_code",
        defaultMessage: `Send code`,
        description: "Text for letter code resend button"
    },
    'letter.placeholder': {
        id: "letter.placeholder",
        defaultMessage: `Letter confirmation code`,
        description: "Placeholder for letter proofing text input"
    },
});
