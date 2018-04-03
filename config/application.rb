require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
# require "sprockets/railtie"
# require "rails/test_unit/railtie"

Bundler.require(*Rails.groups)

module CryptoTicker
  class Application < Rails::Application
    config.load_defaults 5.1
    config.api_only = true
    # this allows for native app to access this app:
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        # resource has a comma because resourse has two params,  so its '*', hash for params
        resource '*',
        headers: :any,
        methods: [:get, :post, :put, :delete],
        expose: ['access-token', 'client']
      end
    end

  end
end
