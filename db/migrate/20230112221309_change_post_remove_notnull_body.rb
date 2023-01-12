class ChangePostRemoveNotnullBody < ActiveRecord::Migration[7.0]
  def change
    change_column_null :posts, :body, true #what does this do?
  end
end
