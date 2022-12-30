class Api::SessionsController < ApplicationController
  before_action :require_logged_in, only: [:destroy]

  def create
    credential = params[:credential]
    password = params[:password]
    @user = User.find_by_credentials(credential, password)
    if @user 
      login!(@user)
      # render json: { user: @user.slice('id', 'username', 'session_token') } #temp
      render 'api/users/show'
      return 
    end 
    render json: { errors: ['The provided credentials were invalid.']}, status: :unauthorized
  end

  def show
    if current_user 
      @user = current_user
      render 'api/users/show'
      return  
    end 
    render json: { user: nil }
  end

  def destroy
    logout!
    render json: { message: 'success'}
  end
end
