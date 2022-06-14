module.exports = {
  ci: {
    upload: {
      target: 'lhci',
      serverBaseUrl: 'https://evening-sea-69585.herokuapp.com/',
      token: LHCI_BUILD_TOKEN, // could also use LHCI_TOKEN variable instead
    },
  },
};