class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.text  :text
      t.string  :image
      t.references :group, foreign_ley: true
      t.references :user, foreign_ley: true
      t.timestamps
    end
  end
end
