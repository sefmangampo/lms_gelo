class CreateEmployeeCutoffs < ActiveRecord::Migration[6.1]
  def change
    create_table :employee_cutoffs do |t|
      t.integer :employeeid
      t.integer :cutoffid
      t.integer :paymentmodeid
      t.integer :year
      t.boolean :active

      t.timestamps
    end
  end
end
