class LetProfilePicBeNull < ActiveRecord::Migration[7.0]
  def change
    #how to let a column be null and remove default value
    change_column :users, :profile_pic, :string, null: true, default: nil
  end
end
