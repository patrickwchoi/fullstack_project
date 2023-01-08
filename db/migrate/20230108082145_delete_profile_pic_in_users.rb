class DeleteProfilePicInUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :profile_pic
  end
end
