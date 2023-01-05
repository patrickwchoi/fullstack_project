json.user do 
  json.extract! @user, :id, :email, :username, :bio, :profile_pic, :created_at, :updated_at
end 