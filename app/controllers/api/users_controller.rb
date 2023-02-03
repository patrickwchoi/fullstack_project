class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def index
    @users = User.all
    render :index
  end
  
  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show #goes to api/users/show.json.jbuilder
      return 
    end 
    render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity 
    # render json: @user.errors.full_messages, status: 422
  end

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render :show
    else
      render json: ['User not found'], status: :not_found
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    if @user && @user.update(user_params)
      render :show
    elsif @user
      render json: @user.errors.full_messages, status: 422
    else
      render json: ['User not found'], status: :not_found
    end
  end

  def destroy
    @user = User.find_by(id: params[:id])
    if @user && @user.destroy
      @users = User.all
      render :index
    elsif @user
      render json: @user.errors.full_messages, status: 422
    else
      render json: ['User not found'], status: :not_found
    end
  end

  private 
  def user_params 
    params.require(:user).permit(:email, :username, :password, :profile_pic, :background_pic, :bio)
  end 
end
