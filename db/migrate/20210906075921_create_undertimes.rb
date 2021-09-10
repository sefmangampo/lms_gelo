class CreateUndertimes < ActiveRecord::Migration[6.1]
  def change
    create_table :undertimes do |t|
      t.integer :employeeid
      t.datetime :fromhours
      t.datetime :tohours
      t.integer :cutoffid
      t.date :date
      t.integer :year
      t.string :remarks

      t.timestamps
    end
  end
end
