// App Configuration

const settings = {
  apiURL: "{{cookiecutter.backend_api_server_url}}:{{cookiecutter.backend_api_server_port}}",
  siteAvailability: "public",
  samplesEndpoint: "/samples",
  trackHubPrefix: "{{cookiecutter.track_hub_prefix}}"
};

module.exports = {
  settings: settings
};
