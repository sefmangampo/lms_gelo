class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception
    respond_to :html, :json

    before_action :update_allowed_parameters, if: :devise_controller?

    protected

    def update_allowed_parameters
        added_attrs = [:username, :email, :password, :password_confirmation, :remember_me]
        devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
        devise_parameter_sanitizer.permit :sign_in, keys: [:login, :password]
        devise_parameter_sanitizer.permit :account_update, keys: added_attrs
      end
end
