class Api::CommentsController < ApplicationController
  before_action :require_logged_in, only: [:create, :destroy]

  def index
    @comments = Comment.all
    render :index
  end

  def show
    @comment = Comment.find_by(id: params[:id])
    if @comment
      render :show
    else
      render json: ['Comment not found'], status: :not_found
    end
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def update
    @comment = Comment.find_by(id: params[:id])
    if @comment && @comment.update(comment_params)
      render :show
    elsif @comment
      render json: @comment.errors.full_messages, status: 422
    else
      render json: ['Comment not found'], status: :not_found
    end
  end
  
  def destroy
    @comment = Comment.find_by(id: params[:id])
    if @comment && @comment.destroy
      render json: ['Comment Destroyed']
    elsif @comment
      render json: @comment.errors.full_messages, status: 422
    else
      render json: ['Comment not found'], status: :not_found
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:post_id, :user_id, :body)
  end
end