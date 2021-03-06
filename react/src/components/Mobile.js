
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18n-messages';
import EduIDButton from 'components/EduIDButton';
import TextControl from 'components/TextControl';
import TableList from 'components/TableList';
import ConfirmModal from 'components/ConfirmModal';

import 'style/Mobile.scss';


class Mobile extends Component {

  render () {

    let message = '',
        messageArgs = {},
        levelMessage = 'success';

    if (this.props.resending.failed) {
      message= this.props.l10n(this.props.resending.error.form);
      levelMessage = 'error';
    } else if (this.props.resending.message) {
      message = this.props.resending.message;
      messageArgs = {email: this.props.confirming};
      levelMessage = 'success';
    }

    let spinning = false;
    if (this.props.is_fetching) spinning = true;
    return (
        <div className="mobileview-form-container ">
              <div className="intro">
              <h4>{this.props.l10n('phones.main_title')}</h4>
                <p>{this.props.l10n('phones.long_description')}</p>
                <p>{this.props.l10n('faq_link')}
                <a href="https://www.eduid.se/faq.html">FAQ</a></p>
          </div>
            <TableList entries={this.props.phones}
                       handleStartConfirmation={this.props.handleStartConfirmation}
                       handleRemove={this.props.handleRemove}
                       handleMakePrimary={this.props.handleMakePrimary}
                       errorMsg={this.props.errorMsg} />
            <div className="form-content">
              <form id="mobilesview-form"
                    className="form-horizontal"
                    role="form">
                <fieldset id="mobile-form" className="tabpane">
                  <TextControl name="mobile"
                               label={this.props.l10n('mobile.mobile_label')}
                               componentClass="input"
                               type="text"
                               handleChange={this.props.handleChange} />
                  <EduIDButton bsStyle="primary"
                               id="mobile-button"
                               spinning={spinning}
                               onClick={this.props.handleAdd}>
                      {this.props.l10n('mobile.button_add')}
                  </EduIDButton>
                </fieldset>
              </form>
            </div>
            <ConfirmModal
                modalId="phoneConfirmDialog"
                controlId="phoneConfirmDialogControl"
                title={this.props.l10n('mobile.confirm_title', {phone: this.props.confirming})}
                resendHelp={this.props.l10n('cm.lost_code')}
                resendText={this.props.l10n('cm.resend_code')}
                placeholder={this.props.l10n('mobile.placeholder')}
                showModal={Boolean(this.props.confirming)}
                closeModal={this.props.handleStopConfirmation}
                handleResendCode={this.props.handleResend}
                handleConfirm={this.props.handleConfirm}
                is_fetching={this.props.resending.is_fetching}
                message={message}
                messageArgs={messageArgs}
                LevelMessage={levelMessage} />
        </div>
    );
  }
}

Mobile.propTypes = {
  phones: PropTypes.array,
  errorMsg: PropTypes.string,
  confirming: PropTypes.string,
  resending: PropTypes.object,
  handleChange: PropTypes.func,
  handleResend: PropTypes.func,
  handleAdd: PropTypes.func,
  handleStartConfirmation: PropTypes.func,
  handleStopConfirmation: PropTypes.func,
  handleRemoveMobile: PropTypes.func
}

export default i18n(Mobile);
