class CreateEmployeeCutOffGroups < ActiveRecord::Migration[6.1]
  def change
    create_table :employee_cut_off_groups do |t|
      t.string :name
      t.integer :paymodeid
      t.string :description
      t.boolean :active
      t.integer :year

      t.timestamps
    end
  end
end
