class CreateLeaves < ActiveRecord::Migration[6.1]
  def change
    create_table :leaves do |t|
      t.integer :employeeid
      t.date :datefiled
      t.date :dateeffective
      t.integer :leavetypeid
      t.integer :cutoffid
      t.integer :quantity
      t.integer :status
      t.integer :year
      t.string :remarks

      t.timestamps
    end
  end
end
