const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
  messagesDirectory: 'i18n/src',
  translationsDirectory: 'i18n/l10n',
  languages: ['en', 'sv', 'es'], // any language you need 
});
