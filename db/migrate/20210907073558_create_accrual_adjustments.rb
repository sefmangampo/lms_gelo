class CreateAccrualAdjustments < ActiveRecord::Migration[6.1]
  def change
    create_table :accrual_adjustments do |t|
      t.integer :employeeid
      t.float :rate
      t.date :dateeffective
      t.string :remarks
      t.integer :year
      t.integer :createdbyid
      t.boolean :posted

      t.timestamps
    end
  end
end
