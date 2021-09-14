class CreateLeaveAccrualSettings < ActiveRecord::Migration[6.1]
  def change
    create_table :leave_accrual_settings do |t|
      t.integer :employeeid
      t.boolean :isregular
      t.float :rate
      t.integer :year
      t.boolean :isyearly
      t.boolean :active
      t.datetime :dateeffective

      t.timestamps
    end
  end
end
