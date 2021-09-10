class CreatePositions < ActiveRecord::Migration[6.1]
  def change
    create_table :positions do |t|
      t.string :name
      t.boolean :active
      t.string :description

      t.timestamps
    end
  end
end
