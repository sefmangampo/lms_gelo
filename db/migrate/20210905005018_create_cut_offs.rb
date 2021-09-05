class CreateCutOffs < ActiveRecord::Migration[6.1]
  def change
    create_table :cut_offs do |t|
      t.string :name
      t.integer :type
      t.date :startdate
      t.date :enddate
      t.boolean :active

      t.timestamps
    end
  end
end
