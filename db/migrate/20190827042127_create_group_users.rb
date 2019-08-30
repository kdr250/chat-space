class CreateGroupUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :group_users do |t|
      t.references :group, foreign_ley: true
      t.references :user, foreign_ley: true
      t.timestamps
    end
  end
end
