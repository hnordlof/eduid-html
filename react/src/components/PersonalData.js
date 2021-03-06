
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18n-messages';
import TextControl from 'components/TextControl';
import EduIDButton from 'components/EduIDButton';

//  XXX this interferes with the bootstrap in eduid-html
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'style/PersonalData.scss';


class PersonalData extends Component {

  render () {

    let spinning = false;
    if (this.props.is_fetching) spinning = true;
    return (
        <div>
          <div className="intro">
              <h4>{this.props.l10n('pd.main_title')}</h4>
                <p>{this.props.l10n('pd.long_description')}</p>
                <p>{this.props.l10n('faq_link')}
                <a href="https://www.eduid.se/faq.html">FAQ</a></p>
          </div>
          <form id="personaldataview-form"
                className="form-horizontal"
                role="form">
            <fieldset id="personal-data-form" className="tabpane">
              <TextControl name="given_name"
                           initialValue={this.props.given_name}
                           label={this.props.l10n('pd.given_name')}
                           componentClass="input"
                           type="text"
                           handleChange={this.props.handleChange} />
              <TextControl name="surname"
                           initialValue={this.props.surname}
                           label={this.props.l10n('pd.surname')}
                           componentClass="input"
                           type="text"
                           handleChange={this.props.handleChange} />
              <TextControl name="display_name"
                           initialValue={this.props.display_name}
                           label={this.props.l10n('pd.display_name')}
                           componentClass="input"
                           type="text"
                           handleChange={this.props.handleChange} />
              <TextControl name="language"
                           initialValue={this.props.language}
                           label={this.props.l10n('pd.language')}
                           componentClass="select"
                           value={this.props.language}
                           options={this.props.langs}
                           handleChange={this.props.handleChange} />
              <EduIDButton bsStyle="primary"
                      id="personal-data-button"
                      spinning={spinning}
                      onClick={this.props.handleSave}>
                    {this.props.l10n('button_save')}
              </EduIDButton>
            </fieldset>
          </form>
        </div>
    );
  }
}

PersonalData.propTypes = {
  given_name: PropTypes.string,
  surname: PropTypes.string,
  display_name: PropTypes.string,
  language: PropTypes.string,
  langs: PropTypes.array,
  errorMsg: PropTypes.string,
  is_fetching: PropTypes.bool
}

export default i18n(PersonalData);
