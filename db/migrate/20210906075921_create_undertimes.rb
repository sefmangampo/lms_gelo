class CreateUndertimes < ActiveRecord::Migration[6.1]
  def change
    create_table :undertimes do |t|
      t.integer :employeeid
      t.datetime :from
      t.datetime :to
      t.float :hours
      t.integer :cutoffid
      t.date :date

      t.timestamps
    end
  end
end
