class ApplicationController < ActionController::API
  before_action :is_authenticated
  include ActionController::Cookies
 
  private 

    def current_user
        @current_user = User.find_by_id(session[:user_id])
    end

  def is_authenticated
    render json: "Not Logged In", status: :unauthorized unless current_user

  end

end