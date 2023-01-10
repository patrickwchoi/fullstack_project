class Api::PostsController < ApplicationController
  before_action :require_logged_in, only: :create

  def index
  
    @posts = Post.all
    render :index
  end
  
  def create
    @post = Post.new(post_params)
    @post.author_id = current_user.id
    if @post.save
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end
  
  def show
    @post = Post.find_by(id: params[:id])
    if @post
      render :show
    else
      render json: ['Post not found'], status: :not_found
    end
  end

  def update  
    puts 'Bug1'
    @post = Post.find_by(id: params[:id])
    @post.author_id = current_user.id
    puts 'Bug2'
    if @post && @post.update(post_params)
      puts 'Bug3'
      render :show
    elsif @post
      render json: @post.errors.full_messages, status: 422
    else
      render json: ['Post not found'], status: :not_found
    end
  end

  def destroy
    @post = Post.find_by(id: params[:id])
    if @post && @post.destroy
      @posts = Post.all
      render :index
    elsif @post
      render json: @post.errors.full_messages, status: 422
    else
      render json: ['Post not found'], status: :not_found
    end
  end

  private 
  def set_post
    @post = Post.find(params[:id])
    rescue
      render json: ['Post not found'], status: :not_found
  end

  def post_params 
    params.require(:post).permit(:id, :title, :body, :content_url, :photo)
  end 
end