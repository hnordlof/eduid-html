
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18n-messages';
import EduIDButton from 'components/EduIDButton';
import DeleteModal from 'components/DeleteModal';
import GenericConfirmModal from 'components/GenericConfirmModal';

import 'style/Security.scss';


class Security extends Component {

  render () {
    if (this.props.redirect_to !== '') {
        window.location.href = this.props.redirect_to;
        return
    }
    if (this.props.deleted) {
        window.location.href = 'https://eduid.se';
        return
    }
    let spinning = false,
        creds_table = this.props.credentials.map((cred, index) => {
            return (<tr key="{index}">
                        <td>{this.props.l10n(cred.credential_type)}</td>
                        <td>{new Date(cred.created_ts).toString()}</td>
                        <td>{new Date(cred.success_ts).toString()}</td>
                    </tr>
            );
        }, this);

    if (this.props.is_fetching) spinning = true;
    return (
        <div>
          <div className="intro">
              <h4>{this.props.l10n('security.main_title')}</h4>
              <p>{this.props.l10n('security.long_description')}</p>
          </div>
          <table className="table table-bordered table-form passwords">
              <tbody>
                <tr>
                    <th>{this.props.l10n('security.credential')}</th>
                    <th>{this.props.l10n('security.creation_date')}</th>
                    <th>{this.props.l10n('security.last_used')}</th>
                </tr>
                {creds_table}
              </tbody>
          </table>
          <EduIDButton bsStyle="primary"
                      id="security-change-button"
                      spinning={spinning}
                      onClick={this.props.handleStartConfirmationPassword}>
                    {this.props.l10n('security.change_password')}
          </EduIDButton>
          <div className="second-block">
              <div className="intro">
                 <h4>{this.props.l10n('security.account_title')}</h4>
                 <p>{this.props.l10n('security.account_description')}</p>
              </div>
              <EduIDButton className="btn btn-danger"
                           id="delete-button"
                           spinning={spinning}
                           onClick={this.props.handleStartConfirmationDeletion}>
                        {this.props.l10n('security.delete_account')}
              </EduIDButton>
          </div>
          <GenericConfirmModal
                modalId="securityConfirmDialog"
                title={this.props.l10n('security.confirm_title_chpass')}
                mainText={this.props.l10n('security.change_info')}
                showModal={this.props.confirming_change}
                closeModal={this.props.handleStopConfirmationPassword}
                acceptModal={this.props.handleConfirmationPassword}
          />
          <DeleteModal
                title={this.props.l10n('security.confirm_title_deletion')}
                showModal={this.props.confirming_deletion}
                closeModal={this.props.handleStopConfirmationDeletion}
                handleConfirm={this.props.handleConfirmationDeletion}
          />
        </div>
    );
  }
}

Security.propTypes = {
  credentials: PropTypes.array,
  creation_date: PropTypes.string,
  last_used: PropTypes.string,
  language: PropTypes.string,
  langs: PropTypes.array,
  errorMsg: PropTypes.string,
  is_fetching: PropTypes.bool,
  confirming_change: PropTypes.bool,
  deleted: PropTypes.bool,
  handleStartConfirmationPassword: PropTypes.func,
  handleStopConfirmationPassword: PropTypes.func,
  handleConfirmationPassword: PropTypes.func,
  confirming_deletion: PropTypes.bool,
  handleStartConfirmationDeletion: PropTypes.func,
  handleStopConfirmationDeletion: PropTypes.func,
  handleConfirmationDeletion: PropTypes.func,
}

export default i18n(Security);
