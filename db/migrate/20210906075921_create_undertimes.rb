class CreateUndertimes < ActiveRecord::Migration[6.1]
  def change
    create_table :undertimes do |t|
      t.integer :employeeid
      t.date :from
      t.date :to
      t.float :hours
      t.integer :cutoffid

      t.timestamps
    end
  end
end
