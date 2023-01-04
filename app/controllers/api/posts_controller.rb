class Api::PostsController < ApplicationController
  
  private 
  def user_params 
    params.require(:user).permit(:title, :body, :content_url, :author_id)
  end 
end