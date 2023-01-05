json.user do 
  json.extract! @user, :id, :email, :username, :bio, :created_at, :updated_at
end 