class ChangeTitleNotNullPosts < ActiveRecord::Migration[7.0]
  def change
    change_column_null :posts, :title, false
  end
end
