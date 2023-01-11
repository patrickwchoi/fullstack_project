class Api::LikesController < ApplicationController
  before_action :require_logged_in, only: [:create, :destroy]

  def create
    @like = Like.new(like_params)
    @like.user_id = current_user.id
    if @like.save
      render :show
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

  def destroy
    @like = Like.find_by(id: params[:id])
    if @like && @like.destroy
      render json: ['Like Destroyed']
    elsif @like
      render json: @like.errors.full_messages, status: 422
    else
      render json: ['Like not found'], status: :not_found
    end
  end

  private

  def like_params
    params.require(:like).permit(:post_id)
  end
  
end