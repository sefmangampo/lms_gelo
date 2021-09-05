class CreateLeaves < ActiveRecord::Migration[6.1]
  def change
    create_table :leaves do |t|
      t.integer :employeeid
      t.date :datefiled
      t.date :dateeffective
      t.integer :status
      t.integer :year

      t.timestamps
    end
  end
end
